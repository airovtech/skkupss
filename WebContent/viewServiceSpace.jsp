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
	<table class="up tc" style="width:550px;min-height:200px;margin-left:auto;margin-right:auto;">
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
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Sspp" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:88px;font-size:11px">
								<span class="js_view_element_item">
<!-- 수정모드 && 연결된 activity가 있을때 -->	<span class="<%if(isEditMode && !ServiceSpace.getValueSbpId(values[i]).equals("")){ %>js_action_element_item serviceConcept showSbpPrjList			
											<%} else if(!ServiceSpace.getValueSbpId(values[i]).equals("")) {%> serviceConcept showSbpPrjList
											<%} else if(isEditMode){ %> js_action_element_item serviceConcept2 showSbpPrjList<%} %> svcSSPP svcSSPP<%=i %>"  svcNameNum="svcSSPP<%=i %>"
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
								<%
								if(isEditMode){
								%>
									<input class="fieldline js_edit_element_item" svcNameNum="svcSSPP<%=i %>" name="txtSsppItem" style="height:20px; display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(values[i]) %>">
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
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Ssp" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:88px;font-size:11px">
 								<span class="js_view_element_item" >
									<span class="<%if(isEditMode && !ServiceSpace.getValueSbpId(values[i]).equals("")){ %>js_action_element_item serviceConcept showSbpPrjList
										<%} else if(!ServiceSpace.getValueSbpId(values[i]).equals("")) {%> serviceConcept showSbpPrjList
										<%} else if(isEditMode){ %> js_action_element_item serviceConcept2 showSbpPrjList<%} %> svcSSPc svcSSPc<%=i %>" svcNameNum="svcSSPc<%=i %>"
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
								<%
								if(isEditMode){
								%>
									<input class="fieldline js_edit_element_item" svcNameNum="svcSSPc<%=i %>" name="txtSspItem" style="height:20px; display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(values[i]) %>">
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
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Sspc" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:88px;font-size:11px">
								<span class="js_view_element_item">
									<span class="<%if(isEditMode && !ServiceSpace.getValueSbpId(values[i]).equals("")){ %>js_action_element_item serviceConcept showSbpPrjList
										<%} else if(!ServiceSpace.getValueSbpId(values[i]).equals("")) {%> serviceConcept showSbpPrjList
										<%} else if(isEditMode){ %> js_action_element_item serviceConcept2 showSbpPrjList<%} %> svcSSPC2 svcSSPC2<%=i %>"  svcNameNum="svcSSPC2<%=i %>"
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
								<%
								if(isEditMode){
								%>
									<input class="fieldline js_edit_element_item" svcNameNum="svcSSPC2<%=i %>" name="txtSspcItem" style="height:20px; display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(values[i]) %>">
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
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Ssc" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:88px;font-size:11px">
								<span class="js_view_element_item">
									<span class="<%if(isEditMode && !ServiceSpace.getValueSbpId(values[i]).equals("")){ %>js_action_element_item serviceConcept showSbpPrjList
										<%} else if(!ServiceSpace.getValueSbpId(values[i]).equals("")) {%> serviceConcept showSbpPrjList
										<%} else if(isEditMode){ %> js_action_element_item serviceConcept2 showSbpPrjList<%} %> svcSSCp svcSSCp<%=i %>"  svcNameNum="svcSSCp<%=i %>"
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
								<%
								if(isEditMode){
								%>
									<input class="fieldline js_edit_element_item" svcNameNum="svcSSCp<%=i %>" name="txtSscItem" style="height:20px; display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(values[i]) %>">
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
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Sscc" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:88px;font-size:11px">
								<span class="js_view_element_item">
									<span class="<%if(isEditMode && !ServiceSpace.getValueSbpId(values[i]).equals("")){ %>js_action_element_item serviceConcept showSbpPrjList
										<%} else if(!ServiceSpace.getValueSbpId(values[i]).equals("")) {%> serviceConcept showSbpPrjList
										<%} else if(isEditMode){ %> js_action_element_item serviceConcept2 showSbpPrjList<%} %> svcSSCC svcSSCC<%=i %>" svcNameNum="svcSSCC<%=i %>"  
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
								<%
								if(isEditMode){
								%>
									<input class="fieldline js_edit_element_item" svcNameNum="svcSSCC<%=i %>" name="txtSsccItem" style="height:20px; display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(values[i]) %>">
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
	</table>
</div>
<!-- 컨텐츠 레이아웃//-->