try{
function loadMyProfileField() {
	var myProfileFields = $('div.js_my_profile_field');
	if(!isEmpty(myProfileFields)) {
		for(var i=0; i<myProfileFields.length; i++) {
			var myProfileField = $(myProfileFields[i]);
			
			var gridRow = SmartWorks.GridLayout.newGridRow();
			var gridTable = SmartWorks.GridLayout.newGridTable();
			myProfileField.html(gridTable.html(gridRow));

			SmartWorks.FormRuntime.ImageBoxBuilder.buildEx({
				container: gridRow,
				fieldId: "imgMyProfile",
				fieldName: "picture profile",
				imgSource: currentUser.orgPicture,
				pictureWidth: 110,
				pictureHeight: 110,
				required: false
			});
		}		
	}
		
	var mySignPictureFields = $('div.js_my_signpic_field');
	if(!isEmpty(mySignPictureFields)) {
		for(var i=0; i<mySignPictureFields.length; i++) {
			var mySignPictureField = $(mySignPictureFields[i]);
			
			var gridRow = SmartWorks.GridLayout.newGridRow();
			var gridTable = SmartWorks.GridLayout.newGridTable();
			mySignPictureField.html(gridTable.html(gridRow));

			SmartWorks.FormRuntime.ImageBoxBuilder.buildEx({
				container: gridRow,
				fieldId: "imgMySignPic",
				fieldName: "picture sign",
				imgSource: currentUser.signPicture,
				pictureWidth: 67,
				pictureHeight: 67,
				required: false
			});
		}		
	}

	var emailSignatureFields = $('div.js_email_signature_field:visible');
	if(!isEmpty(emailSignatureFields)) {
		for(var i=0; i<emailSignatureFields.length; i++) {
			var emailSignatureField = $(emailSignatureFields[i]);
			
			var signature = emailSignatureField.attr('signature');
			var gridRow = SmartWorks.GridLayout.newGridRow();
			var gridTable = SmartWorks.GridLayout.newGridTable();
			emailSignatureField.html(gridTable.html(gridRow));

			SmartWorks.FormRuntime.RichEditorBuilder.buildEx({
				container: gridRow,
				fieldId: "emailSignature",
				fieldName: "",
				columns: 1,
				value: signature,
				required: false
			});
			gridRow.find('.form_label').hide();
			gridRow.find('.form_value').css({width:"100%"});
			gridRow.find('#emailSignature').css({height:"200px"});			
		}
		
	}
};

function loadCompanyLogoField() {
	var companyLogoFields = $('div.js_company_logo_field');
	if(!isEmpty(companyLogoFields)) {
		for(var i=0; i<companyLogoFields.length; i++) {
			var companyLogoField = $(companyLogoFields[i]);
			
			var imgSource = companyLogoField.attr('imgSource');
			var gridRow = SmartWorks.GridLayout.newGridRow();
			var gridTable = SmartWorks.GridLayout.newGridTable();
			companyLogoField.html(gridTable.html(gridRow));

			SmartWorks.FormRuntime.ImageBoxBuilder.buildEx({
				container: gridRow,
				fieldId: "imgCompanyLogo",
				fieldName: "picture profile",
				imgSource: imgSource,
				columns: 1,
				pictureWidth: 130,
				pictureHeight: 35,
				required: false
			});
		}		
	}
};

function loadCompanyTitleLogoField() {
	var companyTitleLogoFields = $('div.js_company_titlelogo_field');
	if(!isEmpty(companyTitleLogoFields)) {
		for(var i=0; i<companyTitleLogoFields.length; i++) {
			var companyTitleLogoField = $(companyTitleLogoFields[i]);
			
			var imgSource = companyTitleLogoField.attr('imgSource');
			var gridRow = SmartWorks.GridLayout.newGridRow();
			var gridTable = SmartWorks.GridLayout.newGridTable();
			companyTitleLogoField.html(gridTable.html(gridRow));

			SmartWorks.FormRuntime.ImageBoxBuilder.buildEx({
				container: gridRow,
				fieldId: "imgCompanyTitleLogo",
				fieldName: "picture profile",
				imgSource: imgSource,
				columns: 1,
				pictureWidth: 130,
				pictureHeight: 35,
				required: false
			});
		}		
	}
};

function loadCompanyLoginImageField() {
	var companyLoginImageFields = $('div.js_company_loginimage_field');
	if(!isEmpty(companyLoginImageFields)) {
		for(var i=0; i<companyLoginImageFields.length; i++) {
			var companyLoginImageField = $(companyLoginImageFields[i]);
			
			var imgSource = companyLoginImageField.attr('imgSource');
			var gridRow = SmartWorks.GridLayout.newGridRow();
			var gridTable = SmartWorks.GridLayout.newGridTable();
			companyLoginImageField.html(gridTable.html(gridRow));
			
			SmartWorks.FormRuntime.ImageBoxBuilder.buildEx({
				container: gridRow,
				fieldId: "imgCompanyLoginImage",
				fieldName: "picture profile",
				imgSource: imgSource,
				columns: 1,
				pictureWidth: 130,
				pictureHeight: 60,
				required: false
			});
		}		
	}
};

function loadGroupProfileField() {
	var groupProfileFields = $('div.js_group_profile_field');
	if(!isEmpty(groupProfileFields)) {
		for(var i=0; i<groupProfileFields.length; i++) {
			var groupProfileField = $(groupProfileFields[i]);
			
			var imgSource = groupProfileField.attr('imgSource');
			var gridRow = SmartWorks.GridLayout.newGridRow();
			var gridTable = SmartWorks.GridLayout.newGridTable();
			groupProfileField.html(gridTable.html(gridRow));

			SmartWorks.FormRuntime.ImageBoxBuilder.buildEx({
				container: gridRow,
				fieldId: "imgGroupProfile",
				fieldName: "group profile",
				imgSource: imgSource,
				pictureWidth: 110,
				pictureHeight: 110,
				required: false
			});
		}		
	}
};

function loadDepartmentProfileField() {
	var departmentProfileFields = $('div.js_department_profile_field');
	if(!isEmpty(departmentProfileFields)) {
		for(var i=0; i<departmentProfileFields.length; i++) {
			var departmentProfileField = $(departmentProfileFields[i]);
			
			var imgSource = departmentProfileField.attr('imgSource');
			var gridRow = SmartWorks.GridLayout.newGridRow();
			var gridTable = SmartWorks.GridLayout.newGridTable();
			departmentProfileField.html(gridTable.html(gridRow));

			SmartWorks.FormRuntime.ImageBoxBuilder.buildEx({
				container: gridRow,
				fieldId: "imgDepartmentProfile",
				fieldName: "department profile",
				imgSource: imgSource,
				pictureWidth: 110,
				pictureHeight: 110,
				required: false
			});
		}		
	}
};

function loadCheckScheduleFields() {
	var checkScheduleFields = $('div.js_check_schedule_fields');
	if(!isEmpty(checkScheduleFields)) {
		for(var i=0; i<checkScheduleFields.length; i++) {
			var checkScheduleField = $(checkScheduleFields[i]);
			
			var gridRow = SmartWorks.GridLayout.newGridRow();
			var gridTable = SmartWorks.GridLayout.newGridTable();
			checkScheduleField.html(gridTable.html(gridRow));

			var startDateName = checkScheduleField.attr("startDateName");
			var endDateName = checkScheduleField.attr("endDateName");
			var performerName = checkScheduleFields.attr("performerName");
			SmartWorks.FormRuntime.DateTimeChooserBuilder.buildEx({
				container: gridRow,
				fieldId: "txtScheduleStartDate",
				fieldName: startDateName,
				columns: 2,
				colSpan: 1,
				required: true
			});
		  	
			SmartWorks.FormRuntime.DateTimeChooserBuilder.buildEx({
				container: gridRow,
				fieldId: "txtScheduleEndDate",
				fieldName: endDateName,
				columns: 2,
				colSpan: 1,
				required: true
			});
		  	
			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			SmartWorks.FormRuntime.UserFieldBuilder.buildEx({
				container: gridRow,
				fieldId: "txtSchedulePerformer",
				fieldName: performerName,
				columns: 2,
				colSpan: 1,
				multiUsers: false,
				required: true,
				users: new Array({
					userId: currentUser.userId,
					longName: currentUser.longName
				})
			});
		}		
	}
};

function loadNewPictureFields() {
	var newPictureFields = $('div.js_new_picture_fields');
	if(!isEmpty(newPictureFields)) {
		for(var i=0; i<newPictureFields.length; i++) {
			var newPictureField = $(newPictureFields[i]);
			var gridRow = SmartWorks.GridLayout.newGridRow();
			var gridTable = SmartWorks.GridLayout.newGridTable();
			newPictureField.html(gridTable.html(gridRow));
			
			var pictureDescTitle = newPictureField.attr("pictureDescTitle");

			SmartWorks.FormRuntime.ImageBoxBuilder.buildEx({
				container: gridRow,
				fieldId: "imgPictureFile",
				fieldName: "picture profile",
				columns: 1,
				pictureWidth: 512,
				required: true
			});

			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			gridRow.hide();
			SmartWorks.FormRuntime.RichEditorBuilder.buildEx({
				container: gridRow,
				fieldId: "txtPictureDesc",
				fieldName: pictureDescTitle,
				columns: 1,
				required: false
			});
			gridRow.find('#txtPictureDesc').css({height:"100px"});
		}		
	}
};

function loadNewFileFields() {
	var newFileFields = $('div.js_new_file_fields');
	if(!isEmpty(newFileFields)) {
		for(var i=0; i<newFileFields.length; i++) {
			var newFileField = $(newFileFields[i]);
			var gridRow = SmartWorks.GridLayout.newGridRow();
			var gridTable = SmartWorks.GridLayout.newGridTable();
			newFileField.html(gridTable.html(gridRow));
			
			var fileNameTitle = newFileField.attr("fileNameTitle");
			var fileDescTitle = newFileField.attr("fileDescTitle");

			SmartWorks.FormRuntime.FileFieldBuilder.buildEx({
				container: gridRow,
				fieldId: "txtFileField",
				fieldName: fileNameTitle,
				columns: 1,
				required: true
			});
			gridRow.find('.form_label').hide();
			
			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			gridRow.hide();
			SmartWorks.FormRuntime.RichEditorBuilder.buildEx({
				container: gridRow,
				fieldId: "txtFileDesc",
				fieldName: fileDescTitle,
				columns: 1,
				required: false
			});
			gridRow.find('#txtFileDesc').css({height:"100px"});
		}		
	}
};

function loadNewEventFields(startDate, endDate) {
	var newEventFields = $('div.js_new_event_fields');
	if(!isEmpty(newEventFields)) {
		for(var i=0; i<newEventFields.length; i++) {
			var newEventField = $(newEventFields[i]);
			var gridRow = SmartWorks.GridLayout.newGridRow();
			var gridTable = SmartWorks.GridLayout.newGridTable();
			newEventField.html(gridTable.html(gridRow));
			
			var placeHolderTitle = newEventField.attr("placeHolderTitle");
			var eventNameTitle = newEventField.attr("eventNameTitle");
			var startDateTitle = newEventField.attr("startDateTitle");
			var endDateTitle = newEventField.attr("endDateTitle");
			var alarmPolicyTitle = newEventField.attr("alarmPolicyTitle");
			var eventRepeatByTitle = newEventField.attr("eventRepeatByTitle");
			var eventRepeatEndTitle = newEventField.attr("eventRepeatEndTitle");
			var placeTitle = newEventField.attr("placeTitle");
			var relatedUsersTitle = newEventField.attr("relatedUsersTitle");
			var contentTitle = newEventField.attr("contentTitle");
			SmartWorks.FormRuntime.TextInputBuilder.buildEx({
				container: gridRow,
				fieldId: "txtEventName",
				fieldName: eventNameTitle,
				columns: 3,
				colSpan: 3,
				required: true
			});
			gridRow.find('.form_label').hide();
			gridRow.find('.form_value input').removeClass('fieldline').attr('placeholder', placeHolderTitle);
			var startDateStr = "";
			if(isEmpty(startDate)){
				var today = new Date();
				startDate = new Date(today.getTime() - today.getMinutes()*60*1000);
			}
			startDateStr = startDate.format('yyyy.mm.dd HH:MM');
			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			gridRow.hide();
			SmartWorks.FormRuntime.DateTimeChooserBuilder.buildEx({
				container: gridRow,
				fieldId: "txtEventStartDate",
				fieldName: startDateTitle,
				value: startDateStr,
				columns: 3,
				colSpan: 1,
				required: true
			});

			var endDateStr = "";
			if(!isEmpty(endDate))
				endDateStr = endDate.format('yyyy.mm.dd hh:MM');
			SmartWorks.FormRuntime.DateTimeChooserBuilder.buildEx({
				container: gridRow,
				fieldId: "txtEventEndDate",
				fieldName: endDateTitle,
				value: endDateStr,
				columns: 3,
				colSpan: 1,
				required: false
			});
			
			var staticItems = new Array();
			staticItems.push(smartMessage.get("alarmPolicyNone"));
			staticItems.push(smartMessage.get("alarmPolicyOnTime"));
			staticItems.push(smartMessage.get("alarmPolicy5m"));
			staticItems.push(smartMessage.get("alarmPolicy10m"));
			staticItems.push(smartMessage.get("alarmPolicy15m"));
			staticItems.push(smartMessage.get("alarmPolicy30m"));
			staticItems.push(smartMessage.get("alarmPolicy1h"));
			staticItems.push(smartMessage.get("alarmPolicy1d"));
			SmartWorks.FormRuntime.ComboBoxBuilder.buildEx({
				container: gridRow,
				fieldId: "selEventAlarmPolicy",
				fieldName: alarmPolicyTitle,
				columns: 3,
				colSpan: 1,
				staticItems : staticItems,
				required: false
			});
		  	
			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			gridRow.hide();
			var repeatItems = new Array();
			repeatItems.push(smartMessage.get("eventRepeatNone"));
			repeatItems.push(smartMessage.get("eventRepeatEveryDay"));
			repeatItems.push(smartMessage.get("eventRepeatEveryWeek"));
			repeatItems.push(smartMessage.get("eventRepeatBiWeek"));
			repeatItems.push(smartMessage.get("eventRepeatEveryMonthD"));
			repeatItems.push(smartMessage.get("eventRepeatEveryMonthC"));
			repeatItems.push(smartMessage.get("eventRepeatBiMonthD"));
			repeatItems.push(smartMessage.get("eventRepeatBiMonthC"));
			SmartWorks.FormRuntime.ComboBoxBuilder.buildEx({
				container: gridRow,
				fieldId: "selEventRepeatBy",
				fieldName: eventRepeatByTitle,
				columns: 3,
				colSpan: 1,
				staticItems : repeatItems,
				required: false
			});
			var repeatBys = gridRow.find('td[fieldId="selEventRepeatBy"] option');
			$(repeatBys[0]).attr('repeatBy', "none");
			$(repeatBys[1]).attr('repeatBy', "everyDay");
			$(repeatBys[2]).attr('repeatBy', "everyWeek");
			$(repeatBys[3]).attr('repeatBy', "biWeek");
			$(repeatBys[4]).attr('repeatBy', "everyMonthDate");
			$(repeatBys[5]).attr('repeatBy', "everyMonthCustom");
			$(repeatBys[6]).attr('repeatBy', "biMonthDate");
			$(repeatBys[7]).attr('repeatBy', "biMonthCustom");
			
			var weekItems = new Array();
			weekItems.push(smartMessage.get("eventRepeatFirst"));
			weekItems.push(smartMessage.get("eventRepeatSecond"));
			weekItems.push(smartMessage.get("eventRepeatThird"));
			weekItems.push(smartMessage.get("eventRepeatFourth"));
			weekItems.push(smartMessage.get("eventRepeatLast"));
			weekItems.push(smartMessage.get("eventRepeatFirstWeek"));
			weekItems.push(smartMessage.get("eventRepeatSecondWeek"));
			weekItems.push(smartMessage.get("eventRepeatThirdWeek"));
			weekItems.push(smartMessage.get("eventRepeatFourthWeek"));
			weekItems.push(smartMessage.get("eventRepeatLastWeek"));
			SmartWorks.FormRuntime.ComboBoxBuilder.buildEx({
				container: gridRow,
				fieldId: "selEventRepeatWeek",
				fieldName: "",
				columns: 3,
				colSpan: 1,
				staticItems : weekItems,
				required: false
			});
			gridRow.find('td[fieldId="selEventRepeatWeek"]').hide().find('.form_label').hide();
			var repeatBys = gridRow.find('td[fieldId="selEventRepeatWeek"] option');
			$(repeatBys[0]).attr('repeatWeek', "first");
			$(repeatBys[1]).attr('repeatWeek', "second");
			$(repeatBys[2]).attr('repeatWeek', "third");
			$(repeatBys[3]).attr('repeatWeek', "fourth");
			$(repeatBys[4]).attr('repeatWeek', "last");
			$(repeatBys[5]).attr('repeatWeek', "firstWeek");
			$(repeatBys[6]).attr('repeatWeek', "secondWeek");
			$(repeatBys[7]).attr('repeatWeek', "thirdWeek");
			$(repeatBys[8]).attr('repeatWeek', "fourthWeek");
			$(repeatBys[9]).attr('repeatWeek', "lastWeek");
			
			var dayItems = new Array();
			dayItems.push(smartMessage.get("eventRepeatMon"));
			dayItems.push(smartMessage.get("eventRepeatTue"));
			dayItems.push(smartMessage.get("eventRepeatWed"));
			dayItems.push(smartMessage.get("eventRepeatThu"));
			dayItems.push(smartMessage.get("eventRepeatFri"));
			dayItems.push(smartMessage.get("eventRepeatSat"));
			dayItems.push(smartMessage.get("eventRepeatSun"));
			SmartWorks.FormRuntime.ComboBoxBuilder.buildEx({
				container: gridRow,
				fieldId: "selEventRepeatDay",
				fieldName: "",
				columns: 3,
				colSpan: 1,
				staticItems : dayItems,
				required: false
			});
			gridRow.find('td[fieldId="selEventRepeatDay"]').hide().find('.form_label').hide();
			var repeatBys = gridRow.find('td[fieldId="selEventRepeatDay"] option');
			$(repeatBys[0]).attr('repeatDay', "mon");
			$(repeatBys[1]).attr('repeatDay', "tue");
			$(repeatBys[2]).attr('repeatDay', "wed");
			$(repeatBys[3]).attr('repeatDay', "thu");
			$(repeatBys[4]).attr('repeatDay', "fri");
			$(repeatBys[5]).attr('repeatDay', "sat");
			$(repeatBys[6]).attr('repeatDay', "sun");

			var dateItems = new Array();
			for(var i=0; i<31; i++)
				dateItems.push("" + (i+1));
			SmartWorks.FormRuntime.ComboBoxBuilder.buildEx({
				container: gridRow,
				fieldId: "selEventRepeatDate",
				fieldName: "",
				columns: 3,
				colSpan: 1,
				staticItems : dateItems,
				required: false
			});
			gridRow.find('td[fieldId="selEventRepeatDate"]').hide().find('.form_label').hide();

			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			gridRow.hide();
			var repeatEndItems = new Array();
			repeatEndItems.push(smartMessage.get("eventRepeatEndCount"));
			repeatEndItems.push(smartMessage.get("eventRepeatEndDate"));
			SmartWorks.FormRuntime.ComboBoxBuilder.buildEx({
				container: gridRow,
				fieldId: "selEventRepeatEnd",
				fieldName: eventRepeatEndTitle,
				columns: 3,
				colSpan: 1,
				staticItems : repeatEndItems,
				required: false
			});
			gridRow.find('td[fieldId="selEventRepeatEnd"]').hide();
			var repeatEnds = gridRow.find('td[fieldId="selEventRepeatEnd"] option');
			$(repeatEnds[0]).attr('repeatEnd', "repeatCount");
			$(repeatEnds[1]).attr('repeatEnd', "endDate");
			SmartWorks.FormRuntime.NumberInputBuilder.buildEx({
				container: gridRow,
				fieldId: "txtEventRepeatEndCount",
				fieldName: "",
				columns: 3,
				colSpan: 1,
				required: true
			});
			gridRow.find('td[fieldId="txtEventRepeatEndCount"]').hide().find('.form_label').hide();
			var today = new Date();
			eventEndDate = new Date(today.getTime() + 365*24*60*60*1000/2);
			eventEndDateStr = eventEndDate.format('yyyy.mm.dd');
			SmartWorks.FormRuntime.DateChooserBuilder.buildEx({
				container: gridRow,
				fieldId: "txtEventRepeatEndDate",
				fieldName: "",
				value: eventEndDateStr,
				columns: 3,
				colSpan: 1,
				required: true
			});
			gridRow.find('td[fieldId="txtEventRepeatEndDate"]').hide().find('.form_label').hide();

			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			gridRow.hide();
			SmartWorks.FormRuntime.TextInputBuilder.buildEx({
				container: gridRow,
				fieldId: "txtEventPlace",
				fieldName: placeTitle,
				columns: 3,
				colSpan: 3,
				required: false
			});

			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			gridRow.hide();
			SmartWorks.FormRuntime.UserFieldBuilder.buildEx({
				container: gridRow,
				fieldId: "txtEventRelatedUsers",
				fieldName: relatedUsersTitle,
				columns: 3,
				colSpan: 3,
				multiUsers: true,
				required: false
			});

			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			gridRow.hide();
			SmartWorks.FormRuntime.RichEditorBuilder.buildEx({
				container: gridRow,
				fieldId: "txtEventContent",
				fieldName: contentTitle,
				columns: 3,
				colSpan: 3,
				required: false
			});
			gridRow.find('#txtEventContent').css({height:"100px"});
		}		
	}
};

function loadNewBoardFields() {
	var newBoardFields = $('div.js_new_board_fields');
	if(!isEmpty(newBoardFields)) {
		for(var i=0; i<newBoardFields.length; i++) {
			var newBoardField = $(newBoardFields[i]);
			var gridRow = SmartWorks.GridLayout.newGridRow();
			var gridTable = SmartWorks.GridLayout.newGridTable();
			newBoardField.html(gridTable.html(gridRow));
			
			var placeHolderTitle = newBoardField.attr("placeHolderTitle");
			var boardNameTitle = newBoardField.attr("boardNameTitle");
			var boardDetailsTitle = newBoardField.attr("boardDetailsTitle");
			var boardFilesTitle = newBoardField.attr("boardFilesTitle");
			var boardDurationTitle = newBoardField.attr('boardDurationTitle');

			SmartWorks.FormRuntime.TextInputBuilder.buildEx({
				container: gridRow,
				fieldId: "txtBoardName",
				fieldName: boardNameTitle,
				columns: 1,
				required: true
			});
			gridRow.find('.form_label').hide();
			gridRow.find('.form_value input').removeClass('fieldline').attr('placeholder', placeHolderTitle);

			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			gridRow.hide();
			SmartWorks.FormRuntime.RichEditorBuilder.buildEx({
				container: gridRow,
				fieldId: "txtBoardDetails",
				fieldName: boardDetailsTitle,
				columns: 1,
				required: true
			});
			gridRow.find('#txtBoardDetails').css({height:"100px"});
			
			var today = new Date();
			var durationDate = new Date(today.getTime() + 7*24*60*60*1000);
			var durationDateStr = durationDate.format('yyyy.mm.dd');
			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			gridRow.hide();
			SmartWorks.FormRuntime.DateChooserBuilder.buildEx({
				container: gridRow,
				fieldId: "txtBoardDuration",
				fieldName: boardDurationTitle,
				value: durationDateStr,
				columns: 1,
				required: true
			});

			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			gridRow.hide();
			SmartWorks.FormRuntime.FileFieldBuilder.buildEx({
				container: gridRow,
				fieldId: "txtBoardFiles",
				fieldName: boardFilesTitle,
				columns: 1,
				required: false
			});
			
		}		
	}
};

function loadNewForumFields() {
	var newForumFields = $('div.js_new_forum_fields');
	if(!isEmpty(newForumFields)) {
		for(var i=0; i<newForumFields.length; i++) {
			var newForumField = $(newForumFields[i]);
			var gridRow = SmartWorks.GridLayout.newGridRow();
			var gridTable = SmartWorks.GridLayout.newGridTable();
			newForumField.html(gridTable.html(gridRow));
			
			var placeHolderTitle = newForumField.attr("placeHolderTitle");
			var forumNameTitle = newForumField.attr("forumNameTitle");
			var forumDetailsTitle = newForumField.attr("forumDetailsTitle");
			var forumFilesTitle = newForumField.attr("forumFilesTitle");

			SmartWorks.FormRuntime.TextInputBuilder.buildEx({
				container: gridRow,
				fieldId: "txtForumName",
				fieldName: forumNameTitle,
				columns: 1,
				required: true
			});
			gridRow.find('.form_label').hide();
			gridRow.find('.form_value input').removeClass('fieldline').attr('placeholder', placeHolderTitle);

			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			gridRow.hide();
			SmartWorks.FormRuntime.RichEditorBuilder.buildEx({
				container: gridRow,
				fieldId: "txtForumDetails",
				fieldName: forumDetailsTitle,
				columns: 1,
				required: true
			});
			gridRow.find('#txtForumDetails').css({height:"100px"});
			
			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			gridRow.hide();
			SmartWorks.FormRuntime.FileFieldBuilder.buildEx({
				container: gridRow,
				fieldId: "txtForumFiles",
				fieldName: forumFilesTitle,
				columns: 1,
				required: false
			});
			
		}		
	}
};

function loadTaskForwardFields() {
	var taskForwardFields = $('div.js_task_forward_fields');
	if(!isEmpty(taskForwardFields)) {
		for(var i=0; i<taskForwardFields.length; i++) {
			var taskForwardField = $(taskForwardFields[i]);
			
			var gridRow = SmartWorks.GridLayout.newGridRow();
			var gridTable = SmartWorks.GridLayout.newGridTable();
			taskForwardField.html(gridTable.html(gridRow));
			
			var subjectTitle = taskForwardField.attr("subjectTitle");
			var forwardeeTitle = taskForwardField.attr("forwardeeTitle");
			var commentsTitle = taskForwardField.attr("commentsTitle");
			var forwarderTitle = taskForwardField.attr("forwarderTitle");
			var forwardDateTitle = taskForwardField.attr("forwardDateTitle");
			var subject = taskForwardField.attr("subject");
			var comments = taskForwardField.attr("content");
			var forwarderId = taskForwardField.attr("forwarderId");
			var forwarderName = taskForwardField.attr("forwarderName");
			var forwardDate = taskForwardField.attr("forwardDate");
			var readOnly = isEmpty(subject) ? false : true;

			SmartWorks.FormRuntime.TextInputBuilder.buildEx({
				container: gridRow,
				fieldId: "txtForwardSubject",
				fieldName: subjectTitle,
				value: subject,
				columns: 2,
				colSpan: 2,
				required: true,
				readOnly: readOnly
			});
			
			if(!readOnly){
				gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
				SmartWorks.FormRuntime.UserFieldBuilder.buildEx({
					container: gridRow,
					fieldId: "txtForwardForwardee",
					fieldName: forwardeeTitle,
					columns: 2,
					colSpan: 2,
					multiUsers: true,
					required: true,
					readOnly: readOnly
				});
			}

			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			SmartWorks.FormRuntime.TextInputBuilder.buildEx({
				container: gridRow,
				fieldId: "txtForwardComments",
				fieldName: commentsTitle,
				value: comments,
				columns: 2,
				colSpan: 2,
				multiLines: 4,
				required: false,
				readOnly: readOnly
			});
			
			if(readOnly){
				var users = new Array();
				users.push({userId : forwarderId, longName: forwarderName});
				gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
				SmartWorks.FormRuntime.UserFieldBuilder.buildEx({
					container: gridRow,
					fieldId: "txtForwardForwarder",
					fieldName: forwarderTitle,
					columns: 2,
					colSpan: 1,
					users: users,
					multiUsers: false,
					required: false,
					readOnly: readOnly
				});
				SmartWorks.FormRuntime.TextInputBuilder.buildEx({
					container: gridRow,
					fieldId: "txtForwarderForwardDate",
					fieldName: forwardDateTitle,
					value: forwardDate,
					columns: 2,
					colSpan: 1,
					required: false,
					readOnly: readOnly

				});
			}
			var workSpace = taskForwardFields.parents('.js_iwork_space_page:first');
			if(isEmpty(workSpace)) workSpace = taskForwardFields.parents('.js_pwork_space_page:first');
			var target = workSpace.find('.js_append_task_forward_page').addClass('up');
			if(readOnly){
				target.addClass('form_read');
				workSpace.find('.js_btn_reply_forward').show().siblings().hide();
//				workSpace.find('.js_btn_cancel').show();						
			}
			target.parent().addClass('contents_space');
			target.find('.dash_line').remove();
		}		
	}
};

function loadTaskApprovalFields() {
	var taskApprovalFields = $('div.js_task_approval_fields');
	if(!isEmpty(taskApprovalFields)) {
		for(var i=0; i<taskApprovalFields.length; i++) {
			var taskApprovalField = $(taskApprovalFields[i]);
			
			var gridRow = SmartWorks.GridLayout.newGridRow();
			var gridTable = SmartWorks.GridLayout.newGridTable();
			taskApprovalField.html(gridTable.html(gridRow));
			
			var subjectTitle = taskApprovalField.attr("subjectTitle");
			var forwardeeTitle = taskApprovalField.attr("forwardeeTitle");
			var forwardees = taskApprovalField.attr("forwardees");
			var isLazyReferenceTaskTitle = taskApprovalField.attr("isLazyReferenceTaskTitle");
			var isLazyReferenceTask = taskApprovalField.attr("isLazyReferenceTask");
			var commentsTitle = taskApprovalField.attr("commentsTitle");
			var drafterTitle = taskApprovalField.attr("drafterTitle");
			var draftDateTitle = taskApprovalField.attr("draftDateTitle");
			var subject = taskApprovalField.attr("subject");
			var comments = taskApprovalField.attr("content");
			var drafter = taskApprovalField.attr("drafter");
			var draftDate = taskApprovalField.attr("draftDate");
			var isReturned = taskApprovalField.attr("isReturned");
			var isForwarded = taskApprovalField.attr("isForwarded");
			var readOnly = isEmpty(subject) ? false : true;
			var actionRequired = taskApprovalField.attr("actionRequired");
			SmartWorks.FormRuntime.TextInputBuilder.buildEx({
				container: gridRow,
				fieldId: "txtApprovalSubject",
				fieldName: subjectTitle,
				value: subject,
				columns: 4,
				colSpan: 4,
				required: true,
				readOnly: readOnly

			});
			if(!readOnly){
				gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
				SmartWorks.FormRuntime.UserFieldBuilder.buildEx({
					container: gridRow,
					fieldId: "txtApprovalForwardee",
					fieldName: forwardeeTitle,
					columns: 4,
					colSpan: 3,
					multiUsers: true,
					required: false,
					readOnly: readOnly
				});
				SmartWorks.FormRuntime.CheckBoxBuilder.buildEx({
					container: gridRow,
					fieldId: "isLazyReferenceTask",
					fieldName: isLazyReferenceTaskTitle,
					value: isLazyReferenceTask,
					columns: 4,
					colSpan: 1,
					readOnly: false
				});
			}
			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			SmartWorks.FormRuntime.TextInputBuilder.buildEx({
				container: gridRow,
				fieldId: "txtApprovalComments",
				fieldName: commentsTitle,
				value: comments,
				columns: 4,
				colSpan: 4,
				multiLines: 4,
				required: false,
				readOnly: readOnly
			});
			
			if(readOnly){
				gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
				SmartWorks.FormRuntime.UserFieldBuilder.buildEx({
					container: gridRow,
					fieldId: "txtApprovalDrafter",
					fieldName: drafterTitle,
					columns: 4,
					colSpan: 3,
					usersHtml: drafter,
					multiUsers: false,
					required: false,
					readOnly: readOnly
				});
				SmartWorks.FormRuntime.TextInputBuilder.buildEx({
					container: gridRow,
					fieldId: "txtApprovalDraftDate",
					fieldName: draftDateTitle,
					value: draftDate,
					columns: 4,
					colSpan: 1,
					required: false,
					readOnly: readOnly

				});

				if(!isEmpty(forwardees) && isLazyReferenceTask=='true'){
					gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
					SmartWorks.FormRuntime.UserFieldBuilder.buildEx({
						container: gridRow,
						fieldId: "txtApprovalForwardee",
						fieldName: forwardeeTitle,
						usersHtml: forwardees,
						columns: 4,
						colSpan: 3,
						readOnly: true
					});
					SmartWorks.FormRuntime.CheckBoxBuilder.buildEx({
						container: gridRow,
						fieldId: "isLazyReferenceTask",
						fieldName: isLazyReferenceTaskTitle,
						value: 'on',
						columns: 4,
						colSpan: 1,
						required: false,
						readOnly: true
					});
					
				}

			}

			var iworkSpace = taskApprovalFields.parents('.js_iwork_space_page:first');
			var pworkSpace = taskApprovalFields.parents('.js_pwork_space_page:first');
			if(!isEmpty(iworkSpace)){
				var target = iworkSpace.find('.js_append_task_approval_page').addClass('up');
				if(actionRequired==="true"){
					target.addClass('form_read');
					if(isReturned=='true'){
						iworkSpace.find('.js_btn_submit_approval').show().siblings().hide();
						iworkSpace.find('.js_btn_reject_approval').show();						
					}else if(isForwarded=='true'){
						iworkSpace.find('.js_btn_reply_forward').show().siblings().hide();
//						iworkSpace.find('.js_btn_cancel').show();						
					}else{
						iworkSpace.find('.js_btn_approve_approval').show().siblings().hide();
						iworkSpace.find('.js_btn_return_approval').show();
						iworkSpace.find('.js_btn_reject_approval').show();
					}
				}
				
				if(readOnly || isReturned=='true'){
					if(isReturned == 'ture')
						iworkSpace.find('.js_toggle_forward_btn').hide();
					else
						iworkSpace.find('.js_toggle_forward_btn').show();						
					iworkSpace.find('.js_toggle_approval_btn').hide();
				}
				target.parent().addClass('contents_space');
				target.find('.dash_line').remove();
			}else if(!isEmpty(pworkSpace)){
				var target = pworkSpace.find('.js_append_task_approval_page').addClass('up');
				if(actionRequired==='true'){
					pworkSpace.find('.js_toggle_forward_btn').hide();					
				}else{
					pworkSpace.find('.js_toggle_forward_btn').show();										
				}
				target.parent().addClass('contents_space');
				target.find('.dash_line').remove();
				
			}
		}		
	}
};
//같은이름의 함수가 2개존재한다 그중하나인 아래 함수가 사용하지 않는것 같아...뒤에다 언더바를 붙임..실제로 사용하지 않는지 테스트중
function loadGroupProfileField_() {
	var groupProfileFields = $('div.js_group_profile_field');
	if(!isEmpty(groupProfileFields)) {
		for(var i=0; i<groupProfileFields.length; i++) {
			var groupProfileField = $(groupProfileFields[i]);
			
			var gridRow = SmartWorks.GridLayout.newGridRow();
			var gridTable = SmartWorks.GridLayout.newGridTable();
			groupProfileField.html(gridTable.html(gridRow));

			SmartWorks.FormRuntime.ImageBoxBuilder.buildEx({
				container: gridRow,
				fieldId: "imgGroupProfile",
				fieldName: "group profile",
				imgSource: "images/default_group_picture.gif",
				pictureWidth: 110,
				pictureHeight: 110,
				required: false
			});
		}		
	}
};

function loadNewGroupFields() {
	var newGroupFields = $('div.js_new_group_fields');
	if(!isEmpty(newGroupFields)) {
		for(var i=0; i<newGroupFields.length; i++) {
			var newGroupField = $(newGroupFields[i]);
			var gridRow = SmartWorks.GridLayout.newGridRow();
			var gridTable = SmartWorks.GridLayout.newGridTable();
			newGroupField.html(gridTable.html(gridRow));
			var groupMembersTitle = newGroupField.attr("groupMembersTitle");

			SmartWorks.FormRuntime.UserFieldBuilder.buildEx({
				container: gridRow,
				fieldId: "txtGroupMembers",
				fieldName: groupMembersTitle,
				columns: 2,
				colSpan: 1,
				multiUsers: true,
				required: false
			});
		}		
	}
};

function loadWriteMailFields() {
	var writeMailFields = $('div.js_write_mail_fields');
	if(!isEmpty(writeMailFields)) {
		for(var i=0; i<writeMailFields.length; i++) {
			var writeMailField = $(writeMailFields[i]);
			
			var gridRow = SmartWorks.GridLayout.newGridRow();
			var gridTable = SmartWorks.GridLayout.newGridTable();
			writeMailField.html(gridTable.html(gridRow));
			
			var receiversTitle = writeMailField.attr("receiversTitle");
			var receiversHtml = unescape(writeMailField.attr('receivers')) || "";
			var ccReceiversTitle = writeMailField.attr("ccReceiversTitle");
			var ccReceiversHtml = unescape(writeMailField.attr('ccReceivers')) || "";
			var bccReceiversTitle = writeMailField.attr("bccReceiversTitle");
			var bccReceiversHtml = unescape(writeMailField.attr('bccReceivers')) || "";
			var priorityTitle = writeMailField.attr("priorityTitle");
			var priority = writeMailField.attr('priority');
			var subjectTitle = writeMailField.attr("subjectTitle");
			var subject = smartDecode(unescape(writeMailField.attr('subject')));
			var contents = unescape(writeMailField.attr('contents'));
			var mailSignature = unescape(writeMailField.attr('mailSignature'));
			contents = (isMobile.any()) ? "<br/><br/><br/>" + contents : "<br/><br/><br/>" + mailSignature + "<br/>" + contents;
			var attachmentsTitle = writeMailField.attr("attachmentsTitle");
			var attachments = unescape(writeMailField.attr('attachments'));
			SmartWorks.FormRuntime.UserFieldBuilder.buildEx({
				container: gridRow,
				fieldId: "emailReceivers",
				fieldName: receiversTitle,
				columns: 1,
				multiUsers: true,
				emailAddress: true,
				usersHtml: receiversHtml,
				required: true
			});

			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			SmartWorks.FormRuntime.UserFieldBuilder.buildEx({
				container: gridRow,
				fieldId: "emailCcReceivers",
				fieldName: ccReceiversTitle,
				columns: 1,
				multiUsers: true,
				emailAddress: true,
				usersHtml: ccReceiversHtml,
				required: false
			});

			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			SmartWorks.FormRuntime.UserFieldBuilder.buildEx({
				container: gridRow,
				fieldId: "emailBccReceivers",
				fieldName: bccReceiversTitle,
				columns: 1,
				multiUsers: true,
				emailAddress: true,
				usersHtml: bccReceiversHtml,
				required: false
			});

			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			SmartWorks.FormRuntime.TextInputBuilder.buildEx({
				container: gridRow,
				fieldId: "emailSubject",
				fieldName: subjectTitle,
				columns: 1,
				value: subject,
				required: true
			});
			
			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			SmartWorks.FormRuntime.CheckBoxBuilder.buildEx({
				container: gridRow,
				fieldId: "emailPriority",
				fieldName: priorityTitle,
				columns: 1,
				required: false
			});
			
			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			SmartWorks.FormRuntime.FileFieldBuilder.buildEx({
				container: gridRow,
				fieldId: "emailAttachments",
				fieldName: attachmentsTitle,
				columns: 1,
				required: false
			});
			if(!isEmpty(attachments)){
				gridRow.find('.form_value .qq-upload-list').append(attachments);
			}
			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			SmartWorks.FormRuntime.RichEditorBuilder.buildEx({
				container: gridRow,
				fieldId: "emailContents",
				fieldName: "",
				columns: 1,
				value: contents,
				required: true
			});
			gridRow.find('.form_label').hide();
			gridRow.find('.form_value').css({width:"100%"});
			gridRow.find('#emailContents').css({height:"400px"});
		}		
	}
};

function loadWorkManualField() {
	var loadWorkManualField = $('div.js_work_manual_field');
	if(!isEmpty(loadWorkManualField)){
		var gridRow = SmartWorks.GridLayout.newGridRow();
		var gridTable = SmartWorks.GridLayout.newGridTable();
		loadWorkManualField.html(gridTable.html(gridRow));
		var value = loadWorkManualField.attr("groupId");

		SmartWorks.FormRuntime.FileFieldBuilder.buildEx({
			container: gridRow,
			fieldId: "txtWorkManual",
			fieldName: "",
			groupId: value,
			columns: 1,
			required: false,
			isMultiple: false
		});
		gridRow.find('.form_label').hide();
		gridRow.find('.form_value').css({width:"100%"});
	}
};

function loadExcelImportField() {
	var loadExcelImportField = $('div.js_excel_import_field');
	if(!isEmpty(loadExcelImportField)){
		var gridRow = SmartWorks.GridLayout.newGridRow();
		var gridTable = SmartWorks.GridLayout.newGridTable();
		loadExcelImportField.html(gridTable.html(gridRow));

		SmartWorks.FormRuntime.FileFieldBuilder.buildEx({
			container: gridRow,
			fieldId: "txtImportFile",
			fieldName: "",
			columns: 2,
			colSpan: 1,
			required: true,
			isMultiple: false
		});
		gridRow.find('.form_label').hide();
		gridRow.find('.form_value').css({width:"50%"});
	}
};

function loadNewAssetFields(readOnly, assetFolderName, type, assetTypeName, autoApproval, autoReturn, assetName, assetLocation, assetScale, assetAccommodateNumber, assetCarType, assetPurpose, 
							assetProductType, assetType, assetSpecification, assetAvailableFrom, assetAvailableTo, assetPersonsInCharge,
							assetDesc, assetImage) {
	var newAssetFields = $('div.js_new_asset_fields');
	if(!isEmpty(newAssetFields)) {
		for(var i=0; i<newAssetFields.length; i++) {
			var newAssetField = $(newAssetFields[i]);
			var gridRow = SmartWorks.GridLayout.newGridRow();
			var gridTable = SmartWorks.GridLayout.newGridTable();
			newAssetField.html(gridTable.html(gridRow));

			var folderNameTitle = newAssetField.attr("folderNameTitle");
			var assetTypeNameTitle = newAssetField.attr("assetTypeNameTitle");
			var autoApprovalTitle = newAssetField.attr("autoApprovalTitle");
			var autoReturnTitle = newAssetField.attr("autoReturnTitle");
			var assetNameTitle = newAssetField.attr("assetNameTitle");
			var locationTitle = newAssetField.attr("locationTitle");
			var scaleTitle = newAssetField.attr("scaleTitle");
			var accommodateNumberTitle = newAssetField.attr("accommodateNumberTitle");
			var carTypeTitle = newAssetField.attr("carTypeTitle");
			var purposeTitle = newAssetField.attr("purposeTitle");
			var productTypeTitle = newAssetField.attr("productTypeTitle");
			var typeTitle = newAssetField.attr("typeTitle");
			var specificationTitle = newAssetField.attr("specificationTitle");
			var availableFromTitle = newAssetField.attr("availableFromTitle");
			var availableToTitle = newAssetField.attr("availableToTitle");
			var personsInChargeTitle = newAssetField.attr("personsInChargeTitle");
			var descTitle = newAssetField.attr("descTitle");
			var imageTitle = newAssetField.attr("imageTitle");
			
			SmartWorks.FormRuntime.TextInputBuilder.buildEx({
				container: gridRow,
				fieldId: "txtAssetFolderName",
				fieldName: folderNameTitle,
				value: assetFolderName,
				columns: 2,
				colSpan: 1,
				readOnly: true 
			});
			
			SmartWorks.FormRuntime.TextInputBuilder.buildEx({
				container: gridRow,
				fieldId: "cmbAssetTypeName",
				fieldName: assetTypeNameTitle,
				value: assetTypeName,
				columns: 2,
				colSpan: 1,
				readOnly: true 
			});
			
			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			SmartWorks.FormRuntime.CheckBoxBuilder.buildEx({
				container: gridRow,
				fieldId: "chkAutoApproval",
				fieldName: autoApprovalTitle,
				value: autoApproval,
				columns: 2,
				colSpan: 1,
				readOnly: true
			});
			
			SmartWorks.FormRuntime.CheckBoxBuilder.buildEx({
				container: gridRow,
				fieldId: "chkAutoReturn",
				fieldName: autoReturnTitle,
				value: autoReturn,
				columns: 2,
				colSpan: 1,
				readOnly: true
			});
			
			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			SmartWorks.FormRuntime.TextInputBuilder.buildEx({
				container: gridRow,
				fieldId: "txtAssetName",
				fieldName: assetNameTitle,
				value: assetName,
				columns: 2,
				colSpan: 2,
				readOnly: readOnly,
				required: true
			});
			
			if(type == '1' || type == '3' || type == '4' || type == '99'){
				gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
				SmartWorks.FormRuntime.TextInputBuilder.buildEx({
					container: gridRow,
					fieldId: "txtAssetLocation",
					fieldName: locationTitle,
					value: assetLocation,
					columns: 2,
					colSpan: 2,
					readOnly: readOnly,
					required: false 
				});
			}

			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			if(type == '3'){
				SmartWorks.FormRuntime.TextInputBuilder.buildEx({
					container: gridRow,
					fieldId: "txtAssetScale",
					fieldName: scaleTitle,
					value: assetScale,
					columns: 2,
					colSpan: 1,
					readOnly: readOnly,
					required: false 
				});
			}

			if(type == '1'){
				SmartWorks.FormRuntime.TextInputBuilder.buildEx({
					container: gridRow,
					fieldId: "txtAssetAccommodateNumber",
					fieldName: accommodateNumberTitle,
					value: assetAccommodateNumber,
					columns: 2,
					colSpan: 1,
					readOnly: readOnly,
					required: false 
				});
			}

			if(type == '2'){
				SmartWorks.FormRuntime.TextInputBuilder.buildEx({
					container: gridRow,
					fieldId: "txtAssetCarType",
					fieldName: carTypeTitle,
					value: assetCarType,
					columns: 2,
					colSpan: 1,
					readOnly: readOnly,
					required: false 
				});
			}

			if(type == '3'){
				SmartWorks.FormRuntime.TextInputBuilder.buildEx({
					container: gridRow,
					fieldId: "txtAssetPurpose",
					fieldName: purposeTitle,
					value: assetPurpose,
					columns: 2,
					colSpan: 1,
					readOnly: readOnly,
					required: false 
				});
			}

			if(type == '4'){
				SmartWorks.FormRuntime.TextInputBuilder.buildEx({
					container: gridRow,
					fieldId: "txtAssetProductType",
					fieldName: productTypeTitle,
					value: assetProductType,
					columns: 2,
					colSpan: 1,
					readOnly: readOnly,
					required: false 
				});
			}

			if(type == '5' || type == '6' || type == '7' || type == '99'){
				SmartWorks.FormRuntime.TextInputBuilder.buildEx({
					container: gridRow,
					fieldId: "txtAssetType",
					fieldName: typeTitle,
					value: assetType,
					columns: 2,
					colSpan: 1,
					readOnly: readOnly,
					required: false 
				});
			}

			if(type == '6'){
				SmartWorks.FormRuntime.TextInputBuilder.buildEx({
					container: gridRow,
					fieldId: "txtAssetSpecification",
					fieldName: specificationTitle,
					value: assetSpecification,
					columns: 2,
					colSpan: 1,
					readOnly: readOnly,
					required: false 
				});
			}
			
			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			SmartWorks.FormRuntime.DateChooserBuilder.buildEx({
				container: gridRow,
				fieldId: "txtAssetAvailableFrom",
				fieldName: availableFromTitle,
				value: assetAvailableFrom,
				columns: 2,
				colSpan: 1,
				readOnly: readOnly,
				required: false
			});
			if(readOnly && isEmpty(assetAvailableFrom)){
				gridRow.find('td[fieldId="txtAssetAvailableFrom"] .form_value').text(smartMessage.get("textNone"));
			}
			
			SmartWorks.FormRuntime.DateChooserBuilder.buildEx({
				container: gridRow,
				fieldId: "txtAssetAvailableTo",
				fieldName: availableToTitle,
				value: assetAvailableTo,
				columns: 2,
				colSpan: 1,
				readOnly: readOnly,
				required: false
			});
			if(readOnly && isEmpty(assetAvailableTo)){
				gridRow.find('td[fieldId="txtAssetAvailableTo"] .form_value').text(smartMessage.get("textNone"));
			}
			
			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			SmartWorks.FormRuntime.UserFieldBuilder.buildEx({
				container: gridRow,
				fieldId: "txtAssetPersonsInCharge",
				fieldName: personsInChargeTitle,
				columns: 2,
				colSpan: 2,
				users: assetPersonsInCharge,
				multiUsers: true,
				readOnly: readOnly,
				required: true
			});
			
			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);			
			SmartWorks.FormRuntime.TextInputBuilder.buildEx({
				container: gridRow,
				fieldId: "txtAssetDesc",
				fieldName: descTitle,
				value: assetDesc,
				columns: 2,
				colSpan: 2,
				multiLines: 4,
				readOnly: readOnly,
				required: false
			});
			
			if(!readOnly){
				gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);			
				SmartWorks.FormRuntime.ImageBoxBuilder.buildEx({
					container: gridRow,
					fieldId: "imgAssetImage",
					fieldName: imageTitle,
					imgSource: assetImage,
					columns: 2,
					colSpan: 1,
					readOnly: readOnly,
					required: false
				});
				gridRow.find('td[fieldId="imgAssetImage"] .form_label .qq-upload-button').text(smartMessage.get(imageTitle));
			}
		}		
	}
};

function loadNewReservationFields(assetFolderId, assetFolderName, assetId, assetName, startDate, endDate, action, subject, 
									repeatBy, repeatWeek, repeatDay, repeatDate, repeatEnd, repeatEndCount, repeatEndDate,
									relatedUsers, content, isPopup) {
	var newReservationFields = isPopup ? $('.js_asset_reservation_page div.js_new_reservation_fields') : $('div.js_new_reservation_fields');
	if(!isEmpty(newReservationFields)) {
		for(var i=0; i<newReservationFields.length; i++) {
			var newReservationField = $(newReservationFields[i]);
			var gridRow = SmartWorks.GridLayout.newGridRow();
			var gridTable = SmartWorks.GridLayout.newGridTable();
			newReservationField.html(gridTable.html(gridRow));
			
			var folderNameTitle = newReservationField.attr("folderNameTitle");
			var assetNameTitle = newReservationField.attr("assetNameTitle");
			var subjectTitle = newReservationField.attr("subjectTitle");
			var startDateTitle = newReservationField.attr("startDateTitle");
			var endDateTitle = newReservationField.attr("endDateTitle");
			var repeatByTitle = newReservationField.attr("repeatByTitle");
			var repeatEndTitle = newReservationField.attr("repeatEndTitle");
			var relatedUsersTitle = newReservationField.attr("relatedUsersTitle");
			var contentTitle = newReservationField.attr("contentTitle");

			SmartWorks.FormRuntime.TextInputBuilder.buildEx({
				container: gridRow,
				fieldId: "txtSubject",
				fieldName: subjectTitle,
				columns: 4,
				colSpan: 4,
				value: subject,
				required: true,
				readOnly: (action=='view' || action=='approval' || action=='return' || action=='cancel')
			});
			
			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			var folderItems = new Array();
			if(!isEmpty(assetFolderId) && !isEmpty(assetFolderName)){
				folderItems.push(assetFolderName);
			}
			SmartWorks.FormRuntime.ComboBoxBuilder.buildEx({
				container: gridRow,
				fieldId: "selAssetFolder",
				fieldName: folderNameTitle,
				columns: 4,
				colSpan: 2,
				staticItems : folderItems
			});
			if(!isEmpty(folderItems)){
				var folderItem = gridRow.find('td[fieldId="selAssetFolder"] option');
				$(folderItem[0]).attr('folderId', assetFolderId);
			}
			
			var assetItems = new Array();
			if(!isEmpty(assetId) && !isEmpty(assetName)){
				assetItems.push(assetName);
			}
			SmartWorks.FormRuntime.ComboBoxBuilder.buildEx({
				container: gridRow,
				fieldId: "selAsset",
				fieldName: assetNameTitle,
				columns: 4,
				colSpan: 2,
				staticItems : assetItems
			});
			if(!isEmpty(assetItems)){
				var assetItem = gridRow.find('td[fieldId="selAsset"] option');
				$(assetItem[0]).attr('assetId', assetId);
			}
			
			if(isEmpty(startDate)){
				var today = new Date();
				startDate = (new Date(today.getTime() - today.getMinutes()*60*1000)).format('yyyy.mm.dd HH:MM');
			}
			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			SmartWorks.FormRuntime.DateTimeChooserBuilder.buildEx({
				container: gridRow,
				fieldId: "txtStartDate",
				fieldName: startDateTitle,
				value: startDate,
				columns: 4,
				colSpan: 2,
				required: true,
				readOnly: (action=='view' || action=='approval' || action=='return' || action=='cancel')
			});

			if(isEmpty(endDate)){
				var today = new Date();
				endDate = (new Date(today.getTime() - today.getMinutes()*60*1000 + 1*60*60*1000)).format('yyyy.mm.dd HH:MM');
			}
			SmartWorks.FormRuntime.DateTimeChooserBuilder.buildEx({
				container: gridRow,
				fieldId: "txtEndDate",
				fieldName: endDateTitle,
				value: endDate,
				columns: 4,
				colSpan: 2,
				required: true,
				readOnly: (action=='view' || action=='approval' || action=='return' || action=='cancel')
			});
			
			if(isPopup){
				gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
				var repeatItems = new Array();
				if(isEmpty(repeatBy))
					repeatItems.push(smartMessage.get("falseText"));
				else
					repeatItems.push(smartMessage.get("trueText"));
				SmartWorks.FormRuntime.ComboBoxBuilder.buildEx({
					container: gridRow,
					fieldId: "selEventRepeatBy",
					fieldName: repeatByTitle,
					columns: 4,
					colSpan: 2,
					staticItems : repeatItems,
					required: false
				});
			}else{
				gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
				var repeatItems = new Array();
				repeatItems.push(smartMessage.get("eventRepeatNone"));
				repeatItems.push(smartMessage.get("eventRepeatEveryDay"));
				repeatItems.push(smartMessage.get("eventRepeatEveryWeek"));
				repeatItems.push(smartMessage.get("eventRepeatBiWeek"));
				repeatItems.push(smartMessage.get("eventRepeatEveryMonthD"));
				repeatItems.push(smartMessage.get("eventRepeatEveryMonthC"));
				repeatItems.push(smartMessage.get("eventRepeatBiMonthD"));
				repeatItems.push(smartMessage.get("eventRepeatBiMonthC"));
				SmartWorks.FormRuntime.ComboBoxBuilder.buildEx({
					container: gridRow,
					fieldId: "selEventRepeatBy",
					fieldName: repeatByTitle,
					columns: 4,
					colSpan: 2,
					staticItems : repeatItems,
					required: false
				});
				var repeatBys = gridRow.find('td[fieldId="selEventRepeatBy"] option');
				$(repeatBys[0]).attr('repeatBy', "none");
				$(repeatBys[1]).attr('repeatBy', "everyDay");
				$(repeatBys[2]).attr('repeatBy', "everyWeek");
				$(repeatBys[3]).attr('repeatBy', "biWeek");
				$(repeatBys[4]).attr('repeatBy', "everyMonthDate");
				$(repeatBys[5]).attr('repeatBy', "everyMonthCustom");
				$(repeatBys[6]).attr('repeatBy', "biMonthDate");
				$(repeatBys[7]).attr('repeatBy', "biMonthCustom");
				if(!isEmpty(repeatBy)){
					gridRow.find('td[fieldId="selEventRepeatBy"] option[repeatBy="' + repeatBy + '"]').attr('selected', 'selected');
				}
				if(action === 'modify'){
					gridRow.hide();
				}
				
				var weekItems = new Array();
				weekItems.push(smartMessage.get("eventRepeatFirst"));
				weekItems.push(smartMessage.get("eventRepeatSecond"));
				weekItems.push(smartMessage.get("eventRepeatThird"));
				weekItems.push(smartMessage.get("eventRepeatFourth"));
				weekItems.push(smartMessage.get("eventRepeatLast"));
				weekItems.push(smartMessage.get("eventRepeatFirstWeek"));
				weekItems.push(smartMessage.get("eventRepeatSecondWeek"));
				weekItems.push(smartMessage.get("eventRepeatThirdWeek"));
				weekItems.push(smartMessage.get("eventRepeatFourthWeek"));
				weekItems.push(smartMessage.get("eventRepeatLastWeek"));
				SmartWorks.FormRuntime.ComboBoxBuilder.buildEx({
					container: gridRow,
					fieldId: "selEventRepeatWeek",
					fieldName: "",
					columns: 4,
					colSpan: 1,
					staticItems : weekItems,
					required: false
				});
				gridRow.find('td[fieldId="selEventRepeatWeek"]').hide().find('.form_label').hide();
				var repeatBys = gridRow.find('td[fieldId="selEventRepeatWeek"] option');
				$(repeatBys[0]).attr('repeatWeek', "first");
				$(repeatBys[1]).attr('repeatWeek', "second");
				$(repeatBys[2]).attr('repeatWeek', "third");
				$(repeatBys[3]).attr('repeatWeek', "fourth");
				$(repeatBys[4]).attr('repeatWeek', "last");
				$(repeatBys[5]).attr('repeatWeek', "firstWeek");
				$(repeatBys[6]).attr('repeatWeek', "secondWeek");
				$(repeatBys[7]).attr('repeatWeek', "thirdWeek");
				$(repeatBys[8]).attr('repeatWeek', "fourthWeek");
				$(repeatBys[9]).attr('repeatWeek', "lastWeek");
				if(!isEmpty(repeatWeek)){
					gridRow.find('td[fieldId="selEventRepeatWeek"] option[repeatWeek="' + repeatWeek + '"]').attr('selected', 'selected');
				}
				
				var dayItems = new Array();
				dayItems.push(smartMessage.get("eventRepeatMon"));
				dayItems.push(smartMessage.get("eventRepeatTue"));
				dayItems.push(smartMessage.get("eventRepeatWed"));
				dayItems.push(smartMessage.get("eventRepeatThu"));
				dayItems.push(smartMessage.get("eventRepeatFri"));
				dayItems.push(smartMessage.get("eventRepeatSat"));
				dayItems.push(smartMessage.get("eventRepeatSun"));
				SmartWorks.FormRuntime.ComboBoxBuilder.buildEx({
					container: gridRow,
					fieldId: "selEventRepeatDay",
					fieldName: "",
					columns: 4,
					colSpan: 1,
					staticItems : dayItems,
					required: false
				});
				gridRow.find('td[fieldId="selEventRepeatDay"]').hide().find('.form_label').hide();
				var repeatBys = gridRow.find('td[fieldId="selEventRepeatDay"] option');
				$(repeatBys[0]).attr('repeatDay', "mon");
				$(repeatBys[1]).attr('repeatDay', "tue");
				$(repeatBys[2]).attr('repeatDay', "wed");
				$(repeatBys[3]).attr('repeatDay', "thu");
				$(repeatBys[4]).attr('repeatDay', "fri");
				$(repeatBys[5]).attr('repeatDay', "sat");
				$(repeatBys[6]).attr('repeatDay', "sun");
				if(!isEmpty(repeatDay)){
					gridRow.find('td[fieldId="selEventRepeatDay"] option[repeatDay="' + repeatDay + '"]').attr('selected', 'selected');
				}
	
				var dateItems = new Array();
				for(var i=0; i<31; i++)
					dateItems.push("" + (i+1));
				SmartWorks.FormRuntime.ComboBoxBuilder.buildEx({
					container: gridRow,
					fieldId: "selEventRepeatDate",
					fieldName: "",
					columns: 4,
					colSpan: 1,
					staticItems : dateItems,
					required: false
				});
				gridRow.find('td[fieldId="selEventRepeatDate"]').hide().find('.form_label').hide();
				if(!isEmpty(repeatDate)){
					gridRow.find('td[fieldId="selEventRepeatDate"] option[repeatDate="' + repeatDate + '"]').attr('selected', 'selected');
				}
	
				gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
				var repeatEndItems = new Array();
				repeatEndItems.push(smartMessage.get("eventRepeatEndCount"));
				repeatEndItems.push(smartMessage.get("eventRepeatEndDate"));
				SmartWorks.FormRuntime.ComboBoxBuilder.buildEx({
					container: gridRow,
					fieldId: "selEventRepeatEnd",
					fieldName: repeatEndTitle,
					columns: 4,
					colSpan: 2,
					staticItems : repeatEndItems,
					required: false
				});
				gridRow.find('td[fieldId="selEventRepeatEnd"]').hide();
				var repeatEnds = gridRow.find('td[fieldId="selEventRepeatEnd"] option');
				$(repeatEnds[0]).attr('repeatEnd', "repeatCount");
				$(repeatEnds[1]).attr('repeatEnd', "endDate");
				if(!isEmpty(repeatEnd)){
					gridRow.find('td[fieldId="selEventRepeatEnd"] option[repeatEnd="' + repeatEnd + '"]').attr('selected', 'selected');
				}
							
				SmartWorks.FormRuntime.NumberInputBuilder.buildEx({
					container: gridRow,
					fieldId: "txtEventRepeatEndCount",
					fieldName: "",
					columns: 4,
					colSpan: 2,
					value: repeatEndCount,
					required: true,
					readOnly: (action=='view' || action=='approval' || action=='return' || action=='cancel')
				});
				gridRow.find('td[fieldId="txtEventRepeatEndCount"]').hide().find('.form_label').hide();
				
				if(isEmpty(repeatEndDate)){
					var today = new Date();
					today = new Date(today.getTime() + 365*24*60*60*1000/2);
					repeatEndDate = today.format('yyyy.mm.dd');
				}
				SmartWorks.FormRuntime.DateChooserBuilder.buildEx({
					container: gridRow,
					fieldId: "txtEventRepeatEndDate",
					fieldName: "",
					value: repeatEndDate,
					columns: 4,
					colSpan: 2,
					required: true,
					readOnly: (action=='view' || action=='approval' || action=='return' || action=='cancel')
				});
				gridRow.find('td[fieldId="txtEventRepeatEndDate"]').hide().find('.form_label').hide();
	
				if(!isEmpty(repeatBy)){
					newReservationField.find('td[fieldId="selEventRepeatBy"] select').change();
				}
				if(!isEmpty(repeatEnd)){
					newReservationField.find('td[fieldId="selEventRepeatEnd"] select').change();
				}
				
				if(action=='view' || action=='approval' || action=='return' || action=='cancel'){
					newReservationField.find('td[fieldId="selEventRepeatBy"] select').attr('disabled', 'disabled');
					newReservationField.find('td[fieldId="selEventRepeatWeek"] select').attr('disabled', 'disabled');
					newReservationField.find('td[fieldId="selEventRepeatDay"] select').attr('disabled', 'disabled');
					newReservationField.find('td[fieldId="selEventRepeatDate"] select').attr('disabled', 'disabled');
					newReservationField.find('td[fieldId="selEventRepeatEnd"] select').attr('disabled', 'disabled');
				}
			}
			
			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			SmartWorks.FormRuntime.UserFieldBuilder.buildEx({
				container: gridRow,
				fieldId: "txtRelatedUsers",
				fieldName: relatedUsersTitle,
				columns: 4,
				colSpan: 4,
				users: relatedUsers,
				multiUsers: true,
				required: false,
				readOnly: (action=='view' || action=='approval' || action=='return' || action=='cancel')
			});

			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			SmartWorks.FormRuntime.TextInputBuilder.buildEx({
				container: gridRow,
				fieldId: "txtContent",
				fieldName: contentTitle,
				columns: 4,
				colSpan: 4,
				value: content,
				multiLines: 4,
				required: false,
				readOnly: (action=='view' || action=='approval' || action=='return' || action=='cancel')
			});
		}		
	}
};

}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-formFields script]', null, error);
}

