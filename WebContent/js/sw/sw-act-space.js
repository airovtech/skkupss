$(function() {

	try{
		var timeOffset = (new Date()).getTimezoneOffset()/60 + parseInt(currentUser.timeOffset);
		var today = new Date();
		today.setTime(today.getTime() + timeOffset*60*60*1000);
		function updateNowString(){
			var now = new Date();
			now.setTime(now.getTime() + timeOffset*60*60*1000);
			if(!(today.getFullYear() == now.getFullYear() && today.getMonth() == now.getMonth() && today.getDate() == now.getDate())){
				today = new Date();
				today.setTime(today.getTime() + timeOffset*60*60*1000);
				$.ajax({url : "localdate_string.sw", success : function(data, status, jqXHR) {
						try{
							$('.js_now_date_string').html(data);
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space updateNowString localdate_string]', null, error);
						}			
					}
				});
			}	
			$('.js_now_time_string').html(now.format("TT h:MM:ss"));
			setTimeout(function(){
				updateNowString();
			}, 1000);
		};
		
		if(!isEmpty($('.js_now_time_string'))) updateNowString();
	
		$('a.js_space_tab_index').live('click',function(e) {
			try{
				var input = $(targetElement(e)).parents('a:first');
				if(isEmpty(input)) input = $(targetElement(e));
				var target = input.parents('.js_space_instance_list');
				var url = input.attr('href');
				smartPop.progressCont(input.parents('.js_space_tab_page').children('.js_progress_span:first'));
				$.ajax({
					url : url,
					data : {},
					success : function(data, status, jqXHR) {
						try{
							target.html(data);
							if(!isEmpty(target.parents('.js_my_running_instance_list_page'))){
								target.children('div:first').removeClass('portlet_r').find('ul>div').removeClass('contents_space');
							}
							smartPop.closeProgress();
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_space_tab_index ' + url + ']', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, thrownError){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_space_tab_index]', null, thrownError);
						smartPop.closeProgress();
					}
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[js_pane_tab_index script]', null, error);
			}			return false;
		});
	
		$('a.js_space_datepicker_button').live('click', function(e) {
			try{
				var input = $(targetElement(e));
				input.parents('.js_space_instance_list').find('.js_space_datepicker').datepicker("show");
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_space_datepicker_button]', null, error);
			}
			return false;
		});
	
		$('select.js_space_select_scope').live('change',function(e) {
			try{
				var input = $(targetElement(e));
				if(!input.hasClass('js_space_select_scope')) input = input.parents('.js_space_select_scope:first');
				var target = input.parents('.js_space_instance_list');
				var url = input.find(':selected').attr('value');
				var workSpaceId = input.attr('workSpaceId');
				smartPop.progressCont(input.parents('.js_space_date_scope').children('.js_progress_span:first'));
				$.ajax({
					url : url,
					data : {
						workSpaceId : workSpaceId
					},
					success : function(data, status, jqXHR) {
						try{
							target.html(data);
							if(!isEmpty(target.parents('.js_my_running_instance_list_page'))){
								target.children('div:first').removeClass('portlet_r').find('ul>div').removeClass('contents_space');
							}
							smartPop.closeProgress();
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_space_select_scope ' + url + ']', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, thrownError){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_space_select_scope]', null, thrownError);
						smartPop.closeProgress();
					}
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-js_space_select_scope script]', null, error);
			}			return false;
		});
		
		$('a.js_space_more_history').live('click',function(e) {
			try{
				var input = $(targetElement(e));
				if(!isEmpty(input.siblings('.js_progress_span').find('.js_progress_icon'))) 
					return false;
				smartPop.progressCont(input.siblings('.js_progress_span'));
				var fromDate = input.attr('lastDate');
				var target = input.parents('ul:first');
				var spaceTimeline = input.parents('.js_space_timeline_page');
				var spaceDayly = input.parents('.js_space_dayly_page');
				var spaceWeekly = input.parents('.js_space_weekly_page');
				var spaceMonthly = input.parents('.js_space_monthly_page');
				var spaceInstanceList = input.parents('.js_space_instance_list_page');
				var smartcaster = input.parents('.js_smartcaster_page');
				var myRunningInstanceList = input.parents('.js_my_running_instance_list_page');
				//if(!isEmpty(myRunningInstanceList)) target = target.find('.js_instance_list_table');
				var spacePage = [];
				var toDate = "";
				if(!isEmpty(spaceTimeline)){
					spacePage = spaceTimeline;
					toDate = input.parents('.js_space_timeline').attr('toDate');
				}else if(!isEmpty(spaceDayly)){
					spacePage = spaceDayly;
					toDate = input.parents('.js_space_dayly_work_hour').attr('toDate');
				}else if(!isEmpty(spaceWeekly)){
					spacePage = spaceWeekly;
					toDate = input.parents('.js_space_weekly_day').attr('toDate');
				}else if(!isEmpty(spaceMonthly)){
					spacePage = spaceMonthly;
					toDate = input.parents('.js_space_monthly_week').attr('toDate');
				}else if(!isEmpty(spaceInstanceList)){
					spacePage = spaceInstanceList;
				}else if(!isEmpty(smartcaster) || !isEmpty(myRunningInstanceList)){
					$.ajax({
						url : "more_smartcast.sw",
						data : {
							fromDate : fromDate,
							maxSize : 10
						},
						success : function(data, status, jqXHR) {
							try{
								input.parents('li:first').remove();
								target.append($(data).find('ul:first').children());
								smartPop.closeProgress();
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_space_more_history more_smartcast]', null, error);
							}			
						},
						error : function(xhr, ajaxOptions, thrownError){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_space_more_history]', null, thrownError);
							smartPop.closeProgress();
						}
					});
					return false;
				}
				
				var contextId = spacePage.attr('contextId');
				var spaceId = spacePage.attr('spaceId');		
				$.ajax({
					url : "more_space_task_histories.sw",
					data : {
						contextId : contextId,
						spaceId : spaceId,
						fromDate : fromDate,
						toDate : toDate,
						maxSize : 10
					},
					success : function(data, status, jqXHR) {
						try{
							input.parents('li:first').remove();
							target.append($(data).find('li.js_space_sub_instance'));
							smartPop.closeProgress();
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_space_more_history more_space_task_histories]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, thrownError){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_space_more_history]', null, throwError);
						smartPop.closeProgress();
					}
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[js_space_more_history script]', null, error);
			}
			return false;
		});
		
		$('a.js_space_more_instance').live('click',function(e) {
			try{
				var input = $(targetElement(e));
				if(!isEmpty(input.siblings('.js_progress_span').find('.js_progress_icon'))) 
					return false;
				smartPop.progressCont(input.siblings('.js_progress_span'));
				var fromDate = input.attr('lastDate');
				var maxSize = input.attr('maxSize');
				var target = input.parents('ul:first');
				var spacePage = input.parents('.js_space_instance_list_page');
				var spaceId = spacePage.attr('spaceId');		
				$.ajax({
					url : "more_space_sub_instances.sw",
					data : {
						spaceId : spaceId,
						fromDate : fromDate,
						maxSize : maxSize
					},
					success : function(data, status, jqXHR) {
						try{
							input.parents('li:first').remove();
							target.append(data);
							smartPop.closeProgress();
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_space_more_instance more_space_sub_instances]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, thrownError){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_space_more_instance]', null, thrownError);
						smartPop.closeProgress();
					}
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[js_space_more_instance script]', null, error);
			}
			return false;
		});
		
		$('a.js_view_instance_diagram').live('click',function(e) {
			try{
				var input = $(targetElement(e));
				input.parent().hide().next().show();
				var pworkSpace = input.parents('.js_pwork_space_page:first');
				var target = pworkSpace.find('.js_process_instance_viewer');
				var instanceId = pworkSpace.attr('instId');
				loadInstanceViewer(target, {
						instanceId : instanceId
				});
				target.show();
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[js_view_instance_diagram script]', null, error);
			}
			return false;
		});
	
		$('a.js_close_instance_diagram').live('click',function(e) {
			try{
				var input = $(targetElement(e));
				input.parent().hide().prev().show();
				var pworkSpace = input.parents('.js_pwork_space_page:first');
				var target = pworkSpace.find('.js_process_instance_viewer');
				target.hide().html('');
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[js_close_instance_diagram script]', null, error);
			}
			return false;
		});
		
		var userInfoTimer = null;
		var onUserInfoTimer = null;
		smartPop.closeUserInfo();
		$('.js_pop_user_info').live('mouseenter', function(e){
			try{
				if(userInfoTimer!=null){
					clearTimeout(userInfoTimer);
					userInfoTimer = null;
				}
				if(onUserInfoTimer!=null){
					clearTimeout(onUserInfoTimer);
					onUserInfoTimer = null;
				}
				smartPop.closeUserInfo();
		
				var input = $(targetElement(e)).parents('.js_pop_user_info');
				if(input.attr('userId') === currentUser.userId){
					return;
				}
				onUserInfoTimer = setTimeout(function(){
					try{
						onUserInfoTimer = null;
						var picture = input.children('img');
						if(isEmpty(picture)) return;
						
						var top = picture.offset().top+ picture.height();
						var scrollHeight = $(window).scrollTop() + window.innerHeight;
						var directionUp = true;
						var popUserInfo = $('#sw_pop_user_info');
						if((top+popUserInfo.height()) > scrollHeight){
							top = picture.offset().top;
							directionUp = false;
						}
						var left = picture.offset().left + picture.width()/2;
						smartPop.showUserInfo(input, top, left, directionUp);
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_pop_user_info onUserInfoTimer]', null, error);
					}			
				}, 1000);
			
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[js_pop_user_info script]', null, error);
			}
		});
	
		$('.js_pop_user_info').live('mouseleave', function(e){
			try{
				if(onUserInfoTimer!=null){
					clearTimeout(onUserInfoTimer);
					onUserInfoTimer = null;
					return;
				}
				userInfoTimer = setTimeout(function(){
					smartPop.closeUserInfo();
					userInfoTimer = null;
				}, 300);
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[js_pop_user_info script]', null, error);
			}
		});
		
		$('#sw_pop_user_info').live('mouseenter', function(e){
			try{
				if(onUserInfoTimer!=null){
					clearTimeout(onUserInfoTimer);
					onUserInfoTimer = null;
				}
				if(userInfoTimer!=null){
					clearTimeout(userInfoTimer);
					userInfoTimer = null;
				}		
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw_pop_user_info script]', null, error);
			}
		});
	
		$('#sw_pop_user_info').live('mouseleave', function(e){
			try{
				if(onUserInfoTimer!=null){
					clearTimeout(onUserInfoTimer);
					onUserInfoTimer = null;
					return;
				}
				userInfoTimer = setTimeout(function(){
					smartPop.closeUserInfo();
					userInfoTimer = null;
				}, 300);
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw_pop_user_info script]', null, error);
			}
		});
		
		$('#sw_pop_user_info').live('blur', function(e){
			try{
				if(onUserInfoTimer!=null){
					clearTimeout(onUserInfoTimer);
					onUserInfoTimer = null;
					return;
				}
				userInfoTimer = setTimeout(function(){
					smartPop.closeUserInfo();
					userInfoTimer = null;
				}, 300);
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw_pop_user_info script]', null, error);
			}
		});
		
		$('.js_image_display_by').live('change', function(e){
			try{
				var input = $(targetElement(e));
				var imageList = input.parents('.js_image_list_page');
				var wid = imageList.find('.js_image_instance_list_page').attr('spaceId');
				var displayType = input.attr('value');
				smartPop.progressCont(imageList.find('.js_image_list_header span.js_progress_span'));
				$.ajax({
					url : "get_image_category_list_page.sw",
					data : {
						displayType : displayType,
						wid : wid,
					},
					success : function(data, status, jqXHR) {
						try{
							imageList.find('.js_image_category_list').html(data.listPage);
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_image_display_by get_image_category_list_page]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, thrownError){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_space_more_history]', null, thrownError);
					}
				});
		
				$.ajax({
					url : "image_instance_list.sw",
					data : {
						displayType : displayType,
						parentId : ""
					},
					success : function(data, status, jqXHR) {
						try{
							var target = input.parents('.js_image_list_page').find('.js_image_instance_list');
							target.html(data);
							imageList.find('.js_image_instance_list_page').attr('displayType', displayType).attr('categoryId', "AllFiles");
							if(displayType == '1'){
								imageList.find('.js_add_image_folder_btn').css('visibility', 'visible');
							}else{
								imageList.find('.js_add_image_folder_btn').css('visibility', 'hidden');
							}
							imageList.find('.js_image_select_buttons').hide();
							imageList.find('.js_move_selected_images').hide();
							imageList.find('.js_remove_selected_images').hide();					
							smartPop.closeProgress();
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_image_display_by image_instance_list]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, thrownError){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_space_more_history]', null, thrownError);
						smartPop.closeProgress();
					}
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[js_image_display_by script]', null, error);
			}
			return false;
			
		});
		
		$('a.js_image_instance_item').live('click', function(e){
			try{
				var input = $(targetElement(e)).parents('a');
				var imageInstanceList = input.parents('.js_image_instance_list_page');
				var imageList = input.parents('.js_image_list_page');
				var parentId = input.attr('categoryId');
				var displayType = imageInstanceList.attr('displayType');
				input.parents('.js_image_list_page').find('.js_image_category_list option[value="' + parentId + '"]').attr('selected', 'true');
				smartPop.progressCont(imageInstanceList.parents('.js_image_list_page').find('.js_image_list_header span.js_progress_span'));
				$.ajax({
					url : "image_instance_list.sw",
					data : {
						displayType : displayType,
						parentId : parentId
					},
					success : function(data, status, jqXHR) {
						try{
							var target = input.parents('.js_image_list_page').find('.js_image_instance_list');
							target.html(data);
							imageList.find('.js_add_image_folder_btn').css('visibility', 'hidden');
							imageList.find('.js_goto_parent_list').show();
							if(displayType == '1'){
								imageList.find('.js_image_select_buttons').show();
								imageList.find('.js_move_selected_images').show();
								imageList.find('.js_remove_selected_images').show();
							}else{
								imageList.find('.js_image_select_buttons').hide();
								imageList.find('.js_move_selected_images').hide();
								imageList.find('.js_remove_selected_images').hide();					
							}
							smartPop.closeProgress();
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_image_instance_item image_instance_list]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, thrownError){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_space_more_history]', null, thrownError);
						smartPop.closeProgress();
					}
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[js_image_instance_item script]', null, error);
			}
			return false;
			
		});
	
		$('.js_image_category_list').live('change', function(e){
			try{
				var input = $(targetElement(e));
				var imageList = input.parents('.js_image_list_page');
				var imageInstanceList = input.parents('.js_image_list_page').find('.js_image_instance_list_page');
				var displayType = imageInstanceList.attr('displayType');
				var parentId = input.find('option:selected').attr('value');
				smartPop.progressCont(imageInstanceList.parents('.js_image_list_page').find('.js_image_list_header span.js_progress_span'));
				$.ajax({
					url : "image_instance_list.sw",
					data : {
						displayType : displayType,
						parentId : parentId
					},
					success : function(data, status, jqXHR) {
						try{
							var target = input.parents('.js_image_list_page').find('.js_image_instance_list');
							target.html(data);
							if(displayType == '1'){
								if(parentId == "AllFiles"){
									imageList.find('.js_add_image_folder_btn').css('visibility', 'visible');
									imageList.find('.js_image_select_buttons').hide();
									imageList.find('.js_move_selected_images').hide();
									imageList.find('.js_remove_selected_images').hide();
									imageList.find('.js_goto_parent_list').hide();
								}else{
									imageList.find('.js_add_image_folder_btn').css('visibility', 'hidden');
									imageList.find('.js_image_select_buttons').show();
									imageList.find('.js_move_selected_images').show();
									imageList.find('.js_remove_selected_images').show();						
									imageList.find('.js_goto_parent_list').show();
								}
							}else{
								imageList.find('.js_add_image_folder_btn').css('visibility', 'hidden');
								imageList.find('.js_image_select_buttons').hide();
								imageList.find('.js_move_selected_images').hide();
								imageList.find('.js_remove_selected_images').hide();
								if(parentId == "AllFiles"){
									imageList.find('.js_goto_parent_list').hide();						
								}else{
									imageList.find('.js_goto_parent_list').show();						
								}
							}
							smartPop.closeProgress();
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_image_category_list image_instance_list]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, thrownError){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_image_category_list]', null, thrownError);
						smartPop.closeProgress();
					}
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[js_image_category_list script]', null, error);
			}
			return false;		
		});
		
		$('.js_goto_parent_list').live('click', function(e){
			try{
				var input = $(targetElement(e));
				var imageList = input.parents('.js_image_list_page');
				var imageCategoryList = imageList.find('.js_image_category_list');
				imageCategoryList.find('option[value="AllFiles"]').attr('selected', 'selected');
				imageCategoryList.change();
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[js_goto_parent_list script]', null, error);
			}
			return false;
		});
		
		$('.js_file_display_by').live('change', function(e){
			try{
				var input = $(targetElement(e));
				var fileList = input.parents('.js_file_list_page');
				var displayType = input.attr('value');
				smartPop.progressCont(input.parent().nextAll('span.js_progress_span:last'));
				fileList.find('.js_file_category_name').hide().html('');
				if(displayType == 0){
					input.parents('.contents_space').addClass('lft_fd');
					fileList.find('.js_file_category_tree').parent().removeClass('btn_fold');
					fileList.find('.js_file_categories').hide();
					fileList.attr('displayType', displayType);
					fileList.attr('categoryId', currentUser.companyId);
					
					fileList.attr('workSpaceId', '');
					
					smartPop.closeProgress();
					selectListParam();			
			
				}else if(displayType == 4){
					fileList.find('.js_file_category_tree').parent().addClass('btn_fold');
					fileList.find('.js_file_categories').show();
					input.parents('.contents_space').removeClass('lft_fd');
					$.ajax({
						url : "pop_select_community.sw",
						data : {
							multiUsers : 'false'
						},
						success : function(data, status, jqXHR) {
							try{
								var target = fileList.find('.js_file_categories');
								target.html(data).find('.js_pop_select_community_page').css('border', 'none');
								fileList.find('.js_add_file_folder_btn').hide();
								var departmentItem = target.find('.js_drill_down a[departmentId="' + currentUser.companyId + '"]');
								departmentItem.parent().find('.icon_tbull_b:first').next().text(currentUser.company);
								fileList.attr('displayType', displayType);
								fileList.removeAttr('workSpaceId').removeAttr('categoryId');
								smartPop.closeProgress();
								selectListParam();			
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_file_display_by pop_select_ommunity]', null, error);
							}			
						},
						error : function(xhr, ajaxOptions, thrownError){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_file_display_by]', null, thrownError);
						}
					});
					
				}else{
					fileList.find('.js_file_category_tree').parent().addClass('btn_fold');
					fileList.find('.js_file_categories').show();
					$.ajax({
						url : "categories_by_type.sw",
						data : {
							displayType : displayType,
							wid : "",
							parentId : ""
						},
						success : function(data, status, jqXHR) {
							try{
								var target = fileList.find('.js_file_categories');
								target.html(data);
								fileList.attr('displayType', displayType);
								fileList.removeAttr('workSpaceId').removeAttr('categoryId');
								smartPop.closeProgress();
								selectListParam();			
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_file_display_by categories_by_type]', null, error);
							}			
						},
						error : function(xhr, ajaxOptions, thrownError){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_file_display_by]', null, thrownError);
							smartPop.closeProgress();
						}
					});
			
				}
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[js_file_display_by script]', null, error);
			}
			return false;
			
		});
	
		$('.js_file_workspace_item').live('click', function(e){
			try{
				var input = $(targetElement(e)).parents('a');
				var workSpaceId = input.attr('workSpaceId');
				var fileList = input.parents('.js_file_list_page');
				fileList.attr('workSpaceId', workSpaceId);
				fileList.attr('categoryId', 'AllFiles');
				input.parents('.left_fold_area').find('.js_file_workspace_item').parent().removeClass('current');
				input.parents('.left_fold_area').find('.js_file_category_item').parent().removeClass('current');
				input.parent().addClass('current');
				fileList.find('.js_file_category_name').show().html('<option>' + input.attr('workSpaceName') + '</option>');
				selectListParam();
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[js_file_workspace_item script]', null, error);
			}
			return false;		
		});
		
		$('.js_file_category_item').live('click', function(e){
			try{
				var input = $(targetElement(e)).parents('a');
				var categoryId = input.attr('categoryId');
				var fileList = input.parents('.js_file_list_page');
				var workSpaceFolder = input.parents('.js_workspace_folders_target:first');
				fileList.attr('workSpaceId', workSpaceFolder.attr('workSpaceId'));
				fileList.attr('categoryId', categoryId);
				input.parents('.left_fold_area').find('.js_file_workspace_item').parent().removeClass('current');
				input.parents('.left_fold_area').find('.js_file_category_item').parent().removeClass('current');
				input.parent().addClass('current');
				fileList.find('.js_file_category_list').find('option[value="' + categoryId + '"]').attr('selected', 'selected');
				fileList.find('.js_file_category_name').show().html('<option>' + workSpaceFolder.attr('workSpaceName') + '▶' + input.attr('categoryName') + '</option>');
				selectListParam();
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[js_file_category_item script]', null, error);
			}
			return false;		
		});
		
		$('.js_toggle_file_workspace').live('click', function(e){
			try{
				var input = $(targetElement(e));
				if(!input.hasClass('js_tree_collapsed')){
					input.removeClass('js_tree_expanded').removeClass('down').addClass('js_tree_collapsed').parents('li').find('.js_workspace_folders_target:first').html('');
					input.parents('li').find('.js_add_file_folder_btn:first').hide();
					return false;
				}
				var workSpaceId = input.next().attr('workSpaceId');
				var displayType = 1;	
				smartPop.progressCont(input.nextAll('span.js_progress_span:last'));
				$.ajax({
					url : "categories_by_type.sw",
					data : {
						displayType : displayType,
						wid : workSpaceId,
						parentId : ""
					},
					success : function(data, status, jqXHR) {
						try{
							input.removeClass('js_tree_collapsed').addClass('down').addClass('js_tree_expanded').parents('li').find('.js_workspace_folders_target:first').html(data);
							input.parents('li').find('.js_add_file_folder_btn:first').show();
							smartPop.closeProgress();
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_toggle_file_workspace categories_by_type]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, thrownError){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_toggle_file_workspace]', null, thrownError);
						smartPop.closeProgress();
					}
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[js_toggle_file_workspace script]', null, error);
			}
			return false;		
		});
		
		$('a.js_file_category_tree').live('click', function(e){
			try{
				var input = $(targetElement(e)).parent();
				if(input.parent().hasClass('lft_fd')) input.parent().removeClass('lft_fd');
				else input.parent().addClass('lft_fd');
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[js_file_category_tree script]', null, error);
			}
			return false;		
		});
			
		$('.js_toggle_asset_folder').live('click', function(e){
			try{
				var input = $(targetElement(e));
				if(!input.hasClass('js_tree_collapsed')){
					input.removeClass('js_tree_expanded').removeClass('down').addClass('js_tree_collapsed').parents('li').find('.js_asset_list_target:first').html('');
					return false;
				}
				var folderId = input.next().attr('folderId');
				smartPop.progressCont(input.nextAll('span.js_progress_span:last'));
				$.ajax({
					url : "assets_by_asset_folder.sw",
					data : {
						folderId : folderId
					},
					success : function(data, status, jqXHR) {
						try{
							input.removeClass('js_tree_collapsed').addClass('down').addClass('js_tree_expanded').parents('li').find('.js_asset_list_target:first').html(data);
							smartPop.closeProgress();
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_toggle_asset_folder assets_by_asset_folder]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, thrownError){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_toggle_asset_folder]', null, thrownError);
						smartPop.closeProgress();
					}
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_toggle_asset_folder]', null, error);
			}
			return false;		
		});
		
		$('.js_add_asset_btn').live('click', function(e){
			try{
				var input = $(targetElement(e));
				smartPop.createAsset(input.attr('folderId'), input.attr('folderName'), input.attr('assetType'), input.attr('autoApproval'), input.attr('autoReturn'), null, null);
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_add_asset_btn]', null, error);
			}
			return false;
			
		});
			
		$('.js_add_asset_folder_btn').live('click', function(e){
			try{
				var input = $(targetElement(e));
				smartPop.createAssetFolder(null, null, null, null, null);
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_add_asset_folder_btn]', null, error);
			}
			return false;
			
		});
			
		$('.js_text_asset_folder_btn').live('click', function(e){
			try{
				var input = $(targetElement(e));
				var folderId = input.attr("folderId");
				var folderName = input.attr("folderName");
				var assetType = input.attr("assetType");
				var autoApproval = input.attr("autoApproval");
				var autoReturn = input.attr("autoReturn");
				smartPop.createAssetFolder(folderId, folderName, assetType, autoApproval, autoReturn);
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_text_asset_folder_btn]', null, error);
			}
			return false;			
		});
			
		$('.js_asset_folder_item').live('click', function(e){
			try{
				var input = $(targetElement(e));
				if(!input.hasClass('js_asset_folder_item'))
					input = input.parents('.js_asset_folder_item');
				var folderId = input.attr("folderId");
				input.parents('.js_asset_list_page').attr('categoryId', folderId);
				selectListParam(null, false);
				input.parents('.js_asset_categories').find('li>div').removeClass('current');
				input.parents('li:first').children('div:first').addClass('current');
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_asset_folder_item]', null, error);
			}
			return false;			
		});
			
		$('.js_remove_asset_folder_btn').live('click', function(e){
			try{
				var input = $(targetElement(e));
				var fileList = input.parents('.js_asset_list_page');
				var folderId = input.attr("folderId");
				if(!isEmpty(input.parents('li:first').find('.js_asset_list_target li'))){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get("folderIsNotEmptyError"), function(){}, e);
					return false;
				}
				smartPop.confirm(smartMessage.get("removeConfirmation"), function(){
					var paramsJson = {};
					paramsJson['folderId'] = folderId;
					smartPop.progressCenter();
					console.log(JSON.stringify(paramsJson));
					$.ajax({
						url : "remove_asset_folder.sw",
						contentType : 'application/json',
						type : 'POST',
						data : JSON.stringify(paramsJson),
						success : function(data, status, jqXHR) {
							try{
								input.parents('li:first').remove();
								smartPop.closeProgress();				
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_remove_file_folder_btn remove_file_folder]', null, error);
							}			
						},
						error : function(xhr, ajaxOptions, e) {
							// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
							smartPop.showInfo(smartPop.ERROR, smartMessage.get("removeFileFolderError"), function(){
								smartPop.closeProgress();
							}, e);
						}
					});
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_remove_file_folder_btn]', null, error);
			}
			return false;
			
		});
			
		$('.js_add_file_folder_btn').live('click', function(e){
			try{
				var input = $(targetElement(e));
				var workSpaceId = input.parent().attr("workSpaceId");
				var parentId = input.parent().attr("categoryId");
				smartPop.createFileFolder(workSpaceId, parentId, null, null);
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_add_file_folder_btn]', null, error);
			}
			return false;
			
		});
			
		$('.js_text_file_folder_btn').live('click', function(e){
			try{
				var input = $(targetElement(e));
				var workSpaceTarget = input.parents('.js_workspace_folders_target');
				var workSpaceId = workSpaceTarget.attr("workSpaceId");
				var folderId = input.attr("folderId");
				var folderName = input.attr("folderName");
				smartPop.createFileFolder(workSpaceId, "", folderId, folderName);
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_text_file_folder_btn]', null, error);
			}
			return false;			
		});
			
		$('.js_remove_file_folder_btn').live('click', function(e){
			try{
				var input = $(targetElement(e));
				var fileList = input.parents('.js_file_list_page');
				var workSpaceTarget = input.parents('.js_workspace_folders_target');
				var workSpaceId = workSpaceTarget.attr("workSpaceId");
				var parentId = input.parent().attr("categoryId");
				var folderId = input.attr("folderId");
				smartPop.confirm(smartMessage.get("removeConfirmation"), function(){
					var paramsJson = {};
					paramsJson['workSpaceId'] = workSpaceId;
					paramsJson['parentId'] = parentId;
					paramsJson['folderId'] = folderId;
					smartPop.progressCenter();
					console.log(JSON.stringify(paramsJson));
					$.ajax({
						url : "remove_file_folder.sw",
						contentType : 'application/json',
						type : 'POST',
						data : JSON.stringify(paramsJson),
						success : function(data, status, jqXHR) {
							try{
								fileList.find('.js_file_categories .js_file_workspace_item[workSpaceId="' + workSpaceId + '"]').prev().click().click();
								smartPop.closeProgress();				
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_remove_file_folder_btn remove_file_folder]', null, error);
							}			
						},
						error : function(xhr, ajaxOptions, e) {
							// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
							smartPop.showInfo(smartPop.ERROR, smartMessage.get("removeFileFolderError"), function(){
								smartPop.closeProgress();
							}, e);
						}
					});
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_remove_file_folder_btn]', null, error);
			}
			return false;
			
		});
			
		$('.js_move_selected_files').live('click', function(e){
			try{
				var input = $(targetElement(e));
				var fileList = input.parents('.js_file_list_page');
				var selectedFiles = fileList.find('.js_file_instance_list_page .js_check_file_instance:checked');
				
				if(isEmpty(selectedFiles)){
					smartPop.showInfo(smartPop.WARN, smartMessage.get("moveItemsNotSelected"));			
					return false;
				}
				smartPop.moveFiles();
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_move_selected_files]', null, error);
			}
			return false;
			
		});
	
		$('.js_add_image_folder_btn').live('click', function(e){
			try{
				var input = $(targetElement(e));
				var ImageList = input.parents('.js_image_list_page');
				var workSpaceId = ImageList.attr("workSpaceId");
				var parentId = ImageList.attr("categoryId");
				smartPop.createImageFolder(workSpaceId, parentId, null, null);
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_add_image_folder_btn]', null, error);
			}
			return false;
			
		});
			
		$('.js_text_image_folder_btn').live('click', function(e){
			try{
				var input = $(targetElement(e));
				var imageList = input.parents('.js_image_list_page');
				var workSpaceId = imageList.attr("workSpaceId");
				var parentId = imageList.attr("categoryId");
				var folderId = input.attr("folderId");
				var folderName = input.attr("folderName");
				smartPop.createImageFolder(workSpaceId, parentId, folderId, folderName);
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_text_image_folder_btn]', null, error);
			}
			return false;
			
		});
			
		$('.js_remove_image_folder_btn').live('click', function(e){
			try{
				var input = $(targetElement(e));
				var imageList = input.parents('.js_image_list_page');
				var workSpaceId = imageList.attr("workSpaceId");
				var parentId = imageList.attr("categoryId");
				var folderId = input.attr("folderId");
				smartPop.confirm(smartMessage.get("removeConfirmation"), function(){
					var paramsJson = {};
					paramsJson['workSpaceId'] = workSpaceId;
					paramsJson['parentId'] = parentId;
					paramsJson['folderId'] = folderId;
					smartPop.progressCenter();
					console.log(JSON.stringify(paramsJson));
					$.ajax({
						url : "remove_image_folder.sw",
						contentType : 'application/json',
						type : 'POST',
						data : JSON.stringify(paramsJson),
						success : function(data, status, jqXHR) {
							try{
								input.parents('li:first').remove();
								smartPop.closeProgress();				
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_remove_image_folder_btn remove_image_folder]', null, error);
							}			
						},
						error : function(xhr, ajaxOptions, e) {
							// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
							smartPop.showInfo(smartPop.ERROR, smartMessage.get("removeImageFolderError"), function(){
								smartPop.closeProgress();
							}, e);
						}
					});
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_remove_image_folder_btn]', null, error);
			}
			return false;
			
		});
			
		$('.js_remove_image_instance_btn').live('click', function(e){
			try{
				var input = $(targetElement(e));
				var imageList = input.parents('.js_image_list_page');
				var workSpaceId = imageList.attr("workSpaceId");
				var workId = input.attr("workId");
				var instanceId = input.attr("instanceId");
				smartPop.confirm(smartMessage.get("removeConfirmation"), function(){
					var paramsJson = {};
					paramsJson['workSpaceId'] = workSpaceId;
					paramsJson['instanceId'] = instanceId;
					paramsJson['workId'] = workId;
					smartPop.progressCenter();
					console.log(JSON.stringify(paramsJson));
					$.ajax({
						url : "remove_image_instance.sw",
						contentType : 'application/json',
						type : 'POST',
						data : JSON.stringify(paramsJson),
						success : function(data, status, jqXHR) {
							try{
								input.parents('li:first').remove();
								smartPop.closeProgress();				
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_remove_image_instance_btn remove_image_instance]', null, error);
							}			
						},
						error : function(xhr, ajaxOptions, e) {
							// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
							smartPop.showInfo(smartPop.ERROR, smartMessage.get("removeImageInstanceError"), function(){
								smartPop.closeProgress();
							}, e);
						}
					});
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_remove_image_instance_btn]', null, error);
			}
			return false;
			
		});
	
		$('.js_move_selected_images').live('change', function(e){
			try{
				var input = $(targetElement(e));
				var imageList = input.parents('.js_image_list_page');
				var workSpaceId = imageList.attr("workSpaceId");
				var selectedFolder = imageList.find('.js_image_instance_list_page').attr('parentId');
				var selectedImages = imageList.find('.js_image_instance_list_page .js_check_image_instance:checked');
				var targetId = input.find('option:selected').attr('value');
				if(isEmpty(targetId))
					return true;
				
				if(isEmpty(selectedImages)){
					smartPop.showInfo(smartPop.WARN, smartMessage.get("moveItemsNotSelected"));			
					return false;
				}
				smartPop.confirm(smartMessage.get("moveConfirmation"), function(){
					var paramsJson = {};
					paramsJson['workSpaceId'] = workSpaceId;
					paramsJson['tagetFolderId'] = targetId;
					paramsJson['sourceFolderId'] = selectedFolder;
					var instanceIds = new Array();
					for(var i=0; i<selectedImages.length; i++){
						instanceIds.push($(selectedImages[i]).attr('value'));
					}
					paramsJson['instanceIds'] = instanceIds;
					smartPop.progressCenter();
					console.log(JSON.stringify(paramsJson));
					$.ajax({
						url : "move_image_instances.sw",
						contentType : 'application/json',
						type : 'POST',
						data : JSON.stringify(paramsJson),
						success : function(data, status, jqXHR) {
							try{
								window.location.reload(true);
								smartPop.closeProgress();				
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_move_selected_images move_image_instances]', null, error);
							}			
						},
						error : function(xhr, ajaxOptions, e) {
							// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
							smartPop.showInfo(smartPop.ERROR, smartMessage.get("moveImageInstancesError"), function(){
								smartPop.closeProgress();
							}, e);
						}
					});
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_move_selected_image]', null, error);
			}
			return false;
			
		});
	
		$('.js_check_all_image_instance').live('click', function(e){
			try{
				var input = $(targetElement(e));
				var imageInstanceList = input.parents('.js_image_list_page').find('.js_image_instance_list_page');
				imageInstanceList.find('.js_check_image_instance').attr('checked', (input.attr('checked')=='checked'));
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_check_all_image_instance]', null, error);
			}
			return true;
		});
		
		$('.js_check_all_file_instance').live('click', function(e){
			try{
				var input = $(targetElement(e));
				var fileInstanceList = input.parents('.js_file_list_page').find('.js_file_instance_list_page');
				fileInstanceList.find('.js_check_file_instance').attr('checked', (input.attr('checked')=='checked'));
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_check_all_file_instance]', null, error);
			}
			return true;
		});
		
		$('.js_check_file_instance').live('click', function(e){
			e.stopPropagation();
			return true;
		});
		
		$('a.js_file_instance_list').live('click', function(e){
			try{
				var input = $(targetElement(e)).parents('a');
				var fileList = input.parents('.js_file_list_page');
				var categoryId = input.attr('categoryId');
				var displayType = fileList.attr('displayType');
				$.ajax({
					url : "set_file_instance_list.sw",
					data : {
						displayType : displayType,
						catetoryId : categoryId
					},
					success : function(data, status, jqXHR) {
						try{
							var target = fileList.find('.js_file_instance_list');
							target.html(data);
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_file_instance_list set_file_instance_list]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, thrownError){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_file_instance_list]', null, thrownError);
					}
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_file_instance_list]', null, error);
			}
			return false;
			
		});
		
		$('.js_return_on_comment').live('keydown', function(e) {
			try{
				var e = window.event || e;
				var keyCode = e.which || e.keyCode;
				if(e.shiftKey && keyCode==$.ui.keyCode.SHIFT){ return true;
				}else if(e.shiftKey && keyCode==$.ui.keyCode.ENTER){
					e.keyCode = $.ui.keyCode.ENTER;
					e.which = $.ui.keyCode.ENTER;
					return true;
				}else if(keyCode != $.ui.keyCode.ENTER){
					return;
				}
				var input = $(targetElement(e));
				var subInstanceList = input.parents('.js_sub_instance_list:first');
				if(isEmpty(subInstanceList)) subInstanceList = input.parents('.js_more_instance_item:first');
				if(isEmpty(subInstanceList)) subInstanceList = input.parents('td.js_content_target:first');
				var comment = input.attr('value');
				if(isEmpty(comment)) return false;
				comment = comment.replace(/\n/g,"<br>");
				var iworkManual = input.parents('.js_iwork_manual_page');
				var pworkManual = input.parents('.js_pwork_manual_page');
				var newComment = input.parents('.js_new_comment_page');
				var showPicture = input.parents('.js_show_picture_page');
				var workList = input.parents('.js_work_list_page');
				var workId="", workInstanceId="", workType="", url="";
		
				if(!isEmpty(showPicture)){
					workInstanceId = showPicture.attr('instanceId');
					workType = showPicture.attr('workType');
				}else if(!isEmpty(iworkManual)){
					workId = iworkManual.attr('workId');
					workType = iworkManual.attr('workType');
				}else if(!isEmpty(pworkManual)){
					workId = pworkManual.attr('workId');
					workType = pworkManual.attr('workType');
				}else if(!isEmpty(newComment)){
					workInstanceId = newComment.attr('instanceId');
					workType = newComment.attr('workType');
				}else if(!isEmpty(workList)){
					workInstanceId = input.parents('tr:first').prev().attr('instanceId');
					workType = input.parents('tr:first').prev().attr('workType');
				}else{
					workInstanceId = input.parents('li:first').attr('instanceId');
					workType = input.parents('li:first').attr('workType');
				}
				var paramsJson = {};
				paramsJson['workType'] = parseInt(workType);
				if(!isEmpty(workId)){
					paramsJson['workId'] = workId;
					url = "add_comment_on_work.sw";
				}else if(!isEmpty(workInstanceId)){
					paramsJson['workInstanceId'] = workInstanceId;
					url = "add_comment_on_instance.sw";
				}
				paramsJson['comment'] = comment;
				smartPop.progressCenter();
				console.log(JSON.stringify(paramsJson));
				$.ajax({
					url : url,
					contentType : 'application/json',
					type : 'POST',
					data : JSON.stringify(paramsJson),
					success : function(data, status, jqXHR) {
						try{
							if(isEmpty(newComment)){
								var target = subInstanceList.find('.js_comments_box .js_comment_list');
								var newCommentInstance = target.find('.js_comment_instance').clone().show().removeClass('js_comment_instance');
								newCommentInstance.find('.js_comment_content').html(comment).append("<span class='ml5 icon_new'></span>");
								target.append(newCommentInstance);
								input.attr('value', '');
								if(subInstanceList.hasClass('js_content_target')){
									var subCountStr = subInstanceList.parents('tr:first').prev().find('font.js_sub_count');
									if(isEmpty(subCountStr.children())){
										subCountStr.html('[<b>1</b>]');
									}else{
										subCountStr.find('b').html(parseInt(subCountStr.find('b').html())+1);								
									}
								}
							}else{
								input.attr('value', '');
								refreshCurrentContent(input.parents('.js_space_instance_list_page'));
								//window.location.reload(true);
							}
							smartPop.closeProgress();				
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_return_on_comment ' + url + ']', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, e) {
						// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
						smartPop.showInfo(smartPop.ERROR, smartMessage.get("addCommentError"), function(){
							smartPop.closeProgress();
						}, e);
						
					}
					
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_return_on_comment]', null, error);
			}
		});
		
		$('.js_reply_forward').live('click', function(e) {
			try{
				var input = $(targetElement(e));
				var workSpacePage = input.parents('.js_iwork_space_page:first');
				if(isEmpty(workSpacePage)) workSpacePage = input.parents('.js_pwork_space_page:first');
				if(isEmpty(workSpacePage)){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get("commentTaskApprovalError"));
					return false;
				}
				var appendTaskForward = workSpacePage.find('.js_append_task_forward_page');
				var appendTaskApproval = workSpacePage.find('.js_append_task_approval_page');
				var comment = appendTaskForward.find('textarea[name="txtaCommentContent"]').attr('value');
				var comment2 = appendTaskApproval.find('textarea[name="txtaCommentContent"]').attr('value');
				if(isEmpty(comment) && isEmpty(comment2)){
					smartPop.showInfo(smartPop.WARN, smartMessage.get("missingCommentTaskForward"));			
					return false;
				}
				if(!isEmpty(comment)) comment = comment.replace(/\n/g,"<br>");
				if(!isEmpty(comment2)) comment2 = comment2.replace(/\n/g,"<br>");
				smartPop.confirm(smartMessage.get("commentTaskForwardConfirm"), function(){
					var paramsJson = {};
					if(!isEmpty(comment)){
						paramsJson['workInstId'] = appendTaskForward.attr('workInstId');
						paramsJson['forwardId'] = appendTaskForward.attr('forwardId');
						paramsJson['taskInstId'] = appendTaskForward.attr('taskInstId');
						paramsJson['comments'] = comment;
					}else if(!isEmpty(comment2)){
						paramsJson['workInstId'] = appendTaskApproval.attr('workInstId');
						paramsJson['forwardId'] = appendTaskApproval.attr('forwardId');
						paramsJson['taskInstId'] = appendTaskApproval.attr('taskInstId');
						paramsJson['comments'] = comment2;				
					}
					paramsJson['workId'] = workSpacePage.attr('workId');
					paramsJson['formId'] = workSpacePage.find('form[name="frmSmartForm"]').attr('formId');
					console.log(JSON.stringify(paramsJson));
					var progressSpan = workSpacePage.find('.js_progress_span:first');
					smartPop.progressCont(progressSpan);
					$.ajax({
						url : "comment_on_task_forward.sw",
						contentType : 'application/json',
						type : 'POST',
						data : JSON.stringify(paramsJson),
						success : function(data, status, jqXHR) {
							try{
								// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
								smartPop.closeProgress();
								var inlineTarget = input.parents('.js_content_target');
								if(isEmpty(inlineTarget)){
									var lastHref = workSpacePage.attr('lastHref');
									if(isEmpty(lastHref))
										window.location.reload(true); 
									else
										//refreshCurrentContent(workSpacePage);
										document.location.href = lastHref;
								}else{
									inlineTarget.find('.js_cancel_inline_task_instance').attr('action', 'forward').attr('clickY', e.clientY).click();
								}
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_reply_forward comment_on_task_forward]', null, error);
							}			
						},
						error : function(xhr, ajaxOptions, e) {
							// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
							smartPop.showInfo(smartPop.ERROR, smartMessage.get("commentTaskForwardError"), function(){
								smartPop.closeProgress();
							}, e);					
						}
						
					});			
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_reply_forward]', null, error);
			}
			return false;
		});
		
		$('.js_reply_approval').live('click', function(e) {
			try{
				var input = $(targetElement(e)).parents('.js_reply_approval:first');
				var workSpacePage = input.parents('.js_iwork_space_page:first');
				if(isEmpty(workSpacePage)) workSpacePage = input.parents('.js_pwork_space_page:first');
				if(isEmpty(workSpacePage)){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get("commentTaskApprovalError"));
					return false;
				}
				var appendTaskApproval = workSpacePage.find('.js_append_task_approval_page');
				var comment = appendTaskApproval.find('textarea[name="txtaCommentContent"]').attr('value');
				if(isEmpty(comment)){
					smartPop.showInfo(smartPop.WARN, smartMessage.get("missingCommentTaskApproval"));			
					return false;
				}
				comment = comment.replace(/\n/g,"<br>");
				smartPop.confirm(smartMessage.get("commentTaskApprovalConfirm"), function(){
					var result = (input.parents().hasClass('js_btn_approve_approval')) ? "approved" 
							: (input.parents().hasClass('js_btn_reject_approval')) ? "rejected" 
							: (input.parents().hasClass('js_btn_submit_approval')) ? "submited" 
							: (input.parents().hasClass('js_btn_return_approval')) ? "returned" : "";
					var paramsJson = {};
					paramsJson['workId'] = workSpacePage.attr('workId');
					paramsJson['workInstId'] = appendTaskApproval.attr('workInstId');
					paramsJson['approvalInstId'] = appendTaskApproval.attr('approvalInstId');
					paramsJson['taskInstId'] = appendTaskApproval.attr('taskInstId');
					paramsJson['comments'] = comment;
					paramsJson['result'] = result;
					if(result === "submited"){
						var forms = workSpacePage.find('form[name="frmSmartForm"]');
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
						
					}else{
						paramsJson['formId'] = workSpacePage.find('form[name="frmSmartForm"]').attr('formId');
					}
					console.log(JSON.stringify(paramsJson));
					var progressSpan = workSpacePage.find('.js_progress_span:first');
					smartPop.progressCont(progressSpan);
					$.ajax({
						url : "comment_on_task_approval.sw",
						contentType : 'application/json',
						type : 'POST',
						data : JSON.stringify(paramsJson),
						success : function(data, status, jqXHR) {
							try{
								// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
								smartPop.closeProgress();
								var inlineTarget = input.parents('.js_content_target');
								if(isEmpty(inlineTarget)){
									var lastHref =  workSpacePage.attr('lastHref');
									if(isEmpty(lastHref))
										window.location.reload(true);
									else
										document.location.href = lastHref;
								}else{
									inlineTarget.find('.js_cancel_inline_task_instance').attr('action', 'approval').attr('clickY', e.clientY).click();
								}
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_reply_approval comment_on_task_approval]', null, error);
							}			
						},
						error : function(xhr, ajaxOptions, e) {
							// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
							smartPop.showInfo(smartPop.ERROR, smartMessage.get("commentTaskApprovalError"), function(){
								smartPop.closeProgress();					
							}, e);
						}
						
					});			
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_reply_approval]', null, error);
			}
			return false;
		});
		
		$('.js_show_more_comments').live('click', function(e) {
			try{
				var input = $(targetElement(e));
				if(!input.hasClass('js_show_more_comments')) input = input.parents('.js_show_more_comments');
				var target = input.parents('.js_comment_list:first');
				var href = input.attr('href');
				$.ajax({
					url : href,
					data : {},
					success : function(data, status, jqXHR) {
						try{
							if(isEmpty(input.parents('.js_work_manual_page'))){
								var prevCount = target.children('li:visible').length -1; 
								target.children('li:visible:first').replaceWith(data);
								var showMore = target.find('li:visible:first .js_show_more_comments');
								if(!isEmpty(showMore)){
									var count = parseInt(showMore.children('span:first').html()) - prevCount;
									if(count>0)
										showMore.children('span:first').html(count);
									else
										showMore.parents('li:first').hide();
								}
							}else{
								target.children('li:visible').remove();
								target.append(data);
							}
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_show_more_comments ' + url + ']', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, e) {
						// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
						smartPop.showInfo(smartPop.ERROR, smartMessage.get("addCommentError"), function(){
						}, e);
						
					}
					
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_show_more_comments]', null, error);
			}
			return false;
		});
		
		$('a.js_add_comment').live('click', function(e){
			try{
				var input = $(targetElement(e)).parents('a.js_add_comment').removeAttr('href').addClass('no_hover_line');
				input.find('.t_action').addClass('t_action_disabled');
				input.parents('.js_action_btns').prev('.js_comments_box').show().find('.js_return_on_comment').show();
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_add_comment]', null, error);
			}
			return false;
		});
	
		$('a.js_add_like').live('click', function(e){
			try{
				var input = $(targetElement(e)).parents('a.js_add_like').removeAttr('href').addClass('no_hover_line');
				input.find('.t_action').addClass('t_action_disabled');
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_add_like]', null, error);
			}
			return false;
		});
		
		$('.js_invite_group_members').live('click', function(e){
			try{
				var input = $(targetElement(e));
				var spaceId = input.parents('.js_space_profile_page').attr('spaceId');
				smartPop.inviteGroupMembers(spaceId);
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_invite_group_members]', null, error);
			}
			return false;
		});
			
		$('.js_join_group_request').live('click', function(e){
			try{
				var input = $(targetElement(e));
				var spaceId = input.parents('.js_space_profile_page').attr('spaceId');
				var isAutoApproval = input.attr('isAutoApproval');
				var paramsJson = {};
				paramsJson['groupId'] = spaceId;
				paramsJson['userId'] = currentUser.userId;	
				console.log(JSON.stringify(paramsJson));
				$.ajax({
					url : "join_group_request.sw",
					contentType : 'application/json',
					type : 'POST',
					data : JSON.stringify(paramsJson),
					success : function(data, status, jqXHR) {
						try{
							if(isAutoApproval == 'true'){
								smartPop.showInfo(smartPop.INFO, smartMessage.get("joinGroupSucceed"), function(){
									smartPop.closeProgress();
								});
							}else{
								smartPop.showInfo(smartPop.INFO, smartMessage.get("joinGroupRequestSucceed"), function(){
									smartPop.closeProgress();
								});					
							}
							$('#js_group_space_home').click();
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_join_group_request join_group_request]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, e) {
						// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
						smartPop.showInfo(smartPop.ERROR, smartMessage.get("joinGroupRequestError"), function(){
							smartPop.closeProgress();					
						}, e);
					}
					
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_join_group_request]', null, error);
			}
			return false;
		});
		
		$('.js_leave_group_request').live('click', function(e){
			try{
				smartPop.confirm(smartMessage.get("leaveGroupConfirmation"), function(){
					var input = $(targetElement(e));
					var spaceProfile = input.parents('.js_space_profile_page');
					var spaceTabGroupMembers = input.parents('.js_space_tab_group_members_page');
					var isGroupLeader = input.attr('isGroupLeader');
					var spaceId = "";
					if(!isEmpty(spaceProfile))
						spaceId = spaceProfile.attr('spaceId');
					else if(!isEmpty(spaceTabGroupMembers))
						spaceId = spaceTabGroupMembers.attr('groupId');
					var paramsJson = {};
					paramsJson['groupId'] = spaceId;
					paramsJson['leaveReason'] = "";	
					console.log(JSON.stringify(paramsJson));
					$.ajax({
						url : "leave_group.sw",
						contentType : 'application/json',
						type : 'POST',
						data : JSON.stringify(paramsJson),
						success : function(data, status, jqXHR) {
							try{
								document.location.href = "home.sw";
								smartPop.closeProgress();
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_leave_group_request leave_group]', null, error);
							}			
						},
						error : function(xhr, ajaxOptions, e) {
							// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
							smartPop.showInfo(smartPop.ERROR, smartMessage.get("leaveGroupRequestError"), function(){
								smartPop.closeProgress();					
							}, e);
						}
						
					});
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_leave_group_request]', null, error);
			}
			return false;
		});
		
		$('.js_pushout_group_member').live('click', function(e){
			try{
				smartPop.confirm(smartMessage.get("pushoutGroupMemberConfirmation"), function(){
					var input = $(targetElement(e));
					var groupId = input.parents('.js_space_tab_group_members_page').attr('groupId');
					var userId = input.attr('memberId');
					var paramsJson = {};
					paramsJson['groupId'] = groupId;
					paramsJson['userId'] = userId;		
					console.log(JSON.stringify(paramsJson));
					smartPop.progressCenter();				
					$.ajax({
						url : 'pushout_group_member.sw',
						contentType : 'application/json',
						type : 'POST',
						data : JSON.stringify(paramsJson),
						success : function(data, status, jqXHR) {
							try{
								$('.js_goto_update_group_members').click();
								smartPop.closeProgress();
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_pushout_group_member pushout_group_member]', null, error);
							}			
						},
						error : function(xhr, ajaxOptions, e) {
							smartPop.showInfo(smartPop.ERROR, smartMessage.get("pushoutGroupMemberError"), function(){
								smartPop.closeProgress();					
							}, e);
						}
					});
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_pushout_group_member]', null, error);
			}
			return false;
		});
		
		$('.js_accept_join_group').live('click', function(e){
			try{
				var input = $(targetElement(e));
				var groupId = input.parents('.js_space_tab_group_members_page').attr('groupId');
				var userId = input.attr('userId');
				var paramsJson = {};
				paramsJson['groupId'] = groupId;
				paramsJson['userId'] = userId;	
				paramsJson['approval'] = true;
				console.log(JSON.stringify(paramsJson));
				$.ajax({
					url : "approval_join_group.sw",
					contentType : 'application/json',
					type : 'POST',
					data : JSON.stringify(paramsJson),
					success : function(data, status, jqXHR) {
						try{
							$('.js_goto_update_group_members').click();
							smartPop.closeProgress();
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_accept_join_group approval_join_group]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, e) {
						smartPop.showInfo(smartPop.ERROR, smartMessage.get("acceptJoinGroupError"), function(){
							smartPop.closeProgress();					
						}, e);
					}
					
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_accept_join_group]', null, error);
			}
			return false;
		});
		
		$('.js_reject_join_group').live('click', function(e){
			try{
				var input = $(targetElement(e));
				var groupId = input.parents('.js_space_tab_group_members_page').attr('groupId');
				var userId = input.attr('userId');
				var paramsJson = {};
				paramsJson['groupId'] = groupId;
				paramsJson['userId'] = userId;	
				paramsJson['approval'] = false;
				console.log(JSON.stringify(paramsJson));
				$.ajax({
					url : "approval_join_group.sw",
					contentType : 'application/json',
					type : 'POST',
					data : JSON.stringify(paramsJson),
					success : function(data, status, jqXHR) {
						try{
							$('.js_goto_update_group_members').click();
							smartPop.closeProgress();
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_reject_join_group approval_join_group]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, e) {
						smartPop.showInfo(smartPop.ERROR, smartMessage.get("rejectJoinGroupError"), function(){
							smartPop.closeProgress();					
						}, e);
					}
					
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_reject_join_group]', null, error);
			}
			return false;
		});
		
		$('.js_toggle_policy_custom').live('change', function(e){
			var input = $(targetElement(e));
			input.nextAll('.js_space_policy_custom:first').toggle();		
		});
		
		$('.js_toggle_builder_policy_custom').live('change', function(e){
			var input = $(targetElement(e));
			input.nextAll('.js_builder_policy_custom:first').toggle();		
		});
		
		$('.js_select_group_space_tab').live('click', function(e){
			try{
				var input = $(targetElement(e));
				input.parent().addClass('current').siblings().removeClass('current');
				input.nextAll('.js_space_policy_custom:first').toggle();
				var groupId = input.parents('.js_space_tab_group').attr('groupId');
				var url = "";
				if(input.hasClass('js_setting'))
					url = "space_tab_group_setting.sw";
				else if(input.hasClass('js_members'))
					url = "space_tab_group_members.sw";
		
				$.ajax({
					url : url,
					data : {groupId : groupId},
					success : function(data, status, jqXHR) {
						try{
							input.parents('.js_space_tab_group_target').html(data);
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_select_group_space_tab ' + url + ']', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, e) {
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_select_group_space_tab]', null, e);
					}
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_select_group_space_tab]', null, error);
			}
			return false;
		});
		
		$('a.js_group_more_members').live('click',function(e) {
			try{
				var input = $(targetElement(e));
				if(!isEmpty(input.siblings('.js_progress_span').find('.js_progress_icon'))) 
					return false;
				smartPop.progressCont(input.siblings('.js_progress_span'));
				var lastId = input.attr('lastId');
				var target = input.parents('ul:first');
				var spacePage = input.parents('.js_space_tab_group_members_page');
				var groupId = spacePage.attr('groupId');		
				$.ajax({
					url : "more_group_members.sw",
					data : {
						groupId : groupId,
						lastId : lastId,
						maxSize : 20
					},
					success : function(data, status, jqXHR) {
						try{
							input.parents('li:first').remove();
							target.append(data);
							smartPop.closeProgress();
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_group_more_members more_group_members]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, thrownError){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_group_more_members]', null, thrownError);
						smartPop.closeProgress();
					}
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_group_more_members]', null, error);
			}
			return false;
		});
			
		$('a.js_more_image_instance_list').live('click',function(e) {
			try{
				var input = $(targetElement(e));
				if(!isEmpty(input.siblings('.js_progress_span').find('.js_progress_icon'))) 
					return false;
				smartPop.progressCont(input.siblings('.js_progress_span'));
				var fromDate = input.attr('lastDate');
				var target = input.parents('ul:first');
				var imageInstanceList = input.parents('.js_image_instance_list_page');
				var parentId = imageInstanceList.attr('parentId');
				var displayType = imageInstanceList.attr('displayType');
				$.ajax({
					url : "image_instance_list.sw",
					data : {
						parentId : parentId,
						displayType : displayType,
						lastDate : fromDate
					},
					success : function(data, status, jqXHR) {
						try{
							input.parents('div:first').remove();
							target.append(data);
							smartPop.closeProgress();
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_more_image_instance_list image_instance_list]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, thrownError){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_more_image_instance_list]', null, thrownError);
						smartPop.closeProgress();
					}
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_more_image_instance_list]', null, error);
			}
			return false;
		});
		
		$('.js_toggle_update_histories').live('click', function(e){
			try{
				var input = $(targetElement(e));
				if(!input.hasClass('js_toggle_update_histories')) input = input.parents('.js_toggle_update_histories');
				var workSpace = input.parents('.js_iwork_space_page:first, .js_pwork_space_page:first');
				var target = workSpace.find('.js_instance_histories');
				if(isEmpty(target.children())){
					target.addClass('js_update');
				}else{
					target.html('').hide();
					if(!target.hasClass('js_update')){
						target.addClass('js_update').removeClass('js_download').removeClass('js_forward').removeClass('js_related');
					}else{
						target.removeClass('js_update');
						return false;
					}
				}
				var instanceId = workSpace.attr('instId');
				$.ajax({
					url : 'update_histories.sw',
					data : {
						instanceId : instanceId
					},
					success : function(data, status, jqXHR) {
						try{
							target.html(data).show();
							var target_point = $(target).find("div.up_point:first");
							target_point.css({"left": (input.position().left) + "px"});
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_toggle_update_histories update_histories]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, e) {
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_toggle_update_histories]', null, e);
					}
				});				
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_toggle_update_histories]', null, error);
			}
			return false;
		});
		
		$('.js_toggle_forward_histories').live('click', function(e){
			try{
				var input = $(targetElement(e));
				if(!input.hasClass('js_toggle_forward_histories')) input = input.parents('.js_toggle_forward_histories');
				var workSpace = input.parents('.js_iwork_space_page:first, .js_pwork_space_page:first');
				var target = workSpace.find('.js_instance_histories');
				
				if(isEmpty(target.children())){
					target.addClass('js_forward');			
				}else{
					target.html('').hide();
					if(!target.hasClass('js_forward')){
						target.addClass('js_forward').removeClass('js_download').removeClass('js_update').removeClass('js_related');
					}else{
						target.removeClass('js_forward');
						return false;
					}
				}
				var instanceId = workSpace.attr('instId');
				$.ajax({
					url : 'forward_histories.sw',
					data : {
						instanceId : instanceId
					},
					success : function(data, status, jqXHR) {
						try{
							target.html(data).show();
							var target_point = $(target).find("div.up_point:first");
							target_point.css({"left": (input.position().left) + "px"});
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_toggle_forward_histories forward_histories]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, e) {
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_toggle_forward_histories]', null, e);
					}
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_toggle_forward_histories]', null, error);
			}
			return false;
		});
		
		$('.js_toggle_download_histories').live('click', function(e){
			try{
				var input = $(targetElement(e));
				if(!input.hasClass('js_toggle_download_histories')) input = input.parents('.js_toggle_download_histories');
				var workSpace = input.parents('.js_iwork_space_page:first, .js_pwork_space_page:first');
				var target = workSpace.find('.js_instance_histories');
				if(isEmpty(target.children())){
					target.addClass('js_download');			
				}else{
					target.html('').hide();
					if(!target.hasClass('js_download')){
						target.addClass('js_download').removeClass('js_update').removeClass('js_forward').removeClass('js_related');
					}else{
						target.removeClass('js_download');
						return false;
					}
				}
				var instanceId = workSpace.attr('instId');
				var taskInstId = workSpace.attr('taskInstId');
				$.ajax({
					url : 'download_histories.sw',
					data : {
						instanceId : instanceId,
						taskInstanceId : taskInstId
					},
					success : function(data, status, jqXHR) {
						try{
							target.html(data).show();
							var target_point = $(target).find("div.up_point:first");
							target_point.css({"left": (input.position().left) + "px"});
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_toggle_download_histories download_histories]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, e) {
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_toggle_download_histories]', null, e);
					}
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_toggle_download_histories]', null, error);
			}
			return false;
		});
		
		$('.js_toggle_related_instances').live('click', function(e){
			try{
				var input = $(targetElement(e));
				if(!input.hasClass('js_toggle_related_instances')) input = input.parents('.js_toggle_related_instances');
				var workSpace = input.parents('.js_iwork_space_page:first, .js_pwork_space_page:first');
				var target = workSpace.find('.js_instance_histories');
				if(isEmpty(target.children())){
					target.addClass('js_related');			
				}else{
					target.html('').hide();
					if(!target.hasClass('js_related')){
						target.addClass('js_related').removeClass('js_download').removeClass('js_forward').removeClass('js_update');
					}else{
						target.removeClass('js_related');
						return false;
					}
				}
				var instanceId = workSpace.attr('instId');
				$.ajax({
					url : 'related_instances.sw',
					data : {
						instanceId : instanceId
					},
					success : function(data, status, jqXHR) {
						try{
							target.html(data).show();
							var target_point = $(target).find("div.up_point:first");
							target_point.css({"left": (input.position().left) + "px"});
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_toggle_related_instances related_instances]', null, error);
						}			
					},
					error : function(xhr, ajaxOptions, e) {
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_toggle_related_instances]', null, e);
					}
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_toggle_related_instances]', null, error);
			}
			return false;
		});
		
		$('.js_delete_comment_btn').live('click', function(e) {
			try{
				smartPop.confirm(smartMessage.get("removeCommentConfirmation"), function(){
					var input = $(targetElement(e));
					var spaceSubInstance = input.parents('.js_space_sub_instance');
					var subInstanceList = input.parents('.js_content_target:first');
					var instanceItem = input.parents('.js_more_instance_item:first');
					if(isEmpty(instanceItem)) instanceItem = input.parents('.js_space_sub_instance:first'); 
					var commentItem = input.parents('.js_sub_instance_list:first');
					var paramsJson = {};
					paramsJson['workType'] = parseInt(spaceSubInstance.attr('workType'));
					paramsJson['workInstanceId'] = spaceSubInstance.attr('instanceId');
					paramsJson['commentId'] = commentItem.attr('instanceId');
					url = "remove_comment_from_instance.sw";
					console.log(JSON.stringify(paramsJson));
					smartPop.progressCenter();				
					$.ajax({
						url : url,
						contentType : 'application/json',
						type : 'POST',
						data : JSON.stringify(paramsJson),
						success : function(data, status, jqXHR) {
							try{
								commentItem.remove();
								if(!isEmpty(subInstanceList)){
									var subCountStr = subInstanceList.parents('tr:first').prev().find('font.js_sub_count');
									if(!isEmpty(subCountStr.children())){
										var subCount = parseInt(subCountStr.find('b').html());
										if(subCount<=1){
											subCountStr.html('');
											subInstanceList.find('.js_comments_box').hide();
										}else{
											subCountStr.find('b').html(subCount-1);
										}
									}
								}else if(!isEmpty(instanceItem)){
									var comments = instanceItem.find('.js_comments_box ul.js_comment_list li:visible');
									if(isEmpty(comments))
										instanceItem.find('.js_comments_box').hide();
								}
								smartPop.closeProgress();
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_delete_comment_btn ' + url + ']', null, error);
							}			
						},
						error : function(xhr, ajaxOptions, e) {
							// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
							smartPop.closeProgress();
							smartPop.showInfo(smartPop.ERROR, smartMessage.get("removeCommentError"), function(){
							}, e);
						}
						
					});
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_select_comment_btn]', null, error);
			}
			return false;		
		});
		
		$('.instance_list .js_send_mail_to_user').live('click', function(e) {
			try{
				var input = $(targetElement(e));
				var receiverId = input.attr('userId');
				smartPop.progressCenter();
				$.get('new_mail.sw?receiverId=' + receiverId, function(data){
					try{
						$('#content').html(data);
						smartPop.closeProgress();
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_send_mail_to_user new_mail]', null, error);
					}			
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_send_mail_to_user]', null, error);
			}
			return false;
		});
		
		$('.form_value .js_send_mail_to_user').live('click', function(e) {
			try{
				var input = $(targetElement(e));
				var receiverId = input.attr('userId');
				smartPop.progressCenter();
				$.get('new_mail.sw?receiverId=' + receiverId, function(data){
					try{
						$('#content').html(data);
						smartPop.closeProgress();
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_send_mail_to_user new_mail]', null, error);
					}			
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_send_mail_to_user]', null, error);
			}
			return false;
		});
		
		$('.js_inline_content').live('click', function(e) {
			try{
				var input = $(targetElement(e));
				if(!input.hasClass('js_inline_content')) input = input.parents('.js_inline_content:first');
				
				$('a.js_search_filter_close').click();
				$('a.js_cancel_action').click();
				$('a.js_excel_import_close').click();
				var uploadButtons = $('.js_upload_buttons');
				if(!isEmpty(uploadButtons)){
					uploadButtons.prevAll('.js_click_start_form:first').find('form').click();
					setTimeout(function(){
						uploadButtons.find('a.js_cancel_action').click();						
					}, 1000);
				}
				
				var url = input.attr('href');
				var target = input.find('.js_content_target');
				if(isEmpty(target) && input.hasClass('js_work_instance_list')){
					target = input.next().find('.js_content_target');
				}else if(isEmpty(target)){
					target = input.parents('.js_sub_instance_list').find('.js_content_target');
				}
				var myList = input.parent().hasClass('js_sub_instance_list') ?input.parent() : input;
				var myUlList = input.parents('ul:first');
				var myGroupList = input.parents('.js_space_dayly_work_hour:first, .js_space_weekly_day:first, .js_space_monthly_week:first');
				var prevTargets = myList.prevAll('li, tr').find('.js_content_target').has('div');
				var prevUlTargets = myUlList.prevAll('ul').find('.js_content_target').has('div');
				var prevGroupTargets = myGroupList.prevAll('.js_space_dayly_work_hour, .js_space_weekly_day, .js_space_monthly_week').find('.js_content_target');
				if(prevTargets.html()){
					$('html body').scrollTop($('html body').scrollTop() - (prevTargets.height()+15-(prevTargets.is('td')?3:0)));
					prevTargets.html('').hide();
					if(prevTargets.is('td')){
						prevTargets.show().parent().hide();
						prevTargets.parent().prev().children('td').css('border-bottom', input.children('td').css('border-bottom'));						
					}
				}
				if(prevUlTargets.html()){
					$('html body').scrollTop($('html body').scrollTop() - (prevUlTargets.height()+15));
					prevUlTargets.html('').hide();
				}
				if(prevGroupTargets.html()){
					$('html body').scrollTop($('html body').scrollTop() - (prevGroupTargets.height()+15));
					prevGroupTargets.html('').hide();
				}
				var nextTargets = myList.nextAll('li, tr').find('.js_content_target').has('div');
				if(nextTargets.html()){
					nextTargets.html('').hide();
					if(nextTargets.is('td')){
						nextTargets.show().parent().hide();
						nextTargets.parent().prev().children('td').css('border-bottom', input.children('td').css('border-bottom'));	
					}
				}
				myUlList.nextAll('ul').find('.js_content_target').has('div').html('').hide();
				myGroupList.nextAll('.js_space_dayly_work_hour, .js_space_weekly_day, .js_space_monthly_week').find('.js_content_target').has('div').html('').hide();
				
				smartPop.progressCenter();
				target.load( url, function(){
					if(input.hasClass('js_work_instance_list')){
						input.children('td').css('border-bottom', 'none');
						target.parent().animate({ display:"table-row", height:"toggle" }, 'slow');
					}else{
						target.slideDown();
					}
					smartPop.closeProgress();
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space js_inline_content]', null, error);
			}
			return false;
		});
		
		$('.js_stop_propagation').live('click', function(e) {
			e.stopPropagation();
		});
	}catch(error){
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-space script]', null, error);
	}
});
