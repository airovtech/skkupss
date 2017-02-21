<%@page import="net.smartworks.util.SmartMessage"%>
<%@page import="net.smartworks.skkupss.model.db.Db_CustomerType"%>
<%@page import="net.smartworks.skkupss.model.CustomerType"%>
<%@page import="net.smartworks.skkupss.model.CustomerSpace"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.HashMap"%>
<%@page import="net.smartworks.factory.DaoFactory"%>
<%@page import="net.smartworks.skkupss.model.ProductSpace"%>
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

	CustomerSpace customerSpace = (CustomerSpace)request.getAttribute("customerSpace");
	String psId = request.getParameter("psId");
	if(!SmartUtil.isBlankObject(psId)){

		ProductService productService = null;
		try{
			productService = ManagerFactory.getInstance().getServiceManager().getProductService(psId, ProductService.SPACE_TYPE_CUSTOMER);
		}catch(Exception e){}
		if(!SmartUtil.isBlankObject(productService)) customerSpace = productService.getCustomerSpace();
		
	}
	String isEditModeStr = request.getParameter("isEditMode");
	boolean isEditMode = SmartUtil.isBlankObject(isEditModeStr) || !isEditModeStr.equalsIgnoreCase("true") ? false : true;
	if(SmartUtil.isBlankObject(customerSpace)) customerSpace = new CustomerSpace();;

	String[] types = customerSpace.getTypes();
	String[] activityTypes = customerSpace.getActivityTypes();
	if(isEditMode){
		if(SmartUtil.isBlankObject(types)) types = new String[]{""};
		if(SmartUtil.isBlankObject(activityTypes)) activityTypes = new String[]{""};
	}
	
	
%>
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />
 	 
<!-- 컨텐츠 레이아웃-->
<div class="js_space_tab js_customer_space" spaceType="<%=ProductService.SPACE_TYPE_CUSTOMER%>">
	<!-- 스마트폼에서 해당 업무화면을 그려주는 곳 -->
	<div class="form_layout">
<%-- 		<%if(isEditMode){ %>
		<!-- 우측버튼 -->
		<div class="title_line_btns" style="float:none;text-align:center;margin-top:5px">
			<div class="icon_btn_add">
				<a class="icon_btn_tail js_add_customer_type" href=""><fmt:message key="common.button.add_new"/></a>
			</div>
		</div>
		<!-- 우측버튼 //-->
		<%} %>
 --%>		<table class="js_customer_type">
			<tbody>
				<tr>
					<td class="form_col">
						<div class="form_label" style="width:25%"><span><fmt:message key='pss.title.customer_type'/></span></div>
						<div class="form_value" style="width:75%">
							<div class="list_action_item js_hidden_customer_type" style="display:none">
								<%
								Db_CustomerType[] cLevel1s, cLevel2s;
								Map<String, String> params1 = new HashMap<String, String>();
								cLevel1s = DaoFactory.getInstance().getDbDao().getCustomerTypes(1, params1);
								params1.put("level1", "02");
								cLevel2s = DaoFactory.getInstance().getDbDao().getCustomerTypes(2, params1);		
								%>
								<select style="display:none" class="js_select_customer_type">
									<%
									for(int i=0; cLevel1s!=null && i<cLevel1s.length; i++){
										Db_CustomerType code = cLevel1s[i];
									%>
									<option value="<%=CustomerSpace.getCustomerTypeCode(code.getId(), CustomerSpace.CUSTOMER_TYPE_LEVEL1)%>"><%=code.getName() %></option>
									<%
									}%>
								</select>
								<select class="js_select_customer_type">
									<option value="00"><fmt:message key="common.title.none"/></option>
									<%
									for(int i=0; cLevel2s!=null && i<cLevel2s.length; i++){
										Db_CustomerType code = cLevel2s[i];
										String codeId = code.getId().equals("00")?code.getId():CustomerSpace.getCustomerTypeCode(code.getId(), CustomerSpace.CUSTOMER_TYPE_LEVEL2);
									%>
									<option value="<%=codeId%>"><%=code.getName() %></option>
									<%
									}%>
								</select>
								<select class="js_select_customer_type">
									<option value="00"><fmt:message key="common.title.none"/></option>
								</select>
								<select class="js_select_customer_type">
									<option value="00"><fmt:message key="common.title.none"/></option>
								</select>
								<a href="" style="margin-left:10px;margin-top:5px" class="list_action js_delete_customer_type" title="<fmt:message key='common.button.delete'/>"> X </a>
							</div>
							<%
							for(int index=0; types!=null && index<types.length; index++){
								String type = types[index];
								Db_CustomerType[] codeLevel1s, codeLevel2s, codeLevel3s, codeLevel4s;
								codeLevel1s = codeLevel2s = codeLevel3s = codeLevel4s = new Db_CustomerType[]{new Db_CustomerType("00", SmartMessage.getString("common.title.none"))};
								Map<String, String> params = new HashMap<String, String>();
								codeLevel1s = DaoFactory.getInstance().getDbDao().getCustomerTypes(1, params);
								if(!SmartUtil.isBlankObject(type)){
									params.put("level1", "02");
									codeLevel2s = DaoFactory.getInstance().getDbDao().getCustomerTypes(2, params);
									params.put("level2", CustomerSpace.getCustomerTypeCode(type, CustomerSpace.CUSTOMER_TYPE_LEVEL2));
									codeLevel3s = DaoFactory.getInstance().getDbDao().getCustomerTypes(3, params);
									params.put("level3", CustomerSpace.getCustomerTypeCode(type, CustomerSpace.CUSTOMER_TYPE_LEVEL3));
									codeLevel4s = DaoFactory.getInstance().getDbDao().getCustomerTypes(4, params);
								}else if(!SmartUtil.isBlankObject(codeLevel1s)){
									params.put("level1", "02");
									codeLevel2s = DaoFactory.getInstance().getDbDao().getCustomerTypes(2, params);		
								}
								
								%>
								<div class="list_action_item js_customer_type_list">
									<select style="display:none" class="js_select_customer_type" <%if(!isEditMode){ %>disabled<%} %> name="selTypeCode1">
										<%
										for(int i=0; codeLevel1s!=null && i<codeLevel1s.length; i++){
											Db_CustomerType code = codeLevel1s[i];
										%>
										<option value="<%=CustomerSpace.getCustomerTypeCode(code.getId(), CustomerSpace.CUSTOMER_TYPE_LEVEL1)%>" <%if(code.getId().equals("02000000")){ %>selected<%} %>><%=code.getName() %></option>
										<%
										}%>
									</select>
									<select class="js_select_customer_type" <%if(!isEditMode){ %>disabled<%} %> name="selTypeCode2">
										<option value="00"><fmt:message key="common.title.none"/></option>
										<%
										for(int i=0; codeLevel2s!=null && i<codeLevel2s.length; i++){
											Db_CustomerType code = codeLevel2s[i];
											String codeId = code.getId().equals("00")?code.getId():CustomerSpace.getCustomerTypeCode(code.getId(), CustomerSpace.CUSTOMER_TYPE_LEVEL2);
										%>
										<option value="<%=codeId%>" <%if(codeId.equals(CustomerSpace.getCustomerTypeCode(type, CustomerSpace.CUSTOMER_TYPE_LEVEL2))){ %>selected<%} %>><%=code.getName() %></option>
										<%
										}%>
									</select>
									<select class="js_select_customer_type" <%if(!isEditMode){ %>disabled<%} %> name="selTypeCode3">
										<option value="00"><fmt:message key="common.title.none"/></option>
										<%
										for(int i=0; codeLevel3s!=null && i<codeLevel3s.length; i++){
											Db_CustomerType code = codeLevel3s[i];
											String codeId = code.getId().equals("00")?code.getId():CustomerSpace.getCustomerTypeCode(code.getId(), CustomerSpace.CUSTOMER_TYPE_LEVEL3);
										%>
										<option value="<%=codeId%>" <%if(codeId.equals(CustomerSpace.getCustomerTypeCode(type, CustomerSpace.CUSTOMER_TYPE_LEVEL3))){ %>selected<%} %>><%=code.getName() %></option>
										<%
										}%>
									</select>
									<select class="js_select_customer_type" <%if(!isEditMode){ %>disabled<%} %> name="selTypeCode4">
										<option value="00"><fmt:message key="common.title.none"/></option>
										<%
										for(int i=0; codeLevel4s!=null && i<codeLevel4s.length; i++){
											Db_CustomerType code = codeLevel4s[i];
											String codeId = code.getId().equals("00")?code.getId():CustomerSpace.getCustomerTypeCode(code.getId(), CustomerSpace.CUSTOMER_TYPE_LEVEL4);
										%>
										<option value="<%=codeId%>" <%if(codeId.equals(CustomerSpace.getCustomerTypeCode(type, CustomerSpace.CUSTOMER_TYPE_LEVEL4))){ %>selected<%} %>><%=code.getName() %></option>
										<%
										}%>
									</select>
<%-- 									<%if(isEditMode){ %>
										<a href="" style="margin-left:10px;margin-top:5px" class="list_action js_delete_customer_type" title="<fmt:message key='common.button.delete'/>"> X </a>
									<%} %>
 --%>								</div>
							<%
							}
							%>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		
		<%if(isEditMode){ %>
		<!-- 우측버튼 -->
		<div class="title_line_btns" style="float:none;text-align:center;margin-top:5px">
			<div class="icon_btn_add">
				<a class="icon_btn_tail js_add_customer_activity_type" href=""><fmt:message key="common.button.add_new"/></a>
			</div>
		</div>
		<!-- 우측버튼 //-->
		<%} %>
		<table class="js_customer_activity_type">
			<tbody>
				<tr>
					<td class="form_col">
						<div class="form_label" style="width:25%"><span><span><fmt:message key='pss.title.customer_activity_type'/></span></div>
						<div class="form_value" style="width:75%">
							<div class="list_action_item js_hidden_customer_activity_type" style="display:none">
								<%
								Db_CustomerType[] cdLevel1s, cdLevel2s;
								Map<String, String> params2 = new HashMap<String, String>();
								cdLevel1s = DaoFactory.getInstance().getDbDao().getCustomerTypes(1, params2);
								params2.put("level1", "01");
								cdLevel2s = DaoFactory.getInstance().getDbDao().getCustomerTypes(2, params2);		
								%>
								<select style="display:none" class="js_select_customer_activity_type">
									<%
									for(int i=0; cdLevel1s!=null && i<cdLevel1s.length; i++){
										Db_CustomerType code = cdLevel1s[i];
									%>
									<option value="<%=CustomerSpace.getCustomerTypeCode(code.getId(), CustomerSpace.CUSTOMER_TYPE_LEVEL1)%>"><%=code.getName() %></option>
									<%
									}%>
								</select>
								<select class="js_select_customer_activity_type">
									<option value="00"><fmt:message key="common.title.none"/></option>
									<%
									for(int i=0; cdLevel2s!=null && i<cdLevel2s.length; i++){
										Db_CustomerType code = cdLevel2s[i];
										String codeId = code.getId().equals("00")?code.getId():CustomerSpace.getCustomerTypeCode(code.getId(), CustomerSpace.CUSTOMER_TYPE_LEVEL2);
									%>
									<option value="<%=codeId%>"><%=code.getName() %></option>
									<%
									}%>
								</select>
								<select class="js_select_customer_activity_type">
									<option value="00"><fmt:message key="common.title.none"/></option>
								</select>
								<select class="js_select_customer_activity_type">
									<option value="00"><fmt:message key="common.title.none"/></option>
								</select>
								<a href="" style="margin-left:10px;margin-top:5px" class="list_action js_delete_customer_activity_type" title="<fmt:message key='common.button.delete'/>"> X </a>
							</div>
							<%
							for(int index=0; activityTypes!=null && index<activityTypes.length; index++){
								String activityType = activityTypes[index];
								Db_CustomerType[] codeLevel1s, codeLevel2s, codeLevel3s, codeLevel4s;
								codeLevel1s = codeLevel2s = codeLevel3s = codeLevel4s = new Db_CustomerType[]{new Db_CustomerType("00", SmartMessage.getString("common.title.none"))};
								Map<String, String> params = new HashMap<String, String>();
								codeLevel1s = DaoFactory.getInstance().getDbDao().getCustomerTypes(1, params);
								if(!SmartUtil.isBlankObject(activityType)){
									params.put("level1", "01");
									codeLevel2s = DaoFactory.getInstance().getDbDao().getCustomerTypes(2, params);
									params.put("level2", CustomerSpace.getCustomerTypeCode(activityType, CustomerSpace.CUSTOMER_TYPE_LEVEL2));
									codeLevel3s = DaoFactory.getInstance().getDbDao().getCustomerTypes(3, params);
									params.put("level3", CustomerSpace.getCustomerTypeCode(activityType, CustomerSpace.CUSTOMER_TYPE_LEVEL3));
									codeLevel4s = DaoFactory.getInstance().getDbDao().getCustomerTypes(4, params);
								}else if(!SmartUtil.isBlankObject(codeLevel1s)){
									params.put("level1", "01");
									codeLevel2s = DaoFactory.getInstance().getDbDao().getCustomerTypes(2, params);		
								}
								
								%>
								<div class="list_action_item js_customer_activity_type_list">
									<select style="display:none" class="js_select_customer_activity_type" <%if(!isEditMode){ %>disabled<%} %> name="selActivityTypeCode1">
										<%
										for(int i=0; codeLevel1s!=null && i<codeLevel1s.length; i++){
											Db_CustomerType code = codeLevel1s[i];
										%>
										<option value="<%=CustomerSpace.getCustomerTypeCode(code.getId(), CustomerSpace.CUSTOMER_TYPE_LEVEL1)%>" <%if(code.getId().equals("01000000")){ %>selected<%} %>><%=code.getName() %></option>
										<%
										}%>
									</select>
									<select class="js_select_customer_activity_type" <%if(!isEditMode){ %>disabled<%} %> name="selActivityTypeCode2">
										<option value="00"><fmt:message key="common.title.none"/></option>
										<%
										for(int i=0; codeLevel2s!=null && i<codeLevel2s.length; i++){
											Db_CustomerType code = codeLevel2s[i];
											String codeId = code.getId().equals("00")?code.getId():CustomerSpace.getCustomerTypeCode(code.getId(), CustomerSpace.CUSTOMER_TYPE_LEVEL2);
										%>
										<option value="<%=codeId%>" <%if(codeId.equals(CustomerSpace.getCustomerTypeCode(activityType, CustomerSpace.CUSTOMER_TYPE_LEVEL2))){ %>selected<%} %>><%=code.getName() %></option>
										<%
										}%>
									</select>
									<select class="js_select_customer_activity_type" <%if(!isEditMode){ %>disabled<%} %> name="selActivityTypeCode3">
										<option value="00"><fmt:message key="common.title.none"/></option>
										<%
										for(int i=0; codeLevel3s!=null && i<codeLevel3s.length; i++){
											Db_CustomerType code = codeLevel3s[i];
											String codeId = code.getId().equals("00")?code.getId():CustomerSpace.getCustomerTypeCode(code.getId(), CustomerSpace.CUSTOMER_TYPE_LEVEL3);
										%>
										<option value="<%=codeId%>" <%if(codeId.equals(CustomerSpace.getCustomerTypeCode(activityType, CustomerSpace.CUSTOMER_TYPE_LEVEL3))){ %>selected<%} %>><%=code.getName() %></option>
										<%
										}%>
									</select>
									<select class="js_select_customer_activity_type" <%if(!isEditMode){ %>disabled<%} %> name="selActivityTypeCode4">
										<option value="00"><fmt:message key="common.title.none"/></option>
										<%
										for(int i=0; codeLevel4s!=null && i<codeLevel4s.length; i++){
											Db_CustomerType code = codeLevel4s[i];
											String codeId = code.getId().equals("00")?code.getId():CustomerSpace.getCustomerTypeCode(code.getId(), CustomerSpace.CUSTOMER_TYPE_LEVEL4);
										%>
										<option value="<%=codeId%>" <%if(codeId.equals(CustomerSpace.getCustomerTypeCode(activityType, CustomerSpace.CUSTOMER_TYPE_LEVEL4))){ %>selected<%} %>><%=code.getName() %></option>
										<%
										}%>
									</select>
									<%if(isEditMode){ %>
										<a href="" style="margin-left:10px;margin-top:5px" class="list_action js_delete_customer_activity_type" title="<fmt:message key='common.button.delete'/>"> X </a>
									<%} %>
								</div>
							<%
							}
							%>
						</div>
					</td>
				</tr>
			</tbody>
		</table>	
	</div>
	<div class="js_lifecycle_steps_target" psId="<%=psId%>"></div>
	
</div>
<!-- 컨텐츠 레이아웃//-->
