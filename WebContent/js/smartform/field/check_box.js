try{
SmartWorks.FormRuntime = SmartWorks.FormRuntime || {};

SmartWorks.FormRuntime.CheckBoxBuilder = {};

SmartWorks.FormRuntime.CheckBoxBuilder.build = function(config) {
	var options = {
		mode : 'edit', // view or edit
		container : $('<div></div>'),
		entity : null,
		dataField : '',
		refreshData : false,
		layoutInstance : null,
		isDataGrid : false
	};

	SmartWorks.extend(options, config);
	if(!options.refreshData)
		options.container.html('');

	var value = (options.dataField && (options.dataField.value=== 'on' || options.dataField.value=== 'true') ) || false;
	var $entity = options.entity;
	var $graphic = $entity.find('graphic');
	var readOnly = $graphic.attr('readOnly') === 'true' || options.mode === 'view';
	var id = $entity.attr('id');
	var name = $entity.attr('name');

	var labelWidth = (isEmpty(options.layoutInstance)) ? parseInt($graphic.attr('labelWidth')) : options.layoutInstance.getLabelWidth(id);
	var valueWidth = 100 - (options.isDataGrid ? 0 : labelWidth);
	var $label = $('<div class="form_label" style="width:' + labelWidth + '%"><span>' + name + '</span></div>');
	var required = 'false';
	if(required === 'true' && !readOnly){
		$label.addClass('required_label');
		required = " class='required' ";
	}else{
		required = "";
	}
	if(!options.refreshData && !options.isDataGrid)
		$label.appendTo(options.container);

	var checked = (value) ? 'checked' : '' ;
	var $check = null;
	if(readOnly){
		$check = $('<div class="form_value form_value_max_width" style="width:' + valueWidth + '%"><span>' + smartMessage.get((value===true) ? "trueText" : "falseText") +  '</span></div>');
	}else{	
		$check = $('<div class="form_value form_value_max_width" style="width:' + valueWidth + '%"><input type="checkbox" '+ checked + ' name="' + id + '"' + required +  '><div>');
		$check.attr('title', $entity.attr('toolTip'));
	}

	if ($graphic.attr('hidden') == 'true'){
		options.container.hide();
	}
	if(!options.refreshData){
		$check.appendTo(options.container);
	}else{
		if(readOnly)
			options.container.find('.form_value span').text(smartMessage.get((value==true) ? "trueText" : "falseText"));
		else
			options.container.find('.form_value input').attr('checked', value);
	}
	
	if (readOnly) {
		var $checkHiddenInput = options.container.find('#checkHiddenInput' + id);
		var hiddenValue = (value===true) ? 'true' : 'false';
		if ($checkHiddenInput.length === 0) {
			options.container.append('<input id="checkHiddenInput'+id+'" type="hidden" name="' + id + '" value="'+ hiddenValue +'">');
		} else {
			$checkHiddenInput.attr('value', hiddenValue);
		}
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
				formValue.html('<span>' + smartMessage.get((value===true) ? "trueText" : "falseText") +  '</span>');
				var $checkHiddenInput = options.container.find('#checkHiddenInput' + id);
				var hiddenValue = (value===true) ? 'true' : 'false';
				if ($checkHiddenInput.length === 0) {
					options.container.append('<input id="checkHiddenInput'+id+'" type="hidden" name="' + id + '" value="'+ hiddenValue +'">');
				} else {
					$checkHiddenInput.attr('value', hiddenValue);
				}
				formValue.removeAttr('title');
				formLabel.removeClass('required_label');
			}else if(isReadOnly == 'false'){			
				formValue.html('<input type="checkbox" '+ checked + ' name="' + id + '"' + required +  '>');
				options.container.find('.form_value input').attr('checked', value);
				$('#checkHiddenInput'+id).remove();
				formValue.attr('title', $entity.attr('toolTip'));
				if($entity.attr('required') === 'true')
					formLabel.addClass('required_label');
			}
				
			if(isRequired == 'true'){
				formLabel.addClass('required_label');
				formValue.find('input').addClass('required');
			}else if(isRequired == 'false'){
				formLabel.removeClass('required_label');
				formValue.find('input').removeClass('required');			
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

SmartWorks.FormRuntime.CheckBoxBuilder.buildEx = function(config){
	var options = {
			container : $('<tr></tr>'),
			fieldId: '',
			fieldName: '',
			value: '',
			columns: 1,
			colSpan: 1,
			required: false,
			readOnly: false		
	};
	SmartWorks.extend(options, config);

	var labelWidth = 12;
	if(options.columns >= 1 && options.columns <= 4 && options.colSpan <= options.columns) labelWidth = 12 * options.columns/options.colSpan;
	$formEntity =  $($.parseXML('<formEntity id="' + options.fieldId + '" name="' + options.fieldName + '" systemType="string" required="' + options.required + '" system="false">' +
						'<format type="checkBox" viewingType="checkBox"/>' +
					    '<graphic hidden="false" readOnly="'+ options.readOnly +'" labelWidth="'+ labelWidth + '"/>' +
					'</formEntity>')).find('formEntity');
	var $formCol = $('<td class="form_col js_type_checkBox" fieldid="' + options.fieldId+ '" colspan="' + options.colSpan + '" width="' + options.colSpan/options.columns*100 + '%" rowspan="1">');
	$formCol.appendTo(options.container);
	SmartWorks.FormRuntime.CheckBoxBuilder.build({
			mode : options.readOnly, // view or edit
			container : $formCol,
			entity : $formEntity,
			dataField : SmartWorks.FormRuntime.CheckBoxBuilder.dataField({
				fieldId: options.fieldId,
				value: options.value			
			})
	});
	
};

SmartWorks.FormRuntime.CheckBoxBuilder.dataField = function(config){
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
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[check_box script]', null, error);
}