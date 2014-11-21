try{
SmartWorks.FormRuntime = SmartWorks.FormRuntime || {};

SmartWorks.FormRuntime.UserFieldBuilder = {};

SmartWorks.FormRuntime.UserFieldBuilder.build = function(config) {
	var options = {
		mode : 'edit', // view or edit
		container : $('<td></td>'),
		entity : null,
		dataField : '',
		courseId : null,
		friendOnly : false,
		emailAddress : false,
		refreshData : false,
		layoutInstance : null,
		isDataGrid : false
	};

	SmartWorks.extend(options, config);
	if(!options.refreshData)
		options.container.html('');

	var users = (options.dataField && options.dataField.users) || new Array();
	var usersHtml = (options.dataField && options.dataField.usersHtml) || "";
	var $entity = options.entity;
	var $graphic = $entity.find('graphic');
	var readOnly = $graphic.attr('readOnly') === 'true' || options.mode === 'view';
	var multiUsers = $graphic.attr('multipleUsers');
	options.container.attr('multiUsers', multiUsers);
	var id = $entity.attr('id');
	var name = $entity.attr('name');
	
	var labelWidth = (isEmpty(options.layoutInstance)) ? parseInt($graphic.attr('labelWidth')) : options.layoutInstance.getLabelWidth(id);
	var valueWidth = 100 - (options.isDataGrid ? 0 : labelWidth);
	var $label = $('<div class="form_label" style="width:' + labelWidth + '%"><span>' + name + '</span></div>');
	var required = $entity.attr('required');
	if(required === 'true' && !readOnly){
		$label.addClass('required_label');
		required = " class='fieldline community_names js_community_names sw_required'";
	}else{
		required = " class='fieldline community_names js_community_names'";
	}
	if(!options.refreshData && !options.isDataGrid)
		$label.appendTo(options.container);
	
	var $user = null;
	
	var href = "user_name.sw";
	if(!isEmpty(options.courseId))
		href = "course_member.sw?courseId=" + options.courseId;
	else if(options.friendOnly)
		href = "sera_user.sw";
	else if(options.emailAddress)
		href = "email_address.sw";
	
	var icoClass = ' class="icon_fb_user"';
	var userPicker = 'class="js_userpicker_button"';
	if(!isEmpty(options.courseId))
		userPicker = 'class="js_coursememberpicker_button" courseId="' + options.courseId + '"';
	else if(options.friendOnly)
		userPicker = 'class="js_friendpicker_button"';
	else if(options.emailAddress)
		userPicker = 'class="js_emailpicker_button"';
	
	if(multiUsers === 'true'){
		if(!isEmpty(users) && isEmpty(usersHtml)){
			for(var i=0; i<users.length; i++){
				var longName = options.emailAddress ? users[i].longName : getDepartNameFromFullpath(users[i].longName);
				var titleDesc = '';
				if(longName!==users[i].longName)
					titleDesc = ' title="' + users[i].longName + '" ';
				usersHtml = usersHtml +  "<span class='js_community_item user_select' comId='" + users[i].userId + "' comName='" + users[i].longName + "'" + titleDesc + ">" + longName + "<a class='js_remove_community' href=''  tabindex='-1'>&nbsp;x</a></span>";
			}
		}
		href = "community_name.sw";
		if(!isEmpty(options.courseId))
			href =  "course_member.sw?courseId=" + options.courseId;
		else if(options.emailAddress)
			href = "email_address.sw";
		icoClass = ' class="icon_fb_users"';
	}else if (!isEmpty(users) && isEmpty(usersHtml)) {
		usersHtml = "<span class='js_community_item user_select' comId='" + users[0].userId + "' comName='" + users[0].longName + "'>" + users[0].longName + "<a class='js_remove_community' href=''  tabindex='-1'>&nbsp;x</a></span>";
	}

	var $html = $('<div class="form_value" style="width:' + valueWidth + '%"> <div class="icon_fb_space">\
					<div ' + required + '>\
						' + usersHtml + '\
						<input class="m0 js_auto_complete" style="min-width:100px !important;max-width:200px" href="' + href + '" type="text">\
					</div>\
					<div class="js_community_list srch_list_nowid" style="display: none"></div><span class="js_community_popup"></span><a href=""' + userPicker + '  tabindex="-1"><span ' + icoClass + '></span></a></div></div>');

	if(readOnly){
		$user = $('<div class="form_value" style="width:' + valueWidth + '%"><span></span></div>');
		var viewUsersHtml = '';
		if(isEmpty(users) && !isEmpty(usersHtml)){
			viewUsersHtml = usersHtml;
		}else{
			for(var i=0; i<users.length; i++) {
				var separator = ', ';
				var href = '';
				var desc = '';
				if(isEmailAddress(users[i].userId)){
					href = 'user_space.sw?cid=us.sp.';
					if(options.emailAddress) desc = "(" +  users[i].userId + ")";
				}else if(users[i].userId.substring(0,6) === "group_"){
					href = 'group_space.sw?cid=gp.sp.';
				}else if(users[i].userId.substring(0,5) === "dept_"){
					href = 'department_space.sw?cid=dp.sp.';
				}
				href = href + users[i].userId + '&wid=' + users[i].userId;
				if(i == users.length - 1)
					separator = '';
				var longName = options.emailAddress ? users[i].longName : getDepartNameFromFullpath(users[i].longName);
				var titleDesc = '';
				if(longName!==users[i].longName)
					titleDesc = ' title="' + users[i].longName + '" ';
				viewUsersHtml = viewUsersHtml + '<a href="' + href + '" tabindex="-1"' + titleDesc + ' class="linkline"><span>' + longName + desc + separator + '</span></a>';
			}
		}
		$user.find('span').html(viewUsersHtml);
	}else{	
		$user = $html;
		$user.attr('title', $entity.attr('toolTip'));
	}
	if ($graphic.attr('hidden') == 'true'){
		options.container.hide();
	}

	if(!options.refreshData){
		$user.appendTo(options.container);
	}else{
		smartPop.close();
		if(readOnly){
			options.container.find('.form_value').html($user.children());
		}else{
			options.container.find('.form_value .js_community_names .js_community_item').remove();
			options.container.find('.form_value .js_community_names').prepend($user.find('.js_community_names .js_community_item'));
		}
	}

	if (readOnly) {
		var $userHiddenDiv = options.container.find('#userHiddenDiv' + id);
		if ($userHiddenDiv.length === 0) {
			options.container.append($('<div id="userHiddenDiv' + id + '" style="display:none"></div>').html(usersHtml));
		} else {
			$userHiddenDiv.html(usersHtml);
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
				formValue.html('<span></span>');
				var viewUsersHtml = '';
				if(isEmpty(users) && !isEmpty(usersHtml)){
					viewUsersHtml = usersHtml;
				}else{
					for(var i=0; i<users.length; i++) {
						var separator = ', ';
						var href = '';
						var desc = '';
						if(isEmailAddress(users[i].userId)){
							href = 'user_space.sw?cid=us.sp.';
							if(options.emailAddress) desc = "(" +  users[i].userId + ")";
						}else if(users[i].userId.substring(0,6) === "group_"){
							href = 'group_space.sw?cid=gp.sp.';
						}else if(users[i].userId.substring(0,5) === "dept_"){
							href = 'department_space.sw?cid=dp.sp.';
						}
						href = href + users[i].userId + '&wid=' + users[i].userId;
						if(i == users.length - 1)
							separator = '';
						viewUsersHtml = viewUsersHtml + '<a href="' + href + '"  tabindex="-1" class="linkline"><span>' + users[i].longName + desc + separator + '</span></a>';
					}
				}
				formValue.find('span').html(viewUsersHtml);
				var $userHiddenDiv = options.container.find('#userHiddenDiv' + id);
				if ($userHiddenDiv.length === 0) {
					options.container.append($('<div id="userHiddenDiv' + id + '" style="display:none"></div>').html(usersHtml));
				} else {
					$userHiddenDiv.html(usersHtml);
				}
				formValue.removeAttr('title');
				formLabel.removeClass('required_label');
			}else if(isReadOnly == 'false'){			
				formValue.html('<div class="icon_fb_space">\
						<div ' + required + '>\
							' + usersHtml + '\
							<input class="m0 js_auto_complete" style="min-width:100px !important;max-width:200px" href="' + href + '" type="text">\
						</div>\
						<div class="js_community_list srch_list_nowid" style="display: none"></div><span class="js_community_popup"></span><a href=""' + userPicker + '  tabindex="-1"><span ' + icoClass + '></span></a></div>');
				$('#userHiddenDiv'+id).remove();
				formValue.attr('title', $entity.attr('toolTip'));
				if($entity.attr('required') === 'true')
					formLabel.addClass('required_label');
			}
				
			if(isRequired == 'true'){
				formLabel.addClass('required_label');
				formValue.find('.js_community_names').addClass('sw_required');
			}else if(isRequired == 'false'){
				formLabel.removeClass('required_label');
				formValue.find('.js_community_names').removeClass('sw_required');			
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

SmartWorks.FormRuntime.UserFieldBuilder.buildEx = function(config){
	var options = {
			container : $('<tr></tr>'),
			fieldId: '',
			fieldName: '',
			users: new Array(), //{userId: '',longName: '}
			columns: 1,
			colSpan: 1,
			multiUsers: false,
			courseId: null,
			friendOnly: false,
			emailAddress: false,
			usersHtml: "",
			required: false,
			readOnly: false		
	};
	SmartWorks.extend(options, config);

	var labelWidth = 12;
	if(options.columns >= 1 && options.columns <= 4 && options.colSpan <= options.columns) labelWidth = 12 * options.columns/options.colSpan;
	$formEntity =  $($.parseXML('<formEntity id="' + options.fieldId + '" name="' + options.fieldName + '" systemType="string" required="' + options.required + '" system="false">' +
						'<format type="userField" viewingType="userField"/>' +
					    '<graphic hidden="false" readOnly="'+ options.readOnly +'" labelWidth="'+ labelWidth + '" multipleUsers="' + options.multiUsers+ '"/>' +
					'</formEntity>')).find('formEntity');
	var $formCol = $('<td class="form_col js_type_userField" fieldid="' + options.fieldId+ '" colspan="' + options.colSpan + '" width="' + options.colSpan/options.columns*100 + '%" rowspan="1">');
	$formCol.appendTo(options.container);
	SmartWorks.FormRuntime.UserFieldBuilder.build({
			mode : options.readOnly, // view or edit
			container : $formCol,
			entity : $formEntity,
			courseId: options.courseId,
			friendOnly: options.friendOnly,
			emailAddress: options.emailAddress,
			dataField : SmartWorks.FormRuntime.UserFieldBuilder.dataField({
				fieldId: options.fieldId,
				users : options.users,
				usersHtml : options.usersHtml
			})
	});
	
};

SmartWorks.FormRuntime.UserFieldBuilder.serializeObject = function(userFields){
	var usersJson = {};
	for(var i=0; i<userFields.length; i++){
		var userField = $(userFields[i]);
//		if(!isEmpty(userField.parents('td.js_type_dataGrid'))) continue;
		var fieldId = userField.attr('fieldId');
		var userList = userField.find('.form_value .js_community_item');
		var users = new Array();
		if (userList.length === 0) {
			userList = userField.find('.js_community_item');
		}
		for(var j=0; j<userList.length; j++)
			users.push({
				id : $(userList[j]).attr('comId'),
				name : $.trim($(userList[j]).attr('comName'))
			});
		
		usersJson[fieldId] =  {users: users};
	}
	return usersJson;
};

SmartWorks.FormRuntime.UserFieldBuilder.validate = function(userFields){
	var usersValid = true;
	for(var i=0; i<userFields.length; i++){
		var userField = $(userFields[i]);
		var userId = userField.find('.js_community_item:first').attr('comId');
		var required = userField.find('div.sw_required');
		if(!isEmpty(required) && isBlank(userId)){
			userField.find('div.sw_required').addClass("sw_error");
			usersValid = false;
		}
	}
	return usersValid;
};

SmartWorks.FormRuntime.UserFieldBuilder.dataField = function(config){
	var options = {
			fieldName: '',
			formXml: '',
			fieldId: '',
			users: new Array(), //{userId: '',longName: ''}
			usersHtml: ""
	};

	SmartWorks.extend(options, config);
	$formXml = isEmpty(options.formXml) ? [] : $($.parseXML(options.formXml)).find('form');
	var dataField = {};
	
	var fieldId = (isEmpty(options.fieldId)) ? $formXml.find('formEntity[name="'+options.fieldName+'"]').attr('id') : options.fieldId;
	if(isEmpty(fieldId)) fieldId = ($formXml.attr("name") === options.fieldName) ? $formXml.attr('id') : "";
	if(isEmpty(fieldId)) return dataField;
	dataField = {
			id: fieldId,
			users : options.users,
			usersHtml : options.usersHtml
	};
	return dataField;
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[user_field script]', null, error);
}