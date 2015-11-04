//
// Source Name : edgeLineController.js
// Description : Lifecycle Diagram�� EdgeLine�� Model�� View�� �����ϴ� ���.
//
try{
LifecycleDiagram.Controller = LifecycleDiagram.Controller || {};
LifecycleDiagram.Controller.Step = function(mode, context, index, selected){
	this.type = LD$TYPE_STEP;
	this.index = index;
	this.mode = mode || LD$MODE_VIEW;
	this.context = context;
	this.model = null;
	this.draw = function(){
		this.nameRect = LifecycleDiagram.View.Step.draw({
			mode : this.mode,
			context : this.context,
			model : this.model
		});
	};
	this.select = function(selected){
		this.model.selected = selected;
		LD$CONTROLLERS.updateModel(this.canvasId, this.model);
		LifecycleDiagram.redraw(canvasId);
	};
	
	
	if(isEmpty(context)) return null;
	
	this.model = LifecycleDiagram.Model.Step({
		index: index,
		name: LD$STEPS[index].name,
		x: LD$STEPS[index].x,
		y: LD$STEPS[index].y,
		selected: selected
	});
	
	this.draw();
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[controller.stepController script]', null, error);
}