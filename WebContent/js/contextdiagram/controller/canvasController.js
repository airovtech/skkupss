//
// Source Name : canvasController.js
// Description : Context Diagram�� Canvas�� Model�� View�� �����ϴ� ���.
//
try{
ContextDiagram.Controller = ContextDiagram.Controller || {};
ContextDiagram.Controller.Canvas = function(mode, target, data){
	this.id = null;
	this.mode = mode || CD$MODE_VIEW;
	this.target = target;
	this.context = null;
	this.model = null;	
	this.selectedTool = CD$TOOL_NONE;
	this.selectedObjects = new Array();
	this.nowDragging = false;
	this.draggingPosition = null;
	this.nowLining = false;
	this.liningController = null;
	this.lineSaved = null;
	this.verticalResizing = false;
	this.minHeight = CD$DEFAULT_CANVAS_HEIGHT;
	this.draw = function(){
		this.context = ContextDiagram.View.Canvas.draw({
			mode : this.mode,
			target : this.target,
			model : this.model
		});	
	};
	
	this.redraw = function(){
		ContextDiagram.View.Canvas.redraw({
			mode : this.mode,
			context : this.context,
			model : this.model
		});	
		
		if(!isEmpty(CD$CONTROLLERS)){
			for(var i=1; i<CD$CONTROLLERS.length; i++){
				CD$CONTROLLERS[i].draw();
				var model = CD$CONTROLLERS[i].model;
				if(ContextDiagram.getModelType(model) == CD$TYPE_NODE){
					if(this.minHeight < model.position.top+CD$NODE_SIZE_NORMAL*3){
						this.minHeight = model.position.top+CD$NODE_SIZE_NORMAL*3;
					}
				}
			}
		}
	};
	
	this.resize = function(){
		var canvas = this.target.find('canvas[canvasId="' + this.model.id + '"]');
		canvas.attr('width', this.model.width).attr('height', this.model.height).attr('style', 'width:' + this.model.width + 'px;height:' + this.model.height + 'px;background-color:' + this.model.backgroundColor);
		canvas.parent().attr('width', this.model.width);
		this.redraw();
	};
	
	this.change = function(model){
		this.model = model;
		CD$CONTROLLERS.updateModel(this.canvasId, this.model);
		this.redraw();
	};
	
	this.verticalResize = function(offsetY){
		if((this.model.height + offsetY)<this.minHeight) return;
		
		this.model.height = this.model.height + offsetY;
		CD$CONTROLLERS.updateModel(this.canvasId, this.model);
		this.resize();
	};
	
	this.newSelections = function(selections){
		this.clearSelections();
		if(!isEmpty(selections)){
			this.selectedObjects = selections;
			for(var i=0; i<selections.length; i++)
				selections[i].select(true);
		}
		this.target.parents('.js_context_space').find('.js_object_properties tr.js_node_property, tr.js_line_property').hide();
		if(this.selectedObjects.length==1){
			var model = this.selectedObjects[0].model;
			var objectProperties = this.target.parents('.js_context_space:first').find('.js_object_properties').attr('canvasId', this.id).attr('objectId', model.id);
			switch(ContextDiagram.getModelType(model)){
			case CD$TYPE_NODE:
				objectProperties.find('tr.js_node_property').show();
				objectProperties.find('input.js_input_node_name').attr('value', model.name);
				objectProperties.find('select.js_select_node_type option[value="' + model.type + '"]').attr('selected', 'selected');
				break;
			case CD$TYPE_EDGELINE:
				var self = model.fromNodeId == model.toNodeId;
				objectProperties.find('tr.js_line_property').show();
				var lineBreak = model.lineBreak;
				if(!lineBreak) lineBreak = {align:CD$ARROW_ALIGN_CENTER, breaks:0};
				if(self){
					objectProperties.find('input.js_input_line_label').parents('tr:first').hide();
					objectProperties.find('select.js_select_line_arrow').attr('disabled', 'disabled').find('option[value="' + CD$ARROW_DIR_SINGLE + '"]').attr('selected', 'selected');
					objectProperties.find('select.js_select_line_type').parents('tr:first').hide();
				}else{
					objectProperties.find('input.js_input_line_label').attr('value', model.label);
					objectProperties.find('select.js_select_line_arrow').removeAttr('disabled').find('option[value="' + model.direction + '"]').attr('selected', 'selected');
					objectProperties.find('select.js_select_line_type option[value="' + lineBreak + (lineBreak.align==CD$ARROW_ALIGN_CENTER?'':lineBreak.breaks) + '"]').attr('selected', 'selected');
				}
				break;
			}
		}
	};
	
	this.addSelection = function(selection){
		if(!isEmpty(selection)){
			this.selectedObjects.push(selection);
			selection.select(true);
		}
	};
	
	this.clearSelections = function(){
		if(!isEmpty(this.selectedObjects)){
			for(var i=0; i<this.selectedObjects.length; i++)
				this.selectedObjects[i].select(false);
			this.selectedObjects = new Array();
		}
		this.lineSaved = null;
		this.target.parents('.js_context_space').find('.js_object_properties tr.js_node_property, tr.js_line_property').hide();		
	};
	
	this.moveSelections = function(offset){
		if(!isEmpty(this.selectedObjects)){
			for(var i=0; i<this.selectedObjects.length; i++)
				this.selectedObjects[i].move(offset);
		}
	};
	
	this.deleteSelections = function(){
		if(!isEmpty(this.selectedObjects)){
			for(var i=0; i<this.selectedObjects.length; i++)
				CD$CONTROLLERS.removeController(this.id, this.selectedObjects[i]);;
			ContextDiagram.redraw(this.id);			
			this.selectedObjects = new Array();
		}
		this.target.parents('.js_context_space').find('.js_object_properties tr.js_node_property, tr.js_line_property').hide();		
	};
	
	this.clearSelectedTool = function(){
		this.selectedTool = CD$TOOL_NONE;
		this.target.parents('.js_context_space').find('.js_toggle_creation_tool a.selected:first').click();		
	};
	

	if(isEmpty(target) || isEmpty(data)) return;
	
	this.id = data.id;
	this.model = ContextDiagram.Model.Canvas({
		id: data.id,
		width : data.width,
		height : data.height,
		selected : data.selected
	});
	
	this.draw();

	if(this.mode === CD$MODE_EDIT){
		var canvas = target.find('canvas[canvasId="' + this.id + '"]');
		
		canvas.click(function(e){
			this.focus();
			var position = { top: e.offsetY, left: e.offsetX };
			var canvasId = $(this).attr('canvasId');
			var canvasCtrl = CD$CONTROLLERS.findControllerById(canvasId, canvasId);
			
			switch(canvasCtrl.selectedTool){
			case CD$TOOL_NONE:
				var ctrl = CD$CONTROLLERS.findControllerByPosition(canvasId, position);
				if(ctrl){
					canvasCtrl.newSelections([ctrl]);
				}else{
					canvasCtrl.clearSelections();
				}
				break;
			case CD$TOOL_NODE_PRODUCT:
			case CD$TOOL_NODE_PROVIDER:
			case CD$TOOL_NODE_TOUCHPOINT:
			case CD$TOOL_NODE_USER:
				var size = (canvasCtrl.selectedTool==CD$TOOL_NODE_TOUCHPOINT?CD$NODE_SIZE_SMALL:CD$NODE_SIZE_NORMAL)/2;
				position = {top:position.top-size, left:position.left-size};
				var ctrl = new ContextDiagram.Controller.Node( canvasCtrl.id, 
																		canvasCtrl.mode, 
																		canvasCtrl.context, 
																		ContextDiagram.Model.Node({
																			type: canvasCtrl.selectedTool,
																			position: position,
																			selected: false
																		}));
				CD$CONTROLLERS.push(ctrl);
				canvasCtrl.newSelections([ctrl]);
				canvasCtrl.clearSelectedTool();
				break;
			case CD$TOOL_EDGELINE:
				if(canvasCtrl.nowLining){
					var ctrl = CD$CONTROLLERS.findControllerByPosition(canvasId, position);
					if(ctrl && ContextDiagram.getModelType(ctrl.model) === CD$TYPE_NODE && canvasCtrl.liningController && ctrl.model != canvasCtrl.liningController.model.id){
						canvasCtrl.liningController.model.toNodeId = ctrl.model.id;
						canvasCtrl.liningController.model.direction = CD$ARROW_DIR_SINGLE;
						canvasCtrl.liningController.model.isLining = false;
						CD$CONTROLLERS.updateModel(canvasId, canvasCtrl.liningController.model);
					}else{
						canvasCtrl.clearSelections();
						CD$CONTROLLERS.removeController(canvasId, canvasCtrl.liningController.model);
					}
					ContextDiagram.redraw(canvasId);
					canvasCtrl.nowLining = false;
					canvasCtrl.liningController = null;
					canvasCtrl.clearSelectedTool();
				}else{
					var ctrl = CD$CONTROLLERS.findControllerByPosition(canvasId, position);
					if(ctrl && ContextDiagram.getModelType(ctrl.model) === CD$TYPE_NODE){
						canvasCtrl.nowLining = true;
						canvasCtrl.liningController = new ContextDiagram.Controller.EdgeLine(canvasCtrl.id, 
																							canvasCtrl.mode, 
																							canvasCtrl.context, 
																							ContextDiagram.Model.EdgeLine({
																								fromNodeId: ctrl.model.id,
																								toPosition: position,
																								direction: CD$ARROW_DIR_SINGLE,
																								isLining: true,
																								selected: false
																							}));
						CD$CONTROLLERS.push(canvasCtrl.liningController);
						canvasCtrl.newSelections([canvasCtrl.liningController]);
					}else{
						canvasCtrl.nowLining = false;
						canvasCtrl.liningController = null;
						canvasCtrl.clearSelectedTool();						
					}
				}
				break;
			default:
			}
		});
		
		canvas.mousedown(function(e){
			var position = { top: e.offsetY, left: e.offsetX };
			var canvasId = $(this).attr('canvasId');
			var canvasCtrl = CD$CONTROLLERS.findControllerById(canvasId, canvasId);
			var ctrl = CD$CONTROLLERS.findControllerByPosition(canvasId, position);
			if(ctrl && ctrl.model.selected){
				if(ContextDiagram.getModelType(ctrl.model) == CD$TYPE_NODE){
					canvasCtrl.nowDragging = true;
					canvasCtrl.draggingPosition = position;
				}else if(ContextDiagram.getModelType(ctrl.model) == CD$TYPE_EDGELINE){
					var savedModel = ContextDiagram.Model.EdgeLine(ctrl.model);
					canvasCtrl.nowLining = true;
					ctrl.model.direction = CD$ARROW_DIR_SINGLE;
					ctrl.isLining = true;
					ctrl.selected = false;
					canvasCtrl.liningController = ctrl;
					canvasCtrl.newSelections([canvasCtrl.liningController]);
					canvasCtrl.lineSaved = savedModel;
				}
				$(this).css('cursor', 'pointer');
			}else{
				canvasCtrl.nowDragging = false;
				canvasCtrl.draggingPosition = null;
				$(this).css('cursor', 'default');
			}
		});
		
		canvas.mouseup(function(e){
			var position = { top: e.offsetY, left: e.offsetX };
			var canvasId = $(this).attr('canvasId');
			var canvasCtrl = CD$CONTROLLERS.findControllerById(canvasId, canvasId);
			if(canvasCtrl.nowDragging){
				canvasCtrl.nowDragging = false;
				canvasCtrl.draggingPosition = null;
			}else if(canvasCtrl.nowLining){
				var ctrl = CD$CONTROLLERS.findControllerByPosition(canvasId, position);
				if(ctrl && ContextDiagram.getModelType(ctrl.model) === CD$TYPE_NODE && canvasCtrl.liningController && ctrl.model != canvasCtrl.liningController.model.id){
					canvasCtrl.liningController.model.toNodeId = ctrl.model.id;
					canvasCtrl.liningController.model.direction = CD$ARROW_DIR_SINGLE;
					canvasCtrl.liningController.model.isLining = false;
					CD$CONTROLLERS.updateModel(canvasId, canvasCtrl.liningController.model);
				}else{
					CD$CONTROLLERS.removeController(canvasId, canvasCtrl.liningController.model);
					if(canvasCtrl.lineSaved){
						var savedCtrl = canvasCtrl.liningController;
						savedCtrl.model = canvasCtrl.lineSaved;
						CD$CONTROLLERS.push(savedCtrl);
					}
					canvasCtrl.clearSelections();
				}
				ContextDiagram.redraw(canvasId);
				canvasCtrl.nowLining = false;
				canvasCtrl.liningController = null;
				canvasCtrl.clearSelectedTool();
			}else if(canvasCtrl.verticalResizing){
				canvasCtrl.verticalResizing = false;
				canvasCtrl.draggingPosition = null;
			}
			$(this).css('cursor', 'default');
		});
		
		canvas.mousemove(function(e){
			var position = { top: e.offsetY, left: e.offsetX };
			var canvasId = $(this).attr('canvasId');
			var canvasCtrl = CD$CONTROLLERS.findControllerById(canvasId, canvasId);
			if(canvasCtrl.nowDragging && canvasCtrl.draggingPosition){
				canvasCtrl.moveSelections({x:position.left-canvasCtrl.draggingPosition.left, y:position.top-canvasCtrl.draggingPosition.top});
				canvasCtrl.draggingPosition = position;
			}else if(canvasCtrl.nowLining && canvasCtrl.liningController){
				var ctrl = CD$CONTROLLERS.findControllerByPosition(canvasId, position);
				if(ctrl && ContextDiagram.getModelType(ctrl.model) === CD$TYPE_NODE && canvasCtrl.liningController && ctrl.model != canvasCtrl.liningController.model.id){
					canvasCtrl.liningController.model.toNodeId = ctrl.model.id;
					canvasCtrl.liningController.model.direction = CD$ARROW_DIR_SINGLE;
					canvasCtrl.liningController.model.isLining = false;
				}else{
					canvasCtrl.liningController.model.toNodeId = null;
					canvasCtrl.liningController.model.toPosition = position;
					canvasCtrl.liningController.model.direction = CD$ARROW_DIR_NONE;
					canvasCtrl.liningController.model.isLining = true;
				}
				CD$CONTROLLERS.updateModel(canvasId, canvasCtrl.liningController.model);
				ContextDiagram.redraw(canvasId);				
			}
		});
		canvas.mouseleave(function(e){
			var canvasId = $(this).attr('canvasId');
			var canvasCtrl = CD$CONTROLLERS.findControllerById(canvasId, canvasId);
			if(canvasCtrl.nowDragging){
				canvasCtrl.nowDragging = false;
				canvasCtrl.draggingPosition = null;
				canvasCtrl.clearSelections();
				$(this).css('cursor', 'default');
			}
		});
		
		canvas.keyup(function(e){
			var e = window.event || e;
			var keyCode = e.which || e.keyCode;
			var canvasId = $(this).attr('canvasId');
			var canvasCtrl = CD$CONTROLLERS.findControllerById(canvasId, canvasId);
			if(keyCode == $.ui.keyCode.DELETE){
				canvasCtrl.deleteSelections();
			}
		});

		$('div.js_diagram_vertical_resizer').mousedown(function(e) {
  			e.preventDefault();
			var input = $(targetElement(e));
			var position = {top:e.clientY, left:e.offsetX};
			var canvasId = input.parents('.js_context_space:first').find('canvas:first').attr('canvasId');
			var canvasCtrl = CD$CONTROLLERS.findControllerById(canvasId, canvasId);
			canvasCtrl.verticalResizing = true;
			canvasCtrl.draggingPosition = position;
			$(this).css('cursor', 'row-resize');
		});
			
		$('div.js_diagram_vertical_resizer').mouseup(function(e) {
			var input = $(targetElement(e));
			var canvasId = input.parents('.js_context_space:first').find('canvas:first').attr('canvasId');
			var canvasCtrl = CD$CONTROLLERS.findControllerById(canvasId, canvasId);
			canvasCtrl.verticalResizing = false;
			canvasCtrl.draggingPosition = null;
			$(this).css('cursor', 'default');
		});
	
		$('div.js_diagram_vertical_resizer').mouseleave(function(e) {
			var input = $(targetElement(e));
			var canvasId = input.parents('.js_context_space:first').find('canvas:first').attr('canvasId');
			var canvasCtrl = CD$CONTROLLERS.findControllerById(canvasId, canvasId);
			canvasCtrl.verticalResizing = false;
			$(this).css('cursor', 'default');
		});
	
		$('div.js_diagram_vertical_resizer').mouseover(function(e) {
			$(this).css('cursor', 'row-resize');
		});
	
		canvas.mouseover(function(e) {
			var input = $(targetElement(e));
			var canvasId = input.parents('.js_context_space:first').find('canvas:first').attr('canvasId');
			var canvasCtrl = CD$CONTROLLERS.findControllerById(canvasId, canvasId);
			if(canvasCtrl.draggingPosition){
				canvasCtrl.verticalResizing = true;
			}
		});
		
		$('div.js_diagram_vertical_resizer').parent().parent().mousemove(function(e) {
			var input = $(targetElement(e));
			var position = {top:e.clientY, left:e.clientX};
			var canvasId = input.parents('.js_context_space:first').find('canvas:first').attr('canvasId');
			var canvasCtrl = CD$CONTROLLERS.findControllerById(canvasId, canvasId);
			if(canvasCtrl.verticalResizing && canvasCtrl.draggingPosition){
				var offsetY = position.top-canvasCtrl.draggingPosition.top;
				canvasCtrl.verticalResize(offsetY);
				canvasCtrl.draggingPosition = position;
			}
		});	
	}

};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[controller.canvasController script]', null, error);
}