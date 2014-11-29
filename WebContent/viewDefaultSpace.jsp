<%@page import="net.smartworks.skkupss.model.DefaultSpace"%>
<%@page import="net.smartworks.factory.ManagerFactory"%>
<%@page import="net.smartworks.skkupss.model.ProductService"%>
<%@page import="net.smartworks.skkupss.model.ValueSpace"%>
<%@page import="net.smartworks.util.CommonUtil"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.ServiceSpace"%>
<%@ page contentType="text/html; charset=utf-8"%>

<%
	DefaultSpace defaultSpace = (DefaultSpace)request.getAttribute("defaultSpace");
	String psId = request.getParameter("psId");
	String spaceTypeStr = request.getParameter("spaceType");
	int spaceType = SmartUtil.isBlankObject(spaceTypeStr) ? ProductService.SPACE_TYPE_NONE : Integer.parseInt(spaceTypeStr);
	
	if(SmartUtil.isBlankObject(defaultSpace) && !SmartUtil.isBlankObject(psId) && spaceType > ProductService.SPACE_TYPE_ALL ){

		ProductService productService = null;
		try{
			productService = ManagerFactory.getInstance().getServiceManager().getProductService(psId, spaceType);
		}catch(Exception e){}
		
		if(!SmartUtil.isBlankObject(productService)){
			switch(spaceType){
			case ProductService.SPACE_TYPE_PRODUCT_SERVICE:
				defaultSpace = productService.getProductServiceSpace();
				break;
			case ProductService.SPACE_TYPE_PRODUCT:
				defaultSpace = productService.getProductSpace();
				break;
			case ProductService.SPACE_TYPE_TOUCH_POINT:
				defaultSpace = productService.getTouchPointSpace();
				break;
			case ProductService.SPACE_TYPE_CUSTOMER:
				defaultSpace = productService.getCustomerSpace();
				break;
			case ProductService.SPACE_TYPE_ACTOR:
				defaultSpace = productService.getActorSpace();
				break;
			case ProductService.SPACE_TYPE_SOCIETY:
				defaultSpace = productService.getSocietySpace();
				break;
			case ProductService.SPACE_TYPE_CONTEXT:
				defaultSpace = productService.getContextSpace();
				break;
			case ProductService.SPACE_TYPE_TIME:
				defaultSpace = productService.getTimeSpace();
				break;
			case ProductService.SPACE_TYPE_ENVIRONMENT:
				defaultSpace = productService.getEnvironmentSpace();
				break;
			}
		}		
	}
	String isEditModeStr = request.getParameter("isEditMode");
	boolean isEditMode = SmartUtil.isBlankObject(isEditModeStr) || !isEditModeStr.equalsIgnoreCase("true") ? false : true;
	if(SmartUtil.isBlankObject(defaultSpace)) defaultSpace = new DefaultSpace();;

	String[] values = defaultSpace.getElements();
%>
 	 
<!-- 컨텐츠 레이아웃-->
<div class="js_space_tab js_default_space" spaceType="<%=spaceType%>">
	<table class="js_dummy_element_item" style="display:none">
		<tr>
			<td class="vt edit_action" style="height:100%;padding:0;border-bottom:none">
				<span class="edit_item js_element_item" style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 12px;height: 24px;margin:4px; padding:4px 6px; line-height:30px">
					<span class="js_view_element_item" style="display:none">
						<span class="<%if(isEditMode){ %>js_action_element_item<%}%>"></span>
						<span class="edit_actions">
							<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
							<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
						</span>
					</span>
					<input class="fieldline js_edit_element_item" name="txtElementItem" style="display:inline-block; background-color:white; width:auto" type="text" value="">
				</span>
			</td>
		</tr>
	</table>
	<table class="tc" style="min-height:50px">
		<%
		for(int i=0; values!=null && i<values.length; i++){
		%>
			<tr>
				<td class="vt edit_action" style="height:100%;padding:0;border-bottom:none">
					<span class="edit_item js_element_item" style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 12px;height: 24px;margin:4px; padding:4px 6px; line-height:30px">
						<span class="js_view_element_item">
							<span class="<%if(isEditMode){ %>js_action_element_item<%}%>"><%=CommonUtil.toNotNull(values[i]) %></span>
							<%
							if(isEditMode){
							%>
								<span class="edit_actions">
									<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
									<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
								</span>
							<%
							}
							%>
						</span>
						<%
						if(isEditMode){
						%>
							<input class="fieldline js_edit_element_item" name="txtElementItem" style="display:none; background-color:white; width:auto" type="text" value="<%=CommonUtil.toNotNull(values[i]) %>">
						<%
						}
						%>
					</span>
				</td>
			</tr>
		<%
		}
		if(SmartUtil.isBlankObject(values) && isEditMode){
		%>
			<tr>
				<td class="vt edit_action" style="height:100%;padding:0;border-bottom:none">
					<span class="edit_item js_element_item" style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 12px;height: 24px;margin:4px; padding:4px 6px; line-height:30px">
						<span class="js_view_element_item" style="display:none">
							<span class="<%if(isEditMode){ %>js_action_element_item<%}%>"></span>
							<span class="edit_actions">
								<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
								<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
							</span>
						</span>
						<input class="fieldline js_edit_element_item" name="txtElementItem" style="display:inline-block; background-color:white; width:auto" type="text" value="">
					</span>
				</td>
			</tr>
		<%
		}
		%>
	</table>
</div>
<!-- 컨텐츠 레이아웃//-->
