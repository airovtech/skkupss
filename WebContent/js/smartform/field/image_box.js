try{
SmartWorks.FormRuntime = SmartWorks.FormRuntime || {};

SmartWorks.FormRuntime.ImageBoxBuilder = {};

SmartWorks.FormRuntime.ImageBoxBuilder.build = function(config) {
	var options = {
		mode : 'view', // view or edit
		container : $('<div></div>'),
		entity : null,
		dataField : '',
		refreshData : false,
		layoutInstance : null,
		isDataGrid : false,
		isBuildEx : false
	};

	SmartWorks.extend(options, config);

	var noRefreshData = (options.dataField && options.dataField.noRefreshData) || '';
	
	if(options.refreshData && noRefreshData == 'true'){
		return options.container;
	}
	
//	options.container.html('');

	var value = (options.dataField && options.dataField.value) || '';
	var imgSource = (options.dataField && options.dataField.imgSource) || '';
	var $entity = options.entity;
	var $graphic = $entity.find('graphic');
	var picWidth = parseFloat($graphic.attr('pictureWidth'));
	var picHeight = parseFloat($graphic.attr('pictureHeight'));

	var readOnly = $graphic.attr('readOnly') === 'true' || options.mode === 'view';
	var id = $entity.attr('id');
	var name = $entity.attr('name');

	var labelWidth = (isEmpty(options.layoutInstance)) ? parseInt($graphic.attr('labelWidth')) : options.layoutInstance.getLabelWidth(id);
	var valueWidth = 100 - (options.isDataGrid ? 0 : labelWidth);
	
	if(options.isBuildEx){
		var spanRequired = "";
		var required = $entity.attr('required');
		if(required === 'true' && !readOnly){
			spanRequired = '<div class="label_required"></div>';
			required = ' class="form_value sw_required" ';
		}else{
			required = ' class="form_value" ';
		}
		
		var picSize = 'style="min-height:0px; max-width:' + ((picWidth) ? picWidth : 300) + 'px;' + ((picHeight) ? ('height:' + picHeight + 'px;"') : '"' );
		var src = (isBlank(imgSource)) ? 'src=""' : ' src="' + imgSource + '" ';
		var $image = $('<div ' + required + ' style="width:' + valueWidth + '%"><img class="js_auto_picture" onerror="$(this).hide();" onload="$(this).show();" ' + picSize + src + '><div>');
		var $label = null;
		$label = $('<div class="form_label" style="width:' + labelWidth + '%"><span id="' + id + '"></span></div>').append(spanRequired);
		if(!options.isDataGrid && !options.refreshData)
			$label.appendTo(options.container);
		
		if(!options.isDataGrid){
			$image.appendTo(options.container);
		}
		
		if ($graphic.attr('hidden') == 'true'){
			options.container.hide();
		}
		
	}else{
		var $label = $('<div class="form_label" style="width:' + labelWidth + '%"><span>' + name + '</span></div>');
		var required = $entity.attr('required');
		if(required === 'true' && !readOnly){
			$label.addClass('required_label');
			required = ' class="sw_required"';
		}else{
			required = '';		
		}
		if(!options.isDataGrid && !options.refreshData)
			$label.appendTo(options.container);
		
		var picSize = 'style="min-height:0;width:100%"';
		var src = (isBlank(imgSource)) ? 'src=""' : ' src="' + imgSource + '" ';
		var $image = $('<div class="form_value" groupId="' + value + '" style="width:' + valueWidth + '%"><span id="' + id + '"' + required + '></span><img class="js_auto_picture" onerror="$(this).hide();" onload="$(this).show();" ' + picSize + src + '><div>');
		if(!options.isDataGrid && !options.refreshData){
			$image.appendTo(options.container);
		}
		
		if ($graphic.attr('hidden') == 'true'){
			options.container.hide();
		}
	}
	
	if(!readOnly){
		$image.attr('title', $entity.attr('toolTip'));
	}

	var isHidden =  (options.dataField && options.dataField.isHidden) || null;
	var isReadOnly =  (options.dataField && options.dataField.isReadOnly) || null;
	var isRequired =  (options.dataField && options.dataField.isRequired) || null;
//	if(!options.refreshData || !isReadOnly){
	if(!options.refreshData){
		if (!readOnly) {
			createUploader(value, options.container.find('#'+id), false, true, false, null, options.isBuildEx);
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
				formValue.removeAttr('title');
				formLabel.removeClass('required_label');
			}else if(isReadOnly == 'false'){
				createUploader(value, options.container.find('#'+id), false, true, false, null, options.isBuildEx);
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
SmartWorks.FormRuntime.ImageBoxBuilder.buildEx = function(config){
	var options = {
			container : $('<tr></tr>'),
			fieldId: '',
			fieldName: '',
			groupId: '', 	//데이터 값으로 이미지 groupId 또는 img src를 입력하면 사진을 가져와 보여 준다.
			imgSource: '',	//데이터 값으로 이미지 groupId 또는 img src를 입력하면 사진을 가져와 보여 준다.
			columns: 1,
			colSpan: 1,
			pictureWidth: 300,
			pictureHeight: 0,
			required: false,
			readOnly: false		
	};
	SmartWorks.extend(options, config);
	var labelWidth = 12;
	if(options.columns >= 1 && options.columns <= 4 && options.colSpan <= options.columns) labelWidth = 12 * options.columns/options.colSpan;
	$formEntity =  $($.parseXML('<formEntity id="' + options.fieldId + '" name="' + options.fieldName + '" systemType="string" required="' + options.required + '" system="false">' +
						'<format type="imageBox" viewingType="imageBox"/>' +
					    '<graphic hidden="false" readOnly="'+ options.readOnly + '" labelWidth="'+ labelWidth + '" pictureWidth="'+ options.pictureWidth + '" pictureHeight="' + options.pictureHeight + '"/>' +
					'</formEntity>')).find('formEntity');
	var $formCol = $('<td class="form_col js_type_imageBox" fieldid="' + options.fieldId + '"  colspan="' + options.colSpan + '" width="' + options.colSpan/options.columns*100 + '%" rowspan="1">');
	$formCol.appendTo(options.container);
	SmartWorks.FormRuntime.ImageBoxBuilder.build({
			mode : options.readOnly, // view or edit
			container : $formCol,
			entity : $formEntity,
			dataField : SmartWorks.FormRuntime.ImageBoxBuilder.dataField({
				fieldId: options.fieldId,
				groupId: options.groupId,
				imgSource: options.imgSource
			}),
			refreshData : false,
			layoutInstance : null,
			isDataGrid : false,
			isBuildEx : true
	});
	
};

SmartWorks.FormRuntime.ImageBoxBuilder.serializeObject = function(imageBoxs){
//	var fileUploaders = imageBoxs.find('.qq-uploader');
//	var filesJson = {};
//	for(var i=0; i<fileUploaders.length; i++){
//		var fileUploader = $(fileUploaders[i]);
////		if(!isEmpty(fileUploader.parents('td.js_type_dataGrid'))) continue;
//		var fieldId = fileUploader.parent('span').attr('id');
//		var fileJson = { groupId : fileUploader.attr('groupId')};
//		var files = fileUploader.find('.qq-upload-success');
//		var fileInfos = new Array();
//		for(var j=0; j<files.length; j++){
//			var file = $(files[j]);
//			fileInfos.push({fileId : file.attr('fileId'), fileName : file.attr('fileName')});
//		}
//		fileJson['files'] = fileInfos;
//		filesJson[fieldId] =  fileJson;
//	}
//	return filesJson;


	var filesJson = {};
	for(var k=0; k<imageBoxs.length; k++) {
		var imageBox = $(imageBoxs[k]);
		var qqUpLoader = imageBox.find('.qq-uploader');
		if (isEmpty(qqUpLoader)) {
			for(var i=0; i<imageBoxs.length; i++){
				var imageBox = $(imageBoxs[i]);
				var groupId = imageBox.find('.form_value').attr('groupId');
				if(!isEmpty(groupId)){
					var fileJson = { groupId : groupId};
					var files = imageBox.find('.qq-upload-file');
					var fileInfos = new Array();
					for(var j=0; j<files.length; j++){
						var file = $(files[j]);
						fileInfos.push({fileId : file.attr('fileId'), fileName : file.attr('fileName'), fileSize : file.attr('fileSize'), localFilePath : file.attr('localFilePath'),
										folderId : file.attr('folderId'), msgId : file.attr('msgId'), partId : file.attr('partId'), fileType : 'Pictures'});
					}
					if(!isEmpty(fileInfos))
						fileJson['files'] = fileInfos;
					filesJson[imageBox.attr('fieldId')] = fileJson; 
				}
			}
		} else {
			var fileUploaders = imageBoxs.find('.qq-uploader');
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
									folderId : file.attr('folderId'), msgId : file.attr('msgId'), partId : file.attr('partId'), fileType : 'Pictures'});
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
	return filesJson;
};

SmartWorks.FormRuntime.ImageBoxBuilder.validate = function(imageBoxs){
	if(isEmpty(imageBoxs.find('.sw_required'))) return true;
	var fileUploaders = imageBoxs.find('.qq-uploader');
	var imagesValid = true;
	for(var i=0; i<fileUploaders.length; i++){
		var fileUploader = $(fileUploaders[i]);
		var files = fileUploader.find('.qq-upload-success');
		if(isEmpty(files)){
			fileUploader.parents('.js_type_imageBox:first').find('.sw_required').addClass("sw_error");
			imagesValid = false;
		}
	}
	return imagesValid;
};

SmartWorks.FormRuntime.ImageBoxBuilder.dataField = function(config){
	var options = {
			fieldName: '',
			formXml: '',
			fieldId: '',
			groupId: '',
			imgSource: '',
			isTempfile: false,
			isMultiple: false,
			isProfile:false
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
			imgSource : options.imgSource,
			isTempfile: options.isTempfile,
			isMultiple: options.isMultiple,
			isProfile: options.isProfiel
	};
	return dataField;
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[image_box script]', null, error);
}