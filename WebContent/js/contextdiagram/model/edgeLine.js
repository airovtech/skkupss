//
// Source Name : edge.js
// Description : Node�� Node���� ������迡 ���� �Ӽ��� ������ �ִ� ���̸�, �������� �Ϲ���/����� ȭ��ǥ�� ǥ���ϸ� ���� �ο��� �� ����.
//
try{
ContextDiagram.Model = ContextDiagram.Model || {};
ContextDiagram.Model.EdgeLine = function(config){
	var options = {
			id: '',
			fromNodeId: '', 
			toNodeId: '',
			fromPosition: '',
			toPosition:'',
			direction: CD$ARROW_DIR_SINGLE,
			lineBreak: null,
			label: '',
			isLining: false,
			selected: false
	};

	ContextDiagram.extend(options, config);
	if(isEmpty(options.id)) options.id = ContextDiagram.generateId(CD$TYPE_EDGELINE);
	return options;
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[model.edgeLine script]', null, error);
}