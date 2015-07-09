
try{

CD$TYPE_CANVAS = 'CANVAS';
CD$TYPE_NODE = 'NODE';
CD$TYPE_EDGELINE = 'LINE';
CD$DEFAULT_CANVAS_WIDTH = 640;
CD$DEFAULT_CANVAS_HEIGHT = 240;

//CD$TEXT_FONT = '12px dotum,Helvetica,sans-serif';
CD$TEXT_FONT = '11px sans-serif';
CD$TEXT_FILLSTYLE = 'black';
CD$TEXT_MAXWIDTH = 70;
CD$TEXT_LINEHEIGHT = 14;

CD$SELECTED_STYLE = 'red';

CD$NODE_TYPE_PRODUCT = 'product';
CD$NODE_TYPE_PROVIDER = 'provider';
CD$NODE_TYPE_TOUCHPOINT = 'touchPoint';
CD$NODE_TYPE_USER = 'user';

CD$NODE_SIZE_NORMAL = 30;
CD$NODE_SIZE_SMALL = 15;

CD$MODE_VIEW = 'view';
CD$MODE_EDIT = 'edit';

CD$ARROW_DIR_NONE = 0;
CD$ARROW_DIR_SINGLE = 1;
CD$ARROW_DIR_BOTH = 2;

CD$ARROW_ALIGN_CENTER = 0;
CD$ARROW_ALIGN_LEFT = 1;
CD$ARROW_ALIGN_RIGHT = 2;

ContextDiagram = function() {
    var Version = '1.0.0';
		
	this.version = function() {
		return Version;
	};
	
    return this;
};

ContextDiagram.extend = function(defaults, overide) {
	for(var k in overide) {
		defaults[k] = overide[k];
	};
};

ContextDiagram.generateId = function(prefix) {
	return prefix + (new Date()).format("_yymmddHHMMsss");
};

ContextDiagram.wrapText= function(context, text, x, y, maxWidth, lineHeight) {
	var words = text.split(' ');
	var line = '';
	
	for(var n = 0; n < words.length; n++) {
	  var testLine = line + words[n] + ' ';
	  var metrics = context.measureText(testLine);
	  var testWidth = metrics.width;
	  if (testWidth > maxWidth && n > 0) {
	    context.fillText(line, x, y);
	    line = words[n] + ' ';
	    y += lineHeight;
	  }
	  else {
	    line = testLine;
	  }
	}
	context.fillText(line, x, y);
};

ContextDiagram.getCenterByNode = function(nodeModel){
	if(isEmpty(nodeModel)) return {top:0, left:0};
	
	var nodeSize = (nodeModel.type==CD$NODE_TYPE_TOUCHPOINT)?CD$NODE_SIZE_SMALL:CD$NODE_SIZE_NORMAL;
	return {top:nodeModel.position.top+((nodeModel.type==CD$NODE_TYPE_PROVIDER)?nodeSize*(Math.sqrt(3)/2):nodeSize)/2, left:nodeModel.position.left+nodeSize/2};
	
};

ContextDiagram.getModelType = function(model){
	if(isEmpty(model) || isEmpty(model.id)) return null;
	if(model.id.indexof(CD$TYPE_CANVAS)>-1) return CD$TYPE_CANVAS;
	if(model.id.indexof(CD$TYPE_NODE)>-1) return CD$TYPE_NODE;
	if(model.id.indexof(CD$TYPE_EDGELINE)>-1) return CD$TYPE_EDGELINE;
	return null;
};

CD$CONTROLLERS = new Array();

CD$CONTROLLERS.findControllerById = function(canvasId, id){
	if(isEmpty(canvasId) || isEmpty(id) || isEmpty(CD$CONTROLLERS)) return null;
	for(var i=0; i<CD$CONTROLLERS.length; i++){
		if(CD$CONTROLLERS[i].id == id) return CD$CONTROLLERS[i];
	}
	return null;
};

CD$CONTROLLERS.findModelById = function(canvasId, id){
	var ctrl = CD$CONTROLLERS.findControllerById(canvasId, id);
	if(ctrl) return ctrl.model;
	return null;
};

CD$CONTROLLERS.updateModel = function(canvasId, model){
	if(isEmpty(model) || isEmpty(canvasId) || isEmpty(CD$CONTROLLERS)) return;
	for(var i=0; i<CD$CONTROLLERS.length; i++){
		if(CD$CONTROLLERS[i].id == model.id){
			var ctrl = CD$CONTROLLERS[i];
			ctrl.model = model;
			CD$CONTROLLERS[i].ctrl;
			return;
		}
	}
};

CD$CONTROLLERS.remove = function(canvasId, model){
	if(isEmpty(model) || isEmpty(canvasId) || isEmpty(CD$CONTROLLERS)) return;
	for(var i=0; i<CD$CONTROLLERS.length; i++){
		if(CD$CONTROLLERS[i].id == model.id){
			CD$CONTROLLERS.remove(i);
			if(ContextDiagram.getModelType(model) == CD$TYPE_NODE)
				CD$CONTROLLERS.removeConnectedLines(canvasId, model.id);
			return;
		}
	}
};

CD$CONTROLLERS.removeConnectedLines = function(canvasId, modelId){
	if(isEmpty(modelId) || isEmpty(canvasId) || isEmpty(CD$CONTROLLERS)) return;
	for(var i=0; i<CD$CONTROLLERS.length; i++){
		if(ContextDiagram.getModelType(model) != CD$TYPE_EDGELINE) continue;	
		if(CD$CONTROLLERS[i].fromNodeId == modelId || CD$CONTROLLERS[i].toNodeId == modelId){
			CD$CONTROLLERS.remove(i);
		}
	}
};

ContextDiagram.draw = function(config) {
	var options = {
		mode : CD$MODE_VIEW,
		target : $('<div></div>'),
		jsonDataString : ''
	};
	
	var testData = {
		width : 640,
		height : 240,
		canvasId : ContextDiagram.generateId('CANVAS'),
		mode : CD$MODE_EDIT,
		nodes : [
			{	
				id : '1',
				type: CD$NODE_TYPE_PRODUCT,
				position: {
					top : 200,
					left : 100
				},
				name: '제품 제품 제품 제품 제'
			},
			{
				id : '2',
				type: CD$NODE_TYPE_PROVIDER,
				position: {
					top : 100,
					left : 200
				},
				name: '제공자 제공자 제공자 제공자'
			},
			{
				id : '3',
				type: CD$NODE_TYPE_TOUCHPOINT,
				position: {
					top : 100,
					left : 300
				},
				name: '터치포인트 터치포인트 터치포인트'
			},
			{
				id : '4',
				type: CD$NODE_TYPE_USER,
				position: {
					top : 100,
					left : 400
				},
				name: '수혜자'
			}
		],
		edgeLines : [
			{
				id : '5',
				fromNodeId: '1', 
				toNodeId: '2',
				direction: CD$ARROW_DIR_BOTH,
				lineBreak : null,
				label: '제품에서 제공자'
			},
			{
				id : '6',
				fromNodeId: '2', 
				toNodeId: '3',
				direction: CD$ARROW_DIR_SINGLE,
				lineBreak : null,
				label: '제공자에서 터치포인트'
			},
			{
				id : '7',
				fromNodeId: '4', 
				toNodeId: '1',
				direction: CD$ARROW_DIR_SINGLE,
				lineBreak : {
					align : CD$ARROW_ALIGN_LEFT,
					breaks : 2
				},
				label: '제공자에서 터치포인트'
			},
			{
				id : '8',
				fromNodeId: '3', 
				toNodeId: '4',
				direction: CD$ARROW_DIR_NONE,
				lineBreak : null,
				label: '터치포인트에서 수혜자'
			}
		]
	};
	
	ContextDiagram.extend(options, config);
		
	var data = testData;
	var findNodeFromData = function(nodeId, data){
		if(isEmpty(data) || isEmpty(data.nodes)) return null;
		for(var i=0; i<data.nodes.length; i++)
			if(data.nodes[i].id === nodeId) return data.nodes[i];
		return null;
	};
	
	if(options.mode != CD$MODE_EDIT){
		
		// Draw the Canvas for this Context Diagram and get the context object returned back.
		var context = ContextDiagram.View.Canvas.draw({
			mode : options.mode,
			target : options.target,
			model : {
				width : data.width,
				height : data.height
			}
		});
		
		if(!isEmpty(data.nodes)){
			
			for(var i=0; i<data.nodes.length; i++){
				var node = data.nodes[i];
				ContextDiagram.View.Node.draw({
					mode : options.mode,
					context : context,
					model : {
						type : node.type,
						position : node.position,
						name : node.name,
						selected : false		
					}
				});
			}
			if(!isEmpty(data.edgeLines)){				
				for(var i=0; i<data.edgeLines.length; i++){
					var line = data.edgeLines[i];
					ContextDiagram.View.EdgeLine.draw({
						mode : options.mode,
						context : context,
						model : {
							fromPosition : ContextDiagram.getCenterByNode(findNodeFromData(line.fromNodeId, data)),
							toPosition : ContextDiagram.getCenterByNode(findNodeFromData(line.toNodeId, data)),
							direction : line.direction,
							lineBreak : line.lineBreak,
							label : line.label,
							selected : false
						}
					});
				}
			}
		}		
	}else{
		// Draw the Canvas for this Context Diagram and get the context object returned back.
		var canvasController = null;
		if(data && data.canvasId){
			canvasController = new ContextDiagram.Controller.Canvas(options.mode, 
																	options.target, 
																	{
																		id: data.canvasId,
																		width : data.width,
																		height : data.height
																	});
		}else{
			canvasController = new ContextDiagram.Controller.Canvas(options.mode,
																	options.target,
																	{ 	
																		id: ContextDiagram.generateId('CANVAS'),
																		width : CD$DEFAULT_CANVAS_WIDTH,
																		height : CD$DEFAULT_CANVAS_HEIGHT
																	});
		}
		CD$CONTROLLERS.push(canvasController);
		
		if(!isEmpty(data.nodes)){			
			for(var i=0; i<data.nodes.length; i++){
				CD$CONTROLLERS.push(new ContextDiagram.Controller.Node(canvasController.id, options.mode, canvasController.context, data.nodes[i]));
			}
			if(!isEmpty(data.edgeLines)){				
				for(var i=0; i<data.edgeLines.length; i++){
					CD$CONTROLLERS.push(new ContextDiagram.Controller.EdgeLine(canvasController.id, options.mode, canvasController.context, data.edgeLines[i]));
				}
			}
		}
		
	}
	
	setTimeout(function() {
		CD$CONTROLLERS[1].move({top:10, left:10});
		CD$CONTROLLERS[1].select(true);
		CD$CONTROLLERS[1].select(false);
		CD$CONTROLLERS[5].select(true);
	}, 5000);
		
};

ContextDiagram.redraw = function(canvasId) {
	if(isEmpty(canvasId) || isEmpty(CD$CONTROLLERS)) return;
	var canvasCtrl = CD$CONTROLLERS.findControllerById(canvasId, canvasId);
	if(isEmpty(canvasCtrl)) return;
	canvasCtrl.redraw();
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[contextDiagram script]', null, error);
}