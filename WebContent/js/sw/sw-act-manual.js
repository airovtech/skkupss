try{
$(function() {

	$('ul.js_menu_list li a').hover(function(e){
		var input = $(targetElement(e));
		input.parent().addClass('sw_hover');
		return false;
	}, function(e){
		$('ul.m_list_item li').removeClass('sw_hover');
		return false;
	});
	
	$('ul.js_menu_list li a').live('click', function(e){
		var input = $(targetElement(e));
		if(input.hasClass('js_select_menu_item')) return true;
		if(input.hasClass('down')){
			input.removeClass('down').parent().find('ul').hide();
		}else{
			input.addClass('down').parent().find('ul:first').show();
		}
		return false;
	});
	
	$('.js_select_menu_item').live('click', function(e){
		var input = $(targetElement(e));
		input.parents('.js_menu_list').find('a').removeClass('current');
		input.addClass('current');
		var href = input.attr('href');
		$.ajax({
			url : href,
			success : function(data, status, jqXHR) {
				$('#content').html(data);
			},
			error : function(xhr, ajaxOptions, thrownError){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-nav js_notice_count mail_list]', null, thrownError);
			}
		});

		return false;
	});
	$('.js_m_content').swnavi({
		history : true,
		before : function(event){
			try{
				smartPop.progressCenter();				
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-manual js_m_content before]', null, error);
			}			
		},
		target : 'content',
		after : function(event){
			try{
				smartPop.closeProgress();
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-manual js_m_content after]', null, error);
			}			
		}
	});

	
});

}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-manual script]', null, error);
}