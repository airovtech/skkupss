try{
function getExt(fileName) {
	try{
		var pos = fileName.lastIndexOf('.');
		var ext = 'none';
		var extTypes = new Array("asf", "avi", "bmp", "doc", "docx", "exe", "gif", "hwp", "jpg", "mid", "mp3",
				"mpeg", "mpg", "pdf", "pds", "ppt", "pptx", "rar", "txt", "wav", "wma", "wmv", "word", "xls", "xlsx", "zip");
		if (pos != -1) {
			var extTemp = fileName.substring( pos + 1, fileName.length).toLowerCase();
			for(var i=0; i<extTypes.length; i++) {
				if(extTemp === extTypes[i])
					ext = extTemp;
			}
		}
		return ext;
	}catch(error){
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-file getExt]', null, error);
	}			
}

function fileUploader(groupId, target) {
	
	var template = '<div class="qq-uploader js_form_file_field">' + 
    '<div class="qq-upload-drop-area"><span>' + smartMessage.get("uploadDropArea") + '</span></div>' +
    '<div class="qq-upload-button">' + "제품사진" + '</div>' +
    '<ul class="qq-upload-list"></ul>' + 
    '</div>';

	var uploadFileTemplate = '<li>' +
	'<span></span>' +
	'<a href="#" class="qq-upload-file linkline"></a>' +
	'<span class="qq-upload-spinner"></span>' +
	'<span class="qq-upload-size"></span>' +
	'<a class="qq-upload-cancel" href="#">' + smartMessage.get("cancelUpload") + '</a>' +
	'<span class="qq-upload-failed-text">' + smartMessage.get("uploadFailed") + '</span>' +
	'<a href="#" class="qq-delete-text" style="display:none">X</a>' +
	'</li>';

	return new qq.FileUploader({
        element: $(target)[0],

        params: {
        	groupId : groupId
        },
        sizeLimit: companyGeneral.fileUploadLimit*1024*1024,
        messages: {
            typeError: smartMessage.get('uploadTypeError'),
            sizeError: smartMessage.get('uploadSizeError'),
            minSizeError: smartMessage.get('uploadMinSizeError'),
            emptyError: smartMessage.get('uploadEmptyError'),
            onLeave: smartMessage.get('uploadOnLeave')            
        },
        action: 'upload_temp_file.sw',
        onSubmit: function(id, fileName) {
        	try{
	        	var uploader = $(this.element).find('.qq-uploader');
	        	var isMultiple = uploader.attr('isMultiple');
	        	var files = $(this.element).find('.qq-upload-list li');
	        	for(var i = 0;i < files.length;i++) {
	    			var file = $(files[i]);
	                if(isMultiple!=='true'){
	            		$.ajax({
	            			url : "delete_file.sw",
	            			data : {
	            				fileId : file.attr('fileId'),
	            				fileName : file.siblings('a').attr('filename')
	            			},
	            			type : "POST",
	            			context : this,
	            			success : function(data, status, jqXHR) {
	            				try{
	            					file.remove();
	            	        	}catch(error){
	            	        		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-file fileUploader delete_file]', null, error);
	            	        	}			
	            			},
	            			error : function(xhr, ajaxOptions, thrownError){
	            				
	            			}
	            		});
	        		}else{
		    			var name = file.find('.qq-upload-file').attr('fileName');
		    			if(fileName === name) 
		    				return false;
	        		}
	        	}
	        	return true;
        	}catch(error){
        		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-file fileUploader onSubmit]', null, error);
        	}			
        },
        onComplete : function(id, fileName, responseJSON, arg1, arg2){
        	try{
	//        	var file = $(this.element).find('.qq-upload-list li[qqFileId=' + id + ']');
	        	var files = $(this.element).find('.qq-upload-list li');
	        	var file = null;
	        	for(var i=0; i<files.length; i++){
	        		if(files[i].qqFileId == id){
	        			file = $(files[i]);
	        			break;
	        		}
	        	}
	        	if(isEmpty(file) || !responseJSON.success) return;
	        	
	        	var localFilePath = responseJSON.localFilePath;
	        	while( localFilePath.indexOf('[R_S]') != -1 )
	        	{
	        		localFilePath = localFilePath.replace('[R_S]', '/');
	        	}
	        	
	        	file.attr('fileId', responseJSON.fileId).attr('fileName', fileName).attr('fileSize', responseJSON.fileSize).attr('fullPathName', responseJSON.fullPathName).attr('localFilePath', localFilePath);
	        	var ext = getExt(fileName);
	        	var workId = file.parents('form[name="frmSmartForm"]').attr('workId');
	        	var taskInstId = file.parents('form[name="frmSmartForm"]').attr('taskInstId');
	        	var recordId = file.parents('form[name="frmSmartForm"]').attr('recordId');
	    		file.find('.qq-upload-file').prev('span').addClass('icon_file_' + ext).addClass('vm');
	        	file.find('.qq-upload-file').attr('href', 'download_file.sw?fileId=' + responseJSON.fileId + "&fileName=" + fileName + "&workId=" + workId + "&taskInstId=" + taskInstId + "&recordId=" + recordId);
	        	file.find('.qq-delete-text').show();
	        	if(file.hasClass('qq-upload-success') && file.parents('form.js_validation_required:first').find('.sw_required').hasClass('sw_error')){
	        		file.parents('form.js_validation_required:first').find('.sw_required').removeClass('sw_error');
					file.parents('form.js_validation_required:first').validate({ showErrors: showErrors}).form();
	        	}
	        	if(file.hasClass('qq-upload-success') && !isEmpty(file.parents('td.js_type_imageBox'))){
		        	file.parents('td.js_type_imageBox:first').find('img.js_auto_picture').attr("src", responseJSON.fullPathName);
	        	}
        	}catch(error){
        		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-file fileUploader onComplete]', null, error);
        	}			
        },
        fileTemplate : uploadFileTemplate,
        template : template,
        debug: true
    });
}

function videoYTUploader(target) {
	
	var template = '<div class="qq-uploader js_form_file_field">' + 
    '<div class="qq-upload-drop-area"><span>' + smartMessage.get("uploadDropArea") + '</span></div>' +
    '<div class="qq-upload-button">' + smartMessage.get("uploadFile") + '</div>' +
    '<ul class="qq-upload-list"></ul>' + 
    '</div>';

	var uploadFileTemplate = '<li>' +
	'<span></span>' +
	'<a href="#" class="qq-upload-file linkline"></a>' +
	'<span class="qq-upload-spinner"></span>' +
	'<span class="qq-upload-size"></span>' +
	'<a class="qq-upload-cancel" href="#">' + smartMessage.get("cancelUpload") + '</a>' +
	'<span class="qq-upload-failed-text">' + smartMessage.get("uploadFailed") + '</span>' +
	'<a href="#" class="qq-delete-text" style="display:none">X</a>' +
	'</li>';

	return new qq.FileUploader({
        element: $(target)[0],

        params: {},
        sizeLimit: 200*1024*1024,
        messages: {
            typeError: smartMessage.get('uploadTypeError'),
            sizeError: smartMessage.get('uploadSizeError'),
            minSizeError: smartMessage.get('uploadMinSizeError'),
            emptyError: smartMessage.get('uploadEmptyError'),
            onLeave: smartMessage.get('uploadOnLeave')            
        },
        action: 'upload_yt_video.sw',
        onSubmit: function(id, fileName) {
        	try{
	        	var files = $(this.element).find('.qq-upload-list li');
	        	for(var i = 0;i < files.length;i++) {
	    			$(files[i]).remove();
	        	}
	        	return true;
        	}catch(error){
        		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-file videoYTUploader onSubmit]', null, error);
        	}			
        },
        onComplete : function(id, fileName, responseJSON){
        	try{
	        	var files = $(this.element).find('.qq-upload-list li');
	        	var file = null;
	        	for(var i=0; i<files.length; i++){
	        		if(files[i].qqFileId == id){
	        			file = $(files[i]);
	        			break;
	        		}
	        	}
	        	if(isEmpty(file) || !responseJSON.success) return;
	        	file.attr('videoYTId', responseJSON.videoYTId).attr('fileName', fileName).attr('fileSize', responseJSON.fileSize);
	        	var ext = getExt(fileName);
	    		file.find('.qq-upload-file').prev('span').addClass('icon_file_' + ext).addClass('vm');
	        	file.find('.qq-delete-text').show();
	        	if(file.hasClass('qq-upload-success') && file.parents('form.js_validation_required:first').find('.sw_required').hasClass('sw_error')){
	        		file.parents('form.js_validation_required:first').find('.sw_required').removeClass('sw_error');
					file.parents('form.js_validation_required:first').validate({ showErrors: showErrors}).form();
	        	}
	        	if(file.hasClass('qq-upload-success') && !isEmpty(file.parents('td.js_type_videoYTBox'))){
	        		var videoYT = file.parents('td.js_type_videoYTBox:first').find('object');
	        		var videoSize = videoYT.attr('style');
	        		var params = '<param name="movie" value="https://www.youtube.com/v/' + responseJSON.videoYTId + '?version=3&autohide=1&showinfo=0"></param>' +
					 			 '<param name="allowScriptAccess" value="always"></param>' +
					 			 '<param name="allowFullScreen" value="true"></param>' +
					 			 '<embed src="https://www.youtube.com/v/' + responseJSON.videoYTId + '?version=3&autohide=1&showinfo=0"' + 
					 			 	'type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" ' + videoSize +
					 			 '</embed>';
		        	videoYT.html(params);
	        	}
        	}catch(error){
        		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-file videoYTUploader onComplete]', null, error);
        	}			
        },
        fileTemplate : uploadFileTemplate,
        template : template,
        debug: true
    });
}

function createUploader(groupId, target, isMultiple, isProfile, isTempFile, fileList, isBuildEx){
	try{
		var uploadFileTemplate = '<li>' +
		'<span></span>' +
		'<a href="#" class="qq-upload-file linkline"></a>' +
		'<span class="qq-upload-spinner"></span>' +
		'<span class="qq-upload-size"></span>' +
		'<a class="qq-upload-cancel" href="#">' + smartMessage.get("cancelUpload") + '</a>' +
		'<span class="qq-upload-failed-text">' + smartMessage.get("uploadFailed") + '</span>' +
		'<a href="#" class="qq-delete-text" style="display:none">X</a>' +
		'</li>';
		if(!groupId) {
			groupId = randomUUID('fg_');
			fileUploader(groupId, target);
			var uploader = $(target).find('.qq-uploader');
			uploader.attr('isMultiple', isMultiple).attr('groupId', groupId);
			if(isProfile && isBuildEx) uploader.find('.qq-upload-list').hide();
		} else if(isTempFile) {
			fileUploader(groupId, target);
			var uploader = $(target).find('.qq-uploader');
			uploader.attr('isMultiple', isMultiple).attr('groupId', groupId);
			if(isProfile && isBuildEx) uploader.find('.qq-upload-list').hide();
			
			if(!isEmpty(fileList)) {
				$(fileList).clone().appendTo(uploader.find('.qq-upload-list'));
			}
			
		} else if(!isProfile){
			$.ajax({				
				url : "find_file_group.sw",
				data : {
					groupId : groupId
				},
				type : "GET",
				context : this,
				success : function(data, status, jqXHR) {
					try{
						fileUploader(groupId, target);
						var uploader_div = $(target);
						uploader_div.find('.qq-uploader').attr('isMultiple', isMultiple).attr('isProfile', isProfile).attr('groupId', groupId);
		
						var files = uploader_div.find('.qq-upload-list');
						for(var i in data) {
							var fileName = data[i].fileName;
							var displayFileName = fileName;
							if (fileName.length > 33) {
								displayFileName = fileName.slice(0, 19) + '...' + fileName.slice(-13);
							}
							
							var ext = getExt(fileName);
		
							var file = $(uploadFileTemplate).appendTo(files);
				        	var workId = file.parents('form[name="frmSmartForm"]').attr('workId');
				        	var taskInstId = file.parents('form[name="frmSmartForm"]').attr('taskInstId');
				        	var recordId = file.parents('form[name="frmSmartForm"]').attr('recordId');
							file.addClass('qq-upload-success');
							file.attr('fileId', data[i].id).attr('fileName', fileName).attr('fileSize', data[i].fileSize);
							file.find('.qq-upload-file').prev('span').addClass('icon_file_' + ext).addClass('vm');
							file.find('.qq-upload-file').text(displayFileName);
				        	file.find('.qq-upload-file').attr('href', 'download_file.sw?fileId=' + data[i].id + "&fileName=" + fileName + "&workId=" + workId + "&taskInstId=" + taskInstId + "&recordId=" + recordId);
							file.find('.qq-upload-size').text(data[i].fileSize);
							file.find('.qq-upload-cancel').remove();
							file.find('.qq-upload-spinner').remove();
							file.find('.qq-delete-text').show();
						}
		        	}catch(error){
		        		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-file createUploader find_file_group]', null, error);
		        	}			
				},
				error : function(xhr, ajaxOptions, thrownError) {
	        		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-file createUploader find_file_group]', null, thrownError);
				}
			});
		} else if(isProfile){
			$.ajax({				
				url : "find_file_group.sw",
				data : {
					groupId : groupId
				},
				type : "GET",
				context : this,
				success : function(data, status, jqXHR) {
					try{
						fileUploader(groupId, target);
						var uploader_div = $(target);
						uploader_div.find('.qq-uploader').attr('isMultiple', isMultiple).attr('isProfile', isProfile).attr('groupId', groupId);
		
						
						var files = uploader_div.find('.qq-upload-list');
						for(var i in data){
							var fileName = data[i].fileName;
							var displayFileName = fileName;
							if (fileName.length > 33) {
								displayFileName = fileName.slice(0, 19) + '...' + fileName.slice(-13);
							}
							
							var ext = getExt(fileName);
		
							var file = $(uploadFileTemplate).appendTo(files);
				        	var workId = file.parents('form[name="frmSmartForm"]').attr('workId');
				        	var taskInstId = file.parents('form[name="frmSmartForm"]').attr('taskInstId');
				        	var recordId = file.parents('form[name="frmSmartForm"]').attr('recordId');
							file.addClass('qq-upload-success');
							file.attr('fileId', data[i].id).attr('fileName', fileName).attr('fileSize', data[i].fileSize);
							file.find('.qq-upload-file').prev('span').addClass('icon_file_' + ext).addClass('vm');
							file.find('.qq-upload-file').text(displayFileName);
				        	file.find('.qq-upload-file').attr('href', 'download_file.sw?fileId=' + data[i].id + "&fileName=" + fileName + "&workId=" + workId + "&taskInstId=" + taskInstId + "&recordId=" + recordId);
							file.find('.qq-upload-size').text(data[i].fileSize);
							file.find('.qq-upload-cancel').remove();
							file.find('.qq-upload-spinner').remove();
							file.find('.qq-delete-text').show();
							
				        	if(file.hasClass('qq-upload-success') && !isEmpty(file.parents('td.js_type_imageBox'))){
					        	file.parents('td.js_type_imageBox:first').find('img.js_auto_picture').attr("src", data[i].imageServerPath);
				        	}
						}
		        	}catch(error){
		        		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-file createUploader find_file_group]', null, error);
		        	}			
				},
				error : function(xhr, ajaxOptions, thrownError) {
	        		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-file createUploader find_file_group]', null, thrownError);
				}
			});
		}
	}catch(error){
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-file createUploader]', null, error);
	}			
}

function viewFiles(groupId, target){
	try{
		var viewFileTemplate = '<li>' +
		'<span></span>' +
		'<a href="#" class="qq-upload-file linkline"></a>' +
		'<span class="qq-upload-size"></span>' +
		'</li>';
		
		if(!groupId) {
			return;
		} else {
			$.ajax({				
				url : "find_file_group.sw",
				data : {
					groupId : groupId
				},
				type : "GET",
				context : this,
				success : function(data, status, jqXHR) {
					try{
						var files = $(target).html('');
						var isMultiple = !isEmpty(data) && data.length>1;
						for(var i in data) {
		
							var fileName = data[i].fileName;
		
							var displayFileName = fileName;
							if (fileName.length > 33) {
								displayFileName = fileName.slice(0, 19) + '...' + fileName.slice(-13);
							}
							
							var ext = getExt(fileName);
							
							var file = $(viewFileTemplate).appendTo(files);
				        	var workId = file.parents('form[name="frmSmartForm"]').attr('workId');
				        	var taskInstId = file.parents('form[name="frmSmartForm"]').attr('taskInstId');
				        	var recordId = file.parents('form[name="frmSmartForm"]').attr('recordId');
							file.attr('fileId', data[i].id);
							file.find('.qq-upload-file').prev('span').addClass('icon_file_' + ext).addClass('vm');
							file.find('.qq-upload-file').text(displayFileName);
				        	file.find('.qq-upload-file').attr('fileName', fileName).attr('fileId', data[i].id).attr('fileSize', data[i].fileSize).attr('href', 'download_file.sw?fileId=' + data[i].id + "&fileName=" + fileName + "&workId=" + workId + "&taskInstId=" + taskInstId + "&recordId=" + recordId);
							file.find('.qq-upload-size').text(getBytesWithUnit(data[i].fileSize));
						}
						if(isMultiple){
							var $downloadFiles = $('<li><div class="icon_btn_start"><a href="" class="icon_btn_tail">'+ smartMessage.get('downloadAllFiles') + '</a></div></li>');						
							$downloadFiles.find('a').attr('href', 'download_file.sw?groupId=' + groupId + '&workId=' + workId + '&taskInstId=' + taskInstId + '&recordId=' + recordId);
							$downloadFiles.appendTo(files);
						}
						
		        	}catch(error){
		        		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-file viewFiles find_file_group]', null, error);
		        	}			
				},
				error : function(xhr, ajaxOptions, thrownError) {
	        		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-file viewFiles find_file_group]', null, thrownError);
				}
			});
		}
	}catch(error){
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-file viewFiles]', null, error);
	}			
}

function createYTUploader(videoYTId, target, fileList){
	try{
		videoYTUploader(target);
		var uploader = $(target).find('.qq-uploader');
		uploader.attr('videoYTId', videoYTId);
	}catch(error){
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-file createYTUploader]', null, error);
	}			
}
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-file script]', null, error);
}
