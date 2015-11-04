//
// Source Name : edge.js
// Description : Node�� Node���� ������迡 ���� �Ӽ��� ������ �ִ� ���̸�, �������� �Ϲ���/����� ȭ��ǥ�� ǥ���ϸ� ���� �ο��� �� ����.
//
try{
LifecycleDiagram.Model = LifecycleDiagram.Model || {};
LifecycleDiagram.Model.Category = function(config){
	var options = {
			index: 0,
			name: '',
			x: 0,
			y: 0,
			steps: [],
			selected: false
	};

	LifecycleDiagram.extend(options, config);
	var categorySteps = LD$STEP_CATEGORY[options.index];
	for(var i=0; i<categorySteps.length; i++)
		if(options.steps[categorySteps[i]]==1)
			options.selected=true;
	return options;
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[model.category script]', null, error);
}