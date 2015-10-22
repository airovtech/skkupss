//
// Source Name : canvas.js
// Description : Actor Diagram의 Canvas에 대한 속성을 가지고 있는 모델.
//
try{
ActorDiagram.Model = ActorDiagram.Model || {};
ActorDiagram.Model.Canvas = function(config){
	var options = {
			id: '',
			width : 640,
			height : 320,
			backgroundColor : '#ffffff',
			selected : false
	};

	ActorDiagram.extend(options, config);
	if(isEmpty(options.id)) options.id = ActorDiagram.generateId(AD$TYPE_CANVAS);
	
	return options;
	
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[model.canvas script]', null, error);
}