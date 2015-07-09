//
// Source Name : edgeLineView.js
// Description : Node와 Node간의 연결선 View를 그려주는 소스
//
try{
ContextDiagram.View = ContextDiagram.View || {};
ContextDiagram.View.EdgeLine = {};
ContextDiagram.View.EdgeLine.draw = function(config){
	var strokeStyle = 'rgb(114, 114, 114)';
	var fillStyle = 'rgb(114, 114, 114)';
	var lineWidth = 2;
	var arrowSize = 7;
	
	var options = {
		mode : CD$MODE_VIEW,
		canvasId : null,
		context : null,
		model : null
	};

	var EDGE_TYPE_ALL = 0, EDGE_TYPE_FROM_ONLY=1, EDGE_TYPE_TO_ONLY=2, EDGE_TYPE_NONE=3;
  	var arrowLine = function(ctx,p1,p2,size, dir, lineBreak, edgeType){
		ctx.save();
		
		if(edgeType==null) edgeType = EDGE_TYPE_ALL;
		if(!isEmpty(lineBreak) && lineBreak.align!=CD$ARROW_ALIGN_CENTER){
			var breakHeight = 50;
	  		var dx = p2.x-p1.x, dy=p2.y-p1.y, len=Math.sqrt(dx*dx+dy*dy);
	  		var tx,ty, tx2, ty2;
	  		var align = (lineBreak.align==CD$ARROW_ALIGN_LEFT)?-1:1;
	  		if(lineBreak.breaks==1){
		  		if(dx==0){
		  			tx = p1.x+breakHeight*align;
		  			ty = p1.y+dy/2;
		  		}else if(dy==0){
		  			tx = p1.x+dx/2;
		  			ty = p1.y+breakHeight*align;
		  		}else{
		  			var tmpx = p1.x+dx/2, tmpy=p1.y+dy/2;
		  			var ta = dx/2, tb = dy/2, tc = len/2, tangle=Math.acos((ta*ta+tc*tc-tb*tb)/(2*ta*tc)), tmpdy=breakHeight*Math.cos(tangle), tmpdx=Math.sqrt(breakHeight*breakHeight-tmpdy*tmpdy);
		  			tx = tmpx+(dy>0?-tmpdx:tmpdx)*align;
		  			ty = tmpy+tmpdy*align;
		  		}
	  		}else if(lineBreak.breaks==2){
		  		if(dx==0){
		  			tx = tx2 = p1.x+breakHeight*align;
		  			ty = p1.y+dy/4;
		  			ty2 = p1.y+dy/4*3;
		  		}else if(dy==0){
		  			tx = p1.x+dx/4;
		  			tx2 = p1.x+dx/4*3;
		  			ty = ty2 = p1.y+breakHeight*align;
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
	  			arrowLine(ctx, breakPosition, p1, size, CD$ARROW_DIR_SINGLE, null, EDGE_TYPE_TO_ONLY);
	  			if(lineBreak.breaks==1){
	  				arrowLine(ctx, breakPosition, p2, size, CD$ARROW_DIR_SINGLE, null, EDGE_TYPE_TO_ONLY);
	  			}else if(lineBreak.breaks==2){
	  				arrowLine(ctx, breakPosition, breakPosition2, size, CD$ARROW_DIR_NONE, null, EDGE_TYPE_NONE);
	  				arrowLine(ctx, breakPosition2, p2, size, CD$ARROW_DIR_SINGLE, null, EDGE_TYPE_TO_ONLY);
	  			}
	  		}else{
	  			arrowLine(ctx, p1, breakPosition, size, CD$ARROW_DIR_NONE, null, EDGE_TYPE_FROM_ONLY);
	  			if(lineBreak.breaks==1){
	  				arrowLine(ctx, breakPosition, p2, size, dir, null, EDGE_TYPE_TO_ONLY);
	  			}else if(lineBreak.breaks==2){
	  				arrowLine(ctx, breakPosition, breakPosition2, size, CD$ARROW_DIR_NONE, null, EDGE_TYPE_NONE);
	  				arrowLine(ctx, breakPosition2, p2, size, dir, null, EDGE_TYPE_TO_ONLY);
	  			}
	  		}
	  		return;
		}
	 	var points = findEdges(ctx,p1,p2);
	  	if(edgeType==EDGE_TYPE_FROM_ONLY || edgeType==EDGE_TYPE_ALL){
	  		if(isEmpty(points) || points.length<1) return;
	  		p1=points[0];
	  	}
	  	if(edgeType==EDGE_TYPE_TO_ONLY || edgeType==EDGE_TYPE_ALL){
			points = findEdges(ctx,p2,p1);
			if(isEmpty(points) || points.length<1) return;
	  		p2=points[0];
	  	}
	
	  	// Rotate the context to point along the path
	  	var dx = p2.x-p1.x, dy=p2.y-p1.y, len=Math.sqrt(dx*dx+dy*dy);
	  	var margin = 20;
	 	ctx.translate(p2.x,p2.y);
	  	ctx.rotate(Math.atan2(dy,dx));
	
  		var fromMargin = (edgeType==EDGE_TYPE_FROM_ONLY||edgeType==EDGE_TYPE_ALL)?margin:0;
  		var toMargin = (edgeType==EDGE_TYPE_TO_ONLY||edgeType==EDGE_TYPE_ALL)?margin:0;
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
    
    // Find all transparent/opaque transitions between two points
    // Uses http://en.wikipedia.org/wiki/Bresenham's_line_algorithm
    var findEdges = function(ctx,p1,p2,cutoff){
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
    
	ContextDiagram.extend(options, config);
	if(isEmpty(options.context) || isEmpty(options.model)) return null;
	
	var context = options.context;
	var model = options.model;
	if(!isEmpty(model.fromNodeId))
		model.fromPosition = ContextDiagram.getCenterByNode(CD$CONTROLLERS.findModelById(options.canvasId, model.fromNodeId));
	if(!isEmpty(model.toNodeId))
		model.toPosition = ContextDiagram.getCenterByNode(CD$CONTROLLERS.findModelById(options.canvasId, model.toNodeId));
	context.save();	
    
    context.lineWidth = lineWidth;
    context.fillStyle = context.strokeStyle = model.selected?CD$SELECTED_STYLE:fillStyle;

    arrowLine(context, 
    		{x:model.fromPosition.left|0, y:model.fromPosition.top|0}, 
    		{x:model.toPosition.left|0, y:model.toPosition.top|0}, 
    		arrowSize, 
    		model.direction,
    		model.lineBreak);

 	context.restore();	
   
	return context;

};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[view.edgeLineView script]', null, error);
}