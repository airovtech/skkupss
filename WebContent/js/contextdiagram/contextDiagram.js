
try{

CD$TYPE_CANVAS = 'CANVAS';
CD$TYPE_NODE = 'NODE';
CD$TYPE_EDGELINE = 'LINE';
CD$DEFAULT_CANVAS_WIDTH = 640;
CD$DEFAULT_CANVAS_HEIGHT = 340;

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

ContextDiagram.getCenterByNode = function(nodeModel){
	if(isEmpty(nodeModel)) return {top:0, left:0};
	
	var nodeSize = (nodeModel.type==CD$NODE_TYPE_TOUCHPOINT)?CD$NODE_SIZE_SMALL:CD$NODE_SIZE_NORMAL;
	return {top:nodeModel.position.top+((nodeModel.type==CD$NODE_TYPE_PROVIDER)?nodeSize*(Math.sqrt(3)/2):nodeSize)/2, left:nodeModel.position.left+nodeSize/2};
	
};

ContextDiagram.getModelType = function(model){
	if(isEmpty(model) || isEmpty(model.id)) return null;
	if(model.id.indexOf(CD$TYPE_CANVAS)>-1) return CD$TYPE_CANVAS;
	if(model.id.indexOf(CD$TYPE_NODE)>-1) return CD$TYPE_NODE;
	if(model.id.indexOf(CD$TYPE_EDGELINE)>-1) return CD$TYPE_EDGELINE;
	return null;
};

CD$EDGE_TYPE_ALL = 0;
CD$EDGE_TYPE_FROM_ONLY=1;
CD$EDGE_TYPE_TO_ONLY=2;
CD$EDGE_TYPE_NONE=3;

ContextDiagram.arrowLine = function(ctx,p1,p2,size, dir, lineBreak, edgeType){
	ctx.save();
	
	if(edgeType==null) edgeType = CD$EDGE_TYPE_ALL;
	if(!isEmpty(lineBreak) && lineBreak.align!=CD$ARROW_ALIGN_CENTER){
		var breakHeight = lineBreak.level || 50;
  		var dx = p2.x-p1.x, dy=p2.y-p1.y, len=Math.sqrt(dx*dx+dy*dy);
  		var tx,ty, tx2, ty2;
  		var align = (lineBreak.align==CD$ARROW_ALIGN_LEFT)?-1:1;
  		var reversed = dy<0?1:-1;
  		if(lineBreak.breaks==1){
	  		if(dx==0){
	  			tx = p1.x+breakHeight*align*reversed;
	  			ty = p1.y+dy/2;
	  		}else{
	  			var tmpx = p1.x+dx/2, tmpy=p1.y+dy/2;
	  			var ta = dx/2, tb = dy/2, tc = len/2, tangle=Math.acos((ta*ta+tc*tc-tb*tb)/(2*ta*tc)), tmpdy=breakHeight*Math.cos(tangle), tmpdx=Math.sqrt(breakHeight*breakHeight-tmpdy*tmpdy);
	  			tx = tmpx+(dy>0?-tmpdx:tmpdx)*align;
	  			ty = tmpy+tmpdy*align;
	  		}
  		}else if(lineBreak.breaks==2){
	  		if(dx==0){
	  			tx = tx2 = p1.x+breakHeight*align*reversed;
	  			ty = p1.y+dy/4;
	  			ty2 = p1.y+dy/4*3;
	  		}else{
	  			var tmpx = p1.x+dx/4, tmpy=p1.y+dy/4;
	  			var tmpx2 = p1.x+dx/4*3, tmpy2=p1.y+dy/4*3;
	  			var ta = dx/2, tb = dy/2, tc = len/2, tangle=Math.acos((ta*ta+tc*tc-tb*tb)/(2*ta*tc)), tmpdy=breakHeight*Math.cos(tangle), tmpdx=Math.sqrt(breakHeight*breakHeight-tmpdy*tmpdy);
	  			tx = tmpx+(dy>0?-tmpdx:tmpdx)*align;
	  			ty = tmpy+tmpdy*align;
	  			tx2 = tmpx2+(dy>0?-tmpdx:tmpdx)*align;
	  			ty2 = tmpy2+tmpdy*align;
	  		}
  		}
  		var breakPosition = {x:tx|0, y:ty|0};
  		var breakPosition2 = {x:tx2|0, y:ty2|0};
  		
  		if(dir==CD$ARROW_DIR_BOTH){
  			ContextDiagram.arrowLine(ctx, breakPosition, p1, size, CD$ARROW_DIR_SINGLE, null, CD$EDGE_TYPE_TO_ONLY);
  			if(lineBreak.breaks==1){
  				ContextDiagram.arrowLine(ctx, breakPosition, p2, size, CD$ARROW_DIR_SINGLE, null, CD$EDGE_TYPE_TO_ONLY);
  			}else if(lineBreak.breaks==2){
  				ContextDiagram.arrowLine(ctx, breakPosition, breakPosition2, size, CD$ARROW_DIR_NONE, null, CD$EDGE_TYPE_NONE);
  				ContextDiagram.arrowLine(ctx, breakPosition2, p2, size, CD$ARROW_DIR_SINGLE, null, CD$EDGE_TYPE_TO_ONLY);
  			}
  		}else{
  			ContextDiagram.arrowLine(ctx, p1, breakPosition, size, CD$ARROW_DIR_NONE, null, CD$EDGE_TYPE_FROM_ONLY);
  			if(lineBreak.breaks==1){
  				ContextDiagram.arrowLine(ctx, breakPosition, p2, size, dir, null, CD$EDGE_TYPE_TO_ONLY);
  			}else if(lineBreak.breaks==2){
  				ContextDiagram.arrowLine(ctx, breakPosition, breakPosition2, size, CD$ARROW_DIR_NONE, null, CD$EDGE_TYPE_NONE);
  				ContextDiagram.arrowLine(ctx, breakPosition2, p2, size, dir, null, CD$EDGE_TYPE_TO_ONLY);
  			}
  		}
  		return;
	}
 	var points = ContextDiagram.findEdges(ctx,p1,p2);
  	if(edgeType==CD$EDGE_TYPE_FROM_ONLY || edgeType==CD$EDGE_TYPE_ALL){
  		if(isEmpty(points) || points.length<1) return;
  		p1=points[0];
  	}
  	if(edgeType==CD$EDGE_TYPE_TO_ONLY || edgeType==CD$EDGE_TYPE_ALL){
		points = ContextDiagram.findEdges(ctx,p2,p1);
		if(isEmpty(points) || points.length<1) return;
  		p2=points[0];
  	}

  	// Rotate the context to point along the path
  	var dx = p2.x-p1.x, dy=p2.y-p1.y, len=Math.sqrt(dx*dx+dy*dy);
  	var margin = 20;
 	ctx.translate(p2.x,p2.y);
  	ctx.rotate(Math.atan2(dy,dx));

	var fromMargin = (edgeType==CD$EDGE_TYPE_FROM_ONLY||edgeType==CD$EDGE_TYPE_ALL)?margin:0;
	var toMargin = (edgeType==CD$EDGE_TYPE_TO_ONLY||edgeType==CD$EDGE_TYPE_ALL)?margin:0;
  	if(dir==CD$ARROW_DIR_BOTH){
      	// arrowhead
      	ctx.beginPath();
     	ctx.moveTo(-len+fromMargin,0);
      	ctx.lineTo(size-len+fromMargin,-size/2);
      	ctx.lineTo(size-len+fromMargin, size/2);
      	ctx.closePath();
      	ctx.fill();
  	}

  	// line
  	ctx.lineCap = 'round';
  	ctx.beginPath();
  	ctx.moveTo(0-toMargin,0);
  	ctx.lineTo(-len+fromMargin,0);
  	ctx.closePath();
  	ctx.stroke();

  	if(dir!=CD$ARROW_DIR_NONE){
      	// arrowhead
      	ctx.beginPath();
     	ctx.moveTo(0-toMargin,0);
      	ctx.lineTo(-size-toMargin,-size/2);
      	ctx.lineTo(-size-toMargin, size/2);
      	ctx.closePath();
      	ctx.fill();
  	}

  	ctx.restore();
};
    
ContextDiagram.isPointOnLine = function(ctx,p1,p2,size, dir, lineBreak, edgeType, point){
	ctx.save();
	
	if(edgeType==null) edgeType = CD$EDGE_TYPE_ALL;
	if(!isEmpty(lineBreak) && lineBreak.align!=CD$ARROW_ALIGN_CENTER){
		var breakHeight = lineBreak.level || 50;
  		var dx = p2.x-p1.x, dy=p2.y-p1.y, len=Math.sqrt(dx*dx+dy*dy);
  		var tx,ty, tx2, ty2;
  		var align = (lineBreak.align==CD$ARROW_ALIGN_LEFT)?-1:1;
  		var reversed = dy<0?1:-1;
  		if(lineBreak.breaks==1){
	  		if(dx==0){
	  			tx = p1.x+breakHeight*align*reversed;
	  			ty = p1.y+dy/2;
	  		}else{
	  			var tmpx = p1.x+dx/2, tmpy=p1.y+dy/2;
	  			var ta = dx/2, tb = dy/2, tc = len/2, tangle=Math.acos((ta*ta+tc*tc-tb*tb)/(2*ta*tc)), tmpdy=breakHeight*Math.cos(tangle), tmpdx=Math.sqrt(breakHeight*breakHeight-tmpdy*tmpdy);
	  			tx = tmpx+(dy>0?-tmpdx:tmpdx)*align;
	  			ty = tmpy+tmpdy*align;
	  		}
  		}else if(lineBreak.breaks==2){
	  		if(dx==0){
	  			tx = tx2 = p1.x+breakHeight*align*reversed;
	  			ty = p1.y+dy/4;
	  			ty2 = p1.y+dy/4*3;
	  		}else{
	  			var tmpx = p1.x+dx/4, tmpy=p1.y+dy/4;
	  			var tmpx2 = p1.x+dx/4*3, tmpy2=p1.y+dy/4*3;
	  			var ta = dx/2, tb = dy/2, tc = len/2, tangle=Math.acos((ta*ta+tc*tc-tb*tb)/(2*ta*tc)), tmpdy=breakHeight*Math.cos(tangle), tmpdx=Math.sqrt(breakHeight*breakHeight-tmpdy*tmpdy);
	  			tx = tmpx+(dy>0?-tmpdx:tmpdx)*align;
	  			ty = tmpy+tmpdy*align;
	  			tx2 = tmpx2+(dy>0?-tmpdx:tmpdx)*align;
	  			ty2 = tmpy2+tmpdy*align;
	  		}
  		}
  		var breakPosition = {x:tx|0, y:ty|0};
  		var breakPosition2 = {x:tx2|0, y:ty2|0};
  		
  		if(dir==CD$ARROW_DIR_BOTH){
  			if(ContextDiagram.isPointOnLine(ctx, breakPosition, p1, size, CD$ARROW_DIR_SINGLE, null, CD$EDGE_TYPE_TO_ONLY, point))
  				return true;
  			if(lineBreak.breaks==1){
  				if(ContextDiagram.isPointOnLine(ctx, breakPosition, p2, size, CD$ARROW_DIR_SINGLE, null, CD$EDGE_TYPE_TO_ONLY, point))
  					return true;
  			}else if(lineBreak.breaks==2){
  				if(ContextDiagram.isPointOnLine(ctx, breakPosition, breakPosition2, size, CD$ARROW_DIR_NONE, null, CD$EDGE_TYPE_NONE, point))
  					return true;
  				if(ContextDiagram.isPointOnLine(ctx, breakPosition2, p2, size, CD$ARROW_DIR_SINGLE, null, CD$EDGE_TYPE_TO_ONLY, point))
  					return true;
  			}
  		}else{
  			if(ContextDiagram.isPointOnLine(ctx, p1, breakPosition, size, CD$ARROW_DIR_NONE, null, CD$EDGE_TYPE_FROM_ONLY, point))
  				return true;
  			if(lineBreak.breaks==1){
  				if(ContextDiagram.isPointOnLine(ctx, breakPosition, p2, size, dir, null, CD$EDGE_TYPE_TO_ONLY, point))
  					return true;
  			}else if(lineBreak.breaks==2){
  				if(ContextDiagram.isPointOnLine(ctx, breakPosition, breakPosition2, size, CD$ARROW_DIR_NONE, null, CD$EDGE_TYPE_NONE, point))
  					return true;
  				if(ContextDiagram.isPointOnLine(ctx, breakPosition2, p2, size, dir, null, CD$EDGE_TYPE_TO_ONLY, point))
  					return true;
  			}
  		}
  		return;
	}
 	var points = ContextDiagram.findEdges(ctx,p1,p2);
  	if(edgeType==CD$EDGE_TYPE_FROM_ONLY || edgeType==CD$EDGE_TYPE_ALL){
  		if(isEmpty(points) || points.length<1) return;
  		p1=points[0];
  	}
  	if(edgeType==CD$EDGE_TYPE_TO_ONLY || edgeType==CD$EDGE_TYPE_ALL){
		points = ContextDiagram.findEdges(ctx,p2,p1);
		if(isEmpty(points) || points.length<1) return;
  		p2=points[0];
  	}

  	// Rotate the context to point along the path
  	var dx = p2.x-p1.x, dy=p2.y-p1.y, len=Math.sqrt(dx*dx+dy*dy);
  	var margin = 20;
 	ctx.translate(p2.x,p2.y);
  	ctx.rotate(Math.atan2(dy,dx));

	var fromMargin = (edgeType==CD$EDGE_TYPE_FROM_ONLY||edgeType==CD$EDGE_TYPE_ALL)?margin:0;
	var toMargin = (edgeType==CD$EDGE_TYPE_TO_ONLY||edgeType==CD$EDGE_TYPE_ALL)?margin:0;

	// line
  	ctx.lineCap = 'round';
  	ctx.beginPath();
  	ctx.moveTo(0-toMargin,4);
  	ctx.lineTo(0-toMargin,-4);
  	ctx.lineTo(-len+fromMargin,-4);
  	ctx.lineTo(-len+fromMargin,4);
  	ctx.moveTo(0-toMargin,2);
	if(ctx.isPointInPath(point.left, point.top)){
		ctx.restore();
		return true;
	}
  	ctx.restore();
  	return false;
};
    
ContextDiagram.textOnArrowLine = function(ctx,p1,p2,size, dir, lineBreak, edgeType, text, selected){
	if(!text) return null;
	ctx.save();

	var reversed = 1;
	if(p1.x>p2.x){
		var tp = p1;
		p1 = p2;
		p2 = tp;
		reversed = -1;
	}
	
	if(edgeType==null) edgeType = CD$EDGE_TYPE_ALL;
 	var points = ContextDiagram.findEdges(ctx,p1,p2);
  	if(edgeType==CD$EDGE_TYPE_FROM_ONLY || edgeType==CD$EDGE_TYPE_ALL){
  		if(isEmpty(points) || points.length<1) return;
  		p1=points[0];
  	}
  	if(edgeType==CD$EDGE_TYPE_TO_ONLY || edgeType==CD$EDGE_TYPE_ALL){
		points = ContextDiagram.findEdges(ctx,p2,p1);
		if(isEmpty(points) || points.length<1) return;
  		p2=points[0];
  	}

  	// Rotate the context to point along the path
  	var dx = p2.x-p1.x, dy=p2.y-p1.y, len=Math.sqrt(dx*dx+dy*dy);
  	var margin = 20;
 	ctx.translate(p2.x,p2.y);
  	ctx.rotate(Math.atan2(dy,dx));
  	
	ctx.font = CD$TEXT_FONT;
	ctx.fillStyle = selected?CD$SELECTED_STYLE:CD$TEXT_FILLSTYLE;
	ctx.textAlign = 'center';
	var breakHeight = (!isEmpty(lineBreak) && lineBreak.align!=CD$ARROW_ALIGN_CENTER)?lineBreak.level||50:0;
	var targetY = (!lineBreak || lineBreak.align == CD$ARROW_ALIGN_CENTER) ? 14 : 14 + breakHeight*reversed*(lineBreak.align==CD$ARROW_ALIGN_LEFT?-1:1);
	var textRect = ContextDiagram.wrapText(ctx, text, -len/2, targetY, CD$TEXT_MAXWIDTH, CD$TEXT_LINEHEIGHT);
  	ctx.restore();

	if(edgeType==null) edgeType = CD$EDGE_TYPE_ALL;
	var textHeight = textRect.bottom-textRect.top, textWidth = textRect.right-textRect.left;
	var dx = p2.x-p1.x, dy=p2.y-p1.y, len=Math.sqrt(dx*dx+dy*dy);
	var tTop, tLeft, tBottom, tRight;
	var align = (!isEmpty(lineBreak) && lineBreak.align==CD$ARROW_ALIGN_LEFT)?-1:1;
	if(dx==0){
  		reversed = dy<0?1:-1;
		tLeft = p1.x+breakHeight*align*reversed-(reversed==1?0:textHeight);
		tRight = p1.x+breakHeight*align*reversed+(reversed==1?textHeight:0);
		tTop = p1.y+dy/2-textWidth/2;
		tBottom = p1.y+dy/2+textWidth/2;
		return {top:tTop, left:tLeft, bottom:tBottom, right:tRight};
	}else{
		var reversedx = dx>0?1:-1, reversedy = dy>0?-1:1;
		var tmpx = p1.x+dx/2, tmpy=p1.y+dy/2;
		var ta = dx/2, tb = dy/2, tc = len/2, tangle=Math.acos((ta*ta+tc*tc-tb*tb)/(2*ta*tc));
		var tmpdy1=(breakHeight)*Math.cos(tangle), tmpdx1=Math.sqrt((breakHeight)*(breakHeight)-tmpdy1*tmpdy1);
		var tmpdy2=(breakHeight+textHeight*align*reversed)*Math.cos(tangle), tmpdx2=Math.sqrt((breakHeight+textHeight*align*reversed)*(breakHeight+textHeight*align*reversed)-tmpdy2*tmpdy2);
		var delx=(textWidth/2)*Math.cos(tangle), dely=Math.sqrt((textWidth/2)*(textWidth/2)-delx*delx);
		if(reversed && (isEmpty(lineBreak) || lineBreak.align==CD$ARROW_ALIGN_CENTER)){
			var tx1 = tmpx+(reversed*reversedy*tmpdx1*align-delx);
			var ty1 = tmpy+(reversed*tmpdy1*align+reversedy*dely);
			var tx2 = tmpx+(reversedy*tmpdx2*align-delx);
			var ty2 = tmpy+(reversed*tmpdy2*align+reversedy*dely);
			var tx3 = tmpx+(reversed*reversedy*tmpdx1*align+delx);
			var ty3 = tmpy+(reversed*tmpdy1*align-reversedy*dely);
			var tx4 = tmpx+(reversedy*tmpdx2*align+delx);
			var ty4 = tmpy+(reversed*tmpdy2*align-reversedy*dely);
			return [{x:tx1, y:ty1}, {x:tx2, y:ty2}, {x:tx4, y:ty4}, {x:tx3, y:ty3}];
		}else{
			var tx1 = tmpx+(reversed*reversedy*tmpdx1*align-delx);
			var ty1 = tmpy+(reversed*tmpdy1*align+reversedy*dely);
			var tx2 = tmpx+(reversed*reversedy*tmpdx2*align-delx);
			var ty2 = tmpy+(reversed*tmpdy2*align+reversedy*dely);
			var tx3 = tmpx+(reversed*reversedy*tmpdx1*align+delx);
			var ty3 = tmpy+(reversed*tmpdy1*align-reversedy*dely);
			var tx4 = tmpx+(reversed*reversedy*tmpdx2*align+delx);
			var ty4 = tmpy+(reversed*tmpdy2*align-reversedy*dely);
			return [{x:tx1, y:ty1}, {x:tx2, y:ty2}, {x:tx4, y:ty4}, {x:tx3, y:ty3}];
		}
	}
};
    
    // Find all transparent/opaque transitions between two points
    // Uses http://en.wikipedia.org/wiki/Bresenham's_line_algorithm
ContextDiagram.findEdges = function(ctx,p1,p2,cutoff){
  	if (!cutoff) cutoff = 220; // alpha threshold
  	var dx = Math.abs(p2.x - p1.x), dy = Math.abs(p2.y - p1.y),
      	sx = p2.x > p1.x ? 1 : -1,  sy = p2.y > p1.y ? 1 : -1;
  	var x0 = Math.min(p1.x,p2.x), y0=Math.min(p1.y,p2.y);
	var pixels = ctx.getImageData(x0,y0,dx+1,dy+1).data;
	var hits=[], over=null;
 	 
  	for (x=p1.x,y=p1.y,e=dx-dy; x!=p2.x||y!=p2.y;){
    	var alpha = pixels[((y-y0)*(dx+1)+x-x0)*4 + 3];
    	if (over!=null && (over ? alpha<cutoff : alpha>=cutoff)){
      		hits.push({x:x,y:y});
    	}
    	var e2 = 2*e;
		if (e2 > -dy){ e-=dy; x+=sx; }
		if (e2 <  dx){ e+=dx; y+=sy;  }
		over = alpha>=cutoff;
  	}
  	return hits;
};

CD$CONTROLLERS = new Array();
CD$CONTROLLERS.isEditing = false;

CD$CONTROLLERS.findControllerById = function(canvasId, id){
	if(isEmpty(canvasId) || isEmpty(id) || isEmpty(CD$CONTROLLERS)) return null;
	for(var i=0; i<CD$CONTROLLERS.length; i++){
		if(CD$CONTROLLERS[i].id == id) return CD$CONTROLLERS[i];
	}
	return null;
};

CD$CONTROLLERS.findControllerByPosition = function(canvasId, position){
	if(isEmpty(canvasId) || isEmpty(position) || isEmpty(CD$CONTROLLERS)) return null;
	for(var i=0; i<CD$CONTROLLERS.length; i++){
		var ctrl = CD$CONTROLLERS[i];
		if(ContextDiagram.getModelType(ctrl.model) == CD$TYPE_NODE){
			var size = ctrl.model.type===CD$NODE_TYPE_TOUCHPOINT?CD$NODE_SIZE_SMALL:CD$NODE_SIZE_NORMAL;
			var top=ctrl.model.position.top, bottom=top+size, left=ctrl.model.position.left, right=left+size;
			if(position.top>=top&&position.top<=bottom&&position.left>=left&&position.left<=right)
				return ctrl;
			if(ctrl.nameRect && position.top>=ctrl.nameRect.top&&position.top<=ctrl.nameRect.bottom&&position.left>=ctrl.nameRect.left&&position.left<=ctrl.nameRect.right)
				return ctrl;
		}else if(ContextDiagram.getModelType(ctrl.model) == CD$TYPE_EDGELINE){
			var model = ctrl.model;
			var context = ctrl.context;
			if(!isEmpty(model.fromNodeId))
				model.fromPosition = ContextDiagram.getCenterByNode(CD$CONTROLLERS.findModelById(canvasId, model.fromNodeId));
			if(!model.isLining && !isEmpty(model.toNodeId))
				model.toPosition = ContextDiagram.getCenterByNode(CD$CONTROLLERS.findModelById(canvasId, model.toNodeId));

			if(ContextDiagram.isPointOnLine(context, 
	    		{x:model.fromPosition.left|0, y:model.fromPosition.top|0}, 
	    		{x:model.toPosition.left|0, y:model.toPosition.top|0}, 
	    		null, 
	    		model.direction,
	    		model.lineBreak,
	    		model.isLining?CD$EDGE_TYPE_FROM_ONLY:null,
	    		position
	    	))
				return ctrl;
			if(ctrl.labelRect instanceof Array && ctrl.labelRect.length==4){
				context.save();
				context.beginPath();
				context.moveTo(ctrl.labelRect[0].x, ctrl.labelRect[0].y);
				context.lineTo(ctrl.labelRect[1].x, ctrl.labelRect[1].y);
				context.lineTo(ctrl.labelRect[2].x, ctrl.labelRect[2].y);
				context.lineTo(ctrl.labelRect[3].x, ctrl.labelRect[3].y);
				context.lineTo(ctrl.labelRect[0].x, ctrl.labelRect[0].y);
				if(context.isPointInPath(position.left, position.top)){
					context.restore();
					return ctrl;
				}				
				context.restore();
			}else if(ctrl.labelRect && position.top>=ctrl.labelRect.top&&position.top<=ctrl.labelRect.bottom&&position.left>=ctrl.labelRect.left&&position.left<=ctrl.labelRect.right)
				return ctrl;

		}
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

CD$CONTROLLERS.removeController = function(canvasId, model){
	if(isEmpty(model) || isEmpty(canvasId) || isEmpty(CD$CONTROLLERS)) return;
	for(var i=0; i<CD$CONTROLLERS.length; i++){
		if(CD$CONTROLLERS[i].id == model.id){
			CD$CONTROLLERS.splice(i, 1);
			if(ContextDiagram.getModelType(model) == CD$TYPE_NODE)
				CD$CONTROLLERS.removeConnectedLines(canvasId, model.id);
			return;
		}
	}
};

CD$CONTROLLERS.removeConnectedLines = function(canvasId, modelId){
	if(isEmpty(modelId) || isEmpty(canvasId) || isEmpty(CD$CONTROLLERS)) return;
	for(var i=0; i<CD$CONTROLLERS.length; i++){
		if(ContextDiagram.getModelType(CD$CONTROLLERS[i].model) != CD$TYPE_EDGELINE) continue;	
		if(CD$CONTROLLERS[i].model.fromNodeId === modelId || CD$CONTROLLERS[i].model.toNodeId === modelId){
			CD$CONTROLLERS.splice(i, 1);
		}
	}
};

CD$TOOL_NONE = 0;
CD$TOOL_NODE_PRODUCT = 11;
CD$TOOL_NODE_PROVIDER = 12;
CD$TOOL_NODE_TOUCHPOINT = 13;
CD$TOOL_NODE_USER = 14;

CD$TOOL_EDGELINE = 21;


ContextDiagram.draw = function(config) {
	var options = {
		mode : CD$MODE_VIEW,
		target : $('<div></div>'),
		jsonDataString : '',
		reload : false
	};
	
	var testData = {
		width : 640,
		height : 340,
		canvasId : ContextDiagram.generateId('CANVAS'),
		nodes : [
			{	
				id : 'NODE1',
				type: CD$NODE_TYPE_PRODUCT,
				position: {
					top : 200,
					left : 100
				},
				name: '제품 제품 제품 제품 제품'
			},
			{
				id : 'NODE2',
				type: CD$NODE_TYPE_PROVIDER,
				position: {
					top : 100,
					left : 200
				},
				name: '제공자 제공자 제공자 제공자'
			},
			{
				id : 'NODE3',
				type: CD$NODE_TYPE_TOUCHPOINT,
				position: {
					top : 100,
					left : 300
				},
				name: '터치포인트 터치포인트 터치포인트'
			},
			{
				id : 'NODE4',
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
				id : 'LINE5',
				fromNodeId: 'NODE1', 
				toNodeId: 'NODE2',
				direction: CD$ARROW_DIR_BOTH,
				lineBreak : null,
				label: '제품에서 제공자'
			},
			{
				id : 'LINE6',
				fromNodeId: 'NODE2', 
				toNodeId: 'NODE3',
				direction: CD$ARROW_DIR_SINGLE,
				lineBreak : null,
				label: '제공자에서 터치포인트'
			},
			{
				id : 'LINE7',
				fromNodeId: 'NODE4', 
				toNodeId: 'NODE1',
				direction: CD$ARROW_DIR_SINGLE,
				lineBreak : {
					align : CD$ARROW_ALIGN_LEFT,
					breaks : 2
				},
				label: '제공자에서 터치포인트'
			},
			{
				id : 'LINE8',
				fromNodeId: 'NODE3', 
				toNodeId: 'NODE4',
				direction: CD$ARROW_DIR_NONE,
				lineBreak : null,
				label: '터치포인트에서 수혜자'
			}
		]
	};
	
	ContextDiagram.extend(options, config);
		
	var findNodeFromData = function(nodeId, data){
		if(isEmpty(data) || isEmpty(data.nodes)) return null;
		for(var i=0; i<data.nodes.length; i++)
			if(data.nodes[i].id === nodeId) return data.nodes[i];
		return null;
	};
	
	var data = {width:CD$DEFAULT_CANVAS_WIDTH, height:CD$DEFAULT_CANVAS_HEIGHT};
	try{
		if(!isEmpty(options.jsonDataString))
			data = eval('('+options.jsonDataString+')');
	}catch(e){}
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
		
		if(!isEmpty(CD$CONTROLLERS)){
			var canvas = {};
			var nodes = new Array();
			var edgeLines = new Array();
			for(var i=0; i<CD$CONTROLLERS.length; i++){
				var ctrl = CD$CONTROLLERS[i];
				var model = ctrl.model;
				switch(ContextDiagram.getModelType(model)){
				case CD$TYPE_CANVAS :
					canvas =  model;
					break;
				case CD$TYPE_NODE :
					nodes.push(model);
					break;
				case CD$TYPE_EDGELINE :
					edgeLines.push(model);
					break;
				}
			}
			data = {
					canvasId : canvas.id,
					width : canvas.width,
					height : canvas.height,
					nodes : nodes,
					edgeLines : edgeLines
			};
			CD$CONTROLLERS.splice(0, CD$CONTROLLERS.length);
		}
		
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