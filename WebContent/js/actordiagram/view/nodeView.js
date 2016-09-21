//
// Source Name : nodeView.js
// Description : Canvas�� �̿��Ͽ� Node���ĺ��� View�� �׸��� �ҽ�
//
try{
ActorDiagram.View = ActorDiagram.View || {};
ActorDiagram.View.Node = {};
ActorDiagram.View.Node.draw = function(config){
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
		mode : AD$MODE_VIEW,
		canvasId : null,
		context : null,
		model : null
	};
	
	ActorDiagram.extend(options, config);
	if(isEmpty(options.context) || isEmpty(options.model)) return null;
	
	var context = options.context;
	var model = options.model;
	context.save();
	
	var nodeSize = (model.type==AD$NODE_TYPE_TOUCHPOINT)?AD$NODE_SIZE_SMALL:AD$NODE_SIZE_NORMAL;
	var positionX = model.position.left;
	var positionY = model.position.top;
	if(model.type === AD$NODE_TYPE_PRODUCT){				
		context.fillStyle = fillStyleProduct;
		context.strokeStyle = strokeStyleProduct;
		context.lineWidth = lineWidth;
		context.fillRect(positionX, positionY, nodeSize, nodeSize);
		context.strokeRect(positionX, positionY, nodeSize, nodeSize);
	}else if(model.type === AD$NODE_TYPE_PROVIDER){
		var height = nodeSize * (Math.sqrt(3)/2);
		var topX = positionX+nodeSize/2;
		var topY = positionY;
		context.beginPath();
		context.fillStyle = fillStyleProvider;
		context.strokeStyle = model.selected?AD$SELECTED_STYLE:strokeStyleProvider;
		context.lineWidth = lineWidth;
		context.moveTo(topX, topY);
		context.lineTo(topX+nodeSize/2, topY+height);
		context.lineTo(topX-nodeSize/2, topY+height);
		context.lineTo(topX, topY);
		context.fill();
		context.stroke();
		context.closePath();
	}else if(model.type === AD$NODE_TYPE_TOUCHPOINT){
		context.fillStyle = fillStyleTouchPoint;
		context.strokeStyle = model.selected?AD$SELECTED_STYLE:strokeStyleTouchPoint;
		context.lineWidth = lineWidth;
		context.fillRect(positionX, positionY, nodeSize, nodeSize);
		context.strokeRect(positionX, positionY, nodeSize, nodeSize);
	}else if(model.type === AD$NODE_TYPE_USER){
		context.beginPath();
		context.fillStyle = fillStyleUser;
		context.strokeStyle = model.selected?AD$SELECTED_STYLE:strokeStyleUser;
		context.lineWidth = lineWidth;
		context.arc(positionX+nodeSize/2, positionY+nodeSize/2, nodeSize/2, (Math.PI/180)*0, (Math.PI/180)*360, false);
		context.fill();
		context.stroke();
		context.closePath();
	}

	var nameRect = null;
	if(!isEmpty(model.name)){
		context.font = AD$TEXT_FONT;
		context.fillStyle = model.selected?AD$SELECTED_STYLE:model.isRootNode?AD$ROOTNODE_STYLE:(model.isPrimaryNode && (model.typeName === 'receiver' || model.typeName === '수혜자'))?AD$PRIMARY_STYLE:AD$TEXT_FILLSTYLE;
		context.textAlign = 'center';
		nameRect = ActorDiagram.wrapText(context, model.name, positionX+nodeSize/2, positionY+AD$TEXT_LINEHEIGHT/2, AD$TEXT_MAXWIDTH, AD$TEXT_LINEHEIGHT);
	}
	context.restore();
	return nameRect;
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[view.nodeView script]', null, error);
}