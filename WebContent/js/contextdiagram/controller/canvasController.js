//
// Source Name : canvasController.js
// Description : Context Diagram의 Canvas의 Model과 View를 관리하는 기능.
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
			}
		}
	};
	
	this.change = function(model){
		this.model = model;
		CD$CONTROLLERS.updateModel(this.canvasId, this.model);
		this.redraw();
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
			var objectProperties = this.target.parents('.js_context_space').find('.js_object_properties').attr('canvasId', this.id).attr('objectId', model.id);
			switch(ContextDiagram.getModelType(model)){
			case CD$TYPE_NODE:
				objectProperties.find('tr.js_node_property').show();
				objectProperties.find('input.js_input_node_name').attr('value', model.name);
				objectProperties.find('select.js_select_node_type option[value="' + model.type + '"]').attr('selected', 'selected');
				break;
			case CD$TYPE_EDGELINE:
				objectProperties.find('tr.js_line_property').show();
				objectProperties.find('input.js_input_line_label').attr('value', model.label);
				objectProperties.find('select.js_select_line_arrow option[value="' + model.direction + '"]').attr('selected', 'selected');
				var lineBreak = model.lineBreak;
				if(!lineBreak) lineBreak = {align:CD$ARROW_ALIGN_CENTER, breaks:0};
				objectProperties.find('select.js_select_line_type option[value="' + lineBreak + (lineBreak.align==CD$ARROW_ALIGN_CENTER?'':lineBreak.breaks) + '"]').attr('selected', 'selected');
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
				canvasCtrl.nowDragging = true;
				canvasCtrl.draggingPosition = position;
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
			canvasCtrl.nowDragging = false;
			canvasCtrl.draggingPosition = null;
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
		
		canvas.keyup(function(e){
			var e = window.event || e;
			var keyCode = e.which || e.keyCode;
			var canvasId = $(this).attr('canvasId');
			var canvasCtrl = CD$CONTROLLERS.findControllerById(canvasId, canvasId);
			if(keyCode == $.ui.keyCode.DELETE){
				canvasCtrl.deleteSelections();
			}
		});
	}

};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[controller.canvasController script]', null, error);
}