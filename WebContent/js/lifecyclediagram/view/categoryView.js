//
// Source Name : edgeLineView.js
// Description : Node�� Node���� ���ἱ View�� �׷��ִ� �ҽ�
//
try{
LifecycleDiagram.View = LifecycleDiagram.View || {};
LifecycleDiagram.View.Category = {};
LifecycleDiagram.View.Category.draw = function(config){

	var options = {
		mode : LD$MODE_VIEW,
		context : null,
		model : null
	};
    
	LifecycleDiagram.extend(options, config);
	if(isEmpty(options.context) || isEmpty(options.model)) return null;
	
	var context = options.context;
	var model = options.model;
	context.save();	
	context.font = LD$CATEGORY_TEXT_FONT;
	context.fillStyle = model.selected?LD$SELECTED_STYLE:LD$TEXT_FILLSTYLE;
	context.textAlign = 'center';
	context.fillText(model.name, model.x, model.y);   
 	context.restore();	

};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[view.categoryView script]', null, error);
}