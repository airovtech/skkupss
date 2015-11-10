<%@page import="net.smartworks.util.PropertiesLoader"%>
<%@page import="net.smartworks.skkupss.model.Affordance"%>
<%@page import="net.smartworks.skkupss.model.TouchPoint"%>
<%@page import="net.smartworks.skkupss.model.TouchPointSpace"%>
<%@page import="net.smartworks.skkupss.model.DefaultSpace"%>
<%@page import="net.smartworks.factory.ManagerFactory"%>
<%@page import="net.smartworks.skkupss.model.ProductService"%>
<%@page import="net.smartworks.skkupss.model.ValueSpace"%>
<%@page import="net.smartworks.util.CommonUtil"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.ServiceSpace"%>
<%@ page contentType="text/html; charset=utf-8"%>

<%
	DefaultSpace productServiceSpace = (DefaultSpace)request.getAttribute("productServiceSpace");
	String psId = request.getParameter("psId");
	String spaceTypeStr = request.getParameter("spaceType");
	int spaceType = SmartUtil.isBlankObject(spaceTypeStr) ? ProductService.SPACE_TYPE_NONE : Integer.parseInt(spaceTypeStr);
	
	if(SmartUtil.isBlankObject(productServiceSpace) && !SmartUtil.isBlankObject(psId) && spaceType > ProductService.SPACE_TYPE_ALL ){

		ProductService productService = null;
		try{
			productService = ManagerFactory.getInstance().getServiceManager().getProductService(psId, spaceType);
		}catch(Exception e){}
		
		productServiceSpace = productService.getProductServiceSpace();
	}
	String isEditModeStr = request.getParameter("isEditMode");
	boolean isEditMode = SmartUtil.isBlankObject(isEditModeStr) || !isEditModeStr.equalsIgnoreCase("true") ? false : true;
	if(SmartUtil.isBlankObject(productServiceSpace)) productServiceSpace = new DefaultSpace();
	
	String[] elements = productServiceSpace.getElements();
	if(SmartUtil.isBlankObject(elements) || elements.length!=6) elements = new String[]{null, null, null, null, null, null};
	
%>
 	 
<!-- 컨텐츠 레이아웃-->
<div class="js_space_tab js_product_service_space" spaceType="<%=spaceType%>">
		<table class="tc fieldline" style="width:800px;min-height:200px;margin-left:auto;margin-right:auto;">
			<tr>
				<th class="tc vm" style="width:20%;padding-left:20px;padding-top:30px">
					<div class="up js_ps_item <%if(elements[0]!=null&&elements[0].equals("selected")){ %>selected_background<%} %>" style="margin-bottom:15px"><a href="" class="js_select_ps_item">Product-Oriented</a></div>
					<div class="up js_ps_item <%if(elements[1]!=null&&elements[1].equals("selected")){ %>selected_background<%} %>" style="margin-bottom:15px"><a href="" class="js_select_ps_item">Use-Oriented</a></div>
					<div class="up js_ps_item <%if(elements[2]!=null&&elements[2].equals("selected")){ %>selected_background<%} %>" style="margin-bottom:15px"><a href="" class="js_select_ps_item">Result-Oriented</a></div>
				</th>
				<th class="tc vb" style="width:20%"></th>
				<th class="tc vm" style="width:20%;padding-top:30px">
					<div class="up js_ps_item <%if(elements[3]!=null&&elements[3].equals("selected")){ %>selected_background<%} %>" style="margin-bottom:15px"><a href="" class="js_select_ps_item">Product Focused</a></div>
					<div class="up js_ps_item <%if(elements[4]!=null&&elements[4].equals("selected")){ %>selected_background<%} %>" style="margin-bottom:15px"><a href="" class="js_select_ps_item">Service Focused</a></div>
					<div class="up js_ps_item <%if(elements[5]!=null&&elements[5].equals("selected")){ %>selected_background<%} %>" style="margin-bottom:15px"><a href="" class="js_select_ps_item">Mixed</a></div>
				</th>
				<th class="tl vm" style="width:40%">
					<div><img src="images/pss/product-focused.png" style="width:200px"/></div>
					<div><img src="images/pss/service-focused.png" style="width:200px"/></div>
					<div><img src="images/pss/mixed.png" style="width:200px"/></div>
				</th>
			</tr>
		</table>
</div>
<!-- 컨텐츠 레이아웃//-->
