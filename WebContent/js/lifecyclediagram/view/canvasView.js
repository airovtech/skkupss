//
// Source Name : canvasView.js
// Description : Lifecycle Diagram�� Canvas View�� �׸��� �ҽ�
//
try{
LifecycleDiagram.View = LifecycleDiagram.View || {};
LifecycleDiagram.View.Canvas = {};
LifecycleDiagram.View.Canvas.draw = function(config){
	var options = {
		mode : LD$MODE_VIEW,
		target : null,
		model : null
	};
	
	var CANVAS_STROKE_STYLE = 'rgb(182,182,182)';
	LifecycleDiagram.extend(options, config);
	
	if(!options.target || !options.model) return null;
	
	var model = options.model;
	options.target.html('<canvas canvasId="' + model.id + '" width="' + model.width + '" height="' + model.height + '"tabindex="0" style="margin:auto; width:' + model.width + 'px;height:' + model.height + 'px;background-color:' + model.backgroundColor + '"><canvas>');
	var canvas = options.target.find('canvas:first');
	var context = canvas.get(0).getContext('2d');
	canvas.parent().attr('width', model.width);

	context.save();
	context.beginPath();
	context.strokeStyle = CANVAS_STROKE_STYLE;
	context.lineWidth = 3;
	context.arc(model.width/2, model.height/2, LD$DEFAULT_CIRCLE_RADIUS, (Math.PI/180)*0, (Math.PI/180)*360, false);
	context.stroke();
	context.closePath();
	
	context.beginPath();
	context.strokeStyle = CANVAS_STROKE_STYLE;
	context.lineWidth = 1;
	context.translate(model.width/2, model.height/2);
	context.rotate(15*Math.PI/180)
	context.moveTo(0, -LD$DEFAULT_CIRCLE_RADIUS);
	context.lineTo(0, LD$DEFAULT_CIRCLE_RADIUS);
	context.stroke();
	context.closePath();
	
	context.beginPath();
	context.strokeStyle = CANVAS_STROKE_STYLE;
	context.lineWidth = 1;
	context.rotate(60*Math.PI/180)
	context.moveTo(0, 0);
	context.lineTo(0, LD$DEFAULT_CIRCLE_RADIUS);
	context.stroke();
	context.closePath();
	context.restore();
	return context;
	
};

LifecycleDiagram.View.Canvas.redraw = function(config){
	var options = {
		mode : LD$MODE_VIEW,
		context : null,
		model : null
	};
	
	var CANVAS_STROKE_STYLE = 'rgb(182,182,182)';
	LifecycleDiagram.extend(options, config);
	
	if(!options.context || !options.model) return null;
	
	var model = options.model;
	var context = options.context;
	context.clearRect(0, 0, model.width, model.height);
	
	context.save();
	context.beginPath();
	context.strokeStyle = CANVAS_STROKE_STYLE;
	context.lineWidth = 3;
	context.arc(model.width/2, model.height/2, LD$DEFAULT_CIRCLE_RADIUS, (Math.PI/180)*0, (Math.PI/180)*360, false);
	context.stroke();
	context.closePath();
	
	context.beginPath();
	context.strokeStyle = CANVAS_STROKE_STYLE;
	context.lineWidth = 1;
	context.translate(model.width/2, model.height/2);
	context.rotate(15*Math.PI/180)
	context.moveTo(0, -LD$DEFAULT_CIRCLE_RADIUS);
	context.lineTo(0, LD$DEFAULT_CIRCLE_RADIUS);
	context.stroke();
	context.closePath();
	
	context.beginPath();
	context.strokeStyle = CANVAS_STROKE_STYLE;
	context.lineWidth = 1;
	context.rotate(60*Math.PI/180)
	context.moveTo(0, 0);
	context.lineTo(0, LD$DEFAULT_CIRCLE_RADIUS);
	context.stroke();
	context.closePath();
	context.restore();
	
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[view.canvasView script]', null, error);
};