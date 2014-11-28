
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
			cloneSelectedValues(newProductService.find('.js_space_tab:visible'), newSpaceTab);

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
				var newSavedSpaceTab = savedSpaceTab.clone();
				cloneSelectedValues(savedSpaceTab, newSavedSpaceTab);
				newProductService.find('.js_space_view_target').html(newSavedSpaceTab);
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
//		try{
//			var input = $(targetElement(e));
//			if(input.attr('value') === ''){
//				if(isEmpty(input.nextAll('.js_select_element_item'))){
//					input.prev().find('.js_remove_element_item').click();
//				}
//			}else{
//				input.css({"width": "auto"}).nextAll('.js_select_element_item').remove();
//				input.hide().prevAll('.js_view_element_item').show().find('.js_action_element_item').attr('title', input.attr('value')).text(input.attr('value'));
//				if(!isEmpty(input.parents('.js_biz_model_space'))){
//					input.parents('.js_element_item:first').css({"color": "blue"});
//					input.attr('name', "txt" + input.parents('.js_element_item:first').attr('itemName') + "UserItem");
//				}
//			}
//		}catch(error){
//			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-pss js_edit_element_item]', null, error);
//		}			
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
		if(selectValue === ''){
			input.parents('.js_element_item:first').find('.js_remove_element_item').click();
		}else{
			input.css({"width": "110px"}).prevAll('.js_edit_element_item').remove();
			input.hide().prevAll('.js_view_element_item').show().find('.js_action_element_item').attr('title', selectValue).text(selectValue);
			input.parents('.js_element_item:first').css({"color": "red"});
			input.attr('name', "txt" + input.parents('.js_element_item:first').attr('itemName') + "Item");
		}
	});
	
	$('select.js_select_space_name').live('change', function(e){
		var input = $(targetElement(e));
		var progressSpan = input.siblings('.js_progress_span:first');
		if(isEmpty(input.parents('.js_similarity_matrix_page'))){
			selectListParam(progressSpan, false);
		}else{
			var spaceType = input.find('option:selected').attr('value');
			smartPop.progressCenter();
			$.ajax({
				url : "psSimilarityMatrix.jsp?spaceType=" + spaceType,
				success : function(data, status, jqXHR) {
					$('#content').html(data);
					smartPop.closeProgress();
				}
			});
		}
		return false;
	});
	
	$('a.js_similarity_calculation').live('click',function(e) {
		var input = $(targetElement(e));
		
		var checkInstances  = $("#iwork_instance_list_page tr .js_check_instance:checked");
		
		var psIds = new Array();
		var psNames = new Array();
		for(var i=0; i<checkInstances.length; i++){
			psIds[i] = $(checkInstances[i]).parents('.js_work_instance_list:first').attr('psId');
			psNames[i] = $(checkInstances[i]).parents('.js_work_instance_list:first').attr('psName');
		}
			
		if(isEmpty(psIds) || psIds.length<=1){
			smartPop.showInfo(smartPop.WARN, "유사도 비교는 2개이상의 항목을 선택하여야 합니다. 다시 선택하고 실행하여 주시기 바랍니다!", null);
			return false;
		}
		var spaceType = $('select.js_select_space_name option:selected').attr('value');

		var paramsJson = {};
		paramsJson["spaceType"] = spaceType;
		paramsJson["psIds"] = psIds;
		paramsJson["psNames"] = psNames;
		paramsJson["href"] = "psSimilarityMatrix.jsp";
		console.log(JSON.stringify(paramsJson));
		smartPop.progressCenter();
		$.ajax({
			url : "calculate_ps_similarities.sw",
			contentType : 'application/json',
			type : 'POST',
			data : JSON.stringify(paramsJson),
			success : function(data, status, jqXHR) {
				$('#content').html(data);
				smartPop.closeProgress();
			}
		});
		
		return false;
	});
	
	$('a.js_eyeball_comparison').live('click',function(e) {
		var input = $(targetElement(e));
		
		var checkInstances  = $("#iwork_instance_list_page tr .js_check_instance:checked");
		var psIds = new Array();
		for(var i=0; i<checkInstances.length; i++){
			psIds[i] = $(checkInstances[i]).parents('.js_work_instance_list:first').attr('psId');
		}
			
		if(isEmpty(psIds) || psIds.length!=2){
			smartPop.showInfo(smartPop.WARN, "육안비교는 2개의 항목을 선택하여야 합니다. 다시 선택하고 실행하여 주시기 바랍니다!", null);
			return false;
		}
		
		var spaceType = $('select.js_select_space_name option:selected').attr('value');
		smartPop.progressCenter();
		$.ajax({
			url : "doubleProductServices.jsp?sourcePsId=" + psIds[0] + "&targetPsId=" + psIds[1] + "&spaceType=" + spaceType,
			success : function(data, status, jqXHR) {
				$('#content').html(data);
				smartPop.closeProgress();
			}
		});
		
		return false;
	});

	$('.js_instance_detail').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			if(!input.hasClass('js_instance_detail')) input = input.parents('.js_instance_detail:first');
			var url = input.attr('href');
			var target = $('#content');
			$.ajax({
				url : url,
				success : function(data, status, jqXHR) {
					target.html(data);
				}				
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_create_new_work]', null, error);
		}			
		return false;
	});	
	
	$('a.js_remove_product_service').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			input = input.parents('.js_remove_product_service:first');
			var psId = input.attr('psId');
			smartPop.confirm( "현재의 제품-서비스 내용을 완전히 삭제하려고 합니다. 정말로 삭제하시겠습니까?", function(){			
				var paramsJson = {};
				paramsJson["psId"] = psId;
				console.log(JSON.stringify(paramsJson));
				smartPop.progressCenter();
				$.ajax({
					url : "remove_product_service.sw",
					contentType : 'application/json',
					type : 'POST',
					data : JSON.stringify(paramsJson),
					success : function(data, status, jqXHR) {
						smartPop.closeProgress();
						location.href = "home.sw";
					}
				});
			});			
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_create_new_work]', null, error);
		}			
		return false;
	});	
	
	$('.js_modify_product_service').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			input = input.parents('.js_modify_product_service');
			var psId = input.attr('psId');
			var url = 'newProductService.jsp?psId=' + psId + '&isEditMode=true';
			var target = $('#content');
			$.ajax({
				url : url,
				success : function(data, status, jqXHR) {
					target.html(data);
				}				
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_create_new_work]', null, error);
		}			
		return false;
	});	
	
	$('.js_cancel_modify_ps').live('click', function(e) {
		try{
			var input = $(targetElement(e));
			input = input.parents('.js_cancel_modify_ps');
			var psId = input.attr('psId');
			var url = 'newProductService.jsp?psId=' + psId + '&isEditMode=false';
			var target = $('#content');
			$.ajax({
				url : url,
				success : function(data, status, jqXHR) {
					target.html(data);
				}				
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-act-work js_create_new_work]', null, error);
		}			
		return false;
	});	

	$('input.js_toggle_use_sim_color').live('click', function(e) {
		var input = $(targetElement(e));
		if(input.is(":checked")){
			useColorValues();
		}else{
			clearColorValues();
		}
	});			

	$('select.js_select_double_space_name').live('change', function(e){
		var input = $(targetElement(e));
		var progressSpan = input.siblings('.js_progress_span:first');
		var spaceType = input.find('option:selected').attr('spaceType');
		var url = input.find('option:selected').attr('href');
		var sourcePsId = input.attr('sourcePsId');
		var targetPsId = input.attr('targetPsId');
		smartPop.progressCenter();
		$.ajax({
			url : url + "?psId=" + sourcePsId + "&spaceType=" + spaceType,
			success : function(data, status, jqXHR) {
				$('#source_view_target').html(data);
				smartPop.closeProgress();
			}
		});
		$.ajax({
			url : url + "?psId=" + targetPsId + "&spaceType=" + spaceType,
			success : function(data, status, jqXHR) {
				$('#target_view_target').html(data);
				smartPop.closeProgress();
			}
		});
	});
	
	
});
