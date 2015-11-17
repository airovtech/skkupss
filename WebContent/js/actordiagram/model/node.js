//
// Source Name : node.js
// Description : Node ���� �Ӽ��� ������ �ִ� ��
//					- ��ǰ : product
//					- ������ : provider
//					- ������ : user
//					- ��ǰ��ġ����Ʈ : touchPoint
//
try{
ActorDiagram.Model = ActorDiagram.Model || {};
ActorDiagram.Model.Node = function(config){
	var options = {
			id: '',
			type: '',  // product, provider, touchPoint, user
			typeName: '',
			position: '',
			name: smartMessage.get('pssNode'),
			selected: false
	};

	ActorDiagram.extend(options, config);
	if(isEmpty(options.id)) options.id = ActorDiagram.generateId(AD$TYPE_NODE);
	if(typeof options.type === 'number'){
		switch(options.type){
		case AD$TOOL_NODE_PRODUCT:
			options.type = AD$NODE_TYPE_PRODUCT;
			break;
		case AD$TOOL_NODE_PROVIDER:
			options.type = AD$NODE_TYPE_PROVIDER;
			break;
		case AD$TOOL_NODE_TOUCHPOINT:
			options.type = AD$NODE_TYPE_TOUCHPOINT;
			break;
		case AD$TOOL_NODE_USER:
			options.type = AD$NODE_TYPE_USER;
			break;
		}
	}
	return options;
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[model.node script]', null, error);
}