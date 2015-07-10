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
		<table>
			<tr>
				<td class="js_context_diagram_target" psId="<%=psId%>"></td>
				<td class="vt tc" style="border-left: 1px solid #c7c7c7;border-bottom:1px solid #c7c7c7">
					<table class="js_toggle_creation_tool" >
						<tr style="background-color:grey;font-weight:bold"><td class="tc">생성도구</td></tr>
						<tr>
							<td class="tc" >
								<a href="" toolId="11">제품</a>
							</td>
						</tr>
						<tr>
							<td class="tc" >
								<a href="" toolId="12">제공자</a>
							</td>
						</tr>
						<tr>
							<td class="tc" >
								<a href="" toolId="13">터치포인트</a>
							</td>
						</tr>
						<tr>
							<td class="tc" >
								<a href="" toolId="14">수혜자</a>
							</td>
						</tr>
						<tr>
							<td class="tc" >
								<a href="" toolId="21">연결라인</a>
							</td>
						</tr>
					</table>
				</td>
				<td class="vt" style="border-left: 1px solid #c7c7c7;;border-bottom:1px solid #c7c7c7">
					<table class="js_object_properties">
						<tr style="background-color:grey;font-weight:bold"><td class="tc"><div style="width:260px">항목속성</div></td></tr>
						<tr class="js_node_property" style="display:none">
							<td class="form_col">
								<div class="form_label" style="width:70px">이름</div>
								<div class="form_value" style="width:180px;padding-left:5px!important">
									<input type="text" name="txtNodeName" style="width:180px!important" class="fieldline required js_input_node_name">
								</div>
							</td>
						</tr>
						<tr class="js_node_property" style="display:none">
							<td class="form_col">
								<div class="form_label" style="width:70px">노드타입</div>
								<div class="form_value" style="width:180px;padding-left:5px!important">								
									<select name="selNodeType" class="form_select_box js_select_node_type">
										<option value="product">제품</option>
										<option value="provider">제공자</option>
										<option value="touchPoint">터치포인트</option>
										<option value="user">수혜자</option>
									</select>
								</div>
							</td>
						</tr>
						<tr class="js_line_property" style="display:none">
							<td class="form_col">
								<div class="form_label" style="width:70px">라벨</div>
								<div class="form_value" style="width:180px;padding-left:5px!important">
									<input type="text" name="txtLineLabel" style="width:180px!important" class="fieldline required js_input_line_label">
								</div>
							</td>
						</tr>
						<tr class="js_line_property" style="display:none">
							<td class="form_col">
								<div class="form_label" style="width:70px">연결선화살표</div>
								<div class="form_value" style="width:180px;padding-left:5px!important">
									<select name="selLineArrow" class="form_select_box js_select_line_arrow">
										<option value="0">없음</option>
										<option value="1">끝만 있음</option>
										<option value="2">둘다 있음</option>
									</select>
								</div>
							</td>
						</tr>
						<tr class="js_line_property" style="display:none">
							<td class="form_col">
								<div class="form_label" style="width:70px">연결선형식</div>
								<div class="form_value" style="width:180px;padding-left:5px!important">
									<select name="selLineType" class="form_select_box js_select_line_type">
										<option value="0">직선</option>
										<option value="11">좌측 한번 꺽임</option>
										<option value="12">좌측 두번 꺽임</option>
										<option value="21">우측 한번 꺽임</option>
										<option value="22">우측 두번 꺽임</option>
									</select>
								</div>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<ul>
		
		</ul>
	<%}else{ %>
		<div class="js_context_diagram_target" psId="<%=psId%>"></div>
	<%} %>
</div>
<!-- 컨텐츠 레이아웃//-->
<script type="text/javascript">
$(function() {
	ContextDiagram.draw({
		mode : <%if(isEditMode){%>CD$MODE_EDIT<%}else{%>CD$MODE_VIEW<%}%>,
		target : $('.js_context_diagram_target[psId="' + '<%=psId%>' + '"]'),
		jsonDataString : '<%=jsonDataString%>'
	});
});
</script>
