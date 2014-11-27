try{
$(function() {
	
	var autoPictures = $('img.js_auto_picture');
	if(!isEmpty(autoPictures)) {
		for(var i=0; i<autoPictures.length; i++) {
			if(isEmpty($(autoPictures[i]).next().find('div.js_file_uploader'))) continue;
			createUploader(null, $(autoPictures[i]).next().find('div.js_file_uploader'), false, true);
		}		
	}

	var autoLoadProfiles = $('div.js_auto_load_profile');
	if(!isEmpty(autoLoadProfiles)) {
		for(var i=0; i<autoLoadProfiles.length; i++) {			
			loadMyProfileField();
		}		
	}

	$('.js_select_action a').live('click',function(e) {
		try{
			var input = $(targetElement(e));
			if(input.hasClass('js_content')) return false;
			
			$('.js_select_action').find('a').removeClass('current');
			var currentAction = input.parents('.up_icon_list');
			currentAction.find('a').addClass('current');
			$('#upload_form_box').removeClass('smart_form');
			var url = input.attr('href');
			var target = $('.js_upload_form');
			$.ajax({
				url : url,
				data : {},
				success : function(data, status, jqXHR) {
					try{
						target.html(data).show();
						target.find('.js_up_pointer').css({"left": currentAction.position().left + currentAction.outerWidth()/2 + "px"});
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_select_action ' + url + ']', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, thrownError){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_select_action ' + url + ']', null, thrownError);
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_select_action]', null, error);
		}			
		return false;
	});

	$('a.js_cancel_action').live('click',function(e) {
		try{
			if ($('.js_select_action').find('a:first').length != 0) {
				var input = $('.js_select_action').find('a:first');
				if(isEmpty(input)) return false;
				$('.js_select_action').find('a').removeClass('current');
				var currentAction = input.parents('.up_icon_list');
				currentAction.find('a').addClass('current');
				var target = $('.js_upload_form');
				var url = input.attr('href');
				$.ajax({
					url : url,
					data : {},
					success : function(data, status, jqXHR) {
						try{
							target.html(data).show();
							$(data).find('.js_up_pointer').css({"left": (currentAction.position().left + currentAction.outerWidth()/2) + "px"});
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_cancel_action ' + url + ']', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, thrownError){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_cancel_action ' + url + ']', null, thrownError);
					}
				});
			} else if ($(targetElement(e)).parents('.js_work_list_page').find('div.js_new_work_form').length != 0 ){
				var input = $(targetElement(e)).parents('.js_work_list_page').find('div.js_new_work_form');
				if(isEmpty(input)) return false;
				var workform = input.parents('.js_work_list_page').find('div.js_new_work_form');
				if(isEmpty(workform)) return false;
				workform.slideUp();
			}
			
			$('#upload_form_box').removeClass('smart_form');
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_cancel_action]', null, error);
		}					
		return false;
	});
	
	$('.js_click_start_form').live('click', function(e){
		try{
			var input = $(targetElement(e)).parents('.js_click_start_form:first');
			var newMemo = input.parents('.js_new_memo_page');
			var newPicture = input.parents('.js_new_picture_page');
			var newFile = input.parents('.js_new_file_page');
			var newEvent = input.parents('.js_new_event_page');
			var newBoard = input.parents('.js_new_board_page');
			var newForum = input.parents('.js_new_forum_page');
			var newIWork = input.parents('.js_new_iwork_page');
			var startPWork = input.parents('.js_start_pwork_page');
			var planSWork = input.parents('.js_plan_swork_page');
			var newReservation = input.parents('.js_new_asset_reservation_page');
			var workId = "", workSpaceId = "";
			var target = [];
			if(!isEmpty(newMemo)){
				input.find('textarea').removeClass('bn').addClass('up_textarea');
				newMemo.find('form[name="frmNewMemo"]').addClass('form_title');
				workId = newMemo.attr('workId');
				workSpaceId = newMemo.attr('workSpaceId');
				target = newMemo.find('.js_upload_buttons');
			}else if(!isEmpty(newPicture)){
				newPicture.find('tr').show();
				newPicture.find('form[name="frmNewPicture"]').addClass('form_title');
				workId = newPicture.attr('workId');
				workSpaceId = newPicture.attr('workSpaceId');
				target = newPicture.find('.js_upload_buttons');
			}else if(!isEmpty(newFile)){
				newFile.find('td[fieldId="txtFileField"] .form_label').show();
				newFile.find('tr').show();
				newFile.find('.js_file_detail_form').show();
				newFile.find('form[name="frmNewFile"]').addClass('form_title');
				workId = newFile.attr('workId');
				workSpaceId = newFile.attr('workSpaceId');
				target = newFile.find('.js_upload_buttons');
			}else if(!isEmpty(newEvent)){
				newEvent.find('td[fieldId="txtEventName"] .form_label').show();
				newEvent.find('td[fieldId="txtEventName"] .form_value input').addClass('fieldline');
				newEvent.find('tr').show();
				newEvent.find('form[name="frmNewEvent"]').addClass('form_title');
				workId = newEvent.attr('workId');
				workSpaceId = newEvent.attr('workSpaceId');
				target = newEvent.find('.js_upload_buttons');
			}else if(!isEmpty(newBoard)){
				newBoard.find('td[fieldId="txtBoardName"] .form_label').show();
				newBoard.find('td[fieldId="txtBoardName"] .form_value input').addClass('fieldline');
				newBoard.find('tr').show();
				newBoard.find('form[name="frmNewBoard"]').addClass('form_title');
				workId = newBoard.attr('workId');
				workSpaceId = newBoard.attr('workSpaceId');
				target = newBoard.find('.js_upload_buttons');
			}else if(!isEmpty(newForum)){
				newForum.find('td[fieldId="txtForumName"] .form_label').show();
				newForum.find('td[fieldId="txtForumName"] .form_value input').addClass('fieldline');
				newForum.find('tr').show();
				newForum.find('form[name="frmNewForum"]').addClass('form_title');
				workId = newForum.attr('workId');
				workSpaceId = newForum.attr('workSpaceId');
				target = newForum.find('.js_upload_buttons');
			}else if(!isEmpty(newIWork)){
				workId = newIWork.attr('workId');
				workSpaceId = newIWork.attr('workSpaceId');
				target = newIWork.find('.js_upload_buttons');
			}else if(!isEmpty(startPWork)){
				workId = startPWork.attr('workId');
				workSpaceId = startPWork.attr('workSpaceId');
				target = startPWork.find('.js_upload_buttons');
			}else if(!isEmpty(planSWork)){
				workId = planSWork.attr('workId');
				workSpaceId = planSWork.attr('workSpaceId');
				target = planSWork.find('.js_upload_buttons');
			}else if(!isEmpty(newReservation)){
				workId = newReservation.attr('workId');
				workSpaceId = newReservation.attr('workSpaceId');
				target = newReservation.find('.js_upload_buttons');
			}
			
			if(isEmpty(workSpaceId))
				workSpaceId = input.parents('.js_space_instance_list_page').attr('spaceId');
			if(isEmpty(workSpaceId))
				workSpaceId = input.parents('.js_community_space_page').attr('spaceId');

			if(isEmpty(target) || !isEmpty(target.html())) return;
			$.ajax({
				url : 'upload_buttons.sw',
				data : {
					workId : workId,
					workSpaceId : workSpaceId
				},
				success : function(data, status, jqXHR) {
					try{
						target.html(data);
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_click_start_fomr upload_buttons]', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, thrownError){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_click_start_form upload_buttons]', null, thrownError);
				}
			});			
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_click_start_form]', null, error);
		}			
		return true;
	});

	/*
	 * ��몄��臾댁��������湲곗�����, �����μ갹��� 媛���� �����ν����� �����ㅻ�� 寃����寃곌낵瑜� ���������硫� ��ㅽ�������� ��대깽��몃��, 寃����寃곌낵���紐⑹�� href媛���쇰�� ajax瑜�
	 * ��ㅽ�������� 媛���몄�� 媛���쇰�� id媛� form_works ��� 怨� ���硫댁�� 洹몃�ㅼ��, ������濡� ��쇱��以����.
	 */
	$('.js_select_work').swnavi({
		before : function(event) {
			try{
				smartPop.progressCenter();
				$('#form_works').html('');
				$(targetElement(event)).parents(".js_start_work_page").hide();
				$('#upload_form_box').addClass('smart_form');
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_select_work before]', null, error);
			}			
		},
		target : 'form_works',
		after : function(e) {
			try{
				var input = $(targetElement(e)).parents('li:first').children('a');
				var formContent = $('#form_works').find('div.js_form_content');
				var workId = input.attr('workId');
				var href = input.attr('href');
				if(href.indexOf("new_asset_reservation.sw") == -1){
					new SmartWorks.GridLayout({
						target : formContent,
						mode : "edit",
						first : true,
						workId : workId,
						onSuccess : function(){
							try{
								$('#form_works').parent().show();
								var startPwork = formContent.parents('.js_start_pwork_page');
								if(!isEmpty(startPwork)){
									var approvalLineId = startPwork.attr("approvalLineId");
									var formTaskApproval = formContent.siblings('.js_form_task_approval');
									if(!isEmpty(approvalLineId)){
										$.ajax({
											url : 'append_task_approval.sw',
											data : { 
												approvalLineId : approvalLineId
											},
											success : function(data, status, jqXHR) {
												try{
													formTaskApproval.html(data).show();
													smartPop.closeProgress();																		
												}catch(error){
													smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_select_work after append_task_approval]', null, error);
												}			
											},
											error : function(xhr, ajaxOptions, thrownError){					
												smartPop.closeProgress();																		
												smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_select_work after append_task_approval]', null, thrownError);
											}
										});
										
									}else{
										smartPop.closeProgress();																		
									}
								}else{
									smartPop.closeProgress();											
								}					
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_select_work after GridLayout onSuccess]', null, error);
							}			
						},
						onerror : function(xhr, ajaxOptions, e){
							smartPop.closeProgress();					
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_select_work after GridLayout onError]', null, e);
						}
					});
				}else{
					$('#form_works').parent().show();
					smartPop.closeProgress();											
				}
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_select_work after]', null, error);
			}			
		}
	});

//	$('.js_toggle_form_detail').live('click', function(event){
//		var input = $(event.target);
//		input.parent().hide().siblings().show();
//		var formContent = $('#form_works').find('div.js_form_content');
//		if(isEmpty(formContent)) formContent = input.parents('.js_work_list_page').find('div.js_form_content');
//		var workId = input.attr('workId');
//		var requiredOnly = input.attr('requiredOnly');
//		formContent.html('');
//		new SmartWorks.GridLayout({
//			target : formContent,
//			mode : "edit",
//			requiredOnly : requiredOnly,						
//			workId : workId
//		});
//		return false;
//	});
	
	$('input.js_toggle_schedule_work').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var target = $(targetElement(e)).parent().next('span');
			if(input.is(':checked')){
				loadCheckScheduleFields();
				target.show();
			}else{
				target.find('.js_check_schedule_fields').html('');
				target.hide();
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_toggle_schedule_work]', null, error);
		}			
	});
	
	var ACCESS_LEVEL_CUSTOM = 2;
	$('select.js_select_access_level').live('change', function(e) {
		try{
			var input = $(targetElement(e));
			var target = input.parents('.js_upload_buttons_page').find('div.js_access_level_custom');
			if(isEmpty(target)){
				target = input.parents('.js_iwork_space_page:first').find('div.js_access_level_custom');
				if(isEmpty(target)){
					target = input.parents('.js_import_from_excel_page').find('div.js_access_level_custom');				
				}
			}
			var accessLevel = input.attr('value');
			if(accessLevel == ACCESS_LEVEL_CUSTOM)
				target.show();
			else
				target.hide();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_select_access_level]', null, error);
		}			
	});
	
	$('select.js_select_work_space').live('change', function(e) {
		try{
			var input = $(targetElement(e));
			var target = input.parents('form[name="frmAccessSpace"]').find('input[name="selWorkSpaceType"]');
			target.attr('value', input.find('option:selected').attr('workSpaceType'));
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_select_work_space]', null, error);
		}			
	});
	
	$('a.js_create_new_work').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var url = input.attr('href');
			var target = $('#content');
			$('a.js_work_report_close').click();
			$('a.js_search_filter_close').click();
			$('a.js_excel_import_close').click();
			$('a.js_cancel_inline_task_instance').click();
			$.ajax({
				url : url,
				data : {
					workSpaceId : currentUser.userId
				},
				success : function(data, status, jqXHR) {
					try{
						target.html(data).slideDown(500);
						var formContent = target.find('div.js_form_content');
						var workId = input.attr('workId');
						new SmartWorks.GridLayout({
							target : formContent,
							mode : "edit",
							workId : workId
						});
						var startPwork = formContent.parents('.js_start_pwork_page');
						if(!isEmpty(startPwork)){
							var approvalLineId = startPwork.attr("approvalLineId");
							var formTaskApproval = formContent.siblings('.js_form_task_approval');
							if(!isEmpty(approvalLineId)){
								$.ajax({
									url : 'append_task_approval.sw',
									data : { 
										approvalLineId : approvalLineId
									},
									success : function(data, status, jqXHR) {
										formTaskApproval.html(data).show();
									},
									error : function(xhr, ajaxOptions, thrownError){					
									}
								});
							}
						}
						var newFile = target.find('.js_new_file_page');
						if(!isEmpty(newFile)){
							newFile.find('.js_up_pointer').removeClass('up_point');
							newFile.find('.js_new_file_fields .js_form_file_field').click();
						}		
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_create_new_work ' + url + ']', null, error);
					}
				},
				error : function(xhr, ajaxOptions, error){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_create_new_work ' + url + ']', null, error);
				}
				
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_create_new_work]', null, error);
		}			
		return false;
	});

	$('a.js_reserve_asset').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var url = input.attr('href');
			var assetSpace = input.parents('.js_asset_space_page');
			var folderId="", folderName="", assetId="", assetName="";
			if(!isEmpty(assetSpace)){
				folderId = assetSpace.attr('assetFolderId');
				folderName = assetSpace.attr('assetFolderName');
				assetId = assetSpace.attr('assetId');
				assetName = assetSpace.attr('assetName');
			}
			var target = input.parents('.js_work_list_page').find('div.js_new_work_form');
			$('a.js_search_filter_close').click();
			$('a.js_excel_import_close').click();
			$.ajax({
				url : url,
				data : {
					folderId: folderId,
					folderName: folderName,
					assetId: assetId,
					assetName: assetName
				},
				success : function(data, status, jqXHR) {
					try{
						target.html(data).slideDown(500);
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_reserve_asset ' + url + ']', null, error);
					}
				},
				error : function(xhr, ajaxOptions, error){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_reserve_asset ' + url + ']', null, error);
				}
				
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_reserve_asset]', null, error);
		}			
		return false;
	});

	$('input.js_whole_day').live('click', function(e){
		try{
			var input = $(targetElement(e));
			input.parent().siblings('div.js_start_time').toggle();
			var endtime = input.parent().siblings('div.js_end_datetime').find('div.js_end_time').hide();
			if(input[0].checked) endtime.hide();
			else endtime.show();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_whole_day]', null, error);
		}			
	});
	$('a.js_toggle_file_detail').swnavi(
		{
			target : 'form_import',
			after : function(e) {
				try{
					var input = $(targetElement(e));
					input.parents('.js_file_detail_form').parent().prev().slideToggle(500);
					input.parent().toggle().siblings().toggle();
					var form = input.parents('form[name="frmNewFile"]');
					var uploader = form.find('.qq-uploader');
					var comments = form.find('textarea[name="txtFileDesc"]').attr("value");
					var groupId = uploader.attr('groupId');
					var fileList = uploader.find('.qq-upload-list li');
					var fileName = $(fileList[0]).attr('fileName');
					if(isEmpty(fileName))
						fileName = "";
	
					$('#error_message_span').html("");
					
					var formContent = $('#form_import').find('div.js_form_content');
					if(!isEmpty(formContent)) {
						var workId = formContent.attr('workId');
						$.ajax({
							url : "get_form_xml.sw",
							data : {
								workId : workId
							},
							success : function(formXml, status, jqXHR) {
								try{
									var record = createFileDataFields({
											formXml : formXml,
											groupId : groupId,
											fileName : fileName,
											fileList : fileList,
											comments : comments								
									});
									new SmartWorks.GridLayout({
										target : formContent,
										formXml : formXml,
										formValues : record,
										mode : "edit"
									});
								}catch(error){
									smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_toggle_file_detail after get_form_xml]', null, error);
								}			
							},
							error : function(xhr, ajaxOptions, thrownError){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_toggle_file_detail after get_form_xml]', null, thrownError);
							}
						});
					}
				}catch(error){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_toggle_file_detail after]', null, error);
				}			
			}
		});

	$('a.js_view_work_manual').live('click', function(e){
		try{
			var input = $(targetElement(e));
			var target = input.parents("div.js_work_list_page").find('#work_manual').slideToggle(500);
			input.hide();
			input.siblings().show();
			$('a.js_cancel_inline_task_instance').click();
	
			var href = input.attr('href');
			if(isEmpty(href)){
				target.html('');
			}else{
				var progressSpan = input.prev('span.js_progress_span');
				smartPop.progressCont(progressSpan);
				$.ajax({
					url : href,
					data : {},
					success : function(data, status, jqXHR) {
						try{
							target.html(data);
							var pworkManual = $('.js_pwork_manual_page');
							if(isEmpty(pworkManual)){
								smartPop.closeProgress();
								return;
							}
							var manualTasksHolder = pworkManual.find(".js_manual_tasks_holder");
							var manualTasks = manualTasksHolder.find(".js_manual_tasks");
							var manualTasksRight = pworkManual.find('.js_manual_tasks_right');
							pworkManual.find('.js_manual_tasks_left').hide();
							for(var i=0; i<manualTasks.length; i++){
								var manualTask = $(manualTasks[i]);
								if(manualTask.position().top>=manualTask.height())
									break;
							}
							if(i<manualTasks.length)
								manualTasksRight.show();
							else
								manualTasksRight.hide();
							
							pworkManual.find('a.js_select_task_manual:first div:first').click();

							smartPop.closeProgress();
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_view_work_manual ' + href + ']', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, thrownError){
						smartPop.closeProgress();					
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_view_work_manual ' + href + ']', null, thrownError);
					}
				});
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_view_work_manual]', null, error);
		}			
		return false;
	});

	$('.js_select_task_manual').live('click', function(e){
		try{
			var input = $(targetElement(e));
			if(!input.hasClass('js_manual_task')) input = input.parents('.js_manual_task:first');
			var target = $("#"+input.attr("taskId"));
			var target_point = $(target).find("div.up_point:first");
			var selectedManualTask = input;
			input.parents('.js_pwork_manual_page').find('.js_manual_task').removeClass('selected');
			selectedManualTask.addClass('selected');
			target_point.css({"left": (selectedManualTask.position().left + selectedManualTask.outerWidth()/2) + "px"});
			$(target).show().siblings('div.js_task_manual').hide();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_select_task_manual]', null, error);
		}			
		return false;
	});
	
	$('a.js_manual_tasks_right').live('click', function(e){
		try{
			var input = $(targetElement(e)).parents('a:first');
			var pworkManual = input.parents('.js_pwork_manual_page');
			var manualTasksHolder = pworkManual.find('.js_manual_tasks_holder');
			var manualLeft = pworkManual.find('.js_manual_tasks_left');	
			var manualRight = pworkManual.find('.js_manual_tasks_right');
	
			var tasksVisible = manualTasksHolder.find(".js_manual_task:visible");
			var viewWidth = manualTasksHolder.width();
			var tasksOverflow = new Array();
			for(var i=0; i<tasksVisible.length; i++){
				var task  =$(tasksVisible[i]);
				if(task.position().top>=task.height())
					tasksOverflow.push(tasksVisible[i]);
			}
			if(isEmpty(tasksOverflow) || tasksOverflow.length==0){
				manualRight.hide();
				return false;
			}
	
			var overflowWidth = 0;
			for(var i=0; i<tasksOverflow.length; i++){
				overflowWidth = overflowWidth + $(tasksOverflow[i]).outerWidth() + 10;
				if(overflowWidth>viewWidth/2) break;
			}
	
			for(var i=0; i<tasksVisible.length && overflowWidth>0; i++){
				var task = $(tasksVisible[i]);
				overflowWidth = overflowWidth - task.outerWidth() - 10;
				task.hide();
			}
	
			var tasksHidden = manualTasksHolder.find(".js_manual_task:hidden");
			if(isEmpty(tasksHidden))
				manualLeft.hide();
			else
				manualLeft.show();
			
			tasksVisible = manualTasksHolder.find(".js_manual_task:visible");
			for(var i=0; i<tasksVisible.length; i++){
				var task = $(tasksVisible[i]);
				if(task.position().top>=task.height())
					break;
			}
			if(tasksVisible.length==0 || i==tasksVisible.length){
				manualRight.hide();
			}else{
				manualRight.show();
			}
			
	//		if(tasksVisible.length>0)
	//			$(tasksVisible[i-1]).click();
			if(tasksOverflow.length>0)
				$(tasksOverflow[0]).click();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_manual_task_right]', null, error);
		}			
		return false;
	});
	
	$('a.js_manual_tasks_left').live('click', function(e){
		try{
			var input = $(targetElement(e)).parents('a:first');
			var pworkManual = input.parents('.js_pwork_manual_page');
			var manualTasksHolder = pworkManual.find('.js_manual_tasks_holder');
			var manualLeft = pworkManual.find('.js_manual_tasks_left');	
			var manualRight = pworkManual.find('.js_manual_tasks_right');
	
			var tasksHidden = manualTasksHolder.find(".js_manual_task:hidden");
			var viewWidth = manualTasksHolder.width();
			if(isEmpty(tasksHidden) || tasksHidden.length==0){
				manualLeft.hide();
				return false;
			}
	
			var hiddenWidth = 0;
			for(var i=tasksHidden.length-1; i>=0; i--){
				var task = $(tasksHidden[i]).show();
				hiddenWidth = hiddenWidth + task.outerWidth() + 10;
				if(hiddenWidth>viewWidth/2) break;
			}
	
			if(i>0)
				manualLeft.show();
			else
				manualLeft.hide();
			
			tasksVisible = manualTasksHolder.find(".js_manual_task:visible");
			for(var i=0; i<tasksVisible.length; i++){
				var task = $(tasksVisible[i]);
				if(task.position().top>=task.height())
					break;
			}
			if(tasksVisible.length==0 || i==tasksVisible.length){
				manualRight.hide();
			}else{
				manualRight.show();
			}
	
	//		if(tasksVisible.length>0)
	//			$(tasksVisible[0]).click();
			if(tasksHidden.length>0)
				$(tasksHidden[tasksHidden.length-1]).click();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_manual_task_left]', null, error);
		}			
		return false;
	});
	
	$('.js_select_task_instance').live("click", function(e){
		try{
			smartPop.progressCenter();
			var input = $(targetElement(e));
			if(!input.hasClass('js_instance_task')) input = input.parents('.js_instance_task:first');
			input.parents('.js_pwork_space_page:first').find('.js_subprocess_space').hide().find('.js_subprocess_diagram').html('');
			clickOnTask(input);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_select_task_instance]', null, error);
		}			
		return false;
	});

	$('.js_select_subtask_instance').live("click", function(e){
		try{
			smartPop.progressCenter();
			var input = $(targetElement(e));
			if(!input.hasClass('js_instance_task')) input = input.parents('.js_instance_task:first');
			var pworkSpace = input.parents('.js_pwork_space_page:first');
			var subprocessSpace = pworkSpace.find('.js_subprocess_space').show();
			subprocessSpace.find('.js_form_content_pointer').css({"left": input.position().left + input.outerWidth()/2 + "px"});
	//TODO	
			smartPop.closeProgress();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_select_subtask_instance]', null, error);
		}			
		return false;
	});

	$('a.js_instance_tasks_right').live('click', function(e){
		try{
			var input = $(targetElement(e)).parents('a:first');
			var pworkSpace = input.parents('.js_pwork_space_page:first');
			var instanceTasksHolder = pworkSpace.find('.js_instance_tasks_holder');
			var instanceLeft = pworkSpace.find('.js_instance_tasks_left');	
			var instanceRight = pworkSpace.find('.js_instance_tasks_right');
			pworkSpace.find('.js_subprocess_space').hide().find('.js_subprocess_diagram').html('');
			
			var tasksVisible = instanceTasksHolder.find(".js_instance_task:visible");
			var arrowsVisible = instanceTasksHolder.find('.js_instance_task_arrow:visible');
			var viewWidth = instanceTasksHolder.width();
			var tasksOverflow = new Array();
			for(var i=0; i<tasksVisible.length; i++){
				var task  =$(tasksVisible[i]);
				if(task.position().top>=task.height())
					tasksOverflow.push(tasksVisible[i]);
			}
			if(isEmpty(tasksOverflow) || tasksOverflow.length==0){
				instanceRight.hide();
				return false;
			}
	
			var overflewWidth = 0;
			for(var i=0; i<tasksOverflow.length; i++){
				overflewWidth = overflewWidth + $(tasksOverflow[i]).outerWidth() + $(arrowsVisible[0]).outerWidth() + 10;
				if(overflewWidth>viewWidth/2) break;
			}
	
			for(var i=0; i<tasksVisible.length && overflewWidth>0; i++){
				var task = $(tasksVisible[i]);
				var arrow = $(arrowsVisible[i]);
				overflewWidth = overflewWidth - task.outerWidth() - arrow.outerWidth() - 10;
				task.hide();
				arrow.hide();
			}
	
			var tasksHidden = instanceTasksHolder.find(".js_instance_task:hidden");
			if(isEmpty(tasksHidden))
				instanceLeft.hide();
			else
				instanceLeft.show();
			
			tasksVisible = instanceTasksHolder.find(".js_instance_task:visible");
			for(var i=0; i<tasksVisible.length; i++){
				var task = $(tasksVisible[i]);
				if(task.position().top>=task.height())
					break;
			}
			if(tasksVisible.length==0 || i==tasksVisible.length){
				instanceRight.hide();
			}else{
				instanceRight.show();
			}
			
	//		if(tasksVisible.length>0)
	//			$(tasksVisible[i-1]).click();
			
			if(tasksOverflow.length>0)
				$(tasksOverflow[0]).click();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_instance_tasks_right]', null, error);
		}			
		return false;
	});
	
	$('a.js_instance_tasks_left').live('click', function(e){
		try{
			var input = $(targetElement(e)).parents('a:first');
			var pworkSpace = input.parents('.js_pwork_space_page:first');
			var instanceTasksHolder = pworkSpace.find('.js_instance_tasks_holder');
			var instanceLeft = pworkSpace.find('.js_instance_tasks_left');	
			var instanceRight = pworkSpace.find('.js_instance_tasks_right');
			pworkSpace.find('.js_subprocess_space').hide().find('.js_subprocess_diagram').html('');
	
			var tasksHidden = instanceTasksHolder.find(".js_instance_task:hidden");
			var arrowsHidden = instanceTasksHolder.find('.js_instance_task_arrow:hidden');
			var viewWidth = instanceTasksHolder.width();
			if(isEmpty(tasksHidden) || tasksHidden.length==0){
				instanceLeft.hide();
				return false;
			}
	
			var hiddenWidth = 0;
			for(var i=tasksHidden.length-1; i>=0; i--){
				var task = $(tasksHidden[i]).show();
				var arrow = $(arrowsHidden[i]).show();
				hiddenWidth = hiddenWidth + task.outerWidth() + arrow.outerWidth() + 10;
				if(hiddenWidth>viewWidth/2) break;
			}
	
			if(i>0)
				instanceLeft.show();
			else
				instanceLeft.hide();
			
			tasksVisible = instanceTasksHolder.find(".js_instance_task:visible");
			for(var i=0; i<tasksVisible.length; i++){
				var task = $(tasksVisible[i]);
				if(task.position().top>=task.height())
					break;
			}
			if(tasksVisible.length==0 || i==tasksVisible.length){
				instanceRight.hide();
			}else{
				instanceRight.show();
			}
	
	//		if(tasksVisible.length>0)
	//			$(tasksVisible[0]).click();
			if(tasksHidden.length>0)
				$(tasksHidden[tasksHidden.length-1]).click();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_instance_tasks_left]', null, error);
		}			
		return false;
	});

	$('a.js_modify_iwork_instance').live('click', function(e){
		try{
			var input = $(targetElement(e));
			var iworkSpace = input.parents('.js_iwork_space_page:first');
			var workId = iworkSpace.attr("workId");
			var instId = iworkSpace.attr("instId");
			var amIOwner = iworkSpace.attr("amIOwner");
			var formContent = iworkSpace.find('div.js_form_content');
			formContent.html('');
			formContent.removeClass('list_contents');			
			new SmartWorks.GridLayout({
				target : formContent,
				mode : "edit",
				workId : workId,
				recordId : instId
			});
			iworkSpace.find('.js_btn_modify').hide();
			iworkSpace.find('.js_btn_delete').hide();
			iworkSpace.find('.js_btn_save').show();
			iworkSpace.find('.js_btn_cancel').show();
			if(amIOwner == 'true')
				iworkSpace.find('form[name="frmAccessSpace"]').show();
			else
				iworkSpace.find('form[name="frmAccessSpace"]').hide();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_modify_iwork_instance]', null, error);
		}			
		return false;
	});

	$('a.js_cancel_iwork_instance').live('click', function(e){
		try{
			var input = $(targetElement(e));
			var iworkSpace = input.parents('.js_iwork_space_page:first');
			var workId = iworkSpace.attr("workId");
			var instId = iworkSpace.attr("instId");
			var formContent = iworkSpace.find('div.js_form_content');
			iworkSpace.find('.js_form_task_approval').hide().html('');
			iworkSpace.find('.js_form_task_forward').hide().html('');
			iworkSpace.find('.js_form_task_email').hide().html('');
			formContent.html('');
			formContent.addClass('list_contents');
			new SmartWorks.GridLayout({
				target : formContent,
				mode : "view",
				workId : workId,
				recordId : instId
			});
			showErrors();
			iworkSpace.find('.js_btn_modify').show().siblings().hide();
			iworkSpace.find('.js_btn_delete').show();
			iworkSpace.find('form[name="frmAccessSpace"]').hide();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_cancel_iwork_instance]', null, error);
		}			
		return false;
	});

	$('a.js_save_iwork_instance').live('click', function(e){
		try{
			var input = $(targetElement(e));
			var iworkSpace = input.parents('.js_iwork_space_page:first');
			var workId = iworkSpace.attr("workId");
			var instId = iworkSpace.attr("instId");
			var formContent = iworkSpace.find('div.js_form_content');
			var approvers = iworkSpace.find('.js_approval_box input[type="hidden"]');
			if(!isEmpty(approvers)){
				for(var i=0; i<approvers.length; i++){
					var approver = $(approvers[i]);
					var autoComplete = approver.parents('.js_approval_box').find('.js_auto_complete');
					if(isEmpty(approver.attr('value'))) autoComplete.addClass('required');
					else autoComplete.removeClass('required');
				}
			}
			// iwork_instance ��� ������ �����깊�������� ������ 紐⑤�� �����ν��硫대�ㅼ�� validation������ ��댁����� �����쇰㈃ submit瑜� 吏����������...
			if (!SmartWorks.GridLayout.validate(iworkSpace.find('form.js_validation_required'), $('.js_space_error_message'))) return false;
			
			smartPop.confirm(smartMessage.get("saveConfirmation"), function(){
				try{
					var forms = iworkSpace.find('form:visible');
					var paramsJson = {};
					paramsJson['workId'] = workId;
					paramsJson['instanceId'] = instId;
					for(var i=0; i<forms.length; i++){
						var form = $(forms[i]);
						
						// ��쇱�� ��ㅻ����명�쇱�대㈃ formId��� formName 媛���� �����ы�����...
						if(form.attr('name') === 'frmSmartForm'){
							paramsJson['formId'] = form.attr('formId');
							paramsJson['formName'] = form.attr('formName');
						}
						
						// ��쇱�대�� ��ㅺ����쇰�� ������ ��대�� ��쇱�� ������ 紐⑤�� �����ν��紐⑸�ㅼ�� JSON��������쇰�� Serialize ������...
						paramsJson[form.attr('name')] = mergeObjects(form.serializeObject(), SmartWorks.GridLayout.serializeObject(form));
					}
					console.log(JSON.stringify(paramsJson));
					var url = "set_iwork_instance.sw";
					
					// ���鍮���ㅼ��泥� ���濡�洹몃����ㅻ��瑜� ���������寃� ������....
					var progressSpan = iworkSpace.find('.js_progress_span:first');
					smartPop.progressCont(progressSpan);
					
					// set_iwork_instance.sw���鍮���ㅻ�� ���泥�������..
					$.ajax({
						url : url,
						contentType : 'application/json',
						type : 'POST',
						data : JSON.stringify(paramsJson),
						success : function(data, status, jqXHR) {
							try{
								smartPop.closeProgress();
								var inlineTarget = input.parents('.js_content_target');
								if(isEmpty(inlineTarget)){
									iworkSpace.find('.js_work_space_home').click();
								}else{
									inlineTarget.find('.js_cancel_inline_task_instance').attr('action', 'save').attr('clickY', e.clientY).click();
								}
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_save_iwork_instance ' + url + ']', null, error);
							}			
						},
						error : function(xhr, ajaxOptions, e) {
							try{
								// ���鍮���� �����ъ�������� 硫����吏�瑜� 蹂댁�ъ＜怨� �����ы����댁����� 洹몃����� ���������...
								smartPop.closeProgress();
								if(xhr.responseText === "duplicateKeyException")
									smartPop.showInfo(smartPop.ERROR, smartMessage.get("duplicateKeyException"), null, e);
								else
									smartPop.showInfo(smartPop.ERROR, smartMessage.get("setIWorkInstanceError"), function(){
									return false;
								}, null, e);
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_save_iwork_instance ' + url + ']', null, error);
							}										
						}
					});
				}catch(error){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_save_iwork_instance]', null, error);
				}			
			},
			function(){
				return false;
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_save_iwork_instance]', null, error);
		}			
		return false;
	});

	$('a.js_forward_work_instance').live('click', function(e){
		try{
			var input = $(targetElement(e));
			var workSpacePage = input.parents('.js_iwork_space_page:first, .js_pwork_space_page:first');
			if(isEmpty(workSpacePage)){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get("forwardWorkInstanceError"));
				return false;
			}
			var workId = workSpacePage.attr("workId");
			var instId = workSpacePage.attr("instId");
			// iwork_instance ��� ������ �����깊�������� ������ 紐⑤�� �����ν��硫대�ㅼ�� validation������ ��댁����� �����쇰㈃ submit瑜� 吏����������...
			if (!SmartWorks.GridLayout.validate(workSpacePage.find('.js_form_task_forward form'), $('.js_space_error_message'))) return false;
			
			smartPop.confirm(smartMessage.get("forwardConfirmation"), function(){
				try{
					var forms = workSpacePage.find('form');
					var isIworkView = (workSpacePage.hasClass('js_iwork_space_page') && isEmpty(workSpacePage.find('form[name="frmAccessSpace"]:visible')));
					var paramsJson = {};
					paramsJson['workId'] = workId;
					paramsJson['instanceId'] = instId;
					for(var i=0; i<forms.length; i++){
						var form = $(forms[i]);
						
						// ��쇱�� ��ㅻ����명�쇱�대㈃ formId��� formName 媛���� �����ы�����...
						if(form.attr('name') === 'frmSmartForm'){
							if(isIworkView) continue;
							paramsJson['formId'] = form.attr('formId');
							paramsJson['formName'] = form.attr('formName');
						}
						
						// ��쇱�대�� ��ㅺ����쇰�� ������ ��대�� ��쇱�� ������ 紐⑤�� �����ν��紐⑸�ㅼ�� JSON��������쇰�� Serialize ������...
						paramsJson[form.attr('name')] = mergeObjects(form.serializeObject(), SmartWorks.GridLayout.serializeObject(form));
					}
					console.log(JSON.stringify(paramsJson));
					var url = workSpacePage.hasClass('js_iwork_space_page') ? "forward_iwork_instance.sw" : "forward_pwork_instance.sw";			
					
					// ���鍮���ㅼ��泥� ���濡�洹몃����ㅻ��瑜� ���������寃� ������....
					var progressSpan = workSpacePage.find('.js_progress_span:first');
					smartPop.progressCont(progressSpan);
					
					// set_iwork_instance.sw���鍮���ㅻ�� ���泥�������..
					$.ajax({
						url : url,
						contentType : 'application/json',
						type : 'POST',
						data : JSON.stringify(paramsJson),
						success : function(data, status, jqXHR) {
							try{
								smartPop.closeProgress();
								var inlineTarget = input.parents('.js_content_target');
								if(isEmpty(inlineTarget)){
									refreshCurrentContent(workSpacePage);
								}else{
									inlineTarget.find('.js_cancel_inline_task_instance').attr('clickY', e.clientY).click();
								}
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_forward_work_instance ' + url + ']', null, error);
							}			
							return false;
						},
						error : function(xhr, ajaxOptions, e) {
							// ���鍮���� �����ъ�������� 硫����吏�瑜� 蹂댁�ъ＜怨� �����ы����댁����� 洹몃����� ���������...
							smartPop.showInfo(smartPop.ERROR, smartMessage.get("forwardWorkInstanceError"), function(){
								return false;
							}, e);
							smartPop.closeProgress();
						}
					});
				}catch(error){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_forward_work_instance]', null, error);
				}			
			},
			function(){
				return false;
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_forward_work_instance]', null, error);
		}			
		return false;
	});

	$('a.js_approval_work_instance').live('click', function(e){
		try{
			var input = $(targetElement(e));
			var workSpacePage = input.parents('.js_iwork_space_page:first, .js_pwork_space_page:first');
			if(isEmpty(workSpacePage)){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get("approvalWorkInstanceError"));
				return false;
			}
			var workId = workSpacePage.attr("workId");
			var instId = workSpacePage.attr("instId");
			var approvers = workSpacePage.find('.js_approval_box input[type="hidden"]');
			if(!isEmpty(approvers)){
				for(var i=0; i<approvers.length; i++){
					var approver = $(approvers[i]);
					var autoComplete = approver.parents('.js_approval_box').find('.js_auto_complete');
					if(isEmpty(approver.attr('value'))) autoComplete.addClass('required');
					else autoComplete.removeClass('required');
				}
			}
			// iwork_instance ��� ������ �����깊�������� ������ 紐⑤�� �����ν��硫대�ㅼ�� validation������ ��댁����� �����쇰㈃ submit瑜� 吏����������...
			if (!SmartWorks.GridLayout.validate(workSpacePage.find('.js_form_task_approval form'), $('.js_space_error_message'))) return false;
			
			smartPop.confirm(smartMessage.get("approvalConfirmation"), function(){
				try{
					var forms = workSpacePage.find('form');
					var paramsJson = {};
					paramsJson['workId'] = workId;
					paramsJson['instanceId'] = instId;
					for(var i=0; i<forms.length; i++){
						var form = $(forms[i]);
						
						// ��쇱�� ��ㅻ����명�쇱�대㈃ formId��� formName 媛���� �����ы�����...
						if(form.attr('name') === 'frmSmartForm'){
							paramsJson['formId'] = form.attr('formId');
							paramsJson['formName'] = form.attr('formName');
						}
						
						// ��쇱�대�� ��ㅺ����쇰�� ������ ��대�� ��쇱�� ������ 紐⑤�� �����ν��紐⑸�ㅼ�� JSON��������쇰�� Serialize ������...
						paramsJson[form.attr('name')] = mergeObjects(form.serializeObject(), SmartWorks.GridLayout.serializeObject(form));
					}
					console.log(JSON.stringify(paramsJson));
					var url = workSpacePage.hasClass('js_iwork_space_page') ? "approval_iwork_instance.sw" : "approval_pwork_instance.sw";			
					
					// ���鍮���ㅼ��泥� ���濡�洹몃����ㅻ��瑜� ���������寃� ������....
					var progressSpan = workSpacePage.find('.js_progress_span:first');
					smartPop.progressCont(progressSpan);
					
					// set_iwork_instance.sw���鍮���ㅻ�� ���泥�������..
					$.ajax({
						url : url,
						contentType : 'application/json',
						type : 'POST',
						data : JSON.stringify(paramsJson),
						success : function(data, status, jqXHR) {
							try{
								smartPop.closeProgress();
								var inlineTarget = input.parents('.js_content_target');
								if(isEmpty(inlineTarget)){
									refreshCurrentContent(workSpacePage);
								}else{
									inlineTarget.find('.js_cancel_inline_task_instance').attr('clickY', e.clientY).click();
								}
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_approval_work_instance ' + url + ']', null, error);
							}			
							return false;
						},
						error : function(xhr, ajaxOptions, e) {
							// ���鍮���� �����ъ�������� 硫����吏�瑜� 蹂댁�ъ＜怨� �����ы����댁����� 洹몃����� ���������...
							smartPop.showInfo(smartPop.ERROR, smartMessage.get("forwardWorkInstanceError"), function(){
								return false;
							}, e);
							smartPop.closeProgress();					
						}
					});
				}catch(error){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_approval_work_instance]', null, error);
				}			
			},
			function(){
				return false;
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_approval_work_instance]', null, error);
		}			
		return false;
	});

	$('a.js_delete_iwork_instance').live('click', function(e){
		smartPop.confirm(smartMessage.get('removeConfirmation'), function(){
			try{
				var input = $(targetElement(e));
				var iworkSpace = input.parents('.js_iwork_space_page:first');
				var repeatEventId = iworkSpace.attr('repeatEventId');
				var removeAllRepeatEvent = false;
				var workId = iworkSpace.attr("workId");
				var instId = iworkSpace.attr("instId");
				var isTempSaved = iworkSpace.attr("isTempSaved");
				var tempSavedId = iworkSpace.attr("tempSavedId");
	 			var paramsJson = {};
				paramsJson['workId'] = workId;
				paramsJson['instanceId'] = instId;
				paramsJson['isTempSaved'] = isTempSaved;
				paramsJson['tempSavedId'] = tempSavedId;
				if(!isEmpty(repeatEventId)){
					smartPop.confirm(smartMessage.get('removeAllRepeatConfirmation'), function(){
						try{
							paramsJson['repeatEventId'] = repeatEventId;
							console.log(JSON.stringify(paramsJson));
							var url = "remove_iwork_instance.sw";
							
							// ���鍮���ㅼ��泥� ���濡�洹몃����ㅻ��瑜� ���������寃� ������....
							var progressSpan = iworkSpace.find('.js_progress_span:first');
							smartPop.progressCont(progressSpan);
							
							// set_iwork_instance.sw���鍮���ㅻ�� ���泥�������..
							$.ajax({
								url : url,
								contentType : 'application/json',
								type : 'POST',
								data : JSON.stringify(paramsJson),
								success : function(data, status, jqXHR) {
									try{
									// ���蹂닿��由ъ��臾� 紐⑸�� �����댁��濡� ��대��������.....
									smartPop.closeProgress();
									var inlineTarget = input.parents('.js_content_target');
									if(isEmpty(inlineTarget)){
										$('.js_goto_work_list_btn:first').click();
									}else{
										inlineTarget.find('.js_cancel_inline_task_instance').attr('action', 'delete').attr('clickY', e.clientY).click();
									}
									}catch(error){
										smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_delete_iwork_instance]', null, error);
									}			
								},
								error : function(xhr, ajaxOptions, e) {
									// ���鍮���� �����ъ�������� 硫����吏�瑜� 蹂댁�ъ＜怨� �����ы����댁����� 洹몃����� ���������...
									smartPop.showInfo(smartPop.ERROR, smartMessage.get("removeIWorkInstanceError"), function(){
										return false;
									}, e);
									smartPop.closeProgress();					
								}
							});
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_delete_iwork_instance]', null, error);
						}			
					}, function(){
						try{
							console.log(JSON.stringify(paramsJson));
							var url = "remove_iwork_instance.sw";
							
							// ���鍮���ㅼ��泥� ���濡�洹몃����ㅻ��瑜� ���������寃� ������....
							var progressSpan = iworkSpace.find('.js_progress_span:first');
							smartPop.progressCont(progressSpan);
							
							// set_iwork_instance.sw���鍮���ㅻ�� ���泥�������..
							$.ajax({
								url : url,
								contentType : 'application/json',
								type : 'POST',
								data : JSON.stringify(paramsJson),
								success : function(data, status, jqXHR) {
									try{
										// ���蹂닿��由ъ��臾� 紐⑸�� �����댁��濡� ��대��������.....
										smartPop.closeProgress();
										var inlineTarget = input.parents('.js_content_target');
										if(isEmpty(inlineTarget)){
											$('.js_goto_work_list_btn:first').click();
										}else{
											inlineTarget.find('.js_cancel_inline_task_instance').attr('action', 'delete').attr('clickY', e.clientY).click();
										}
									}catch(error){
										smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_delete_iwork_instance remove_iwork_instance]', null, error);
									}			
								},
								error : function(xhr, ajaxOptions, e) {
									// ���鍮���� �����ъ�������� 硫����吏�瑜� 蹂댁�ъ＜怨� �����ы����댁����� 洹몃����� ���������...
									smartPop.showInfo(smartPop.ERROR, smartMessage.get("removeIWorkInstanceError"), function(){
										return false;
									}, e);
									smartPop.closeProgress();					
								}
							});					
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_delete_iwork_instance]', null, error);
						}			
					});
					$('#sw_pop_confirm .js_btn_ok .txt_btn_center').text(smartMessage.get('buttonYesAll'));
					$('#sw_pop_confirm .js_btn_cancel .txt_btn_center').text(smartMessage.get('buttonNoOne'));
				}else{
					console.log(JSON.stringify(paramsJson));
					var url = "remove_iwork_instance.sw";
					
					// ���鍮���ㅼ��泥� ���濡�洹몃����ㅻ��瑜� ���������寃� ������....
					var progressSpan = iworkSpace.find('.js_progress_span:first');
					smartPop.progressCont(progressSpan);
					
					// set_iwork_instance.sw���鍮���ㅻ�� ���泥�������..
					$.ajax({
						url : url,
						contentType : 'application/json',
						type : 'POST',
						data : JSON.stringify(paramsJson),
						success : function(data, status, jqXHR) {
							try{
								// ���蹂닿��由ъ��臾� 紐⑸�� �����댁��濡� ��대��������.....
								smartPop.closeProgress();
								var inlineTarget = input.parents('.js_content_target');
								if(isEmpty(inlineTarget)){
									$('.js_goto_work_list_btn:first').click();
								}else{
									inlineTarget.find('.js_cancel_inline_task_instance').attr('action', 'delete').attr('clickY', e.clientY).click();
								}
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_delete_iwork_instance remove_iwork_instance]', null, error);
							}			
						},
						error : function(xhr, ajaxOptions, e) {
							// ���鍮���� �����ъ�������� 硫����吏�瑜� 蹂댁�ъ＜怨� �����ы����댁����� 洹몃����� ���������...
							smartPop.showInfo(smartPop.ERROR, smartMessage.get("removeIWorkInstanceError"), function(){
								return false;
							}, e);
							smartPop.closeProgress();					
						}
					});
				}
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_delete_iwork_instance]', null, error);
			}						
		},
		function(){
			return false;
		});
		return false;
	});

	$('a.js_perform_task_instance').live('click', function(e){
		try{
			var input = $(targetElement(e)).parents('a.js_perform_task_instance');
			var pworkSpace = input.parents('.js_pwork_space_page:first');
			var workId = pworkSpace.attr("workId");
			var instId = pworkSpace.attr("instId");
			var formContent = pworkSpace.find('.js_submit_forms div.js_form_content');
			var taskInstId = formContent.attr("taskInstId");
			// iwork_instance ��� ������ �����깊�������� ������ 紐⑤�� �����ν��硫대�ㅼ�� validation������ ��댁����� �����쇰㈃ submit瑜� 吏����������...
			if (!SmartWorks.GridLayout.validate(formContent.find('form.js_validation_required'), $('.js_space_error_message'))) return false;
			
			smartPop.confirm(smartMessage.get("performConfirmation"), function(){
				try{
					var forms = formContent.find('form');
					var paramsJson = {};
					paramsJson['workId'] = workId;
					paramsJson['instanceId'] = instId;
					paramsJson['taskInstId'] = taskInstId;
					for(var i=0; i<forms.length; i++){
						var form = $(forms[i]);
						
						// ��쇱�� ��ㅻ����명�쇱�대㈃ formId��� formName 媛���� �����ы�����...
						if(form.attr('name') === 'frmSmartForm'){
							paramsJson['formId'] = form.attr('formId');
							paramsJson['formName'] = form.attr('formName');
						}
						
						// ��쇱�대�� ��ㅺ����쇰�� ������ ��대�� ��쇱�� ������ 紐⑤�� �����ν��紐⑸�ㅼ�� JSON��������쇰�� Serialize ������...
						paramsJson[form.attr('name')] = mergeObjects(form.serializeObject(), SmartWorks.GridLayout.serializeObject(form));
					}
					console.log(JSON.stringify(paramsJson));
					var url = "perform_task_instance.sw";
					
					// ���鍮���ㅼ��泥� ���濡�洹몃����ㅻ��瑜� ���������寃� ������....
					var progressSpan = pworkSpace.find('.js_progress_span:first');
					smartPop.progressCont(progressSpan);
					// perform_task_instance.sw���鍮���ㅻ�� ���泥�������..
					$.ajax({
						url : url,
						contentType : 'application/json',
						type : 'POST',
						data : JSON.stringify(paramsJson),
						success : function(data, status, jqXHR) {
							try{
								// ��깃났������ ���濡�洹몃����ㅻ��瑜� ���嫄고��怨� ��깃났硫����吏�瑜� 蹂댁�ъ�����...
								var inlineTarget = input.parents('.js_content_target');
								if(isEmpty(inlineTarget)){
									var lastHref = pworkSpace.attr('lastHref');
									if(isEmpty(lastHref))
										document.location.href = "pwork_list.sw?cid=pw.li." + workId;
									else
										document.location.href = lastHref;
								}else{
									inlineTarget.find('.js_cancel_inline_task_instance').attr('action', 'perform').attr('clickY', e.clientY).click();
								}
								smartPop.closeProgress();
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_perform_task_instance ' + url + ']', null, error);
							}
							return;
						},
						error : function(xhr, ajaxOptions, e) {
							// ���鍮���� �����ъ�������� 硫����吏�瑜� 蹂댁�ъ＜怨� �����ы����댁����� 洹몃����� ���������...
							smartPop.showInfo(smartPop.ERROR, smartMessage.get("performTaskInstanceError"), function(){
								return;
							}, e);
							smartPop.closeProgress();					
						}
					});
				}catch(error){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_perform_task_instance]', null, error);
				}			
			},
			function(){
				return false;
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_perform_task_instance]', null, error);
		}			
		return false;
	});

	$('a.js_return_task_instance').live('click', function(e){
		try{
			var input = $(targetElement(e)).parents('a.js_return_task_instance');
			var pworkSpace = input.parents('.js_pwork_space_page:first');
			var workId = pworkSpace.attr("workId");
			var instId = pworkSpace.attr("instId");
			var formContent = pworkSpace.find('.js_submit_forms div.js_form_content');
			var taskInstId = formContent.attr("taskInstId");
			
			smartPop.confirm(smartMessage.get("returnConfirmation"), function(){
				try{
					var forms = formContent.find('form');
					var paramsJson = {};
					paramsJson['workId'] = workId;
					paramsJson['instanceId'] = instId;
					paramsJson['taskInstId'] = taskInstId;
					for(var i=0; i<forms.length; i++){
						var form = $(forms[i]);
						
						// ��쇱�� ��ㅻ����명�쇱�대㈃ formId��� formName 媛���� �����ы�����...
						if(form.attr('name') === 'frmSmartForm'){
							paramsJson['formId'] = form.attr('formId');
							paramsJson['formName'] = form.attr('formName');
						}
						
						// ��쇱�대�� ��ㅺ����쇰�� ������ ��대�� ��쇱�� ������ 紐⑤�� �����ν��紐⑸�ㅼ�� JSON��������쇰�� Serialize ������...
						paramsJson[form.attr('name')] = mergeObjects(form.serializeObject(), SmartWorks.GridLayout.serializeObject(form));
					}
					console.log(JSON.stringify(paramsJson));
					var url = "return_task_instance.sw";
					
					// ���鍮���ㅼ��泥� ���濡�洹몃����ㅻ��瑜� ���������寃� ������....
					var progressSpan = pworkSpace.find('.js_progress_span:first');
					smartPop.progressCont(progressSpan);
					
					// perform_task_instance.sw���鍮���ㅻ�� ���泥�������..
					$.ajax({
						url : url,
						contentType : 'application/json',
						type : 'POST',
						data : JSON.stringify(paramsJson),
						success : function(data, status, jqXHR) {
							try{
								// ��깃났������ ���濡�洹몃����ㅻ��瑜� ���嫄고��怨� ��깃났硫����吏�瑜� 蹂댁�ъ�����...
								var inlineTarget = input.parents('.js_content_target');
								if(isEmpty(inlineTarget)){
									var lastHref = pworkSpace.attr('lastHref');
									if(isEmpty(lastHref))
										document.location.href = "pwork_list.sw?cid=pw.li." + workId;
									else
										document.location.href = lastHref; 
								}else{
									inlineTarget.find('.js_cancel_inline_task_instance').attr('action', 'return').attr('clickY', e.clientY).click();
								}
								smartPop.closeProgress();
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_return_task_instance]', null, error);
							}			
							return;
						},
						error : function(xhr, ajaxOptions, e) {
							// ���鍮���� �����ъ�������� 硫����吏�瑜� 蹂댁�ъ＜怨� �����ы����댁����� 洹몃����� ���������...
							smartPop.showInfo(smartPop.ERROR, smartMessage.get("returnTaskInstanceError"), function(){
								return;
							}, e);
							smartPop.closeProgress();					
						}
					});
				}catch(error){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_return_task_instance]', null, error);
				}			
			},
			function(){
				return false;
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_return_task_instance]', null, error);
		}			
		return false;
	});

	$('a.js_temp_save_task_instance').live('click', function(e){
		try{
			var input = $(targetElement(e)).parents('a.js_temp_save_task_instance');
			var pworkSpace = input.parents('.js_pwork_space_page:first');
			var workId = pworkSpace.attr("workId");
			var instId = pworkSpace.attr("instId");
			var formContent = pworkSpace.find('.js_submit_forms div.js_form_content');
			var taskInstId = formContent.attr("taskInstId");
			
			smartPop.confirm(smartMessage.get("tempSaveConfirmation"), function(){
				try{
					var forms = formContent.find('form');
					var paramsJson = {};
					paramsJson['workId'] = workId;
					paramsJson['instanceId'] = instId;
					paramsJson['taskInstId'] = taskInstId;
					for(var i=0; i<forms.length; i++){
						var form = $(forms[i]);
						
						// ��쇱�� ��ㅻ����명�쇱�대㈃ formId��� formName 媛���� �����ы�����...
						if(form.attr('name') === 'frmSmartForm'){
							paramsJson['formId'] = form.attr('formId');
							paramsJson['formName'] = form.attr('formName');
						}
						
						// ��쇱�대�� ��ㅺ����쇰�� ������ ��대�� ��쇱�� ������ 紐⑤�� �����ν��紐⑸�ㅼ�� JSON��������쇰�� Serialize ������...
						paramsJson[form.attr('name')] = mergeObjects(form.serializeObject(), SmartWorks.GridLayout.serializeObject(form));
					}
					console.log(JSON.stringify(paramsJson));
					var url = "temp_save_task_instance.sw";
					
					// ���鍮���ㅼ��泥� ���濡�洹몃����ㅻ��瑜� ���������寃� ������....
					var progressSpan = pworkSpace.find('.js_progress_span:first');
					smartPop.progressCont(progressSpan);
					
					// perform_task_instance.sw���鍮���ㅻ�� ���泥�������..
					$.ajax({
						url : url,
						contentType : 'application/json',
						type : 'POST',
						data : JSON.stringify(paramsJson),
						success : function(data, status, jqXHR) {
							try{
								// ��깃났������ ���濡�洹몃����ㅻ��瑜� ���嫄고��怨� ��깃났硫����吏�瑜� 蹂댁�ъ�����...
								smartPop.closeProgress();
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_temp_save_task_instance]', null, error);
							}			
							return;
						},
						error : function(xhr, ajaxOptions, e) {
							// ���鍮���� �����ъ�������� 硫����吏�瑜� 蹂댁�ъ＜怨� �����ы����댁����� 洹몃����� ���������...
							if(xhr.responseText === "duplicateKeyException")
								smartPop.showInfo(smartPop.ERROR, smartMessage.get("duplicateKeyException"), null, e);
							else
								smartPop.showInfo(smartPop.ERROR, smartMessage.get("tempSaveTaskInstanceError"), function(){
								return;
							}, e);
							smartPop.closeProgress();					
						}
					});
				}catch(error){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_temp_save_task_instance]', null, error);
				}			
			},
			function(){
				return false;
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_temp_save_task_instance]', null, error);
		}			
		return false;
	});

	$('a.js_reassign_task_instance').live('click', function(e){
		try{
			var input = $(targetElement(e)).parents('a.js_reassign_task_instance');
			var pworkSpace = input.parents('.js_pwork_space_page:first');
			var workId = pworkSpace.attr("workId");
			var instId = pworkSpace.attr("instId");
			var formContent = pworkSpace.find('.js_submit_forms div.js_form_content');
			var taskInstId = formContent.attr("taskInstId");
			smartPop.reassignPerformer(workId, instId, taskInstId);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_reassign_task_instance]', null, error);
		}			
		return false;
	});

	$('a.js_cancel_inline_task_instance').live('click', function(e){
		var input = $(targetElement(e));
		if(!input.hasClass('js_cancel_inline_task_instance')) input = input.parents('.js_cancel_inline_task_instance');
		
		var inlineContent = input.parents('.js_inline_content:first');
		if(isEmpty(inlineContent)){
			inlineContent = input.parents('li.js_space_sub_instance:first');
		}
		if(isEmpty(inlineContent)){
			inlineContent = input.parents('tr:first').prev();
		}
		if(isEmpty(inlineContent)){
			inlineContent = input.parents('.js_content_target:first').prev();
		}
		
		var contentTarget = input.parents('.js_content_target:first');
		var action = input.attr('action');
		var clickY = (isEmpty(e.clientY)) ? parseInt(input.attr('clickY')) : e.clientY;
		$('html body').animate({ scrollTop: inlineContent.offset().top-clickY+50 }, 'slow');
		contentTarget.slideUp('slow', function(){
			contentTarget.html('');
			if(action === 'perform' || action === 'return' || action === 'reassign' || action === 'forward' || action === 'approval' || action === 'delete' || action === 'save'){
				if(inlineContent.hasClass('js_more_instance_item')){
					inlineContent.slideUp('slow', function(){
						inlineContent.remove();
						updateRecentOnSpace();
					});
				}else if(inlineContent.hasClass('js_space_sub_instance')){
					inlineContent.slideUp('slow', function(){
						var removedHeight =  inlineContent.height();
						inlineContent.prevAll().each(function(){removedHeight += $(this).height();});
						console.log('removedHeight=' + removedHeight + ', inlineContent.height()=' + inlineContent.height());
						$.when(inlineContent.prevAll().remove()).done(function(){$.when(inlineContent.remove()).done(function(){
								$('html body').scrollTop($('html body').scrollTop() - removedHeight);
								updateRecentOnSpace();
							});
						});						
					});
				}else{
					updateRecentOnSpace();
				}
				return false;
			}
			
			if(inlineContent.hasClass('js_work_instance_list')){
				contentTarget.show().parent().hide();
				inlineContent.children('td').css('border-bottom', contentTarget.css('border-bottom'));
			}
		});
		return false;
	});

	$('a.js_delete_pwork_instance').live('click', function(e){
		smartPop.confirm(smartMessage.get('removeConfirmation'), function(){
			try{
				var input = $(targetElement(e));
				var pworkSpace = input.parents('.js_pwork_space_page:first');
				var workId = pworkSpace.attr("workId");
				var instId = pworkSpace.attr("instId");
				var lastHref = pworkSpace.attr("lastHref");
				
				var isTempSaved = pworkSpace.attr("isTempSaved");
				var tempSavedId = pworkSpace.attr("tempSavedId");
	
				var paramsJson = {};
				paramsJson['workId'] = workId;
				paramsJson['instanceId'] = instId;
	
				paramsJson['isTempSaved'] = isTempSaved;
				paramsJson['tempSavedId'] = tempSavedId;
				
				console.log(JSON.stringify(paramsJson));
				var url = "remove_pwork_instance.sw";
				
				// ���鍮���ㅼ��泥� ���濡�洹몃����ㅻ��瑜� ���������寃� ������....
				var progressSpan = pworkSpace.find('.js_progress_span:first');
				smartPop.progressCont(progressSpan);
				
				// set_iwork_instance.sw���鍮���ㅻ�� ���泥�������..
				$.ajax({
					url : url,
					contentType : 'application/json',
					type : 'POST',
					data : JSON.stringify(paramsJson),
					success : function(data, status, jqXHR) {
						try{
							// ���蹂닿��由ъ��臾� 紐⑸�� �����댁��濡� ��대��������.....
							smartPop.closeProgress();
							document.location.href = lastHref;					
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_delete_pwork_instance ' + url + ']', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, e) {
						// ���鍮���� �����ъ�������� 硫����吏�瑜� 蹂댁�ъ＜怨� �����ы����댁����� 洹몃����� ���������...
						smartPop.showInfo(smartPop.ERROR, smartMessage.get("removeIWorkInstanceError"), function(){
							return false;
						}, e);
						smartPop.closeProgress();					
					}
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_delete_pwork_instance]', null, error);
			}						
		},
		function(){
			return false;
		});
		return false;
	});

	$('.js_more_instance_tasks').live('click', function(e){
		try{
			var input = $(targetElement(e)).parents('.js_more_instance_tasks:first');

			var pworkSpace = input.parents('.js_pwork_space_page:first');
			var workId = pworkSpace.attr("workId");
			var instId = pworkSpace.attr("instId");
			var fromTaskInstId = input.attr('fromTaskInstId');
			var toTaskInstId = input.attr('toTaskInstId');
			var targetTaskDef = input.attr('targetTaskDef');
			var startCount = input.attr('startCount');
			var pageId = input.attr('pageId');

			var url = "more_pwork_space.sw";
			
			// ���鍮���ㅼ��泥� ���濡�洹몃����ㅻ��瑜� ���������寃� ������....
			var progressSpan = pworkSpace.find('.js_progress_span:first');
			smartPop.progressCont(progressSpan);
			
			// set_iwork_instance.sw���鍮���ㅻ�� ���泥�������..
			$.ajax({
				url : url,
				data : {
					workId : workId,
					instanceId : instId,
					fromTaskInstId : fromTaskInstId,
					toTaskInstId : toTaskInstId,
					targetTaskDef : targetTaskDef,
					startCount : startCount,
					clientY : e.clientY,
					pageId : pageId
				},
				success : function(data, status, jqXHR) {
					try{
						var moveTarget = input.next();
						input.replaceWith(data);
						smartPop.closeProgress();
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_more_pwork_space ' + url + ']', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, e) {
					smartPop.closeProgress();					
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_more_pwork_space]', null, error);
		}						
		return false;
	});

	$('input.js_file_upload').live('change', function(e) {
		try{
			var input = $(targetElement(e));
			var newInput = document.createElement( 'input' );
			newInput.type = 'file';
			$(newInput).addClass('js_file_upload');
			
			input.parent().add( newInput);
	//		e.target.style.display = 'none';
			var target = input.parent().next('div.js_selected_files');
			var oldHTML = target.html();
			if (oldHTML == null)
				oldHTML = "";		
			var newHTML = oldHTML
			+ "<span class='js_file_item user_select' >"
			+ input.attr('value')
			+ "<span class='btn_x_gr'><a class='js_remove_file' href=''> x</a></span></span>";
			target.html(newHTML);
			$(target).find('span.js_file_item').add(targetElement(e));
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_file_upload]', null, error);
		}			
	});

	$('.qq-delete-text').live('click', function(e) {
		$.ajax({
			url : "delete_file.sw",
			data : {
				fileId : $(targetElement(e)).parent('li').attr('fileId'),
				fileName : $(targetElement(e)).siblings('a').attr('filename')
			},
			type : "POST",
			context : this,
			success : function(data, status, jqXHR) {
				try{
	        		var input = $(targetElement(e));
	        		input.parents('td.js_type_imageBox:first').find('img.js_auto_picture').removeAttr("src");
					$(targetElement(e)).parent().remove();
				}catch(error){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work qq-delete-text]', null, error);
				}			
			},
			error : function(xhr, ajaxOptions, thrownError){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work qq-delete-text]', null, thrownError);
			}
		});
		return false;
	});

	$('.js_pop_all_works').live('click', function(e) {
		try{
			var startWork = $(targetElement(e)).parents('.js_start_work_page');
			var target = startWork.find('.js_all_work_popup');
			var width = startWork.find('.js_auto_complete:first').parent().outerWidth();
			smartPop.selectWork(target, width);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_pop_all_works]', null, error);
		}			
		return false;
	});

	$('a.js_todaypicker_button').live('click', function(e) {
		try{
			var input = $(targetElement(e)).parent();
			input.prevAll('.js_todaypicker').datepicker("show");
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_todaypicker_button]', null, error);
		}			
		return false;
	});

	$('a.js_timepicker_button').live('click', function(e) {
		try{
			var input = $(targetElement(e)).parent();
			input.prevAll('.js_timepicker').timepicker("show");
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_timepicker_button]', null, error);
		}			
		return false;
	});
	
	$('a.js_todaytimepicker_button').live('click', function(e) {
		try{
			var input = $(targetElement(e)).parent();
			input.prevAll('.js_todaytimepicker').datetimepicker("show");
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_todaytimepicker_button]', null, error);
		}			
		return false;
	});

	var MAX_USERPICKER_HEIGHT = 330;
	$('a.js_userpicker_button').live('click', function(e) {
		try{
			var input = $(targetElement(e)).parents('.js_userpicker_button');
			if(input.hasClass('js_selected_approver_info')){
				var appendTaskApproval = input.parents('.js_append_task_approval_page');
				var approvalLineBox = appendTaskApproval.find('.js_approval_line_box');
				var inputPosition = input.position(); 
				var approvalLineBoxPosition = approvalLineBox.position(); 
				target = approvalLineBox.nextAll('.js_community_popup');
				listWidth = 360;
				listTop = inputPosition.top + input.height();
				listLeft = inputPosition.left;
				var widthGap = listWidth - (approvalLineBox.width() - (inputPosition.left - approvalLineBoxPosition.left));
				if(widthGap>0)
					listLeft = listLeft-widthGap;
				
				target.css({ "top" : listTop + "px"});
				target.css({ "left" : listLeft + "px"});
				target.css({ "position" : "absolute"});
				smartPop.selectUser(input, target, listWidth, false);			
			}else if(!isEmpty(input.parents('.js_search_filter_page'))){
				var userField = $(targetElement(e)).parents('.js_type_userField:first');
				var communityItems = userField.find('.js_community_item');
				var target = userField.find('.js_community_popup:first');
				smartPop.selectUser(communityItems, target, 360, false);
			}else{
				var userField = $(targetElement(e)).parents('.js_type_userField:first');
				var communityItems = userField.find('.js_community_item');
				var target = userField.find('.js_community_popup:first');
				var width = userField.find('.form_value').find('div:first').width();
				var isMultiUsers = userField.attr('multiUsers');
	
				var documentHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
				if($.browser.msie) documentHeight = document.body.scrollHeight;
				var inputPosition = input.position();
				var inputOffset = input.offset();
				var listTop = inputOffset.top + input.height();
				var bottomUp = false;
				if(listTop + MAX_USERPICKER_HEIGHT > documentHeight){
					target.css({ "bottom" : inputPosition.top + "px"});
					target.css({ "position" : "absolute"});
					bottomUp = true;
				}
				smartPop.selectUser(communityItems, target, width, isMultiUsers, null, null, bottomUp);
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_userpicker_button]', null, error);
		}			
		return false;
	});

	$('a.js_emailpicker_button').live('click', function(e) {
		try{
			var userField = $(targetElement(e)).parents('.js_type_userField:first');
			var communityItems = userField.find('.js_community_item');
			var target = userField.find('.js_community_popup:first');
			var width = userField.find('.form_value').find('div:first').width();
			var isMultiUsers = userField.attr('multiUsers');
	
			var documentHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
			var inputPosition = userField.position();
			var inputOffset = userField.offset();
			var listTop = inputOffset.top + userField.height();
			var bottomUp = false;
	//		if(listTop + MAX_USERPICKER_HEIGHT > documentHeight){
	//			target.css({ "bottom" : inputPosition.top + "px"});
	//			target.css({ "position" : "absolute"});
	//			bottomUp = true;
	//		}
			smartPop.selectEmailAddress(communityItems, target, width, isMultiUsers, bottomUp);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_emailpicker_button]', null, error);
		}			
		return false;
	});

	$('a.js_communitypicker_button').live('click', function(e) {
		try{
			var userField = $(targetElement(e)).parents('.js_type_userField:first');
			var communityItems = userField.find('.js_community_item');
			var target = userField.find('.js_community_popup:first');
			var width = userField.find('.form_value').find('div:first').width();
			var isMultiUsers = userField.attr('multiUsers');
	
			var documentHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
			var inputPosition = userField.position();
			var inputOffset = userField.offset();
			var listTop = inputOffset.top + userField.height();
			var bottomUp = false;
			smartPop.selectCommunity(communityItems, target, width, isMultiUsers, bottomUp);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_communitypicker_button]', null, error);
		}			
		return false;
	});

	$('a.js_departpicker_button').live('click', function(e) {
		try{
			var departField = $(targetElement(e)).parents('.js_type_departmentField:first');
			var communityItems = departField.find('.js_community_item');
			var target = departField.find('.js_community_popup:first');
			var width = departField.find('.form_value').find('div:first').width();
			var isMultiUsers = departField.attr('multiUsers');
	
			var documentHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
			var inputPosition = departField.position();
			var inputOffset = departField.offset();
			var listTop = inputOffset.top + departField.height();
			var bottomUp = false;
	//		if(listTop + MAX_USERPICKER_HEIGHT > documentHeight){
	//			target.css({ "bottom" : inputPosition.top + "px"});
	//			target.css({ "position" : "absolute"});
	//			bottomUp = true;
	//		}
			smartPop.selectDepartment(communityItems, target, width, isMultiUsers, bottomUp);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_departpicker_button]', null, error);
		}			
		return false;
	});

	$('a.js_workitempicker_button').live('click', function(e) {
		try{
			var target = $(targetElement(e)).parents('td.js_type_refFormField:first');
			var formId = target.attr('refForm');
			if(isEmpty(formId)){
				smartPop.showInfo(smartPop.WARN, smartMessage.get("noRefFormDefinedError"));
				return false;
			}
			smartPop.selectWorkItem(formId, target);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_workitempicker_button]', null, error);
		}			
		return false;
	});
	
	$('.js_type_radioButton input').live('click', function(e){
		try{
			var target = $(targetElement(e)).parents('.js_type_radioButton').find('.sw_required');
			if(target.hasClass('sw_error')){
				target.removeClass('sw_error');
				target.parents('form.js_validation_required:first').validate({ showErrors: showErrors}).form();
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_type_radioButton]', null, error);
		}			
	});

	$('a.js_toggle_forward_btn').live('click',function(e) {
		try{
			var input = $(targetElement(e));
			var workSpacePage = input.parents('.js_iwork_space_page:first, .js_pwork_space_page:first');
			var isPworkSpace = workSpacePage.hasClass('js_pwork_space_page');
			var target = (isPworkSpace) ? workSpacePage.find('.js_form_task_forward') : input.parents('.js_form_header').siblings('.js_form_task_forward');
			if(target.is(':visible')){
				target.hide().html('');
				if(!isEmpty(workSpacePage)){
					if(isPworkSpace){
						var formMode = workSpacePage.attr("formMode");
						if(formMode==="edit"){
							workSpacePage.find('.js_btn_complete').show().siblings().hide();
							workSpacePage.find('.js_btn_return').show();
							workSpacePage.find('.js_btn_reassign').show();
							workSpacePage.find('.js_btn_temp_save').show();
						}else{
							workSpacePage.find('.js_btn_complete').hide().siblings().hide();
						}					
					}else{
						workSpacePage.find('.js_btn_save').show().siblings().hide();						
						workSpacePage.find('.js_btn_modify').show();					
					}
				}
				return false;
			}
			if((isPworkSpace && target.is(":visible")) || (!isPworkSpace && !isEmpty(input.parents('.js_form_header').siblings('.js_form_task_forward:visible')))) return false;
			$.ajax({
				url : 'append_task_forward.sw',
				data : {},
				success : function(data, status, jqXHR) {
					try{
						target.html(data).show();
						if(!isEmpty(workSpacePage)){
							workSpacePage.find('.js_btn_do_forward').show().siblings().hide();
							workSpacePage.find('.js_btn_cancel').show();
						}
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_toggle_forward_btn append_task_forward]', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, thrownError){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_toggle_forward_btn append_task_forward]', null, thrownError);
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_toggle_forward_btn]', null, error);
		}			
		return false;
	});

	$('a.js_toggle_approval_btn').live('click',function(e) {
		try{
			var input = $(targetElement(e));
			var workSpacePage = input.parents('.js_iwork_space_page:first, .js_pwork_space_page:first');
			var isPworkSpace = workSpacePage.hasClass('js_pwork_space_page');
			var target = (isPworkSpace) ? workSpacePage.find('.js_form_task_approval') : input.parents('.js_form_header').siblings('.js_form_task_approval');
			if(target.is(':visible')){
				target.hide().html('');
				if(!isEmpty(workSpacePage)){
					if(isPworkSpace){
						workSpacePage.find('.js_btn_complete').show().siblings().hide();
						workSpacePage.find('.js_btn_return').show();
						workSpacePage.find('.js_btn_reassign').show();
						workSpacePage.find('.js_btn_temp_save').show();
					}else{
						workSpacePage.find('.js_btn_save').show().siblings().hide();						
						workSpacePage.find('.js_btn_modify').show();					
					}
				}
				return false;
			}
			if(!isEmpty(input.parents('.js_form_header').siblings('.js_form_task:visible')) || (isPworkSpace && !isEmpty(workSpacePage.find('.js_form_task:visible')))) return false;
			$.ajax({
				url : 'append_task_approval.sw',
				data : {},
				success : function(data, status, jqXHR) {
					try{
						target.html(data).show();
						if(!isEmpty(workSpacePage)){
							workSpacePage.find('.js_btn_do_approval').show().siblings().hide();
							workSpacePage.find('.js_btn_cancel').show();
						}
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_toggle_approval_btn]', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, thrownError){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_toggle_approval_btn append_task_approval]', null, thrownError);
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_toggle_approval_btn]', null, error);
		}			
		return false;
	});

	$('a.js_email_content_btn').live('click',function(e) {
		try{
			var input = $(targetElement(e));
			var workSpacePage = input.parents('.js_iwork_space_page:first, .js_pwork_space_page:first');
			if(isEmpty(workSpacePage)) return false;
			var target = $('#content');
			var hostNPort = getHostNPort();
			var header = 	'<link href="' + hostNPort + '/smartworksV3/css/default.css?v=3.5" type="text/css" rel="stylesheet" />' +
			'<link href="' + hostNPort + '/smartworksV3/css/black/media.css?v=3.5" type="text/css" media="all" rel="stylesheet" />' +
			'<link href="' + hostNPort + '/smartworksV3/css/black/layout.css?v=3.5" type="text/css" media="all" rel="stylesheet" />' +
			'<link href="' + hostNPort + '/smartworksV3/css/black/detail.css?v=3.5" type="text/css" media="all" rel="stylesheet" />' +
			'<link href="' + hostNPort + '/smartworksV3/css/black/form.css?v=3.5" type="text/css" media="all" rel="stylesheet" />' +
			'<link href="' + hostNPort + '/smartworksV3/css/black/print.css?v=3.5" type="text/css" media="all" rel="stylesheet" />' +
			'<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
			var companyLogoSrc = $('.js_company_logo_src').attr('src');
			var topLogo = $('<div class="company_logo_print"><img src="' + companyLogoSrc + '" /><div>' + currentUser.company + '</div></div>');
			var bottomLogo = $('<div class="footer"><img src="' + hostNPort + '/smartworksV3/images/footer_sw_logo.jpg"></div>');
			var body = $('ul.portlet_r').clone();
			body.find('#js_copy_address').parents('.txt_btn').remove();
			body.find('.js_toggle_forward_btn').remove();
			body.find('.js_toggle_approval_btn').remove();
			body.find('.js_email_content_btn').remove();
			body.find('.js_print_content_btn').remove();
			body.find('.js_view_instance_diagram').remove();
							
			body.find('.js_more_instance_tasks').removeClass('js_more_instance_tasks').find('a').removeAttr('href');
			body.find('a.js_content').removeClass('js_content').removeAttr('href');
			body.find('.js_inline_content').removeClass('js_inline_content');
			body.find('a.js_pop_user_info').removeClass('js_pop_user_info').removeAttr('href');
			body.find('a.goto_detail').remove();
			body.find('.js_coming_tasks').remove();
			body.find('.js_action_btns').remove();
			body.find('.js_toggle_forward_histories').removeClass('js_toggle_forward_histories').removeAttr('href');
			body.find('.js_toggle_download_histories').removeClass('js_toggle_download_histories').removeAttr('href');
			body.find('.js_toggle_update_histories').removeClass('js_toggle_update_histories').removeAttr('href');
			body.find('.js_toggle_related_instances').removeClass('js_toggle_related_instances').removeAttr('href');
			body.find('.form_wrap').css('height', 'auto');
			body.find('.js_instance_histories').css('padding-bottom', '20px');	
			
			body.find('.body_titl_pic .solid_line').before(topLogo);
			body.find('input[type="hidden"]').remove();
			if(workSpacePage.hasClass('js_iwork_space_page'))
				body.find('.js_form_content').removeClass('up');
			body.find('.glo_btn_space span.btn_gray').remove();
			body.find('.glo_btn_space span.js_space_error_message').remove();
			body.find('.glo_btn_space').append(bottomLogo);
			body.find('a').attr('userDetail', '');
			body.find('textarea').css({height:"56px"});
			body.html(body.html().replace(/\"images\//g, "\"" + hostNPort + "/smartworksV3/images/"));
			body.html(body.html().replace(/textarea/g,  "div"));
			var contents = '<html><head>' + header + '</head><body><br/><br/><br/><div id="wrap_print" class="print"><div>' + body.html() + '</div></div><br/><br/><br/></body></html>';
			
			var paramsJson = {};
			paramsJson['contents'] = contents;
			$.ajax({
				url : "new_mail_post.sw",
				contentType : 'application/json',
				type : 'POST',
				data : JSON.stringify(paramsJson),
				success : function(data, status, jqXHR) {
					try{
						target.html(data).show();
						setTimeout(function(){
							$('iframe').contents().find('iframe').contents().find('iframe').css('visibility', 'hidden');							
						}, 1000);
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_mail_content_btn new_mail_post]', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, thrownError){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_mail_content_btn new_mail_post]', null, thrownError);
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_mail_content_btn]', null, error);
		}			
		return false;
	});

	$('.js_print_content_btn').live("click", function(e){
		try{
			var input = $(targetElement(e));
			var workSpacePage = input.parents('.js_iwork_space_page:first, .js_pwork_space_page:first, .js_mail_space_page:first');
			if(isEmpty(workSpacePage)) return false;
			var isMailSpace = workSpacePage.hasClass('js_mail_space_page');
			var hostNPort = getHostNPort();
			var header = 	'<link href="' + hostNPort + '/smartworksV3/css/default.css?v=3.5" type="text/css" media="all" rel="stylesheet" />' +
			'<link href="' + hostNPort + '/smartworksV3/css/black/media.css?v=3.5" type="text/css" media="all" rel="stylesheet" />' +
			'<link href="' + hostNPort + '/smartworksV3/css/black/layout.css?v=3.5" type="text/css" media="all" rel="stylesheet" />' +
			'<link href="' + hostNPort + '/smartworksV3/css/black/detail.css?v=3.5" type="text/css" media="all" rel="stylesheet" />' +
			'<link href="' + hostNPort + '/smartworksV3/css/black/form.css?v=3.5" type="text/css" media="all" rel="stylesheet" />' +
			'<link href="' + hostNPort + '/smartworksV3/css/black/print.css?v=3.5" type="text/css" media="all" rel="stylesheet" />' +
			'<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
			var companyLogoSrc = $('.js_company_logo_src').attr('src');
			var topLogo = $('<div class="company_logo_print"><img src="' + companyLogoSrc + '" /><div>' + currentUser.company + '</div></div>');
			var bottomLogo = $('<div class="footer"><img src="' + hostNPort + '/smartworksV3/images/footer_sw_logo.jpg"></div>');
			var body = $('ul.portlet_r').clone();
			if(isMailSpace){
				body = $('ul.portlet_r .mail_list_section').clone();
				body.find('.move_btn_space').remove();
			}else{
				body.find('#js_copy_address').parents('.txt_btn').remove();
				body.find('.js_toggle_forward_btn').remove();
				body.find('.js_toggle_approval_btn').remove();
				body.find('.js_email_content_btn').remove();
				body.find('.js_print_content_btn').remove();
				body.find('.js_view_instance_diagram').remove();
				
				body.find('.js_more_instance_tasks').removeClass('js_more_instance_tasks').find('a').removeAttr('href');
				body.find('a.js_content').removeClass('js_content').removeAttr('href');
				body.find('.js_inline_content').removeClass('js_inline_content');
				body.find('a.js_pop_user_info').removeClass('js_pop_user_info').removeAttr('href');
				body.find('a.goto_detail').remove();
				body.find('.js_coming_tasks').remove();
				body.find('.js_action_btns').remove();
				body.find('.js_toggle_forward_histories').removeClass('js_toggle_forward_histories').removeAttr('href');
				body.find('.js_toggle_download_histories').removeClass('js_toggle_download_histories').removeAttr('href');
				body.find('.js_toggle_update_histories').removeClass('js_toggle_update_histories').removeAttr('href');
				body.find('.js_toggle_related_instances').removeClass('js_toggle_related_instances').removeAttr('href');
				body.find('.form_wrap').css('height', 'auto');
				body.find('.js_instance_histories').css('padding-bottom', '20px');	
				
				body.find('.body_titl_pic .solid_line').before(topLogo);
				body.find('input[type="hidden"]').remove();
				if(workSpacePage.hasClass('js_iwork_space_page'))
					body.find('.js_form_content').removeClass('up');
				body.find('.glo_btn_space span.btn_gray').remove();
				body.find('.glo_btn_space').append(bottomLogo);
				body.find('a').attr('userDetail', '');
				body.find('textarea').css({height:"56px"});
			}
			body.html(body.html().replace(/\"images\//g, "\"" + hostNPort + "/smartworksV3/images/"));
			body.html(body.html().replace(/textarea/g,  "div"));
			var contents = '<div id="' + ((isMailSpace) ? 'wrap_noborder_print' : 'wrap_print') + '" style="overflow:auto;"><div>' + body.html() + '</div><div class="info tr js_print_info">' + smartMessage.get("printUserText") + ' : ' +  currentUser.longName + ' / ' +  smartMessage.get("printTimeText") + ' : ' + printCurrentTime() + '</div></div>';
			smartPop.printContent(header, contents);
			setTimeout(function(){
				var body = $('iframe[name="printFrame"]').contents().find('body');
				if(!isEmpty(body.find('.js_type_richEditor iframe'))){
					body.find('.js_type_richEditor iframe').contents().find('#se2_tool').hide();
					body.find('.js_type_richEditor iframe').contents().find('#s_area').css('height', (body.find('.js_type_richEditor iframe').height()-42) + 'px');
				}				
			}, 1000);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_print_content_btn]', null, error);
		}			
		return false;
	});

	$('.js_doc_writer_plugin').live("click", function(e){
		try{
			var input = $(targetElement(e));
			var docWriterTarget = input.attr('docTarget');
			var workSpacePage = input.parents('.js_iwork_space_page:first, .js_pwork_space_page:first, .js_mail_space_page:first');
			if(isEmpty(workSpacePage)) return false;
			var isMailSpace = workSpacePage.hasClass('js_mail_space_page');
			var hostNPort = getHostNPort();
			var header = 	'<link href="' + hostNPort + '/smartworksV3/css/default.css" type="text/css" media="all" rel="stylesheet" />' +
			'<link href="' + hostNPort + '/smartworksV3/css/black/layout_2.css" type="text/css" media="all" rel="stylesheet" />' +
			'<link href="' + hostNPort + '/smartworksV3/css/black/detail.css" type="text/css" media="all" rel="stylesheet" />' +
			'<link href="' + hostNPort + '/smartworksV3/css/black/form.css" type="text/css" media="all" rel="stylesheet" />' +
			'<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
	//		var header = 	'<link href="css/default.css" type="text/css" media="all" rel="stylesheet" />' +
	//		'<link href="css/black/layout_2.css" type="text/css" media="all" rel="stylesheet" />' +
	//		'<link href="css/black/detail.css" type="text/css" media="all" rel="stylesheet" />' +
	//		'<link href="css/black/form.css" type="text/css" media="all" rel="stylesheet" />';
			var companyLogoSrc = $('.js_company_logo_src').attr('src');
			var topLogo = $('<div class="company_logo"><img src="' + companyLogoSrc + '" /><div>' + currentUser.company + '</div></div>');
			var bottomLogo = $('<div class="footer"><img src="' + hostNPort + '/smartworksV3/images/footer_sw_logo.jpg"></div>');
			var body = $('ul.portlet_r').clone();
			if(isMailSpace){
				body = $('ul.portlet_r .mail_list_section').clone();
				body.find('.move_btn_space').remove();
			}else{
				body.find('#js_copy_address').parents('.txt_btn').remove();
				body.find('.js_toggle_forward_btn').remove();
				body.find('.js_toggle_approval_btn').remove();
				body.find('.js_email_content_btn').remove();
				body.find('.js_print_content_btn').remove();
				body.find('.js_view_instance_diagram').remove();
				body.find('.body_titl_pic .solid_line').before(topLogo);
				body.find('input[type="hidden"]').remove();
		//		body.find('.js_instance_tasks_left').remove();
		//		body.find('.js_instance_tasks_right').remove();
		//		body.find('.js_task_start').remove();
		//		body.find('.js_task_stop').remove();
		//		body.find('.js_instance_task_arrow').remove();
		//		body.find('.js_instance_tasks li.selected').siblings().remove();
				if(workSpacePage.hasClass('js_iwork_space_page'))
					body.find('.js_form_content').removeClass('up');
				body.find('.glo_btn_space span.btn_gray').remove();
				body.find('.glo_btn_space').append(bottomLogo);
				body.find('a').attr('userDetail', '');
				body.find('textarea').css({height:"56px"});
			}
			body.html(body.html().replace(/\"images\//g, "\"" + hostNPort + "/smartworksV3/images/"));
			body.html(body.html().replace(/textarea/g,  "div"));
			var contents = '<div id="' + ((isMailSpace) ? 'wrap_noborder' : 'wrap') + '" style="overflow:auto;"><div>' + body.html() + '</div><div class="info tr">' + smartMessage.get("printUserText") + ' : ' +  currentUser.longName + ' / ' +  smartMessage.get("printTimeText") + ' : ' + printCurrentTime() + '</div></div>';
	
			var progressSpan = input.siblings('.js_progress_span');
			smartPop.progressCont(progressSpan);
			$.ajax({
				url : "get_content_from_doc_writer.sw",
				data : {
					header : header,
					content : contents,
					docTarget : docTarget
				},
				success : function(data, status, jqXHR) {
					var resultHead = "";
					var resultBody = "";
					if(!isEmpty(data)){
						resultHead = $(data).find('head:first');
						resultHead = $(data).find('body:first');
					}
					if(docTarget === "print"){
						smartPop.printContent(resultHead, resultBody);
						smartPop.closeProgress();
					}else if(docTarget === "email"){
						var paramsJson = {};
						paramsJson['contents'] = data;
						$.ajax({
							url : "new_mail_post.sw",
							contentType : 'application/json',
							type : 'POST',
							data : JSON.stringify(paramsJson),
							success : function(data, status, jqXHR) {
								target.html(data).show();
								smartPop.closeProgress();
							},
							error : function(xhr, ajaxOptions, thrownError){
								smartPop.closeProgress();							
							}
						});
					}
					else if(docTarget === "pdf"){
						smartPop.closeProgress();					
					}
				},
				error : function(xhr, ajaxOptions, thrownError){
					smartPop.closeProgress();
				}
			});		
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_doc_writer_plugin]', null, error);
		}			
		return false;
	});

	
	$('.js_view_my_instances').live('click',function(e) {
		try{
			var input = $(targetElement(e));
			if(isEmpty(input.attr('viewType'))) input = input.parent();
			var myRunningInstanceList = input.parents('.js_my_running_instance_list_page');
			input.parent().addClass('current').siblings().removeClass('current');
			var viewType = input.attr('viewType'); 
			var target = myRunningInstanceList.find('.js_instance_list_table');
			var searchKey = myRunningInstanceList.find('input[name="txtSearchInstance"]').val();  
			var searchFilterId = myRunningInstanceList.find('input[name="txtSearchInstance"]').val();
			var progressSpan = myRunningInstanceList.find('.js_progress_span:first');
			smartPop.progressCont(progressSpan);
			if(viewType == 'smartcaster_instances'){
				$.ajax({
					url : "more_smartcast.sw",
					data : {
						fromDate : '',
						maxSize : 10
					},
					success : function(data, status, jqXHR) {
						try{
							target.html(data);
							smartPop.closeProgress();
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_view_my_instances more_smartcast]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, thrownError){
						smartPop.closeProgress();
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_view_my_instances more_smartcast]', null, error);
					}
				});
				
			}else if(viewType == 'assigned_instances' || viewType == 'running_instances'){
				$.ajax({
					url : 'more_instance_list.sw',
					data : {
						runningOnly : (viewType == 'running_instances'),
						assignedOnly : (viewType == 'assigned_instances'),
						searchKey : searchKey
					},
					success : function(data, status, jqXHR) {
						try{
							target.html(data);
							smartPop.closeProgress();
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_view_my_instances more_instance_list]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, thrownError){
						smartPop.closeProgress();					
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_view_my_instances more_instance_list]', null, error);
					}
				});			
			}else if(viewType == 'all_instances'){
				$.ajax({
					url : 'space_tab_timeline.sw',
					data : {
						workSpaceId : currentUser.userId,
						searchKey : searchKey
					},
					success : function(data, status, jqXHR) {
						try{
							target = myRunningInstanceList.find('.js_space_instance_list');
							target.html(data).children('div:first').removeClass('portlet_r').find('ul>div').removeClass('contents_space');
							smartPop.closeProgress();
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_view_my_instances more_instance_list]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, thrownError){
						smartPop.closeProgress();					
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_view_my_instances more_instance_list]', null, error);
					}
				});			
			}else{
				smartPop.closeProgress();			
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_view_my_instances]', null, error);
		}			
		return false;
	});

	var filesDetailTimer = null;
	$('.js_pop_files_detail').live('mouseenter', function(e){
		try{
			if(filesDetailTimer!=null){
				clearTimeout(filesDetailTimer);
				filesDetailTimer = null;
			}
			var input = $(targetElement(e));
			var picture = input;
			var top = picture.offset().top+ picture.height() + 5;
			var left = picture.offset().left + picture.width() + 5;
			smartPop.showFilesDetail(input, top, left);		
		}catch(error){
		}			
	});

	$('.js_pop_files_detail').live('mouseleave', function(e){
		filesDetailTimer = setTimeout(function(){
			try{
				smartPop.closeFilesDetail();
				filesDetailTimer = null;
			}catch(error){
			}			
		}, 300);
	});
	
	$('#sw_pop_files_detail').live('mouseenter', function(e){
		try{
			if(filesDetailTimer!=null){
				clearTimeout(filesDetailTimer);
				filesDetailTimer = null;
			}		
		}catch(error){
		}			
	});

	$('#sw_pop_files_detail').live('mouseleave', function(e){
		filesDetailTimer = setTimeout(function(){
			try{
				smartPop.closeFilesDetail();
				filesDetailTimer = null;
			}catch(error){
			}			
		}, 300);
	});	

	$('.js_pop_approval_line').live('click', function(e) {
		try{
			var appendTaskApproval = $(targetElement(e)).parents('.js_append_task_approval_page');
			var target = appendTaskApproval.find('.js_select_approval_line');
	//		var width = startWork.find('.js_auto_complete:first').parent().outerWidth();
	//		smartPop.selectWork(target, width);
			smartPop.selectApprovalLine(target);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_pop_approval_line]', null, error);
		}			
		return false;
	});

	$('.js_notice_message_box_page').live("click", function(e){
		try{
			$(targetElement(e)).parents('.js_notice_message_box_page').find('.js_close_message').click();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_notice_message_box_page]', null, error);
		}			
		return true;
	});

	$('.js_modify_work_manual').live('click', function(e){
		try{
			var target = $(targetElement(e)).parents('.js_modify_work_manual');
			target.hide().siblings().show();
			var workManual = target.parents('.js_iwork_manual_page');
			if(isEmpty(workManual)) workManual = target.parents('.js_pwork_manual_page');
			workManual.find('.js_work_comment_list').hide();
			workManual.find('.js_work_desc_view').hide().next().show();
			workManual.find('.js_form_desc_view').hide().next().show();
	
			var manualAttachmentsField = workManual.find('.js_manual_attachments_field');		
			var gridRow = SmartWorks.GridLayout.newGridRow();
			var gridTable = SmartWorks.GridLayout.newGridTable();
			manualAttachmentsField.html(gridTable.html(gridRow));
			
			var manualFileText = manualAttachmentsField.attr('manualFileText');
			var helpUrlText = manualAttachmentsField.attr('helpUrlText');
			var manualFile = manualAttachmentsField.attr('manualFile');
			var helpUrl = manualAttachmentsField.attr('helpUrl');
			
			SmartWorks.FormRuntime.FileFieldBuilder.buildEx({
				container: gridRow,
				fieldId: "fileManualFile",
				fieldName: manualFileText,
				groupId: manualFile,
				columns: 3,
				colSpan: 1,
				required: false,
				isMultiple: true
			});
			
			gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
			SmartWorks.FormRuntime.TextInputBuilder.buildEx({
				container: gridRow,
				fieldId: "txtHelpUrl",
				fieldName: helpUrlText,
				value: helpUrl,
				columns: 3,
				colSpan: 1,
				required: false
			});
			gridRow.find('input').attr('placeholder', "http://");
			manualAttachmentsField.show();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_modify_work_manual]', null, error);
		}			
		return false;
	});

	$('.js_cancel_work_manual').live('click', function(e){
		try{
			var target = $(targetElement(e)).parents('.js_cancel_work_manual');
			target.hide().siblings('.js_modify_work_manual').show().siblings('.js_save_work_manual').hide();
			var workManual = target.parents('.js_iwork_manual_page');
			if(isEmpty(workManual)) workManual = target.parents('.js_pwork_manual_page');
			workManual.find('.js_work_comment_list').show();
			workManual.find('.js_work_desc_view').show().next().hide();
			workManual.find('.js_form_desc_view').show().next().hide();
			workManual.find('.js_manual_attachments_field').hide().html('');
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_cancel_work_manual]', null, error);
		}			
		return false;
	});
	
	$('.js_save_work_manual').live('click', function(e){
		try{
			submitForms();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_save_work_manual]', null, error);
		}			
		return false;
	});
		
	$('.js_select_editor_box').live('click', function(e){
		try{
			var input = $(targetElement(e));
			var formDescEdit = input.parents('.js_form_desc_edit');
			var formDescText = formDescEdit.find('.js_form_desc_text');
			var formDescEditor = formDescEdit.find('.js_form_desc_editor');
			var formDesc = formDescText.attr('value');
			var fieldName = input.parents('.js_select_editor_box').attr('fieldName');
			if(input.attr('value') == 'editor' && isEmpty(formDescEditor.html())){
				formDescEdit.find('.js_form_desc_text').hide().attr('name', '');
				var gridRow = SmartWorks.GridLayout.newGridRow();
				var gridTable = SmartWorks.GridLayout.newGridTable();
				formDescEditor.html(gridTable.html(gridRow));
	
				SmartWorks.FormRuntime.RichEditorBuilder.buildEx({
					container: gridRow,
					fieldId: fieldName,
					fieldName: "",
					columns: 1,
					value: formDesc,
					resizer: false,
					required: false
				});
				gridRow.find('.form_label').hide();
				gridRow.find('.form_value').css({width:"100%"});
				gridRow.find('#'+ fieldName).css({height:"280px"});
							
			}else if(input.attr('value') == 'text' && !formDescText.is(':visible')){
				formDescEdit.find('.js_form_desc_text').show().attr('name', fieldName);
				formDescEditor.html('');
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_select_editor_box]', null, error);
		}			
		return;
	});

	$('.js_show_picture_detail').live("click", function(e){
		try{
			var input = $(targetElement(e)).parent();
			var instanceId = input.attr('instanceId');
			smartPop.showPicture(instanceId);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_show_picture_detail]', null, error);
		}			
		return false;
	});

	$('.js_import_from_excel').live('click', function(e){
		try{
			var input = $(targetElement(e)).parent();		
			var target = input.parents('.js_work_list_page').find('div.js_new_work_form');
			$('a.js_work_report_close').click();
			$('a.js_cancel_action').click();
			$('a.js_search_filter_close').click();
			$('a.js_cancel_inline_task_instance').click();
			$.ajax({
				url : "import_from_excel.sw",
				data : {},
				success : function(data, status, jqXHR) {
					try{
						target.html(data).slideDown(500);
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_import_from_excel import_from_excel]', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, error){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_import_from_excel import_from_excel]', null, error);
				}				
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_import_from_excel]', null, error);
		}			
		return false;
	});

	$('a.js_export_to_pwork_list_excel').live('click', function(e) {
		try{
			var input = $(targetElement(e));		
			var iworkList = input.parents('.js_iwork_list_page');
			var iframe = input.parent().next();
			var url = 'download_pwork_excel_list.sw?workId=' + iworkList.attr('workId');
			iframe.attr('src', url);
			//window.open('download_pwork_excel_list.sw?workId=' + iworkList.attr('workId'));
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_export_to_pwork_list_excel]', null, error);
		}			
		return false;
	});
	$('a.js_export_to_iwork_list_excel').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var iworkList = input.parents('.js_iwork_list_page');
			var iframe = input.parent().next();
			var url = 'download_iwork_excel_list.sw?workId=' + iworkList.attr('workId');
			iframe.attr('src', url);
			//window.open('download_iwork_excel_list.sw?workId=' + iworkList.attr('workId'));
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_export_to_iwork_list_excel]', null, error);
		}			
		return false;
	});
	
	$('a.js_export_to_community_list_excel').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var url = !isEmpty(input.parents('.js_user_list_page')) ? 'download_excel_user_list.sw' : !isEmpty(input.parents('.js_group_list_page')) ? 'download_excel_group_list.sw' : !isEmpty(input.parents('.js_department_list_page')) ? 'download_excel_depart_list.sw' : "";
			var iframe = input.parent().next();
			iframe.attr('src', url);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_export_to_community_list_excel]', null, error);
		}			
		return false;
	});
	
	$('a.js_export_to_file_list_excel').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var fileList = input.parents('.js_file_list_page');
			var url = 'download_excel_file_list.sw?displayType=' + fileList.attr('displayType') + '&workSpaceId=' + fileList.attr('workSpaceId') + '&categoryId=' + fileList.attr('categoryId');
			var iframe = input.parent().next();
			iframe.attr('src', url);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_export_to_file_list_excel]', null, error);
		}			
		return false;
	});
	
	$('a.js_excel_import_close').live('click', function(e) {
		try{
			var input = $(targetElement(e));		
			input.parents('.js_work_list_page').find('div.js_new_work_form').slideUp(500).html('');
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_excel_import_close]', null, error);
		}			
		return false;
	});

	$('a.js_download_excel_template').live('click', function(e) {
		try{
			var input = $(targetElement(e));		
			var iworkList = input.parents('.js_iwork_list_page');
			window.open('download_excel_template.sw?workId=' + iworkList.attr('workId'));
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_download_excel_template]', null, error);
		}			
		return false;
	});

	$('a.js_excel_import_excute').live('click', function(e){
		try{
			submitForms();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_excel_import_excute]', null, error);
		}			
		return false;
	});

	$('a.js_approve_reserve_asset').live('click', function(e) {
		try{
			var input = $(targetElement(e));		
			var instanceId = input.attr('instanceId');
			smartPop.showAssetReservation(instanceId, 'approval');
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_approve_reserve_asset]', null, error);
		}			
		return false;
	});

	$('.js_view_reserve_asset').live('click', function(e) {
		try{
			var input = $(targetElement(e));		
			var instanceId = input.attr('instanceId');
			smartPop.showAssetReservation(instanceId, 'view');
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_view_reserve_asset]', null, error);
		}			
		return false;
	});

	$('.js_perform_asset_reservation').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			if(!input.hasClass('js_perform_asset_reservation'))
				input = input.parents('.js_perform_asset_reservation');
			var workId = input.parents('.js_asset_reservation_page').attr('workId');
			var instanceId = input.parents('.js_asset_reservation_page').attr('instanceId');
			var repeatId = input.parents('.js_asset_reservation_page').attr('repeatId');
			var action = input.attr('action');
			
			var paramsJson = {};
			var url = "perform_asset_reservation.sw";
			
			paramsJson['workId'] = workId;			
			paramsJson['instanceId'] = instanceId;			
			paramsJson['action'] = action;			
			if(isEmpty(repeatId) || action!=="cancel"){
				console.log(JSON.stringify(paramsJson));
				$.ajax({
					url : url,
					contentType : 'application/json',
					type : 'POST',
					data : JSON.stringify(paramsJson),
					success : function(data, status, jqXHR) {
						smartPop.close();
						$('.js_work_space_home').click();
					},
					error : function(xhr, ajaxOptions, e) {
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('performAssetReservationError'), null, e);
					}
				});
			}else{
				smartPop.confirm(smartMessage.get('removeAllRepeatConfirmation'), function(){
					try{
						paramsJson['repeatEventId'] = repeatId;			
						console.log(JSON.stringify(paramsJson));
						$.ajax({
							url : url,
							contentType : 'application/json',
							type : 'POST',
							data : JSON.stringify(paramsJson),
							success : function(data, status, jqXHR) {
								smartPop.close();
								$('.js_work_space_home').click();
							},
							error : function(xhr, ajaxOptions, e) {
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('performAssetReservationError'), null, e);
							}
						});
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_perform_asset_reservation]', null, error);
					}
				}, function(){
					try{
						console.log(JSON.stringify(paramsJson));
						$.ajax({
							url : url,
							contentType : 'application/json',
							type : 'POST',
							data : JSON.stringify(paramsJson),
							success : function(data, status, jqXHR) {
								smartPop.close();
								$('.js_work_space_home').click();
							},
							error : function(xhr, ajaxOptions, e) {
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('performAssetReservationError'), null, e);
							}
						});
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_perform_asset_reservation]', null, error);
					}
				});
				$('#sw_pop_confirm .js_btn_ok .txt_btn_center').text(smartMessage.get('buttonYesAll'));
				$('#sw_pop_confirm .js_btn_cancel .txt_btn_center').text(smartMessage.get('buttonNoOne'));
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_perform_asset_reservation]', null, error);
		}			
		return false;
	});

	$('.js_toggle_select_all').live('click', function(e){
		try{
			var input = $(targetElement(e));
			var checkValue = input.is(':checked');
			var checkBoxes = input.parents('.js_work_list_page').find('input.js_check_instance');
			checkBoxes.attr('checked', checkValue);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_toggle_select_all]', null, error);
		}			
		return true;
	});

	
	$('.js_select_admin_mode').live('click', function(e){
		try{
			var input = $(targetElement(e));
			var workListHome = input.parents('.js_work_list_page').find('a.js_work_list_home');
			workListHome.attr('href', workListHome.attr('href') + '&accessMode=' + input.attr('accessMode')).click();
			return false;
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_select_admin_mode]', null, error);
		}			
		return false;
	});

	$('.js_check_instance').live('click', function(e){
		e.stopPropagation();
	});
	
	$('.js_abend_work_instance').live('click', function(e){
		var input = $(targetElement(e));
		var instanceTitle = input.parents('tr:first').attr('instanceSubject');			
		smartPop.confirm('[' + instanceTitle + ']' + smartMessage.get("abendInstanceConfirmation"), function(){			
			try{
				var instanceId = input.parents('tr:first').attr('instanceId');			
				var workList = input.parents('.js_work_list_page');
				var workId = workList.attr('workId');
				var paramsJson = {};
				var url = workList.hasClass('js_pwork_list_page') ? "abend_process_instance.sw" : workList.hasClass('js_iwork_list_page') ? "abend_iwork_instance.sw" : "";
				paramsJson['workId'] = workId;			
				paramsJson['instanceId'] = instanceId;			
				console.log(JSON.stringify(paramsJson));
				$.ajax({
					url : url,
					contentType : 'application/json',
					type : 'POST',
					data : JSON.stringify(paramsJson),
					success : function(data, status, jqXHR) {
						smartPop.close();
						$('.js_work_list_home').click();
					},
					error : function(xhr, ajaxOptions, e) {
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_abend_work_instance ' + url + ']', null, e);
					}
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_abend_work_instance]', null, error);
			}			
			return false;
		});
		return false;
	});

	$('.js_clear_work_instances').live('click', function(e){
		var input = $(targetElement(e));
		var workList = input.parents('.js_work_list_page');
		var selectedInstances = workList.find('input[name="chkSelectInstance"]:checked:visible').parents('tr.js_content_work_space');
		if(isEmpty(selectedInstances)) return;
		var instanceIds = new Array();
		for(var i=0; i<selectedInstances.length; i++)
			instanceIds.push($(selectedInstances[i]).attr('instanceId'));
		if(isEmpty(instanceIds)) return false;
		smartPop.confirm(smartMessage.get("clearInstanceConfirmation"), function(){			
			try{
				
				var workId = workList.attr('workId');
				var paramsJson = {};
				var url = workList.hasClass('js_pwork_list_page') ? "clear_process_instances.sw" : workList.hasClass('js_iwork_list_page') ? "clear_iwork_instances.sw" : "";
				
				paramsJson['workId'] = workId;			
				paramsJson['instanceIds'] = instanceIds;			
				console.log(JSON.stringify(paramsJson));
				$.ajax({
					url : url,
					contentType : 'application/json',
					type : 'POST',
					data : JSON.stringify(paramsJson),
					success : function(data, status, jqXHR) {
						smartPop.close();
						$('.js_work_list_home').click();
					},
					error : function(xhr, ajaxOptions, e) {
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_clear_work_instances clear_process_instances.sw]', null, e);
					}
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_clear_work_instances]', null, error);
			}			
			return false;
		});
		return false;
	});

	$('.js_admin_work_instance').live('click', function(e){
		try{
			var input = $(targetElement(e));
			var instanceId = input.parents('tr:first').attr('instanceId');
			var workList = input.parents('.js_work_list_page'); 
			var workId = workList.attr('workId');
			var href = workList.hasClass('js_pwork_list_page') ? "pop_admin_pwork_instance.sw" : workList.hasClass('js_iwork_list_page') ? "pop_admin_iwork_instance.sw" : "";
			smartPop.adminWorkInstance(workId, instanceId, href);
			return false;
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_admin_work_instance]', null, error);
		}			
		return false;
	});

});
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work script]', null, error);
}
