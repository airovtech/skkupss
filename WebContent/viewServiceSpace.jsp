<%@page import="net.smartworks.skkupss.model.User"%>
<%@page import="net.smartworks.factory.ManagerFactory"%>
<%@page import="net.smartworks.skkupss.model.ProductService"%>
<%@page import="net.smartworks.util.CommonUtil"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.ServiceSpace"%>
<%@page import="java.util.List" %>
<%@page import="java.util.ArrayList" %>
<%@page import="java.util.Iterator" %>
<%@page import="net.smartworks.skkupss.model.SBPService" %>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<link rel="stylesheet" href="/skkupss/css/addNew.css">

<%	
	SBPService sbpInfo = new SBPService();	// SBP 관련정보(SBPID) 담기 위한 변수.

	User cUser = SmartUtil.getCurrentUser();

	ServiceSpace serviceSpace = (ServiceSpace)request.getAttribute("serviceSpace");
	String psId = request.getParameter("psId");
	if(!SmartUtil.isBlankObject(psId)){
	
		ProductService productService = null;
		try{
			productService = ManagerFactory.getInstance().getServiceManager().getProductService(psId, ProductService.SPACE_TYPE_SERVICE);
			
			sbpInfo = ManagerFactory.getInstance().getServiceManager().getSBPService(psId);				// 관련된 SBP 정보를 가져온다. 
		}catch(Exception e){}
		if(!SmartUtil.isBlankObject(productService)) serviceSpace = productService.getServiceSpace();
	}
	
	String isEditModeStr = request.getParameter("isEditMode");
	boolean isEditMode = SmartUtil.isBlankObject(isEditModeStr) || !isEditModeStr.equalsIgnoreCase("true") ? false : true;
	if(SmartUtil.isBlankObject(serviceSpace)) serviceSpace = new ServiceSpace();

	String[] values = null;

	
	String sbpPrjName = sbpInfo.getSbpPrjName();
/*
 	Iterator<SBPService> it = sbpInfoList.iterator();										// 관련된 SBP프로젝트 정보를 추출하여 html태그로 만들어준다. 
	StringBuffer htmlCode = new StringBuffer();
 	String sbpPrjName = "";
	if(it.hasNext()) {																		// 관련된 SBP프로젝트가 있을경우
 		while(it.hasNext()) {
 			SBPService sbpInfo = new SBPService();
 			sbpInfo = it.next(); 
 			sbpPrjName = sbpInfo.getSbpPrjName();											// SBP 프로젝트 이름 추출하여 html코드에 활용한다. 
 		}
	} else{}																				// 관련된 SBP프로젝트가 없을경우
*/
 	%>
 	
<script>
	/* 연결된 activity가 있는 서비스컨셉을 볼 때 수정모드인지 아닌지 설정 */
	localStorage.setItem("editMode", "false");
</script>
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />
 	 
<!-- 컨텐츠 레이아웃-->
<div class="js_space_tab js_service_space" spaceType="<%=ProductService.SPACE_TYPE_SERVICE%>">
	<div class="js_dummy_element_item" style="display:none">
		<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:88px;font-size:11px">
			<span class="js_view_element_item" style="display:none">
				<span class="js_action_element_item"></span>
				<span class="edit_actions">
					<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
					<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
				</span>
			</span>
			<input class="fieldline js_edit_element_item" style="height:20px; display:inline-block; font-size:11px; background-color:white" type="text" value="">
		</div>
	</div>
	<table class="up tc originalServiceConceptTable" style="width:550px;min-height:200px; margin-left:auto; margin-right:auto; float:left;">
		<tr style="border-bottom: darkgray solid 8px;height:24px">
			<th class="tc" style="width:20%"><img src="images/pss/service-bullet.png" style="width: 24px;height: 24px;position: relative;top: 17px;"/></th>
			<th class="tc" style="width:20%"><img src="images/pss/service-bullet.png" style="width: 24px;height: 24px;position: relative;top: 17px;"/></th>
			<th class="tc" style="width:20%"><img src="images/pss/service-bullet.png" style="width: 24px;height: 24px;position: relative;top: 17px;"/></th>
			<th class="tc" style="width:20%"><img src="images/pss/service-bullet.png" style="width: 24px;height: 24px;position: relative;top: 17px;"/></th>
			<th class="tc" style="width:20%"><img src="images/pss/service-bullet.png" style="width: 24px;height: 24px;position: relative;top: 17px;"/></th>
		</tr>
		<tr>
			<td class="tc edit_action" style="height:100%">
				<div style="font-size:15px;font-weight:bold">SSPP</div>
				<div style="padding:5px">
					<%
						values = serviceSpace.getSspp();
						for(int i=0; values!=null && i<values.length; i++){
							String sbpName = ServiceSpace.ValueSbpInfoEach(values[i]); 
					%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Sspp" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:88px;font-size:11px" onmouseover="showEditBtn(this);" onmouseout="hideEditBtn(this);">
								<span class="icon_btn_connect <%if(!ServiceSpace.getValueSbpId(values[i]).equals("")){ %>icon_show_activity showSbpPrjList isdata<%} %>" style="cursor:pointer;"></span>
								<span class="js_view_element_item" <%if(!ServiceSpace.getValueSbpId(values[i]).equals("")){ %> style="margin-left:-20px;" <%} %>>
<!-- 수정모드 && 연결된 activity가 있을때 -->	<span class="serviceconceptlist <%if(isEditMode && !ServiceSpace.getValueSbpId(values[i]).equals("")){ %>js_action_element_item underline 			
											<%} else if(!ServiceSpace.getValueSbpId(values[i]).equals("")) {%> underline 
											<%} else if(isEditMode){ %> js_action_element_item  <%} %> svcSSPP svcSSPP<%=i %>"  svcNameNum="svcSSPP<%=i %>"
											sbpPrjName="<%=sbpPrjName %>" sbpName="<%=sbpName %>" sbpId="<%=ServiceSpace.getValueSbpId(values[i]) %>" psId="<%=psId%>" editMode="false" title="<%=ServiceSpace.getValueString(values[i]) %>" ><%=ServiceSpace.getValueHtml(values[i], sbpPrjName, "svcSSPP", isEditMode, psId, i, sbpName) %>
										</span>
									<%
									if(isEditMode){
									%>
										<span class="edit_actions">
											<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
											<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
										</span>
									<%
									}
									%>
								</span>
								<%
								if(isEditMode){
								%>
									<input class="fieldline js_edit_element_item" svcNameNum="svcSSPP<%=i %>" disconnectsbp="false" name="txtSsppItem" style="height:20px; display:none; font-size:11px; background-color:white" type="text" value="<%=ServiceSpace.getValueString(CommonUtil.toNotNull(values[i])) %>">
								<%
								}
								%>
							</div>
						<%
						}
						if(SmartUtil.isBlankObject(values) && isEditMode){
						%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Sspp" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:88px;font-size:11px">
								<span class="js_view_element_item" style="display:none">
									<span class="js_action_element_item"></span>
									<span class="edit_actions">
										<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
										<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
									</span>
								</span>
								<input class="fieldline js_edit_element_item" name="txtSsppItem" style="height:20px; display:inline-block; font-size:11px; background-color:white" type="text" value="">
							</div>
					<%
						}
					%>
				</div>
			</td>
			<td class="tc edit_action" style="height:100%">
				<div style="font-size:15px;font-weight:bold">SSPc</div>
				<div style="padding:5px;" >
					<%
						values = serviceSpace.getSsp();
						for(int i=0; values!=null && i<values.length; i++){
							String sbpName = ServiceSpace.ValueSbpInfoEach(values[i]); 
					%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Ssp" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:88px;font-size:11px" onmouseover="showEditBtn(this);" onmouseout="hideEditBtn(this);">
								<span class="icon_btn_connect <%if(!ServiceSpace.getValueSbpId(values[i]).equals("")){ %>icon_show_activity showSbpPrjList isdata<%} %>" style="cursor:pointer;"></span>
 								<span class="js_view_element_item" <%if(!ServiceSpace.getValueSbpId(values[i]).equals("")){ %> style="margin-left:-20px;" <%} %>>
									<span class="serviceconceptlist <%if(isEditMode && !ServiceSpace.getValueSbpId(values[i]).equals("")){ %>js_action_element_item underline 
										<%} else if(!ServiceSpace.getValueSbpId(values[i]).equals("")) {%> underline 
										<%} else if(isEditMode){ %> js_action_element_item  <%} %> svcSSPc svcSSPc<%=i %>" svcNameNum="svcSSPc<%=i %>"
										sbpPrjName="<%=sbpPrjName %>" sbpName="<%=sbpName %>" sbpId="<%=ServiceSpace.getValueSbpId(values[i]) %>"  psId="<%=psId%>" editMode="false" title="<%=ServiceSpace.getValueString(values[i]) %>" ><%=ServiceSpace.getValueHtml(values[i], sbpPrjName, "svcSSPc", isEditMode, psId, i, sbpName) %>
									</span>
									<%
									if(isEditMode){
									%>
										<span class="edit_actions">
											<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
											<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
										</span>
									<%
									}
									%>
								</span>
								<%
								if(isEditMode){
								%>
									<input class="fieldline js_edit_element_item" svcNameNum="svcSSPc<%=i %>" disconnectsbp="false" name="txtSspItem" style="height:20px; display:none; font-size:11px; background-color:white" type="text" value="<%=ServiceSpace.getValueString(CommonUtil.toNotNull(values[i])) %>">
								<%
								}
								%>
							</div>
						<%
						}
						if(SmartUtil.isBlankObject(values) && isEditMode){
						%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Ssp" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:88px;font-size:11px">
								<span class="js_view_element_item" style="display:none">
									<span class="js_action_element_item"></span>
									<span class="edit_actions">
										<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
										<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
									</span>
								</span>
								<input class="fieldline js_edit_element_item" name="txtSspItem" style="height:20px; display:inline-block; font-size:11px; background-color:white" type="text" value="">
							</div>
					<%
						}
					%>
				</div>
			</td>
			<td class="tc edit_action" style="height:100%">
				<div style="font-size:15px;font-weight:bold">SSPC</div>
				<div style="padding:5px">
					<%
						values = serviceSpace.getSspc();
						for(int i=0; values!=null && i<values.length; i++){
							String sbpName = ServiceSpace.ValueSbpInfoEach(values[i]); 
					%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Sspc" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:88px;font-size:11px" onmouseover="showEditBtn(this);" onmouseout="hideEditBtn(this);">
								<span class="icon_btn_connect <%if(!ServiceSpace.getValueSbpId(values[i]).equals("")){ %>icon_show_activity showSbpPrjList isdata<%} %>" style="cursor:pointer;"></span>
								<span class="js_view_element_item" <%if(!ServiceSpace.getValueSbpId(values[i]).equals("")){ %> style="margin-left:-20px;" <%} %>>
									<span class="serviceconceptlist <%if(isEditMode && !ServiceSpace.getValueSbpId(values[i]).equals("")){ %>js_action_element_item underline 
										<%} else if(!ServiceSpace.getValueSbpId(values[i]).equals("")) {%> underline 
										<%} else if(isEditMode){ %> js_action_element_item  <%} %> svcSSPC2 svcSSPC2<%=i %>"  svcNameNum="svcSSPC2<%=i %>"
										sbpPrjName="<%=sbpPrjName %>" sbpName="<%=sbpName %>" sbpId="<%=ServiceSpace.getValueSbpId(values[i]) %>" psId="<%=psId%>" editMode="false" title="<%=ServiceSpace.getValueString(values[i]) %>" ><%=ServiceSpace.getValueHtml(values[i], sbpPrjName, "svcSSPC2", isEditMode, psId, i, sbpName) %>
									</span>
									<%
									if(isEditMode){
									%>
										<span class="edit_actions">
											<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
											<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
										</span>
									<%
									}
									%>
								</span>
								<%
								if(isEditMode){
								%>
									<input class="fieldline js_edit_element_item" svcNameNum="svcSSPC2<%=i %>" disconnectsbp="false" name="txtSspcItem" style="height:20px; display:none; font-size:11px; background-color:white" type="text" value="<%=ServiceSpace.getValueString(CommonUtil.toNotNull(values[i])) %>">
								<%
								}
								%>
							</div>
						<%
						}
						if(SmartUtil.isBlankObject(values) && isEditMode){
						%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Sspc" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:88px;font-size:11px">
								<span class="js_view_element_item" style="display:none">
									<span class="js_action_element_item"></span>
									<span class="edit_actions">
										<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
										<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
									</span>
								</span>
								<input class="fieldline js_edit_element_item" name="txtSspcItem" style="height:20px; display:inline-block; font-size:11px; background-color:white" type="text" value="">
							</div>
					<%
						}
					%>
				</div>
			</td>
			<td class="tc edit_action" style="height:100%">
				<div style="font-size:15px;font-weight:bold">SSCp</div>
				<div style="padding:5px">
					<%
						values = serviceSpace.getSsc();
						for(int i=0; values!=null && i<values.length; i++){
							String sbpName = ServiceSpace.ValueSbpInfoEach(values[i]); 
					%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Ssc" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:88px;font-size:11px" onmouseover="showEditBtn(this);" onmouseout="hideEditBtn(this);">
								<span class="icon_btn_connect <%if(!ServiceSpace.getValueSbpId(values[i]).equals("")){ %>icon_show_activity showSbpPrjList isdata<%} %>" style="cursor:pointer;"></span>
								<span class="js_view_element_item" <%if(!ServiceSpace.getValueSbpId(values[i]).equals("")){ %> style="margin-left:-20px;" <%} %>>
									<span class="serviceconceptlist <%if(isEditMode && !ServiceSpace.getValueSbpId(values[i]).equals("")){ %>js_action_element_item underline 
										<%} else if(!ServiceSpace.getValueSbpId(values[i]).equals("")) {%> underline 
										<%} else if(isEditMode){ %> js_action_element_item  <%} %> svcSSCp svcSSCp<%=i %>"  svcNameNum="svcSSCp<%=i %>"
										sbpPrjName="<%=sbpPrjName %>" sbpName="<%=sbpName %>" sbpId="<%=ServiceSpace.getValueSbpId(values[i]) %>" psId="<%=psId%>" editMode="false" title="<%=ServiceSpace.getValueString(values[i]) %>" ><%=ServiceSpace.getValueHtml(values[i], sbpPrjName, "svcSSCp", isEditMode, psId, i, sbpName) %>
									</span>
									<%
									if(isEditMode){
									%>
										<span class="edit_actions">
											<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
											<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
										</span>
									<%
									}
									%>
								</span>
								<%
								if(isEditMode){
								%>
									<input class="fieldline js_edit_element_item" svcNameNum="svcSSCp<%=i %>" disconnectsbp="false" name="txtSscItem" style="height:20px; display:none; font-size:11px; background-color:white" type="text" value="<%=ServiceSpace.getValueString(CommonUtil.toNotNull(values[i])) %>">
								<%
								}
								%>
							</div>
						<%
						}
						if(SmartUtil.isBlankObject(values) && isEditMode){
						%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Ssc" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:88px;font-size:11px">
								<span class="js_view_element_item" style="display:none">
									<span class="js_action_element_item"></span>
									<span class="edit_actions">
										<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
										<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
									</span>
								</span>
								<input class="fieldline js_edit_element_item" name="txtSscItem" style="height:20px; display:inline-block; font-size:11px; background-color:white" type="text" value="">
							</div>
					<%
						}
					%>
				</div>
			</td>
			<td class="tc edit_action" style="height:100%">
				<div style="font-size:15px;font-weight:bold">SSCC</div>
				<div style="padding:5px">
					<%
						values = serviceSpace.getSscc();
						for(int i=0; values!=null && i<values.length; i++){
							String sbpName = ServiceSpace.ValueSbpInfoEach(values[i]); 
					%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Sscc" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:88px;font-size:11px" onmouseover="showEditBtn(this);" onmouseout="hideEditBtn(this);">
								<span class="icon_btn_connect <%if(!ServiceSpace.getValueSbpId(values[i]).equals("")){ %>icon_show_activity showSbpPrjList isdata<%} %>" style="cursor:pointer;"></span>
								<span class="js_view_element_item" <%if(!ServiceSpace.getValueSbpId(values[i]).equals("")){ %> style="margin-left:-20px;" <%} %>>
									<span class="serviceconceptlist <%if(isEditMode && !ServiceSpace.getValueSbpId(values[i]).equals("")){ %>js_action_element_item underline 
										<%} else if(!ServiceSpace.getValueSbpId(values[i]).equals("")) {%> underline 
										<%} else if(isEditMode){ %> js_action_element_item  <%} %> svcSSCC svcSSCC<%=i %>" svcNameNum="svcSSCC<%=i %>"  
										sbpPrjName="<%=sbpPrjName %>" sbpName="<%=sbpName %>" sbpId="<%=ServiceSpace.getValueSbpId(values[i]) %>" psId="<%=psId%>" editMode="false" title="<%=ServiceSpace.getValueString(values[i]) %>" ><%=ServiceSpace.getValueHtml(values[i], sbpPrjName, "svcSSCC", isEditMode, psId, i, sbpName) %>
									</span>
									<%
									if(isEditMode){
									%>
										<span class="edit_actions">
											<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
											<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
										</span>
									<%
									}
									%>
								</span>
								<%
								if(isEditMode){
								%>
									<input class="fieldline js_edit_element_item" svcNameNum="svcSSCC<%=i %>" disconnectsbp="false" name="txtSsccItem" style="height:20px; display:none; font-size:11px; background-color:white" type="text" value="<%=ServiceSpace.getValueString(CommonUtil.toNotNull(values[i])) %>">
								<%
								}
								%>
							</div>
						<%
						}
						if(SmartUtil.isBlankObject(values) && isEditMode){
						%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Sscc" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:88px;font-size:11px">
								<span class="js_view_element_item" style="display:none">
									<span class="js_action_element_item"></span>
									<span class="edit_actions">
										<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
										<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
									</span>
								</span>
								<input class="fieldline js_edit_element_item" name="txtSsccItem" style="height:20px; display:inline-block; font-size:11px; background-color:white" type="text" value="">
							</div>
					<%
						}
					%>
				</div>
			</td>
		</tr>
		<tr>
			<td colspan="5">
				<span class="btn_gray show-svc-list-btn" style="cursor:pointer; margin:0 0 0 3px; float:right;">
					<span class="txt_btn_start"></span>
					<span class="txt_btn_center morefullname">더보기</span>
					<span class="txt_btn_end"></span>
				</span>
				<span class="btn_gray show-all-activities" style="cursor:pointer; margin:0 0 0 3px; float:right;" psId="<%=psId%>">
					<span class="txt_btn_start"></span>
					<span class="txt_btn_center">모두보기</span>
					<span class="txt_btn_end"></span>
				</span>
			<%if(isEditMode) { %>
				<span class="btn_gray connect-sbp" style="cursor:pointer; margin:0 0 0 3px; float:right;">
					<span class="txt_btn_start"></span>
					<span class="txt_btn_center blueprintmode">블루프린트 연결모드</span>
					<span class="txt_btn_end"></span>
				</span>
			<%} %>
			</td>
		</tr>
	</table>
</div>

<script>
	/* 서비스컨셉에 대한 정보가 수정될 때 데이터를 상황에 맞게 채워준다. */
	function settingValue() {
		var element, newValue, oldvalue, index, disconnectsbp, indexFirst, indexLast, impl;
		<% 
			values = serviceSpace.getSspp(); 
			for(int i=0; values!=null && i<values.length; i++){
		%>
			element = $("input[svcnamenum=svcSSPP" + <%=i%> + "]");
			newValue = element.attr("value");
			disconnectsbp = element.attr("disconnectsbp");
			oldValue = "<%=values[i]%>";
			index = oldValue.indexOf("||{")
			if(index != -1 && (disconnectsbp=="false")) {
				indexFirst = oldValue.indexOf("title:");
				impl = oldValue.substring(indexFirst);
				indexLast = impl.indexOf(",");
				impl = oldValue.substring(indexFirst, indexFirst + indexLast);				
				oldValue = oldValue.replace(impl, "title:" + newValue);
				oldValue = oldValue.substring(index);
				newValue = newValue + oldValue;
			} 
			element.attr("value", newValue);
		<%
			}
			values = serviceSpace.getSsp(); 
			for(int i=0; values!=null && i<values.length; i++){
		%>
			element = $("input[svcnamenum=svcSSPc" + <%=i%> + "]");
			newValue = element.attr("value");
			disconnectsbp = element.attr("disconnectsbp");
			oldValue = "<%=values[i]%>";
			index = oldValue.indexOf("||{")
			if(index != -1 && (disconnectsbp=="false")) {
				indexFirst = oldValue.indexOf("title:");
				impl = oldValue.substring(indexFirst);
				indexLast = impl.indexOf(",");
				impl = oldValue.substring(indexFirst, indexFirst + indexLast);				
				oldValue = oldValue.replace(impl, "title:" + newValue);
				oldValue = oldValue.substring(index);
				newValue = newValue + oldValue;
			} 
			element.attr("value", newValue);
		<%
			}
			values = serviceSpace.getSspc(); 
			for(int i=0; values!=null && i<values.length; i++){
		%>
			element = $("input[svcnamenum=svcSSPC2" + <%=i%> + "]");
			newValue = element.attr("value");
			disconnectsbp = element.attr("disconnectsbp");
			oldValue = "<%=values[i]%>";
			index = oldValue.indexOf("||{")
			if(index != -1 && (disconnectsbp=="false")) {
				indexFirst = oldValue.indexOf("title:");
				impl = oldValue.substring(indexFirst);
				indexLast = impl.indexOf(",");
				impl = oldValue.substring(indexFirst, indexFirst + indexLast);				
				oldValue = oldValue.replace(impl, "title:" + newValue);
				oldValue = oldValue.substring(index);
				newValue = newValue + oldValue;
			} 
			element.attr("value", newValue);
		<%
			}
			values = serviceSpace.getSsc(); 
			for(int i=0; values!=null && i<values.length; i++){
		%>
			element = $("input[svcnamenum=svcSSCp" + <%=i%> + "]");
			newValue = element.attr("value");
			disconnectsbp = element.attr("disconnectsbp");
			oldValue = "<%=values[i]%>";
			index = oldValue.indexOf("||{")
			if(index != -1 && (disconnectsbp=="false")) {
				indexFirst = oldValue.indexOf("title:");
				impl = oldValue.substring(indexFirst);
				indexLast = impl.indexOf(",");
				impl = oldValue.substring(indexFirst, indexFirst + indexLast);				
				oldValue = oldValue.replace(impl, "title:" + newValue);
				oldValue = oldValue.substring(index);
				newValue = newValue + oldValue;
			} 
			element.attr("value", newValue);
		<%
			}
			values = serviceSpace.getSscc(); 
			for(int i=0; values!=null && i<values.length; i++){
		%>
			element = $("input[svcnamenum=svcSSCC" + <%=i%> + "]");
			newValue = element.attr("value");
			disconnectsbp = element.attr("disconnectsbp");
			oldValue = "<%=values[i]%>";
			index = oldValue.indexOf("||{")
			if(index != -1 && (disconnectsbp=="false")) {
				indexFirst = oldValue.indexOf("title:");
				impl = oldValue.substring(indexFirst);
				indexLast = impl.indexOf(",");
				impl = oldValue.substring(indexFirst, indexFirst + indexLast);				
				oldValue = oldValue.replace(impl, "title:" + newValue);
				oldValue = oldValue.substring(index);
				newValue = newValue + oldValue;
			} 
			element.attr("value", newValue);
		<%
			}
		%>
	}
			
	/* 블루프린트와 연결해주는 버튼을 보여준다. */
	function showEditBtn(self) {
		var status = localStorage.getItem("editMode");
		if(status == "true") {
			$(self).children("span").first().css("display", "block");
			$(self).children("span").eq(1).css("margin-left", -20);
		}
	}
	/* 블루프린트와 연결해주는 버튼을 숨긴다.  */
	function hideEditBtn(self) {		
		var status = localStorage.getItem("editMode");
		if(status == "true") {
			$(self).children("span").first().css("display", "none");
			$(self).children("span").eq(1).css("margin-left", 11);
		}
	}
			
	
	/* 테이블(서비스컨셉 보여주는)의 위치를 중앙으로 맞춰준다.  */
	var state = "hide";
	var spaceWidth = $(".js_space_view_target").css("width").replace("px", "");
	var tableWidth = $(".originalServiceConceptTable").css("width").replace("px", "");
	var newTableWidth = $(".svc-all-list").css("width").replace("px", "");
	spaceWidth = parseInt(spaceWidth);
	tableWidth = parseInt(tableWidth);
	newTableWidth = parseInt(newTableWidth);
	$(".originalServiceConceptTable").css("margin-left", (spaceWidth - tableWidth)/2);
	
	/* 테이블이 잘리는 현상으로 높이조절 */
	var formHeight = $(".originalServiceConceptTable").css("height").replace("px", "");
	formHeight = parseInt(formHeight) + 5;
//	$(".js_space_view_target").css("height", formHeight);
	
	/* 새로운테이블(서비스컨셉 풀네임 보이는)의 높이를 조정해준다. */
	$(".svc-all-list-form").css("height", formHeight-5);
</script>
<div class="svc-all-list-form" style="overflow-x:hidden; overflow-y:scroll;">
	<table class="up tc svc-all-list" style="width:auto; min-height:200px;  margin-right:auto; float:left; display:none;" >
		<tr>
			<td class="tc edit_action" style="height:100%">
				<div style="padding:5px; margin:15px 0 0 0;">
					<img src="images/pss/service-bullet.png" style="width: 24px;height: 24px;position: relative; margin-top:-7px"/>
					<span style="font-size:15px;font-weight:bold; top:5px">SSPP</span>
					<%
						values = serviceSpace.getSspp();
						for(int i=0; values!=null && i<values.length; i++){
							String sbpName = ServiceSpace.ValueSbpInfoEach(values[i]); 
					%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Sspp" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:150px;font-size:11px">
								<span class="js_view_element_item">
		<!-- 수정모드 && 연결된 activity가 있을때 -->	<span class="<%if(isEditMode && !ServiceSpace.getValueSbpId(values[i]).equals("")){ %>js_action_element_item underline 			
											<%} else if(!ServiceSpace.getValueSbpId(values[i]).equals("")) {%> underline 
											<%} else if(isEditMode){ %> js_action_element_item  <%} %> svcSSPP svcSSPP<%=i %>"  svcNameNum="svcSSPP<%=i %>"
											sbpPrjName="<%=sbpPrjName %>" sbpName="<%=sbpName %>" sbpId="<%=ServiceSpace.getValueSbpId(values[i]) %>" psId="<%=psId%>" <%if(isEditMode) {%> editMode="true"<%} else {%> editMode="false" <% }%> title="<%=ServiceSpace.getValueString(values[i]) %>" ><%=ServiceSpace.getValueHtml(values[i], sbpPrjName, "svcSSPP", isEditMode, psId, i, sbpName) %>
										</span>
									<%
									if(isEditMode){
									%>
										<span class="edit_actions">
											<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
											<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
										</span>
									<%
									}
									%>
								</span>
	
							</div>
						<%
						}
						if(SmartUtil.isBlankObject(values) && isEditMode){
						%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Sspp" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:150px;font-size:11px">
								<span class="js_view_element_item" style="display:none">
									<span class="js_action_element_item"></span>
									<span class="edit_actions">
										<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
										<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
									</span>
								</span>
								<input class="fieldline js_edit_element_item" name="txtSsppItem" style="height:20px; display:inline-block; font-size:11px; background-color:white" type="text" value="">
							</div>
					<%
						}
					%>
				</div>
	
				<div style="padding:5px;" >
					<img src="images/pss/service-bullet.png" style="width: 24px;height: 24px;position: relative; margin-top:-7px"/>
					<span style="font-size:15px;font-weight:bold; top:5px">SSPc</span>
					<%
						values = serviceSpace.getSsp();
						for(int i=0; values!=null && i<values.length; i++){
							String sbpName = ServiceSpace.ValueSbpInfoEach(values[i]); 
					%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Ssp" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:150px;font-size:11px">
									<span class="js_view_element_item" >
									<span class="<%if(isEditMode && !ServiceSpace.getValueSbpId(values[i]).equals("")){ %>js_action_element_item underline 
										<%} else if(!ServiceSpace.getValueSbpId(values[i]).equals("")) {%> underline 
										<%} else if(isEditMode){ %> js_action_element_item  <%} %> svcSSPc svcSSPc<%=i %>" svcNameNum="svcSSPc<%=i %>"
										sbpPrjName="<%=sbpPrjName %>" sbpName="<%=sbpName %>" sbpId="<%=ServiceSpace.getValueSbpId(values[i]) %>"  psId="<%=psId%>" <%if(isEditMode) {%> editMode="true"<%} else {%> editMode="false" <% }%> title="<%=ServiceSpace.getValueString(values[i]) %>" ><%=ServiceSpace.getValueHtml(values[i], sbpPrjName, "svcSSPc", isEditMode, psId, i, sbpName) %>
									</span>
									<%
									if(isEditMode){
									%>
										<span class="edit_actions">
											<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
											<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
										</span>
									<%
									}
									%>
								</span>
							</div>
						<%
						}
						if(SmartUtil.isBlankObject(values) && isEditMode){
						%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Ssp" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:150px;font-size:11px">
								<span class="js_view_element_item" style="display:none">
									<span class="js_action_element_item"></span>
									<span class="edit_actions">
										<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
										<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
									</span>
								</span>
								<input class="fieldline js_edit_element_item" name="txtSspItem" style="height:20px; display:inline-block; font-size:11px; background-color:white" type="text" value="">
							</div>
					<%
						}
					%>
				</div>
	
				<div style="padding:5px">
					<img src="images/pss/service-bullet.png" style="width: 24px;height: 24px;position: relative; margin-top:-7px"/>
					<span style="font-size:15px;font-weight:bold; top:5px">SSPC</span>
					<%
						values = serviceSpace.getSspc();
						for(int i=0; values!=null && i<values.length; i++){
							String sbpName = ServiceSpace.ValueSbpInfoEach(values[i]); 
					%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Sspc" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:150px;font-size:11px">
								<span class="js_view_element_item">
									<span class="<%if(isEditMode && !ServiceSpace.getValueSbpId(values[i]).equals("")){ %>js_action_element_item underline 
										<%} else if(!ServiceSpace.getValueSbpId(values[i]).equals("")) {%> underline 
										<%} else if(isEditMode){ %> js_action_element_item  <%} %> svcSSPC2 svcSSPC2<%=i %>"  svcNameNum="svcSSPC2<%=i %>"
										sbpPrjName="<%=sbpPrjName %>" sbpName="<%=sbpName %>" sbpId="<%=ServiceSpace.getValueSbpId(values[i]) %>" psId="<%=psId%>" <%if(isEditMode) {%> editMode="true"<%} else {%> editMode="false" <% }%> title="<%=ServiceSpace.getValueString(values[i]) %>" ><%=ServiceSpace.getValueHtml(values[i], sbpPrjName, "svcSSPC2", isEditMode, psId, i, sbpName) %>
									</span>
									<%
									if(isEditMode){
									%>
										<span class="edit_actions">
											<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
											<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
										</span>
									<%
									}
									%>
								</span>
							</div>
						<%
						}
						if(SmartUtil.isBlankObject(values) && isEditMode){
						%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Sspc" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:150px;font-size:11px">
								<span class="js_view_element_item" style="display:none">
									<span class="js_action_element_item"></span>
									<span class="edit_actions">
										<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
										<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
									</span>
								</span>
								<input class="fieldline js_edit_element_item" name="txtSspcItem" style="height:20px; display:inline-block; font-size:11px; background-color:white" type="text" value="">
							</div>
					<%
						}
					%>
				</div>
	
				<div style="padding:5px">
					<img src="images/pss/service-bullet.png" style="width: 24px;height: 24px;position: relative; margin-top:-7px"/>
					<span style="font-size:15px;font-weight:bold; top:5px">SSCp</span>
					<%
						values = serviceSpace.getSsc();
						for(int i=0; values!=null && i<values.length; i++){
							String sbpName = ServiceSpace.ValueSbpInfoEach(values[i]); 
					%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Ssc" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:150px;font-size:11px">
								<span class="js_view_element_item">
									<span class="<%if(isEditMode && !ServiceSpace.getValueSbpId(values[i]).equals("")){ %>js_action_element_item underline 
										<%} else if(!ServiceSpace.getValueSbpId(values[i]).equals("")) {%> underline 
										<%} else if(isEditMode){ %> js_action_element_item  <%} %> svcSSCp svcSSCp<%=i %>"  svcNameNum="svcSSCp<%=i %>"
										sbpPrjName="<%=sbpPrjName %>" sbpName="<%=sbpName %>" sbpId="<%=ServiceSpace.getValueSbpId(values[i]) %>" psId="<%=psId%>" <%if(isEditMode) {%> editMode="true"<%} else {%> editMode="false" <% }%> title="<%=ServiceSpace.getValueString(values[i]) %>" ><%=ServiceSpace.getValueHtml(values[i], sbpPrjName, "svcSSCp", isEditMode, psId, i, sbpName) %>
									</span>
									<%
									if(isEditMode){
									%>
										<span class="edit_actions">
											<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
											<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
										</span>
									<%
									}
									%>
								</span>
							</div>
						<%
						}
						if(SmartUtil.isBlankObject(values) && isEditMode){
						%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Ssc" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:150px;font-size:11px">
								<span class="js_view_element_item" style="display:none">
									<span class="js_action_element_item"></span>
									<span class="edit_actions">
										<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
										<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
									</span>
								</span>
								<input class="fieldline js_edit_element_item" name="txtSscItem" style="height:20px; display:inline-block; font-size:11px; background-color:white" type="text" value="">
							</div>
					<%
						}
					%>
				</div>
	
				<div style="padding:5px">
					<img src="images/pss/service-bullet.png" style="width: 24px;height: 24px;position: relative; margin-top:-7px"/>
					<span style="font-size:15px;font-weight:bold; top:5px">SSCC</span>
					<%
						values = serviceSpace.getSscc();
						for(int i=0; values!=null && i<values.length; i++){
							String sbpName = ServiceSpace.ValueSbpInfoEach(values[i]); 
					%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Sscc" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:150px;font-size:11px">
								<span class="js_view_element_item">
									<span class="<%if(isEditMode && !ServiceSpace.getValueSbpId(values[i]).equals("")){ %>js_action_element_item underline 
										<%} else if(!ServiceSpace.getValueSbpId(values[i]).equals("")) {%> underline 
										<%} else if(isEditMode){ %> js_action_element_item  <%} %> svcSSCC svcSSCC<%=i %>" svcNameNum="svcSSCC<%=i %>"  
										sbpPrjName="<%=sbpPrjName %>" sbpName="<%=sbpName %>" sbpId="<%=ServiceSpace.getValueSbpId(values[i]) %>" psId="<%=psId%>" <%if(isEditMode) {%> editMode="true"<%} else {%> editMode="false" <% }%> title="<%=ServiceSpace.getValueString(values[i]) %>" ><%=ServiceSpace.getValueHtml(values[i], sbpPrjName, "svcSSCC", isEditMode, psId, i, sbpName) %>
									</span>
									<%
									if(isEditMode){
									%>
										<span class="edit_actions">
											<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
											<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
										</span>
									<%
									}
									%>
								</span>
							</div>
						<%
						}
						if(SmartUtil.isBlankObject(values) && isEditMode){
						%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Sscc" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:150px;font-size:11px">
								<span class="js_view_element_item" style="display:none">
									<span class="js_action_element_item"></span>
									<span class="edit_actions">
										<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
										<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
									</span>
								</span>
								<input class="fieldline js_edit_element_item" name="txtSsccItem" style="height:20px; display:inline-block; font-size:11px; background-color:white" type="text" value="">
							</div>
					<%
						}
					%>
				</div>
			</td>
		</tr>
	</table>
</div>

<div class="showPSSDForm" style="clear:both; display:none;">
<div class="solid_line"></div>
	<div class="showPSSD">
	</div>
</div>
<!-- 컨텐츠 레이아웃//-->