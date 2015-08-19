<%@page import="net.smartworks.skkupss.model.User"%>
<%@page import="net.smartworks.skkupss.model.ContextSpace"%>
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

	ContextSpace contextSpace = (ContextSpace)request.getAttribute("contextSpace");
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
	if(SmartUtil.isBlankObject(contextSpace)) contextSpace = new ContextSpace();;

	String jsonDataString = contextSpace.getContextData();
%>
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />
 	 
<!-- 컨텐츠 레이아웃-->
<div class="js_space_tab js_context_space" spaceType="<%=ProductService.SPACE_TYPE_CONTEXT%>">
	<%if(isEditMode){ %>
		<table>
			<tr>
				<td class="js_context_diagram_target" psId="<%=psId%>"></td>
				<td class="vt tc" style="border-left: 1px solid #c7c7c7;border-bottom:1px solid #c7c7c7">
					<table class="js_toggle_creation_tool" >
						<tr style="background-color:grey;font-weight:bold"><td class="tc"><fmt:message key="pss.title.creation_tool"/></td></tr>
						<tr>
							<td class="tc" >
								<a href="" toolId="11"><fmt:message key="pss.title.node.product"/></a>
							</td>
						</tr>
						<tr>
							<td class="tc" >
								<a href="" toolId="12"><fmt:message key="pss.title.node.provider"/></a>
							</td>
						</tr>
						<tr>
							<td class="tc" >
								<a href="" toolId="13"><fmt:message key="pss.title.node.touch_point"/></a>
							</td>
						</tr>
						<tr>
							<td class="tc" >
								<a href="" toolId="14"><fmt:message key="pss.title.node.user"/></a>
							</td>
						</tr>
						<tr>
							<td class="tc" >
								<a href="" toolId="21"><fmt:message key="pss.title.edge_line"/></a>
							</td>
						</tr>
					</table>
				</td>
				<td class="vt" style="border-left: 1px solid #c7c7c7;;border-bottom:1px solid #c7c7c7">
					<table class="js_object_properties">
						<tr style="background-color:grey;font-weight:bold"><td class="tc"><div style="width:260px"><fmt:message key="pss.title.property"/></div></td></tr>
						<tr class="js_node_property" style="display:none">
							<td class="form_col">
								<div class="form_label" style="width:70px"><fmt:message key="pss.title.name"/></div>
								<div class="form_value" style="width:180px;padding-left:5px!important">
									<input type="text" name="txtNodeName" style="width:180px!important" class="fieldline js_input_node_name">
								</div>
							</td>
						</tr>
						<tr class="js_node_property" style="display:none">
							<td class="form_col">
								<div class="form_label" style="width:70px"><fmt:message key="pss.title.node_type"/></div>
								<div class="form_value" style="width:180px;padding-left:5px!important">								
									<select name="selNodeType" class="form_select_box js_select_node_type">
										<option value="product"><fmt:message key="pss.title.node.product"/></option>
										<option value="provider"><fmt:message key="pss.title.node.provider"/></option>
										<option value="touchPoint"><fmt:message key="pss.title.node.touch_point"/></option>
										<option value="user"><fmt:message key="pss.title.node.user"/></option>
									</select>
								</div>
							</td>
						</tr>
						<tr class="js_line_property" style="display:none">
							<td class="form_col">
								<div class="form_label" style="width:70px"><fmt:message key="pss.title.label"/></div>
								<div class="form_value" style="width:180px;padding-left:5px!important">
									<input type="text" name="txtLineLabel" style="width:180px!important" class="fieldline required js_input_line_label">
								</div>
							</td>
						</tr>
						<tr class="js_line_property" style="display:none">
							<td class="form_col">
								<div class="form_label" style="width:70px"><fmt:message key="pss.title.line_arrow"/></div>
								<div class="form_value" style="width:180px;padding-left:5px!important">
									<select name="selLineArrow" class="form_select_box js_select_line_arrow">
										<option value="0"><fmt:message key="pss.title.line_arrow.none"/></option>
										<option value="1"><fmt:message key="pss.title.line_arrow.end_only"/></option>
										<option value="2"><fmt:message key="pss.title.line_arrow.both"/></option>
									</select>
								</div>
							</td>
						</tr>
						<tr class="js_line_property" style="display:none">
							<td class="form_col">
								<div class="form_label" style="width:70px"><fmt:message key="pss.title.line_type"/></div>
								<div class="form_value" style="width:180px;padding-left:5px!important">
									<select name="selLineType" class="form_select_box js_select_line_type">
										<option value="0"><fmt:message key="pss.title.line_type.no_break"/></option>
										<option value="11"><fmt:message key="pss.title.line_type.left_one_break"/></option>
										<option value="12"><fmt:message key="pss.title.line_type.left_two_break"/></option>
										<option value="21"><fmt:message key="pss.title.line_type.right_one_break"/></option>
										<option value="22"><fmt:message key="pss.title.line_type.right_two_break"/></option>
									</select>
								</div>
							</td>
						</tr>
<!-- 						<tr class="js_line_property" style="display:none">
							<td class="form_col">
								<div class="form_label" style="width:70px">꺽임 정도</div>
								<div class="form_value" style="width:180px;padding-left:5px!important">
									<select name="selBreakLevel" class="form_select_box js_select_break_level">
										<option value="30">낮음</option>
										<option value="50">보통</option>
										<option value="70">높음</option>
									</select>
								</div>
							</td>
						</tr>
 -->					</table>
				</td>
			</tr>
		</table>
		<div class="js_diagram_vertical_resizer" style="height:24px"></div>
	<%}else{ %>
		<div class="js_context_diagram_target" psId="<%=psId%>"></div>
	<%} %>
</div>
<!-- 컨텐츠 레이아웃//-->
<script type="text/javascript">
$(function() {
	if(isEmpty(CD$CONTROLLERS)){
		ContextDiagram.draw({
			mode : <%if(isEditMode){%>CD$MODE_EDIT<%}else{%>CD$MODE_VIEW<%}%>,
			target : $('.js_context_diagram_target[psId="' + '<%=psId%>' + '"]'),
			jsonDataString : '<%=jsonDataString%>'
		});
	}else{
		ContextDiagram.draw({
			mode : <%if(isEditMode){%>CD$MODE_EDIT<%}else{%>CD$MODE_VIEW<%}%>,
			target : $('.js_context_diagram_target[psId="' + '<%=psId%>' + '"]'),
			jsonDataString : '<%=jsonDataString%>',
			reload : true 
		});
	}
});
</script>
