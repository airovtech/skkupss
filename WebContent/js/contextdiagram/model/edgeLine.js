//
// Source Name : edge.js
// Description : Node와 Node간의 연결관계에 대한 속성을 가지고 있는 모델이며, 뷰형식은 일방향/양방향 화살표를 표시하며 라벨을 부여할 수 있음.
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