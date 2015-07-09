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
	if(isEmpty(options.id)) options.id = ContextDiagram.generaterId(CD$TYPE_NODE);
	return options;
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[model.node script]', null, error);
}