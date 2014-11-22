try{
smartCommon= {
	
	liveTodayTimePicker : function(){
		try{
			$.datepicker.setDefaults($.datepicker.regional[currentUser.locale]);
			$.timepicker.setDefaults($.timepicker.regional[currentUser.locale]);
			$('input.js_todaytimepicker').datetimepicker({
				defaultDate : new Date(),
				dateFormat : 'yy.mm.dd',
				timeFormat : 'hh:mm',
				hourGrid: 4,
				minuteGrid: 10,
				onSelect: function(date) {
					try{
						$(this).change();
						if(!isEmpty($(this).parents('form.js_validation_required:first').find('.error'))){
							$(this).parents('form.js_validation_required:first').validate({ showErrors: showErrors}).form();
						}
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-common liveTodayTimePicker onSelect]', null, error);
					}			
			    }
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-common liveTodayTimePicker]', null, error);
		}			
	},
	
	liveTodayPicker : function(){
		try{
			$.datepicker.setDefaults($.datepicker.regional[currentUser.locale]);
			$('input.js_todaypicker').datepicker({
				defaultDate : new Date(),
				dateFormat : 'yy.mm.dd',
				changeYear : true,
				onSelect: function(date) {
					try{
						$(this).change();
						if(!isEmpty($(this).parents('form.js_validation_required').find('.error'))){
							$('form.js_validation_required').validate({ showErrors: showErrors}).form();
						}
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-common liveTodayPicker onSelect]', null, error);
					}			
			    }
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-common liveTodayPicker]', null, error);
		}			
	},
	
	liveTimePicker : function(){
		try{
			$.timepicker.setDefaults($.timepicker.regional[currentUser.locale]);
			$('input.js_timepicker').timepicker({
				timeFormat: 'hh:mm',
				hourGrid: 4,
				minuteGrid: 10,
				onSelect: function(date) {
					try{
						$(this).change();
						if(!isEmpty($(this).parents('form.js_validation_required:first').find('.error'))){
							$(this).parents('form.js_validation_required:first').validate({ showErrors: showErrors}).form();
						}
					}catch(error){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-common liveTimePicker onSelect]', null, error);
					}			
			    }
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-common liveTimePicker]', null, error);
		}			
	},

	autoCheckMail : function(){
		setInterval(function(){
			try{
				$.ajax({
					url : "check_mail.sw"
				});			
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-common autoCheckMail]', null, error);
			}			
		}, 5*60*1000);
	},
	
	enableCopyUrl : function(){
		$('a#js_copy_address').zclip({
	        path: 'resources/flash/ZeroClipboard.swf',
	        copy: function(){
//	        	return $('.js_work_space_home').parent().html();
	        	return document.location.href;
	        }
	    });
	}
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-common script]', null, error);
}