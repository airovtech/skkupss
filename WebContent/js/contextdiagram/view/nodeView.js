//
// Source Name : nodeView.js
// Description : Canvas를 이용하여 Node형식별로 View를 그리는 소스
//
try{
ContextDiagram.View = ContextDiagram.View || {};
ContextDiagram.View.Node = {};
ContextDiagram.View.Node.draw = function(config){
	var fillStyleProduct = 'rgb(194, 230, 254)';
	var fillStyleProvider = 'rgb(253, 229, 255)';
	var fillStyleTouchPoint = 'rgb(195, 255, 39)';
	var fillStyleUser = 'rgb(255, 255, 12)';
	var strokeStyleProduct = 'rgb(63, 176, 240)';
	var strokeStyleProvider = 'rgb(248, 112, 217)';
	var strokeStyleTouchPoint = 'rgb(177, 179, 55)';
	var strokeStyleUser = 'rgb(168, 220, 81)';
	var lineWidth = 2;

	var options = {
		mode : CD$MODE_VIEW,
		canvasId : null,
		context : null,
		model : null
	};
	
	ContextDiagram.extend(options, config);
	if(isEmpty(options.context) || isEmpty(options.model)) return null;
	
	var context = options.context;
	var model = options.model;
	context.save();
	
	var nodeSize = (model.type==CD$NODE_TYPE_TOUCHPOINT)?CD$NODE_SIZE_SMALL:CD$NODE_SIZE_NORMAL;
	var positionX = model.position.left;
	var positionY = model.position.top;
	if(model.type === CD$NODE_TYPE_PRODUCT){				
		context.fillStyle = fillStyleProduct;
		context.strokeStyle = model.selected?CD$SELECTED_STYLE:strokeStyleProduct;
		context.lineWidth = lineWidth;
		context.fillRect(positionX, positionY, nodeSize, nodeSize);
		context.strokeRect(positionX, positionY, nodeSize, nodeSize);
	}else if(model.type === CD$NODE_TYPE_PROVIDER){
		var height = nodeSize * (Math.sqrt(3)/2);
		var topX = positionX+nodeSize/2;
		var topY = positionY;
		context.beginPath();
		context.fillStyle = fillStyleProvider;
		context.strokeStyle = model.selected?CD$SELECTED_STYLE:strokeStyleProvider;
		context.lineWidth = lineWidth;
		context.moveTo(topX, topY);
		context.lineTo(topX+nodeSize/2, topY+height);
		context.lineTo(topX-nodeSize/2, topY+height);
		context.lineTo(topX, topY);
		context.fill();
		context.stroke();
		context.closePath();
	}else if(model.type === CD$NODE_TYPE_TOUCHPOINT){
		context.fillStyle = fillStyleTouchPoint;
		context.strokeStyle = model.selected?CD$SELECTED_STYLE:strokeStyleTouchPoint;
		context.lineWidth = lineWidth;
		context.fillRect(positionX, positionY, nodeSize, nodeSize);
		context.strokeRect(positionX, positionY, nodeSize, nodeSize);
	}else if(model.type === CD$NODE_TYPE_USER){
		context.beginPath();
		context.fillStyle = fillStyleUser;
		context.strokeStyle = model.selected?CD$SELECTED_STYLE:strokeStyleUser;
		context.lineWidth = lineWidth;
		context.arc(positionX+nodeSize/2, positionY+nodeSize/2, nodeSize/2, (Math.PI/180)*0, (Math.PI/180)*360, false);
		context.fill();
		context.stroke();
		context.closePath();
	}
	
	if(!isEmpty(model.name)){
		context.font = CD$TEXT_FONT;
//		context.fillStyle = model.selected?CD$SELECTED_STYLE:CD$TEXT_FILLSTYLE;
		context.fillStyle = CD$TEXT_FILLSTYLE;
		context.textAlign = 'center';
		ContextDiagram.wrapText(context, model.name, positionX+nodeSize/2, positionY+((options.type==CD$NODE_TYPE_PROVIDER)?nodeSize*(Math.sqrt(3)/2):nodeSize)+14, CD$TEXT_MAXWIDTH, CD$TEXT_LINEHEIGHT);
	}
	context.restore();
	return options.context;
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[view.nodeView script]', null, error);
}