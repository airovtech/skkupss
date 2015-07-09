//
// Source Name : canvas.js
// Description : Context Diagram�� Canvas�� ���� �Ӽ��� ������ �ִ� ��.
//
try{
ContextDiagram.Model = ContextDiagram.Model || {};
ContextDiagram.Model.Canvas = function(config){
	var options = {
			id: '',
			width : 640,
			height : 320,
			backgroundColor : '#ffffff',
			selected : false
	};

	ContextDiagram.extend(options, config);
	if(isEmpty(options.id)) options.id = ContextDiagram.generaterId(CD$TYPE_CANVAS);
	
	return options;
	
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[model.canvas script]', null, error);
}