<%@page import="net.smartworks.skkupss.model.User"%>
<%@page import="net.smartworks.skkupss.model.TimeSpace"%>
<%@page import="net.smartworks.factory.ManagerFactory"%>
<%@page import="net.smartworks.skkupss.model.ProductService"%>
<%@page import="net.smartworks.util.CommonUtil"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.ServiceSpace"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<%
	User cUser = SmartUtil.getCurrentUser();

	TimeSpace timeSpace = (TimeSpace)request.getAttribute("timeSpace");
	String psId = request.getParameter("psId");
	if(!SmartUtil.isBlankObject(psId)){
	
		ProductService productService = null;
		try{
			productService = ManagerFactory.getInstance().getServiceManager().getProductService(psId, ProductService.SPACE_TYPE_TIME);
		}catch(Exception e){}
		if(!SmartUtil.isBlankObject(productService)) timeSpace = productService.getTimeSpace();
	}
	
	String isEditModeStr = request.getParameter("isEditMode");
	boolean isEditMode = SmartUtil.isBlankObject(isEditModeStr) || !isEditModeStr.equalsIgnoreCase("true") ? false : true;
	if(SmartUtil.isBlankObject(timeSpace)) timeSpace = new TimeSpace();

	String[] values = null;
%>
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />
 	 
<!-- 컨텐츠 레이아웃-->
<div class="js_space_tab js_time_space" spaceType="<%=ProductService.SPACE_TYPE_TIME%>">
	<table class="up tc" style="width:550px;min-height:200px;margin-left:auto;margin-right:auto;">
		<tr style="border-bottom: darkgray solid 8px;height:24px">
			<th class="tc" style="width:25%"><input class="js_toggle_time_value" type="radio" <%if(!isEditMode){ %> disabled <%} %> <%if(timeSpace.isDiscreteTransaction()) {%>checked<%} %> name="rdoDiscreteTransaction" style="width: 24px;height: 24px;position: relative;top: 20px;"/></th>
			<th class="tc" style="width:25%"><input class="js_toggle_time_value" type="radio" <%if(!isEditMode){ %> disabled <%} %> <%if(timeSpace.isAvailableAtCertainTimes()) {%>checked<%} %> name="rdoAvailableAtCertainTimes" style="width: 24px;height: 24px;position: relative;top: 20px;"/></th>
			<th class="tc" style="width:25%"><input class="js_toggle_time_value" type="radio" <%if(!isEditMode){ %> disabled <%} %> <%if(timeSpace.isAvailableWhenNeeded()) {%>checked<%} %> name="rdoAvailableWhenNeeded" style="width: 24px;height: 24px;position: relative;top: 20px;"/></th>
			<th class="tc" style="width:25%"><input class="js_toggle_time_value" type="radio" <%if(!isEditMode){ %> disabled <%} %> <%if(timeSpace.isContinuousDelivery()) {%>checked<%} %> name="rdoContinuousDelivery" style="width: 24px;height: 24px;position: relative;top: 20px;"/></th>
		</tr>
		<tr>
			<td class="tc" style="height:100%">
				<div class="js_time_value_desc <%if(timeSpace.isDiscreteTransaction()){%>checked<%}%>" style="font-size:15px">Discrete Transaction</div>
			</td>
			<td class="tc" style="height:100%">
				<div class="js_time_value_desc <%if(timeSpace.isAvailableAtCertainTimes()){%>checked<%}%>" style="font-size:15px">Available at Certain Times</div>
			</td>
			<td class="tc" style="height:100%">
				<div class="js_time_value_desc <%if(timeSpace.isAvailableWhenNeeded()){%>checked<%}%>" style="font-size:15px">Available When needed</div>
			</td>
			<td class="tc" style="height:100%">
				<div class="js_time_value_desc <%if(timeSpace.isContinuousDelivery()){%>checked<%}%>" style="font-size:15px">Continuous Delivery</div>
			</td>
		</tr>
	</table>
</div>
<!-- 컨텐츠 레이아웃//-->
