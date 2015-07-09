<%@page import="net.smartworks.skkupss.model.DefaultSpace"%>
<%@page import="net.smartworks.factory.ManagerFactory"%>
<%@page import="net.smartworks.skkupss.model.ProductService"%>
<%@page import="net.smartworks.skkupss.model.ValueSpace"%>
<%@page import="net.smartworks.util.CommonUtil"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.ServiceSpace"%>
<%@ page contentType="text/html; charset=utf-8"%>

<%


	DefaultSpace contextSpace = (DefaultSpace)request.getAttribute("contextSpace");
	String psId = request.getParameter("psId");
	if(SmartUtil.isBlankObject(contextSpace) && !SmartUtil.isBlankObject(psId)){

		ProductService productService = null;
		try{
			productService = ManagerFactory.getInstance().getServiceManager().getProductService(psId, ProductService.SPACE_TYPE_CONTEXT);
		}catch(Exception e){}
		if(!SmartUtil.isBlankObject(productService)) contextSpace = productService.getContextSpace();
	}
	String isEditModeStr = request.getParameter("isEditMode");
	boolean isEditMode = SmartUtil.isBlankObject(isEditModeStr) || !isEditModeStr.equalsIgnoreCase("true") ? false : true;
	if(SmartUtil.isBlankObject(contextSpace)) contextSpace = new DefaultSpace();;

	String[] values = contextSpace.getElements();
	String jsonDataString = (SmartUtil.isBlankObject(values))?"":values[0];
%>
 	 
<!-- 컨텐츠 레이아웃-->
<div class="js_space_tab js_context_space" spaceType="<%=ProductService.SPACE_TYPE_CONTEXT%>">
	<%if(isEditMode){ %>
	<%}else{ %>
		<div class="js_context_diagram_target" psId="<%=psId%>"></div>
	<%} %>
</div>
<!-- 컨텐츠 레이아웃//-->
<script type="text/javascript">
$(function() {
	ContextDiagram.draw({
		mode : <%if(!isEditMode){%>CD$MODE_EDIT<%}else{%>CD$MODE_VIEW<%}%>,
		target : $('.js_context_diagram_target[psId="' + '<%=psId%>' + '"]'),
		jsonDataString : '<%=jsonDataString%>'
	});
});
</script>
