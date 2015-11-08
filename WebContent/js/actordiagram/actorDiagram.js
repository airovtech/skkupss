
try{

AD$TYPE_CANVAS = 'CANVAS';
AD$TYPE_NODE = 'NODE';
AD$TYPE_EDGELINE = 'LINE';
AD$DEFAULT_CANVAS_WIDTH = 640;
AD$DEFAULT_CANVAS_HEIGHT = 340;

//AD$TEXT_FONT = '12px dotum,Helvetica,sans-serif';
AD$TEXT_FONT = '11px sans-serif';
AD$TEXT_FILLSTYLE = 'black';
AD$TEXT_MAXWIDTH = 70;
AD$TEXT_LINEHEIGHT = 14;

AD$SELECTED_STYLE = 'red';

AD$NODE_TYPE_PRODUCT = 'product';
AD$NODE_TYPE_PROVIDER = 'provider';
AD$NODE_TYPE_TOUCHPOINT = 'touchPoint';
AD$NODE_TYPE_USER = 'user';

AD$NODE_SIZE_NORMAL = 30;
AD$NODE_SIZE_SMALL = 15;

AD$MODE_VIEW = 'view';
AD$MODE_EDIT = 'edit';

AD$ARROW_DIR_NONE = 0;
AD$ARROW_DIR_SINGLE = 1;
AD$ARROW_DIR_BOTH = 2;

AD$ARROW_ALIGN_CENTER = 0;
AD$ARROW_ALIGN_LEFT = 1;
AD$ARROW_ALIGN_RIGHT = 2;

ActorDiagram = function() {
    var Version = '1.0.0';
		
	this.version = function() {
		return Version;
	};
	
    return this;
};

ActorDiagram.extend = function(defaults, overide) {
	for(var k in overide) {
		defaults[k] = overide[k];
	};
};

ActorDiagram.generateId = function(prefix) {
	return prefix + (new Date()).format("_yymmddHHMMsss");
};

ActorDiagram.wrapText= function(context, text, x, y, maxWidth, lineHeight) {
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

ActorDiagram.getCenterByNode = function(nodeModel){
	if(isEmpty(nodeModel)) return {top:0, left:0};
	
	var nodeSize = (nodeModel.type==AD$NODE_TYPE_TOUCHPOINT)?AD$NODE_SIZE_SMALL:AD$NODE_SIZE_NORMAL;
	return {top:nodeModel.position.top+((nodeModel.type==AD$NODE_TYPE_PROVIDER)?nodeSize*(Math.sqrt(3)/2):nodeSize)/2, left:nodeModel.position.left+nodeSize/2};
	
};

ActorDiagram.getModelType = function(model){
	if(isEmpty(model) || isEmpty(model.id)) return null;
	if(model.id.indexOf(AD$TYPE_CANVAS)>-1) return AD$TYPE_CANVAS;
	if(model.id.indexOf(AD$TYPE_NODE)>-1) return AD$TYPE_NODE;
	if(model.id.indexOf(AD$TYPE_EDGELINE)>-1) return AD$TYPE_EDGELINE;
	return null;
};

AD$EDGE_TYPE_ALL = 0;
AD$EDGE_TYPE_FROM_ONLY=1;
AD$EDGE_TYPE_TO_ONLY=2;
AD$EDGE_TYPE_NONE=3;

ActorDiagram.arrowLine = function(ctx,p1,p2,size, dir, lineBreak, edgeType){
	ctx.save();
	
	if(p1.x == p2.x && p1.y == p2.y){
  		ctx.beginPath();
		ctx.arc(p1.x, p1.y-(35), 10, 0.7*Math.PI, 0.25*Math.PI);
		ctx.stroke();
		
		var x = p1.x, y = p1.y-35, dx = dy = Math.sqrt(10*10/2);
		ctx.translate(x+dx,y+dy);
	  	ctx.rotate(Math.atan2(-dx,dx));
     	ctx.beginPath();
     	ctx.moveTo(-size,0);
      	ctx.lineTo(0,-size/2);
      	ctx.lineTo(0, size/2);
      	ctx.closePath();
      	ctx.fill();
		
		ctx.restore();
		return;
	}
	if(edgeType==null) edgeType = AD$EDGE_TYPE_ALL;
	if(!isEmpty(lineBreak) && lineBreak.align!=AD$ARROW_ALIGN_CENTER){
		var breakHeight = lineBreak.level || 50;
  		var dx = p2.x-p1.x, dy=p2.y-p1.y, len=Math.sqrt(dx*dx+dy*dy);
  		var tx,ty, tx2, ty2;
  		var align = (lineBreak.align==AD$ARROW_ALIGN_LEFT)?-1:1;
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
  		
  		if(dir==AD$ARROW_DIR_BOTH){
  			ActorDiagram.arrowLine(ctx, breakPosition, p1, size, AD$ARROW_DIR_SINGLE, null, AD$EDGE_TYPE_TO_ONLY);
  			if(lineBreak.breaks==1){
  				ActorDiagram.arrowLine(ctx, breakPosition, p2, size, AD$ARROW_DIR_SINGLE, null, AD$EDGE_TYPE_TO_ONLY);
  			}else if(lineBreak.breaks==2){
  				ActorDiagram.arrowLine(ctx, breakPosition, breakPosition2, size, AD$ARROW_DIR_NONE, null, AD$EDGE_TYPE_NONE);
  				ActorDiagram.arrowLine(ctx, breakPosition2, p2, size, AD$ARROW_DIR_SINGLE, null, AD$EDGE_TYPE_TO_ONLY);
  			}
  		}else{
  			ActorDiagram.arrowLine(ctx, p1, breakPosition, size, AD$ARROW_DIR_NONE, null, AD$EDGE_TYPE_FROM_ONLY);
  			if(lineBreak.breaks==1){
  				ActorDiagram.arrowLine(ctx, breakPosition, p2, size, dir, null, AD$EDGE_TYPE_TO_ONLY);
  			}else if(lineBreak.breaks==2){
  				ActorDiagram.arrowLine(ctx, breakPosition, breakPosition2, size, AD$ARROW_DIR_NONE, null, AD$EDGE_TYPE_NONE);
  				ActorDiagram.arrowLine(ctx, breakPosition2, p2, size, dir, null, AD$EDGE_TYPE_TO_ONLY);
  			}
  		}
  		return;
	}
 	var points = ActorDiagram.findEdges(ctx,p1,p2);
  	if(edgeType==AD$EDGE_TYPE_FROM_ONLY || edgeType==AD$EDGE_TYPE_ALL){
  		if(isEmpty(points) || points.length<1) return;
  		p1=points[0];
  	}
  	if(edgeType==AD$EDGE_TYPE_TO_ONLY || edgeType==AD$EDGE_TYPE_ALL){
		points = ActorDiagram.findEdges(ctx,p2,p1);
		if(isEmpty(points) || points.length<1) return;
  		p2=points[0];
  	}

  	// Rotate the context to point along the path
  	var dx = p2.x-p1.x, dy=p2.y-p1.y, len=Math.sqrt(dx*dx+dy*dy);
  	var margin = 20;
 	ctx.translate(p2.x,p2.y);
  	ctx.rotate(Math.atan2(dy,dx));

	var fromMargin = (edgeType==AD$EDGE_TYPE_FROM_ONLY||edgeType==AD$EDGE_TYPE_ALL)?margin:0;
	var toMargin = (edgeType==AD$EDGE_TYPE_TO_ONLY||edgeType==AD$EDGE_TYPE_ALL)?margin:0;
  	if(dir==AD$ARROW_DIR_BOTH){
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

  	if(dir!=AD$ARROW_DIR_NONE){
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
    
ActorDiagram.isPointOnLine = function(ctx,p1,p2,size, dir, lineBreak, edgeType, point){
	ctx.save();
	
	if(p1.x == p2.x && p1.y == p2.y){
		ctx.save();
  		ctx.beginPath();
		ctx.arc(p1.x, p1.y-(35), 10, 0.7*Math.PI, 0.4*Math.PI);
		if(ctx.isPointInPath(point.left, point.top)){
			ctx.restore();
			return true;
		}						
		ctx.restore();
		return false;
	}
	
	if(edgeType==null) edgeType = AD$EDGE_TYPE_ALL;
	if(!isEmpty(lineBreak) && lineBreak.align!=AD$ARROW_ALIGN_CENTER){
		var breakHeight = lineBreak.level || 50;
  		var dx = p2.x-p1.x, dy=p2.y-p1.y, len=Math.sqrt(dx*dx+dy*dy);
  		var tx,ty, tx2, ty2;
  		var align = (lineBreak.align==AD$ARROW_ALIGN_LEFT)?-1:1;
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
  		
  		if(dir==AD$ARROW_DIR_BOTH){
  			if(ActorDiagram.isPointOnLine(ctx, breakPosition, p1, size, AD$ARROW_DIR_SINGLE, null, AD$EDGE_TYPE_TO_ONLY, point))
  				return true;
  			if(lineBreak.breaks==1){
  				if(ActorDiagram.isPointOnLine(ctx, breakPosition, p2, size, AD$ARROW_DIR_SINGLE, null, AD$EDGE_TYPE_TO_ONLY, point))
  					return true;
  			}else if(lineBreak.breaks==2){
  				if(ActorDiagram.isPointOnLine(ctx, breakPosition, breakPosition2, size, AD$ARROW_DIR_NONE, null, AD$EDGE_TYPE_NONE, point))
  					return true;
  				if(ActorDiagram.isPointOnLine(ctx, breakPosition2, p2, size, AD$ARROW_DIR_SINGLE, null, AD$EDGE_TYPE_TO_ONLY, point))
  					return true;
  			}
  		}else{
  			if(ActorDiagram.isPointOnLine(ctx, p1, breakPosition, size, AD$ARROW_DIR_NONE, null, AD$EDGE_TYPE_FROM_ONLY, point))
  				return true;
  			if(lineBreak.breaks==1){
  				if(ActorDiagram.isPointOnLine(ctx, breakPosition, p2, size, dir, null, AD$EDGE_TYPE_TO_ONLY, point))
  					return true;
  			}else if(lineBreak.breaks==2){
  				if(ActorDiagram.isPointOnLine(ctx, breakPosition, breakPosition2, size, AD$ARROW_DIR_NONE, null, AD$EDGE_TYPE_NONE, point))
  					return true;
  				if(ActorDiagram.isPointOnLine(ctx, breakPosition2, p2, size, dir, null, AD$EDGE_TYPE_TO_ONLY, point))
  					return true;
  			}
  		}
  		return;
	}
 	var points = ActorDiagram.findEdges(ctx,p1,p2);
  	if(edgeType==AD$EDGE_TYPE_FROM_ONLY || edgeType==AD$EDGE_TYPE_ALL){
  		if(isEmpty(points) || points.length<1) return;
  		p1=points[0];
  	}
  	if(edgeType==AD$EDGE_TYPE_TO_ONLY || edgeType==AD$EDGE_TYPE_ALL){
		points = ActorDiagram.findEdges(ctx,p2,p1);
		if(isEmpty(points) || points.length<1) return;
  		p2=points[0];
  	}

  	// Rotate the context to point along the path
  	var dx = p2.x-p1.x, dy=p2.y-p1.y, len=Math.sqrt(dx*dx+dy*dy);
  	var margin = 20;
 	ctx.translate(p2.x,p2.y);
  	ctx.rotate(Math.atan2(dy,dx));

	var fromMargin = (edgeType==AD$EDGE_TYPE_FROM_ONLY||edgeType==AD$EDGE_TYPE_ALL)?margin:0;
	var toMargin = (edgeType==AD$EDGE_TYPE_TO_ONLY||edgeType==AD$EDGE_TYPE_ALL)?margin:0;

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
    
ActorDiagram.textOnArrowLine = function(ctx,p1,p2,size, dir, lineBreak, edgeType, text, selected){
	if(!text) return null;
	ctx.save();

	var reversed = 1;
	if(p1.x>p2.x){
		var tp = p1;
		p1 = p2;
		p2 = tp;
		reversed = -1;
	}
	
	if(edgeType==null) edgeType = AD$EDGE_TYPE_ALL;
 	var points = ActorDiagram.findEdges(ctx,p1,p2);
  	if(edgeType==AD$EDGE_TYPE_FROM_ONLY || edgeType==AD$EDGE_TYPE_ALL){
  		if(isEmpty(points) || points.length<1) return;
  		p1=points[0];
  	}
  	if(edgeType==AD$EDGE_TYPE_TO_ONLY || edgeType==AD$EDGE_TYPE_ALL){
		points = ActorDiagram.findEdges(ctx,p2,p1);
		if(isEmpty(points) || points.length<1) return;
  		p2=points[0];
  	}

  	// Rotate the context to point along the path
  	var dx = p2.x-p1.x, dy=p2.y-p1.y, len=Math.sqrt(dx*dx+dy*dy);
  	var margin = 20;
 	ctx.translate(p2.x,p2.y);
  	ctx.rotate(Math.atan2(dy,dx));
  	
	ctx.font = AD$TEXT_FONT;
	ctx.fillStyle = selected?AD$SELECTED_STYLE:AD$TEXT_FILLSTYLE;
	ctx.textAlign = 'center';
	var breakHeight = (!isEmpty(lineBreak) && lineBreak.align!=AD$ARROW_ALIGN_CENTER)?lineBreak.level||50:0;
	var targetY = (!lineBreak || lineBreak.align == AD$ARROW_ALIGN_CENTER) ? 14 : 14 + breakHeight*reversed*(lineBreak.align==AD$ARROW_ALIGN_LEFT?-1:1);
	var textRect = ActorDiagram.wrapText(ctx, text, -len/2, targetY, AD$TEXT_MAXWIDTH, AD$TEXT_LINEHEIGHT);
  	ctx.restore();

	if(edgeType==null) edgeType = AD$EDGE_TYPE_ALL;
	var textHeight = textRect.bottom-textRect.top, textWidth = textRect.right-textRect.left;
	var dx = p2.x-p1.x, dy=p2.y-p1.y, len=Math.sqrt(dx*dx+dy*dy);
	var tTop, tLeft, tBottom, tRight;
	var align = (!isEmpty(lineBreak) && lineBreak.align==AD$ARROW_ALIGN_LEFT)?-1:1;
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
		if(reversed && (isEmpty(lineBreak) || lineBreak.align==AD$ARROW_ALIGN_CENTER)){
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
ActorDiagram.findEdges = function(ctx,p1,p2,cutoff){
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

AD$CONTROLLERS = new Array();
AD$CONTROLLERS.isEditing = false;

AD$CONTROLLERS.findControllerById = function(canvasId, id){
	if(isEmpty(canvasId) || isEmpty(id) || isEmpty(AD$CONTROLLERS)) return null;
	for(var i=0; i<AD$CONTROLLERS.length; i++){
		if(AD$CONTROLLERS[i].id == id) return AD$CONTROLLERS[i];
	}
	return null;
};

AD$CONTROLLERS.findControllerByPosition = function(canvasId, position){
	if(isEmpty(canvasId) || isEmpty(position) || isEmpty(AD$CONTROLLERS)) return null;
	for(var i=0; i<AD$CONTROLLERS.length; i++){
		var ctrl = AD$CONTROLLERS[i];
		if(ActorDiagram.getModelType(ctrl.model) == AD$TYPE_NODE){
			var size = ctrl.model.type===AD$NODE_TYPE_TOUCHPOINT?AD$NODE_SIZE_SMALL:AD$NODE_SIZE_NORMAL;
			var top=ctrl.model.position.top, bottom=top+size, left=ctrl.model.position.left, right=left+size;
			if(position.top>=top&&position.top<=bottom&&position.left>=left&&position.left<=right)
				return ctrl;
			if(ctrl.nameRect && position.top>=ctrl.nameRect.top&&position.top<=ctrl.nameRect.bottom&&position.left>=ctrl.nameRect.left&&position.left<=ctrl.nameRect.right)
				return ctrl;
		}else if(ActorDiagram.getModelType(ctrl.model) == AD$TYPE_EDGELINE){
			var model = ctrl.model;
			var context = ctrl.context;
			if(!isEmpty(model.fromNodeId))
				model.fromPosition = ActorDiagram.getCenterByNode(AD$CONTROLLERS.findModelById(canvasId, model.fromNodeId));
			if(!model.isLining && !isEmpty(model.toNodeId))
				model.toPosition = ActorDiagram.getCenterByNode(AD$CONTROLLERS.findModelById(canvasId, model.toNodeId));

			if(ActorDiagram.isPointOnLine(context, 
	    		{x:model.fromPosition.left|0, y:model.fromPosition.top|0}, 
	    		{x:model.toPosition.left|0, y:model.toPosition.top|0}, 
	    		null, 
	    		model.direction,
	    		model.lineBreak,
	    		model.isLining?AD$EDGE_TYPE_FROM_ONLY:null,
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

AD$CONTROLLERS.findModelById = function(canvasId, id){
	var ctrl = AD$CONTROLLERS.findControllerById(canvasId, id);
	if(ctrl) return ctrl.model;
	return null;
};

AD$CONTROLLERS.updateModel = function(canvasId, model){
	if(isEmpty(model) || isEmpty(canvasId) || isEmpty(AD$CONTROLLERS)) return;
	for(var i=0; i<AD$CONTROLLERS.length; i++){
		if(AD$CONTROLLERS[i].id == model.id){
			var ctrl = AD$CONTROLLERS[i];
			ctrl.model = model;
			AD$CONTROLLERS[i].ctrl;
			return;
		}
	}
};

AD$CONTROLLERS.removeController = function(canvasId, model){
	if(isEmpty(model) || isEmpty(canvasId) || isEmpty(AD$CONTROLLERS)) return;
	for(var i=0; i<AD$CONTROLLERS.length; i++){
		if(AD$CONTROLLERS[i].id == model.id){
			AD$CONTROLLERS.splice(i, 1);
			if(ActorDiagram.getModelType(model) == AD$TYPE_NODE)
				AD$CONTROLLERS.removeConnectedLines(canvasId, model.id);
			return;
		}
	}
};

AD$CONTROLLERS.removeConnectedLines = function(canvasId, modelId){
	if(isEmpty(modelId) || isEmpty(canvasId) || isEmpty(AD$CONTROLLERS)) return;
	for(var i=0; i<AD$CONTROLLERS.length; i++){
		if(ActorDiagram.getModelType(AD$CONTROLLERS[i].model) != AD$TYPE_EDGELINE) continue;	
		if(AD$CONTROLLERS[i].model.fromNodeId === modelId || AD$CONTROLLERS[i].model.toNodeId === modelId){
			AD$CONTROLLERS.splice(i, 1);
		}
	}
};

AD$TOOL_NONE = 0;
AD$TOOL_NODE_PRODUCT = 11;
AD$TOOL_NODE_PROVIDER = 12;
AD$TOOL_NODE_TOUCHPOINT = 13;
AD$TOOL_NODE_USER = 14;

AD$TOOL_EDGELINE = 21;


ActorDiagram.draw = function(config) {
	var options = {
		mode : AD$MODE_VIEW,
		target : $('<div></div>'),
		jsonDataString : '',
		reload : false
	};
	
	var testData = {
		width : 640,
		height : 340,
		canvasId : ActorDiagram.generateId('CANVAS'),
		nodes : [
			{	
				id : 'NODE1',
				type: AD$NODE_TYPE_PRODUCT,
				position: {
					top : 200,
					left : 100
				},
				name: '占쏙옙占쏙옙占쏙옙 占쏙옙占쏙옙占쏙옙 占쏙옙占쏙옙占쏙옙 占쏙옙占쏙옙占쏙옙 占쏙옙占쏙옙占쏙옙'
			},
			{
				id : 'NODE2',
				type: AD$NODE_TYPE_PROVIDER,
				position: {
					top : 100,
					left : 200
				},
				name: '占쏙옙占썸�⑤��占쏙옙 占쏙옙占썸�⑤��占쏙옙 占쏙옙占썸�⑤��占쏙옙 占쏙옙占썸�⑤��占쏙옙'
			},
			{
				id : 'NODE3',
				type: AD$NODE_TYPE_TOUCHPOINT,
				position: {
					top : 100,
					left : 300
				},
				name: '占쏙옙怨�占쏙옙占쏙옙��占쎈��占쏙옙 占쏙옙怨�占쏙옙占쏙옙��占쎈��占쏙옙 占쏙옙怨�占쏙옙占쏙옙��占쎈��占쏙옙'
			},
			{
				id : 'NODE4',
				type: AD$NODE_TYPE_USER,
				position: {
					top : 100,
					left : 400
				},
				name: '占쏙옙占쏙옙占쏙옙占쏙옙占�'
			}
		],
		edgeLines : [
			{
				id : 'LINE5',
				fromNodeId: 'NODE1', 
				toNodeId: 'NODE2',
				direction: AD$ARROW_DIR_BOTH,
				lineBreak : null,
				label: '占쏙옙占쏙옙占쏙옙占쏙옙占쏙옙占쏙옙 占쏙옙占썸�⑤��占쏙옙'
			},
			{
				id : 'LINE6',
				fromNodeId: 'NODE2', 
				toNodeId: 'NODE3',
				direction: AD$ARROW_DIR_SINGLE,
				lineBreak : null,
				label: '占쏙옙占썸�⑤��占쏙옙占쏙옙占쏙옙占쏙옙 占쏙옙怨�占쏙옙占쏙옙��占쎈��占쏙옙'
			},
			{
				id : 'LINE7',
				fromNodeId: 'NODE4', 
				toNodeId: 'NODE1',
				direction: AD$ARROW_DIR_SINGLE,
				lineBreak : {
					align : AD$ARROW_ALIGN_LEFT,
					breaks : 2
				},
				label: '占쏙옙占썸�⑤��占쏙옙占쏙옙占쏙옙占쏙옙 占쏙옙怨�占쏙옙占쏙옙��占쎈��占쏙옙'
			},
			{
				id : 'LINE8',
				fromNodeId: 'NODE3', 
				toNodeId: 'NODE4',
				direction: AD$ARROW_DIR_NONE,
				lineBreak : null,
				label: '占쏙옙怨�占쏙옙占쏙옙��占쎈��占쎈��占쏙옙占쏙옙占� 占쏙옙占쏙옙占쏙옙占쏙옙占�'
			}
		]
	};
	
	ActorDiagram.extend(options, config);
		
	var findNodeFromData = function(nodeId, data){
		if(isEmpty(data) || isEmpty(data.nodes)) return null;
		for(var i=0; i<data.nodes.length; i++)
			if(data.nodes[i].id === nodeId) return data.nodes[i];
		return null;
	};
	
	var data = {width:AD$DEFAULT_CANVAS_WIDTH, height:AD$DEFAULT_CANVAS_HEIGHT};
	try{
		if(!isEmpty(options.jsonDataString))
			data = eval('('+options.jsonDataString+')');
	}catch(e){}
	if(options.mode != AD$MODE_EDIT){
		
		// Draw the Canvas for this Actor Diagram and get the context object returned back.
		var context = ActorDiagram.View.Canvas.draw({
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
				ActorDiagram.View.Node.draw({
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
					ActorDiagram.View.EdgeLine.draw({
						mode : options.mode,
						context : context,
						model : {
							fromPosition : ActorDiagram.getCenterByNode(findNodeFromData(line.fromNodeId, data)),
							toPosition : ActorDiagram.getCenterByNode(findNodeFromData(line.toNodeId, data)),
							direction : line.direction,
							lineColor : line.lineColor,
							lineBreak : line.lineBreak,
							label : line.label,
							selected : false
						}
					});
				}
			}
		}		
	}else{
		
		if(!isEmpty(AD$CONTROLLERS)){
			var canvas = {};
			var nodes = new Array();
			var edgeLines = new Array();
			for(var i=0; i<AD$CONTROLLERS.length; i++){
				var ctrl = AD$CONTROLLERS[i];
				var model = ctrl.model;
				switch(ActorDiagram.getModelType(model)){
				case AD$TYPE_CANVAS :
					canvas =  model;
					break;
				case AD$TYPE_NODE :
					nodes.push(model);
					break;
				case AD$TYPE_EDGELINE :
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
			AD$CONTROLLERS.splice(0, AD$CONTROLLERS.length);
		}
		
		// Draw the Canvas for this Actor Diagram and get the context object returned back.
		var canvasController = null;
		if(data && data.canvasId){
			canvasController = new ActorDiagram.Controller.Canvas(options.mode, 
																	options.target, 
																	{
																		id: data.canvasId,
																		width : data.width,
																		height : data.height
																	});
		}else{
			canvasController = new ActorDiagram.Controller.Canvas(options.mode,
																	options.target,
																	{ 	
																		id: ActorDiagram.generateId('CANVAS'),
																		width : AD$DEFAULT_CANVAS_WIDTH,
																		height : AD$DEFAULT_CANVAS_HEIGHT
																	});
		}
		AD$CONTROLLERS.push(canvasController);
		
		if(!isEmpty(data.nodes)){			
			for(var i=0; i<data.nodes.length; i++){
				AD$CONTROLLERS.push(new ActorDiagram.Controller.Node(canvasController.id, options.mode, canvasController.context, data.nodes[i]));
			}
			if(!isEmpty(data.edgeLines)){				
				for(var i=0; i<data.edgeLines.length; i++){
					AD$CONTROLLERS.push(new ActorDiagram.Controller.EdgeLine(canvasController.id, options.mode, canvasController.context, data.edgeLines[i]));
				}
			}
		}
		canvasController.clearSelections();
	}		
};

ActorDiagram.redraw = function(canvasId) {
	if(isEmpty(canvasId) || isEmpty(AD$CONTROLLERS)) return;
	var canvasCtrl = AD$CONTROLLERS.findControllerById(canvasId, canvasId);
	if(isEmpty(canvasCtrl)) return;
	canvasCtrl.redraw();
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[actorDiagram script]', null, error);
}