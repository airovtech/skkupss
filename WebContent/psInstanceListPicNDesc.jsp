<%@page import="net.smartworks.skkupss.model.User"%>
<%@page import="net.smartworks.util.PropertiesLoader"%>
<%@page import="net.smartworks.skkupss.manager.impl.DocFileManagerImpl"%>
<%@page import="net.smartworks.util.CommonUtil"%>
<%@page import="net.smartworks.skkupss.model.BizModelSpace"%>
<%@page import="net.smartworks.skkupss.model.ServiceSpace"%>
<%@page import="net.smartworks.skkupss.model.ValueSpace"%>
<%@page import="net.smartworks.util.LocalDate"%>
<%@page import="java.util.Date"%>
<%@page import="net.smartworks.skkupss.model.ProductService"%>
<%@page import="net.smartworks.skkupss.model.SortingField"%>
<%@page import="net.smartworks.factory.ManagerFactory"%>
<%@page import="net.smartworks.skkupss.model.InstanceList"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.RequestParams"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%
	User cUser = SmartUtil.getCurrentUser();
	String PSS_PICTURE_URL = PropertiesLoader.loadPropByClassPath("/net/smartworks/conf/config.properties").getProperty("pss.picture.url");

	RequestParams params = (RequestParams)request.getAttribute("requestParams");
	if(SmartUtil.isBlankObject(params)){
		params = new RequestParams();
		params.setPageSize(20);
		params.setCurrentPage(1);
		String spaceType = request.getParameter("spaceType");
		if (SmartUtil.isBlankObject(spaceType)
				|| ProductService.getSpaceType(spaceType) > 100)
			params.setSpaceType(ProductService.PSS_SPACE_VALUE);
		else
			params.setSpaceType(spaceType);
	}

	InstanceList instanceList = null;
	try{
		instanceList = ManagerFactory.getInstance().getServiceManager().getProductInstanceList(params);
	}catch(Exception e){}
 %>
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />

<!-- 목록 테이블 -->
<table>
	<%
	SortingField sortedField = null;
	int pageSize = 20, totalPages = 1, currentPage = 1, currentCount=0;;
	if (instanceList != null) {
		sortedField = instanceList.getSortedField();
		if (sortedField == null)
			sortedField = new SortingField();
	%>
		<tr class="tit_bg">
			<th class="check r_line"><input type="checkbox" class="js_toggle_select_all" /></th>
	 		<th class="r_line" style="width:40px;">
				<span><fmt:message key="common.title.number"/></span>
			</th>
	 		<th class="r_line">
	 			<a href="" class="js_select_field_sorting" fieldId="<%=ProductService.FIELD_NAME%>"><fmt:message key="pss.title.product_service_name"/>
				 		<span class="<%if(sortedField.getFieldId().equals(ProductService.FIELD_NAME)){
						if(sortedField.isAscending()){ %>icon_in_up<%}else{ %>icon_in_down<%}}%>"></span>
					</a>
				<span class="js_progress_span"></span>
			</th>
	 		<th style="min-width:300px"><fmt:message key="common.title.desc"/></th>
	 		<th style="width:10px;border:none; background-color:white"></th>
			<th class="check r_line"><input type="checkbox" class="js_toggle_select_all" /></th>
	 		<th class="r_line" style="width:40px;">
				<span><fmt:message key="common.title.number"/></span>
			</th>
	 		<th class="r_line">
	 			<a href="" class="js_select_field_sorting" fieldId="<%=ProductService.FIELD_NAME%>"><fmt:message key="pss.title.product_service_name"/>
				 		<span class="<%if(sortedField.getFieldId().equals(ProductService.FIELD_NAME)){
						if(sortedField.isAscending()){ %>icon_in_up<%}else{ %>icon_in_down<%}}%>"></span>
					</a>
				<span class="js_progress_span"></span>
			</th>
	 		<th style="min-width:300px"><fmt:message key="common.title.desc"/></th>
		</tr>	
		<tr style="height:1px"></tr>
		<%
		pageSize = instanceList.getPageSize();
		totalPages = instanceList.getTotalPages();
		currentPage = instanceList.getCurrentPage();
		currentCount = instanceList.getTotalSize()-(currentPage-1)*pageSize;
		boolean left = true;
		if(instanceList.getInstanceDatas() != null) {
			ProductService[] productServices = (ProductService[]) instanceList.getInstanceDatas();
			for (ProductService productService : productServices) {
				productService.setSpaceType(ProductService.getSpaceType(params.getSpaceType()));
				LocalDate lastModifiedDate = productService.getLastModifiedDate();
				if(left){
			%>
					<tr class="instance_list js_work_instance_list">
				<%
				}
				%>
					<td class="tc js_content" href="newProductService.sw?psId=<%=productService.getId() %>&spaceType=<%=params.getSpaceType()%>" psId="<%=productService.getId()%>" psName="<%=productService.getName()%>"><input class="js_check_instance" name="chkSelectInstance" type="checkbox"/></td>
					<td class="tc js_content" href="newProductService.sw?psId=<%=productService.getId() %>&spaceType=<%=params.getSpaceType()%>" psId="<%=productService.getId()%>" psName="<%=productService.getName()%>"><%=currentCount--%></td>
					<td class="tc js_content" href="newProductService.sw?psId=<%=productService.getId() %>&spaceType=<%=params.getSpaceType()%>" psId="<%=productService.getId()%>" psName="<%=productService.getName()%>">
						<img class="vt up" <%if (!SmartUtil.isBlankObject(productService
								.getPicture())) {%> src="<%=PSS_PICTURE_URL
									+ productService.getPicture()%>"<%}%> style="width:158px<%if (SmartUtil
								.isBlankObject(productService.getPicture())) {%>;height:158px<%}%>" />
						<div><%=CommonUtil.toNotNull(productService.getName())%></div>
					</td>
					<td class="tl vt js_content" href="newProductService.sw?psId=<%=productService.getId() %>&spaceType=<%=params.getSpaceType()%>" psId="<%=productService.getId()%>" psName="<%=productService.getName()%>">
						<textarea readonly><%=CommonUtil.toNotNull(productService.getDesc())%></textarea>
					</td>
				<%
				if(left){
					left = false;
				%>
					<td></td>
				<%
				}else{
					left = true;
					%>
					</tr>
				<%
				} %>
			<%
			}
		}
	} else {
		sortedField = new SortingField();
	%>
		<tr class="tit_bg">
		<tr class="tit_bg">
			<th class="check r_line"><input type="checkbox" class="js_toggle_select_all" /></th>
	 		<th class="r_line" style="width:40px;">
				<span><fmt:message key="common.title.number"/></span>
			</th>
	 		<th class="r_line">
	 			<a href="" class="js_select_field_sorting" fieldId="<%=ProductService.FIELD_NAME%>"><fmt:message key="pss.title.product_service_name"/>
				 		<span class="<%if(sortedField.getFieldId().equals(ProductService.FIELD_NAME)){
						if(sortedField.isAscending()){ %>icon_in_up<%}else{ %>icon_in_down<%}}%>"></span>
					</a>
				<span class="js_progress_span"></span>
			</th>
	 		<th style="min-width:300px"><fmt:message key="common.title.desc"/></th>
	 		<th style="width:10px;border:none; background-color:white"></th>
			<th class="check r_line"><input type="checkbox" class="js_toggle_select_all" /></th>
	 		<th class="r_line" style="width:40px;">
				<span><fmt:message key="common.title.number"/></span>
			</th>
	 		<th class="r_line">
	 			<a href="" class="js_select_field_sorting" fieldId="<%=ProductService.FIELD_NAME%>"><fmt:message key="pss.title.product_service_name"/>
				 		<span class="<%if(sortedField.getFieldId().equals(ProductService.FIELD_NAME)){
						if(sortedField.isAscending()){ %>icon_in_up<%}else{ %>icon_in_down<%}}%>"></span>
					</a>
				<span class="js_progress_span"></span>
			</th>
	 		<th style="min-width:300px"><fmt:message key="common.title.desc"/></th>
		</tr>	
	<%
	}
	%>
</table>
<!-- 목록 테이블 //-->
<%
	if (instanceList == null
			|| SmartUtil.isBlankObject(instanceList.getInstanceDatas())) {
%>
	<div class="tc mt5mb5"><fmt:message key="common.message.no_instance"/></div>
<%
	}
	if (!SmartUtil.isBlankObject(sortedField)) {
%>
	<form name="frmSortingField">
		<input name="hdnSortingFieldId" type="hidden" value="<%=sortedField.getFieldId()%>">
		<input name="hdnSortingIsAscending" type="hidden" value="<%=sortedField.isAscending()%>">
	</form>
<%
	}
%>
<form name="frmInstanceListPaging">
	<!-- 페이징 -->
	<div class="paginate">
		<%
			if (currentPage > 0 && totalPages > 0 && currentPage <= totalPages) {
				boolean isFirst10Pages = (currentPage <= 10) ? true : false;
				boolean isLast10Pages = (((currentPage - 1) / 10) == ((totalPages - 1) / 10)) ? true
						: false;
				int startPage = ((currentPage - 1) / 10) * 10 + 1;
				int endPage = isLast10Pages ? totalPages : startPage + 10 - 1;
				if (!isFirst10Pages) {
		%>
				<a class="pre_end js_select_paging" href="" title="<fmt:message key='common.title.first_page'/>">
					<span class="spr"></span>
					<input name="hdnPrevEnd" type="hidden" value="false"> 
				</a>		
				<a class="pre js_select_paging" href="" title="<fmt:message key='common.title.prev_10_pages'/> ">
					<span class="spr"></span>
					<input name="hdnPrev10" type="hidden" value="false">
				</a>
			<%
				}
					for (int num = startPage; num <= endPage; num++) {
						if (num == currentPage) {
			%>
					<strong><%=num%></strong>
					<input name="hdnCurrentPage" type="hidden" value="<%=num%>"/>
				<%
					} else {
				%>
					<a class="num js_select_current_page" href=""><%=num%></a>
				<%
					}
						}
						if (!isLast10Pages) {
				%>
				<a class="next js_select_paging" title="<fmt:message key='common.title.next_10_pages'/> ">
					<span class="spr"></span>
					<input name="hdnNext10" type="hidden" value="false"/>
				</a>
				<a class="next_end js_select_paging" title="<fmt:message key='common.title.last_page'/> ">
					<span class="spr"><input name="hdnNextEnd" type="hidden" value="false"/></span> 
				</a>
		<%
			}
			}
		%>
		<span class="js_progress_span"></span>
	</div>
	<div class="title_line_btns">

		<div class="num_box">
			<div class="icon_btn_start">
				<a href="newProductService.jsp"	class="js_instance_detail icon_btn_tail"><fmt:message key="common.button.add_new_iwork"/></a>
			</div>
			<span class="js_progress_span"></span> 
			<select	class="js_select_page_size" name="selPageSize" style="font-size:15px;margin-bottom:2px" title="<fmt:message key='common.title.count_in_page'/>">
				<option <%if (pageSize == 20) {%> selected <%}%>>20</option>
				<option <%if (pageSize == 30) {%> selected <%}%>>30</option>
				<option <%if (pageSize == 50) {%> selected <%}%>>50</option>
				<option <%if (pageSize == 100) {%> selected <%}%>>100</option>
			</select>
			&nbsp<a href="#" class="wrap_top"><fmt:message key="pss.button.goto_top"/>▲</a>
		</div>
	</div>

	<!-- 페이징 //-->
</form>
