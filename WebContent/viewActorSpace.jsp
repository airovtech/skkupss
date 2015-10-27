<%@page import="net.smartworks.skkupss.model.ActorSpace"%>
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

	ActorSpace actorSpace = (ActorSpace)request.getAttribute("actorSpace");
	String psId = request.getParameter("psId");
	if(!SmartUtil.isBlankObject(psId)){

		ProductService productService = null;
		try{
			productService = ManagerFactory.getInstance().getServiceManager().getProductService(psId, ProductService.SPACE_TYPE_ACTOR);
		}catch(Exception e){}
		if(!SmartUtil.isBlankObject(productService)) actorSpace = productService.getActorSpace();
		
	}
	String isEditModeStr = request.getParameter("isEditMode");
	boolean isEditMode = SmartUtil.isBlankObject(isEditModeStr) || !isEditModeStr.equalsIgnoreCase("true") ? false : true;
	if(SmartUtil.isBlankObject(actorSpace)) actorSpace = new ActorSpace();;

	String jsonDataString = actorSpace.getDiagramData();
	String servitizationProcess = actorSpace.getServitizationProcess();
	
%>
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />
 	 
<!-- 컨텐츠 레이아웃-->
<div class="js_space_tab js_actor_space" spaceType="<%=ProductService.SPACE_TYPE_ACTOR%>">
	<%if(isEditMode){ %>
		<table>
			<tr>
				<td class="js_context_diagram_target" psId="<%=psId%>"></td>
				<td class="vt tc" style="border-left: 1px solid #c7c7c7;border-bottom:1px solid #c7c7c7">
					<table class="js_toggle_creation_tool" >
						<tr style="background-color:grey;font-weight:bold"><td class="tc"><fmt:message key="pss.title.creation_tool"/></td></tr>
						<tr>
							<td style="padding-right:15px">
								<img src="images/pss/node-product.png" style="width:30px;height:30px; padding:0 3px" />
								<a class="tc"  href="" toolId="11"><fmt:message key="pss.title.node"/></a>
							</td>
						</tr>
						<tr>
							<td>
								<img src="images/pss/edge-line.png" style="width:30px; padding:0 3px"/>
								<a class="tc" href="" toolId="21"><fmt:message key="pss.title.edge_line"/></a>
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
									<input type="text" name="selNodeType" style="width:180px!important" class="fieldline js_select_node_type">
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
	<!-- 스마트폼에서 해당 업무화면을 그려주는 곳 -->
	<form name="frmActorServitizationProcess" class="js_validation_required form_layout">
		<div class="js_new_actor_fields"></div>
	</form>
	
</div>
<!-- 컨텐츠 레이아웃//-->
<script type="text/javascript">
$(function() {
	if(isEmpty(AD$CONTROLLERS)){
		ActorDiagram.draw({
			mode : <%if(isEditMode){%>AD$MODE_EDIT<%}else{%>AD$MODE_VIEW<%}%>,
			target : $('.js_context_diagram_target[psId="' + '<%=psId%>' + '"]'),
			jsonDataString : '<%=jsonDataString%>'
		});
	}else{
		ActorDiagram.draw({
			mode : <%if(isEditMode){%>AD$MODE_EDIT<%}else{%>AD$MODE_VIEW<%}%>,
			target : $('.js_context_diagram_target[psId="' + '<%=psId%>' + '"]'),
			jsonDataString : '<%=jsonDataString%>',
			reload : true 
		});
	}

	var newActorFields = $('div.js_new_actor_fields');
	if(!isEmpty(newActorFields)) {
		var newActorField = $(newActorFields[0]);
		var gridRow = SmartWorks.GridLayout.newGridRow();
		var gridTable = SmartWorks.GridLayout.newGridTable();
		newActorField.html(gridTable.html(gridRow));
		
		SmartWorks.FormRuntime.RichEditorBuilder.buildEx({
			container: gridRow,
			fieldId: "txtServitizationProcess",
			fieldName: 'Servitization Process',
			columns: 1,
			required: true,
			value: "<%=servitizationProcess%>",
			readOnly: <%=!isEditMode%>			
		});
 		
 	}

});
</script>
