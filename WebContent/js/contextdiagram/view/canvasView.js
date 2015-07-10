//
// Source Name : canvasView.js
// Description : Context Diagram의 Canvas View를 그리는 소스
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
	options.target.html('<canvas canvasId="' + model.id + '" width="' + model.width + '" height="' + model.height + '"tabindex="0" style="width:' + model.width + 'px;height:' + model.height + 'px;background-color:' + model.backgroundColor + '"><canvas>');
	var canvas = options.target.find('canvas:first');
	var context = canvas.get(0).getContext('2d');
	context.globalCompositeOperation = "source-over";
	
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