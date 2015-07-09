//
// Source Name : canvasView.js
// Description : Context Diagram�� Canvas View�� �׸��� �ҽ�
//
try{
ContextDiagram.View = ContextDiagram.View || {};
ContextDiagram.View.Canvas = {};
ContextDiagram.View.Canvas.draw = function(config){
	var options = {
		mode : CD$MODE_VIEW,
		target : null,
		model : null
	};
	
	ContextDiagram.extend(options, config);
	
	if(!options.target || !options.model) return null;
	
	var model = options.model;
	options.target.html('<canvas width="' + model.width + '" height="' + model.height + '" style="width:' + model.width + 'px;height:' + model.height + 'px;background-color:' + model.backgroundColor + '"><canvas>');
	var context = options.target.find('canvas').get(0).getContext('2d');
	return context;
	
};

ContextDiagram.View.Canvas.redraw = function(config){
	var options = {
		mode : CD$MODE_VIEW,
		context : null,
		model : null
	};
	
	ContextDiagram.extend(options, config);
	
	if(!options.context || !options.model) return null;
	
	var model = options.model;
	options.context.clearRect(0, 0, model.width, model.height);
	
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[view.canvasView script]', null, error);
};