//
// Source Name : canvas.js
// Description : Lifecycle Diagram�� Canvas�� ���� �Ӽ��� ������ �ִ� ��.
//
try{
LifecycleDiagram.Model = LifecycleDiagram.Model || {};
LifecycleDiagram.Model.Canvas = function(config){
	var options = {
			id: '',
			width : 320,
			height : 320,
			backgroundColor : '#ffffff',
			data : []
	};

	LifecycleDiagram.extend(options, config);
	if(isEmpty(options.id)) options.id = LifecycleDiagram.generateId(LD$TYPE_CANVAS);
	
	return options;
	
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[model.canvas script]', null, error);
}