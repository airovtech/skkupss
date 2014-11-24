
function getBytesWithUnit( bytes ){
	if( isNaN( bytes ) ){ return; }
	var units = [ ' bytes', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB' ];
	var amountOf2s = Math.floor( Math.log( +bytes )/Math.log(2) );
	if( amountOf2s < 1 ){
		amountOf2s = 0;
	}
	var i = Math.floor( amountOf2s / 10 );
	bytes = +bytes / Math.pow( 2, 10*i );
 
	// Rounds to 3 decimals places.
        if( bytes.toString().length > bytes.toFixed(3).toString().length ){
            bytes = bytes.toFixed(1);
        }
	return bytes + units[i];
}

function toggleToolBars() {
	var seTool = document.getElementById('se2_tool');
	var seToggler = document.getElementById('c_tool');
	var seInput = document.getElementById('s_area');
	var seIframe = document.getElementById('se2_iframe');

	if (seTool.style.display === 'none') {
		seTool.style.display = 'block';
		var toolHeight = seTool.offsetHeight;
		seToggler.innerHTML = '▲';
		seInput.style.height = (parseInt(seInput.style.height) - parseInt(toolHeight)) + 'px';
		seIframe.style.height = (parseInt(seIframe.style.height) - parseInt(toolHeight)) + 'px';
	} else {
		var toolHeight = seTool.offsetHeight;
		seTool.style.display = 'none';
		seToggler.innerHTML = '▼';
		if (!isNaN(parseInt(seInput.style.height))) {
			seInput.style.height = (parseInt(seInput.style.height) + parseInt(toolHeight)) + 'px';
		}
		if (!isNaN(parseInt(seIframe.style.height))) {
			seIframe.style.height = (parseInt(seIframe.style.height) + parseInt(toolHeight)) + 'px';
		}
	}
}

function uploadImageFile(uploadForm, target)
{

	var theFrm = uploadForm;

	fileName = theFrm.fileSelectImage.value;

	if (fileName == "") {
		alert('Please select an image file!');
		return;
	}
	pathpoint = fileName.lastIndexOf('.');
	filepoint = fileName.substring(pathpoint+1,fileName.length);
	filetype = filepoint.toLowerCase();
	if (filetype != 'jpg' && filetype != 'gif' && filetype != 'png' && filetype != 'jpeg' && filetype !='bmp') {
		alert('It is invalid image file. Please select an image file(jpg, gif, jpeg, bmp)!');
		return;
	}

    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function(){            
    	if (xhr.readyState == 4){
    		var responseJSON;
    		try{
	    		responseJSON = eval("(" + xhr.responseText + ")");
	    		var fileFullPath = responseJSON.fullPathName;
	    		if(fileFullPath){
		    	    var sHTML = "<img src='" + fileFullPath + "' border='0' style='max-width:98%; padding:10px; width:100%'>";
		    	    target.fileFullPath = fileFullPath;
		    	    target.imageInnerDoc = document.getElementsByTagName('iframe')[0].contentDocument.body.innerHTML;
		    	    target.oApp.exec("PASTE_HTML", [sHTML]);
			  		target.oDirectInput.style.display = 'block';
			  		target.oButtonArea.style.display = 'block';
	    		}
    		}catch (err){
	    		responseJSON = {};
				alert("Uploading the Image file has been aborted !!");
	    	}
    	}
    };
    
    // build query string
    var baseUri = window.location.href.substring(0,window.location.href.lastIndexOf('/'));
    baseUri = baseUri.substring(0, baseUri.lastIndexOf('/'));
    var qqFile = fileName.substring(fileName.lastIndexOf('\\')+1,fileName.length);
    var queryString =  baseUri + '/upload_temp_file.sw?qqFile=' + qqFile;
    xhr.open("POST", queryString, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("X-File-Name", encodeURIComponent(qqFile));
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.send(theFrm.fileSelectImage.files[0]);
    target.xhr = xhr;
    return;
}

function uploadVideoFile(uploadForm, target)
{

	var theFrm = uploadForm;

	fileName = theFrm.fileSelectVideo.value;

	if (fileName == "") {
		alert('Please select a video file');
		return;
	}
	pathpoint = fileName.lastIndexOf('.');
	filepoint = fileName.substring(pathpoint+1,fileName.length);
	filetype = filepoint.toLowerCase();
	if (filetype != 'mov' && filetype != 'mpeg4' && filetype != 'mp4' && filetype != 'avi' && filetype !='wmv'
		&& filetype != 'mpegs' && filetype != 'flv' && filetype != '3gpp' && filetype != 'webm') {
		alert('It is invalid video file. Please select an video file(mov, mpeg4, mp4, avi, wmv, mpegs, flv, 3gpp, webm)!');
		return;
	}

    var xhr = new XMLHttpRequest();
 
    document.getElementById('videoUploadButton').style.display = 'none';
    var uploadProgress1 = theFrm.uploadProgress1;
    uploadProgress1.style.display = 'block';
    uploadProgress1.value = "Now uploading 0% ";
    
    xhr.upload.onprogress = function(e){
    	if (e.lengthComputable){
    		uploadProgress1.value = "Now uploading " + parseInt(e.loaded/e.total*100) + "%(" + getBytesWithUnit(e.loaded) + "/" + getBytesWithUnit(e.total) + ")";
    	}
    	
		if(e.loaded == e.total){
		    var uploadProgress2 = theFrm.uploadProgress2;
		    var uploadProgress3 = theFrm.uploadProgress3;
		    uploadProgress2.style.display = 'block';
		    uploadProgress3.style.display = 'block';
    		uploadProgress1.value = getBytesWithUnit(e.total) + " Uploading completed.";
    		uploadProgress1.style.color = '#666';
    		uploadProgress2.value = "Now inserting onto YOUTUBE!!";
		    uploadProgress3.value = "Please wait for a few minutes!";
		}
    };

    xhr.onreadystatechange = function(){            
    	if (xhr.readyState == 4){
    		var responseJSON;
    		try{
	    		responseJSON = eval("(" + xhr.response + ")");
	    		if(responseJSON.videoYTId){
	        		var sHTML =  '<object style="max-width:98%; padding:10px;">' + 
		        					 '<param name="movie" value="https://www.youtube.com/v/' + responseJSON.videoYTId + '?version=3&autohide=1&showinfo=0"></param>' +
						 			 '<param name="allowScriptAccess" value="always"></param>' +
						 			 '<param name="allowFullScreen" value="true"></param>' +
						 			 '<embed src="https://www.youtube.com/v/' + responseJSON.videoYTId + '?version=3&autohide=1&showinfo=0"' + 
						 			 	'type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" style="max-width:98%;">' +
						 			 '</embed>' + 
					 			 '</object>';
		    	    target.videoYTId = responseJSON.videoYTId;
		    	    target.videoInnerDoc = document.getElementsByTagName('iframe')[0].contentDocument.body.innerHTML;
		    	    target.oApp.exec("PASTE_HTML", [sHTML]);
	    		}
    		}catch (err){
	    		responseJSON = {};
				alert("Uploading the Video file has been aborted !!");
	    	}
    		target.oApp.exec("SE_TOGGLE_VIDEOUPLOAD_LAYER");
    	}
    };
    
    // build query string
    var baseUri = window.location.href.substring(0,window.location.href.lastIndexOf('/'));
    baseUri = baseUri.substring(0, baseUri.lastIndexOf('/'));
    var qqFile = fileName.substring(fileName.lastIndexOf('\\')+1,fileName.length);
    var queryString =  baseUri + '/upload_yt_video.sw?qqFile=' + qqFile;
    xhr.open("POST", queryString, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("X-File-Name", encodeURIComponent(qqFile));
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.send(theFrm.fileSelectVideo.files[0]);
    target.xhr = xhr;
	target.oBtnFile.disabled = 'disabled';
	return;
}

nhn.husky.SE_ImageUpload = $Class({
    name : "SE_ImageUpload",

    $init : function(oAppContainer){
    	this._assignHTMLObjects(oAppContainer);
  	},

    _assignHTMLObjects : function(oAppContainer){
    	this.oImageUploadLayer = cssquery.getSingle("DIV.husky_seditor_imgupload_layer", oAppContainer);
    	this.oIFrame = cssquery.getSingle("IFRAME#se2_iframe", oAppContainer);
		this.oBtnClose=cssquery.getSingle("BUTTON.se2_close",this.oImageUploadLayer);
		this.oBtnFile=cssquery.getSingle("INPUT#fileSelectImage",this.oImageUploadLayer);
		this.oBtnConfirm=cssquery.getSingle("BUTTON.se2_apply",this.oImageUploadLayer);
		this.oBtnCancel=cssquery.getSingle("BUTTON.se2_cancel",this.oImageUploadLayer);

		this.oDirectInput = jindo.$$.getSingle(".image_ratio_input", this.oImageUploadLayer);
		this.oButtonArea = jindo.$$.getSingle(".se2_btn_area", this.oImageUploadLayer);
		this.oInput = jindo.$$.getSingle("INPUT", this.oDirectInput);
		var tmp = jindo.$$("BUTTON", this.oDirectInput);
		this.oBtn_up = tmp[0];
		this.oBtn_down = tmp[1];
    },

    $ON_MSG_APP_READY : function(){
        this.oApp.exec("REGISTER_UI_EVENT", ["imgupload", "click", "SE_TOGGLE_IMAGEUPLOAD_LAYER"]);
    	this.oApp.registerBrowserEvent(this.oBtnClose,"mousedown","HIDE_ACTIVE_LAYER");
    	this.oApp.registerBrowserEvent(this.oBtnFile,"change","SE_SUBMIT_IMAGEUPLOAD");
    	this.oApp.registerBrowserEvent(this.oBtnConfirm,"mousedown","SE_CONFIRM_IMAGEUPLOAD");
    	this.oApp.registerBrowserEvent(this.oBtnCancel,"mousedown","SE_CANCEL_IMAGEUPLOAD");
		this.oApp.registerBrowserEvent(this.oBtn_up, "click", "SE_INC_IMAGERATIO", []);
		this.oApp.registerBrowserEvent(this.oBtn_down, "click", "SE_DEC_IMAGERATIO", []);
		this.oApp.registerBrowserEvent(this.oInput, "keydown", "EVENT_SE_IMAGERATIO_KEYDOWN");
    },

    $ON_SE_TOGGLE_IMAGEUPLOAD_LAYER : function(){
        this.oApp.exec("TOGGLE_TOOLBAR_ACTIVE_LAYER", [this.oImageUploadLayer]);
  		document.getElementById('frmUploadSEImage').fileSelectImage.value="";
  		this.oDirectInput.style.display = 'none';
  		this.oInput.value=100;
	    this.fileFullPath = null;
	    this.imageInnerDoc = '';
  		
     },
     
    $ON_SE_SUBMIT_IMAGEUPLOAD : function(oAppContainer){
    	uploadImageFile(document.getElementById('frmUploadSEImage'), this);
     },    

    $ON_SE_CONFIRM_IMAGEUPLOAD : function(oAppContainer){
    	this.oApp.exec("SE_TOGGLE_IMAGEUPLOAD_LAYER");
     },    

    $ON_SE_CANCEL_IMAGEUPLOAD : function(oAppContainer){
    	document.getElementsByTagName('iframe')[0].contentDocument.body.innerHTML = this.imageInnerDoc;
    	this.oApp.exec("HIDE_ACTIVE_LAYER");
    	if(this.xhr) this.xhr.abort();
     },    

	$ON_SE_SET_IMAGERATIO_FROM_DIRECT_INPUT : function(){
		var nInputValue = parseInt(this.oInput.value);
		var sValue = (nInputValue < 10) ? 10 : nInputValue;
    	document.getElementsByTagName('iframe')[0].contentDocument.body.innerHTML = this.imageInnerDoc;
	    var sHTML = "<img src='" + this.fileFullPath + "' border='0' style='max-width:98%; padding:10px; width:" + parseInt(sValue) + "%'>";
	    this.oApp.exec("PASTE_HTML", [sHTML]);
 	},

	$ON_EVENT_SE_IMAGERATIO_KEYDOWN : function(oEvent){
		if (oEvent.key().enter){
			this.oApp.exec("SE_SET_IMAGERATIO_FROM_DIRECT_INPUT");
			oEvent.stop();
		}
	},

	$ON_SE_INC_IMAGERATIO : function(){
		this.oInput.value = parseInt(this.oInput.value) || 100;
		this.oInput.value = parseInt(this.oInput.value) + 5 ;
		this.oApp.exec("SE_SET_IMAGERATIO_FROM_DIRECT_INPUT");
	},

	$ON_SE_DEC_IMAGERATIO : function(){
		this.oInput.value = parseInt(this.oInput.value) || 100;
		this.oInput.value = parseInt(this.oInput.value) - 5 ;
		if(this.oInput.value < 10) this.oInput.value = 10;
		this.oApp.exec("SE_SET_IMAGERATIO_FROM_DIRECT_INPUT");
	}
});

nhn.husky.SE_VideoUpload = $Class({
    name : "SE_VideoUpload",

    $init : function(oAppContainer){
    	this._assignHTMLObjects(oAppContainer);
    },

    _assignHTMLObjects : function(oAppContainer){
    	this.oVideoUploadLayer = cssquery.getSingle("DIV.husky_seditor_videoupload_layer", oAppContainer);
    	this.oIFrame = cssquery.getSingle("IFRAME#se2_iframe", oAppContainer);
		this.oBtnClose=cssquery.getSingle("BUTTON.se2_close",this.oVideoUploadLayer);
		this.oBtnFile=cssquery.getSingle("INPUT#fileSelectVideo",this.oVideoUploadLayer);
		this.oBtnConfirm=cssquery.getSingle("BUTTON.se2_apply",this.oVideoUploadLayer);
		this.oBtnCancel=cssquery.getSingle("BUTTON.se2_cancel",this.oVideoUploadLayer);

		this.oDirectInput = jindo.$$.getSingle(".video_ratio_input", this.oVideoUploadLayer);
		this.oButtonArea = jindo.$$.getSingle(".se2_btn_area", this.oVideoUploadLayer);
		this.oInput = jindo.$$.getSingle("INPUT", this.oDirectInput);
		var tmp = jindo.$$("BUTTON", this.oDirectInput);
		this.oBtn_up = tmp[0];
		this.oBtn_down = tmp[1];
    },

    $ON_MSG_APP_READY : function(){
        this.oApp.exec("REGISTER_UI_EVENT", ["videoupload", "click", "SE_TOGGLE_VIDEOUPLOAD_LAYER"]);
    	this.oApp.registerBrowserEvent(this.oBtnFile,"change","SE_SUBMIT_VIDEOUPLOAD");
    	this.oApp.registerBrowserEvent(this.oBtnClose,"mousedown","SE_CANCEL_VIDEOUPLOAD");
    	this.oApp.registerBrowserEvent(this.oBtnConfirm,"mousedown","SE_CONFIRM_VIDEOUPLOAD");
    	this.oApp.registerBrowserEvent(this.oBtnCancel,"mousedown","SE_CANCEL_VIDEOUPLOAD");
		this.oApp.registerBrowserEvent(this.oBtn_up, "click", "SE_INC_VIDEORATIO", []);
		this.oApp.registerBrowserEvent(this.oBtn_down, "click", "SE_DEC_VIDEORATIO", []);
		this.oApp.registerBrowserEvent(this.oInput, "keydown", "EVENT_SE_VIDEORATIO_KEYDOWN");
    },

    $ON_SE_TOGGLE_VIDEOUPLOAD_LAYER : function(){
        this.oApp.exec("TOGGLE_TOOLBAR_ACTIVE_LAYER", [this.oVideoUploadLayer]);
  		document.getElementById('frmUploadSEVideo').fileSelectVideo.value="";
  		document.getElementById('frmUploadSEVideo').uploadProgress1.style.display = 'none';
  		document.getElementById('frmUploadSEVideo').uploadProgress1.style.color = 'blue';
  		document.getElementById('frmUploadSEVideo').uploadProgress2.style.display = 'none';
  		document.getElementById('frmUploadSEVideo').uploadProgress3.style.display = 'none';
  		document.getElementById('videoUploadButton').style.display = 'inline-block';
  		this.oDirectInput.style.display = 'none';
  		this.oButtonArea.style.display = 'none';
  		this.oBtnFile.disabled = '';
  		this.oInput.value=100;
	    this.videoYTId = null;
	    this.videoInnerDoc = '';
    },
     
    $ON_SE_SUBMIT_VIDEOUPLOAD : function(oAppContainer){
    	uploadVideoFile(document.getElementById('frmUploadSEVideo'), this);
    },
     
    $ON_SE_CONFIRM_VIDEOUPLOAD : function(oAppContainer){
    	this.oApp.exec("SE_TOGGLE_VIDEOUPLOAD_LAYER");
     },    

    $ON_SE_CANCEL_VIDEOUPLOAD : function(oAppContainer){
    	if(this.videoInnerDoc)
    		document.getElementsByTagName('iframe')[0].contentDocument.body.innerHTML = this.videoInnerDoc;
    	if(this.xhr){
    		this.xhr.abort();
    	}else{
    		this.oApp.exec("HIDE_ACTIVE_LAYER");
    	}
     },    

	$ON_SE_SET_VIDEORATIO_FROM_DIRECT_INPUT : function(){
		var nInputValue = parseInt(this.oInput.value);
		var sValue = (nInputValue < 10) ? 10 : nInputValue;
    	document.getElementsByTagName('iframe')[0].contentDocument.body.innerHTML = this.videoInnerDoc;
		var sHTML =  '<object style="max-width:98%; padding:10px; width:' + parseInt(sValue) + '%;">' + 
    					 '<param name="movie" value="https://www.youtube.com/v/' + this.videoYTId + '?version=3&autohide=1&showinfo=0"></param>' +
			 			 '<param name="allowScriptAccess" value="always"></param>' +
			 			 '<param name="allowFullScreen" value="true"></param>' +
			 			 '<embed src="https://www.youtube.com/v/' + this.videoYTId + '?version=3&autohide=1&showinfo=0"' + 
			 			 	'type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" style="max-width:98%; width:' + parseInt(sValue) + '%">' +
			 			 '</embed>' + 
		 			 '</object>';
	    this.oApp.exec("PASTE_HTML", [sHTML]);
 	},

	$ON_EVENT_SE_VIDEORATIO_KEYDOWN : function(oEvent){
		if (oEvent.key().enter){
			this.oApp.exec("SE_SET_VIDEORATIO_FROM_DIRECT_INPUT");
			oEvent.stop();
		}
	},

	$ON_SE_INC_VIDEORATIO : function(){
		this.oInput.value = parseInt(this.oInput.value) || 100;
		this.oInput.value = parseInt(this.oInput.value) + 5 ;
		this.oApp.exec("SE_SET_VIDEORATIO_FROM_DIRECT_INPUT");
	},

	$ON_SE_DEC_VIDEORATIO : function(){
		this.oInput.value = parseInt(this.oInput.value) || 100;
		this.oInput.value = parseInt(this.oInput.value) - 5 ;
		if(this.oInput.value < 10) this.oInput.value = 10;
		this.oApp.exec("SE_SET_VIDEORATIO_FROM_DIRECT_INPUT");
	}
});

