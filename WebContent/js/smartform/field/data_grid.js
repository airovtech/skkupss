try{
SmartWorks.FormRuntime = SmartWorks.FormRuntime || {};

SmartWorks.FormRuntime.DataGridBuilder = {};

SmartWorks.FormRuntime.DataGridBuilder.build = function(config) {
	var options = {
		mode : 'edit', // view or edit
		container : $('<div></div>'),
		entity : null,
		dataField : '',
		refreshData : false,
		layoutInstance : null
	};
	SmartWorks.extend(options, config);
	if(!options.refreshData)
		options.container.html('');

	var value = "";
	if(options.dataField && options.dataField.value){
		value = JSON.parse(options.dataField.value);
	}
	value = isEmpty(value) ? "" : value.gridDatas;
	var $entity = options.entity;
	var $graphic = $entity.children('graphic');
	var readOnly = $graphic.attr('readOnly') === 'true' || options.mode === 'view';
	if(readOnly) options.mode = 'view';
	var fitWidth = $graphic.attr('fitWidth') === 'true';
	var verticalScroll = $graphic.attr('verticalScroll') === 'true';
	var id = $entity.attr('id');
	var name = $entity.attr('name');
//	var contentHeightCss = (verticalScroll ? 'height:' : 'min-height:') + parseInt($graphic.attr('height')) + 'px';
	var contentHeightCss = 'height:100%';
	var $subEntities = $entity.find('formEntity');
	
	var $label = $('<div class="form_label ml10 tl" style="width:100%">' + name + '<span style="width:17px;height:17px"></span></div>');
	var required = $entity.attr('required');
	var tempRequired = $entity.attr('required');
	if(required === 'true' && !readOnly){
		$label.children('span:first').addClass('required_label');
		required = " class='fieldline required' ";
	}else{
		required = " class='fieldline' ";
	}
	if(!options.refreshData)
		$label.appendTo(options.container);

	var gridIsReadOnly =  (options.dataField && options.dataField.isReadOnly) || null;
	gridMode = isEmpty(gridIsReadOnly) ? options.mode : gridIsReadOnly=='true' ? 'view' : gridIsReadOnly=='false' ? 'edit' : options.mode; 
	
	var overflowPolicy = 'overflow-x:' + (fitWidth ? 'visible' : 'scroll') + ';overflow-y:' + (verticalScroll ? 'scroll' : 'visible') + ';';
	var $content = $('<div class="form_value list_contents ' + (tempRequired === 'true' ? 'sw_required' : '') +'" fieldId="' + id + '" style="width:100%;' + contentHeightCss + '"><table><thead><tr class="tit_bg no_line grid_label"><th class="r_line" style="width:30px;"><span>' + smartMessage.get('rowNoText') + '</span></th></tr></thead></table></div>');
	var $table = $content.find('table');
	if(!isEmpty($subEntities)){
		var totalWidth = 0;
		if(fitWidth){
			for(var i=0; i<$subEntities.length; i++){
				if($($subEntities[i]).children('graphic').attr('hidden') === 'true') continue;
				totalWidth = totalWidth + parseInt($($subEntities[i]).children('graphic').attr('contentWidth'));
			}
		}
		var length = isEmpty(value) ? ( readOnly ? 0 : 1) : value.length;
		$table.append('<tbody style="' + overflowPolicy + '"></tbody>');
		var $gridRowTemp = $('<tr class="vm list_action_item border_bottom js_grid_row"><td style="padding:0 5px;" class="tc js_grid_no"></td></tr>');
		var $gridRowHidden = $gridRowTemp.clone();
		for(var index=0; index<length; index++){
			$gridRow = $gridRowTemp.clone();
			$gridRow.find('.js_grid_no').text(index+1);
			var dataFields = value[index];
			for(var i=0; i<$subEntities.length; i++){
				var $subEntity = $($subEntities[i]);
				var $subGraphic = $subEntity.children('graphic');
				var isHidden = $subGraphic.attr('hidden') === 'true';
				if(index==0){
					var labelWidth = parseInt($subGraphic.attr('contentWidth'));
					var widthStr = (fitWidth && totalWidth>labelWidth) ? labelWidth/totalWidth*(100) + '%' : labelWidth + 'px';
					if(i == $subEntities.length-1) widthStr = "";
					var requiredStr = (!readOnly && $subEntity.attr('required') === 'true') ? '<span class="required_label" style="padding-top:5px;padding-left:2px;">&nbsp;&nbsp;</span>' : '';
					var displayStr = isHidden ? 'display:none' : '';
					$table.find('tr').append('<th class="r_line" style="width:' + widthStr + ';' + displayStr + '"><span>' + $subEntity.attr('name') + requiredStr + '</span></th>');
				}
				var fieldId = $subEntity.attr('id');
				var $cell = $('<td style="padding:0 5px;" fieldId="' + fieldId + '"></td>');
				var dataField = {};
				var tempDataField = !isEmpty(dataFields) ? dataFields[fieldId] : null;
				if(!isEmpty(dataFields) && !isEmpty(tempDataField)){
					var fieldType = $subEntity.children('format').attr('type');
					if(fieldType === 'userField'){
						var users = new Array();
						var tempUsers = tempDataField['users'];
						if(!isEmpty(tempUsers)){
							for(var k=0; k<tempUsers.length; k++){
								var user = {};
								user['userId'] = tempUsers[k].id;
								user['longName'] = tempUsers[k].name;
								users.push(user);
							}
						}
						dataField['users'] = users;
					}else if(fieldType === 'departmentField'){
						var departments = new Array();
						var tempDepartments = tempDataField['departments'];
						if(!isEmpty(tempDepartments)){
							for(var k=0; k<tempDepartments.length; k++){
								var department = {};
								department['comId'] = tempDepartments[k].id;
								department['name'] = tempDepartments[k].name;
								departments.push(department);
							}
						}
						dataField['departments'] = departments;
					}else if(fieldType === 'refFormField'){
						dataField['refRecordId'] = tempDataField['refRecordId'];
						dataField['value'] = tempDataField['value'];
					}else if(fieldType === 'fileField'){
						dataField['noRefreshData'] = tempDataField['noRefreshData'];
						dataField['value'] = tempDataField['groupId'];
					}else{
						dataField['value'] = tempDataField;
					}
				}
				
				if(index==0 && !readOnly){
					var $cellHidden = $cell.clone();
					SmartWorks.FormFieldBuilder.build(gridMode, $cellHidden, $subEntity, null, options.layoutInstance, false, true);
					$gridRowHidden.append($cellHidden);
				}
//				SmartWorks.FormFieldBuilder.build(options.mode, $cell, $subEntity, dataField, options.layoutInstance, isEmpty(value) ? false : options.refreshData, true);
				SmartWorks.FormFieldBuilder.build(gridMode, $cell, $subEntity, dataField, options.layoutInstance, false, true);
				$gridRow.append($cell);
			}
			if(!readOnly){
				$gridRow.append('<td><div class="list_action"><div title="' + smartMessage.get('rowDeleteText') + '" class="js_delete_grid_row">X</div></div></td>');
			}
			$table.append($gridRow);
		}
		if(!readOnly){
			$gridRowHidden.append('<td><div class="list_action"><div title="' + smartMessage.get('rowDeleteText') + '" class="js_delete_grid_row"> X </div></div></td>');
			$table.find('thead').append($gridRowHidden.hide().addClass('js_hidden_grid_row'));
			$table.find('tbody').append('<tr class="vm list_action_item"><td class="tc"><div class="list_action visible"><div title="' + smartMessage.get('rowAddText') + '" class="js_add_grid_row">+</div></div></td></tr>');
		}
	}
	if(!readOnly){
		$table.find('tr:first').append('<th style="width:15px;"><span></span></th>');
	}
	
	if ($graphic.attr('hidden') == 'true'){
		options.container.hide();
	}

	if(!options.refreshData){
		$content.appendTo(options.container);
	}else{
		var $oldGridRows = options.container.find('tbody tr.js_grid_row');
		if(isEmpty(value) || $oldGridRows.length != value.length || !isEmpty(gridIsReadOnly)){
			options.container.children('div.form_value').remove();
			$content.appendTo(options.container);			
		}else{
			for(var k=0; k<$oldGridRows.length; k++){
				$oldGridRow = $($oldGridRows[k]);
				var dataFields = value[k];
				for(var i=0; i<$subEntities.length; i++){
					var $subEntity = $($subEntities[i]);
					var fieldId = $subEntity.attr('id');
					var dataField = {};
					if(!isEmpty(dataFields)){
						var fieldType = $subEntity.children('format').attr('type');
						if(fieldType === 'userField'){
							var tempUsers = (dataFields[fieldId])['users'];
							var users = new Array();
							if(!isEmpty(tempUsers)){
								for(var l=0; l<tempUsers.length; l++){
									var user = {};
									user['userId'] = tempUsers[l].id;
									user['longName'] = tempUsers[l].name;
									users.push(user);
								}
							}
							dataField['users'] = users;
						}else if(fieldType === 'departmentField'){
							var tempDepartments = (dataFields[fieldId])['departments'];
							var departments = new Array();
							if(!isEmpty(tempDepartments)){
								for(var l=0; l<tempDepartments.length; l++){
									var department = {};
									department['comId'] = tempDepartments[l].id;
									department['name'] = tempDepartments[l].name;
									departments.push(department);
								}
							}
							dataField['departments'] = departments;
						}else if(fieldType === 'refFormField'){
							dataField['refRecordId'] = (dataFields[fieldId])['refRecordId'];
							dataField['value'] = (dataFields[fieldId])['value'];
						}else if(fieldType === 'fileField'){
							dataField['noRefreshData'] = (dataFields[fieldId])['noRefreshData'];
							dataField['value'] = (dataFields[fieldId])['groupId'];
						}else{
							dataField['value'] = dataFields[fieldId];
						}
					}
					var $oldCell = $oldGridRow.find('td[fieldId="' + fieldId + '"]');
					SmartWorks.FormFieldBuilder.build(gridMode, $oldCell, $subEntity, dataField, options.layoutInstance, options.refreshData, true);
				}
			}
			
		}
	}
	if(!readOnly){
		smartCommon.liveTimePicker();
		smartCommon.liveTodayPicker();
		smartCommon.liveTodayTimePicker();
	}
	
	var isHidden =  (options.dataField && options.dataField.isHidden) || null;
	var isReadOnly =  (options.dataField && options.dataField.isReadOnly) || null;
	var isRequired =  (options.dataField && options.dataField.isRequired) || null;
	if(options.refreshData && (isHidden || isRequired || isReadOnly)){
		var formLabel = options.container.find('.form_label:first');
		var formValue = options.container.find('.form_value:first');
		if(isHidden == 'true'){
			options.container.hide();
		}else if(isHidden == 'false'){
			options.container.show().parent().show();
		}
		
		if(options.mode == 'edit'){
			if(isReadOnly == 'true'){
				if(!isEmpty($subEntities)){
					var $gridRows = formValue.find('.js_grid_row:visible');
					if(!isEmpty($gridRows)){
						$gridRows.find('td .list_action').remove();
					}
					if(!isEmpty(formValue.find('tbody tr.list_action_item:last .js_add_grid_row'))){
						formValue.find('tbody tr.list_action_item:last').remove();
					}
				}
				formLabel.removeClass('required_label');
			}else if(isReadOnly == 'false'){			
				if(!isEmpty($subEntities)){
					var $gridRows = options.container.find('.js_grid_row:visible');
					if(!isEmpty($gridRows)){
						for(var index=0; index<$gridRows.length; index++){
							var $gridRow = $($gridRows[index]);
							if(isEmpty($gridRow.find('td .list_action')))
								$gridRow.append('<td><div class="list_action"><div title="' + smartMessage.get('rowDeleteText') + '" class="js_delete_grid_row">X</div></div></td>');				
						}
					}
					if(isEmpty(formValue.find('tbody tr.list_action_item .js_add_grid_row'))){
						formValue.find('tbody').append('<tr class="vm list_action_item"><td class="tc"><div class="list_action visible"><div title="' + smartMessage.get('rowAddText') + '" class="js_add_grid_row">+</div></div></td></tr>');
					}
				}
				if($entity.attr('required') === 'true')
					formLabel.addClass('required_label');
				smartCommon.liveTimePicker();
				smartCommon.liveTodayPicker();
				smartCommon.liveTodayTimePicker();
			}
				
			if(isRequired == 'true'){
				formLabel.addClass('required_label');
				formValue.addClass('sw_required');
			}else if(isRequired == 'false'){
				formLabel.removeClass('required_label');
				formValue.removeClass('sw_required');			
			}
		}
	}else if(isHidden){
		if(isHidden == 'true'){
			options.container.hide();
		}else if(isHidden == 'false'){
			options.container.show().parent().show();
		}		
	}
	
	return options.container;
};

SmartWorks.FormRuntime.DataGridBuilder.buildEx = function(config){
	var options = {
			container : $('<tr></tr>'),
			fieldId: '',
			fieldName: '',
			value: '',
			columns: 1,
			colSpan: 1, 
			multiLines: 1,
			required: false,
			readOnly: false		
	};
	SmartWorks.extend(options, config);
	
};

SmartWorks.FormRuntime.DataGridBuilder.serializeObject = function(dataGrids){
	var gridsJson = {};
	for(var i=0; i<dataGrids.length; i++){
		var dataGrid = $(dataGrids[i]);
		var fieldId = dataGrid.attr('fieldId');
		var gridRows = dataGrid.find('.form_value tbody .js_grid_row');
		var gridDatas = new Array();
		for(var j=0; j<gridRows.length; j++){
			var gridRow = $('<form></form>').append($(gridRows[j]).clone());
			var rowSelects = $(gridRows[j]).find('select');
			var clonedSelects = gridRow.find('select');
			if(!isEmpty(rowSelects) && !isEmpty(clonedSelects) && rowSelects.length == clonedSelects.length ){
				for(var index=0; index<rowSelects.length; index++){
					$(clonedSelects[index]).attr('value', $(rowSelects[index]).attr('value'));
				}
			}
			var rowTextAreas = $(gridRows[j]).find('textarea');
			var clonedTextAreas = gridRow.find('textarea');
			if(!isEmpty(rowTextAreas) && !isEmpty(clonedTextAreas) && rowTextAreas.length == clonedTextAreas.length ){
				for(var index=0; index<rowTextAreas.length; index++){
					$(clonedTextAreas[index]).attr('value', $(rowTextAreas[index]).attr('value'));
				}
			}
			gridDatas.push(mergeObjects(gridRow.serializeObject(), SmartWorks.GridLayout.serializeObject(gridRow)));
		}
		gridsJson[fieldId] =  {gridDatas: gridDatas};
	}
	return gridsJson;
};

SmartWorks.FormRuntime.DataGridBuilder.validate = function(dataGrids){
	var gridsValid = true;
	for(var i=0; i<dataGrids.length; i++){
		var dataGrid = $(dataGrids[i]);
		var gridRows = dataGrid.find('.form_value:first tbody .js_grid_row:visible');
		var required = dataGrid.find('.form_value:first').hasClass('sw_required');
		if(required && isEmpty(gridRows)){
			dataGrid.find('.form_value:first').addClass("sw_error");
			gridsValid = false;
		}else{
			dataGrid.find('.form_value:first').removeClass("sw_error");
		}
	}
	return gridsValid;
};

SmartWorks.FormRuntime.DataGridBuilder.dataField = function(config){
	var options = {
			fieldName: '',
			formXml: '',
			fieldId: '',
			value: ''
	};

//	SmartWorks.extend(options, config);
//	$formXml = isEmpty(options.formXml) ? [] : $($.parseXML(options.formXml)).find('form');
//	var dataField = {};
//	var fieldId = (isEmpty(options.fieldId)) ? $formXml.find('formEntity[name="'+options.fieldName+'"]').attr('id') : options.fieldId;
//	if(isEmpty(fieldId)) fieldId = ($formXml.attr("name") === options.fieldName) ? $formXml.attr('id') : "";
//	if(isEmpty(fieldId)) return dataField;
//	
//	dataField = {
//			id: fieldId,
//			value: options.value
//	};
//	return dataField;
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[data_grid script]', null, error);
}