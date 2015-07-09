//
// Source Name : node.js
// Description : Node ���� �Ӽ��� ������ �ִ� ��
//					- ��ǰ : product
//					- ������ : provider
//					- ������ : user
//					- ��ǰ��ġ����Ʈ : touchPoint
//
try{
ContextDiagram.Model = ContextDiagram.Model || {};
ContextDiagram.Model.Node = function(config){
	var options = {
			id: '',
			type: '',  // product, provider, touchPoint, user
			position: '',
			name: '',
			selected: false
	};

	ContextDiagram.extend(options, config);
	if(isEmpty(options.id)) options.id = ContextDiagram.generaterId(CD$TYPE_NODE);
	return options;
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[model.node script]', null, error);
}