//
// Source Name : node.js
// Description : Node ���� �Ӽ��� ������ �ִ� ��
//					- ��ǰ : product
//					- ������ : provider
//					- ������ : user
//					- ��ǰ��ġ����Ʈ : touchPoint
//
try{
LifecycleDiagram.Model = LifecycleDiagram.Model || {};
LifecycleDiagram.Model.Step = function(config){
	var options = {
			index: 0,
			name: '',
			x: 0,
			y: 0,
			selected: false
	};

	LifecycleDiagram.extend(options, config);
	return options;
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[model.step script]', null, error);
}