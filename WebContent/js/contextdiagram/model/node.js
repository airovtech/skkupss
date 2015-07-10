//
// Source Name : node.js
// Description : Node 대한 속성을 가지고 있는 모델
//					- 제품 : product
//					- 제공자 : provider
//					- 수혜자 : user
//					- 제품터치포인트 : touchPoint
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