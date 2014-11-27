<%@page import="net.smartworks.factory.ManagerFactory"%>
<%@page import="net.smartworks.skkupss.model.ProductService"%>
<%@page import="net.smartworks.util.CommonUtil"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.ServiceSpace"%>
<%@ page contentType="text/html; charset=utf-8"%>

<%
	ServiceSpace serviceSpace = (ServiceSpace)request.getAttribute("serviceSpace");
	String psId = request.getParameter("psId");
	if(SmartUtil.isBlankObject(serviceSpace) && !SmartUtil.isBlankObject(psId)){
	
		ProductService productService = null;
		try{
			productService = ManagerFactory.getInstance().getServiceManager().getProductService(psId, ProductService.SPACE_TYPE_SERVICE);
		}catch(Exception e){}
		if(!SmartUtil.isBlankObject(productService)) serviceSpace = productService.getServiceSpace();
	}
	
	String isEditModeStr = request.getParameter("isEditMode");
	boolean isEditMode = SmartUtil.isBlankObject(isEditModeStr) || !isEditModeStr.equalsIgnoreCase("true") ? false : true;
	if(SmartUtil.isBlankObject(serviceSpace)) serviceSpace = new ServiceSpace();

	String[] values = null;
%>
 	 
<!-- 컨텐츠 레이아웃-->
<div class="js_space_tab js_service_space" spaceType="<%=ProductService.SPACE_TYPE_SERVICE%>">
	<div class="js_dummy_element_item" style="display:none">
		<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:88px;font-size:11px">
			<span class="js_view_element_item" style="display:none">
				<span class="js_action_element_item"></span>
				<span class="edit_actions">
					<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
					<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
				</span>
			</span>
			<input class="fieldline js_edit_element_item" style="height:20px; display:inline-block; font-size:11px; background-color:white" type="text" value="">
		</div>
	</div>
	<table class="up tc" style="width:500px;min-height:200px">
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
					%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Sspp" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:88px;font-size:11px">
								<span class="js_view_element_item">
									<span class="<%if(isEditMode){ %>js_action_element_item<%}%>" title="<%=CommonUtil.toNotNull(values[i]) %>"><%=CommonUtil.toNotNull(values[i]) %></span>
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
									<input class="fieldline js_edit_element_item" name="txtSsppItem" style="height:20px; display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(values[i]) %>">
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
										<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
										<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
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
				<div style="padding:5px">
					<%
						values = serviceSpace.getSsp();
						for(int i=0; values!=null && i<values.length; i++){
					%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Ssp" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:88px;font-size:11px">
								<span class="js_view_element_item">
									<span class="<%if(isEditMode){ %>js_action_element_item<%}%>" title="<%=CommonUtil.toNotNull(values[i]) %>"><%=CommonUtil.toNotNull(values[i]) %></span>
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
									<input class="fieldline js_edit_element_item" name="txtSspItem" style="height:20px; display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(values[i]) %>">
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
										<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
										<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
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
					%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Sspc" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:88px;font-size:11px">
								<span class="js_view_element_item">
									<span class="<%if(isEditMode){ %>js_action_element_item<%}%>" title="<%=CommonUtil.toNotNull(values[i]) %>"><%=CommonUtil.toNotNull(values[i]) %></span>
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
									<input class="fieldline js_edit_element_item" name="txtSspcItem" style="height:20px; display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(values[i]) %>">
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
										<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
										<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
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
					%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Ssc" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:88px;font-size:11px">
								<span class="js_view_element_item">
									<span class="<%if(isEditMode){ %>js_action_element_item<%}%>" title="<%=CommonUtil.toNotNull(values[i]) %>"><%=CommonUtil.toNotNull(values[i]) %></span>
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
									<input class="fieldline js_edit_element_item" name="txtSscItem" style="height:20px; display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(values[i]) %>">
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
										<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
										<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
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
					%>
							<div class="edit_item <%if(isEditMode){ %>service_item<%} %> js_element_item" itemName="Sscc" style="height:24px; overflow:hidden; border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:88px;font-size:11px">
								<span class="js_view_element_item">
									<span class="<%if(isEditMode){ %>js_action_element_item<%}%>" title="<%=CommonUtil.toNotNull(values[i]) %>"><%=CommonUtil.toNotNull(values[i]) %></span>
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
									<input class="fieldline js_edit_element_item" name="txtSsccItem" style="height:20px; display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(values[i]) %>">
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
										<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
										<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
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
