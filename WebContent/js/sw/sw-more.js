try{
	$('.js_more_list').live('click', function(e) {
		try{
			var anchor = $(targetElement(e));
			if(!isEmpty(anchor.siblings('.js_progress_span').find('.js_progress_icon'))) 
				return false;
			smartPop.progressCont(anchor.siblings('.js_progress_span'));
			var runningPage = anchor.parents('.js_my_running_instance_list_page');
			var lastDate = runningPage.find('.js_more_instance_item:last').attr('dateValue');
			var viewType = runningPage.find('.js_view_my_instances.current > a').attr('viewType');
			var assignedOnly = (viewType == 'assigned_instances');
			var runningOnly = (viewType == 'running_instances');
			$.ajax({
				url : anchor.attr('href'),
				data : {
					lastDate : lastDate,
					assignedOnly : assignedOnly,
					runningOnly : runningOnly
				},
				success : function(data, status, jqXHR) {
					anchor.parent().remove();
					$(data).find('ul:first').children().appendTo(runningPage.find('.js_instance_list_table ul:first'));
					smartPop.closeProgress();
				},
				error : function(xhr, ajaxOptions, thrownError){
					smartPop.closeProgress();				
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-more js_more_list]', null, error);
		}				
		return false;
	});

	$(window).scroll( function() {
		try{
			$('.btn_collapse_nav').css('top', 75 + $(window).scrollTop() + 'px');
			
			var more_anchor = $('#work_ing .js_more_list a');
			var more_smartcaster = $('.js_smartcaster_page a.js_space_more_history');
			var more_smartcaster_home = $('.js_my_running_instance_list_page a.js_space_more_history');
			var more_group_members = $('.js_space_tab_group_members_page a.js_group_more_members');
			var more_image_instances = $('.js_image_instance_list_page a.js_more_image_instance_list');
			var more_space_timeline = $('.js_space_timeline_page a.js_space_more_history');
			var more_space_instance = $('.js_space_instance_list_page a.js_space_more_instance');
			if ($(window).scrollTop() == $(document).height() - $(window).height()){
				
				if(!isEmpty(more_anchor) && !more_anchor.isWaiting){
					more_anchor.isWaiting = true;
					setTimeout(function() {
						try{
							if ($(window).scrollTop() == $(document).height() - $(window).height())
								more_anchor.trigger('click');
							more_anchor.isWaiting = false;
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-more window scroll more_anchore]', null, error);
						}				
					}, 2000);
				}else if(!isEmpty(more_smartcaster) && !more_smartcaster.isWaiting){
					more_smartcaster.isWaiting = true;
					setTimeout(function() {
						try{
							if ($(window).scrollTop() == $(document).height() - $(window).height())
								more_smartcaster.trigger('click');
							more_smartcaster.isWaiting = false;
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-more more_smartcaster]', null, error);
						}				
					}, 2000);
				}else if(!isEmpty(more_smartcaster_home) && !more_smartcaster_home.isWaiting){
					if(!isEmpty(more_smartcaster_home.parents('.js_space_monthly_page')) || !isEmpty(more_smartcaster_home.parents('.js_space_weekly_page')) || !isEmpty(more_smartcaster_home.parents('.js_space_dayly_page'))){
						return;
					}
					more_smartcaster_home.isWaiting = true;
					setTimeout(function() {
						try{
							if ($(window).scrollTop() == $(document).height() - $(window).height())
								more_smartcaster_home.trigger('click');
							more_smartcaster_home.isWaiting = false;
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-more more_smartcaster_home]', null, error);
						}				
					}, 2000);
				}else if(!isEmpty(more_group_members) && !more_group_members.isWaiting){
					more_group_members.isWaiting = true;
					setTimeout(function() {
						try{
							if ($(window).scrollTop() == $(document).height() - $(window).height())
								more_group_members.trigger('click');
							more_group_members.isWaiting = false;
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-more more_group_members]', null, error);
						}				
					}, 2000);
				}else if(!isEmpty(more_image_instances) && !more_image_instances.isWaiting){
					more_image_instances.isWaiting = true;
					setTimeout(function() {
						try{
							if ($(window).scrollTop() == $(document).height() - $(window).height())
								more_image_instances.trigger('click');
							more_image_instances.isWaiting = false;
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-more more_image_instances]', null, error);
						}				
					}, 2000);
				}else if(!isEmpty(more_space_timeline) && !more_space_timeline.isWaiting){
					more_space_timeline.isWaiting = true;
					setTimeout(function() {
						try{
							if ($(window).scrollTop() == $(document).height() - $(window).height())
								more_space_timeline.trigger('click');
							more_space_timeline.isWaiting = false;
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-more js_space_timeline]', null, error);
						}				
					}, 2000);
				}else if(!isEmpty(more_space_instance) && !more_space_instance.isWaiting){
					more_space_instance.isWaiting = true;
					setTimeout(function() {
						try{
							if ($(window).scrollTop() == $(document).height() - $(window).height())
								more_space_instance.trigger('click');
							more_space_instance.isWaiting = false;
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-more more_space_instance]', null, error);
						}				
					}, 2000);
				}
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-more window scroll]', null, error);
		}				
	});
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-more script]', null, error);
}
