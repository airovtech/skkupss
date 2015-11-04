//
// Source Name : nodeView.js
// Description : Canvas�� �̿��Ͽ� Node���ĺ��� View�� �׸��� �ҽ�
//
try{
LifecycleDiagram.View = LifecycleDiagram.View || {};
LifecycleDiagram.View.Step = {};
LifecycleDiagram.View.Step.draw = function(config){
	var fillStyleProduct = 'white';
	var fillStyleProvider = 'rgb(253, 229, 255)';
	var fillStyleTouchPoint = 'rgb(195, 255, 39)';
	var fillStyleUser = 'rgb(255, 255, 12)';
	var strokeStyleProduct = 'white';
	var strokeStyleProvider = 'rgb(248, 112, 217)';
	var strokeStyleTouchPoint = 'rgb(177, 179, 55)';
	var strokeStyleUser = 'rgb(168, 220, 81)';
	var lineWidth = 2;

	var options = {
		mode : LD$MODE_VIEW,
		context : null,
		model : null
	};
	
	LifecycleDiagram.extend(options, config);
	if(isEmpty(options.context) || isEmpty(options.model)) return null;
	
	var context = options.context;
	var model = options.model;
	context.save();	

	context.font = LD$TEXT_FONT;
	context.fillStyle = model.selected?LD$SELECTED_STYLE:LD$TEXT_FILLSTYLE;
	context.textAlign = 'center';
	var nameRect = LifecycleDiagram.wrapText(context, model.name, model.x, model.y, LD$TEXT_MAXWIDTH, LD$TEXT_LINEHEIGHT);

	context.translate(LD$DEFAULT_CANVAS_WIDTH/2, LD$DEFAULT_CANVAS_HEIGHT/2);
	context.rotate((model.index+3)*30*Math.PI/180)	
	context.beginPath();
	context.fillStyle = model.selected?LD$SELECTED_STYLE:LD$TEXT_FILLSTYLE;
	context.arc(0, LD$DEFAULT_CIRCLE_RADIUS, 4, (Math.PI/180)*0, (Math.PI/180)*360, false);
	context.fill();
	context.closePath();

	context.restore();
	
	return nameRect;
	
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[view.stepView script]', null, error);
}