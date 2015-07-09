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

	if(isEmpty(target) || isEmpty(data)) return;
	
	this.id = data.id;
	this.model = ContextDiagram.Model.Canvas({
		id: data.id,
		width : data.width,
		height : data.height,
		selected : data.selected
	});
	
	this.draw();
	
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[controller.canvasController script]', null, error);
}