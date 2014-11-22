try{
onOpenEffect = function(dialog){
	dialog.overlay.fadeIn('slow', function () {
		dialog.container.slideDown('slow', function () {
			dialog.data.fadeIn('slow');
		});
	});	
};

onCloseEffect = function(dialog){
	dialog.data.fadeOut('slow', function () {
		dialog.container.slideUp('slow', function () {
			dialog.overlay.fadeOut('slow', function () {
				$.modal.close(); // must call this!
			});
		});
	});
};

showInfoOptions = {
	opacity: 10,
	overlayCss: {backgroundColor:"#000"},
	containerCss:{
		backgroundColor:"#fff",
		borderColor:"#000",
		color: "#000",
		height:200,
		padding:1,
		width:500
	},
	overlayClose: false
};

smartPop = {
		
	INFO : 'Info',
	WARN : 'Warn',
	ERROR: 'Error',
	SECURITY: 'Security',
	CONFIRM: 'Confirm',
	
	LOCATION_WORK_LIST : 'LocWorkList',
	LOCATION_WORK_INSTANCE_SPACE : 'LocWorkInstanceSpace',
	LOCATION_WORKSPACE : 'LocWorkspace',
	LOCATION_BUILDER : 'LocBuilder',

	overlay : function(target){
		if(isEmpty($(target))) target = $(document.body);
		var curtain = $('<span id="sw_overlay_span" class="op10" style="position:absolute; top:0; left:0; width:' + $(document).width() + 'px; height:' + $(document).height() + 'px; z-index:10000; display:block; background-color:#000;"></span>');
		curtain.appendTo($(target));
	},
	
	overlayDark : function(target){
		if(isEmpty($(target))) target = $(document.body);
		var curtain = $('<span id="sw_overlay_span" class="op10" style="position:absolute; top:0; left:0; width:' + $(document).width() + 'px; height:' + $(document).height() + 'px; z-index:10000; display:block; background-color:#000;"></span>');
		curtain.appendTo($(target));
	},
	
	closeOverlay : function(){
		$("#sw_overlay_span").remove();
	},
	
	closeUserInfo : function(){
		smartPop.closeOverlay();
		$('#sw_pop_user_info').hide();		
	},

	showUserInfo : function(input, top, left, directionUp){
		try{
			var userId = input.attr("userId");
			var longName = input.attr("longName");
			var minPicture = input.attr("minPicture");
			var profile = input.attr("profile");
			var userDetail = input.attr("userDetail");		
			var popUserInfo = $('#sw_pop_user_info');
			var sendMailStr = (currentUser.isUseMail==='true') ? '<span class="pop_icon_mail"><a href="" class="js_send_mail_to_user" userId="' + userId + '" title="' + smartMessage.get("sendMailText") + '"></a></span>' : "";

			var startChatStr = (companyGeneral.useChattingService==='true') ? '<span class="pop_icon_chat"><a href="" class="js_start_chat_with_user" userId="' + userId + '" longName="' + longName + '" minPicture="' + minPicture + '" title="' + smartMessage.get("startChatText") + '"></a></span>' : "";
			if(!isEmpty(popUserInfo)){
				popUserInfo.show();
			}else{
				$('<div id="sw_pop_user_info" style="z-index:10001; position:absolute; left:' + left + 'px; top:' + top + 'px;">' +
						'<div class="up_point" style="left: 10px; top: 1px; position: relative;display:none;"></div>' + 
						'<div class="pop_corner_all smart_userinfo_section">' + 
							'<div class="pop_contents">' + 
								'<img src="' + profile + '" class="profile_size_b fl">' + 
								' <div class="js_user_information userinfo_area"></div>' +
							'</div>' +
							'<div class="smartp_btn_space">' +
								'<div class="fr">' +
									sendMailStr +
									startChatStr + 
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="up_point_b" style="left: 10px; position: relative;display:none;"></div>' +
				'</div>').appendTo($(document.body));
	
				popUserInfo = $('#sw_pop_user_info');
				$('#sw_pop_user_info .js_send_mail_to_user').die('click');
				$('#sw_pop_user_info .js_send_mail_to_user').live('click', function(e){
					try{
						var input = $(targetElement(e));
						var receiverId = input.attr('userId');
						smartPop.progressCenter();
						$.get('new_mail.sw?receiverId=' + receiverId, function(data){
							$('#content').html(data);
							smartPop.closeProgress();
						});
						popUserInfo.hide();
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup showUserInfo js_send_mail_to_user]', null, error);
					}				
					return false;
				});
			}
			popUserInfo.find('img').attr('src', profile);
			popUserInfo.find('.js_user_information').html(userDetail);
			popUserInfo.find('.js_send_mail_to_user').attr('userId', userId);
			popUserInfo.find('.js_start_chat_with_user').attr('userId', userId).attr('longName', longName).attr('minPicture', minPicture);
			if(directionUp){
				popUserInfo.find('.up_point_b').hide();
				popUserInfo.find('.up_point').show();
			}else{
				popUserInfo.find('.up_point').hide();
				popUserInfo.find('.up_point_b').show();
			}
			if(!directionUp)
				top = top - popUserInfo.height();
			popUserInfo.css({"top": top + "px", "left": left + "px"});
			popUserInfo.focus();
		}catch(error){
			console.log(error);
			//smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup showUserInfo]', null, error);
		}				
	},
	
	closeFilesDetail : function(){
		smartPop.closeOverlay();
		$('#sw_pop_files_detail').hide();		
	},

	showFilesDetail : function(input, top, left){
		var filesDetail = input.attr("filesDetail");
		var popFilesDetail = $('#sw_pop_files_detail');
		if(!isEmpty(popFilesDetail)){
			popFilesDetail.show();
		}else{
			$('<div id="sw_pop_files_detail" style="z-index:10001; position:absolute; left:' + left + 'px; top:' + top + 'px;">' +
					'<div class="pop_corner_all pop_contents js_files_detail">' + filesDetail +
					'</div>' +
			'</div>').appendTo($(document.body));
		}
		popFilesDetail.find('.js_files_detail').html(filesDetail);
		popFilesDetail.css({"top": top + "px", "left": left + "px"});

	},
	
	closeInfo : function(){
		smartPop.closeOverlay();
		$('#sw_pop_show_info').remove();		
	},

	showAccessViolation : function(location){
		if(location == smartPop.LOCATION_WORK_LIST || location == smartPop.LOCATION_WORK_INSTANCE_SPACE || location == smartPop.LOCATION_WORKSPACE || location == smartPop.LOCATION_BUILDER){
			smartPop.showInfo(smartPop.SECURITY, smartMessage.get('accessViolation' + location));
		}
	},
	
	showInfo : function(infoType, message, onClose, messageDetail){
		if(infoType !== smartPop.INFO && infoType !== smartPop.WARN && infoType !== smartPop.ERROR && infoType !== smartPop.SECURITY) infoType = smartPop.INFO;
		smartPop.overlayDark();
		var messageColor = infoType == smartPop.SECURITY ? 'style="color:red;"' : '';
		var showDetail = isEmpty(messageDetail) ? '' : '<a href="" class="linkline fl t_date mt6" onClick="$(this).parent().next().toggle();return false;">' + smartMessage.get('showDetailText') + '</a>';
		var detailMessageHtml = isEmpty(messageDetail) ? '' : '<div class="detail_section" style="display:none"><div class="detail_area">' + messageDetail + '</div></div>'; 
		$('<div id="sw_pop_show_info" style="z-index:10001; position:absolute;" class="pop_corner_all smart_pop_section">' + 
					'<div class="pop_contents p0">' + 
						'<div class="icon_pop_' + infoType + '">' + smartMessage.get('popType'+infoType) + '</div>' +
					 	'<div class="p20" ' + messageColor + '>' + message + '</div>' +
					 '</div>' +
					 '<div class="glo_btn_space">' +
					 	showDetail +
					 	'<div class="fr">' +
					 		'<span class="btn_gray"> <a class="js_btn_close" href=""> <span class="txt_btn_start"></span>' +
					 			'<span class="txt_btn_center">' + smartMessage.get('buttonClose') + '</span> <span class="txt_btn_end"></span>' +
					 		'</a> </span>' +
					 	'</div>' +
					'</div>' +
					detailMessageHtml +
				 '</div>').appendTo($(document.body)).center();
		$('#sw_pop_show_info .js_btn_close').die('click');
		$('#sw_pop_show_info .js_btn_close').live('click', function(){
			if ($.isFunction(onClose)) {
				onClose.apply();
			}
			smartPop.closeInfo();
			return false;
		});

		$('#sw_pop_show_info .js_btn_close').focus();
		$('#sw_pop_show_info').keypress(function (e) {
			var e = window.event || e;
			var keyCode = e.which || e.keyCode;
	        if(keyCode == $.ui.keyCode.ENTER) {
	            $('#sw_pop_show_info .js_btn_close').click();
	            return false;
	        } else {
	            return true;
	        }
	    });
	},
	
	closeConfirm : function(){
		smartPop.closeOverlay();
		$('#sw_pop_confirm').remove();
	},
	
	confirm : function(message, onOk, onCancel){
		smartPop.overlayDark();
		$('<div id="sw_pop_confirm" class="pop_corner_all smart_pop_section" style="z-index:10001; position:absolute;">' + 
					'<div class="pop_contents p0">' + 
						'<div class="icon_pop_Info">' + smartMessage.get('popTypeConfirm') + '</div>' +
					 	'<div class="p20">' + message + '</div>' +
					 '</div>' +
					 '<div class="glo_btn_space">' +
					 	'<div class="fr">' +
					 		'<span class="btn_gray"> <a class="js_btn_ok" href=""> <span class="txt_btn_start"></span>' +
					 			'<span class="txt_btn_center">' + smartMessage.get('buttonConfirm') + '</span> <span class="txt_btn_end"></span>' +
					 		'</a> </span>' + 
				 			'<span class="btn_gray ml5"> <a class="js_btn_cancel" href=""> <span class="txt_btn_start"></span>' +
				 				'<span class="txt_btn_center">'  + smartMessage.get('buttonCancel') + '</span> <span class="txt_btn_end"></span>' +
				 			'</a> </span>' +
				 		'</div>' +
					 '</div>' +
				  '</div>').appendTo($(document.body)).center(); 

		$('#sw_pop_confirm .js_btn_ok').die('click');
		$('#sw_pop_confirm .js_btn_cancel').die('click');
		$('#sw_pop_confirm .js_btn_ok').live('click', function(){
			if ($.isFunction(onOk)) {
				onOk.apply();
			}
			smartPop.closeConfirm();
			return false;
		});
		
		$('#sw_pop_confirm .js_btn_cancel').live('click', function(){
			if ($.isFunction(onCancel)) {
				onCancel.apply();
			}
			smartPop.closeConfirm();
			return false;
		});
		$('#sw_pop_confirm .js_btn_ok').focus();
		$('#sw_pop_confirm').keypress(function (e) {
			var e = window.event || e;
			var keyCode = e.which || e.keyCode;
	        if (keyCode == $.ui.keyCode.ENTER) {
	            $('#sw_pop_confirm .js_btn_ok').click();
	            return false;
	        } else {
	            return true;
	        }
	    });
	},

	progressTarget : "",
	progressCenter : function(){
		$('<img class="js_progress_icon" src="images/load_wh.gif"/>').appendTo($(document));
		//if(!$.browser.msie)
			smartPop.overlay();
	},
	
	progressCont : function(target){
		smartPop.progressTarget= target;
		$('<img class="js_progress_icon" src="images/load_wh.gif"/>').appendTo(target);
		//if(!$.browser.msie)
			smartPop.overlay();
	},
	progressContGray : function(target){
		smartPop.progressTarget= target;
		$('<img class="js_progress_icon" src="images/load_wh_02.gif" align="bottom"/>').appendTo(target);
		//if(!$.browser.msie)
			smartPop.overlay();
	},
	progressNav : function(target){
		smartPop.progressTarget= target;
		$('<img class="js_progress_icon" src="images/load_gr.gif" align="bottom"/>').appendTo(target);
		//if(!$.browser.msie)
			smartPop.overlay();
	},
	progressNavGray : function(target){
		smartPop.progressTarget= target;
		$('<img class="js_progress_icon" src="images/load_gr_02.gif" align="bottom"/>').appendTo(target);
		//if(!$.browser.msie)
			smartPop.overlay();
	},

	closeProgress : function(){
		smartPop.closeOverlay();
		if(!isEmpty(smartPop.progressTarget))
			smartPop.progressTarget.find('.js_progress_icon').remove();
	},
	
	close : function(){
		$.modal.close();
	},
	
	selectUser : function(communityItems, target, width, isMultiUsers, courseId, friendOnly, bottomUp){
		try{
			target.html('');
			var conWidth = (!isEmpty(width) && width>360) ? width : 360;
			var url = (!isEmpty(courseId)) ? "pop_select_course_member.sw?multiUsers="+isMultiUsers + "&courseId=" + courseId 
						: (!isEmpty(friendOnly) && friendOnly) ? "pop_select_friend.sw?multiUsers=" + isMultiUsers 
						: "pop_select_user.sw?multiUsers="+isMultiUsers;
			
			var containerCss = (bottomUp) ? {width: conWidth, bottom: 0} : {width: conWidth}; 
			$.get(url, function(data){
				$(data).modal({
					appendTo: target,
					opacity: 0,
					autoPosition: false,
					fixed: false,
					overlayCss: {backgroundColor:"#000"},
					containerCss: containerCss,
					overlayClose: true,
					onShow: function(dialog){
						try{
							var selectionProc = function(comId, comName){
								var userField = target.parents('.js_type_userField:first');
								var inputTarget = userField.find('input.js_auto_complete:first');
								if(inputTarget.parents('.sw_required').hasClass('sw_error')){
									inputTarget.parents('.sw_required').removeClass('sw_error');
									inputTarget.parents('form.js_validation_required:first').validate({ showErrors: showErrors}).form();
								}
		
								var isSameId = false;
								if (isEmpty(communityItems) || (!isEmpty(userField) && userField.attr('multiUsers') !== 'true')){
									communityItems.remove();
								}else{
									for(var i=0; i<communityItems.length; i++){
										var oldComId = $(communityItems[i]).attr('comId');
										if(oldComId !=null && oldComId === comId){
											isSameId = true;
											break;
										}
									}
								}
								if(!isSameId){
									comNameLong = getDepartNameFromFullpath(comName);
									var titleDesc = '';
									if(comName !== comNameLong){
										titleDesc = ' title="' + comName + '"';
									}
									
									$("<span class='js_community_item user_select' comId='" + comId + "' comName='" + comName + "'" + titleDesc + ">" + comNameLong
											+ "<a class='js_remove_community' href=''>&nbsp;x</a></span>").insertBefore(inputTarget);
		
									var searchFilter = target.parents('.js_search_filter_page');
									if(!isEmpty(searchFilter)){
										userField.find('input[name="txtFilterStringOperand"]').attr('value', comId);
									}
								}
								inputTarget.focus();
								userField.find('.js_community_names').change();
							};
							
							$('a.js_pop_select_user').die('click');
							$('a.js_pop_select_users').die('click');
							if(isEmpty(isMultiUsers) || isMultiUsers!== 'true'){
								$('a.js_pop_select_user').live('click', function(e){
									try{
										var input = $(targetElement(e));
										if(!input.hasClass('js_pop_select_user')) input = input.parent();
										var comId = input.attr('userId');
										var comName = input.text();
										if(!isEmpty(communityItems) && communityItems.hasClass('js_selected_approver_info')){
											var userName = input.attr('userName');
											var userPosition = input.attr('userPosition') || "";
											var userPicture = input.attr('userPicture');
											var approverInfo = '<div class="noti_pic">' +
																	'<img class="profile_size_s" src="' + userPicture + '" title="' + userPosition + ' ' + userName + '">' +
																'</div>' +
																'<div class="noti_in">' +
																	'<div class="t_name">' + userPosition + '</div>' +
																	'<div class="t_name">' + userName + '</div>' +
																'</div>';
											communityItems.html(approverInfo);
											communityItems.nextAll('span').hide();
											communityItems.nextAll('input').attr('value', comId);
										}else{
											selectionProc(comId, comName);
										}
										smartPop.close();
										target.html('');
									}catch(error){
										smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectUser js_pop_select_user]', null, error);
									}				
									return false;
								});
								$('a.js_pop_select_user').focus();
								$('a.js_pop_select_user').keypress(function (e) {
									try{
										var e = window.event || e;
										var keyCode = e.which || e.keyCode;
								        if (keyCode == $.ui.keyCode.ENTER) {
								            $('a.js_pop_select_user').click();
								            return false;
								        } else {
								            return true;
								        }
									}catch(error){
										smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectUser js_pop_select_user keypress]', null, error);
									}				
							    });
							}else{
								$('a.js_pop_select_users').live('click', function(e){
									try{
										var selections = $('form[name="frmUserSelections"]').find('input.js_checkbox:checked');
										if(isEmpty(selections)) return false;
										
										for(var i=0; i<selections.length; i++){
											var selection = $(selections[i]);
											var comId = selection.attr('value');
											var comName = selection.attr("comName");
											selectionProc(comId, comName);
										}
										smartPop.close();
										target.html('');
									}catch(error){
										smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup seletUser js_pop_select_users]', null, error);
									}				
									return false;
								});
								$('a.js_pop_select_users').focus();
								$('a.js_pop_select_users').keypress(function (e) {
									try{
										var e = window.event || e;
										var keyCode = e.which || e.keyCode;
								        if (keyCode == $.ui.keyCode.ENTER) {
								            $('a.js_pop_select_users').click();
								            return false;
								        } else {
								            return true;
								        }
									}catch(error){
										smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectUser js_pop_select_users]', null, error);
									}				
							    });
							}
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectUser onShow]', null, error);
						}				
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectUser]', null, error);
		}				
	},

	selectEmailAddress : function(communityItems, target, width, isMultiUsers, bottomUp){
		try{
			target.html('');
			var conWidth = (!isEmpty(width) && width>360) ? width : 360;
			var url = "pop_select_email.sw?multiUsers="+isMultiUsers; 
			var containerCss = (bottomUp) ? {width: conWidth, bottom: 0} : {width: conWidth}; 
			$.get(url, function(data){
				$(data).modal({
					appendTo: target,
					opacity: 0,
					autoPosition: false,
					fixed: false,
					overlayCss: {backgroundColor:"#000"},
					containerCss: containerCss,
					overlayClose: true,
					onShow: function(dialog){
						try{
							var selectionProc = function(comId, comName){
								var userField = target.parents('.js_type_userField:first');
								var inputTarget = userField.find('input.js_auto_complete:first');
								if(inputTarget.parents('.sw_required').hasClass('sw_error')){
									inputTarget.parents('.sw_required').removeClass('sw_error');
									inputTarget.parents('form.js_validation_required:first').validate({ showErrors: showErrors}).form();
								}
		
								var isSameId = false;
								if (isEmpty(communityItems) || (!isEmpty(userField) && userField.attr('multiUsers') !== 'true')){
									communityItems.remove();
								}else{
									for(var i=0; i<communityItems.length; i++){
										var oldComId = $(communityItems[i]).attr('comId');
										if(oldComId !=null && oldComId === comId){
											isSameId = true;
											break;
										}
									}
								}
								if(!isSameId){
									var comNameLong = getDepartNameFromFullpath(comName);
									var titleDesc = '';
									if(comName !== comNameLong){
										titleDesc = ' title="' + comName + '"';
									}
									if(inputTarget.attr('href') === "email_address.sw"){
										if(!isEmailAddress(inputTarget.attr('value')) && isEmailAddress(comId) && !isEmailAddress(comName)){
											comNameLong = comName + "&lt;" + comId + "&gt;";
										}
									}
									$("<span class='js_community_item user_select' comId='" + comId + "' comName='" + comName + "'" + titleDesc + ">" + comNameLong
											+ "<a class='js_remove_community' href=''>&nbsp;x</a></span>").insertBefore(inputTarget);
								}
								inputTarget.focus();
								userField.find('.js_community_names').change();
							};
							
							$('a.js_pop_select_user').die('click');
							$('a.js_pop_select_users').die('click');
							if(isEmpty(isMultiUsers) || isMultiUsers!== 'true'){
								$('a.js_pop_select_user').live('click', function(e){
									try{
										var input = $(targetElement(e));
										var comId = input.attr('userId');
										var comName = input.text();
										selectionProc(comId, comName);
										smartPop.close();
										target.html('');
									}catch(error){
										smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectEmailAddress js_pop_select_user]', null, error);
									}				
									return false;
								});
								$('a.js_pop_select_user').focus();
								$('a.js_pop_select_user').keypress(function (e) {
									try{
										var e = window.event || e;
										var keyCode = e.which || e.keyCode;
								        if (keyCode == $.ui.keyCode.ENTER) {
								            $('a.js_pop_select_user').click();
								            return false;
								        } else {
								            return true;
								        }
									}catch(error){
										smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectEmailAddress js_pop_select_user keypress]', null, error);
									}				
							    });
							}else{
								$('a.js_pop_select_users').live('click', function(e){
									try{
										var input = $(targetElement(e));
										var selections = input.parents('.pop_list_area').find('input.js_checkbox:checked');
										if(isEmpty(selections)) return false;
										
										for(var i=0; i<selections.length; i++){
											var selection = $(selections[i]);
											var comId = selection.attr('value');
											var comName = selection.attr("comName");
											selectionProc(comId, comName);
										}
										smartPop.close();
										target.html('');
									}catch(error){
										smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectEmailAddress js_pop_select_users]', null, error);
									}				
									return false;
								});
								$('a.js_pop_select_users').focus();
								$('a.js_pop_select_users').keypress(function (e) {
									try{
										var e = window.event || e;
										var keyCode = e.which || e.keyCode;
								        if (keyCode == $.ui.keyCode.ENTER) {
								            $('a.js_pop_select_users').click();
								            return false;
								        } else {
								            return true;
								        }
									}catch(error){
										smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectEmailAddress js_pop_select_users keypress]', null, error);
									}				
							    });
							}
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectEmailAddress onShow]', null, error);
						}				
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectEmailAddress]', null, error);
		}				
	},

	selectCommunity : function(communityItems, target, width, isMultiUsers, bottomUp){
		try{
			target.html('');
			var conWidth = (!isEmpty(width) && width>360) ? width : 360;
			var url = "pop_select_community.sw?multiUsers="+isMultiUsers; 
			var containerCss = (bottomUp) ? {width: conWidth, bottom: 0} : {width: conWidth}; 
			$.get(url, function(data){
				$(data).modal({
					appendTo: target,
					opacity: 0,
					autoPosition: false,
					fixed: false,
					overlayCss: {backgroundColor:"#000"},
					containerCss: containerCss,
					overlayClose: true,
					onShow: function(dialog){
						try{
							var selectionProc = function(comId, comName){
								var userField = target.parents('.js_type_userField:first');
								var inputTarget = userField.find('input.js_auto_complete:first');
								if(inputTarget.parents('.sw_required').hasClass('sw_error')){
									inputTarget.parents('.sw_required').removeClass('sw_error');
									inputTarget.parents('form.js_validation_required:first').validate({ showErrors: showErrors}).form();
								}
		
								var isSameId = false;
								if (isEmpty(communityItems) || (!isEmpty(userField) && userField.attr('multiUsers') !== 'true')){
									communityItems.remove();
								}else{
									for(var i=0; i<communityItems.length; i++){
										var oldComId = $(communityItems[i]).attr('comId');
										if(oldComId !=null && oldComId === comId){
											isSameId = true;
											break;
										}
									}
								}
								if(!isSameId){
									comNameLong = comName;
									$("<span class='js_community_item user_select' comId='" + comId + "' comName='" + comName + "'>" + comNameLong
											+ "<a class='js_remove_community' href=''>&nbsp;x</a></span>").insertBefore(inputTarget);
									var searchFilter = target.parents('.js_search_filter_page');
									if(!isEmpty(searchFilter)){
										userField.find('input[name="txtFilterStringOperand"]').attr('value', comId);
									}
								}
								inputTarget.focus();
								userField.find('.js_community_names').change();
							};
							
							$('a.js_pop_select_user').die('click');
							$('a.js_pop_select_users').die('click');
							$('.js_pop_select_community').die('click');
							if(isEmpty(isMultiUsers) || isMultiUsers!== 'true'){
								$('.js_pop_select_community').live('click', function(e){
									try{
										var input = $(targetElement(e));
										var comId = input.attr('comId');
										var comName = input.text();
										selectionProc(comId, comName);
										if(!isEmpty(input.parents('td[fieldId="txtFromCommunity"]'))){
											var workTransfer = input.parents('.js_work_transfer_page');
											workTransfer.attr('fromCommunityId', comId);
											workTransfer.find('tr').hide();
											workTransfer.find('input.js_click_transfer_all').click();
											input.parents('tr:first').show();
											if(isUserId(comId)){
												workTransfer.attr('comType', 'user');
												workTransfer.find('tr.js_transfer_user').show();
											}else if(isDepartmentId(comId)){
												workTransfer.attr('comType', 'department');
												workTransfer.find('tr.js_transfer_depart').show();				
											}else{
												workTransfer.attr('comType', 'group');
												workTransfer.find('tr.js_transfer_group').show();
												
											}
										}
										smartPop.close();
										target.html('');
									}catch(error){
										smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectCommunity js_pop_select_community]', null, error);
									}				
									return false;
								});
								$('a.js_pop_select_user').live('click', function(e){
									try{
										var input = $(targetElement(e));
										var comId = input.attr('userId');
										var comName = input.text();
										selectionProc(comId, comName);
										if(!isEmpty(input.parents('td[fieldId="txtFromCommunity"]'))){
											var workTransfer = input.parents('.js_work_transfer_page');
											workTransfer.attr('fromCommunityId', comId);
											workTransfer.find('tr').hide();
											workTransfer.find('input.js_click_transfer_all').click();
											input.parents('tr:first').show();
											if(isUserId(comId)){
												workTransfer.attr('comType', 'user');
												workTransfer.find('tr.js_transfer_user').show();
											}else if(isDepartmentId(comId)){
												workTransfer.attr('comType', 'department');
												workTransfer.find('tr.js_transfer_depart').show();				
											}else{
												workTransfer.attr('comType', 'group');
												workTransfer.find('tr.js_transfer_group').show();
												
											}
										}
										smartPop.close();
										target.html('');
									}catch(error){
										smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectCommunity js_pop_select_user]', null, error);
									}				
									return false;
								});
								$('a.js_pop_select_user').focus();
								$('a.js_pop_select_user').keypress(function (e) {
									try{
										var e = window.event || e;
										var keyCode = e.which || e.keyCode;
								        if (keyCode == $.ui.keyCode.ENTER) {
								            $('a.js_pop_select_user').click();
								            return false;
								        } else {
								            return true;
								        }
									}catch(error){
										smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectCommunity js_pop_select_user keypress]', null, error);
									}				
							    });
							}else{
								$('a.js_pop_select_users').live('click', function(e){
									try{
										var input = $(targetElement(e));
										var selections = input.parents('.pop_list_area').find('input.js_checkbox:checked');
										if(isEmpty(selections)) return false;
										
										for(var i=0; i<selections.length; i++){
											var selection = $(selections[i]);
											var comId = selection.attr('value');
											var comName = selection.attr("comName");
											selectionProc(comId, comName);
										}
										smartPop.close();
										target.html('');
									}catch(error){
										smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectCommunity js_pop_select_users]', null, error);
									}				
									return false;
								});
								$('a.js_pop_select_users').focus();
								$('a.js_pop_select_users').keypress(function (e) {
									try{
										var e = window.event || e;
										var keyCode = e.which || e.keyCode;
								        if (keyCode == $.ui.keyCode.ENTER) {
								            $('a.js_pop_select_users').click();
								            return false;
								        } else {
								            return true;
								        }
									}catch(error){
										smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectCommunity js_pop_select_users keypress]', null, error);
									}				
							    });
							}
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectCommunity onShow]', null, error);
						}				
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectCommunity]', null, error);
		}				
	},

	selectDepartment : function(communityItems, target, width, isMultiUsers, bottomUp){
		try{
			target.html('');
			var conWidth = (!isEmpty(width) && width>360) ? width : 360;
			var url = "pop_select_depart.sw"; 
			var containerCss = (bottomUp) ? {width: conWidth, bottom: 0} : {width: conWidth}; 
			$.get(url, function(data){
				$(data).modal({
					appendTo: target,
					opacity: 0,
					autoPosition: false,
					fixed: false,
					overlayCss: {backgroundColor:"#000"},
					containerCss: containerCss,
					overlayClose: true,
					onShow: function(dialog){
						try{
							var selectionProc = function(comId, comName){
								var departField = target.parents('.js_type_departmentField:first');
								var inputTarget = departField.find('input.js_auto_complete:first');
		
								if(isEmpty(isMultiUsers) || isMultiUsers!== 'true')
									communityItems.remove();
								$("<span class='js_community_item user_select' comId='" + comId + "' comName='" + comName + "' title='" + comName + "'>" + getDepartNameFromFullpath(comName)
										+ "<a class='js_remove_community' href=''>&nbsp;x</a></span>").insertBefore(inputTarget);
								var searchFilter = target.parents('.js_search_filter_page');
								if(!isEmpty(searchFilter)){
									departField.find('input[name="txtFilterStringOperand"]').attr('value', comId);
								}
								inputTarget.focus();
								departField.find('.js_community_names').change();
							};
							
							$('a.js_pop_select_depart').die('click');
							$('a.js_pop_select_depart').live('click', function(e){
								try{
									var input = $(targetElement(e));
									if(!input.hasClass('js_pop_select_depart')) input = input.parents().find('.js_pop_select_depart');
									var comId = input.attr('departId');
									var comName = input.attr('departName');
									selectionProc(comId, comName);
									smartPop.close();
									target.html('');
								}catch(error){
									smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectDepartment js_pop_select_depart]', null, error);
								}				
								return false;
							});
							$('a.js_pop_select_depart').focus();
							$('a.js_pop_select_depart').keypress(function (e) {
								try{
									var e = window.event || e;
									var keyCode = e.which || e.keyCode;
							        if (keyCode == $.ui.keyCode.ENTER) {
							            $('a.js_pop_select_depart').click();
							            return false;
							        } else {
							            return true;
							        }
								}catch(error){
									smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectDepartment js_pop_select_depart]', null, error);
								}				
						    });
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectDepartment onShow]', null, error);
						}				
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectDepartment]', null, error);
		}				
	},

	selectWork : function(target, width){
		try{
			target.html('');
			var isAllTargetWork = target.hasClass('js_all_target_work_popup');
			var conWidth = (!isEmpty(width) && width>360) ? width : 360;
			$.get("pop_select_work.sw?isAllTargetWork=" + isAllTargetWork, function(data){
				$(data).modal({
					appendTo: target,
					opacity: 0,
					autoPosition: false,
					fixed: false,
					overlayCss: {backgroundColor:"#000"},
					containerCss:{
						width:conWidth
					},
					overlayClose: true,
					onShow: function(dialog){
						try{
							if(isAllTargetWork){
								target.find('ul').prepend('<li><span class="dep"><a href="" class="js_pop_select_work" workId="allSmartWorks" workType="-1" fullpathName="' + smartMessage.get("companyAllWorks") + 
																'" iconClass="icon_depart"><span class="icon_depart"></span>' + smartMessage.get("companyAllWorks") + '</a></span></li>');
							}
							$('.js_pop_select_work').die('click');
							$('.js_pop_select_work').live( 'click', function(e){
								try{
									var input = $(targetElement(e)).parents('li:first').find('a');
									if(!isAllTargetWork){
										$('#form_works').html('').hide();
										$('#upload_work_list').hide().parents(".js_start_work_page").hide();
										$('#upload_form_box').addClass('smart_form');
										var href = input.attr('href');
										smartPop.progressCenter();
										$.get(href,  function(data){
											$('#form_works').html(data);
											var formContent = $('#form_works').find('div.js_form_content');
											var workId = input.attr('workId');
											if(href.indexOf("new_asset_reservation.sw") == -1){
												new SmartWorks.GridLayout({
													target : formContent,
													mode : "edit",
													workId : workId,
													onSuccess : function(){
														$('#form_works').show().parent().show();
														smartPop.close();
														target.html('');
														smartPop.closeProgress();
													},
													onError : function(){
														smartPop.close();
														target.html('');											
														smartPop.closeProgress();
													}
												});
											}else{
												$('#form_works').show().parent().show();
												smartPop.close();
												target.html('');
												smartPop.closeProgress();
											}
										});
									}else{
										var reportList = target.parents(".js_report_list_page");
										var targetWorkId = input.attr('workId');
										var targetWorkName = input.attr('fullpathName');
										var targetWorkIcon = input.attr('iconClass');
										var targetWorkType = input.attr('workType');
										reportList.attr('targetWorkId', targetWorkId); 
										reportList.attr('targetWorkName', targetWorkName); 
										reportList.attr('targetWorkIcon', targetWorkIcon); 
										reportList.attr('targetWorkType', targetWorkType); 
										reportList.attr('producedBy', 'smartworks');
										reportList.find('form[name="frmSearchInstance"]').hide();
										reportList.find('.js_target_work_info > span:first').attr('class', input.attr('iconClass'));
										reportList.find('.js_target_work_info > span:eq(1)').html(input.attr('fullpathName'));
										reportList.find('.js_work_report_close').click();
										smartPop.close();
										target.html('');
										smartPop.progressCenter();
										$.get('get_user_report_count.sw?targetWorkId=' + targetWorkId,  function(data){
											reportList.find('.js_view_report_list:eq(0)').removeClass('disabled');
											reportList.find('.js_view_report_list:eq(1)').addClass('disabled');
											reportList.find('.js_user_report_count').html('[' + data + ']');
										});
										$.get('report_instance_list.sw?targetWorkId=' + targetWorkId + '&targetWorkType=' + targetWorkType + '&producedBy=smartworks',  function(data){
											reportList.find('#report_instance_list_page').html(data);
											smartPop.closeProgress();
										});
									}
								}catch(error){
									smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectWork js_pop_select_work]', null, error);
								}				
								return false;
							});
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectWork onShow]', null, error);
						}				
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectWork]', null, error);
		}				
	},

	selectWorkItem : function(formId, target){
		try{
			if(isEmpty(formId) || isEmpty(target)) return;
			$.get("pop_select_work_item.sw", {formId: formId}, function(data){
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					containerCss:{
						height:500,
						width:960
					},
					autoResize : true,
					overlayClose: false,
					onShow: function(dialog){
						try{
							$('.js_pop_select_work_item').die('click');
							$('.js_pop_select_work_item').live( 'click', function(e){
								try{
									var input = $(targetElement(e));
									var recordId = input.parents('tr:first').attr('instId');
									var fieldId = target.attr('refFormField');
									//Start. jy.Bae 기존 소스는 keyField가 기존 필드들을 건너뛰고 있는 것만 숫자를 세어서, 빌더설정한 것과 값이 틀려 fieldId로 비교하게 함.
									//pop_iwork_instance_list.jsp의  td의 필드아이디와 빌더설정한 필드아이디가 같은걸 반환함.
									var value = input.parents('tr:first').find('td[fieldId="' + fieldId +'"]').text();
									//End.  2012.08.15
									target.attr('refRecordId', recordId);
									var inputTarget = target.find('input');
									inputTarget.attr('value', value);
									if(inputTarget.hasClass('sw_required') && inputTarget.hasClass('sw_error')){
										inputTarget.removeClass('sw_error');
										inputTarget.parents('form.js_validation_required:first').validate({ showErrors: showErrors}).form();
									}
									target.change();
									smartPop.close();
								}catch(error){
									smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectWorkItem js_pop_select_work_item]', null, error);
								}				
								return false;
							});
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectWorkItem onShow]', null, error);
						}				
					}
				});
			}).error( function(){
				smartPop.showInfo(smartPop.WARN, smartMessage.get("notRefFormWorkingError"));			
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectWorkItem]', null, error);
		}				
	},
	
	retireMember : function(userId){
		try{
			if(isEmpty(userId)) return;
			$.get("pop_retire_member.sw", {userId: userId}, function(data){
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					containerCss:{
						height:600,
						width:740
					},
					autoResize : true,
					overlayClose: false,
					onShow: function(dialog){
						$('.js_close_retire_member').die('click');
						$('.js_close_retire_member').live( 'click', function(e){
							smartPop.close();
							return false;
						});
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup retireMember]', null, error);
		}				
	},
	
	abolishDepartment : function(departId){
		try{
			if(isEmpty(departId)) return;
			$.get("pop_abolish_department.sw", {departId: departId}, function(data){
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					containerCss:{
						height:600,
						width:740
					},
					autoResize : true,
					overlayClose: false,
					onShow: function(dialog){
						$('.js_close_abolish_department').die('click');
						$('.js_close_abolish_department').live( 'click', function(e){
							smartPop.close();
							return false;
						});
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup abolishDepartment]', null, error);
		}				
	},
	
	selectApprovalLine : function(){
		try{
			$.get("pop_select_approval_line.sw", {}, function(data){
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					containerCss:{
						width:600
					},
					autoResize : true,
					overlayClose: false,
					onShow: function(dialog){
						$('.js_pop_select_approval_line').die('click');
						$('.js_pop_select_approval_line').live( 'click', function(e){
							try{
								var input = $(targetElement(e)).parents('.js_pop_select_approval_line');
								var appendTaskApproval = $('.js_append_task_approval_page');
								var url = 'approval_line_box.sw?approvalLineId=' + input.attr('approvalLineId');
								$.get(url,  function(data){
									appendTaskApproval.find('.js_approval_line_box').html(data);
									smartPop.close();
								});
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectApprovalLine js_pop_select_approval_line]', null, error);
							}				
							return false;
						});
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectApprovalLine]', null, error);
		}				
	},
	
	selectWebService : function(){
		try{
			$.get("pop_select_web_service.sw", {}, function(data){
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					containerCss:{
						width:600
					},
					autoResize : true,
					overlayClose: false,
					onShow: function(dialog){
						$('.js_pop_select_web_service').die('click');
						$('.js_pop_select_web_service').live( 'click', function(e){
							try{
								var input = $(targetElement(e)).parents('.js_pop_select_web_service');
								var workReportEdit = $('.js_work_report_edit_page');
								var externalService = workReportEdit.find('.js_external_service');
								externalService.find('input[name="txtExternalServiceName"]').attr('value', input.attr('webServiceName'));
								externalService.find('input[name="txtExternalServiceId"]').attr('value', input.attr('webServiceId'));
								var reportSearchFilter = workReportEdit.find('.js_report_search_filter');
								reportSearchFilter.show().find('.js_edit_search_filter').attr('externalServiceId', input.attr('webServiceId'));
								workReportEdit.find('.js_search_filter_close').click();
								smartPop.close();
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectWebService js_pop_select_web_service]', null, error);
							}				
							return false;
						});
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup selectWebService]', null, error);
		}				
	},
	
	createGroup : function(){
		try{
			$.get("pop_new_group.sw", function(data){
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					containerCss:{
						height:500,
						width:600
					},
					overlayClose: false,
					onShow: function(dialog){
						try{
							loadGroupProfileField();
							loadNewGroupFields();
							$('.js_close_new_group').die('click');
							$('.js_close_new_group').live( 'click', function(e){
								smartPop.close();
								return false;
							});
							$('.js_close_new_group').focus();
							$('.js_close_new_group').keypress(function (e) {
								var e = window.event || e;
								var keyCode = e.which || e.keyCode;
						        if (keyCode == $.ui.keyCode.ENTER) {
						            $('.js_close_new_group').click();
						            return false;
						        } else {
						            return true;
						        }
						    });
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup createGroup onShow]', null, error);
						}				
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup createGroup]', null, error);
		}				
	},

	inviteGroupMembers : function(groupId){
		try{
			$.get("pop_invite_group_members.sw?groupId=" + groupId, function(data){
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					containerCss:{
						height:500,
						width:600
					},
					overlayClose: false,
					onShow: function(dialog){
						$('.js_close_invite_member').die('click');
						$('.js_close_invite_member').live( 'click', function(e){
							smartPop.close();
							return false;
						});
						$('.js_close_invite_member').focus();
						$('.js_close_invite_member').keypress(function (e) {
							var e = window.event || e;
							var keyCode = e.which || e.keyCode;
					        if (keyCode == $.ui.keyCode.ENTER) {
					            $('.js_close_invite_member').click();
					            return false;
					        } else {
					            return true;
					        }
					    });
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup inviteGroupMembers]', null, error);
		}				
	},

	createWorkCategory : function(categoryId, categoryName, categoryDesc){
		try{
			$.get("pop_new_category.sw?categoryId="+ categoryId + "&categoryName=" + categoryName + "&categoryDesc=" + categoryDesc, function(data){
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					containerCss:{
						height:200,
						width:460
					},
					overlayClose: false,
					onShow: function(dialog){
						$('.js_close_new_category').die('click');
						$('.js_close_new_category').live( 'click', function(e){
							smartPop.close();
							return false;
						});
						$('input[name="txtCategoryName"]').focus();
						$('input[name="txtCategoryName"]').keypress(function (e) {
							var e = window.event || e;
							var keyCode = e.which || e.keyCode;
					        if (keyCode == $.ui.keyCode.ENTER) {
					            return false;
					        }
					    });
						/*$('.js_close_new_category').focus();
						$('.js_close_new_category').keypress(function (e) {
							var e = window.event || e;
							var keyCode = e.which || e.keyCode;
					        if (keyCode == $.ui.keyCode.ENTER) {
					            $('.js_close_new_category').click();
					            return false;
					        } else {
					            return true;
					        }
					    });*/
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup createWorkCategory]', null, error);
		}				
	},

	createWorkDefinition : function(parentId, parentName, workId, workName, workTypeName, workDesc, categoryId, groupId, groupOption){
		try{
			var url = "pop_new_work_definition.sw?parentId="+parentId+"&parentName="+parentName + "&workId=" + workId 
							+ "&workName=" + workName + "&workTypeName=" + workTypeName + "&workDesc=" + workDesc + "&categoryId=" + categoryId + "&groupId=" + groupId + "&groupOption=" + groupOption;
			$.get( url, { contentType : "charset=utf-8"}, function(data){
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					containerCss:{
						height:300,
						width:560
					},
					overlayClose: false,
					onShow: function(dialog){
						$('.js_close_new_work').die('click');
						$('.js_close_new_work').live( 'click', function(e){
							smartPop.close();
							return false;
						});
						$('.js_close_new_work').focus();
						$('.js_close_new_work').keypress(function (e) {
							var e = window.event || e;
							var keyCode = e.which || e.keyCode;
					        if (keyCode == $.ui.keyCode.ENTER) {
					            $('.js_close_new_work').click();
					            return false;
					        } else {
					            return true;
					        }
					    });
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup createWorkDefinition]', null, error);
		}				
	},

	moveWorkDefinition : function(type, workId, workFullName, categoryId, groupId, workName, workDesc){
		try{
			var url = "pop_move_work_definition.sw?workId=" + workId + "&workName=" + workName + "&type=" + type + "&workFullName=" + workFullName + "&categoryId=" + categoryId + "&groupId=" + groupId + "&workDesc=" + workDesc;
			$.get( url, function(data){
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					containerCss:{
						height:300,
						width:560
					},
					overlayClose: false,
					onShow: function(dialog){
						$('.js_close_move_work').die('click');
						$('.js_close_move_work').live( 'click', function(e){
							smartPop.close();
							return false;
						});
						$('.js_close_move_work').focus();
						$('.js_close_move_work').keypress(function (e) {
							var e = window.event || e;
							var keyCode = e.which || e.keyCode;
					        if (keyCode == $.ui.keyCode.ENTER) {
					            $('.js_close_move_work').click();
					            return false;
					        } else {
					            return true;
					        }
					    });
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup moveWorkDefinition]', null, error);
		}				
	},

	downloadFromAppstore : function(){
		try{
			$.get("pop_download_from_appstore.sw", {}, function(data){
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					containerCss:{
						height:500,
						width:800
					},
					overlayClose: false,
					onShow: function(dialog){
						$('.js_pop_select_work_item').die('click');
						$('.js_pop_select_work_item').live( 'click', function(e){
							try{
								var input = $(targetElement(e));
								var recordId = input.parents('tr:first').attr('instId');
								var fieldId = target.attr('refFormField');
								/*var keyField = input.parents('tbody').find('tr.js_instance_list_header').find('th[fieldId="'+fieldId+'"]');
								var keyPos = keyField.prevAll('th').length;*/
								var value = input.parents('tr:first').find('td[fieldId="' + fieldId +'"]').text();
								target.attr('refRecordId', recordId);
								var inputTarget = target.find('input');
								inputTarget.attr('value', value);
								if(inputTarget.hasClass('sw_required') && inputTarget.hasClass('sw_error')){
									inputTarget.removeClass('sw_error');
									inputTarget.parents('form.js_validation_required:first').validate({ showErrors: showErrors}).form();
								}
								smartPop.close();
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup downloadFromAppstore js_pop_select_work_item]', null, error);
							}				
							return false;
						});
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup downloadFromAppstore]', null, error);
		}				
	},	

	createMailFolder : function(folderId, folderName, folderDesc, parentId, parentName, folderType){
		try{
			parentId = (isEmpty(parentId)) ? null : parentId;
			parentName = (isEmpty(parentName)) ? "" : parentName;
			folderType = (isEmpty(folderType)) ? "" : folderType;
			$.get("pop_new_mail_folder.sw?parentId=" + parentId + "&parentName="+ parentName + "&folderType=" + folderType + "&folderId="+ folderId + "&folderName=" + folderName + "&folderDesc=" + folderDesc, function(data){
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					containerCss:{
						height:200,
						width:460
					},
					overlayClose: false,
					onShow: function(dialog){
						$('.js_close_new_mail_folder').die('click');
						$('.js_close_new_mail_folder').live( 'click', function(e){
							smartPop.close();
							return false;
						});
						$('.js_close_new_mail_folder').focus();
						$('.js_close_new_mail_folder').keypress(function (e) {
							var e = window.event || e;
							var keyCode = e.which || e.keyCode;
					        if (keyCode == $.ui.keyCode.ENTER) {
					            $('.js_close_new_mail_folder').click();
					            return false;
					        } else {
					            return true;
					        }
					    });
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup createMailFolder]', null, error);
		}				
	},

	createAsset : function(folderId, folderName, assetType, autoApproval, autoReturn, assetId, assetName){
		try{
			$.get("pop_new_asset.sw?folderId=" + folderId + "&folderName=" + folderName + "&assetType=" + assetType + "&autoApproval=" + autoApproval + "&autoReturn=" + autoReturn + "&assetId=" + assetId + "&assetName=" + assetName, function(data){
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					containerCss:{
						height:600,
						width: 680
					},
					overlayClose: false,
					onShow: function(dialog){
						$('.js_close_new_asset').die('click');
						$('.js_close_new_asset').live( 'click', function(e){
							smartPop.close();
							return false;
						});
						$('input[name="txtAssetName"]').focus();
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup createAsset]', null, error);
		}				
	},

	createAssetFolder : function(folderId, folderName, assetType, autoApproval, autoReturn){
		try{
			$.get("pop_new_asset_folder.sw?folderId=" + folderId + "&folderName=" + folderName + "&assetType=" + assetType + "&autoApproval=" + autoApproval + "&autoReturn=" + autoReturn, function(data){
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					containerCss:{
						height:200,
						width:460
					},
					overlayClose: false,
					onShow: function(dialog){
						$('.js_close_new_folder').die('click');
						$('.js_close_new_folder').live( 'click', function(e){
							smartPop.close();
							return false;
						});
						$('input[name="txtFolderName"]').focus();
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup createAssetFolder]', null, error);
		}				
	},

	showAssetReservation : function(instanceId, action){
		try{
			$.get("pop_asset_reservation.sw?instanceId=" + instanceId + "&action=" + action, function(data){
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					containerCss:{
						height:600,
						width: 680
					},
					overlayClose: false,
					onShow: function(dialog){
						$('.js_close_asset_reservation').die('click');
						$('.js_close_asset_reservation').live( 'click', function(e){
							smartPop.close();
							return false;
						});
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup showAssetReservation]', null, error);
		}				
	},

	createFileFolder : function(workSpaceId, parentId, folderId, folderName){
		try{
			$.get("pop_new_file_folder.sw?workSpaceId=" + workSpaceId + "&parentId="+ parentId + "&folderId=" + folderId + "&folderName=" + folderName, function(data){
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					containerCss:{
						height:200,
						width:460
					},
					overlayClose: false,
					onShow: function(dialog){
						$('.js_close_new_folder').die('click');
						$('.js_close_new_folder').live( 'click', function(e){
							smartPop.close();
							return false;
						});
						$('input[name="txtFolderName"]').focus();
						$('input[name="txtFolderName"]').keypress(function (e) {
							var e = window.event || e;
							var keyCode = e.which || e.keyCode;
					        if (keyCode == $.ui.keyCode.ENTER) {
					            return false;
					        }
					    });
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup createFileFolder]', null, error);
		}				
	},

	createImageFolder : function(workSpaceId, parentId, folderId, folderName){
		try{
			$.get("pop_new_image_folder.sw?workSpaceId=" + workSpaceId + "&parentId="+ parentId + "&folderId=" + folderId + "&folderName=" + folderName, function(data){
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					containerCss:{
						height:200,
						width:460
					},
					overlayClose: false,
					onShow: function(dialog){
						$('.js_close_new_folder').die('click');
						$('.js_close_new_folder').live( 'click', function(e){
							smartPop.close();
							return false;
						});
						$('input[name="txtFolderName"]').focus();
						$('input[name="txtFolderName"]').keypress(function (e) {
							var e = window.event || e;
							var keyCode = e.which || e.keyCode;
					        if (keyCode == $.ui.keyCode.ENTER) {
					            return false;
					        }
					    });
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup createImageFolder]', null, error);
		}				
	},

	createMailAutoMove : function(){
		try{
			$.get("pop_new_mail_automove.sw", function(data){
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					containerCss:{
						height:200,
						width:460
					},
					overlayClose: false,
					onShow: function(dialog){
						$('.js_close_new_mail_automove').die('click');
						$('.js_close_new_mail_automove').live( 'click', function(e){
							smartPop.close();
							return false;
						});
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup createMailAutomove]', null, error);
		}				
	},

	moveFiles : function(){
		try{
			$.get("pop_move_files.sw", function(data){
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					containerCss:{
						height:200,
						width:460
					},
					overlayClose: false,
					onShow: function(dialog){
						$('.js_close_move_files').die('click');
						$('.js_close_move_files').live( 'click', function(e){
							smartPop.close();
							return false;
						});
						
						$('.js_select_target_workspace').die('change');
						$('.js_select_target_workspace').live('change', function(e){
							try{
								var input = $(targetElement(e));
								var workSpaceId = input.find(':selected').attr('value');
								$.ajax({
									url : "categories_by_workspace.sw",
									data : {
										workSpaceId : workSpaceId
									},
									success : function(data, status, jqXHR) {
										try{
											input.parents('.js_pop_move_files_page').find('.js_select_target_folder').html(data);
										}catch(error){
											smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup moveFiles categorid_by_workspace]', null, error);
										}				
									},
									error : function(xhr, ajaxOptions, thrownError){
										smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup moveFiles categories_by_workspace]', null, thrownError);
										smartPop.closeProgress();
									}
								});
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup moveFiles js_select_target_workspace]', null, error);
							}				
							return false;
						});
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup moveFiles]', null, error);
		}				
	},

	printContent : function(header, contents){
		try{
			$.get("pop_print_content.sw", function(data){
				var width = 860;
				var left = (($(window).width() - width) / 2) + $(window).scrollLeft();
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					autoPosition: false,
					containerCss:{
						top: 30,
						left: left,
						width: width
					},
					overlayClose: false,
					onShow: function(dialog){
						$('iframe[name="printFrame"]').contents().find('head').html(header);
						$('iframe[name="printFrame"]').contents().find('body').html(contents);
						$('.js_close_print_content').die('click');
						$('.js_close_print_content').live( 'click', function(e){
							smartPop.close();
							return false;
						});
						$('.js_do_print_content').die('click');
						$('.js_do_print_content').live( 'click', function(e){
							frames["printFrame"].focus();
							frames["printFrame"].print();
							return false;
						});
						doIframeAutoHeight();
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup printContent]', null, error);
		}				
	},

	showPicture : function(instanceId){
		try{
			$.get("pop_show_picture.sw?instId=" + instanceId, function(data){
				var width = 620;
				var left = (($(window).width() - width) / 2) + $(window).scrollLeft();
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					autoPosition: false,
					containerCss:{
						top: 30,
						left: left,
						width: width
					},
					overlayClose: true,
					onShow: function(dialog){
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup showPicture]', null, error);
		}				
	},

	showInstance : function(instanceId, taskInstId, workId, formId, forwardId){
		try{
			$.get("pop_show_instance.sw?instId=" + instanceId + "&taskInstId=" + taskInstId + "&workId=" + workId + "&formId=" + formId + "&forwardId=" + forwardId, function(data){
				var width = 800;
				var left = (($(window).width() - width) / 2) + $(window).scrollLeft();
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					autoPosition: false,
					containerCss:{
						top: 30,
						left: left,
						width: width
					},
					overlayClose: true,
					onShow: function(dialog){
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup showInstance]', null, error);
		}				
	},

	reassignPerformer : function(workId, instanceId, taskInstId){
		try{
			$.get("pop_reassign_performer.sw?workId=" + workId + "&instanceId="+ instanceId + "&taskInstId=" + taskInstId, function(data){
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					containerCss:{
						height:200,
						width:460
					},
					overlayClose: false,
					onShow: function(dialog){
						$('.js_close_reassign_performer').die('click');
						$('.js_close_reassign_performer').live( 'click', function(e){
							smartPop.close();
							return false;
						});
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup reassignPerformer]', null, error);
		}				
	},

	changeMailPassword : function(mailServerId, emailId, userName, oldPassword){
		try{
			$.get("pop_change_mail_password.sw?mailServerId=" + mailServerId + "&emailId="+ emailId + "&userName=" + userName + "&oldPassword="+ oldPassword, function(data){
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					containerCss:{
						height:200,
						width:460
					},
					overlayClose: false,
					onShow: function(dialog){
						$('.js_close_change_mail_password').die('click');
						$('.js_close_change_mail_password').live( 'click', function(e){
							smartPop.close();
							return false;
						});
						$('.js_close_change_mail_password').focus();
						$('.js_close_change_mail_password').keypress(function (e) {
							var e = window.event || e;
							var keyCode = e.which || e.keyCode;
					        if (keyCode == $.ui.keyCode.ENTER) {
					            $('.js_close_change_mail_password').click();
					            return false;
					        } else {
					            return true;
					        }
					    });
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup changeMailPassword]', null, error);
		}				
	},
	
	eventAlarmIsRunning : false,
	
	eventAlarm : function(notice){
		try{
			if(isEmpty(notice) || isEmpty(notice.event)) return;
			if(smartPop.eventAlarmIsRunning){
				setTimeout(function(){
					smartPop.eventAlarm(notice);
				},500, [notice]);
				return;
			}
			var event = notice.event;
			var workSpaceStr = (isEmpty(event.workSpaceId) || event.workSpaceId===currentUser.userId) ? "" : '<span class="arr">▶</span><span class="space_name">' + event.workSpaceName+ '</span>';
			var noticeData =  '<li class="sub_instance_list">' +
								'<div class="det_title">' +
									'<div class="noti_pic"><img src="' + event.owner.midPicture + '" class="profile_size_m"></div>' +
									'<div class="noti_in_m"><span class="t_name">' + event.owner.longName +  '</span>' + workSpaceStr + '</div>' +
									'<span class="t_date vb pl10 fr">' + notice.issuedDate + '</span>' +
									'<span>' + 
										'<a href="' + event.controller + '?cid=' + event.contextId + '&wid=' + event.workSpaceId + '&workId=' + event.workId + '">' +
											'<div>' + 
												'<span class="icon_event_works"></span>' +
												'<div>' + event.subject + '</div>' +
											'</div>' +
											'<div>' + event.startTitle + ' : ' + event.start +
												'<a href="" noticeId="' + notice.id + '" noticeType="' + notice.type + '"><span class="btn_x js_remove_notice" ></span></a>' +								
											'</div>' +
										'</a>' +
									'</span>' +
								'</div>' +
							'</li>';
			
			var popEventAlarm = $('.js_pop_event_alarm_page');
			if(isEmpty(popEventAlarm)){
				smartPop.eventAlarmIsRunning = true;
				$.get("pop_event_alarm.sw", function(data){
					$(data).modal({
						opacity: 10,
						overlayCss: {backgroundColor:"#000"},
						containerCss:{
							height:200,
							width:460
						},
						overlayClose: false,
						onShow: function(dialog){

							popEventAlarm = $('.js_pop_event_alarm_page');
							popEventAlarm.find('ul').append(noticeData);
							smartPop.eventAlarmIsRunning = false;
							$('.js_close_event_alarm').die('click');
							$('.js_close_event_alarm').live( 'click', function(e){
								smartPop.close();
								return false;
							});
							$('.js_close_event_alarm').focus();
							$('.js_close_event_alarm').keypress(function (e) {
								var e = window.event || e;
								var keyCode = e.which || e.keyCode;
						        if (keyCode == $.ui.keyCode.ENTER) {
						            $('.js_close_event_alarm').click();
						            return false;
						        } else {
						            return true;
						        }
						    });
						}
					});
				});
			}else{
				popEventAlarm.find('ul').append(noticeData);
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup eventAlarm]', null, error);
		}				
	},
	
	systemNoticeIsRunning : false,
	systemNotice : function(message, messageType){
		try{
			if(isEmpty(message)) return;
			if(smartPop.systemNoticeIsRunning){
				setTimeout(function(){
					smartPop.systemNotice(message);
				},500, [message]);
				return;
			}
			var fontColor = (messageType == msgType.SYSTEM_RESTART) ? 'red' : 'blue';
			var messageData =  '<li>' +
								'<div class="det_title">' +
									'<span>' + 
										'<div style="color:' + fontColor + ';font-weight:bold">' + 
											message + 
										'</div>' +
									'</span>' +
									'<span class="t_date vb pl10 fr">' + (new Date()).format('yyyy.mm.dd hh:MM') + '</span>' +
								'</div>' +
							'</li>';
			
			var popSystemNotice = $('.js_pop_system_notice_page');
			if(isEmpty(popSystemNotice)){
				smartPop.systemNoticeIsRunning = true;
				$.get("pop_system_notice.sw?messageType=" + messageType, function(data){
					$(data).modal({
						opacity: 10,
						overlayCss: {backgroundColor:"#000"},
						containerCss:{
							height:200,
							width:460
						},
						overlayClose: false,
						onShow: function(dialog){

							popSystemNotice = $('.js_pop_system_notice_page');
							popSystemNotice.find('ul').append(messageData);
							smartPop.systemNoticeIsRunning = false;
							if(messageType == msgType.SYSTEM_RESTART){
								var repeatBlinking = function(){
									setTimeout(function(){
										popSystemNotice.fadeTo('slow', 0.8).fadeTo('slow', 1.0);							
										repeatBlinking();
									}, 2000);			
								};
								repeatBlinking();
							}
							$('.js_close_system_notice').die('click');
							$('.js_close_system_notice').live( 'click', function(e){
								smartPop.close();
								return false;
							});
							$('.js_close_system_notice').focus();
							$('.js_close_system_notice').keypress(function (e) {
								var e = window.event || e;
								var keyCode = e.which || e.keyCode;
						        if (keyCode == $.ui.keyCode.ENTER) {
						            $('.js_close_system_notice').click();
						            return false;
						        } else {
						            return true;
						        }
						    });
						}
					});
				});
			}else{
				popSystemNotice.find('ul').append(messageData);
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup systemNotice]', null, error);
		}				
	},
	
	createReportPane : function(paneId, paneName, targetWorkId, targetWorkName, targetWorkIcon, reportId, reportName, reportType, config){
		try{
			var options = {
					chartType: null,
					isChartView: true,
					isStacked: false,
					showLegend: true,
					stringLabelRotation: 'auto',			
					paneColumnSpans: 1,
					panePosition: null
			};
			SmartWorks.extend(options, config);
	
			var url = "pop_new_report_pane.sw?paneId=" + paneId + "&paneName=" + paneName + "&targetWorkId=" + targetWorkId + "&targetWorkName=" + targetWorkName + "&targetWorkIcon=" + targetWorkIcon + "&reportId=" + reportId + "&reportName=" + reportName + "&reportType=" + reportType
							+ "&chartType=" + options.chartType + "&isChartView=" + options.isChartView + "&isStacked=" + options.isStacked + "&showLegend=" + options.showLegend
							+ "&stringLabelRotation=" + options.stringLabelRotation + "&paneColumnSpans=" + options.paneColumnSpans + "&panePosition=" + options.panePosition;
			$.get( url, { contentType : "charset=utf-8"}, function(data){
			$(data).modal({
				opacity: 10,
				overlayCss: {backgroundColor:"#000"},
				containerCss:{
					height:300,
					width:560
				},
				overlayClose: false,
				onShow: function(dialog){
					$('.js_close_new_report_pane').die('click');
					$('.js_close_new_report_pane').live( 'click', function(e){
						smartPop.close();
						return false;
					});
					$('.js_close_new_report_pane').focus();
					$('.js_close_new_report_pane').keypress(function (e) {
						var e = window.event || e;
						var keyCode = e.which || e.keyCode;
				        if (keyCode == $.ui.keyCode.ENTER) {
				            $('.js_close_new_report_pane').click();
				            return false;
				        } else {
				            return true;
				        }
				    });
				}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup createReportPane]', null, error);
		}				
	},
	
	adminWorkInstance : function(workId, instanceId, href){
		try{
			
			$.get(href + "?workId=" + workId + "&instanceId=" + instanceId, function(data){
				$(data).modal({
					opacity: 10,
					overlayCss: {backgroundColor:"#000"},
					containerCss:{
						height:500,
						width:600
					},
					overlayClose: false,
					onShow: function(dialog){
						$('.js_close_admin_work_instance').die('click');
						$('.js_close_admin_work_instance').live( 'click', function(e){
							smartPop.close();
							return false;
						});
						$('.js_close_admin_work_instance').focus();
						$('.js_close_admin_work_instance').keypress(function (e) {
							var e = window.event || e;
							var keyCode = e.which || e.keyCode;
					        if (keyCode == $.ui.keyCode.ENTER) {
					            $('.js_close_admin_work_instance').click();
					            return false;
					        } else {
					            return true;
					        }
					    });
						$('.js_check_reassign_prev_task').die('change');
						$('.js_check_reassign_prev_task').live( 'change', function(e){
							var input = $(targetElement(e));
							if(input.is(':checked'))
								input.parents('.js_admin_work_instance_page').find('.js_admin_last_task').hide();
							else
								input.parents('.js_admin_work_instance_page').find('.js_admin_last_task').show();
														
						});
						$('.js_check_reassign_last_task').die('change');
						$('.js_check_reassign_last_task').live( 'change', function(e){
							var input = $(targetElement(e));
							if(input.is(':checked')){
								input.parents('.js_admin_work_instance_page').find('.js_admin_prev_task').hide();
								input.nextAll('.js_last_task_assignee').show();
							}else{
								input.parents('.js_admin_work_instance_page').find('.js_admin_prev_task').show();
								input.nextAll('.js_last_task_assignee').hide();
							}							
						});
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup adminWorkInstance]', null, error);
		}				
	}
		
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-popup script]', null, error);
}
