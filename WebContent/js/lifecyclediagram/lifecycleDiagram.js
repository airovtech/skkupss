
try{

LD$TYPE_CANVAS = 'CANVAS';
LD$TYPE_STEP = 'STEP';
LD$TYPE_POINT = 'POINT';
LD$TYPE_CATEGORY = 'CATEGORY';
LD$DEFAULT_CANVAS_WIDTH = 400;
LD$DEFAULT_CANVAS_HEIGHT = 340;
LD$DEFAULT_CIRCLE_RADIUS = LD$DEFAULT_CANVAS_HEIGHT/2/7*5;

LD$TEXT_FONT = '13px sans-serif';
LD$CATEGORY_TEXT_FONT = 'bold 17px sans-serif';
LD$TEXT_FILLSTYLE = 'rgb(205, 205, 205)';
LD$TEXT_LINEHEIGHT = 13;
LD$TEXT_MAXWIDTH = 80;

LD$SELECTED_STYLE = 'black';

LD$MODE_VIEW = 'view';
LD$MODE_EDIT = 'edit';

LifecycleDiagram = function() {
    var Version = '1.0.0';
		
	this.version = function() {
		return Version;
	};
	
    return this;
};

LifecycleDiagram.extend = function(defaults, overide) {
	for(var k in overide) {
		defaults[k] = overide[k];
	};
};

LifecycleDiagram.generateId = function(prefix) {
	return prefix + (new Date()).format("_yymmddHHMMsss");
};

LD$CATEGORIES = [{name: 'Pre', x: LD$DEFAULT_CANVAS_WIDTH/2-LD$DEFAULT_CIRCLE_RADIUS/2, y: LD$DEFAULT_CANVAS_HEIGHT/2-LD$DEFAULT_CIRCLE_RADIUS/2+20}, 
                 {name: 'During', x: LD$DEFAULT_CANVAS_WIDTH/2+LD$DEFAULT_CIRCLE_RADIUS/2, y: LD$DEFAULT_CANVAS_HEIGHT/2}, 
                 {name: 'Post', x: LD$DEFAULT_CANVAS_WIDTH/2-LD$DEFAULT_CIRCLE_RADIUS/2, y: LD$DEFAULT_CANVAS_HEIGHT/2+LD$DEFAULT_CIRCLE_RADIUS/2}];

LD$STEPS = [ {name: 'Design', x: LD$DEFAULT_CANVAS_WIDTH/2-LD$DEFAULT_CIRCLE_RADIUS-30, y: LD$DEFAULT_CANVAS_HEIGHT/2+4}, 
             {name: 'Production', x: LD$DEFAULT_CANVAS_WIDTH/2-LD$DEFAULT_CIRCLE_RADIUS-25, y: LD$DEFAULT_CANVAS_HEIGHT/2-LD$DEFAULT_CIRCLE_RADIUS/3-17},
             {name: 'Sale', x: LD$DEFAULT_CANVAS_WIDTH/2-LD$DEFAULT_CIRCLE_RADIUS/2-30, y: LD$DEFAULT_CANVAS_HEIGHT/2-LD$DEFAULT_CIRCLE_RADIUS/3*2-20},
             {name: 'Delivery', x: LD$DEFAULT_CANVAS_WIDTH/2, y: LD$DEFAULT_CANVAS_HEIGHT/2-LD$DEFAULT_CIRCLE_RADIUS-10},
             {name: 'Installation', x: LD$DEFAULT_CANVAS_WIDTH/2+LD$DEFAULT_CIRCLE_RADIUS/2+50, y: LD$DEFAULT_CANVAS_HEIGHT/2-LD$DEFAULT_CIRCLE_RADIUS/3*2-20},
             {name: 'Use', x: LD$DEFAULT_CANVAS_WIDTH/2+LD$DEFAULT_CIRCLE_RADIUS+5, y: LD$DEFAULT_CANVAS_HEIGHT/2-LD$DEFAULT_CIRCLE_RADIUS/3-17},
             {name: 'Supplement', x: LD$DEFAULT_CANVAS_WIDTH/2+LD$DEFAULT_CIRCLE_RADIUS+45, y: LD$DEFAULT_CANVAS_HEIGHT/2+4},
             {name: 'Maintenance & Repair', x: LD$DEFAULT_CANVAS_WIDTH/2+LD$DEFAULT_CIRCLE_RADIUS+37, y: LD$DEFAULT_CANVAS_HEIGHT/2+LD$DEFAULT_CIRCLE_RADIUS/3+20},
             {name: 'Upgrade', x: LD$DEFAULT_CANVAS_WIDTH/2+LD$DEFAULT_CIRCLE_RADIUS/2+45, y: LD$DEFAULT_CANVAS_HEIGHT/2+LD$DEFAULT_CIRCLE_RADIUS/3*2+30},
             {name: 'Storage', x: LD$DEFAULT_CANVAS_WIDTH/2, y: LD$DEFAULT_CANVAS_HEIGHT/2+LD$DEFAULT_CIRCLE_RADIUS+20},
             {name: 'Recycle', x: LD$DEFAULT_CANVAS_WIDTH/2-LD$DEFAULT_CIRCLE_RADIUS/2-35, y: LD$DEFAULT_CANVAS_HEIGHT/2+LD$DEFAULT_CIRCLE_RADIUS/3*2+30},
             {name: 'Disposal', x: LD$DEFAULT_CANVAS_WIDTH/2-LD$DEFAULT_CIRCLE_RADIUS-20, y: LD$DEFAULT_CANVAS_HEIGHT/2+LD$DEFAULT_CIRCLE_RADIUS/3+25}];
LD$STEP_CATEGORY = [[0, 1, 2, 3], [4, 5, 6, 7, 8, 9], [10, 11]];

LD$DATA = new  Array();

LD$CONTROLLERS = new Array();

LD$CONTROLLERS.findCanvasController = function(canvasId){
	if(isEmpty(canvasId) || isEmpty(LD$CONTROLLERS)) return null;
	for(var i=0; i<LD$CONTROLLERS.length; i++){
		if(LD$CONTROLLERS[i].type == LD$TYPE_CANVAS || LD$CONTROLLERS[I].id == canvasId) return LD$CONTROLLERS[i];
	}
	return null;
};

LD$CONTROLLERS.findControllerByPosition = function(position){
	if(isEmpty(position) || isEmpty(LD$CONTROLLERS)) return null;
	for(var i=0; i<LD$CONTROLLERS.length; i++){
		var ctrl = LD$CONTROLLERS[i];
		if(ctrl.type != LD$TYPE_STEP) 
			continue;
		if(ctrl.nameRect && position.top>=ctrl.nameRect.top&&position.top<=ctrl.nameRect.bottom&&position.left>=ctrl.nameRect.left&&position.left<=ctrl.nameRect.right)
			return ctrl;
		
	}
	return null;
};

LD$CONTROLLERS.updateCategoryModels = function(){
	if(isEmpty(LD$CONTROLLERS)) return;
	for(var i=0; i<LD$CONTROLLERS.length; i++){
		if(LD$CONTROLLERS[i].type != LD$TYPE_CATEGORY) continue;
		var ctrl = LD$CONTROLLERS[i];
		ctrl.model = LifecycleDiagram.Model.Category({
			index: ctrl.index,
			name: LD$CATEGORIES[ctrl.index].name,
			x: LD$CATEGORIES[ctrl.index].x,
			y: LD$CATEGORIES[ctrl.index].y,
			steps: LD$DATA,
			selected: false
		});
		LD$CONTROLLERS[i] = ctrl;
	}
};

LD$CONTROLLERS.updateStepModel = function(model){
	if(isEmpty(model) || isEmpty(LD$CONTROLLERS)) return;
	for(var i=0; i<LD$CONTROLLERS.length; i++){
		if(LD$CONTROLLERS[i].type != LD$TYPE_STEP) continue;
		if(LD$CONTROLLERS[i].index == model.index){
			var ctrl = LD$CONTROLLERS[i];
			ctrl.model = model;
			LD$CONTROLLERS[i] = ctrl;
			return;
		}
	}
};

LifecycleDiagram.wrapText= function(context, text, x, y, maxWidth, lineHeight) {
	var words = text.split(' ');
	var line = '';
	var lines = 0;
	var oy = y;
	for(var n = 0; n < words.length; n++) {
	  var testLine = line + words[n] + ' ';
	  var metrics = context.measureText(testLine);
	  var testWidth = metrics.width;
	  if (testWidth > maxWidth && n > 0) {
	    context.fillText(line, x, y);
	    lines++;
	    line = words[n] + ' ';
	    y += lineHeight;
	  }
	  else {
	    line = testLine;
	  }
	}
	context.fillText(line, x, y);
	lines++;
	var width = (lines==1)?context.measureText(line).width : maxWidth; 
	return {top: oy-lineHeight, left: x-width/2, right: x+width/2, bottom: oy + lineHeight*(lines-1)};
};

LifecycleDiagram.draw = function(config) {
	var options = {
		mode : LD$MODE_VIEW,
		target : $('<div></div>'),
		jsonDataString : '',
		reload : false
	};
	
	LifecycleDiagram.extend(options, config);
		
	var data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	try{
		if(!isEmpty(options.jsonDataString)){
			for(var i=0; i<options.jsonDataString.length; i++){
				data[i] = parseInt(options.jsonDataString.substring(i, i+1));
			}
		}
	}catch(e){}
	
	if(options.mode != LD$MODE_EDIT){
		
		// Draw the Canvas for this Lifecycle Diagram and get the context object returned back.
		var context = LifecycleDiagram.View.Canvas.draw({
			mode : options.mode,
			target : options.target,
			model : {
				width : LD$DEFAULT_CANVAS_WIDTH,
				height : LD$DEFAULT_CANVAS_HEIGHT,
				mode : options.mode
			}
		});
		
		for(var i=0; i<LD$CATEGORIES.length; i++){
			LD$CONTROLLERS.push(new LifecycleDiagram.Controller.Category(options.mode, context, i, data));
		}

		for(var i=0; i<LD$STEPS.length; i++){
			LD$CONTROLLERS.push(new LifecycleDiagram.Controller.Step(options.mode, context, i, data[i]==1));
		}
		LD$CONTROLLERS = new Array();
		
	}else{
		
		var canvas = null;

		for(var i=0; i<LD$STEPS.length; i++)
			LD$DATA.push(0);

		if(!isEmpty(LD$CONTROLLERS)){
			
			for(var i=0; i<LD$CONTROLLERS.length; i++){
				var ctrl = LD$CONTROLLERS[i];
				var model = ctrl.model;
				if(model.type == LD$TYPE_STEP){
					LD$DATA[model.index] = model.selected?1:0;
				}else if(model.type == LD$TYPE_CANVAS){
					canvas = model;
				}
			}
			LD$CONTROLLERS.splice(0, LD$CONTROLLERS.length);
		}else{
			LD$DATA = data;
		}
		
		// Draw the Canvas for this Lifecycle Diagram and get the context object returned back.
		var canvasController = null;
		if(LD$DATA && canvas){
			canvasController = new LifecycleDiagram.Controller.Canvas(options.mode, options.target, canvas.id);
		}else{
			canvasController = new LifecycleDiagram.Controller.Canvas(options.mode, options.target, LifecycleDiagram.generateId('CANVAS'));
		}
		LD$CONTROLLERS.push(canvasController);
		
		if(!isEmpty(data)){
			for(var i=0; i<LD$CATEGORIES.length; i++){
				LD$CONTROLLERS.push(new LifecycleDiagram.Controller.Category(options.mode, canvasController.context, i, LD$DATA));
			}

			for(var i=0; i<LD$STEPS.length; i++){
				LD$CONTROLLERS.push(new LifecycleDiagram.Controller.Step(options.mode, canvasController.context, i, LD$DATA[i]==1));
			}
		}
		
	}		
};

LifecycleDiagram.redraw = function(canvasId) {
	if(isEmpty(canvasId) || isEmpty(LD$CONTROLLERS)) return;
	var canvasCtrl = LD$CONTROLLERS.findControllerById(canvasId, canvasId);
	if(isEmpty(canvasCtrl)) return;
	canvasCtrl.redraw();
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[lifecycleDiagram script]', null, error);
}