//
// Source Name : canvasController.js
// Description : Lifecycle Diagram�� Canvas�� Model�� View�� �����ϴ� ���.
//
try{
LifecycleDiagram.Controller = LifecycleDiagram.Controller || {};
LifecycleDiagram.Controller.Canvas = function(mode, target, id){
	this.type = LD$TYPE_CANVAS;
	this.id = id;
	this.mode = mode || LD$MODE_VIEW;
	this.target = target;
	this.context = null;
	this.model = null;	
	this.draw = function(){
		this.context = LifecycleDiagram.View.Canvas.draw({
			mode : this.mode,
			target : this.target,
			model : this.model
		});
	};
	
	this.redraw = function(){
		LifecycleDiagram.View.Canvas.redraw({
			mode : this.mode,
			context : this.context,
			model : this.model
		});	
		
		if(!isEmpty(LD$CONTROLLERS)){
			for(var i=1; i<LD$CONTROLLERS.length; i++){
				LD$CONTROLLERS[i].draw();
			}
		}
	};
	
	if(isEmpty(target)) return;
	
	this.id = id;
	this.model = LifecycleDiagram.Model.Canvas({
		id: id,
		width : LD$DEFAULT_CANVAS_WIDTH,
		height : LD$DEFAULT_CANVAS_HEIGHT
	});
	
	this.draw();

	if(this.mode === LD$MODE_EDIT){
		var canvas = target.find('canvas[canvasId="' + this.id + '"]');
		
		canvas.click(function(e){
//			this.focus();
			var position = { top: e.offsetY, left: e.offsetX };
			var stepCtrl = LD$CONTROLLERS.findControllerByPosition(position);
			if(stepCtrl){
				var model = stepCtrl.model;
				model.selected = !model.selected;
				LD$DATA[model.index] = model.selected?'1':'0';
				LD$CONTROLLERS.updateStepModel(model);
				LD$CONTROLLERS.updateCategoryModels();
				var canvasId = $(this).attr('canvasId');
				var canvasCtrl = LD$CONTROLLERS.findCanvasController(canvasId);
				canvasCtrl.redraw();
			}
		});
	}else{
		canvas.unbind('click');
	}

};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[controller.canvasController script]', null, error);
}