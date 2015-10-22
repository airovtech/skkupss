//
// Source Name : canvas.js
// Description : Actor Diagram�� Canvas�� ���� �Ӽ��� ������ �ִ� ��.
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