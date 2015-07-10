//
// Source Name : edgeLineController.js
// Description : Context Diagram의 EdgeLine의 Model과 View를 관리하는 기능.
//
try{
ContextDiagram.Controller = ContextDiagram.Controller || {};
ContextDiagram.Controller.EdgeLine = function(canvasId, mode, context, data){

	this.canvasId = canvasId;
	this.id = null;
	this.mode = mode || CD$MODE_VIEW;
	this.context = context;
	this.model = null;
	this.draw = function(){
		ContextDiagram.View.EdgeLine.draw({
			mode : this.mode,
			canvasId : this.canvasId,
			context : this.context,
			model : this.model
		});
	};
	this.move = function(fromNodeId, toNodeId){
		this.model.fromNodeId = fromNodeId;
		this.model.toNodeId = toNodeId;
		CD$CONTROLLERS.updateModel(this.canvasId, this.model);
		ContextDiagram.redraw(canvasId);
	};
	this.change = function(model){
		this.model = model;
		CD$CONTROLLERS.updateModel(this.canvasId, this.model);
		ContextDiagram.redraw(canvasId);
	};
	this.remove = function(){
		CD$CONTROLLERS.removeController(this.canvasId, this);
		ContextDiagram.redraw(canvasId);
	};
	this.select = function(selected){
		this.model.selected = selected;
		CD$CONTROLLERS.updateModel(this.canvasId, this.model);
		this.draw();
	};
	
	
	if(isEmpty(canvasId) || isEmpty(context) || isEmpty(data)) return null;
	
	this.id = data.id;
	this.model = ContextDiagram.Model.EdgeLine({
		id: data.id,
		fromNodeId: data.fromNodeId, 
		toNodeId: data.toNodeId,
		direction: data.direction,
		lineBreak: data.lineBreak,
		label: data.label,
		selected: data.selected
	});
	
	this.draw();
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[controller.edgeLineController script]', null, error);
}