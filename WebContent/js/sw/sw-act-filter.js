try{
$(function() {
	$('select.js_select_filter_operand').live('change', function(e) {
		try{
			var input = $(targetElement(e));
			var externalServiceId = input.parents('.js_search_filter_page').attr('externalServiceId');
			var pageName = input.children('option:selected').attr('page');
			var url = pageName + ".sw";
			var target = input.next('span.js_filter_operator');
			$.ajax({
				url : url,
				data : { externalServiceId: externalServiceId},
				success : function(data, status, jqXHR) {
					try{
						target.html(data).show();
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-filter js_select_filter_operand]', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, thrownError){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-filter js_select_filter_operand]', null, thrownError);
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-filter js_select_filter_operand]', null, error);
		}			
		return false;
	});

	$('select.js_select_filter_operator').live('change', function(e) {
		try{
			var input = $(targetElement(e));
			var target = input.children('option:selected').attr('type');
			input.next().children('span.' + target).show().siblings('span.js_right_operand').hide();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-filter js_select_filter_operator]', null, error);
		}			
		return false;
	});
	
	$('a.js_edit_search_filter').live('click', function(e) {
		try{
			var input = $(targetElement(e)).parent();
			smartPop.progressCont(input.next('span:first'));
			var reportSearchFilter = input.parents('.js_report_search_filter');
			var target = isEmpty(reportSearchFilter) ? $('#search_filter') : reportSearchFilter.find('#report_searhch_filter');
			var url = input.attr('href') + "&filterId=" + $('.js_work_list_title form.js_form_filter_name').find('select.js_select_search_filter').attr('value') + "&externalServiceId=" + input.attr('externalServiceId');
			$('a.js_work_report_close').click();
			$('a.js_cancel_action').click();
			$('a.js_excel_import_close').click();
			$('a.js_cancel_inline_task_instance').click();
			$.ajax({
				url : url,
				data : {},
				success : function(data, status, jqXHR) {
					try{
						target.html(data);
						target.slideDown(500);
						input.hide();
						smartPop.closeProgress();
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-filter js_edit_search_filter ' + url + ']', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, thrownError){
					smartPop.closeProgress();
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-filter js_edit_search_filter]', null, thrownError);
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-filter js_edit_search_filter]', null, error);
		}			
		return false;
	});

	
	$('a.js_select_paging').live("click", function(e){
		try{
			var input = $(targetElement(e)).parents('a.js_select_paging');
			input.find('input').attr('value', 'true');
			var progressSpan = input.siblings('span.js_progress_span:first');
			if(isEmpty(input.parents('.js_pop_instance_list_page'))){
	//			$('#search_filter').slideUp(500).html('');			
				selectListParam(progressSpan, false);
			}else{
				popSelectListParam(progressSpan, false);
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-filter js_select_paging]', null, error);
		}			
		return false;
	});
	
	$('a.js_select_current_page').live("click", function(e){
		try{
			var input = $(targetElement(e));
			var progressSpan = input.siblings('span.js_progress_span:first');
			input.siblings('input[name="hdnCurrentPage"]').attr('value', input.text());
			if(isEmpty(input.parents('.js_pop_instance_list_page'))){
	//			$('#search_filter').slideUp(500).html('');			
				selectListParam(progressSpan, false);
			}else{
				popSelectListParam(progressSpan, false);
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-filter js_select_currnet_page]', null, error);
		}			
		return false;
	});
	
	$('.js_select_page_size').live("change", function(e){
		try{
			var input = $(targetElement(e));
			var progressSpan = input.siblings('span.js_progress_span:first');
			if(isEmpty(input.parents('.js_pop_instance_list_page'))){
	//			$('#search_filter').slideUp(500).html('');			
				selectListParam(progressSpan, false);
			}else{
				popSelectListParam(progressSpan, false);
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-filter js_select_page_size]', null, error);
		}			
		return false;
	});
	
	$('a.js_select_field_sorting').live('click', function(e){
		try{
			var input = $(targetElement(e));
			var popInstanceList = input.parents('.js_pop_instance_list_page');
			var sortingField = $('form[name="frmSortingField"]').find('input[name="hdnSortingFieldId"]');
			var sortingIsAscending = $('form[name="frmSortingField"]').find('input[name="hdnSortingIsAscending"]');
			if(!isEmpty(popInstanceList)){
				sortingField = popInstanceList.find('form[name="frmSortingField"]').find('input[name="hdnSortingFieldId"]');
				sortingIsAscending = popInstanceList.find('form[name="frmSortingField"]').find('input[name="hdnSortingIsAscending"]');			
			}
			if(sortingField.attr('value') === input.attr('fieldId')){
				var isAscending = sortingIsAscending.attr('value');
				sortingIsAscending.attr('value', (isAscending === "true") ? "false" : "true");
			}else{
				sortingField.attr('value', input.attr('fieldId'));
				sortingIsAscending.attr('value', 'false');
			}
			var progressSpan = input.siblings('.js_progress_span:first');
			if(isEmpty(input.parents('.js_pop_instance_list_page'))){
				selectListParam(progressSpan, false);
			}else{
				popSelectListParam(progressSpan, false);
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-filter js_select_field_sorting]', null, error);
		}			
		return false;
	});

	$('.js_select_search_filter').live('change', function(e){
		try{
			var input = $(targetElement(e));
			$('a.js_edit_search_filter').show();
			var progressSpan = $('.js_edit_search_filter').next('span.js_progress_span:first');
			if(isEmpty(input.parents('.js_report_search_filter'))){
				if(isEmpty(input.parents('.js_pop_instance_list_page'))){
					$('#search_filter').slideUp(500).html('');			
					selectListParam(progressSpan, false);
				}else{
					popSelectListParam(progressSpan, false);
				}
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-filter js_select_search_filter]', null, error);
		}			
		return false;		
	});
	
	$('a.js_search_filter_close').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			$('#search_filter').slideUp(500).html('');
			$('a.js_edit_search_filter').show();
			var progressSpan = $('.js_edit_search_filter').next('span.js_progress_span:first');
			if(isEmpty(input.parents('.js_pop_instance_list_page'))){
				selectListParam(progressSpan, false);
			}else{
				popSelectListParam(progressSpan, false);
			}		
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-filter js_search_filter_close]', null, error);
		}			
		return false;
	});

	$('a.js_search_filter_execute').live("click", function(e){
		try{
			var input = $(targetElement(e));
			$('.js_search_filter_page input[name="txtNewFilterName"]').removeClass('required');
			if (!SmartWorks.GridLayout.validate(input.parents('form.js_validation_required:first'), $('.js_filter_error_message'))) return false;
			var progressSpan = $('.js_search_filter_page').find('span.js_progress_span:first');
			if(isEmpty(input.parents('.js_pop_instance_list_page')))
				selectListParam(progressSpan, false);
			else
				popSelectListParam(progressSpan, false);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-filter js_search_filter_execute]', null, error);
		}			
		return false;
	});	

	$('a.js_search_filter_delete').live("click", function(e){
		smartPop.confirm(smartMessage.get("removeConfirmation"), function(){
			try{
				//var iworkList = $('.js_iwork_list_page');
				//var workId = iworkList.attr('workId');
				var searchFilter = $('.js_search_filter_page');
				var workId = searchFilter.attr('workId');
				var filterId = searchFilter.attr('filterId');
				var workType = searchFilter.attr('workType');				
				var paramsJson = {};
				paramsJson['workId'] = workId;
				paramsJson['filterId'] = filterId;
				paramsJson['workType'] = workType;
				console.log(JSON.stringify(paramsJson));
	
				var href = "";
				if(workType == 21)
					href = "iwork_list.sw?cid=iw.li." + workId;
				else if(workType == 22)
					href = "pwork_list.sw?cid=pw.li." + workId;
	
				$.ajax({
					url : "remove_work_search_filter.sw",
					contentType : 'application/json',
					type : 'POST',
					data : JSON.stringify(paramsJson),
					success : function(data, status, jqXHR) {
						try{
							smartPop.progressCenter();
							document.location.href = href;
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-filter js_search_filter_delete]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, e) {
						// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
						smartPop.showInfo(smartPop.ERROR, smartMessage.get("removeFilterError"), function(){
						}, e);
					}
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-filter js_search_filter_deletd]', null, error);
			}			
		});
		return false;
	});

	$('a.js_search_filter_save').live("click", function(e){
		try{
			$('.js_search_filter_page input[name="txtNewFilterName"]').removeClass('required');
			saveSearchFilter();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-filter js_search_filter_save]', null, error);
		}			
		return false;
	});	

	$('a.js_search_filter_saveas').live("click", function(e){
		try{
			var searchFilter = $('.js_search_filter_page');
			var filterNameInput = searchFilter.find('input[name="txtNewFilterName"]');
			if(isEmpty(filterNameInput.attr('value')) || searchFilter.attr('filterName') == filterNameInput.attr('value')){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('sameFilterNmaeError'));
				return false;
			}
			filterNameInput.removeClass('required');
			saveAsSearchFilter();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-filter js_search_filter_saveas]', null, error);
		}			
		return false;
	});	

});
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-filter script]', null, error);
}