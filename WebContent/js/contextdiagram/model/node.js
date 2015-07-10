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
	if(isEmpty(options.id)) options.id = ContextDiagram.generateId(CD$TYPE_NODE);
	if(typeof options.type === 'number'){
		switch(options.type){
		case CD$TOOL_NODE_PRODUCT:
			options.type = CD$NODE_TYPE_PRODUCT;
			break;
		case CD$TOOL_NODE_PROVIDER:
			options.type = CD$NODE_TYPE_PROVIDER;
			break;
		case CD$TOOL_NODE_TOUCHPOINT:
			options.type = CD$NODE_TYPE_TOUCHPOINT;
			break;
		case CD$TOOL_NODE_USER:
			options.type = CD$NODE_TYPE_USER;
			break;
		}
	}
	return options;
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[model.node script]', null, error);
}