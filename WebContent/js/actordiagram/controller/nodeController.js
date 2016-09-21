//
// Source Name : nodeController.js
// Description : Actor Diagram�� Node�� Model�� View�� �����ϴ� ���.
//
try{
ActorDiagram.Controller = ActorDiagram.Controller || {};
ActorDiagram.Controller.Node = function(canvasId, mode, context, data){
			
	this.canvasId = canvasId;
	this.id = null;
	this.mode = mode || AD$MODE_VIEW;
	this.context = context;
	this.data = data;
	this.model = null;
	this.nameRect = null;
	this.draw = function(){
		this.nameRect = ActorDiagram.View.Node.draw({
			mode : this.mode,
			canvasId : this.canvasId,
			context : this.context,
			model : this.model
		});
	};

	this.move = function(offset){	
		this.model.position = {top:this.model.position.top+offset.y, left:this.model.position.left+offset.x};
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
	this.model = ActorDiagram.Model.Node({
		id: data.id,
		type: data.type,  // product, provider, touchPoint, user
		typeName: data.typeName,
		isPrimaryNode: data.isPrimaryNode,
		position: data.position,
		name: data.name
	});
	
	this.draw();
	
};

}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[controller.nodeController script]', null, error);
}