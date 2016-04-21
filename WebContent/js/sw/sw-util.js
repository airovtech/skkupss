try{
var console = console ||{
	log : function() {}
};

var Request = {	
	 	parameter: function(name) {
			return this.parameters()[name];
	 	},
	 	
	 	parameters: function() {
	 		var result = {};
	 		var url = window.location.href;
	 		var parameters = url.slice(url.indexOf('?') + 1).split('&');
	 		
	 		for(var i = 0;  i < parameters.length; i++) {
	 			var parameter = parameters[i].split('=');
	 			result[parameter[0]] = parameter[1];
	 		}
	 		return result;
	 	},
	 	
	 	isAjaxCall: function(){
	 		if(window.location.href.split('#').length>1) return true;
	 		return false;
	 	}
	};

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

var getHostNPort = function(){	
	var array = window.location.href.split('//');
	return 'http://' + array[1].substr(0, array[1].indexOf('/'));
	//return array[0] + ':' + array[1] + ':' + array[2].split('/')[0];
};

var getBytesWithUnit = function( bytes ){
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
};

function getDepartNameFromFullpath(departFullpathName){
	if(isEmpty(departFullpathName)) return "";
	var tokens = departFullpathName.split("���");
	return tokens[tokens.length-1];
}

var randomUUID = function(prefix) {
	  var s = [], itoh = '0123456789abcdef';

	  // Make array of random hex digits. The UUID only has 32 digits in it, but we
	  // allocate an extra items to make room for the '-'s we'll be inserting.
	  for (var i = 0; i < 36; i++) s[i] = Math.floor(Math.random()*0x10);

	  // Conform to RFC-4122, section 4.4
	  s[14] = 4;  // Set 4 high bits of time_high field to version
	  s[19] = (s[19] & 0x3) | 0x8;  // Specify 2 high bits of clock sequence

	  // Convert to hex chars
	  for (var i = 0; i < 36; i++) s[i] = itoh[s[i]];

	  // Insert '-'s
	  s[8] = s[13] = s[18] = s[23];

	  return prefix + s.join('');
};

var mergeObjects = function(obj1, obj2) {
    for( var p in obj2 )
    	obj1[p] = obj2[p];    
    return obj1;
};

var merge3Objects = function(obj1, obj2, obj3){
	return mergeObjects(obj1, mergeObjects(obj2, obj3));
};

function isEmpty(str) {
    return (!str || 0 === str.length || 'null' === str);
};

function isBlank(str) {
    return (!str || /^\s*$/.test(str) || 'null' === str);
};

// private method for UTF-8 encoding
function encodeUTF8 (string) {
	return unescape(encodeURIComponent(string));
};

// private method for UTF-8 decoding
function decodeUTF8 (utftext) {
	return decodeURIComponent(escape(utftext));
};

httpStatus = {
		InternalServerError : 500
};

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
    this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
    return this;
};

function scrollHeight(){
	return document.body.scrollHeight;
};

function scrollWidth(){
	return document.body.scrollWidth;
};

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};

isEmailAddress = function(emailAddress){
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9_\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (filter.test(emailAddress)) {
		return true;
	}
	return false;		
};

isUserId = function(comId){
	return isEmailAddress(comId);
};

isDepartmentId = function(comId){
	if(isEmpty(comId) || isUserId(comId))
		return false;
	return (comId.substring(0, 5) == ('dept_'));
};

function getByteLength(s){
	var len = 0;
	if ( s == null ) return 0;
	for(var i=0;i<s.length;i++){
		var c = escape(s.charAt(i));
		if ( c.length == 1 ) len ++;
		else if ( c.indexOf("%u") != -1 ) len += 2;
		else if ( c.indexOf("%") != -1 ) len += c.length/3;
	}
	return len;
};

String.prototype.cut = function(len){
	var str = this;
	var l = 0;
	for(var i=0; i<str.length; i++){
		l += (str.charCodeAt(i)>128) ? 2:1;
		if(l>=len) return str.substring(0,i);
	}
	return str;
};

var textareaMaxSize = function(keyEvent, maxChars, countTarget){
	var input = $(targetElement(keyEvent));
	var tval = input.val();
	var tlength = getByteLength(tval); 
	var remain = parseInt(maxChars - tlength);	    
	countTarget.text(remain);
	
	var keyCode = keyEvent.which || keyEvent.keyCode;
	if (remain < 0 && (keyCode) !== 0 ){
        input.val((tval).cut(tlength + remain));			
        tlength = getByteLength(input.val()); 
		remain = parseInt(maxChars - tlength);
        countTarget.text(remain);
    }
};

var printDateTime = function(date){
	var today = new Date();
	if(isEmpty(date)) return "";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	if(year != today.getFullYear()){
		return date.format("yyyy.mm.dd HH:MM");
	}else if(month != today.getMonth()+1 || day != today.getDate()){
		return date.format("mm.dd HH:MM");
	}
	return date.format("HH:MM");
};

var printTimeBySecond = function(time){
	if(time<1000) return smartMessage.get("underSecondText");
	
//	var seconds=0, minutes=0, hours=0, days=0;
//	seconds= time/1000;
//	minutes = seconds >= 60 ? seconds/60 : 0 ;
//	hours = minutes >= 60 ? minutes/60 : 0 ;
//	days = hours >=24 ? minutes/24 : 0 ;
//	seconds = seconds % 60;
//	minutes = minutes % 60;
//	hours = hours % 24;		
//	return "" + (days>0?days + smartMessage.get("dayText") + " ":"") + sprintf("%02d", hours) + ":" + sprintf("%02d", minutes) + ":" + sprintf("%02d", seconds);
}

var printTimeByMinute = function(time){
	if(time<1000*60) return smartMessage.get("underMinuteText");
	var minutes=0, hours=0, days=0;
	minutes= time/1000/60;
	hours = minutes >= 60 ? minutes/60 : 0 ;
	days = hours >=24 ? minutes/24 : 0 ;
	minutes = minutes % 60;
	hours = hours % 24;		
	return "" + (days>0?days + smartMessage.get("dayText") + " ":"") + sprintf("%02d", hours) + ":" + sprintf("%02d", minutes);
};

var printCurrentTime = function(){
	var today = new Date();
	return today.format("yyyy.mm.dd HH:MM");
};

var targetElement = function(e){
	return (typeof e.target != 'undefined') ? e.target : e.srcElement;
};

var getGMTDate = function(date, timeOffset){
	if(isEmpty(date) || isEmpty(timeOffset)) return new Date();
	var dateTemp = (typeof(date) == 'Date') ? date : new Date(date);
	var offset = (typeof(timeOffset) == 'String') ? parseInt(timeOffset) : timeOffset;
	
	return new Date(dateTemp.getTime() - (offset*60*60*1000));
};

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
};

var zeroPad = function(num, numZeros) {
	var n = Math.abs(num);
	var zeros = Math.max(0, numZeros - Math.floor(n).toString().length );
	var zeroString = Math.pow(10,zeros).toString().substr(1);
	if( num < 0 ) {
		zeroString = '-' + zeroString;
	}

	return zeroString+n;
};

var smartEncode = function(value){
	if(isEmpty(value)) return value;
	value = value.replace(/\"/g,"&quot;");
	value = value.replace(/\'/g,"&squo;");
	value = value.replace(/</g,"&lt;");
	value = value.replace(/>/g,"&gt;");
	value = value.replace(/\r\n/g,"<br>");
	return value;
};

var smartDecode = function(value){
	if(isEmpty(value)) return value;
	value = value.replace(/&quot;/g,"\"");
	value = value.replace(/&squo;/g,"\'");
	value = value.replace(/&lt;/g,"<");
	value = value.replace(/&gt;/g,">");
	value = value.replace(/<br>/g,"\r\n");
	return value;
};

var getServerDomain = function(){
    return location.href.split('//')[1].split('/')[0].split(':')[0];
};

var cloneSelectedValues = function(cloneSource, cloned){
	var selects = $(cloneSource).find("select");
	$(selects).each(function(i) {
		var select = this;
		$(cloned).find("select").eq(i).val($(select).val());
	});
	var richEditors = $(cloneSource).find('.js_type_richEditor');
	$(richEditors).each(function(i){
		var richEditor = this;
		var value = "";
		try{
			value = SmartWorks.FormRuntime.RichEditorBuilder.getValue($(richEditor));
		}catch(error){
			value = $(richEditor).find('textarea').val();
		}
		try{
			richEditorSetValue(null, null, value, $(cloned).find('.js_type_richEditor').eq(i));
		}catch(error){
			$(cloned).find('.js_type_richEditor textarea').eq(i).val(value);
		}
	});
};

var refreshCurrentContent = function(js_page){
	if(isEmpty(js_page)) return null;
	if(!js_page.jquery) return null;
	
	var url = js_page.attr('currentHref');
	var currentLocation = js_page.attr('currentLocation');
	var target = $('#content');

	if(!isEmpty(currentLocation) && currentLocation === "home.sw"){
		url = "smartcaster.sw";
	}	
	var workSpace = $('#content .js_iwork_space_page:first, #content .js_pwork_space_page:first');
	if(!isEmpty(workSpace)){
		url = workSpace.attr('currentHref');
		url = url + '&workId=' + workSpace.attr('workId');
	}
	if(isEmpty(url)){
		window.location.reload(true);
		return;
	}
	
	smartPop.progressCenter();
	$.ajax({
		url : url,
		success : function(data, status, jqXHR) {
			target.html(data);
			smartPop.closeProgress();
		}
	});
};

var getSelectedText = function() {
    var txt = '';
    if (window.getSelection) {
        txt = window.getSelection();
    } else if (document.getSelection) {
        txt = document.getSelection();
    } else if (document.selection) {
        txt = document.selection.createRange().text;
    }
    return txt;
};

var deselectText = function() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.getSelection) {
        txt = document.getSelection().removeAllRanges();
    } else if (document.selection) {
        txt = document.selection.empty;
    }
};

}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-util script]', null, error);
}
