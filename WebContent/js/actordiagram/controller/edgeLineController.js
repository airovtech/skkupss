//
// Source Name : edgeLineController.js
// Description : Actor Diagram의 EdgeLine의 Model과 View를 관리하는 기능.
//
try{
ActorDiagram.Controller = ActorDiagram.Controller || {};
ActorDiagram.Controller.EdgeLine = function(canvasId, mode, context, data){

	this.canvasId = canvasId;
	this.id = null;
	this.mode = mode || AD$MODE_VIEW;
	this.context = context;
	this.model = null;
	this.labelRect = null;
	this.draw = function(){
		this.labelRect = ActorDiagram.View.EdgeLine.draw({
			mode : this.mode,
			canvasId : this.canvasId,
			context : this.context,
			model : this.model
		});
	};
	this.move = function(fromNodeId, toNodeId){
		this.model.fromNodeId = fromNodeId;
		this.model.toNodeId = toNodeId;
		AD$CONTROLLERS.updateModel(this.canvasId, this.model);
		ActorDiagram.redraw(canvasId);
	};
	this.change = function(model){
		this.model = model;
		AD$CONTROLLERS.updateModel(this.canvasId, this.model);
		ActorDiagram.redraw(canvasId);
	};
	this.remove = function(){
		AD$CONTROLLERS.removeController(this.canvasId, this);
		ActorDiagram.redraw(canvasId);
	};
	this.select = function(selected){
		this.model.selected = selected;
		AD$CONTROLLERS.updateModel(this.canvasId, this.model);
		ActorDiagram.redraw(canvasId);
	};
	
	
	if(isEmpty(canvasId) || isEmpty(context) || isEmpty(data)) return null;
	
	this.id = data.id;
	this.model = ActorDiagram.Model.EdgeLine({
		id: data.id,
		fromNodeId: data.fromNodeId, 
		toNodeId: data.toNodeId,
		direction: data.direction,
		lineBreak: data.lineBreak,
		label: data.label
	});
	
	this.draw();
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[controller.edgeLineController script]', null, error);
}