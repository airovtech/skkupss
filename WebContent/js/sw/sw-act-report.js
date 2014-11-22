try{
$(function() {

	$('.js_remove_condition').live('click', function(e) {
		try{
			$(targetElement(e)).parents('form.js_filter_condition:first').remove();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_remove_condition]', null, error);
		}		
		return false;
	});

	$('.js_add_condition').live('click', function(e) {
		try{
			var target = $(targetElement(e)).parents('div.js_search_filter_page').find('form.js_filter_condition').parent();
			var newCondition = target.find('form.js_new_condition:first').clone().show().removeClass('js_new_condition');
			target.append(newCondition.show());
			newCondition.find('select.js_select_filter_operand:first').trigger('change');
			var todaypicker = newCondition.find('.js_todaypicker');
			var todaytimepicker = newCondition.find('.js_todaytimepicker').removeClass('hasDatetimepicker').attr('id', '');
			var timepicker = newCondition.find('.js_timepicker').removeClass('hasTimepicker').attr('id', '');
			if(!isEmpty(todaypicker)){
				todaypicker.removeClass('hasDatepicker').attr('id', '');
				smartCommon.liveTodayPicker();
			}
			if(!isEmpty(todaytimepicker)){
				todaytimepicker.removeClass('hasDatepicker').attr('id', '');
				smartCommon.liveTodayTimePicker();
			}
			if(!isEmpty(timepicker)){
				timepicker.removeClass('hasDatepicker').attr('id', '');
				smartCommon.liveTimePicker();
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_add_condition]', null, error);
		}			
		return false;
	});

	$('a.js_edit_work_report').live('click', function(e) {
		try{
			var input = $(targetElement(e)).parent();
			var workReport = input.parents('div.js_work_report_page');
			var target = workReport.find('div.js_work_report_edit');
			var url = input.attr('href');
			if(isEmpty(url)) url = input.find('a').attr('href');
			var targetWorkId = workReport.attr('targetWorkId');
			var targetWorkType = workReport.attr('targetWorkType');
			var targetWorkName = workReport.attr('targetWorkName');
			var targetWorkIcon = workReport.attr('targetWorkIcon');
			var progressSpan = input.next('span.js_progress_span');
			var reportId = workReport.find('select[name="selMyReportList"]').attr('value');
			$('a.js_search_filter_close').click();
			$('a.js_cancel_action').click();
			$('a.js_excel_import_close').click();
			$('a.js_cancel_inline_task_instance').click();
			smartPop.closeProgress();
			smartPop.progressCont(progressSpan);
			$.ajax({
				url : url,
				data : {
					reportId: reportId,
					targetWorkId: targetWorkId,
					targetWorkType: targetWorkType,
					targetWorkName: targetWorkName,
					targetWorkIcon: targetWorkIcon
				},
				success : function(data, status, jqXHR) {
					try{
						target.html(data).slideDown(500);
						target.find('select.js_select_y_axis option:selected').change();
						smartPop.closeProgress();						
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_edit_work_report ' + url + ']', null, error);
					}
				},
				error : function(xhr, ajaxOptions, thrownError){
					smartPop.closeProgress();						
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_edit_work_report ' + url + ']', null, thrownError);
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_edit_work_report]', null, error);
		}			
		return false;
	});

	$('a.js_work_report_close').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var reportId = input.parents('.js_work_report_edit').find('.js_work_report_edit_page').attr('reportId');
			if(isEmpty(reportId) || reportId == 'null' || !isEmpty(input.parents('.js_report_list_page'))){
				input.parents('.js_work_report_page').find('.js_work_report_view').html('').hide();
			}
			$(targetElement(e)).parents('.js_work_report_edit').slideUp().html('');
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_work_report_close]', null, error);
		}			
		return false;
	});

	
	$('a.js_work_report_execute').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var forms = input.parents('.js_work_report_edit').find('form:visible');
			forms.find('.js_work_report_name input').removeClass('required');
			if (SmartWorks.GridLayout.validate(forms, $('.js_report_error_message'))) {
				var reportType = forms.find('input[name="rdoWorkReportType"]:checked').attr('value');
				var chartType = forms.find('select[name="selReportChartType"]').find('option:selected').attr('chartType');
				if(forms.find('td.js_select_chart_axis select[name="selReportXAxis"] option:selected').attr('value') === forms.find('td.js_select_chart_axis select[name="selReportZAxis"]:visible option:selected').attr('value')){
					smartPop.showInfo(smartPop.ERROR, reportType==="1"?smartMessage.get('sameXZAxisChartError'):smartMessage.get('sameXZAxisError'));
					return false;
				}else if(forms.find('td.js_select_chart_axis select[name="selReportXAxis"] option:selected').attr('value') === forms.find('td.js_select_chart_axis select[name="selReportXSecondAxis"]:visible option:selected').attr('value')){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('sameXXSecondAxisError'));
					return false;
				}else if(forms.find('td.js_select_chart_axis select[name="selReportZAxis"]:visible option:selected').attr('value') === forms.find('td.js_select_chart_axis select[name="selReportXSecondAxis"]:visible option:selected').attr('value')
							&& !isEmpty(forms.find('td.js_select_chart_axis select[name="selReportZAxis"]:visible'))){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('sameZXSecondAxisError'));
					return false;
				}				
				var paramsJson = {};
				var workReportEdit = forms.parent().find('.js_work_report_edit_page');
				if(isEmpty(workReportEdit)) workReportEdit = forms.parents('.js_report_list_page').find('.js_work_report_edit_page');
				var workId = workReportEdit.attr('workId');
				var targetWorkId = workReportEdit.attr('targetWorkId');
				paramsJson['workId'] = workId;
				paramsJson['targetWorkId'] = targetWorkId;
				var searchFilters = $('form[name="frmSearchFilter"]');
				for(var i=0; i<forms.length; i++){
					var form = $(forms[i]);
					if(form.attr('name') !== "frmSearchFilter" && !(!isEmpty(searchFilters) && form.attr('name') === "frmSearchInstance")){
						var visibleForm = form.find(':visible');
						paramsJson[form.attr('name')] = mergeObjects(visibleForm.serializeObject(), SmartWorks.GridLayout.serializeObject(visibleForm));
					}
				}
				if(!isEmpty(searchFilters)){
					var searchFilterArray = new Array();
					for(var i=0; i<searchFilters.length; i++){
						var searchFilter = $(searchFilters[i]);
						if(searchFilter.is(':visible'))
							searchFilterArray.push(searchFilter.serializeObject());
					}
					paramsJson['frmSearchFilters'] = searchFilterArray;
				}

				console.log(JSON.stringify(paramsJson));
				var url = "get_report_data_by_def.sw";
				smartPop.progressCont(input.parents('.js_work_report_edit').find('.js_progress_span:last'));
				$.ajax({
					url : url,
					contentType : 'application/json',
					type : 'POST',
					data : JSON.stringify(paramsJson),
					success : function(data, status, jqXHR) {
						try{
							var reportData = data;
							$.ajax({
								url : "work_report_view.sw",
								data : {
									workId: workId,
									reportType: reportType,
									chartType: chartType
								},
								success : function(data, status, jqXHR) {
									try{
										input.parents('.js_work_report_page').find('div.js_work_report_view').html(data).slideDown(500);
										smartChart.loadWithData(reportType, reportData, chartType, false, "chart_target");
										smartPop.closeProgress();
									}catch(error){
										smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_work_report_excuter work_report_view]', null, error);
									}			
								},
								error : function(xhr, ajaxOptions, thrownError){
									smartPop.closeProgress();						
								}
							});
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_work_report_excute get_report_data_by_def]', null, error);
						}			
	 				},
					error : function(xhr, ajaxOptions, e) {
						smartPop.closeProgress();
						smartPop.showInfo(smartPop.ERROR, smartMessage.get("createReportError"));
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_work_report_excute get_report_data_by_def]', null, e);
					}
				});
			
			}
			forms.find('.js_work_report_name input').addClass('required');
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_work_report_excute]', null, error);
		}			
		return false;
	});
	
	$('a.js_work_report_register').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var workReportEdit = input.parents('.js_work_report_edit').find('.js_work_report_edit_page');
			var workReportView = input.parents('.js_work_report_page').find('.js_work_report_view_page');
			var targetWorkId = workReportEdit.attr('targetWorkId');
			var targetWorkName = workReportEdit.attr('targetWorkName');
			var targetWorkIcon = workReportEdit.attr('targetWorkIcon');
			var reportId = workReportEdit.attr('reportId');
			var reportName = workReportEdit.find('input[name="txtWorkReportName"]').attr('value');
			var reportType = workReportEdit.find('input[name="rdoWorkReportType"]:checked').attr('value');
			
			var config = {};
			if(!isEmpty(workReportView)){
				config.chartType = workReportView.find('.js_change_chart_type option:selected').attr('value');
				config.isChartView = workReportView.find('.js_toggle_chart_table:visible').attr('reportType') == '1';
				config.isStacked = workReportView.find('input[name="chkStackedChart"]').is(':checked');
			}else{
				config.chartType = workReportEdit.find('.js_report_chart_type option:selected').attr('chartType');
				config.isChartView = reportType == '1';
				config.isStacked = false;			
			}
			
			config.showLegend = true;
			config.stringLabelRotation = null;
			config.paneColumnSpans = null;
			config.panePosition = null;
			smartPop.createReportPane(null, reportName, targetWorkId, targetWorkName, targetWorkIcon, reportId, reportName, reportType, config);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_work_report_register]', null, error);
		}			
		return false;
	});

	$('a.js_work_report_save').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var workReportEdit = input.parents('.js_work_report_edit');
			var forms = workReportEdit.find('form:visible');
			if (SmartWorks.GridLayout.validate(forms, $('.js_report_error_message'))) {
				var reportType = forms.find('input[name="rdoWorkReportType"]:checked').attr('value');
				var chartType = forms.find('select[name="selReportChartType"]').find('option:selected').attr('chartType');
				if(forms.find('td.js_select_chart_axis select[name="selReportXAxis"] option:selected').attr('value') === forms.find('td.js_select_chart_axis select[name="selReportZAxis"]:visible option:selected').attr('value')){
					smartPop.showInfo(smartPop.ERROR, reportType==="1"?smartMessage.get('sameXZAxisChartError'):smartMessage.get('sameXZAxisError'));
					return false;
				}else if(forms.find('td.js_select_chart_axis select[name="selReportXAxis"] option:selected').attr('value') === forms.find('td.js_select_chart_axis select[name="selReportXSecondAxis"]:visible option:selected').attr('value')){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('sameXXSecondAxisError'));
					return false;
				}else if(forms.find('td.js_select_chart_axis select[name="selReportZAxis"]:visible option:selected').attr('value') === forms.find('td.js_select_chart_axis select[name="selReportXSecondAxis"]:visible option:selected').attr('value')
							&& !isEmpty(forms.find('td.js_select_chart_axis select[name="selReportZAxis"]:visible'))){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('sameZXSecondAxisError'));
					return false;
				}				
				var paramsJson = {};
				var workReportEditPage = workReportEdit.find('.js_work_report_edit_page');
				paramsJson['workId'] = workReportEditPage.attr('workId');
				paramsJson['targetWorkId'] = workReportEditPage.attr('targetWorkId');
				var url = "create_new_work_report.sw";
				paramsJson['reportId'] = workReportEditPage.attr('reportId');
				if(!workReportEdit.find(".js_work_report_name").is(':visible') && !workReportEdit.find('form[name="frmReportSaveAsName"]').is(':visible')){
					url = "set_work_report.sw";
				}
					
				var searchFilters = $('form[name="frmSearchFilter"]:visible');
				for(var i=0; i<forms.length; i++){
					var form = $(forms[i]);
					if(form.attr('name') !== "frmSearchFilter" && !(!isEmpty(searchFilters) && form.attr('name') === "frmSearchInstance")){
						var visibleForm = form.find(':visible');
						paramsJson[form.attr('name')] = mergeObjects(visibleForm.serializeObject(), SmartWorks.GridLayout.serializeObject(visibleForm));
					}
				}
				if(!isEmpty(searchFilters)){
					var searchFilterArray = new Array();
					for(var i=0; i<searchFilters.length; i++){
						var searchFilter = $(searchFilters[i]);
						if(searchFilter.is(':visible'))
							searchFilterArray.push(searchFilter.serializeObject());
					}
					paramsJson['frmSearchFilters'] = searchFilterArray;
				}
				console.log(JSON.stringify(paramsJson));
				smartPop.progressCont(input.parents('.js_work_report_edit').find('form[name="frmAccessPolicy"]').nextAll('.js_progress_span'));
				$.ajax({
					url : url,
					contentType : 'application/json',
					type : 'POST',
					data : JSON.stringify(paramsJson),
					success : function(data, status, jqXHR) {
						try{
							$('.js_work_report_list_box:first').html(data);
							input.parents('.js_work_list_page').find('.js_work_list_home').click();
							smartPop.closeProgress();
					}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_work_report_save ' + url + ']', null, error);
						}			
	 				},
					error : function(xhr, ajaxOptions, e) {
						smartPop.closeProgress();
						smartPop.showInfo(smartPop.ERROR, smartMessage.get("createReportError"), null, e);
					}
				});
			
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_work_report_save]', null, error);
		}			
		return false;
	});

	$('a.js_work_report_delete').live('click', function(e) {
		try{
			var paramsJson = {};
			var workReportEdit = $(targetElement(e)).parents('.js_work_report_edit');
			var workReportEditPage = workReportEdit.find('.js_work_report_edit_page');
			paramsJson['workId'] = workReportEditPage.attr('workId');
			paramsJson['reportId'] = workReportEditPage.attr('reportId');
			console.log(JSON.stringify(paramsJson));
			smartPop.confirm("[" + workReportEditPage.find('input[name="txtWorkReportName"]').attr('value') + "]" + smartMessage.get("removeConfirmation"), 
				function(){
					smartPop.progressCont($(targetElement(e)).parents('.js_work_report_edit').find('form[name="frmAccessPolicy"]').nextAll('.js_progress_span'));
					$.ajax({
						url : "remove_work_report.sw",
						contentType : 'application/json',
						type : 'POST',
						data : JSON.stringify(paramsJson),
						success : function(data, status, jqXHR) {
							try{
								$('.js_work_report_list_box:first').html(data);
								$('a.js_work_report_close').click();
								$('.js_view_report_list a[producedBy="user"]').click();
								smartPop.closeProgress();
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_work_report_delete remove_work_report]', null, error);
							}			
						},
						error : function(xhr, ajaxOptions, e) {
							smartPop.closeProgress();
							smartPop.showInfo(smartPop.ERROR, smartMessage.get("removeReportError"), null, e);
						}
					});
			},
			function(){			
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_work_report_delete]', null, error);
		}					
		return false;
	});

	$('a.js_work_report_saveas').live('click', function(e) {
		try{
			var input = $(targetElement(e)).hide();
			var workReport = input.parents('.js_work_report_page:first');
			workReport.find('.js_button_save_as').hide();
			workReport.find('.js_button_save').show();
			workReport.find('form[name="frmReportSaveAsName"]').show();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_work_report_saveas]', null, error);
		}					
		return false;
	});

	$('select.js_select_work_report').live('change', function(e) {
		try{
			var input = $(targetElement(e));
			var workReport = $('div.js_work_report_page');
			var target = workReport.find('.js_work_report_view');
			var targetWorkId = workReport.attr('workId');
			var url = input.attr('href');
			var selected = input.children('option:selected');
			var reportId = selected.attr('value');
			if(reportId==="none"){
				target.slideUp().html('');
				workReport.find('.js_work_report_edit').slideUp().html('');
				return false;
			}
			var reportType = selected.attr('reportType');
			var chartType = selected.attr('chartType');
			var progressSpan = input.nextAll('span.js_progress_span');
			smartPop.progressCont(progressSpan);						
			workReport.find('.js_work_report_edit').slideUp().html('');
			$.ajax({
				url : url,
				data : {
					reportType: reportType,
					chartType: chartType
				},
				success : function(data, status, jqXHR) {
					try{
						target.html(data).slideDown(500);
						smartChart.load(reportType, reportId, chartType, false, "chart_target", targetWorkId);
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_select_work_report ' + url + ']', null, error);
					}									
				},
				error : function(xhr, ajaxOptions, thrownError){
					smartPop.closeProgress();						
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_select_work_report ' + url + ']', null, error);
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_select_work_report]', null, error);
		}					
		return false;
	});

	$('tr.js_select_work_report').live('click', function(e) {
		try{
			var input = $(targetElement(e)).parents('.js_select_work_report');
			var workReport = $('div.js_work_report_page');
			var target = workReport.find('.js_work_report_edit');
			var url = input.attr('href');
			var targetWorkId = workReport.attr('targetWorkId');
			var targetWorkName = workReport.attr('targetWorkName');
			var targetWorkIcon = workReport.attr('targetWorkIcon');
			var reportId = input.attr('reportId');
			var progressSpan = input.next('span.js_progress_span');
			smartPop.progressCont(progressSpan);
			workReport.find('.js_work_report_view').slideUp().html('');
			$.ajax({
				url : url,
				data : {
					reportId: reportId,
					targetWorkId: targetWorkId,
					targetWorkName: targetWorkName,
					targetWorkIcon: targetWorkIcon
				},
				success : function(data, status, jqXHR) {
					try{
						target.html(data).slideDown(500);
						target.find('select.js_select_y_axis option:selected').change();
						smartPop.closeProgress();						
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_select_work_report ' + url + ']', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, thrownError){
					smartPop.closeProgress();						
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_select_work_report ' + url + ']', null, error);
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_select_work_report]', null, error);
		}					
		return false;
	});

	$('select.js_change_chart_type').live('change', function(e) {
		try{
			var input = $(targetElement(e));
			var chartType = input.attr('value');
			var stackedChart = input.parents('.js_work_report_view_page').find('.js_stacked_chart');
			if(chartType === "column" || chartType === "bar") stackedChart.show();
			else stackedChart.hide();
			
			smartChart.reload(chartType, stackedChart.find('.js_change_stacked_chart').is(':checked'), true);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_edit_work_report js_change_chart_type]', null, error);
		}			
		return false;
	});

	$('input.js_change_stacked_chart').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var chartType = input.parents('.js_work_report_view_page').find('select.js_change_chart_type').attr('value');
			smartChart.reload(chartType, input.is(':checked'), true);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_change_stacked_chart]', null, error);
		}			
		return true;
	});

	$('a.js_toggle_chart_table').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var workReportView = input.parents('.js_work_report_view_page');
			var chartType = workReportView.find('select.js_change_chart_type').attr('value');
			var isChartView = workReportView.attr('isChartView');
			if(isChartView === 'true'){
				workReportView.attr('isChartView', 'false');
				workReportView.find('.js_stacked_chart').hide();
				workReportView.find('.js_chart_type').hide();
			}else{
				workReportView.attr('isChartView', 'true'); 
				if(chartType === "column" || chartType === "bar") workReportView.find('.js_stacked_chart').show();
				workReportView.find('.js_chart_type').show();
			}
			workReportView.find('a.js_toggle_chart_table').toggle();
			smartChart.reload(chartType, workReportView.find('input.js_change_stacked_chart').is(':checked'), workReportView.attr('isChartView')==="true");
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_toggle_chart_table]', null, error);
		}			
		return false;
	});

	$('tr.js_work_report_type td').live('change', function(e) {
		try{
			var input = $(targetElement(e));
			var workReportEdit = input.parents('.js_work_report_edit_page');
			var target = input.parents('table.js_report_title').next('table.js_form_by_report_type');
			var url = input.attr('href');
			var reportId = workReportEdit.attr('reportId');
			var reportType = input.attr('value');
			var targetWorkType = workReportEdit.attr('targetWorkType');
			var targetWorkId = workReportEdit.attr('targetWorkId');
			var isTaskInstance = workReportEdit.attr('isTaskInstance');
			var instanceType = (isEmpty(isTaskInstance) || targetWorkType != '22') ? 'process' : isTaskInstance == 'true' ? 'task' : 'process';
			$.ajax({
				url : url,
				data : {reportType : reportType,
						reportId : reportId,
						targetWorkType : targetWorkType,
						targetWorkId : targetWorkId,
						instanceType : instanceType
					},
				success : function(data, status, jqXHR) {
					try{
						workReportEdit.find('.js_target_work_type option[value="' + targetWorkType + '"]').attr('selected', 'selected');
						if(targetWorkType == '99')
							workReportEdit.find('.js_instance_type').hide();
						else
							workReportEdit.find('.js_instance_type').show().find('input[value="' + instanceType + '"]').attr('checked', 'checked');
						workReportEdit.find('.js_external_service').hide();
						workReportEdit.find('.js_report_search_filter').show();
						workReportEdit.find('.js_select_search_filter').show();
						workReportEdit.find('.js_all_search_filter').hide();
						workReportEdit.find('.js_external_service input[name="txtExternalServiceName"]').attr('value', '');
						workReportEdit.find('.js_external_service input[name="txtExternalServiceId"]').attr('value', '');
						workReportEdit.find('.js_edit_search_filter').attr('externalServiceId', '');
						workReportEdit.find('.js_search_filter_close').click();
						target.html(data).show();
						target.find('select.js_select_y_axis option:selected').change();
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_work_report_type ' + url + ']', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, thrownError){
					console.log(xhr, thrownError);
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_work_report_type ' + url + ']', null, error);
				}
			});
			$.ajax({
				url : 'search_filter.sw',
				data : {
						reportId : reportId,
						targetWorkType : targetWorkType,
						targetWorkId : targetWorkId,
						isReportFilter : 'true',
						isTaskFilter : instanceType=='task'
					},
				success : function(data, status, jqXHR) {
					try{
						$('#report_search_filter').html(data);
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_work_report_type search_filter.sw]', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, thrownError){
					console.log(xhr, thrownError);
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_work_report_type search_filter.sw]', null, error);
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_work_report_type]', null, error);
		}			
		return false;
	});

	$('tr.js_target_work_type select').live('change', function(e) {
		try{
			var input = $(targetElement(e));
			var target = input.parents('table.js_report_title').next('table.js_form_by_report_type');
			var workReportEdit = input.parents('.js_work_report_edit_page');
			var reportTypeElement = workReportEdit.find('.js_work_report_type input[name="rdoWorkReportType"]:checked');
			var url = reportTypeElement.attr('href');
			var reportType = reportTypeElement.attr('value');
			var targetWorkType = input.find('option:selected').attr('value');
			var targetWorkId = workReportEdit.attr('targetWorkId');
			if(targetWorkType == '99'){ 
				workReportEdit.find('.js_external_service').show();
				workReportEdit.find('.js_report_search_filter').hide();
				workReportEdit.find('.js_select_search_filter').hide();
				workReportEdit.find('.js_all_search_filter').show();
				workReportEdit.find('.js_instance_type').hide();	
			}else{
				workReportEdit.find('.js_external_service').hide();
				workReportEdit.find('.js_report_search_filter').show();
				workReportEdit.find('.js_select_search_filter').show();
				workReportEdit.find('.js_all_search_filter').hide();
				workReportEdit.find('.js_instance_type').show().find('input:first').attr('checked', 'checked').siblings().removeAttr('checked');
				workReportEdit.find('.js_external_service input[name="txtExternalServiceName"]').attr('value', '');
				workReportEdit.find('.js_external_service input[name="txtExternalServiceId"]').attr('value', '');
				workReportEdit.find('.js_edit_search_filter').attr('externalServiceId', '');
				workReportEdit.find('.js_search_filter_close').click();
			}
			$.ajax({
				url : url,
				data : {
					reportType: reportType,
					targetWorkType: targetWorkType,
					targetWorkId: targetWorkId
				},
				success : function(data, status, jqXHR) {
					try{
						target.html(data).show();
						target.find('select.js_select_y_axis option:selected').change();
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_target_work_type ' + url + ']', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, thrownError){
					console.log(xhr, thrownError);
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_target_work_type ' + url + ']', null, error);
				}
			});
			$.ajax({
				url : 'search_filter.sw',
				data : {
						targetWorkType : targetWorkType,
						targetWorkId : targetWorkId,
						isReportFilter : 'true'
					},
				success : function(data, status, jqXHR) {
					try{
						$('#report_search_filter').html(data);
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_target_work_type search_filter.sw]', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, thrownError){
					console.log(xhr, thrownError);
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_target_work_type search_filter.sw]', null, error);
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_target_work_type]', null, error);
		}			
		return false;
	});

	$('.js_select_instance_type').live('change', function(e) {
		try{
			var input = $(targetElement(e));
			var instanceType = input.attr('value');
			var target = input.parents('table.js_report_title').next('table.js_form_by_report_type');
			var workReportEdit = input.parents('.js_work_report_edit_page');
			var reportTypeElement = workReportEdit.find('.js_work_report_type input[name="rdoWorkReportType"]:checked');
			var url = reportTypeElement.attr('href');
			var reportType = reportTypeElement.attr('value');
			var targetWorkType = workReportEdit.find('.js_target_work_type option:selected').attr('value');
			var targetWorkId = workReportEdit.attr('targetWorkId');
			if(isEmpty(targetWorkType)) targetWorkType = workReportEdit.attr('targetWorkType');
			if(targetWorkType == '99'){ 
				workReportEdit.find('.js_external_service').show();
				workReportEdit.find('.js_report_search_filter').hide();
				workReportEdit.find('.js_select_search_filter').hide();
				workReportEdit.find('.js_all_search_filter').show();
	
			}else{
				workReportEdit.find('.js_external_service').hide();
				workReportEdit.find('.js_report_search_filter').show();
				workReportEdit.find('.js_select_search_filter').show();
				workReportEdit.find('.js_all_search_filter').hide();
				workReportEdit.find('.js_external_service input[name="txtExternalServiceName"]').attr('value', '');
				workReportEdit.find('.js_external_service input[name="txtExternalServiceId"]').attr('value', '');
				workReportEdit.find('.js_edit_search_filter').attr('externalServiceId', '');
				workReportEdit.find('.js_search_filter_close').click();
			}
			$.ajax({
				url : url,
				data : {
					reportType: reportType,
					targetWorkType: targetWorkType,
					targetWorkId: targetWorkId,
					instanceType: instanceType
				},
				success : function(data, status, jqXHR) {
					try{
						target.html(data).show();
						target.find('select.js_select_y_axis option:selected').change();
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_select_instance_type ' + url + ']', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, thrownError){
					console.log(xhr, thrownError);
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_select_instance_type ' + url + ']', null, error);
				}
			});
			$.ajax({
				url : 'search_filter.sw',
				data : {
						targetWorkType : targetWorkType,
						targetWorkId : targetWorkId,
						isReportFilter : 'true',
						isTaskFilter : instanceType=='task'
					},
				success : function(data, status, jqXHR) {
					try{
						$('#report_search_filter').html(data);
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_select_instance_type search_filter.sw]', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, thrownError){
					console.log(xhr, thrownError);
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_select_instance_type search_filter.sw]', null, error);
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_select_instance_type]', null, error);
		}			
		return false;
	});

	$('.js_pop_select_external_service').live('click', function(e) {
		try{
			smartPop.selectWebService();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_pop_select_external_service]', null, error);
		}			
		return false;
	});

	$('td.js_select_chart_axis select').live('change', function(e) {
		try{
			var input = $(targetElement(e));
			var type = input.children('option:selected').attr('type');
			var targetDate = input.nextAll('.js_axis_selector_date:first');
			var targetUser = input.nextAll('.js_axis_selector_user:first');
			if(type === "dateChooser" || type ==="dateTimeChooser"){
				targetDate.show();
				targetUser.hide();
			}else if(type === "userField"){
				targetDate.hide();
				targetUser.show();
			}else{
				targetDate.hide();
				targetUser.hide();			
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_select_chart_axis]', null, error);
		}			
		return false;
	});
	
	$('select.js_select_xaxis_max').live('change', function(e) {
		try{
			var input = $(targetElement(e));		
			if(input.children('option:selected').attr('value') === "unlimited"){
				input.next().hide();
			}else{
				input.next().show();
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_select_xaxis_max]', null, error);
		}			
		return false;
	});

	var DEFAULT_XAXIS_MAX_RECORDS = 50;
	$('input.js_xaxis_max_records').live('change', function(e) {
		try{
			var input = $(targetElement(e));
			var maxRecords = parseInt(input.attr('value'));
			if(maxRecords<=0 || maxRecords> DEFAULT_XAXIS_MAX_RECORDS){
				input.attr('value', DEFAULT_XAXIS_MAX_RECORDS);
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_xaxis_max_records]', null, error);
		}			
		return false;
	});

	var DEFAULT_ZAXIS_MAX_RECORDS = 10;
	$('input.js_zaxis_max_records').live('change', function(e) {
		try{
			var input = $(targetElement(e));
			var maxRecords = parseInt(input.attr('value'));
			if(maxRecords<=0 || maxRecords> DEFAULT_ZAXIS_MAX_RECORDS){
				input.attr('value', DEFAULT_ZAXIS_MAX_RECORDS);
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_xaxis_max_records]', null, error);
		}			
		return false;
	});

	$('select.js_select_y_axis').live('change', function(e) {
		try{
			var input = $(targetElement(e));
			if(!input.hasClass('js_select_y_axis')) input = input.parents('.js_select_y_axis');
			var fieldType = input.children('option:selected').attr('type');
			
			if(fieldType == "numberInput" || fieldType == "timeField" || fieldType == "currencyInput" || fieldType == "percentInput"){
				input.parents('tr').find('.js_value_type_number').show();
				input.parents('tr').find('.js_value_type_none_number').hide();
			}else{
				input.parents('tr').find('.js_value_type_number').hide();
				input.parents('tr').find('.js_value_type_none_number').show();
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_select_y_axis]', null, error);
		}			
		return false;
		
	});
	
	$('tr.js_add_chart_zaxis a').live('click', function(e) {
		try{
			var input = $(targetElement(e)).parents('tr.js_add_chart_zaxis:first').hide();
			input.next('tr.js_chart_zaxis').show();
			var secondZaxis = input.nextAll('tr.js_chart_zsecondaxis:first');
			if(secondZaxis.not(":visible") && secondZaxis.prevAll('tr.js_report_chart_type').not(':visible'))
				secondZaxis.prev('tr.js_add_chart_zsecondaxis').show();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_add_chart_zaxis]', null, error);
		}			
		return false;
	});
	$('.js_remove_chart_zaxis a').live('click', function(e){
		try{
			$(targetElement(e)).parents('tr.js_chart_zaxis:first').hide().prev('tr.js_add_chart_zaxis').show();
			$(targetElement(e)).parents('tr.js_chart_zaxis:first').nextAll('tr.js_add_chart_zsecondaxis:first').hide().next('tr.js_chart_zsecondaxis').hide();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_remove_chart_zaxis]', null, error);
		}			
		return false;
	});
	$('tr.js_add_chart_xsecondaxis a').live('click', function(e) {
		try{
			var input = $(targetElement(e)).parents('tr.js_add_chart_xsecondaxis:first').hide();
			input.next('tr.js_chart_xsecondaxis').show();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_add_chart_xsecondaxis]', null, error);
		}			
		return false;
	});
	$('.js_remove_chart_xsecondaxis a').live('click', function(e){
		try{
			$(targetElement(e)).parents('tr.js_chart_xsecondaxis:first').hide().prev('tr.js_add_chart_xsecondaxis').show();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_remove_chart_xsecondaxis]', null, error);
		}			
		return false;
	});
	$('tr.js_add_chart_zsecondaxis a').live('click', function(e) {
		try{
			var input = $(targetElement(e)).parents('tr.js_add_chart_zsecondaxis:first').hide();
			input.next('tr.js_chart_zsecondaxis').show();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_add_chart_zsecondaxis]', null, error);
		}			
		return false;
	});
	$('.js_remove_chart_zsecondaxis a').live('click', function(e){
		try{
			$(targetElement(e)).parents('tr.js_chart_zsecondaxis:first').hide().prev('tr.js_add_chart_zsecondaxis').show();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_remove_chart_zsecondaxis]', null, error);
		}			
		return false;
	});
	$('tr.js_toggle_chart_search_filter a').live('click', function(e) {
		try{
			var input = $(targetElement(e)).parent('td');
			var target = input.parent().next('tr.js_chart_search_filter');
			var actionType = input.attr('actionType');
			if(actionType!=null && actionType === "remove"){
				target.hide();
				input.hide().siblings().show();
			}else{
				$('#content').showLoading();						
				var url = input.parent().attr('url');
				$.ajax({
					url : url,
					data : {},
					success : function(data, status, jqXHR) {
						try{
							target.html(data).show();
							input.hide().siblings().show();
							$('#content').hideLoading();						
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_toggle_chart_search_filter ' + url + ']', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, thrownError){
						$('#content').hideLoading();											
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_toggle_chart_search_filter ' + url + ']', null, error);
					}
				});
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_toggle_chart_search_filter]', null, error);
		}			
		return false;
	});
	
	$('a.js_refresh_report_pane').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var workReportPane = input.parents('.js_work_report_pane_page');
			var paneId = workReportPane.attr('paneId');
			var paneName = workReportPane.attr('paneName');
			var paneColumnSpans = workReportPane.attr('paneColumnSpans');
			var panePosition = workReportPane.attr('panePosition');
			var targetWorkId = workReportPane.attr('targetWorkId');
			var targetWorkName = workReportPane.attr('targetWorkName');
			var targetWorkIcon = workReportPane.attr('targetWorkIcon');
			var reportId = workReportPane.attr('reportId');
			var reportName = workReportPane.attr('reportName');
			var reportType = workReportPane.attr('reportType');
			var chartType = workReportPane.attr('chartType');
			var isChartView = workReportPane.attr('isChartView');
			var isStacked = workReportPane.attr('isStacked');
			var showLegend = workReportPane.attr('showLegend');
			var stringLabelRotation = workReportPane.attr('stringLabelRotation');
			var progressSpan = input.nextAll('span.js_progress_span');
			smartPop.progressCont(progressSpan);						
			$.ajax({
				url : 'work_report_pane.sw',
				data : {
					paneId: paneId,
					paneName: paneName,
					paneColumnSpans: paneColumnSpans,
					panePosition: panePosition,
					targetWorkId: targetWorkId,
					targetWorkName: targetWorkName,
					targetWorkIcon: targetWorkIcon,
					reportId: reportId,
					reportName: reportName,
					reportType: reportType,
					chartType: chartType,
					isChartView: isChartView,
					isStacked: isStacked,
					showLegend: showLegend,
					stringLabelRotation: stringLabelRotation
				},
				success : function(data, status, jqXHR) {
					try{
						workReportPane.find('.js_chart_target_pane').removeClass('js_chart_target_pane').attr('id', '');
						workReportPane.parent().append(data);
						smartChart.loadPane(reportType, reportId, chartType, isStacked==='true', isChartView==='true', showLegend==='true', stringLabelRotation, "chart_target_"+panePosition, isEmpty(paneColumnSpans) ? 1 : parseInt(paneColumnSpans), workReportPane.parent().find('.js_work_report_pane_page:first'), targetWorkId);
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_refresh_report_pane work_report_pane]', null, error);
					}			
				},
				error : function(xhr, ajaxOptions, thrownError){
					smartPop.closeProgress();						
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_refresh_report_pane]', null, error);
		}			
		return false;
	});
	
	$('.js_edit_report_pane').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var workReportPane = input.parents('.js_work_report_pane_page');
			var paneId = workReportPane.attr('paneId');
			var paneName = workReportPane.attr('paneName');
			var targetWorkId = workReportPane.attr('targetWorkId');
			var targetWorkName = workReportPane.attr('targetWorkName');
			var targetWorkIcon = workReportPane.attr('targetWorkIcon');
			var reportId = workReportPane.attr('reportId');
			var reportName = workReportPane.attr('reportName');
			var reportType = workReportPane.attr('reportType');
			
			var config = {};
			config.chartType = workReportPane.attr('chartType');
			config.isChartView = workReportPane.attr('isChartView');
			config.isStacked = workReportPane.attr('isStacked');
			config.showLegend = workReportPane.attr('showLegend');
			config.stringLabelRotation = workReportPane.attr('stringLabelRotation');
			config.paneColumnSpans = workReportPane.attr('paneColumnSpans');
			config.panePosition = workReportPane.attr('panePosition');
			smartPop.createReportPane(paneId, paneName, targetWorkId, targetWorkName, targetWorkIcon, reportId, reportName, reportType, config);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_edit_report_pane]', null, error);
		}			
		return false;
	});
	
	$('.js_remove_report_pane').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var workReportPane = input.parents('.js_work_report_pane_page');
			var paneId = workReportPane.attr('paneId');
			var paneName = workReportPane.attr('paneName');
			var paneColumnSpans = parseInt(workReportPane.attr('paneColumnSpans'));
			var panePosition = parseInt(workReportPane.attr('panePosition'));
			var paramsJson = {};
			paramsJson['paneId'] = paneId;
			smartPop.confirm("[" + paneName + "]" + smartMessage.get("removeConfirmation"), 
				function(){
					$.ajax({
						url : "remove_work_report_pane.sw",
						contentType : 'application/json',
						type : 'POST',
						data : JSON.stringify(paramsJson),
						success : function(data, status, jqXHR) {
							try{
								var dashboardPaneRow = workReportPane.parents('.js_dashboard_pane_row');
								workReportPane.remove();
								if(paneColumnSpans>1 && panePosition>-1){
									var panesInSameRow = dashboardPaneRow.find('.js_work_report_pane_page');
									if(!isEmpty(panesInSameRow)){
										panesInSameRow.attr('paneColumnSpans', "" + (parseInt(paneColumnSpans)-1));
										for(var i=0; i<panesInSameRow.length; i++){
											smartChart.resizePane($(panesInSameRow[i]));
										}
									}
								}else if($('.js_dashboard_pane_row').length == 1){
									dashboardPaneRow.css('height','412px').css('text-align','center').html('<span><br><br><br><br><br>' + smartMessage.get('reportMessageNoReportPane') + '</span>');
								}else{
									dashboardPaneRow.remove();
								}
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_remove_report_pane remove_work_report_pane]', null, error);
							}			
						},
						error : function() {
		 					smartPop.showInfo(smartPop.ERROR, smartMessage.get('removeReportPaneError'), function(){}, e);
						}					
					});
				},
				function(){
				});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_remove_report_pane]', null, error);
		}			
		return false;
	});
	
	$('.js_pop_all_target_works').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			var reportList = input.parents('.js_report_list_page');
			var target = reportList.find('.js_all_target_work_popup');
			target.css('left', input.position().left + input.width() + 10 + 'px').css('top', target.position().top + 1 + 'px');
			smartPop.selectWork(target);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_pop_all_target_works]', null, error);
		}			
		return false;
	});

	$('.js_report_list_title').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			if(input.hasClass('js_user_report_count')) input = input.parent();
			input.parent().removeClass('disabled').siblings().addClass('disabled');
			
			var reportList = input.parents(".js_report_list_page");
			var targetWorkId = reportList.attr('targetWorkId');
			var targetWorkType = reportList.attr('targetWorkType');
			var producedBy = input.attr('producedBy');
			if(producedBy === "smartworks") reportList.find('form[name="frmSearchInstance"]').hide();
			else reportList.find('form[name="frmSearchInstance"]').show();
			reportList.find('.js_work_report_close').click();
			smartPop.progressCenter();
			$.get('get_user_report_count.sw?targetWorkId=' + targetWorkId,  function(data){
				try{
					reportList.find('.js_user_report_count').html('[' + data + ']');
				}catch(error){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_report_list_title get_user_report_count]', null, error);
				}			
			});
			$.get('report_instance_list.sw?targetWorkId=' + targetWorkId + '&targetWorkType=' + targetWorkType + '&producedBy=' + producedBy,  function(data){
				try{
					reportList.find('#report_instance_list_page').html(data);
					reportList.attr('producedBy', producedBy);
					smartPop.closeProgress();
				}catch(error){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_report_list_title report_instance_list]', null, error);
				}			
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report js_report_list_title]', null, error);
		}			
		return false;
	});

	$(window).resize(function() {
		try{
			if(swReportResizing) return;
			
			if(!isEmpty($('.js_work_report_pane_page'))){
				swReportResizing = true;
				setTimeout(function(){
					smartChart.resizePane();
					swReportResizing = false;
				},1000);
			}else if(!isEmpty($('.js_work_report_view_page'))){
				swReportResizing = true;
				setTimeout(function(){
					smartChart.resize();
					swReportResizing = false;
				},1000);
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report window resize]', null, error);
		}			
	});
});
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-report script]', null, error);
}