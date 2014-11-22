try{
SmartWorks.FormRuntime = SmartWorks.FormRuntime || {};

SmartWorks.FormRuntime.DateTimeChooserBuilder = {};

SmartWorks.FormRuntime.DateTimeChooserBuilder.build = function(config) {
	var options = {
		mode : 'edit', // view or edit
		container : $('<td></td>'),
		entity : null,
		dataField : '',
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
	var id = $entity.attr('id');
	var name = $entity.attr('name');
	var labelWidth = (isEmpty(options.layoutInstance)) ? parseInt($graphic.attr('labelWidth')) : options.layoutInstance.getLabelWidth(id);
	var valueWidth = 100 - (options.isDataGrid ? 0 : labelWidth);
	var $label = $('<div class="form_label" style="width:' + labelWidth + '%"><span>' + name + '</span></div>');
	var required = $entity.attr('required');
	if(required === 'true' && !readOnly){
		$label.addClass('required_label');
		required = " class='fieldline js_todaytimepicker required' ";
	}else{
		required = " class='fieldline js_todaytimepicker' ";
	}
	if(!options.refreshData && !options.isDataGrid)
		$label.appendTo(options.container);

	var $text = null;
	if(readOnly){
		if(isEmpty(value))
			$text = $('<div class="form_value form_value_max_width" style="width:' + valueWidth + '%"><span>&nbsp;</span></div>');
		else
			$text = $('<div class="form_value form_value_max_width" style="width:' + valueWidth + '%"><span>' + value + '</span></div>');
	}else{	
		$text = $('<div class="form_value form_value_max_width" style="width:' + valueWidth + '%"><div class="icon_fb_space form_datetime_input"><input readonly="readonly" type="text" name="' + id + '"' + required + '><a href="" tabindex="-1" class="js_todaytimepicker_button"><span class="icon_fb_time"></span></a></div></div>');
		$text.find('input').attr('value', value);
		$text.attr('title', $entity.attr('toolTip'));
	}
	if ($graphic.attr('hidden') == 'true'){
		options.container.hide();
	}
	
	if(!options.refreshData){
		$text.appendTo(options.container);	
		smartCommon.liveTodayTimePicker();
	}else{
		if(readOnly)
			options.container.find('.form_value span').html(isEmpty(value) ? '&nbsp' : value);
		else
			options.container.find('.form_value input').attr('value', value);
	}
	
	if (readOnly) {
		var $dateTimeChooserHiddenInput = options.container.find('#dateTimeChooserHiddenInput'+id);
		if ($dateTimeChooserHiddenInput.length === 0) {
			options.container.append('<input id="dateTimeChooserHiddenInput'+id+'" type="hidden" name="' + id + '" value="' + value + '">');
		} else {
			$dateTimeChooserHiddenInput.attr('value', value);
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
				if(isEmpty(value))
					formValue.html('<span>&nbsp;</span>');
				else
					formValue.html('<span>' + value + '</span>');
				var $dateTimeChooserHiddenInput = $('#dateTimeChooserHiddenInput'+id);
				if ($dateTimeChooserHiddenInput.length === 0) {
					options.container.append('<input id="dateTimeChooserHiddenInput'+id+'" type="hidden" name="' + id + '" value="' + value + '">');
				} else {
					$dateTimeChooserHiddenInput.attr('value', value);
				}
				formValue.removeAttr('title');
				formLabel.removeClass('required_label');
			}else if(isReadOnly == 'false'){			
				formValue.html('<div class="icon_fb_space form_datetime_input"><input readonly="readonly" type="text" name="' + id + '"' + required + '><a href="" tabindex="-1" class="js_todaytimepicker_button"><span class="icon_fb_time"></span></a></div>');
				formValue.find('input').attr('value', value);	
				$('#dateTimeChooserHiddenInput'+id).remove();
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
			smartCommon.liveTodayTimePicker();
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

SmartWorks.FormRuntime.DateTimeChooserBuilder.buildEx = function(config){
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
	$formEntity =  $($.parseXML('<formEntity id="' + options.fieldId + '" name="' + options.fieldName + '" systemType="datetime" required="' + options.required + '" system="false">' +
						'<format type="datetimeChooser" viewingType="datetimeChooser"/>' +
					    '<graphic hidden="false" readOnly="'+ options.readOnly +'" labelWidth="'+ labelWidth + '"/>' +
					'</formEntity>')).find('formEntity');
	var $formCol = $('<td class="form_col js_type_datetimeChooser" fieldid="' + options.fieldId+ '" colspan="' + options.colSpan + '" width="' + options.colSpan/options.columns*100 + '%" rowspan="1">');
	$formCol.appendTo(options.container);
	SmartWorks.FormRuntime.DateTimeChooserBuilder.build({
			mode : options.readOnly, // view or edit
			container : $formCol,
			entity : $formEntity,
			dataField : SmartWorks.FormRuntime.DateTimeChooserBuilder.dataField({
				fieldId: options.fieldId,
				value: options.value				
			})
	});
	
};

SmartWorks.FormRuntime.DateTimeChooserBuilder.dataField = function(config){
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
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[datetime_chooser script]', null, error);
}