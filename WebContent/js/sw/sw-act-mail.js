try{
$(function() {
		
	$('a.js_download_mail_attachment').live('click', function(e){
		try{
			var input = $(targetElement(e));
			var attachmentIframe = input.parents('.js_mail_space_page').find('#attachmentIframe');
			var partId = input.attr('partId');
			attachmentIframe.attr('src', 'webmail/dumpPart.service?partid=' + partId + '&dl=true');
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_download_mail_attachment]', null, error);
		}			
		return false;
		
	});
	
	$('.js_send_mail_btn').live('click', function(e) {
		try{
			submitForms("send");
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_send_mail_btn]', null, error);
		}			
		return false;
	});

	$('.js_save_mail_btn').live('click', function(e) {
		try{
			submitForms("save");
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_save_mail_btn]', null, error);
		}			
		return false;
	});

	$('.js_cancel_mail_btn').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var newMail = input.parents('.js_new_mail_page');
			var lastHref = newMail.attr('lastHref');
			if(isEmpty(lastHref) || lastHref.indexOf('iwork_list.sw')!=-1 || lastHref.indexOf('pwork_list.sw')!=-1 ){
				document.location.href = "home.sw";
			}else if(lastHref.indexOf('mail_list.sw')!=-1){
				refreshNavMail(getFolderIdFromLastHref(lastHref));
			}else{
				document.location.href = lastHref;
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_cancel_mail_btn]', null, error);
		}			
		return false;
	});

	$('.js_move_mail_btn').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var addJunk = input.hasClass('js_add_junk_btn');
			var removeJunk = input.hasClass('js_remove_junk_btn');
			var mailSpace = input.parents('.js_mail_space_page');
			var sourceId = mailSpace.attr('folderId');
			var msgId = mailSpace.attr('msgId');
			var targetId = input.attr('targetId');
			var paramsJson = {};
			var msgIds = new Array();
			msgIds.push(msgId);
			paramsJson['ids'] = msgIds;
			paramsJson['source'] = sourceId;
			paramsJson['target'] = targetId;
			console.log(JSON.stringify(paramsJson));
			smartPop.progressCenter();
			$.ajax({
				url : "move_mails.sw",
				contentType : 'application/json',
				type : 'POST',
				data : JSON.stringify(paramsJson),
				success : function(data, status, jqXHR) {
					try{
						if(addJunk){
							paramsJson = {};
							var senderIds = new Array();
							senderIds.push(mailSpace.attr('senderId'));
							paramsJson['senderIds'] = senderIds;
							console.log(JSON.stringify(paramsJson));
							$.ajax({
								url : "add_junk.sw",
								contentType : 'application/json',
								type : 'POST',
								data : JSON.stringify(paramsJson),
								success : function(data, status, jqXHR) {},
								error : function(xhr, ajaxOptions, e) {}
							});
						}else if(removeJunk){
							paramsJson = {};
							var senderIds = new Array();
							senderIds.push(mailSpace.attr('senderId'));
							paramsJson['senderIds'] = senderIds;
							console.log(JSON.stringify(paramsJson));
							$.ajax({
								url : "remove_junk.sw",
								contentType : 'application/json',
								type : 'POST',
								data : JSON.stringify(paramsJson),
								success : function(data, status, jqXHR) {},
								error : function(xhr, ajaxOptions, e){}
							});
						}
						smartPop.closeProgress();
						refreshNavMail(sourceId);
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_move_mail_btn move_mails]', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, e) {
					// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
					smartPop.showInfo(smartPop.ERROR, smartMessage.get("moveMailError"), null, e);
					smartPop.closeProgress();
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_move_mail_btn]', null, error);
		}			
		return false;
	});
	
	$('.js_select_move_folder').live('change', function(e) {
		try{
			var input = $(targetElement(e));
			var targetId = input.find('option:selected').attr('value');
			if(isEmpty(targetId)) return;
			var mailList = input.parents('.js_mail_list_page');
			var mailSpace = input.parents('.js_mail_space_page');
			var sourceId = "";
			var msgIds = new Array();
			if(!isEmpty(mailList)){
				sourceId = mailList.attr('folderId');
				var mails = mailList.find('input[name="chkSelectMail"]:checked');
				if(isEmpty(mails)){
					smartPop.showInfo(smartPop.WARN, smartMessage.get("moveItemsNotSelected"), function(){});
					input.find('option:first').attr('selected', 'selected').siblings('selected', '');
					return false;
				}
				for(var i=0; i<mails.length; i++)
					msgIds.push($(mails[i]).attr('value'));
			}else if(!isEmpty(mailSpace)){
				sourceId = mailSpace.attr('folderId');
				msgId = mailSpace.attr('msgId');
				msgIds.push(msgId);			
			}
			var paramsJson = {};
			paramsJson['ids'] = msgIds;
			paramsJson['source'] = sourceId;
			paramsJson['target'] = targetId;
			console.log(JSON.stringify(paramsJson));
			smartPop.confirm(smartMessage.get("moveConfirmation"), function(){
				smartPop.progressCenter();
				$.ajax({
					url : "move_mails.sw",
					contentType : 'application/json',
					type : 'POST',
					data : JSON.stringify(paramsJson),
					success : function(data, status, jqXHR) {
						try{
							smartPop.closeProgress();
							input.find('option:first').attr('selected', 'selected').siblings('selected', '');
							refreshNavMail(sourceId);
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_select_move_folder move_mails]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, e) {
						// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
						input.find('option:first').attr('selected', 'selected').siblings('selected', '');
						smartPop.showInfo(smartPop.ERROR, smartMessage.get("moveMailError"), null, e);
						smartPop.closeProgress();
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_select_move_folder]', null, error);
		}			
	});

	$('.js_move_mails_btn').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var addJunk = input.hasClass('js_add_junk_btn');
			var removeJunk = input.hasClass('js_remove_junk_btn');
			var mailList = input.parents('.js_mail_list_page');
			var sourceId = mailList.attr('folderId');
			var targetId = input.attr('targetId');
			var mails = mailList.find('input[name="chkSelectMail"]:checked');
			if(isEmpty(mails)){
				smartPop.showInfo(smartPop.WARN, smartMessage.get("moveItemsNotSelected"), function(){});
				return false;
			}
			var paramsJson = {};
			var msgIds = new Array();
			var senderIds = new Array();
			for(var i=0; i<mails.length; i++){
				msgIds.push($(mails[i]).attr('value'));
				senderIds.push($(mails[i]).attr('senderId'));
			}
			paramsJson['ids'] = msgIds;
			paramsJson['source'] = sourceId;
			paramsJson['target'] = targetId;
			console.log(JSON.stringify(paramsJson));
			smartPop.confirm(smartMessage.get("moveConfirmation"), function(){
				smartPop.progressCenter();
				$.ajax({
					url : "move_mails.sw",
					contentType : 'application/json',
					type : 'POST',
					data : JSON.stringify(paramsJson),
					success : function(data, status, jqXHR) {
						try{
							if(addJunk){
								paramsJson = {};
								paramsJson['senderIds'] = senderIds;
								console.log(JSON.stringify(paramsJson));
								$.ajax({
									url : "add_junk.sw",
									contentType : 'application/json',
									type : 'POST',
									data : JSON.stringify(paramsJson),
									success : function(data, status, jqXHR) {},
									error : function(xhr, ajaxOptions, e){}
								});
							}else if(removeJunk){
								paramsJson = {};
								paramsJson['senderIds'] = senderIds;
								console.log(JSON.stringify(paramsJson));
								$.ajax({
									url : "remove_junk.sw",
									contentType : 'application/json',
									type : 'POST',
									data : JSON.stringify(paramsJson),
									success : function(data, status, jqXHR) {},
									error : function(xhr, ajaxOptions, e){}
								});
							}
							smartPop.closeProgress();
							refreshNavMail(sourceId);
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_move_mails_btn move_mails]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, e) {
						// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
						smartPop.showInfo(smartPop.ERROR, smartMessage.get("moveMailError"), null, e);
						smartPop.closeProgress();
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_move_mails_btn]', null, error);
		}			
		return false;
	});

	$('.js_delete_mail_btn').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var mailSpace = input.parents('.js_mail_space_page');
			var folderId = mailSpace.attr('folderId');
			var msgId = mailSpace.attr('msgId');
			var suid = mailSpace.attr('suid');
			var paramsJson = {};
			var msgIds = new Array();
			var suids = new Array();
			msgIds.push(msgId);
			suids.push(suid);
			paramsJson['ids'] = msgIds;
			paramsJson['suids'] = suids;
			paramsJson['folderId'] = folderId;
			console.log(JSON.stringify(paramsJson));
			smartPop.confirm(smartMessage.get("removeConfirmation"), function(){
				smartPop.progressCenter();
				$.ajax({
					url : "delete_mails.sw",
					contentType : 'application/json',
					type : 'POST',
					data : JSON.stringify(paramsJson),
					success : function(data, status, jqXHR) {
						try{
							smartPop.closeProgress();
							refreshNavMail(folderId);
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_delete_mail_btn delete_mails]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, e) {
						// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
						smartPop.showInfo(smartPop.ERROR, smartMessage.get("removeMailError"), null, e);
						smartPop.closeProgress();
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_delete_mail_btn]', null, error);
		}			
		return false;
	});

	$('.js_delete_mails_btn').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var mailList = input.parents('.js_mail_list_page');
			var folderId = mailList.attr('folderId');
			var mails = mailList.find('input[name="chkSelectMail"]:checked');
			if(isEmpty(mails)){
				smartPop.showInfo(smartPop.WARN, smartMessage.get("removeItemsNotSelected"), function(){});
				return false;
			}
			var paramsJson = {};
			var msgIds = new Array();
			var suids = new Array();
			for(var i=0; i<mails.length; i++){
				msgIds.push($(mails[i]).attr('value'));
				suids.push($(mails[i]).attr('suid'));
			}
			paramsJson['ids'] = msgIds;
			paramsJson['suids'] = suids;
			paramsJson['folderId'] = folderId;
			console.log(JSON.stringify(paramsJson));
			smartPop.confirm(smartMessage.get("removeConfirmation"), function(){
				smartPop.progressCenter();
				$.ajax({
					url : "delete_mails.sw",
					contentType : 'application/json',
					type : 'POST',
					data : JSON.stringify(paramsJson),
					success : function(data, status, jqXHR) {
						try{
							smartPop.closeProgress();
							refreshNavMail(folderId);
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_delete_mails_btn delete_mails]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, e) {
						// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
						smartPop.showInfo(smartPop.ERROR, smartMessage.get("removeMailError"), null, e);
						smartPop.closeProgress();
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_delete_mails_btn]', null, error);
		}			
		return false;
	});

	$('.js_empty_trash_btn').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var mailList = input.parents('.js_mail_list_page');
			var folderId = mailList.attr('folderId');
			var paramsJson = {};
			paramsJson['folderId'] = folderId;
			paramsJson['removeAll'] = true;
			console.log(JSON.stringify(paramsJson));
			smartPop.confirm(smartMessage.get("emptyTrashConfirmation"), function(){
				smartPop.progressCenter();
				$.ajax({
					url : "delete_mails.sw",
					contentType : 'application/json',
					type : 'POST',
					data : JSON.stringify(paramsJson),
					success : function(data, status, jqXHR) {
						try{
							smartPop.closeProgress();
							refreshNavMail(folderId);
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_empty_trash_btn delete_mails]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, e) {
						// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
						smartPop.showInfo(smartPop.ERROR, smartMessage.get("emptyTrashError"), null, e);
						smartPop.closeProgress();
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_empty_trash_btn]', null, error);
		}			
		return false;
	});

	var SEND_TYPE_REPLY		= 1;
	var SEND_TYPE_REPLY_ALL	= 2;
	var SEND_TYPE_FORWARD	= 3;

	$('.js_reply_mail_btn').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var mailList = input.parents('.js_mail_list_page');
			var folderId = mailList.attr('folderId');
			var mails = mailList.find('input[name="chkSelectMail"]:checked');
			if(isEmpty(mails) || mails.length != 1){
				smartPop.showInfo(smartPop.WARN, smartMessage.get("replyItemNotSelected"), function(){});
				return false;
			}
				
			var msgId =	$(mails[0]).attr('value');
			smartPop.progressCenter();
			$.ajax({
				url : "new_mail.sw",
				data : {
					folderId: folderId,
					msgId: msgId,
					sendType: SEND_TYPE_REPLY
				},
				success : function(data, status, jqXHR) {
					try{
						$('#content').html(data);
						smartPop.closeProgress();
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_reply_mail_btn new_mail]', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, e) {
					// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
					smartPop.showInfo(smartPop.ERROR, smartMessage.get("replyMailError"), null, e);
					smartPop.closeProgress();
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_reply_mail_btn]', null, error);
		}			
		return false;
	});

	$('.js_reply_all_mail_btn').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var mailList = input.parents('.js_mail_list_page');
			var folderId = mailList.attr('folderId');
			var mails = mailList.find('input[name="chkSelectMail"]:checked');
			if(isEmpty(mails) || mails.length != 1){
				smartPop.showInfo(smartPop.WARN, smartMessage.get("replyItemNotSelected"), function(){});
				return false;
			}
				
			var msgId =	$(mails[0]).attr('value');
			smartPop.progressCenter();
			$.ajax({
				url : "new_mail.sw",
				data : {
					folderId: folderId,
					msgId: msgId,
					sendType: SEND_TYPE_REPLY_ALL
				},
				success : function(data, status, jqXHR) {
					try{
						$('#content').html(data);
						smartPop.closeProgress();
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_reply_mail_btn]', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, e) {
					// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
					smartPop.showInfo(smartPop.ERROR, smartMessage.get("replyMailError"), null, e);
					smartPop.closeProgress();
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_reply_all_mail_btn]', null, error);
		}			
		return false;
	});

	$('.js_forward_mail_btn').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var mailList = input.parents('.js_mail_list_page');
			var folderId = mailList.attr('folderId');
			var mails = mailList.find('input[name="chkSelectMail"]:checked');
			if(isEmpty(mails) || mails.length != 1){
				smartPop.showInfo(smartPop.WARN, smartMessage.get("forwardItemNotSelected"), function(){});
				return false;
			}
	
			var msgId =	$(mails[0]).attr('value');
			smartPop.progressCenter();
			$.ajax({
				url : "new_mail.sw",
				data : {
					folderId: folderId,
					msgId: msgId,
					sendType: SEND_TYPE_FORWARD
				},
				success : function(data, status, jqXHR) {
					try{
						$('#content').html(data);
						smartPop.closeProgress();
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_forward_mail_btn]', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, e) {
					// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
					smartPop.showInfo(smartPop.ERROR, smartMessage.get("forwardMailError"), null, e);
					smartPop.closeProgress();
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_forward_mail_btn]', null, error);
		}			
		return false;
	});

	$('.js_new_mail_folder_btn').live('click', function(e){
		try{
			var input = $(targetElement(e));
			if(isEmpty(input.siblings('span'))){
				smartPop.createMailFolder(null, null, null, null, null);
			}else{
				var parentId = input.attr('parentId');
				var parentName = input.attr('parentName');
				smartPop.createMailFolder(null, null, null, parentId, parentName);
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_new_mail_folder_btn]', null, error);
		}			
		return false;
		
	});

	$('.js_change_mail_password_btn').live('click', function(e){
		try{
			var input = $(targetElement(e));
			var mailServerId = input.attr('mailServerId');
			var emailId = input.attr('emailId');
			var userName = input.attr('userName');
			var oldPassword = input.attr('oldPassword');
			smartPop.changeMailPassword(mailServerId, emailId, userName, oldPassword);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_change_mail_password_btn]', null, error);
		}			
		return false;
		
	});

	$('.js_remove_mail_folder_btn').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var parentId = input.attr('parentId');
			var folderId = input.attr('folderId');
			var paramsJson = {};
			paramsJson['folderId'] = folderId;
			console.log(JSON.stringify(paramsJson));
			smartPop.confirm(smartMessage.get("removeMailFolderConfirmation"), function(){
				smartPop.progressCenter();
				$.ajax({
					url : "delete_mail_folder.sw",
					contentType : 'application/json',
					type : 'POST',
					data : JSON.stringify(paramsJson),
					success : function(data, status, jqXHR) {
						try{
							// 성공시에 프로그래스바를 제거하고 성공메시지를 보여준다...
							refreshNavMailFolders(parentId);
							smartPop.closeProgress();
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_remove_mail_folder_btn delete_mail_folder]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, e) {
						// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
						smartPop.showInfo(smartPop.ERROR, smartMessage.get("removeMailFolderError"), null, e);
						smartPop.closeProgress();
					}
				});
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_remove_mail_folder_btn]', null, error);
		}			
		return false;
	});
	
	$('.js_text_mail_folder_btn').live('click', function(e){
		try{
			var input = $(targetElement(e));
			var folderType = input.attr('folderType');
			var parentId = input.attr('parentId');
			var parentName = input.attr('parentName');
			var folderId = input.attr('folderId');
			var folderName = input.attr('folderName');
			var folderDesc = input.attr('folderDesc');
			smartPop.createMailFolder(folderId, folderName, folderDesc, parentId, parentName, folderType);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_text_mail_folder_btn]', null, error);
		}			
		return false;
		
	});
	
	$('.js_fetch_unread_mails_btn').live('click', function(e){
		try{
			var allMailFolders = $(targetElement(e)).parents('.js_mail_folders').find('.js_all_mail_folders');
			smartPop.progressCenter();
			$.ajax({
				url : "my_all_mail_folders.sw",
				data : {
					fetchUnread : true
				},
				success : function(data, status, jqXHR) {
					try{
						allMailFolders.html(data);
						smartPop.closeProgress();
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_fetch_unread_mails_btn my_all_mail_folders]', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, e) {
					// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
					smartPop.showInfo(smartPop.ERROR, smartMessage.get("fetchMailsError"));
					smartPop.closeProgress();
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_fetch_unread_mails_btn]', null, error);
		}			
		return false;
	});
	
	$('.js_show_all_users_shown').live('click', function(e){
		try{
			var input = $(targetElement(e));
			var usersShown = input.attr('usersShown');
			usersShown = usersShown.replace(/</g, "&lt;");
			usersShown = usersShown.replace(/>/g, "&gt;");
			input.parent().html(usersShown);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_show_all_users_shown]', null, error);
		}			
		return false;
	});

	$('.js_junk_list_btn').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			smartPop.progressCont(input.next('span:first'));
			var target = $('.js_junk_list_form');
			$.ajax({
				url : "junk_list.sw",
				data : {},
				success : function(data, status, jqXHR) {
					try{
						target.html(data);
						target.slideDown(500);
						input.parent('a.js_junk_list_btn').hide();
						smartPop.closeProgress();
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_junk_list_btn junk_list]', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, thrownError){
					smartPop.closeProgress();
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_junk_list_btn junk_list]', null, thrownError);
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_junk_list_btn]', null, error);
		}			
		return false;
	});

	$('a.js_junk_list_close').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			$('.js_junk_list_form').slideUp(500).html('');
			$('a.js_junk_list_btn').show();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_junk_list_close]', null, error);
		}			
		return false;
	});

	$('.js_automove_list_btn').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			smartPop.progressCont(input.next('span:first'));
			var target = $('.js_automove_list_form');
			$.ajax({
				url : "automove_list.sw",
				data : {},
				success : function(data, status, jqXHR) {
					try{
						target.html(data);
						target.slideDown(500);
						input.parent('a.js_automove_list_btn').hide();
						smartPop.closeProgress();
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_automove_list_btn automove_list]', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, thrownError){
					smartPop.closeProgress();
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_automove_list_btn automove_list]', null, thrownError);
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_automove_list_btn]', null, error);
		}			
		return false;
	});

	$('a.js_automove_list_close').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			$('.js_automove_list_form').slideUp(500).html('');
			$('a.js_automove_list_btn').show();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_automove_list_close]', null, error);
		}			
		return false;
	});

	$('.js_new_mail_automove').live('click', function(e) {
		try{
			smartPop.createMailAutoMove();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_new_mail_automove]', null, error);
		}			
		return false;
	});
	
	$('.js_remove_mail_automove').live('click', function(e) {
		try{
			var input = $(targetElement(e)).parents('tr:first');
			var paramsJson = {};
			var senderIds = new Array();
			paramsJson['autoMoveId'] = input.attr("autoMoveId");
			paramsJson['targetFolderId'] = input.attr("targetFolderId");
			console.log(JSON.stringify(paramsJson));
			smartPop.progressCenter();
			$.ajax({
				url : "remove_mail_automove.sw",
				contentType : 'application/json',
				type : 'POST',
				data : JSON.stringify(paramsJson),
				success : function(data, status, jqXHR) {
					$.ajax({
						url : 'automove_list.sw',
						success : function(data, status, jqXHR) {
							$('.js_mail_list_page .js_automove_list_form').html(data);
							smartPop.closeProgress();
							smartPop.close();
						},
						error : function(xhr, ajaxOptions, e) {
							smartPop.closeProgress();
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_remove_mail_automove automove_list.sw]', null, e);			
						}
					});
				},
				error : function(xhr, ajaxOptions, e) {
					// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
					smartPop.showInfo(smartPop.ERROR, smartMessage.get("removeMailAutoMoveError"), null, e);
					smartPop.closeProgress();
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_remove_mail_automove]', null, error);
		}			
		return false;
	});
	
	$('.js_add_junk_domain').live('click', function(e) {
		try{
			var input = $(targetElement(e)).parents('td:first').find('input:first');
			if(!isEmailAddress('a@' + input.attr('value'))){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get("notDomainError"));			
				return false;
			}
			var paramsJson = {};
			var senderDomains = new Array();
			senderDomains.push(input.attr('value'));
			paramsJson['senderDomains'] = senderDomains;
			console.log(JSON.stringify(paramsJson));
			smartPop.progressCenter();
			$.ajax({
				url : "add_junk.sw",
				contentType : 'application/json',
				type : 'POST',
				data : JSON.stringify(paramsJson),
				success : function(data, status, jqXHR) {
					try{
						var target = $('.js_junk_list_form');
						$.ajax({
							url : "junk_list.sw",
							data : {},
							success : function(data, status, jqXHR) {
								try{
									target.html(data);
									smartPop.closeProgress();
								}catch(error){
									smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_add_junk_domail add_junk junk_list]', null, error);
								}			
							},
							error : function(xhr, ajaxOptions, thrownError){
								smartPop.closeProgress();
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_add_junk_domail junk_list]', null, thrownError);
							}
						});
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_add_junk_domail add_junk]', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, e) {
					// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
					smartPop.showInfo(smartPop.ERROR, smartMessage.get("addJunkDomainError"), null, e);
					smartPop.closeProgress();
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_add_junk_domain]', null, error);
		}			
		return false;
	});
	
	$('.js_remove_junk_mail').live('click', function(e) {
		try{
			var input = $(targetElement(e)).parents('li:first');
			var paramsJson = {};
			var senderIds = new Array();
			senderIds.push(input.attr('junkId'));
			paramsJson['senderIds'] = senderIds;
			console.log(JSON.stringify(paramsJson));
			smartPop.progressCenter();
			$.ajax({
				url : "remove_junk.sw",
				contentType : 'application/json',
				type : 'POST',
				data : JSON.stringify(paramsJson),
				success : function(data, status, jqXHR) {
					try{
						input.remove();
						smartPop.closeProgress();
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_remove_junk_mail remove_junk]', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, e) {
					// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
					smartPop.showInfo(smartPop.ERROR, smartMessage.get("removeJunkMailError"), null, e);
					smartPop.closeProgress();
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_remove_junk_mail]', null, error);
		}			
		return false;
	});
	
	$('.js_remove_junk_domain').live('click', function(e) {
		try{
			var input = $(targetElement(e)).parents('li:first');
			var paramsJson = {};
			var senderDomains = new Array();
			senderDomains.push(input.attr('junkId'));
			paramsJson['senderDomains'] = senderDomains;
			console.log(JSON.stringify(paramsJson));
			smartPop.progressCenter();
			$.ajax({
				url : "remove_junk.sw",
				contentType : 'application/json',
				type : 'POST',
				data : JSON.stringify(paramsJson),
				success : function(data, status, jqXHR) {
					try{
						input.remove();
						smartPop.closeProgress();
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_remove_junk_domain remove_junk]', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, e) {
					// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
					smartPop.showInfo(smartPop.ERROR, smartMessage.get("removeJunkDomainError"), null, e);
					smartPop.closeProgress();
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_remove_junk_domain]', null, error);
		}			
		return false;
	});
	
	$('.js_manage_mail_folder').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var action = input.attr('action');
			var folderId = input.parent().attr('folderId');
			if(action === 'empty'){
				smartPop.confirm(smartMessage.get("emptyFolderConfirmation"), function(){
					smartPop.progressCenter();
					$.ajax({
						url : "manage_mail_folder.sw",
						data : {
							folderId: folderId,
							action: action
						},
						success : function(data, status, jqXHR) {
							try{
								refreshNavMail();
								smartPop.closeProgress();
								input.parents('.js_mail_disk_page').find('.js_mail_disk_home').click();
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_manage_mail_folder manage_mail_folder.sw]', null, error);
							}			
						},
						error : function(xhr, ajaxOptions, e) {
							// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
							smartPop.showInfo(smartPop.ERROR, smartMessage.get("manageMailFolderError"), null, e);
							smartPop.closeProgress();
						}
					});
				});
			}else{
					smartPop.progressCenter();
					$.ajax({
						url : "manage_mail_folder.sw",
						data : {
							folderId: folderId,
							action: action
						},
						success : function(data, status, jqXHR) {
							try{
								refreshNavMail();
								smartPop.closeProgress();
								input.parents('.js_mail_disk_page').find('.js_mail_disk_home').click();
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_manage_mail_folder manage_mail_folder.sw]', null, error);
							}			
						},
						error : function(xhr, ajaxOptions, e) {
							// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
							smartPop.showInfo(smartPop.ERROR, smartMessage.get("manageMailFolderError"), null, e);
							smartPop.closeProgress();
						}
					});
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail js_manage_mail_folder]', null, error);
		}			
		return false;
	});
	
});

var refreshNavMail = function(folderId){
	try{
		var input = $('.js_nav_select_tab[href="nav_mail.sw"]');
		var href = input.attr('href');
		input.addClass('current').siblings().removeClass('current');
		var searchTarget = input.parent().next();
		$.ajax({
			url : "mail_disk_usage.sw",
			success : function(data, status, jqXHR) {
				searchTarget.find('.js_mail_disk_usage').html(data).show().siblings().hide();
			},
			error : function(xhr, ajaxOptions, thrownError){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail refreshNavMail mail_disk_usage.sw]', null, error);
			}
		});
		$.ajax({
			url : href,
			success : function(data, status, jqXHR) {
				try{
					input.parents('#nav').find('.nav_list').html(data);
					if(!isEmpty(folderId)){
						$('.js_mail_folders:visible .js_mail_folder[folderId="' + folderId + '"]').click();
					}
				}catch(error){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail refreshNavMail ' + href + ']', null, error);
				}			
			},
			error : function(xhr, ajaxOptions, thrownError){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail refreshNavMail ' + href + ']', null, error);
			}
		});
	}catch(error){
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail refreshNavMail]', null, error);
	}			
};

var refreshNavMailFolders = function(parentId){
	try{
		var navTabMail = $('.js_nav_tab_mail:visible');
		if(isEmpty(navTabMail)) return;
		var allMailFolders = $('.js_mail_folders .js_all_mail_folders');
		smartPop.progressCenter();
		$.ajax({
			url : "my_all_mail_folders.sw",
			data : {
				fetchUnread : false
			},
			success : function(data, status, jqXHR) {
				try{
					allMailFolders.html(data);
					if(!isEmpty(parentId)){
						$('.js_mail_folders:visible .js_mail_folder[folderId="' + parentId + '"]').click();
					}
					smartPop.closeProgress();
				}catch(error){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail refreshNavMailFolders my_all_mail_folders]', null, error);
				}			
			},
			error : function(xhr, ajaxOptions, e) {
				// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
				smartPop.showInfo(smartPop.ERROR, smartMessage.get("fetchMailsError"));
				smartPop.closeProgress();
			}
		});
	}catch(error){
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail refreshNavMailFolders]', null, error);
	}			
};

var getFolderIdFromLastHref = function(lastHref){
	if(isEmpty(lastHref) || lastHref.indexOf('mail_list.sw')==-1) return null;
	return lastHref.split("cid=")[1];
};

}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-mail script]', null, error);
}