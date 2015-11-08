//
// Source Name : edgeLineView.js
// Description : Node�� Node���� ���ἱ View�� �׷��ִ� �ҽ�
//
try{
ActorDiagram.View = ActorDiagram.View || {};
ActorDiagram.View.EdgeLine = {};
ActorDiagram.View.EdgeLine.draw = function(config){
	var strokeStyle = 'rgb(114, 114, 114)';
	var fillStyle = 'rgb(114, 114, 114)';
	var lineWidth = 2;
	var arrowSize = 7;
	
	var options = {
		mode : AD$MODE_VIEW,
		canvasId : null,
		context : null,
		model : null
	};
    
	ActorDiagram.extend(options, config);
	if(isEmpty(options.context) || isEmpty(options.model)) return null;
	
	var context = options.context;
	var model = options.model;
	if(!isEmpty(model.fromNodeId))
		model.fromPosition = ActorDiagram.getCenterByNode(AD$CONTROLLERS.findModelById(options.canvasId, model.fromNodeId));
	if(!model.isLining && !isEmpty(model.toNodeId))
		model.toPosition = ActorDiagram.getCenterByNode(AD$CONTROLLERS.findModelById(options.canvasId, model.toNodeId));
	context.save();	
    
    context.lineWidth = lineWidth;
    context.fillStyle = context.strokeStyle = model.selected?AD$SELECTED_STYLE:model.lineColor;
    ActorDiagram.arrowLine(context, 
    		{x:model.fromPosition.left|0, y:model.fromPosition.top|0}, 
    		{x:model.toPosition.left|0, y:model.toPosition.top|0}, 
    		arrowSize, 
    		model.direction,
    		model.lineBreak,
    		model.isLining?AD$EDGE_TYPE_NONE:null);
    var labelRect = null;
    if(model.label)
	    labelRect = ActorDiagram.textOnArrowLine(context, 
	    		{x:model.fromPosition.left|0, y:model.fromPosition.top|0}, 
	    		{x:model.toPosition.left|0, y:model.toPosition.top|0}, 
	    		arrowSize, 
	    		model.direction,
	    		model.lineBreak,
	    		model.isLining?AD$EDGE_TYPE_NONE:null,
	    		model.label,
	    		model.selected);

 	context.restore();	
   
	return labelRect;

};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[view.edgeLineView script]', null, error);
}