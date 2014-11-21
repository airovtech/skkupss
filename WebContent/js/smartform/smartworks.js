/**
SmartWorks Static Utilities ..
**/
try{
SmartWorks = function() {
    var Version = '1.0.0';
		
	this.version = function() {
		return Version;
	};
	
    return this;
};

SmartWorks.require = function(jsfile_url) {
	
};

SmartWorks.extend = function(defaults, overide) {
	for(var k in overide) {
		defaults[k] = overide[k];
	};
};

SmartWorks.generateFormFieldId = function(workspaceId, id) {
	return workspaceId + '_formField_' + id;
};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[smartworkss script]', null, error);
}