<%@page import="net.smartworks.skkupss.model.User"%>
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

	DefaultSpace defaultSpace = (DefaultSpace)request.getAttribute("societySpace");
	String psId = request.getParameter("psId");
	
	if(SmartUtil.isBlankObject(defaultSpace) && !SmartUtil.isBlankObject(psId)){

		ProductService productService = null;
		try{
			productService = ManagerFactory.getInstance().getServiceManager().getProductService(psId, ProductService.SPACE_TYPE_SOCIETY);
		}catch(Exception e){}
		
		defaultSpace = productService.getSocietySpace();
	}
	String isEditModeStr = request.getParameter("isEditMode");
	boolean isEditMode = SmartUtil.isBlankObject(isEditModeStr) || !isEditModeStr.equalsIgnoreCase("true") ? false : true;
	if(SmartUtil.isBlankObject(defaultSpace)) defaultSpace = new DefaultSpace();;

	String[] values = defaultSpace.getElements();
	String customer=null, manufacturer=null, serviceProvider=null, relatedCompany=null, relatedGovernment=null, 
			relatedFinance=null, relatedSocialOrg=null, relatedMedia=null, relatedRNTOrg=null;
	if(!SmartUtil.isBlankObject(values) && values.length==9){
		customer=values[0];
		manufacturer=values[1];
		serviceProvider=values[2];
		relatedCompany=values[3];
		relatedGovernment=values[4];
		relatedFinance=values[5];
		relatedSocialOrg=values[6];
		relatedMedia=values[7];
		relatedRNTOrg=values[8];
	}
	
%>
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />


 	 
<!-- 컨텐츠 레이아웃-->
<div class="js_space_tab js_society_space" spaceType="<%=ProductService.SPACE_TYPE_SOCIETY%>">
	<table class="form_layout con">
		<tr>
			<th width="20%"><fmt:message key="pss.title.society.customer"/></th>
			<td width="80%">
				<select name="selSocietyCustomer" <%if(!isEditMode){ %>disabled<%} %>>
					<option><fmt:message key="common.title.none"/></option>
					<option <%if("개인".equals(customer)){ %>selected<%} %>>개인</option>
					<option <%if("그룹".equals(customer)){ %>selected<%} %>>그룹</option>
					<option <%if("기업".equals(customer)){ %>selected<%} %>>기업</option>
					<option <%if("정부".equals(customer)){ %>selected<%} %>>정부</option>
				</select>
			</td>
		</tr>
		<tr>
			<th><fmt:message key="pss.title.society.manufacturer"/></th>
			<td>
				<select name="selSocietyManufacturer" <%if(!isEditMode){ %>disabled<%} %>>
					<option><fmt:message key="common.title.none"/></option>
					<option <%if("대기업".equals(manufacturer)){ %>selected<%} %>>대기업</option>
					<option <%if("중견기업".equals(manufacturer)){ %>selected<%} %>>중견기업</option>
					<option <%if("중소기업".equals(manufacturer)){ %>selected<%} %>>중소기업</option>
					<option <%if("벤쳐기업".equals(manufacturer)){ %>selected<%} %>>벤쳐기업</option>
					<option <%if("기타".equals(manufacturer)){ %>selected<%} %>>기타</option>
				</select>
			</td>
		</tr>
		<%
		String[] serviceProviders = new String[]{null, null, null, null};
		if(!SmartUtil.isBlankObject(serviceProvider)){
			String[] temp = serviceProvider.split("\\,");
			if(temp!=null && temp.length<=4){
				for(int i=0; i<temp.length; i++)
				serviceProviders[i] = temp[i];
			}
		}
		%>
		<tr>
			<th><fmt:message key="pss.title.society.serviceProvider"/></th>
			<td>
				<input <%if(!isEditMode){ %>disabled<%} %> style="margin-left:6px;margin-right:3px" type="checkbox" name="chkServiceProvider1" <%if("Inhouse".equals(serviceProviders[0])){ %>checked<%} %>/>Inhouse
				<input <%if(!isEditMode){ %>disabled<%} %> style="margin-left:6px;margin-right:3px" type="checkbox" name="chkServiceProvider2" <%if("외부기업".equals(serviceProviders[1])){ %>checked<%} %>/>외부기업
				<input <%if(!isEditMode){ %>disabled<%} %> style="margin-left:6px;margin-right:3px" type="checkbox" name="chkServiceProvider3" <%if("외부개인".equals(serviceProviders[2])){ %>checked<%} %>/>외부개인
				<input <%if(!isEditMode){ %>disabled<%} %> style="margin-left:6px;margin-right:3px" type="checkbox" name="chkServiceProvider4" <%if("기타".equals(serviceProviders[3])){ %>checked<%} %>/>기타
			</td>
		</tr>
		<%
		String[] relatedCompanys = new String[]{null, null, null};
		if(!SmartUtil.isBlankObject(relatedCompany)){
			String[] temp = relatedCompany.split("\\,");
			if(temp!=null && temp.length<=3){
				for(int i=0; i<temp.length; i++)
				relatedCompanys[i] = temp[i];
			}
		}
		%>
		<tr>
			<th><fmt:message key="pss.title.society.relatedCompany"/></th>
			<td>
				<input <%if(!isEditMode){ %>disabled<%} %> style="margin-left:6px;margin-right:3px" type="checkbox" name="chkRelatedCompany1" <%if("제조기업".equals(relatedCompanys[0])){ %>checked<%} %>/>제조기업
				<input <%if(!isEditMode){ %>disabled<%} %> style="margin-left:6px;margin-right:3px" type="checkbox" name="chkRelatedCompany2" <%if("서비스기업".equals(relatedCompanys[1])){ %>checked<%} %>/>서비스기업
				<input <%if(!isEditMode){ %>disabled<%} %> style="margin-left:6px;margin-right:3px" type="checkbox" name="chkRelatedCompany3" <%if("기타".equals(relatedCompanys[2])){ %>checked<%} %>/>기타
			</td>
		</tr>
		<tr>
			<th><fmt:message key="pss.title.society.relatedGovernment"/></th>
			<td>
				<select name="selSocietyRelatedGovernment" <%if(!isEditMode){ %>disabled<%} %>>
					<option><fmt:message key="common.title.none"/></option>
					<option <%if("중앙정부".equals(relatedGovernment)){ %>selected<%} %>>중앙정부</option>
					<option <%if("지방정부".equals(relatedGovernment)){ %>selected<%} %>>지방정부</option>
				</select>
			</td>
		</tr>
		<tr>
			<th><fmt:message key="pss.title.society.relatedFinance"/></th>
			<td>
				<select name="selSocietyRelatedFinance" <%if(!isEditMode){ %>disabled<%} %>>
					<option><fmt:message key="common.title.none"/></option>
					<option <%if("금융".equals(relatedFinance)){ %>selected<%} %>>금융</option>
					<option <%if("보험".equals(relatedFinance)){ %>selected<%} %>>보험</option>
				</select>
			</td>
		</tr>
		<tr>
			<th><fmt:message key="pss.title.society.relatedSocialOrg"/></th>
			<td>
				<select name="selSocietyRelatedSocialOrg" <%if(!isEditMode){ %>disabled<%} %>>
					<option><fmt:message key="common.title.none"/></option>
					<option <%if("NGO".equals(relatedSocialOrg)){ %>selected<%} %>>NGO</option>
					<option <%if("압력단체".equals(relatedSocialOrg)){ %>selected<%} %>>압력단체</option>
					<option <%if("시민단체".equals(relatedSocialOrg)){ %>selected<%} %>>시민단체</option>
				</select>
			</td>
		</tr>
		<tr>
			<th><fmt:message key="pss.title.society.relatedMedia"/></th>
			<td>
				<select name="selSocietyRelatedMedia" <%if(!isEditMode){ %>disabled<%} %>>
					<option><fmt:message key="common.title.none"/></option>
					<option <%if("신문".equals(relatedMedia)){ %>selected<%} %>>신문</option>
					<option <%if("방송".equals(relatedMedia)){ %>selected<%} %>>방송</option>
					<option <%if("인터넷 매체".equals(relatedMedia)){ %>selected<%} %>>인터넷 매체</option>
				</select>
			</td>
		</tr>
		<tr>
			<th><fmt:message key="pss.title.society.relatedRNTOrg"/></th>
			<td>
				<select name="selSocietyRelatedRNTOrg" <%if(!isEditMode){ %>disabled<%} %>>
					<option><fmt:message key="common.title.none"/></option>
					<option <%if("대학".equals(relatedRNTOrg)){ %>selected<%} %>>대학</option>
					<option <%if("연구소".equals(relatedRNTOrg)){ %>selected<%} %>>연구소</option>
				</select>
			</td>
		</tr>
		</table>
</div>
<!-- 컨텐츠 레이아웃//-->
