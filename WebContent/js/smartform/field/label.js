try{
SmartWorks.FormRuntime = SmartWorks.FormRuntime || {};

SmartWorks.FormRuntime.LabelBuilder = {};

SmartWorks.FormRuntime.LabelBuilder.build = function(config) {
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
	options.container.html('');

	var $entity = options.entity;
	var $graphic = $entity.find('graphic');
	var name = $entity.attr('name');

	var textAlign = $graphic.attr("textAlign") || "left";
	var textColor = $graphic.attr("textColor") || "";
	var fontWeight = $graphic.attr("fontWeight") || "bold";
	var fontSize = $graphic.attr("fontSize") || "12";
	var $label = $('<div class="form_label" style="width:100%;margin-left:10px;margin-right:10px;text-align:' + textAlign + ';color:' + (textColor? ('#' + textColor) : textColor) + ';font-weight:' + fontWeight + ';font-size:' + fontSize + 'px;"><span>' + name + '</span></div>');
	$label.appendTo(options.container);
	
	if ($graphic.attr('hidden') == 'true'){
		options.container.hide();
	}

	var isHidden =  (options.dataField && options.dataField.isHidden) || null;
	if(isHidden){
		if(isHidden == 'true'){
			options.container.hide();
		}else if(isHidden == 'false'){
			options.container.show().parent().show();
		}		
	}
	
	return options.container;
};

SmartWorks.FormRuntime.LabelBuilder.buildEx = function(config){
	var options = {
			container : $('<tr></tr>'),
			fieldId: '',
			fieldName: '',
			value: '',
			columns: 1,
			colSpan: 1, 
			multiLines: 1,
			required: false,
			readOnly: false		
	};
	SmartWorks.extend(options, config);
	
};

SmartWorks.FormRuntime.LabelBuilder.dataField = function(config){
	var options = {
			fieldName: '',
			formXml: '',
			fieldId: '',
			value: ''
	};

	SmartWorks.extend(options, config);
	$formXml = isEmpty(options.formXml) ? [] : $($.parseXML(options.formXml)).find('form');
	var dataField = {};
	return dataField;
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[label script]', null, error);
}