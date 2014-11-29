<%@page import="net.smartworks.factory.ManagerFactory"%>
<%@page import="net.smartworks.skkupss.model.ProductService"%>
<%@page import="net.smartworks.skkupss.model.BizModelSpace"%>
<%@page import="net.smartworks.util.CommonUtil"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.ServiceSpace"%>
<%@ page contentType="text/html; charset=utf-8"%>

<%

	BizModelSpace bizModelSpace = (BizModelSpace)request.getAttribute("bizModelSpace");
	String psId = request.getParameter("psId");
	if(SmartUtil.isBlankObject(bizModelSpace) && !SmartUtil.isBlankObject(psId)){
	
		ProductService productService = null;
		try{
			productService = ManagerFactory.getInstance().getServiceManager().getProductService(psId, ProductService.SPACE_TYPE_BIZ_MODEL);
		}catch(Exception e){}
		if(!SmartUtil.isBlankObject(productService)) bizModelSpace = productService.getBizModelSpace();
	}
	
	String isEditModeStr = request.getParameter("isEditMode");
	boolean isEditMode = SmartUtil.isBlankObject(isEditModeStr) || !isEditModeStr.equalsIgnoreCase("true") ? false : true;
	if(SmartUtil.isBlankObject(bizModelSpace)) bizModelSpace = new BizModelSpace();;

	String visHidden = null;
	String[] values = null;
	String[] userValues = null;
%>
 	 
<!-- 컨텐츠 레이아웃-->
<div class="js_space_tab js_biz_model_space" spaceType="<%=ProductService.SPACE_TYPE_BIZ_MODEL%>">
	<div class="js_dummy_element_item" style="display:none">
		<div class="js_element_item" style="color:blue;font-size:11px">
			<div class="edit_item js_view_element_item">
				<span class="js_action_element_item"></span>
				<span class="edit_actions">
					<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
					<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
				</span>
			</div>
			<input class="fieldline js_edit_element_item" name="" style="width:85px; display:inline-block; font-size:11px; background-color:white" type="text" value="">
		</div>
	</div>
	<div class="js_dummy_select_item" style="display:none">
		<select class="js_select_element_item" itemName="KeyPartners" style="display:inline-block; font-size:11px;width:18px">
			<option></option>
			<option>R&D Contract</option>
			<option>Design Collaboration</option>
			<option>Joint Distribution</option>
			<option>Cross Servicing</option>
			<option>Shared Investement</option>
			<option>Cross Promotion</option>
			<option>Sub contractor network</option>
		</select>
		<select class="js_select_element_item" itemName="KeyActivities" style="display:inline-block; font-size:11px;width:18px">
			<option></option>
			<option>Added Service</option>
			<option>Service Productization</option>
			<option>Standardization</option>
			<option>Economies of Scale</option>
			<option>Economies of Scope</option>
			<option>No Frill</option>
			<option>Lean Mfg</option>
			<option>Responsiveness</option>
			<option>Vertical Integration</option>
			<option>Self Service</option>
			<option>Peer to Peer</option>
		</select>
		<select class="js_select_element_item" itemName="KeyResources" style="display:inline-block; font-size:11px;width:18px">
			<option></option>
			<option>Recycle</option>
			<option>Crowdsourcing</option>
			<option>Open Innovation</option>
			<option>Outsourcing</option>
			<option>Alliance</option>
			<option>Platform Utilization</option>
			<option>Brand Leverage</option>
			<option>Merge & Acquisition</option>
		</select>
		<select class="js_select_element_item" itemName="CustomerRelationships" style="display:inline-block; font-size:11px;width:18px">
			<option></option>
			<option>Customer Participation</option>
			<option>Reward</option>
			<option>Upgrade</option>
			<option>Blockbuster Marketing</option>
			<option>Life-cycle Care</option>
			<option>Customization</option>
			<option>Education</option>
			<option>Community</option>
			<option>Social Network</option>
			<option>Membership</option>
			<option>Network Effect</option>
		</select>
		<select class="js_select_element_item" itemName="Channels" style="display:inline-block; font-size:11px;width:18px">
			<option></option>
			<option>Experience Shop</option>
			<option>Shop in Shop</option>
			<option>Delivery</option>
			<option>Sales Person</option>
			<option>Road Shop (Booth)</option>
			<option>홈쇼핑/카탈로그</option>
			<option>Internet (mobile)</option>
			<option>Intermediation</option>
			<option>Disintermediation</option>
			<option>Channel Sharing</option>
			<option>Franchise</option>
		</select>
		<select class="js_select_element_item" itemName="CustomerSegments" style="display:inline-block; font-size:11px;width:18px">
			<option></option>
			<option>Segment Expansion</option>
			<option>Geographical Expansion</option>
			<option>Long-Tail Targeting</option>
			<option>Niche Targeting</option>
			<option>Premium Targeting</option>
			<option>Low-price Targeting</option>
			<option>공익고려 Targeting</option>
			<option>Environmental Targeting</option>
			<option>2-sided Targeting</option>
		</select>
		<select class="js_select_element_item" itemName="CostStructure" style="display:inline-block; font-size:11px;width:18px">
			<option></option>
		</select>
		<select class="js_select_element_item" itemName="RevenueStreams" style="display:inline-block; font-size:11px;width:18px">
			<option></option>
			<option>Pay per Unit (use)</option>
			<option>Subscription</option>
			<option>Razor Blade</option>
			<option>Ad-based</option>
			<option>Freemium</option>
			<option>Donation</option>
			<option>Commission</option>
			<option>Loyalty</option>
			<option>Subsidiary</option>
			<option>Pay as you want</option>
			<option>Pay per use</option>
		</select>
	</div>
	<table class="tc" style="width:600px;height:300px;border: 1px solid #c7c7c7;padding: 0;">
		<tr>
			<th class="r_line" style="width:20%; border-bottom:none">
				<div class="fl" style="font-size:11px; font-style:italic;line-height: 11px;color: gray;text-align: left;">Key<br>Partners</div>
				<img class="fr" src="images/pss/biz-model/key-partners.png" style="height:70%"/>
			</th>
			<th class="r_line" style="width:20%; border-bottom:none">
				<div class="fl" style="font-size:11px; font-style:italic;line-height: 11px;color: gray;text-align: left;">Key<br>Activities</div>
				<img class="fr" src="images/pss/biz-model/key-activities.png" style="height:70%"/>
			</th>
			<th class="r_line" style="width:20%; border-bottom:none">
				<div class="fl" style="font-size:11px; font-style:italic;line-height: 11px;color: gray;text-align: left;">Value<br>Proposition</div>
				<img class="fr" src="images/pss/biz-model/value-proposition.png" style="height:70%"/>
			</th>
			<th class="r_line" style="width:20%; border-bottom:none">
				<div class="fl" style="font-size:11px; font-style:italic;line-height: 11px;color: gray;text-align: left;">Customer<br>Relationships</div>
				<img class="fr" src="images/pss/biz-model/customer-relationships.png" style="height:70%"/>
			</th>
			<th style="width:20%; border-bottom:none">
				<div class="fl" style="font-size:11px; font-style:italic;line-height: 11px;color: gray;text-align: left;">Customer<br>Segments</div>
				<img class="fr" src="images/pss/biz-model/customer-segments.png" style="height:70%"/>
			</th>
		</tr>
		<tr>
			<td class="tc vm r_line edit_action" style="height:100%">
				<%
					values = bizModelSpace.getKeyPartners();
					for(int i=0; values!=null && i<values.length; i++){
				%>
						<div class="js_element_item" itemName="KeyPartners" style="color:red;font-size:11px">
							<div class="edit_item js_view_element_item">
								<span class="<%if(isEditMode){ %>js_action_element_item<%}%>"><%=CommonUtil.toNotNull(values[i]) %></span>
								<%
								if(isEditMode){
								%>
									<span class="edit_actions" style="position:absolute">
										<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
										<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
									</span>
								<%
								}
								%>
							</div>
							<%
							if(isEditMode){
							%>
								<select class="js_select_element_item" name="txtKeyPartnersItem" style="display:none; font-size:11px;width:110px">
									<option></option>
									<option <%if(values[i].equals("R&D Contract")){ %>selected<%} %>>R&D Contract</option>
									<option <%if(values[i].equals("Design Collaboration")){ %>selected<%} %>>Design Collaboration</option>
									<option <%if(values[i].equals("Joint Distribution")){ %>selected<%} %>>Joint Distribution</option>
									<option <%if(values[i].equals("Cross Servicing")){ %>selected<%} %>>Cross Servicing</option>
									<option <%if(values[i].equals("Shared Investement")){ %>selected<%} %>>Shared Investement</option>
									<option <%if(values[i].equals("Cross Promotion")){ %>selected<%} %>>Cross Promotion</option>
									<option <%if(values[i].equals("Sub contractor network")){ %>selected<%} %>>Sub contractor network</option>
								</select>
							<%
							}
							%>
						</div>
				<%
					}
					userValues = bizModelSpace.getKeyPartnersUser();
					for(int i=0; userValues!=null && i<userValues.length; i++){
				%>
						<div class="js_element_item" itemName="KeyPartners" style="color:blue;font-size:11px">
							<div class="edit_item js_view_element_item">
								<span class="<%if(isEditMode){ %>js_action_element_item<%}%>"><%=CommonUtil.toNotNull(userValues[i]) %></span>
								<%
								if(isEditMode){
								%>
									<span class="edit_actions" style="position:absolute">
										<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
										<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
									</span>
								<%
								}
								%>
							</div>
							<%
							if(isEditMode){
							%>
								<input class="fieldline js_edit_element_item" name="txtKeyPartnersUserItem" style="display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(userValues[i]) %>">
							<%
							}
							%>
						</div>
				<%
					}
					visHidden = (SmartUtil.isBlankObject(values) && SmartUtil.isBlankObject(userValues) && isEditMode) ? "" : ";visibility:hidden";
				%>
					<div class="js_element_item" itemName="KeyPartners" style="color:blue;font-size:11px<%=visHidden%>">
						<div class="edit_item js_view_element_item" style="display:none">
							<span class="js_action_element_item"></span>
							<span class="edit_actions" style="position:absolute">
								<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
								<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
							</span>
						</div>
						<input class="fieldline js_edit_element_item" name="" style="width:85px; display:inline-block; font-size:11px; background-color:white" type="text" value="">
						<select class="js_select_element_item" name="" style="display:inline-block; font-size:11px;width:18px">
							<option></option>
							<option>R&D Contract</option>
							<option>Design Collaboration</option>
							<option>Joint Distribution</option>
							<option>Cross Servicing</option>
							<option>Shared Investement</option>
							<option>Cross Promotion</option>
							<option>Sub contractor network</option>
						</select>
					</div>
			</td>
			
			
			<td class="tc r_line edit_action" style="height:100%;padding:0">
				<div class="vm" style="padding:4px 5px;height:110px;overflow:auto">
					<%
						values = bizModelSpace.getKeyActivities();
						for(int i=0; values!=null && i<values.length; i++){
					%>
						<div class="js_element_item" itemName="KeyActivities" style="color:red;font-size:11px">
							<div class="edit_item js_view_element_item">
								<span class="<%if(isEditMode){ %>js_action_element_item<%}%>"><%=CommonUtil.toNotNull(values[i]) %></span>
								<%
								if(isEditMode){
								%>
									<span class="edit_actions" style="position:absolute">
										<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
										<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
									</span>
								<%
								}
								%>
							</div>
							<%
							if(isEditMode){
							%>
								<select class="js_select_element_item" name="txtKeyActivitiesItem" style="display:none; font-size:11px;width:110px">
									<option></option>
									<option <%if(values[i].equals("Added Service")){ %>selected<%} %>>Added Service</option>
									<option <%if(values[i].equals("Service Productization")){ %>selected<%} %>>Service Productization</option>
									<option <%if(values[i].equals("Standardization")){ %>selected<%} %>>Standardization</option>
									<option <%if(values[i].equals("Economies of Scale")){ %>selected<%} %>>Economies of Scale</option>
									<option <%if(values[i].equals("Economies of Scope")){ %>selected<%} %>>Economies of Scope</option>
									<option <%if(values[i].equals("No Frill")){ %>selected<%} %>>No Frill</option>
									<option <%if(values[i].equals("Lean Mfg")){ %>selected<%} %>>Lean Mfg</option>
									<option <%if(values[i].equals("Responsiveness")){ %>selected<%} %>>Responsiveness</option>
									<option <%if(values[i].equals("Vertical Integration")){ %>selected<%} %>>Vertical Integration</option>
									<option <%if(values[i].equals("Self Service")){ %>selected<%} %>>Self Service</option>
									<option <%if(values[i].equals("Peer to Peer")){ %>selected<%} %>>Peer to Peer</option>
								</select>
							<%
							}
							%>
						</div>
					<%
						}
						userValues = bizModelSpace.getKeyActivitiesUser();
						for(int i=0; userValues!=null && i<userValues.length; i++){
					%>
						<div class="js_element_item" itemName="KeyActivities" style="color:blue;font-size:11px">
							<div class="edit_item js_view_element_item">
								<span class="<%if(isEditMode){ %>js_action_element_item<%}%>"><%=CommonUtil.toNotNull(userValues[i]) %></span>
								<%
								if(isEditMode){
								%>
									<span class="edit_actions" style="position:absolute">
										<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
										<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
									</span>
								<%
								}
								%>
							</div>
							<%
							if(isEditMode){
							%>
								<input class="fieldline js_edit_element_item" name="txtKeyActivitiesUserItem" style="display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(userValues[i]) %>">
							<%
							}
							%>
						</div>
				<%
					}
					visHidden = (SmartUtil.isBlankObject(values) && SmartUtil.isBlankObject(userValues) && isEditMode) ? "" : ";visibility:hidden";
				%>
					<div class="js_element_item" itemName="KeyActivities" style="color:blue;font-size:11px<%=visHidden%>">
						<div class="edit_item js_view_element_item" style="display:none">
							<span class="js_action_element_item"></span>
							<span class="edit_actions" style="position:absolute">
								<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
								<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
							</span>
						</div>
						<input class="fieldline js_edit_element_item" name="" style="width:85px; display:inline-block; font-size:11px; background-color:white" type="text" value="">
						<select class="js_select_element_item" name="" style="display:inline-block; font-size:11px;width:18px">
							<option></option>
							<option>Added Service</option>
							<option>Service Productization</option>
							<option>Standardization</option>
							<option>Economies of Scale</option>
							<option>Economies of Scope</option>
							<option>No Frill</option>
							<option>Lean Mfg</option>
							<option>Responsiveness</option>
							<option>Vertical Integration</option>
							<option>Self Service</option>
							<option>Peer to Peer</option>
						</select>
					</div>
				</div>
				<div style="height:27px;border-top: 1px solid #c7c7c7;padding:2px">
					<div class="fl" style="font-size:11px; font-style:italic;line-height: 11px;color: gray;text-align: left;">Key<br>Resources</div>
					<img class="fr" src="images/pss/biz-model/key-resources.png" style="height:70%"/>
				</div>
				<div class="vm"  style="padding:4px 5px;height:110px;overflow:auto">
					<%
						values = bizModelSpace.getKeyResources();
						for(int i=0; values!=null && i<values.length; i++){
					%>
						<div class="js_element_item" itemName="KeyResources" style="color:red;font-size:11px">
							<div class="edit_item js_view_element_item">
								<span class="<%if(isEditMode){ %>js_action_element_item<%}%>"><%=CommonUtil.toNotNull(values[i]) %></span>
								<%
								if(isEditMode){
								%>
									<span class="edit_actions" style="position:absolute">
										<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
										<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
									</span>
								<%
								}
								%>
							</div>
							<%
							if(isEditMode){
							%>
								<select class="js_select_element_item" name="txtKeyResourcesItem" style="display:none; font-size:11px;width:110px">
									<option></option>
									<option <%if(values[i].equals("Recycle")){ %>selected<%} %>>Recycle</option>
									<option <%if(values[i].equals("Crowdsourcing")){ %>selected<%} %>>Crowdsourcing</option>
									<option <%if(values[i].equals("Open Innovation")){ %>selected<%} %>>Open Innovation</option>
									<option <%if(values[i].equals("Outsourcing")){ %>selected<%} %>>Outsourcing</option>
									<option <%if(values[i].equals("Alliance")){ %>selected<%} %>>Alliance</option>
									<option <%if(values[i].equals("Platform Utilization")){ %>selected<%} %>>Platform Utilization</option>
									<option <%if(values[i].equals("Brand Leverage")){ %>selected<%} %>>Brand Leverage</option>
									<option <%if(values[i].equals("Merge & Acquisition")){ %>selected<%} %>>Merge & Acquisition</option>
								</select>
							<%
							}
							%>
						</div>
					<%
						}
						userValues = bizModelSpace.getKeyResourcesUser();
						for(int i=0; userValues!=null && i<userValues.length; i++){
					%>
						<div class="js_element_item" itemName="KeyResources" style="color:blue;font-size:11px">
							<div class="edit_item js_view_element_item">
								<span class="<%if(isEditMode){ %>js_action_element_item<%}%>"><%=CommonUtil.toNotNull(userValues[i]) %></span>
								<%
								if(isEditMode){
								%>
									<span class="edit_actions" style="position:absolute">
										<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
										<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
									</span>
								<%
								}
								%>
							</div>
							<%
							if(isEditMode){
							%>
								<input class="fieldline js_edit_element_item" name="txtKeyResourcesUserItem" style="display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(userValues[i]) %>">
							<%
							}
							%>
						</div>
					<%
						}
						visHidden = (SmartUtil.isBlankObject(values) && SmartUtil.isBlankObject(userValues) && isEditMode) ? "" : ";visibility:hidden";
					%>
						<div class="js_element_item" itemName="KeyResources" style="color:blue;font-size:11px<%=visHidden%>">
							<div class="edit_item js_view_element_item" style="display:none">
								<span class="js_action_element_item"></span>
								<span class="edit_actions" style="position:absolute">
									<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
									<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
								</span>
							</div>
							<input class="fieldline js_edit_element_item" name="" style="width:85px; display:inline-block; font-size:11px; background-color:white" type="text" value="">
							<select class="js_select_element_item" name="" style="display:inline-block; font-size:11px;width:18px">
								<option></option>
								<option>Recycle</option>
								<option>Crowdsourcing</option>
								<option>Open Innovation</option>
								<option>Outsourcing</option>
								<option>Alliance</option>
								<option>Platform Utilization</option>
								<option>Brand Leverage</option>
								<option>Merge & Acquisition</option>
							</select>
						</div>
				</div>
			</td>
			<td class="tc vm r_line edit_action" style="height:100%">
				<%
					userValues = bizModelSpace.getValuePropositionsUser();
					for(int i=0; userValues!=null && i<userValues.length; i++){
				%>
						<div class="js_element_item" itemName="ValuePropositions" style="color:blue;font-size:11px">
							<div class="edit_item js_view_element_item">
								<span class="<%if(isEditMode){ %>js_action_element_item<%}%>"><%=CommonUtil.toNotNull(userValues[i]) %></span>
								<%
								if(isEditMode){
								%>
									<span class="edit_actions" style="position:absolute">
										<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
										<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
									</span>
								<%
								}
								%>
							</div>
							<%
							if(isEditMode){
							%>
								<input class="fieldline js_edit_element_item" name="txtValuePropositionsUserItem" style="display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(userValues[i]) %>">
							<%
							}
							%>
						</div>
				<%
					}
					visHidden = (SmartUtil.isBlankObject(userValues) && isEditMode) ? "" : ";visibility:hidden";
				%>
					<div class="js_element_item" itemName="ValuePropositions" style="color:blue;font-size:11px<%=visHidden%>">
						<div class="edit_item js_view_element_item" style="display:none">
							<span class="js_action_element_item"></span>
							<span class="edit_actions" style="position:absolute">
								<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
								<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
							</span>
						</div>
						<input class="fieldline js_edit_element_item" name="" style="width:110px; display:inline-block; font-size:11px; background-color:white" type="text" value="">
					</div>
			</td>
			<td class="tc r_line edit_action" style="height:100%;padding:0">
				<div class="vm" style="padding:4px 5px;height:110px;overflow:auto">
					<%
						values = bizModelSpace.getCustomerRelationships();
						for(int i=0; values!=null && i<values.length; i++){
					%>
						<div class="js_element_item" itemName="CustomerRelationships" style="color:red;font-size:11px">
							<div class="edit_item js_view_element_item">
								<span class="<%if(isEditMode){ %>js_action_element_item<%}%>"><%=CommonUtil.toNotNull(values[i]) %></span>
								<%
								if(isEditMode){
								%>
									<span class="edit_actions" style="position:absolute">
										<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
										<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
									</span>
								<%
								}
								%>
							</div>
							<%
							if(isEditMode){
							%>
								<select class="js_select_element_item" name="txtCustomerRelationshipsItem" style="display:none; font-size:11px;width:110px">
									<option></option>
									<option <%if(values[i].equals("Customer Participation")){ %>selected<%} %>>Customer Participation</option>
									<option <%if(values[i].equals("Reward")){ %>selected<%} %>>Reward</option>
									<option <%if(values[i].equals("Upgrade")){ %>selected<%} %>>Upgrade</option>
									<option <%if(values[i].equals("Blockbuster Marketing")){ %>selected<%} %>>Blockbuster Marketing</option>
									<option <%if(values[i].equals("Life-cycle Care")){ %>selected<%} %>>Life-cycle Care</option>
									<option <%if(values[i].equals("Customization")){ %>selected<%} %>>Customization</option>
									<option <%if(values[i].equals("Education")){ %>selected<%} %>>Education</option>
									<option <%if(values[i].equals("Community")){ %>selected<%} %>>Community</option>
									<option <%if(values[i].equals("Social Network")){ %>selected<%} %>>Social Network</option>
									<option <%if(values[i].equals("Membership")){ %>selected<%} %>>Membership</option>
									<option <%if(values[i].equals("Network Effect")){ %>selected<%} %>>Network Effect</option>
								</select>
							<%
							}
							%>
						</div>
					<%
						}
						userValues = bizModelSpace.getCustomerRelationshipsUser();
						for(int i=0; userValues!=null && i<userValues.length; i++){
					%>
						<div class="js_element_item" itemName="CustomerRelationships" style="color:blue;font-size:11px">
							<div class="edit_item js_view_element_item">
								<span class="<%if(isEditMode){ %>js_action_element_item<%}%>"><%=CommonUtil.toNotNull(userValues[i]) %></span>
								<%
								if(isEditMode){
								%>
									<span class="edit_actions" style="position:absolute">
										<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
										<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
									</span>
								<%
								}
								%>
							</div>
							<%
							if(isEditMode){
							%>
								<input class="fieldline js_edit_element_item" name="txtCustomerRelationshipsUserItem" style="display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(userValues[i]) %>">
							<%
							}
							%>
						</div>
					<%
						}
						visHidden = (SmartUtil.isBlankObject(values) && SmartUtil.isBlankObject(userValues) && isEditMode) ? "" : ";visibility:hidden";
					%>
						<div class="js_element_item" itemName="CustomerRelationships" style="color:blue;font-size:11px<%=visHidden%>">
							<div class="edit_item js_view_element_item" style="display:none">
								<span class="js_action_element_item"></span>
								<span class="edit_actions" style="position:absolute">
									<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
									<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
								</span>
							</div>
							<input class="fieldline js_edit_element_item" name="" style="width:85px; display:inline-block; font-size:11px; background-color:white" type="text" value="">
							<select class="js_select_element_item" name="" style="display:inline-block; font-size:11px;width:18px">
								<option></option>
								<option>Customer Participation</option>
								<option>Reward</option>
								<option>Upgrade</option>
								<option>Blockbuster Marketing</option>
								<option>Life-cycle Care</option>
								<option>Customization</option>
								<option>Education</option>
								<option>Community</option>
								<option>Social Network</option>
								<option>Membership</option>
								<option>Network Effect</option>
							</select>
						</div>
				</div>
				<div style="height:27px;border-top: 1px solid #c7c7c7;padding:2px">
					<div class="fl" style="font-size:11px; font-style:italic;line-height: 11px;color: gray;text-align: left;">Channels</div>
					<img class="fr" src="images/pss/biz-model/channels.png" style="height:70%"/>
				</div>
				<div class="vm" style="padding:4px 5px;height:110px;overflow:auto">
					<%
						values = bizModelSpace.getChannels();
						for(int i=0; values!=null && i<values.length; i++){
					%>
						<div class="js_element_item" itemName="Channels" style="color:red;font-size:11px">
							<div class="edit_item js_view_element_item">
								<span class="<%if(isEditMode){ %>js_action_element_item<%}%>"><%=CommonUtil.toNotNull(values[i]) %></span>
								<%
								if(isEditMode){
								%>
									<span class="edit_actions" style="position:absolute">
										<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
										<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
									</span>
								<%
								}
								%>
							</div>
							<%
							if(isEditMode){
							%>
								<select class="js_select_element_item" name="txtChannelsItem" style="display:none; font-size:11px;width:110px">
									<option></option>
									<option <%if(values[i].equals("Experience Shop")){ %>selected<%} %>>Experience Shop</option>
									<option <%if(values[i].equals("Shop in Shop")){ %>selected<%} %>>Shop in Shop</option>
									<option <%if(values[i].equals("Delivery")){ %>selected<%} %>>Delivery</option>
									<option <%if(values[i].equals("Sales Person")){ %>selected<%} %>>Sales Person</option>
									<option <%if(values[i].equals("Road Shop (Booth)")){ %>selected<%} %>>Road Shop (Booth)</option>
									<option <%if(values[i].equals("홈쇼핑/카탈로그")){ %>selected<%} %>>홈쇼핑/카탈로그</option>
									<option <%if(values[i].equals("Internet (mobile)")){ %>selected<%} %>>Internet (mobile)</option>
									<option <%if(values[i].equals("Intermediation")){ %>selected<%} %>>Intermediation</option>
									<option <%if(values[i].equals("Disintermediation")){ %>selected<%} %>>Disintermediation</option>
									<option <%if(values[i].equals("Channel Sharing")){ %>selected<%} %>>Channel Sharing</option>
									<option <%if(values[i].equals("Franchise")){ %>selected<%} %>>Franchise</option>
								</select>
							<%
							}
							%>
						</div>
					<%
						}
						userValues = bizModelSpace.getChannelsUser();
						for(int i=0; userValues!=null && i<userValues.length; i++){
					%>
						<div class="js_element_item" itemName="Channels" style="color:blue;font-size:11px">
							<div class="edit_item js_view_element_item">
								<span class="<%if(isEditMode){ %>js_action_element_item<%}%>"><%=CommonUtil.toNotNull(userValues[i]) %></span>
								<%
								if(isEditMode){
								%>
									<span class="edit_actions" style="position:absolute">
										<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
										<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
									</span>
								<%
								}
								%>
							</div>
							<%
							if(isEditMode){
							%>
								<input class="fieldline js_edit_element_item" name="txtChannelsUserItem" style="display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(userValues[i]) %>">
							<%
							}
							%>
						</div>
					<%
						}
						visHidden = (SmartUtil.isBlankObject(values) && SmartUtil.isBlankObject(userValues) && isEditMode) ? "" : ";visibility:hidden";
					%>
						<div class="js_element_item" itemName="Channels" style="color:blue;font-size:11px<%=visHidden%>">
							<div class="edit_item js_view_element_item" style="display:none">
								<span class="js_action_element_item"></span>
								<span class="edit_actions" style="position:absolute">
									<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
									<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
								</span>
							</div>
							<input class="fieldline js_edit_element_item" name="" style="width:85px; display:inline-block; font-size:11px; background-color:white" type="text" value="">
							<select class="js_select_element_item" name="" style="display:inline-block; font-size:11px;width:18px">
								<option></option>
								<option>Experience Shop</option>
								<option>Shop in Shop</option>
								<option>Delivery</option>
								<option>Sales Person</option>
								<option>Road Shop (Booth)</option>
								<option>홈쇼핑/카탈로그</option>
								<option>Internet (mobile)</option>
								<option>Intermediation</option>
								<option>Disintermediation</option>
								<option>Channel Sharing</option>
								<option>Franchise</option>
							</select>
						</div>
				</div>
			</td>
			<td class="tc vm edit_action" style="height:100%">
				<%
					values = bizModelSpace.getCustomerSegments();
					for(int i=0; values!=null && i<values.length; i++){
				%>
						<div class="js_element_item" itemName="CustomerSegments" style="color:red;font-size:11px">
							<div class="edit_item js_view_element_item">
								<span class="<%if(isEditMode){ %>js_action_element_item<%}%>"><%=CommonUtil.toNotNull(values[i]) %></span>
								<%
								if(isEditMode){
								%>
									<span class="edit_actions" style="position:absolute">
										<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
										<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
									</span>
								<%
								}
								%>
							</div>
							<%
							if(isEditMode){
							%>
								<select class="js_select_element_item" name="txtCustomerSegmentsItem" style="display:none; font-size:11px;width:110px">
									<option></option>
									<option <%if(values[i].equals("Segment Expansion")){ %>selected<%} %>>Segment Expansion</option>
									<option <%if(values[i].equals("Geographical Expansion")){ %>selected<%} %>>Geographical Expansion</option>
									<option <%if(values[i].equals("Long-Tail Targeting")){ %>selected<%} %>>Long-Tail Targeting</option>
									<option <%if(values[i].equals("Niche Targeting")){ %>selected<%} %>>Niche Targeting</option>
									<option <%if(values[i].equals("Premium Targeting")){ %>selected<%} %>>Premium Targeting</option>
									<option <%if(values[i].equals("Low-price Targeting")){ %>selected<%} %>>Low-price Targeting</option>
									<option <%if(values[i].equals("공익고려 Targeting")){ %>selected<%} %>>공익고려 Targeting</option>
									<option <%if(values[i].equals("Environmental Targeting")){ %>selected<%} %>>Environmental Targeting</option>
									<option <%if(values[i].equals("2-sided Targeting")){ %>selected<%} %>>2-sided Targeting</option>
								</select>
							<%
							}
							%>
						</div>
				<%
					}
					userValues = bizModelSpace.getCustomerSegmentsUser();
					for(int i=0; userValues!=null && i<userValues.length; i++){
				%>
						<div class="js_element_item" itemName="CustomerSegments" style="color:blue;font-size:11px">
							<div class="edit_item js_view_element_item">
								<span class="<%if(isEditMode){ %>js_action_element_item<%}%>"><%=CommonUtil.toNotNull(userValues[i]) %></span>
								<%
								if(isEditMode){
								%>
									<span class="edit_actions" style="position:absolute">
										<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
										<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
									</span>
								<%
								}
								%>
							</div>
							<%
							if(isEditMode){
							%>
								<input class="fieldline js_edit_element_item" name="txtCustomerSegmentsUserItem" style="display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(userValues[i]) %>">
							<%
							}
							%>
						</div>
				<%
					}
					visHidden = (SmartUtil.isBlankObject(values) && SmartUtil.isBlankObject(userValues) && isEditMode) ? "" : ";visibility:hidden";
				%>
					<div class="js_element_item" itemName="CustomerSegments" style="color:blue;font-size:11px<%=visHidden%>">
						<div class="edit_item js_view_element_item" style="display:none">
							<span class="js_action_element_item"></span>
							<span class="edit_actions" style="position:absolute">
								<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
								<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
							</span>
						</div>
						<input class="fieldline js_edit_element_item" name="" style="width:85px; display:inline-block; font-size:11px; background-color:white" type="text" value="">
						<select class="js_select_element_item" name="" style="display:inline-block; font-size:11px;width:18px">
							<option></option>
							<option>Segment Expansion</option>
							<option>Geographical Expansion</option>
							<option>Long-Tail Targeting</option>
							<option>Niche Targeting</option>
							<option>Premium Targeting</option>
							<option>Low-price Targeting</option>
							<option>공익고려 Targeting</option>
							<option>Environmental Targeting</option>
							<option>2-sided Targeting</option>
						</select>
					</div>
			</td>
		</tr>
	</table>
	<table class="tc" style="width:600px;height:100px;border-left: 1px solid #c7c7c7;border-right: 1px solid #c7c7c7;border-bottom: 1px solid #c7c7c7;padding: 0;">
		<tr>
			<th class="r_line" style="width:50%; border-bottom:none">
				<div class="fl" style="font-size:11px; font-style:italic;line-height: 11px;color: gray;text-align: left;">Cost<br>Structure</div>
				<img class="fr" src="images/pss/biz-model/cost-structure.png" style="height:70%"/>
			</th>
			<th style="width:50%; border-bottom:none">
				<div class="fl" style="font-size:11px; font-style:italic;line-height: 11px;color: gray;text-align: left;">Revenue<br>Streams</div>
				<img class="fr" src="images/pss/biz-model/revenue-streams.png" style="height:70%"/>
			</th>
		</tr>
		<tr>
			<td class="tc vm r_line edit_action" style="height:100%;overflow:auto">
				<%
					values = bizModelSpace.getCostStructure();
					for(int i=0; values!=null && i<values.length; i++){
				%>
						<div class="js_element_item" itemName="CostStructure" style="color:red;font-size:11px">
							<div class="edit_item js_view_element_item">
								<span class="<%if(isEditMode){ %>js_action_element_item<%}%>"><%=CommonUtil.toNotNull(values[i]) %></span>
								<%
								if(isEditMode){
								%>
									<span class="edit_actions" style="position:absolute">
										<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
										<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
									</span>
								<%
								}
								%>
							</div>
							<%
							if(isEditMode){
							%>
								<select class="js_select_element_item" name="txtCostStructureItem" style="display:none; font-size:11px;width:110px">
									<option <%if(values[i].equals("")){ %>selected<%} %>></option>
								</select>
							<%
							}
							%>
						</div>
				<%
					}
					userValues = bizModelSpace.getCostStructureUser();
					for(int i=0; userValues!=null && i<userValues.length; i++){
				%>
						<div class="js_element_item" itemName="CostStructure" style="color:blue;font-size:11px">
							<div class="edit_item js_view_element_item">
								<span class="<%if(isEditMode){ %>js_action_element_item<%}%>"><%=CommonUtil.toNotNull(userValues[i]) %></span>
								<%
								if(isEditMode){
								%>
									<span class="edit_actions" style="position:absolute">
										<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
										<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
									</span>
								<%
								}
								%>
							</div>
							<%
							if(isEditMode){
							%>
								<input class="fieldline js_edit_element_item" name="txtCostStructureUserItem" style="display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(userValues[i]) %>">
							<%
							}
							%>
						</div>
				<%
					}
					visHidden = (SmartUtil.isBlankObject(values) && SmartUtil.isBlankObject(userValues) && isEditMode) ? "" : ";visibility:hidden";
				%>
					<div class="js_element_item" itemName="CostStructure" style="color:blue;font-size:11px<%=visHidden%>">
						<div class="edit_item js_view_element_item" style="display:none">
							<span class="js_action_element_item"></span>
							<span class="edit_actions" style="position:absolute">
								<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
								<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
							</span>
						</div>
						<input class="fieldline js_edit_element_item" name="" style="width:85px; display:inline-block; font-size:11px; background-color:white" type="text" value="">
						<select class="js_select_element_item" name="" style="display:inline-block; font-size:11px;width:18px">
							<option></option>
						</select>
					</div>
			</td>
			<td class="tc vm edit_action" style="height:100%;overflow:auto">
				<%
					values = bizModelSpace.getRevenueStreams();
					for(int i=0; values!=null && i<values.length; i++){
				%>
						<div class="js_element_item" itemName="RevenueStreams" style="color:red;font-size:11px">
							<div class="edit_item js_view_element_item">
								<span class="<%if(isEditMode){ %>js_action_element_item<%}%>"><%=CommonUtil.toNotNull(values[i]) %></span>
								<%
								if(isEditMode){
								%>
									<span class="edit_actions" style="position:absolute">
										<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
										<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
									</span>
								<%
								}
								%>
							</div>
							<%
							if(isEditMode){
							%>
								<select class="js_select_element_item" name="txtRevenueStreamsItem" style="display:none; font-size:11px;width:110px">
									<option></option>
									<option <%if(values[i].equals("Pay per Unit (use)")){ %>selected<%} %>>Pay per Unit (use)</option>
									<option <%if(values[i].equals("Subscription")){ %>selected<%} %>>Subscription</option>
									<option <%if(values[i].equals("Razor Blade")){ %>selected<%} %>>Razor Blade</option>
									<option <%if(values[i].equals("Ad-based")){ %>selected<%} %>>Ad-based</option>
									<option <%if(values[i].equals("Freemium")){ %>selected<%} %>>Freemium</option>
									<option <%if(values[i].equals("Donation")){ %>selected<%} %>>Donation</option>
									<option <%if(values[i].equals("Commission")){ %>selected<%} %>>Commission</option>
									<option <%if(values[i].equals("Loyalty")){ %>selected<%} %>>Loyalty</option>
									<option <%if(values[i].equals("Subsidiary")){ %>selected<%} %>>Subsidiary</option>
									<option <%if(values[i].equals("Pay as you want")){ %>selected<%} %>>Pay as you want</option>
									<option <%if(values[i].equals("Pay per use")){ %>selected<%} %>>Pay per use</option>
								</select>
							<%
							}
							%>
						</div>
				<%
					}
					userValues = bizModelSpace.getRevenueStreamsUser();
					for(int i=0; userValues!=null && i<userValues.length; i++){
				%>
						<div class="js_element_item" itemName="RevenueStreams" style="color:blue;font-size:11px">
							<div class="edit_item js_view_element_item">
								<span class="<%if(isEditMode){ %>js_action_element_item<%}%>"><%=CommonUtil.toNotNull(userValues[i]) %></span>
								<%
								if(isEditMode){
								%>
									<span class="edit_actions" style="position:absolute">
										<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
										<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
									</span>
								<%
								}
								%>
							</div>
							<%
							if(isEditMode){
							%>
								<input class="fieldline js_edit_element_item" name="txtRevenueStreamsUserItem" style="display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(userValues[i]) %>">
							<%
							}
							%>
						</div>
				<%
					}
					visHidden = (SmartUtil.isBlankObject(values) && SmartUtil.isBlankObject(userValues) && isEditMode) ? "" : ";visibility:hidden";
				%>
					<div class="js_element_item" itemName="RevenueStreams" style="color:blue;font-size:11px<%=visHidden%>">
						<div class="edit_item js_view_element_item" style="display:none">
							<span class="js_action_element_item"></span>
							<span class="edit_actions" style="position:absolute">
								<a href="" class="icon_hide js_remove_element_item" title="항목 삭제"></a>
								<a href="" class="icon_show js_add_element_item" title="아래에 항목 추가"></a>
							</span>
						</div>
						<input class="fieldline js_edit_element_item" name="" style="width:85px; display:inline-block; font-size:11px; background-color:white" type="text" value="">
						<select class="js_select_element_item" name="" style="display:inline-block; font-size:11px;width:18px">
							<option></option>
							<option>Pay per Unit (use)</option>
							<option>Subscription</option>
							<option>Razor Blade</option>
							<option>Ad-based</option>
							<option>Freemium</option>
							<option>Donation</option>
							<option>Commission</option>
							<option>Loyalty</option>
							<option>Subsidiary</option>
							<option>Pay as you want</option>
							<option>Pay per use</option>
						</select>
					</div>
			</td>
		</tr>
	</table>
</div>
<!-- 컨텐츠 레이아웃//-->
