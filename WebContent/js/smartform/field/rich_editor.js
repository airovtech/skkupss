try{
SmartWorks.FormRuntime = SmartWorks.FormRuntime || {};

SmartWorks.FormRuntime.RichEditorBuilder = {};

var oEditors = [];
SmartWorks.FormRuntime.RichEditorBuilder.build = function(config) {
	var options = {
		mode : 'edit', // view or edit
		container : $('<div></div>'),
		entity : null,
		dataField : '',
		resizer : true,
		refreshData : false,
		layoutInstance : null,
		isDataGrid : false
	};
	SmartWorks.extend(options, config);
	if(!options.refreshData)
		options.container.html('');
	var value = (options.dataField && options.dataField.value) || '';
	var $entity = options.entity;
	var $graphic = $entity.find('graphic');
	var readOnly = $graphic.attr('readOnly') === 'true' || options.mode === 'view';
	var height = $graphic.attr('height');
	var id = $entity.attr('id');
	var name = $entity.attr('name');
	
	var labelWidth = (isEmpty(options.layoutInstance)) ? parseInt($graphic.attr('labelWidth')) : options.layoutInstance.getLabelWidth(id);
	var valueWidth = 100 - (options.isDataGrid ? 0 : labelWidth);
	var $label = $('<div class="form_label" style="width:' + labelWidth + '%"><span>' + name + '</span></div>');
	var required = $entity.attr('required');
	if(required === 'true' && !readOnly){
		$label.addClass('required_label');
			required = " class='sw_required js_rich_editor_event' ";
	}else{
		required = "";
	}
	if(!options.refreshData && !options.isDataGrid)
		$label.appendTo(options.container);
	
	var $textarea = null;
	if(readOnly){
		if(options.isDataGrid)
			$textarea = $('<div class="form_value" style="width:' + valueWidth + '%"><span></span></div>').find('span').html(isEmpty(value) ? '&nbsp;' : value.replace(/\n/g, "<br />"));
		else
			$textarea = $('<div class="form_value" style="width:' + valueWidth + '%"><span>' + (isEmpty(value) ? '&nbsp;' : value) + '</span></div>');
	}else if(options.isDataGrid){
		$textarea = $('<div class="form_value" style="width:' + valueWidth + '%"><span' + required + '><textarea class="fieldline" style="width:100%;overflow-y:auto;resize:vertical;" id="' + id + '">'+ value.replace(/textarea/g, "div") +'</textarea></span></div>');
	}else{
		$textarea = $('<div class="form_value" style="width:' + valueWidth + '%"><span' + required + '><textarea style="width:100%; height:' + height + 'px;display:none" id="' + id + '">'+ value.replace(/textarea/g, "div") +'</textarea></span></div>');
	}
	if ($graphic.attr('hidden') == 'true'){
		options.container.hide();
	}

	if(!options.refreshData){
		$textarea.appendTo(options.container);
		if (!readOnly && !options.isDataGrid) {
			removeRichEditor(id);
			var skinURI = (currentUser.locale == 'ko') ? "smarteditor/SmartEditor2Skin.html" : "smarteditor/SmartEditor2Skin.html";
			nhn.husky.EZCreator.createInIFrame({
				oAppRef: oEditors,
				elPlaceHolder: $textarea.find('textarea')[0],
				sSkinURI: skinURI,
				fCreator: "createSEditor2"
			});
			setRichEditorWidth(options.container);
		}
	}else{
		if(readOnly) {
			options.container.find('.form_value').html('');
			options.container.find('.form_value').append(isEmpty(value) ? '<span>&nbsp;</span>' : '<span>' + value + '</span>');
		} else {
			options.container.find('.form_value textarea').html(value);
			if(!options.isDataGrid){
				setRichEditorWidth(options.container);
				options.container.find('iframe').contents().find('iframe').contents().find('.smartOutput').html(value);
			}
		}
	}

	if (readOnly) {
		var $richEditorHiddenInput = options.container.find('#richEditorHiddenInput'+id);
		if ($richEditorHiddenInput.length === 0) {
			options.container.append("<input id='richEditorHiddenInput"+id+"' type='hidden' name='" + id + "' value='" + smartEncode(value) + "'>");
		} else {
			$richEditorHiddenInput.attr('value', smartEncode(value));
		}
		options.container.find('iframe').contents().find('iframe').contents().find('.smartOutput').removeAttr('title');
	}else{
		options.container.find('iframe').contents().find('iframe').contents().find('.smartOutput').attr('title', $entity.attr('toolTip'));
	}
	
	var isHidden =  (options.dataField && options.dataField.isHidden) || null;
	var isReadOnly =  (options.dataField && options.dataField.isReadOnly) || null;
	var isRequired =  (options.dataField && options.dataField.isRequired) || null;
	if(options.refreshData && (isHidden || isRequired || isReadOnly)){
		var formLabel = options.container.find('.form_label:first');
		var formValue = options.container.find('.form_value:first');
		if(isHidden == 'true'){
			options.container.hide();
		}else if(isHidden == 'false'){
			options.container.show().parent().show();
		}
		
		if(options.mode == 'edit'){
			if(isReadOnly == 'true'){
				if(options.isDataGrid)
					formValue.html('<span></span>').find('span').html(isEmpty(value) ? '&nbsp;' : value.replace(/\n/g, "<br />"));
				else
					formValue.html('<span>' + (isEmpty(value) ? '&nbsp;' : value) + '</span>');
				var $richEditorHiddenInput = $('#richEditorHiddenInput'+id);
				if ($richEditorHiddenInput.length === 0) {
					options.container.append("<input id='richEditorHiddenInput"+id+"' type='hidden' name='" + id + "' value='" + smartEncode(value) + "'>");
				} else {
					$richEditorHiddenInput.attr('value', smartEncode(value));
				}
				removeRichEditor(id);
				formValue.find('iframe').contents().find('iframe').contents().find('.smartOutput').removeAttr('title');
				formLabel.removeClass('required_label');
			}else if(isReadOnly == 'false'){			
				if(options.isDataGrid){
					formValue.html('<span' + required + '><textarea class="fieldline" style="width:100%;overflow-y:auto;resize:vertical;" id="' + id + '">'+ value.replace(/textarea/g, "div") +'</textarea></span>');
				}else{
					removeRichEditor(id);
					formValue.html('<span' + required + '><textarea style="width:100%; height:' + height + 'px;display:none" id="' + id + '">'+ value.replace(/textarea/g, "div") +'</textarea></span>');

					var skinURI = (currentUser.locale == 'ko') ? "smarteditor/SmartEditor2Skin.html" : "smarteditor/SmartEditor2Skin.html";
					nhn.husky.EZCreator.createInIFrame({
						oAppRef: oEditors,
						elPlaceHolder: $textarea.find('textarea')[0],
						sSkinURI: skinURI,
						fCreator: "createSEditor2"
					});					
					setRichEditorWidth(options.container);
				}
				$('#richEditorHiddenInput'+id).remove();
				formValue.find('iframe').contents().find('iframe').contents().find('.smartOutput').attr('title', $entity.attr('toolTip'));
				if($entity.attr('required') === 'true')
					formLabel.addClass('required_label');
			}
				
			if(isRequired == 'true'){
				formLabel.addClass('required_label');
				formValue.children('span').addClass('sw_required').addClass('js_rich_editor_event');
			}else if(isRequired == 'false'){
				formLabel.removeClass('required_label');
				formValue.children('span').removeClass('sw_required').removeClass('js_rich_editor_event');
			}
		}
	}else if(isHidden){
		if(isHidden == 'true'){
			options.container.hide();
		}else if(isHidden == 'false'){
			options.container.show().parent().show();
		}		
	}
	
	
	return options.container;
};

richEditorSetValue = function($this, id, value){
	var smartForm = $this.parents('form[name="frmSmartForm"]');
	var richEditor = smartForm.find('.js_type_richEditor[fieldId="' + id + '"]');
	var frame = richEditor.find('iframe');
	frame.contents().find('html').html("");
	value = smartDecode(value);
	frame.contents().find('html').html('<link href="css/default-iframe.css" type="text/css" rel="stylesheet" />' + value);
	doIframeAutoHeight();
};

removeRichEditor = function(id){
	if(!isEmpty(oEditors) && !isEmpty(oEditors.getById[id])){
		for(var i=0; i<oEditors.length; i++){
			if(oEditors[i].sAppId == id){
				oEditors.splice(i, 1);
				return;
			}
		}
	}
	
};

setRichEditorWidth = function(container){
	setTimeout(function(){
		if(container.find('iframe').contents().find('iframe').width()==0){
			container.find('iframe').contents().find('iframe').css({width:"100%"});
			setTimeout(function(){
				if(container.find('iframe').contents().find('iframe').width()==0){
					container.find('iframe').contents().find('iframe').css({width:"100%"});
					setTimeout(function(){
						container.find('iframe').contents().find('iframe').css({width:"100%"});
					},1000);
				}
			},500);
		}
	},500);
};


SmartWorks.FormRuntime.RichEditorBuilder.buildEx = function(config){
	var options = {
			container : $('<tr></tr>'),
			fieldId: '',
			fieldName: '',
			value: '',
			columns: 1,
			colSpan: 1,
			resizer: true,
			required: false,
			readOnly: false		
	};
	SmartWorks.extend(options, config);

	var labelWidth = 12;
	if(options.columns >= 1 && options.columns <= 4 && options.colSpan <= options.columns) labelWidth = 12 * options.columns/options.colSpan;
	$formEntity =  $($.parseXML('<formEntity id="' + options.fieldId + '" name="' + options.fieldName + '" systemType="string" required="' + options.required + '" system="false">' +
						'<format type="richEditor" viewingType="richEditor"/>' +
					    '<graphic hidden="false" readOnly="'+ options.readOnly +'" labelWidth="'+ labelWidth + '"/>' +
					'</formEntity>')).find('formEntity');
	var $formCol = $('<td class="form_col js_type_richEditor" fieldid="' + options.fieldId+ '" colspan="' + options.colSpan + '" width="' + options.colSpan/options.columns*100 + '%" rowspan="1">');
	$formCol.appendTo(options.container);
	SmartWorks.FormRuntime.RichEditorBuilder.build({
			mode : options.readOnly, // view or edit
			container : $formCol,
			entity : $formEntity,
			resizer : options.resizer,
			dataField : SmartWorks.FormRuntime.RichEditorBuilder.dataField({
				fieldId: options.fieldId,
				value: options.value
			})
	});
	
};

SmartWorks.FormRuntime.RichEditorBuilder.serializeObject = function(richEditors, valueChanged){
	var richEditorsJson = {};
	for(var i=0; i<richEditors.length; i++){
		var richEditor = $(richEditors[i]);
		var id = richEditor.attr('fieldId');
		if(valueChanged && !isEmpty(oEditors) && !isEmpty(oEditors.getById[id])){
			try{
				oEditors.getById[id].exec("UPDATE_CONTENTS_FIELD", []);
			}catch(e){}
		}
		var valueField = richEditor.find('textarea');
		if(!isEmpty(valueField)) richEditorsJson[richEditor.attr('fieldId')] = valueField[0].value;
	}
	return richEditorsJson;
};

SmartWorks.FormRuntime.RichEditorBuilder.validate = function(richEditors){
	var richEditorsValid = true;
	for(var i=0; i<richEditors.length; i++){
		var richEditor = $(richEditors[i]);
		var id = richEditor.attr('fieldId');
		
		if(!isEmpty(oEditors) && !isEmpty(oEditors.getById[id])) oEditors.getById[id].exec("UPDATE_CONTENTS_FIELD", []);
		var value = richEditor.find('textarea')[0] ? richEditor.find('textarea')[0].value : (richEditor.find('input')[0]) ? richEditor.find('input')[0].value : null;
		
		var required = richEditor.find('span.sw_required');
		if(!isEmpty(required) && (isEmpty(value) || value === "<br>")){
			richEditor.find('span.sw_required').addClass("sw_error");
			richEditorsValid = false;
		}else{
			richEditor.find('span.sw_required').removeClass("sw_error");
		}
	}
	return richEditorsValid;
};

SmartWorks.FormRuntime.RichEditorBuilder.dataField = function(config){
	var options = {
			fieldName: '',
			formXml: '',
			fieldId: '',
			value: ''
	};

	SmartWorks.extend(options, config);
	$formXml = isEmpty(options.formXml) ? [] : $($.parseXML(options.formXml)).find('form');
	var dataField = {};
	var fieldId = (isEmpty(options.fieldId)) ? $formXml.find('formEntity[name="'+options.fieldName+'"]').attr('id') : options.fieldId;
	if(isEmpty(fieldId)) fieldId = ($formXml.attr("name") === options.fieldName) ? $formXml.attr('id') : "";
	if(isEmpty(fieldId)) return dataField;
	
	dataField = {
			id: fieldId,
			value: options.value
	};
	return dataField;
};

SmartWorks.FormRuntime.RichEditorBuilder.getValue = function(richEditors){
	if(isEmpty(richEditors)) return "";
	
	var richEditor = $(richEditors[0]);
	var id = richEditor.attr('fieldId');
	if(!isEmpty(oEditors) && !isEmpty(oEditors.getById[id])){
		oEditors.getById[id].exec("UPDATE_CONTENTS_FIELD", []);
	}
	var valueField = richEditor.find('textarea');
	if(!isEmpty(valueField)) return valueField[0].value;
	return "";
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[rich_editor script]', null, error);
}