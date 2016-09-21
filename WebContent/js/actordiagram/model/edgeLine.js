//
// Source Name : edge.js
// Description : Node�� Node���� ������迡 ���� �Ӽ��� ������ �ִ� ���̸�, �������� �Ϲ���/����� ȭ��ǥ�� ǥ���ϸ� ���� �ο��� �� ����.
//
try{
ActorDiagram.Model = ActorDiagram.Model || {};
ActorDiagram.Model.EdgeLine = function(config){
	var options = {
			id: '',
			fromNodeId: '', 
			toNodeId: '',
			fromPosition: '',
			toPosition:'',
			direction: AD$ARROW_DIR_SINGLE,
			lineBreak: null,
			lineColor: 'rgb(114, 114, 114)',
			label: '',
			isLining: false,
			isCVCAEnabled: true,
			selected: false
	};

	ActorDiagram.extend(options, config);
	if(isEmpty(options.id)) options.id = ActorDiagram.generateId(AD$TYPE_EDGELINE);
	return options;
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[model.edgeLine script]', null, error);
}