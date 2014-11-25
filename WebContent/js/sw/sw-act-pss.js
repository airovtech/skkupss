
$(function() {
	
	$('.js_select_space_type a').live('click',function(e) {
		try{
			var input = $(targetElement(e));
			
			var newProductService = input.parents('.js_new_product_service_page');
			var psId = newProductService.attr('psId');
			var isEditMode = newProductService.attr('isEditMode');
			var href = input.attr('href');
			var spaceType = input.attr('spaceType');
			input.parent().addClass('current').siblings().removeClass('current');

			var newSpaceTab = newProductService.find('.js_space_tab:visible').clone();
			var newSpaceType = newSpaceTab.attr();
			var oldSameSpaceTab = newProductService.find('form[name="frmNewProductService"]').find('.js_space_tab[spaceType="' + newSpaceTab.attr('spaceType') + '"]:hidden');
			if(!isEmpty(oldSameSpaceTab)) oldSameSpaceTab.parent().remove();
			newProductService.find('form[name="frmNewProductService"]').append($('<form name="frmSpaceTab"></form>').html(newSpaceTab).hide());
			
			var savedSpaceTab = newProductService.find('form[name="frmNewProductService"]').find('.js_space_tab[spaceType="' + spaceType + '"]:hidden');
			if(isEmpty(savedSpaceTab)){
				$.ajax({
					url : href + "?psId=" + psId + "&spaceType=" + spaceType + "&isEditMode=" + isEditMode,
					success : function(data, status, jqXHR) {
						newProductService.find('.js_space_view_target').html(data);
					}
				});
			}else{
				newProductService.find('.js_space_view_target').html(savedSpaceTab.clone());
				savedSpaceTab.parent().remove();
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-pss js_select_space_type]', null, error);
		}			
		return false;
	});

	$('.js_remove_element_item').live('click',function(e) {
		try{
			var input = $(targetElement(e));
			var elementSiblings = input.parents('.js_element_item:first').siblings();
			if(isEmpty(elementSiblings)){
				input.parents('.js_element_item:first').find('.js_action_element_item').text('');
				input.parents('.js_view_element_item:first').hide().next().attr('value', '').show();
			}else{
				input.parents('.js_element_item:first').remove();
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-pss js_select_space_type]', null, error);
		}			
		return false;
	});
	
	$('.js_add_element_item').live('click',function(e) {
		try{
			var input = $(targetElement(e));
			input.parents('.js_element_item:first').after(input.parents('.js_space_tab:first').find('.js_dummy_element_item:first').html());
			var itemName = input.parents('.js_element_item:first').attr('itemName');
			if(!isEmpty(input.parents('.js_value_space, .js_service_space'))){
				input.parents('.js_element_item:first').next().attr('itemName', itemName).find('input:first:visible').attr('name', 'txt' + itemName + 'Item');
			}else if(!isEmpty(input.parents('.js_biz_model_space'))){
				input.parents('.js_element_item:first').next().attr('itemName', itemName).find('input:first:visible');
				input.parents('.js_element_item:first').next().append(input.parents('.js_biz_model_space:first').find('.js_dummy_select_item:first .js_select_element_item[itemName="' + itemName + '"]').clone());				
			}
			input.parents('.js_element_item:first').next().find('input:first:visible').focus();
			
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-pss js_add_element_item]', null, error);
		}			
		return false;
	});
	
	$('.js_action_element_item').live('dblclick', function(e) {
		try{
			var input = $(targetElement(e));
			input.parent('.js_view_element_item:first').hide().next().show().focus();;
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-pss js_action_element_item]', null, error);
		}			
	});

	$('input.js_edit_element_item').live('focusout',function(e) {
		try{
			var input = $(targetElement(e));
			if(input.attr('value') === ''){
				if(isEmpty(input.nextAll('.js_select_element_item'))){
					input.prev().find('.js_remove_element_item').click();
				}
			}else{
				input.css({"width": "auto"}).nextAll('.js_select_element_item').remove();
				input.hide().prevAll('.js_view_element_item').show().find('.js_action_element_item').attr('title', input.attr('value')).text(input.attr('value'));
				if(!isEmpty(input.parents('.js_biz_model_space'))){
					input.parents('.js_element_item:first').css({"color": "blue"});
					input.attr('name', "txt" + input.parents('.js_element_item:first').attr('itemName') + "UserItem");
				}
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-pss js_edit_element_item]', null, error);
		}			
	});

	$('input.js_edit_element_item').live('keydown', function(e) {
		var e = window.event || e;
		var keyCode = e.which || e.keyCode;
		if(keyCode == $.ui.keyCode.ENTER){
			var input = $(targetElement(e));
			if(input.attr('value') === ''){
				input.prev().find('.js_remove_element_item').click();
			}else{
				input.css({"width": "auto"}).nextAll('.js_select_element_item').remove();
				input.hide().prevAll('.js_view_element_item').show().find('.js_action_element_item').attr('title', input.attr('value')).text(input.attr('value'));
				if(!isEmpty(input.parents('.js_biz_model_space'))){
					input.parents('.js_element_item:first').css({"color": "blue"});
					input.attr('name', "txt" + input.parents('.js_element_item:first').attr('itemName') + "UserItem");
				}
			}
		}
	});
	
	$('select.js_select_element_item').live('change', function(e) {
			var input = $(targetElement(e));
			var selectValue = input.find('option:selected').text();
			input.css({"width": "110px"}).prevAll('.js_edit_element_item').remove();
			input.hide().prevAll('.js_view_element_item').show().find('.js_action_element_item').attr('title', selectValue).text(selectValue);
			input.parents('.js_element_item:first').css({"color": "red"});
			input.attr('name', "txt" + input.parents('.js_element_item:first').attr('itemName') + "Item");
	});
	

	$('select.js_select_space_name').live('change', function(e){
		var input = $(targetElement(e));
		var progressSpan = input.siblings('.js_progress_span:first');
		selectListParam(progressSpan, false);
		return false;
	});

});
