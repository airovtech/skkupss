try{
var console = console ||{
	log : function() {}
};

// 완료버튼 클릭시 create_new_iwork.sw 서비스를 실행하기 위해 submit하는 스크립트..
function iworkSubmitForms(tempSave, e) {
	var input = $(e);
	var iworkSpace = input.parents('.js_iwork_space_page:first');
	var workId = iworkSpace.attr("workId");
	var instanceId = iworkSpace.attr("instId");
	var tempSavedId = iworkSpace.attr("tempSavedId");
	var scheduleWork = iworkSpace.find('form[name="frmScheduleWork"]');
	
	// 계획업무로 지정하기가 선택되어 있으면, 계획업무관련 입력필드들을 validation하기위한 클래스를 추가한다.. 
	if(scheduleWork.find($('input[name="chkScheduleWork"]')).is(':checked')){
		scheduleWork.addClass('js_validation_required');
	}else{
		scheduleWork.removeClass('js_validation_required');	
	}
	
	var approvers = iworkSpace.find('.js_approval_box input[type="hidden"]');
	if(!isEmpty(approvers)){
		for(var i=0; i<approvers.length; i++){
			var approver = $(approvers[i]);
			var autoComplete = approver.parents('.js_approval_box').find('.js_auto_complete');
			if(isEmpty(approver.attr('value'))) autoComplete.addClass('required');
			else autoComplete.removeClass('required');
		}
	}
	
	// new_iwork에 있는 활성화되어 있는 모든 입력화면들을 validation하여 이상이 없으면 submit를 진행한다...
	if (SmartWorks.GridLayout.validate(iworkSpace.find('form.js_validation_required'), $('.js_space_error_message'))) {
		var forms = iworkSpace.find('form');
		var paramsJson = {};
		paramsJson['workId'] = workId;
		for(var i=0; i<forms.length; i++){
			var form = $(forms[i]);
			
			// 폼이 스마트폼이면 formId와 formName 값을 전달한다...
			if(form.attr('name') === 'frmSmartForm'){
				paramsJson['formId'] = form.attr('formId');
				paramsJson['formName'] = form.attr('formName');
			}
			
			// 폼이름 키값으로 하여 해당 폼에 있는 모든 입력항목들을 JSON형식으로 Serialize 한다...
			paramsJson[form.attr('name')] = mergeObjects(form.serializeObject(), SmartWorks.GridLayout.serializeObject(form));
			
		}
		if(tempSave){
			paramsJson['isTempSave'] = true;
			paramsJson['instanceId'] = instanceId;
		}
		if(!isEmpty(tempSavedId)){
			paramsJson['tempSavedId'] = tempSavedId;
		}
		console.log(JSON.stringify(paramsJson));
		var url = "create_new_iwork.sw";
		// 서비스요청 프로그래스바를 나타나게 한다....
		var progressSpan = iworkSpace.find('.js_progress_span:first');
		smartPop.progressCont(progressSpan);
		// create_new_iwork.sw서비스를 요청한다..
		$.ajax({
			url : url,
			contentType : 'application/json',
			type : 'POST',
			data : JSON.stringify(paramsJson),
			success : function(data, status, jqXHR) {
				
				// 성공시에 프로그래스바를 제거하고 성공메시지를 보여준다...
				if(tempSave){
					iworkSpace.attr('instId', data.instanceId);
					iworkSpace.attr('tempSavedId', data.intanceIdq);
				}else if(tempSavedId){
					var inlineTarget = input.parents('.js_content_target');
					if(isEmpty(inlineTarget)){					
						$('.js_goto_work_list_btn').click();
					}else{
						inlineTarget.find('.js_cancel_inline_task_instance').attr('action', 'save').click();
					}
				}else{
					window.location.reload(true);
				}
				smartPop.closeProgress();
			},
			error : function(xhr, ajaxOptions, e) {
				// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
				smartPop.closeProgress();
				if(xhr.responseText === "duplicateKeyException")
					smartPop.showInfo(smartPop.ERROR, smartMessage.get("duplicateKeyException"), null, e);
				else
					smartPop.showInfo(smartPop.ERROR, smartMessage.get("createIWorkError"), null, e);
			}
		});
	}
	return;
}

//완료버튼 클릭시 start_new_pwork.sw 서비스를 실행하기 위해 submit하는 스크립트..
function pworkSubmitForms(tempSave, e) {
	var input = $(e);
	var pworkSpace = input.parents('.js_pwork_space_page:first');
	var workId = pworkSpace.attr('workId');
	var instanceId = pworkSpace.attr('instId');
	var tempSavedId = pworkSpace.attr('tempSavedId');

	// 계획업무로 지정하기가 선택되어 있으면, 계획업무관련 입력필드들을 validation하기위한 클래스를 추가한다.. 
	var scheduleWork = pworkSpace.find('form[name="frmScheduleWork"]');
	if(scheduleWork.find($('input[name="chkScheduleWork"]')).is(':checked')){
		scheduleWork.addClass('js_validation_required');
	}else{
		scheduleWork.removeClass('js_validation_required');	
	}

	// start_pwork에 있는 활성화되어 있는 모든 입력화면들을 validation하여 이상이 없으면 submit를 진행한다...
	if (SmartWorks.GridLayout.validate(pworkSpace.find('form.js_validation_required'), $('.js_space_error_message'))) {
		var forms = pworkSpace.find('form');
		var paramsJson = {};
		paramsJson['workId'] = workId;
		for(var i=0; i<forms.length; i++){
			var form = $(forms[i]);
			// 폼이 스마트폼이면 formId와 formName 값을 전달한다...
			if(form.attr('name') === 'frmSmartForm'){
				paramsJson['formId'] = form.attr('formId');
				paramsJson['formName'] = form.attr('formName');
			}
			// 폼이름 키값으로 하여 해당 폼에 있는 모든 입력항목들을 JSON형식으로 Serialize 한다...
			paramsJson[form.attr('name')] = mergeObjects(form.serializeObject(), SmartWorks.GridLayout.serializeObject(form));
		}
		if(tempSave){
			paramsJson['isTempSave'] = true;
			paramsJson['instanceId'] = instanceId;
		} else {
		}
		paramsJson['tempSavedId'] = tempSavedId;
		console.log(JSON.stringify(paramsJson));
		var url = "start_new_pwork.sw";
		// 서비스요청 프로그래스바를 나타나게 한다....
		var progressSpan = pworkSpace.find('.js_progress_span:first');
		smartPop.progressCont(progressSpan);
		// start_new_pwork.sw서비스를 요청한다..
		$.ajax({
			url : url,
			contentType : 'application/json',
			type : 'POST',
			data : JSON.stringify(paramsJson),
			success : function(data, status, jqXHR) {
				// 성공시에 프로그래스바를 제거하고 성공메시지를 보여준다...
				if(tempSave){
					pworkSpace.attr('instId', data.instanceId);
				}else if(tempSavedId){
					var inlineTarget = input.parents('.js_content_target');
					if(isEmpty(inlineTarget)){					
						$('.js_goto_work_list_btn').click();
					}else{
						inlineTarget.find('.js_cancel_inline_task_instance').attr('action', 'perform').click();
					}
						
				}else{
					window.location.reload(true);
				}
				smartPop.closeProgress();
			},
			error : function(xhr, ajaxOptions, e) {
				// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
				smartPop.closeProgress();
				smartPop.showInfo(smartPop.ERROR, smartMessage.get("startPWorkError"), null, e);
			}
		});
	}
	return;
}

function clickOnTask(input, isMore, clientY){
	var pworkSpace = input.parents('.js_pwork_space_page:first');
	var workId = pworkSpace.attr("workId");
	var isTempSaveWork = pworkSpace.attr('isTempSaveWork');
	var tempSavedId = pworkSpace.attr('tempSavedId');
	var formId = input.attr("formId");
	var formMode = input.attr("formMode");
	var isMultiEdit = false;
	if(formMode === "multiEdit"){
		formMode = "view";
		isMultiEdit = true;
	}
	var instId = input.attr("taskInstId");
	var isApprovalWork = input.attr("isApprovalWork");
	var approvalLineId = input.attr("approvalLineId"); 
	var downloadCount = input.attr("downloadHistories");
	var returnProhibited = (input.attr("returnProhibited")==="true");
	var approvalContent = pworkSpace.find('.js_form_header[taskInstId="' + instId + '"] div.js_form_task_approval').html('').hide();
	var formContent = pworkSpace.find('.js_form_header[taskInstId="' + instId + '"] div.js_form_content').html('');
	if(isApprovalWork == 'true' && !isEmpty(approvalContent)){
		$.ajax({
			url : 'append_task_approval.sw',
			data : { 
				processTaskInstId : instId
			},
			success : function(data, status, jqXHR) {
				approvalContent.html(data).show();
			},
			error : function(xhr, ajaxOptions, thrownError){					
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[pwork_space script]', null, thrownError);
			}
		});
	}else if(!isEmpty(approvalLineId) && formMode === "edit"){
		$.ajax({
			url : 'append_task_approval.sw',
			data : { 
				approvalLineId : approvalLineId
			},
			success : function(data, status, jqXHR) {
				approvalContent.html(data).show();
			},
			error : function(xhr, ajaxOptions, thrownError){					
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[pwork_space script]', null, thrownError);
			}
		});			
	}
	var downloadHistories = pworkSpace.find('.js_download_histories');
	if(downloadCount === '0'){
		downloadHistories.hide().find('.js_download_count').html('');
	}else{
		downloadHistories.show().find('.js_download_count').html('[' + downloadCount + ']');
	}
	pworkSpace.find('.js_instance_histories').html('').hide();
	var selectedTask = input;
	pworkSpace.find('.js_instance_task').removeClass('selected');
	selectedTask.addClass('selected');
	var isTempSaved = "false";
	if (isTempSaveWork==='true') {
		isTempSaved = "true";
		instId = tempSavedId;
		formMode = "edit";
	}
	new SmartWorks.GridLayout({
		target : formContent,
		mode : formMode,
		first : (formMode=='edit'),
		workId : workId,
		formId : formId,
		isTempSaved : isTempSaved,
		taskInstId : instId,
		onSuccess : function(){
			formContent.attr('taskInstId', instId);
			clickOnTaskRequests--;
			if(!isEmpty(lastTaskRequest) && clickOnTaskRequests==0){
				setTimeout(function(){
					lastTaskRequest = $('.js_instance_task[taskInstId="' + lastTaskRequest + '"]').parents('.js_form_header:first');
					$('html body').animate({ scrollTop: lastTaskRequest.offset().top+lastTaskRequest.height() - parseInt(clientY)+20}, 'slow');						
				}, 100);
			}
			smartPop.closeProgress();																
			formContent.parents('.js_form_header:first').show();
		},
		onError : function(){
			smartPop.closeProgress();
			
		}
	});
	pworkSpace.attr("taskInstId", instId);
	pworkSpace.attr("formMode", formMode);
	if(!isEmpty(pworkSpace.find('.js_form_task_forward:visible')) || isMore) 
		return;
	
	if(formMode==="edit" || isMultiEdit){
		if(isReturned){
			pworkSpace.find('.js_toggle_approval_btn').hide();
			pworkSpace.find('.js_btn_submit_approval').show().siblings('').hide();
			pworkSpace.find('.js_btn_reject_approval').show();											
		}else if(!isEmpty(approvalLineId)){
			pworkSpace.find('.js_toggle_approval_btn').hide();
			pworkSpace.find('.js_btn_do_approval').show().siblings().hide();
			if(returnProhibited)
				pworkSpace.find('.js_btn_return').hide();
			else
				pworkSpace.find('.js_btn_return').show();
		}else{
			pworkSpace.find('.js_btn_complete').show().siblings('.js_common_buttons').hide();
			if(returnProhibited)
				pworkSpace.find('.js_btn_return').hide();
			else
				pworkSpace.find('.js_btn_return').show();
			pworkSpace.find('.js_btn_reassign').show();
			pworkSpace.find('.js_btn_temp_save').show();
			pworkSpace.find('.js_toggle_approval_btn').show();				
		}
	}else{
		if(isApprovalWork == 'true' && isApprovalForMe){
			pworkSpace.find('.js_toggle_approval_btn').hide();
			pworkSpace.find('.js_btn_approve_approval').show().siblings().hide();
			pworkSpace.find('.js_btn_return_approval').show();
			pworkSpace.find('.js_btn_reject_approval').show();
		} else {
			pworkSpace.find('.js_btn_complete').hide().siblings('.js_common_buttons').hide();
		}
		pworkSpace.find('.js_toggle_approval_btn').hide();
	}
	pworkSpace.find('.js_btn_cancel_inline').show();		
}

function getInstanceTaskInfo(instanceTask){
	var prcInstId = instanceTask.hasClass('js_subflow_task')?instanceTask.attr("subWorkInstanceId"):instanceTask.hasClass('js_running_by_other')?instanceTask.attr('workInstanceId'):null;
	var taskInstId = instanceTask.attr('taskInstId');
	if(!isEmpty(prcInstId)){
		var formHeader = instanceTask.parents('.js_form_header:first');
		$.ajax({
			url : 'get_instance_lasttask.sw',
			data : { 
				procInstId : prcInstId,
				taskInstId : taskInstId
			},
			success : function(data, status, jqXHR) {
				formHeader.show().find('.js_form_content').html(data);
				var jsContents = formHeader.find('li a.js_content');
				for(var i=0; i<jsContents.length; i++){
					if($(jsContents[i]).hasClass('goto_detail')) continue;
					$(jsContents[i]).removeClass('js_content').attr('href', '');
				}
				if(instanceTask.hasClass('js_running_by_other')){
					formHeader.find('li').removeClass('instance_list').removeClass('js_content_list').removeAttr('href');
				}
			},
			error : function(xhr, ajaxOptions, thrownError){					
			}
		});
	}
}

function updateRecentOnHome(){
	if(isEmpty($('.js_my_running_instance_list_page'))) return;
	updateRecentOnSpace();
}

function updateRecentOnSpace(){
	try{
		var target, searchKey, searchFilterId, recentDate, progressSpan;
		var myRunningInstanceList = $('.js_my_running_instance_list_page');
		var workList = $('.js_work_list_page');
		if(!isEmpty(workList)){
			workList.find('.js_work_list_home').click();
		}else if(!isEmpty(myRunningInstanceList)){
			target = myRunningInstanceList.find('.js_instance_list_table');
			searchKey = myRunningInstanceList.find('input[name="txtSearchInstance"]').val();  
			searchFilterId = myRunningInstanceList.find('input[name="txtSearchInstance"]').val();
			viewType = myRunningInstanceList.find('.js_view_my_instances.current > a').attr('viewType');
			recentDate = target.find('ul:first > li:first').attr('dateValue');
			progressSpan = myRunningInstanceList.find('.js_progress_span:first');
			smartPop.progressCont(progressSpan);
			if(viewType == 'smartcaster_instances'){
				$.ajax({
					url : "more_smartcast.sw",
					data : {
						fromDate : '',
						toDate : recentDate,
						maxSize : 20
					},
					success : function(data, status, jqXHR) {
						try{
							if(!isEmpty(data) && data.trim()){
								var prevHeight = target.find('ul:first').height();
								var recentItem = target.find('ul:first > li[dateValue="' + recentDate + '"]');
								if(!isEmpty(recentItem)){
									recentItem.prevAll().remove();
								}
								target.find('ul:first').prepend($(data).find('ul:first').html());
								$('html body').scrollTop($('html body').scrollTop() + target.find('ul:first').height() - prevHeight);
							}
							smartPop.closeProgress();
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-work-util updateRecentOnSpace more_smartcast]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, thrownError){
						smartPop.closeProgress();
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-work-util updateRecentOnSpace more_smartcast]', null, error);
					}
				});
				
			}else if(viewType == 'assigned_instances' || viewType == 'running_instances'){
				$.ajax({
					url : 'more_instance_list.sw',
					data : {
						runningOnly : (viewType == 'running_instances'),
						assignedOnly : (viewType == 'assigned_instances'),
						recentDate : recentDate,
						searchKey : searchKey
					},
					success : function(data, status, jqXHR) {
						try{
							if(!isEmpty(data) && data.trim()){
								var prevHeight = target.find('ul:first').height();
								var recentItem = target.find('ul:first > li[dateValue="' + recentDate + '"]');
								if(!isEmpty(recentItem)){
									recentItem.prevAll().remove();
								}
								target.find('ul:first').prepend($(data).find('ul:first').html());
								$('html body').scrollTop($('html body').scrollTop() + target.find('ul:first').height() - prevHeight);
							}
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
							if(!isEmpty(data) && data.trim())
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
		}
	}catch(error){
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-work-util updateRecentOnSpace]', null, error);
	}			

}

}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-work-util script]', null, error);
}
