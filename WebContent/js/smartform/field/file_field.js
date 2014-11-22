try{
SmartWorks.FormRuntime = SmartWorks.FormRuntime || {};

SmartWorks.FormRuntime.FileFieldBuilder = {};

SmartWorks.FormRuntime.FileFieldBuilder.build = function(config) {
	var options = {
		mode : 'view', // view or edit
		container : $('<div></div>'),
		entity : null,
		dataField : '',
		refreshData : false,
		layoutInstance : null,
		isMultiple : true,
		isDataGrid : false
	};
	SmartWorks.extend(options, config);
	
	var noRefreshData = (options.dataField && options.dataField.noRefreshData) || '';
	
	if(options.refreshData && noRefreshData == 'true'){
		return options.container;
	}

//	options.container.html('');

	var value = (options.dataField && options.dataField.value) || '';
//	if(options.isDataGrid){
//		value = value.groupId;
//	}
	var isTempfile = (options.dataField && options.dataField.isTempfile) || false;
	var isMultiple = (options.isMultiple) || false;
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
		required = ' class="sw_required"';
	}else{
		required = '';		
	}
//	if(!options.isDataGrid)
	if(!options.isDataGrid && !options.refreshData)
		$label.appendTo(options.container);
	
	var $file = null;
		
	$file = $('<div class="form_value" groupId="' + value + '" style="width:' + valueWidth + '%"><span id="' + id + '"' + required + '></span></div>');

	if(!readOnly){
		$file.attr('title', $entity.attr('toolTip'));
	}
	
	if ($graphic.attr('hidden') == 'true'){
		options.container.hide();
	}

	if(!options.refreshData){
		$file.appendTo(options.container);
	}
	
	var isHidden =  (options.dataField && options.dataField.isHidden) || null;
	var isReadOnly =  (options.dataField && options.dataField.isReadOnly) || null;
	var isRequired =  (options.dataField && options.dataField.isRequired) || null;
//	if(!options.refreshData || !isReadOnly){
	if(!options.refreshData){
		if (readOnly) {
			viewFiles(value, options.container.find('#'+id));
		} else {
			var fileList = '';
			if(isTempfile){
				fileList = 	(options.dataField && options.dataField.fileList) || '';
			}	
			createUploader(value, options.container.find('#'+id), isMultiple, false, isTempfile, fileList);
		}
	}
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
				viewFiles(value, options.container.find('#'+id));
				formValue.removeAttr('title');
				formLabel.removeClass('required_label');
			}else if(isReadOnly == 'false'){			
				var fileList = '';
				if(isTempfile){
					fileList = 	(options.dataField && options.dataField.fileList) || '';
				}	
				createUploader(value, options.container.find('#'+id), isMultiple, false, isTempfile, fileList);
				formValue.attr('title', $entity.attr('toolTip'));
				if($entity.attr('required') === 'true')
					formLabel.addClass('required_label');
			}
				
			if(isRequired == 'true'){
				formLabel.addClass('required_label');
				formValue.find('#' + id).addClass('sw_required');
			}else if(isRequired == 'false'){
				formLabel.removeClass('required_label');
				formValue.find('#' + id).removeClass('sw_required');			
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

SmartWorks.FormRuntime.FileFieldBuilder.buildEx = function(config){
	var options = {
			container : $('<tr></tr>'),
			fieldId: '',
			fieldName: '',
			groupId: '',
			columns: 1,
			colSpan: 1, 
			required: false,
			readOnly: false,
			isMultiple: true
	};
	SmartWorks.extend(options, config);

	var labelWidth = 12;
	if(options.columns >= 1 && options.columns <= 4 && options.colSpan <= options.columns) labelWidth = 12 * options.columns/options.colSpan;
	$formEntity =  $($.parseXML('<formEntity id="' + options.fieldId + '" name="' + options.fieldName + '" systemType="string" required="' + options.required + '" system="false">' +
						'<format type="fileField" viewingType="fileField"/>' +
					    '<graphic hidden="false" readOnly="'+ options.readOnly +'" labelWidth="'+ labelWidth + '"/>' +
					'</formEntity>')).find('formEntity');
	var $formCol = $('<td class="form_col js_type_fileField" fieldid="' + options.fieldId+ '" colspan="' + options.colSpan + '" width="' + options.colSpan/options.columns*100 + '%" rowspan="1">');
	$formCol.appendTo(options.container);
	SmartWorks.FormRuntime.FileFieldBuilder.build({
			mode : options.readOnly, // view or edit
			container : $formCol,
			entity : $formEntity,
			isMultiple : options.isMultiple,
			dataField : SmartWorks.FormRuntime.FileFieldBuilder.dataField({
				fieldId: options.fieldId,
				groupId: options.groupId
			})
	});
	
};

SmartWorks.FormRuntime.FileFieldBuilder.serializeObject = function(fileFields){
	

	var filesJson = {};
	for(var k=0; k<fileFields.length; k++) {
		var fileField = $(fileFields[k]);
		var qqUpLoader = fileField.find('.qq-uploader');
		if (isEmpty(qqUpLoader)) {
			for(var i=0; i<fileFields.length; i++){
				var fileField = $(fileFields[i]);
				var groupId = fileField.find('.form_value').attr('groupId');
				if(!isEmpty(groupId)){
					var fileJson = { groupId : groupId};
					var files = fileField.find('.qq-upload-file');
					var fileInfos = new Array();
					for(var j=0; j<files.length; j++){
						var file = $(files[j]);
						fileInfos.push({fileId : file.attr('fileId'), fileName : file.attr('fileName'), fileSize : file.attr('fileSize'), localFilePath : file.attr('localFilePath'),
										folderId : file.attr('folderId'), msgId : file.attr('msgId'), partId : file.attr('partId'), fileType : 'Files'});
					}
					if(!isEmpty(fileInfos))
						fileJson['files'] = fileInfos;
					filesJson[fileField.attr('fieldId')] = fileJson; 
				}
			}
		} else {
			var fileUploaders = fileFields.find('.qq-uploader');
			for(var i=0; i<fileUploaders.length; i++){
				var noRefreshData = false;
				var fileUploader = $(fileUploaders[i]);
				var fieldId = fileUploader.parent('span').attr('id');
				var fileJson = { groupId : fileUploader.attr('groupId')};
				var files = fileUploader.find('.qq-upload-success');
				var fileInfos = new Array();
				for(var j=0; j<files.length; j++){
					var file = $(files[j]);
					fileInfos.push({fileId : file.attr('fileId'), fileName : file.attr('fileName'), fileSize : file.attr('fileSize'), localFilePath : file.attr('localFilePath'),
									folderId : file.attr('folderId'), msgId : file.attr('msgId'), partId : file.attr('partId'), fileType : 'Files'});
					if(!isEmpty(file.attr('localFilePath')))
						noRefreshData = true;
				}
				fileJson['files'] = fileInfos;
				if(noRefreshData){
					fileJson['noRefreshData'] = 'true';
				}
				filesJson[fieldId] =  fileJson;
			}
			
		}
	}
//	if(isEmpty(fileUploaders) && !isEmpty(fileFields)){
//		for(var i=0; i<fileFields.length; i++){
//			var fileField = $(fileFields[i]);
//			var groupId = fileField.find('.form_value').attr('groupId');
//			if(!isEmpty(groupId)){
//				var fileJson = { groupId : groupId};
////				var fileInfos = new Array();
////				fileJson['files'] = fileInfos;
//				filesJson[fileField.attr('fieldId')] = fileJson; 
//			}
//		}
//	}
	return filesJson;
};

SmartWorks.FormRuntime.FileFieldBuilder.validate = function(fileFields){
	var fileUploaders = fileFields.find('.sw_required').find('.qq-uploader');
	var filesValid = true;
	for(var i=0; i<fileUploaders.length; i++){
		var fileUploader = $(fileUploaders[i]);
		var files = fileUploader.find('.qq-upload-success');
		if(isEmpty(files)){
			fileUploader.parents('.js_type_fileField:first').find('span.sw_required').addClass("sw_error");
			filesValid = false;
		}
	}
	return filesValid;
};

SmartWorks.FormRuntime.FileFieldBuilder.dataField = function(config){
	var options = {
			fieldName: '',
			fieldId: '',
			formXml: '',
			groupId: '',
			isTempfile: false,
			isMultiple: false,
			isProfile:false,
			fileList: null
	};

	SmartWorks.extend(options, config);
	$formXml = isEmpty(options.formXml) ? [] : $($.parseXML(options.formXml)).find('form');
	var dataField = {};
	var fieldId = (isEmpty(options.fieldId)) ? $formXml.find('formEntity[name="'+options.fieldName+'"]').attr('id') : options.fieldId;
	if(isEmpty(fieldId)) fieldId = ($formXml.attr("name") === options.fieldName) ? $formXml.attr('id') : "";
	if(isEmpty(fieldId)) return dataField;
	dataField = {
			id: fieldId,
			value: options.groupId,
			isTempfile: options.isTempfile,
			isMultiple: options.isMultiple,
			isProfile: options.isProfile,
			fileList: options.fileList
	};
	return dataField;
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[file_field script]', null, error);
}