<%@ page contentType="text/html; charset=utf-8"%>
<%@page import="net.smartworks.skkupss.model.User"%>
<%@page import="net.smartworks.util.PropertiesLoader"%>
<%@page import="net.smartworks.skkupss.manager.impl.DocFileManagerImpl"%>
<%@page import="net.smartworks.util.CommonUtil"%>
<%@page import="net.smartworks.skkupss.model.BizModelSpace"%>
<%@page import="net.smartworks.skkupss.model.ServiceSpace"%>
<%@page import="net.smartworks.skkupss.model.ValueSpace"%>
<%@page import="net.smartworks.util.LocalDate"%>
<%@page import="java.util.Date"%>
<%@page import="net.smartworks.skkupss.model.ProductService"%>
<%@page import="net.smartworks.skkupss.model.SortingField"%>
<%@page import="net.smartworks.factory.ManagerFactory"%>
<%@page import="net.smartworks.skkupss.model.InstanceList"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.RequestParams"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<link href="http://meyerweb.com/eric/tools/css/reset/reset.css" rel="stylesheet" type="text/css" />
<link href="css/default.css?v=3.5.7" type="text/css" rel="stylesheet" />
<link href="css/black/layout.css?v=3.5.7" type="text/css" rel="stylesheet" />
<link href="css/black/detail.css?v=3.5.7" type="text/css" rel="stylesheet" />
<link href="css/black/chat.css?v=3.5.7" type="text/css" rel="stylesheet" />
<link href="css/black/form.css?v=3.5.7" type="text/css" rel="stylesheet" />
<link href="css/black/pop.css?v=3.5.7" type="text/css" rel="stylesheet" />
<link href="css/black/media.css?v=3.5.7" type="text/css" rel="stylesheet"/>
<link href="css/black/pss.css?v=3.5.7" type="text/css" rel="stylesheet"/>

<link href="css/ui-lightness/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css" title="ui-theme" />
<link href="css/jqgrid/themes/ui.jqgrid.css" rel="stylesheet" type="text/css" media="screen" />
<link href="css/ext/ext-all.css" type="text/css" rel="stylesheet" />
<link href="css/fileuploader/fileuploader.css" type="text/css" rel="stylesheet"/>
<link href="css/fullcalendar/fullcalendar.css" type="text/css" rel="stylesheet"/>

<script type="text/javascript" src="js/jquery/jquery-1.6.2.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.ui.core.min.js"></script>
<script type="text/javascript" src="js/sw/sw-util.js"></script>

<%
	User cUser = SmartUtil.getCurrentUser();
	String PSS_PICTURE_URL = PropertiesLoader.loadPropByClassPath("/net/smartworks/conf/config.properties").getProperty("pss.picture.url");

	RequestParams params = (RequestParams)request.getAttribute("requestParams");
	if(SmartUtil.isBlankObject(params)){
		params = new RequestParams();
		params.setSpaceType(ProductService.PSS_SPACE_VALUE);
	}

	//String psId = "37ef256d54be74b40154cee711120037";
	
	String psId = (String)request.getParameter("psId");
	
	
	ProductService productService = null;
	try{
		productService = ManagerFactory.getInstance().getServiceManager().getProductService(psId, ProductService.SPACE_TYPE_VALUE);
	}catch(Exception e){}
	
	if (productService == null)
		return;
 %>
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />

<!-- 목록 테이블 -->
<table>
<%
	productService.setSpaceType(ProductService.getSpaceType(ProductService.PSS_SPACE_VALUE));
	User lastModifier = (productService.getLastModifiedUser()==null)?productService.getCreatedUser():productService.getLastModifiedUser();
	LocalDate lastModifiedDate = productService.getLastModifiedDate();
%>
	<tr class="instance_list js_content js_work_instance_list js_instance_detail" href="newProductService.sw?psId=<%=productService.getId() %>&spaceType=<%=params.getSpaceType()%>" psId="<%=productService.getId()%>" psName="<%=productService.getName()%>">
		<td class="tc">
			<img class="vt up" <%if (!SmartUtil.isBlankObject(productService
					.getPicture())) {%> src="<%=PSS_PICTURE_URL
						+ productService.getPicture()%>"<%}%> style="width:158px<%if (SmartUtil
					.isBlankObject(productService.getPicture())) {%>;height:158px<%}%>" />
			<div><%=CommonUtil.toNotNull(productService.getName())%></div>
		</td>
		<td class="tl vt">
			<textarea readonly><%=CommonUtil.toNotNull(productService.getDesc())%></textarea>
		</td>
		<td class="vt">
			<div class="js_view_space_target">
				<jsp:include page="viewValueSpace.jsp">
					<jsp:param value="<%=productService.getId()%>" name="psId"/>
				</jsp:include>
			</div>
		</td>
	</tr>
</table>
</form>
