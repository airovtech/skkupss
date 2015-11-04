//
// Source Name : nodeController.js
// Description : Lifecycle Diagram�� Node�� Model�� View�� �����ϴ� ���.
//
try{
LifecycleDiagram.Controller = LifecycleDiagram.Controller || {};
LifecycleDiagram.Controller.Category = function(mode, context, index, data){
	this.type = LD$TYPE_CATEGORY;
	this.index = index;
	this.mode = mode || LD$MODE_VIEW;
	this.context = context;
	this.model = null;
	this.draw = function(){
		this.nameRect = LifecycleDiagram.View.Category.draw({
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
		
	if(isEmpty(context) || isEmpty(data)) return null;
	
	this.model = LifecycleDiagram.Model.Category({
		index: index,
		name: LD$CATEGORIES[index].name,
		x: LD$CATEGORIES[index].x,
		y: LD$CATEGORIES[index].y,
		steps: data,
		selected: false
	});
	
	this.draw();
	
};

}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[controller.categoryController script]', null, error);
}