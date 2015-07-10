//
// Source Name : nodeController.js
// Description : Context Diagram의 Node의 Model과 View를 관리하는 기능.
//
try{
ContextDiagram.Controller = ContextDiagram.Controller || {};
ContextDiagram.Controller.Node = function(canvasId, mode, context, data){
			
	this.canvasId = canvasId;
	this.id = null;
	this.mode = mode || CD$MODE_VIEW;
	this.context = context;
	this.data = data;
	this.model = null;
	this.draw = function(){
		ContextDiagram.View.Node.draw({
			mode : this.mode,
			canvasId : this.canvasId,
			context : this.context,
			model : this.model
		});
	};

	this.move = function(offset){	
		this.model.position = {top:this.model.position.top+offset.y, left:this.model.position.left+offset.x};
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
	this.model = ContextDiagram.Model.Node({
		id: data.id,
		type: data.type,  // product, provider, touchPoint, user
		position: data.position,
		name: data.name,
		selected: data.selected
	});
	
	this.draw();
	
};

}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[controller.nodeController script]', null, error);
}