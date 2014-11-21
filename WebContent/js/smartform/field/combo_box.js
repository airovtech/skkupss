try{
SmartWorks.FormRuntime = SmartWorks.FormRuntime || {};

SmartWorks.FormRuntime.ComboBoxBuilder = {};

SmartWorks.FormRuntime.ComboBoxBuilder.build = function(config) {
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

	var value = (options.dataField && options.dataField.value) || '';
	
	var $entity = options.entity;
	var $graphic = $entity.find('graphic');
	var $format = $entity.find('format');

	var readOnly = $graphic.attr('readOnly') == 'true' || options.mode == 'view';
	var id = $entity.attr('id');
	var name = $entity.attr('name');
	
	var labelWidth = (isEmpty(options.layoutInstance)) ? parseInt($graphic.attr('labelWidth')) : options.layoutInstance.getLabelWidth(id);
	var valueWidth = 100 - (options.isDataGrid ? 0 : labelWidth);
	var $label = $('<div class="form_label" style="width:' + labelWidth + '%"><span>' + name + '</span></div>');
	var required = $entity.attr('required');
	if(required === 'true' && !readOnly){
		$label.addClass('required_label');
		required = " class='form_select_box required' ";
	}else{
		required = " class='form_select_box' ";		
	}
		
	if(!options.refreshData && !options.isDataGrid)
		$label.appendTo(options.container);
	
	var $staticItems = $format.find('list staticItems staticItem');
	// 가져오기 값이 1개이상일 경우 그값으로 staticItmes를 변경한다
	if (options.dataField != null && options.dataField.dataFields != null) {
		var staticItemsStr = '';
		var subDataFields = options.dataField.dataFields;
		for (var i = 0; i < subDataFields.length; i++) {
			var subDataField = subDataFields[i];
			staticItemsStr = staticItemsStr + '<staticItem>' + subDataField.value + '</staticItem>';
		}
		$staticItems = $(staticItemsStr);
	}
	//
	var $input = $('<div class="form_value" style="width:' + valueWidth + '%"><span><select name="' + id + '"' + required + ' tabindex="-1"></select></span><div>');

	$input.attr('fieldId', id);
	if (readOnly) {
//		$input.find('select').attr('disabled', 'disabled');
		$input.html(value);
	}else{
		required = "";
		$input.attr('title', $entity.attr('toolTip'));
	}
	
	if ($staticItems.length == 0) {
		$option = $('<option value="' + value + '">'+value+'</option>');
		$option.appendTo($input.find('select'));
	} else {
		for ( var i = 0; i < $staticItems.length; i++) {
			var $staticItem = $staticItems.eq(i);
			var text = $staticItem.text();

			$option = $('<option value="' + text + '">'+text+'</option>');
			
			$option.appendTo($input.find('select'));
		}
	}
	$input.find('select').attr('value', value);
	
	
	if(!options.refreshData){
		$input.appendTo(options.container);
	}else{
		if(isEmpty(options.container.find('.form_value select')))
			options.container.find('.form_value').html($input.html());
		else
			options.container.find('.form_value').html($input.children());
	}

	if ($graphic.attr('hidden') == 'true') {
		options.container.hide();
	}
	
	if (readOnly) {
		var $comboHiddenInput = options.container.find('#comboHiddenInput'+id);
		if ($comboHiddenInput.length === 0) {
			options.container.append('<input id="comboHiddenInput'+id+'" type="hidden" name="' + id + '" value="' + value + '">');
		} else {
			$comboHiddenInput.attr('value', value);
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
				formValue.html(value);
				var $comboHiddenInput = $('#comboHiddenInput'+id);
				if ($comboHiddenInput.length === 0) {
					options.container.append('<input id="comboHiddenInput'+id+'" type="hidden" name="' + id + '" value="' + value + '">');
				} else {
					$comboHiddenInput.attr('value', value);
				}
				formValue.removeAttr('title');
				formLabel.removeClass('required_label');
			}else if(isReadOnly == 'false'){			
				formValue.html('<span><select name="' + id + '"' + required + ' tabindex="-1"></select></span>');
				if ($staticItems.length == 0) {
					$option = $('<option value="' + value + '">'+value+'</option>');
					$option.appendTo(formValue.find('select'));
				} else {
					for ( var i = 0; i < $staticItems.length; i++) {
						var $staticItem = $staticItems.eq(i);
						var text = $staticItem.text();
	
						$option = $('<option value="' + text + '">'+text+'</option>');
						
						$option.appendTo(formValue.find('select'));
					}
				}
				formValue.find('select').attr('value', value);
				$('#comboHiddenInput'+id).remove();
				formValue.attr('title', $entity.attr('toolTip'));
				if($entity.attr('required') === 'true')
					formLabel.addClass('required_label');
			}
				
			if(isRequired == 'true'){
				formLabel.addClass('required_label');
				formValue.find('select').addClass('required');
			}else if(isRequired == 'false'){
				formLabel.removeClass('required_label');
				formValue.find('select').removeClass('required');			
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

SmartWorks.FormRuntime.ComboBoxBuilder.buildEx = function(config){
	var options = {
			container : $('<tr></tr>'),
			fieldId: '',
			fieldName: '',
			value: '',
			staticItems : [],
			columns: 1,
			colSpan: 1,
			required: false,
			readOnly: false		
	};
	SmartWorks.extend(options, config);

	var staticList = "";
	if(!isEmpty(options.staticItems)){
		staticList = '<list type="" refCodeCategoryId="null" refCodeCategoryName="null" listType="static"><staticItems>';
			for(var i=0; i<options.staticItems.length; i++)
				staticList = staticList + '<staticItem>' + options.staticItems[i] + '</staticItem>';
		staticList = staticList + '</staticItems></list>';		
	}

	var labelWidth = 12;
	if(options.columns >= 1 && options.columns <= 4 && options.colSpan <= options.columns) labelWidth = 12 * options.columns/options.colSpan;
	$formEntity =  $($.parseXML('<formEntity id="' + options.fieldId + '" name="' + options.fieldName + '" systemType="string" required="' + options.required + '" system="false">' +
						'<format type="comboBox" viewingType="comboBox">' + staticList + '</format>' + 
					    '<graphic hidden="false" readOnly="'+ options.readOnly +'" labelWidth="'+ labelWidth + '"/>' +
					'</formEntity>')).find('formEntity');
	var $formCol = $('<td class="form_col js_type_comboBox" fieldid="' + options.fieldId+ '" colspan="' + options.colSpan +  '" width="' + options.colSpan/options.columns*100 + '%" rowspan="1">');
	$formCol.appendTo(options.container);
	SmartWorks.FormRuntime.ComboBoxBuilder.build({
			mode : options.readOnly, // view or edit
			container : $formCol,
			entity : $formEntity,
			dataField : SmartWorks.FormRuntime.ComboBoxBuilder.dataField({
				fieldId: options.fieldId,
				value: options.value
			}),
			staticItems : options.staticItems
	});
	
};

SmartWorks.FormRuntime.ComboBoxBuilder.dataField = function(config){
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
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[combo_box script]', null, error);
}