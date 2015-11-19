<%@page import="net.smartworks.skkupss.model.User"%>
<%@page import="net.smartworks.skkupss.model.DefaultSpace"%>
<%@page import="net.smartworks.factory.ManagerFactory"%>
<%@page import="net.smartworks.skkupss.model.ProductService"%>
<%@page import="net.smartworks.skkupss.model.ValueSpace"%>
<%@page import="net.smartworks.util.CommonUtil"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.ServiceSpace"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<%
	User cUser = SmartUtil.getCurrentUser();

	DefaultSpace defaultSpace = (DefaultSpace)request.getAttribute("environmentSpace");
	String psId = request.getParameter("psId");
	
	if(SmartUtil.isBlankObject(defaultSpace) && !SmartUtil.isBlankObject(psId)){

		ProductService productService = null;
		try{
			productService = ManagerFactory.getInstance().getServiceManager().getProductService(psId, ProductService.SPACE_TYPE_ENVIRONMENT);
		}catch(Exception e){}
		
		defaultSpace = productService.getEnvironmentSpace();
	}
	String isEditModeStr = request.getParameter("isEditMode");
	boolean isEditMode = SmartUtil.isBlankObject(isEditModeStr) || !isEditModeStr.equalsIgnoreCase("true") ? false : true;
	if(SmartUtil.isBlankObject(defaultSpace)) defaultSpace = new DefaultSpace();;

	String[] values = defaultSpace.getElements();
	String region=null, environment=null;
	if(!SmartUtil.isBlankObject(values) && values.length==2){
		region=values[0];
		environment=values[1];
	}
	
%>
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />


 	 
<!-- 컨텐츠 레이아웃-->
<div class="js_space_tab js_environment_space" spaceType="<%=ProductService.SPACE_TYPE_ENVIRONMENT%>">
	<table class="form_layout con">
		<tr>
			<th width="20%"><fmt:message key="pss.title.environment.region"/></th>
			<td width="80%">
				<select name="selEnvironmentRegion" <%if(!isEditMode){ %>disabled<%} %>>
					<option><fmt:message key="common.title.none"/></option>
					<option <%if("국내".equals(region)){ %>selected<%} %>>국내</option>
					<option <%if("아시아".equals(region)){ %>selected<%} %>>아시아</option>
					<option <%if("미주".equals(region)){ %>selected<%} %>>미주</option>
					<option <%if("유럽".equals(region)){ %>selected<%} %>>유럽</option>
					<option <%if("아프리카".equals(region)){ %>selected<%} %>>아프리카</option>
					<option <%if("호주".equals(region)){ %>selected<%} %>>호주</option>
				</select>
			</td>
		</tr>
		<%
		String[] environments = new String[]{null, null, null};
		if(!SmartUtil.isBlankObject(environment)){
			String[] temp = environment.split("\\,");
			if(temp!=null && temp.length==2) environments = temp;
			
		}
		%>
		<tr>
			<th><fmt:message key="pss.title.environment.environment"/></th>
			<td>
				<input <%if(!isEditMode){ %>disabled<%} %> style="margin-left:6px;margin-right:3px" type="checkbox" name="chkEnvironment1" <%if("오프라인".equals(environments[0])){ %>checked<%} %>/>오프라인
				<input <%if(!isEditMode){ %>disabled<%} %> style="margin-left:6px;margin-right:3px" type="checkbox" name="chkEnvironment2" <%if("온라인".equals(environments[1])){ %>checked<%} %>/>온라인
			</td>
		</tr>
	</table>
</div>
<!-- 컨텐츠 레이아웃//-->
