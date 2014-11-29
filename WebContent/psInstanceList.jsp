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
<%

	String PSS_PICTURE_URL = PropertiesLoader.loadPropByClassPath("/net/smartworks/conf/config.properties").getProperty("pss.picture.url");

	RequestParams params = (RequestParams)request.getAttribute("requestParams");
	if(SmartUtil.isBlankObject(params)){
		params = new RequestParams();
		params.setPageSize(20);
		params.setCurrentPage(1);
		String spaceType = request.getParameter("spaceType");
		if(SmartUtil.isBlankObject(spaceType) || ProductService.getSpaceType(spaceType)>100)
			params.setSpaceType(ProductService.PSS_SPACE_VALUE);
		else
			params.setSpaceType(spaceType);			
	}

	InstanceList instanceList = null;
	try{
		instanceList = ManagerFactory.getInstance().getServiceManager().getProductInstanceList(params);
	}catch(Exception e){}
 %>

<!-- 목록 테이블 -->
<table>
	<%	
  	SortingField sortedField = null;
	int pageSize = 20, totalPages = 1, currentPage = 1;
 	if (instanceList != null) {
		sortedField = instanceList.getSortedField();
		if(sortedField==null) sortedField = new SortingField();
	%>
		<tr class="tit_bg">
			<th class="check r_line"><input type="checkbox" class="js_toggle_select_all" /></th>
	 		<th class="r_line" style="width:40px;">
				<span>번호</span>
			</th>
	 		<th class="r_line">
	 			<a href="" class="js_select_field_sorting" fieldId="<%=ProductService.FIELD_NAME%>">제품-서비스 이름
 			 		<span class="<%if(sortedField.getFieldId().equals(ProductService.FIELD_NAME)){
						if(sortedField.isAscending()){ %>icon_in_up<%}else{ %>icon_in_down<%}}%>"></span>
 				</a>
				<span class="js_progress_span"></span>
			</th>
	 		<th class="r_line"  style="min-width:200px">설 명</th>
	 		<th class="r_line">
				<form class="form_space js_space_name" name="frmSpaceName">
					<select name="selSpaceName" class="js_select_space_name">
						<option value="<%=ProductService.PSS_SPACE_VALUE%>" <%if(params.getSpaceType().equals(ProductService.PSS_SPACE_VALUE)){%>selected<%} %>>가치공간(Value Space)</option>
						<option value="<%=ProductService.PSS_SPACE_SERVICE%>" <%if(params.getSpaceType().equals(ProductService.PSS_SPACE_SERVICE)){%>selected<%} %>>서비스공간(Service Space)</option>
						<option value="<%=ProductService.PSS_SPACE_BIZ_MODEL%>" <%if(params.getSpaceType().equals(ProductService.PSS_SPACE_BIZ_MODEL)){%>selected<%} %>>비즈모델공간(Biz Model Space)</option>
					</select>
					<span class="js_progress_span"></span>
				</form>
			</th>
			<th class="r_line" style="width:145px">
				<a href="" class="js_select_field_sorting" fieldId="<%=ProductService.FIELD_LAST_MODIFIED_USER%>">최종수정자
					<span class="<%if(sortedField.getFieldId().equals(ProductService.FIELD_LAST_MODIFIED_USER)){
						if(sortedField.isAscending()){ %>icon_in_up<%}else{ %>icon_in_down<%}}%>"></span>
				</a>/
				<a href="" class="js_select_field_sorting" fieldId="<%=ProductService.FIELD_LAST_MODIFIED_DATE%>">최종수정일
					<span class="<%if(sortedField.getFieldId().equals(ProductService.FIELD_LAST_MODIFIED_DATE)){
						if(sortedField.isAscending()){ %>icon_in_up<%}else{ %>icon_in_down<%}}%>"></span>
				</a>
				<span class="js_progress_span"></span>
			</th>		
		</tr>	
	<%
		pageSize = instanceList.getPageSize();
		totalPages = instanceList.getTotalPages();
		currentPage = instanceList.getCurrentPage();
		int currentCount = instanceList.getTotalSize()-(currentPage-1)*pageSize;
		if(instanceList.getInstanceDatas() != null) {
			ProductService[] productServices = (ProductService[]) instanceList.getInstanceDatas();
			for (ProductService productService : productServices) {
				productService.setSpaceType(ProductService.getSpaceType(params.getSpaceType()));
			%>
				<tr class="instance_list js_work_instance_list js_instance_detail" href="newProductService.jsp?psId=<%=productService.getId() %>&spaceType=<%=params.getSpaceType()%>" psId="<%=productService.getId()%>" psName="<%=productService.getName()%>">
					<td class="tc"><input class="js_check_instance" name="chkSelectInstance" type="checkbox"/></td>
					<td class="tc"><%=currentCount--%></td>
					<td class="tc">
						<img class="vt up" <%if(!SmartUtil.isBlankObject(productService.getPicture())){ %> src="<%=PSS_PICTURE_URL + productService.getPicture() %>"<%} %> style="width:158px<%if(SmartUtil.isBlankObject(productService.getPicture())){ %>;height:158px<%} %>" />
						<div><%=CommonUtil.toNotNull(productService.getName()) %></div>
					</td>
					<td class="tl vt">
						<div><%=CommonUtil.toNotNull(productService.getDesc()) %></div>
					</td>
					<td class="vt">
						<%
						switch(productService.getSpaceType()){
						case ProductService.SPACE_TYPE_VALUE:
							request.setAttribute("valueSpace", productService.getValueSpace());
						%>
							<jsp:include page="viewValueSpace.jsp"/>
						<%
							break;
						case ProductService.SPACE_TYPE_SERVICE:
							request.setAttribute("serviceSpace", productService.getServiceSpace());
						%>
							<jsp:include page="viewServiceSpace.jsp"/>
						<%
							break;
						case ProductService.SPACE_TYPE_BIZ_MODEL:
							request.setAttribute("bizModelSpace", productService.getBizModelSpace());
						%>
							<jsp:include page="viewBizModelSpace.jsp"/>
						<%
							break;
						}
						%>
					</td>
					<td class="vt">
						<div class="noti_pic">
<%-- 							<img src="<%=lastModifier.getMinPicture()%>" title="<%=lastModifier.getLongName()%>" class="<%=modifierProfileClass %>" />
 --%>						</div>
						<div class="noti_in_s">
 							<span class="t_name"><img class="profile_size_s mb3 mr3" src="images/no_user_picture_min.jpg"/>CDI사용자</span>
 							<%
 							if(productService.getLastModifiedDate()!=null){%>
 								<div class="t_date"><%=new LocalDate(productService.getLastModifiedDate().getTime()-LocalDate.ONE_HOUR*9).toLocalString()%></div>
 							<%
 							}
 							%>
 						</div>
					</td>
				</tr>
				<!-- 인스턴스 인라인 조회 및 편집 화면 -->
				<tr style="display:none"><td class="inline_content js_content_target js_stop_propagation" colspan="6"></td></tr>
	<%
			}
 		}
	}else{
		sortedField = new SortingField();
	%>
		<tr class="tit_bg">
			<th class="check r_line"><input type="checkbox" class="js_toggle_select_all" /></th>
	 		<th class="r_line" style="width:40px;">
				<span>번호</span>
			</th>
	 		<th class="r_line">
	 			<a href="" class="js_select_field_sorting" fieldId="<%=ProductService.FIELD_NAME%>">제품-서비스 이름
 			 		<span class="<%if(sortedField.getFieldId().equals(ProductService.FIELD_NAME)){
						if(sortedField.isAscending()){ %>icon_in_up<%}else{ %>icon_in_down<%}}%>"></span>
 				</a>
				<span class="js_progress_span"></span>
			</th>
	 		<th class="r_line"  style="min-width:200px">설 명</th>
	 		<th class="r_line">
				<form class="form_space js_space_name" name="frmSpaceName">
					<select name="selSpaceName" class="js_select_space_name">
						<option value="<%=ProductService.PSS_SPACE_VALUE%>" <%if(params.getSpaceType().equals(ProductService.PSS_SPACE_VALUE)){%>selected<%} %>>가치공간(Value Space)</option>
						<option value="<%=ProductService.PSS_SPACE_SERVICE%>" <%if(params.getSpaceType().equals(ProductService.PSS_SPACE_SERVICE)){%>selected<%} %>>서비스공간(Service Space)</option>
						<option value="<%=ProductService.PSS_SPACE_BIZ_MODEL%>" <%if(params.getSpaceType().equals(ProductService.PSS_SPACE_BIZ_MODEL)){%>selected<%} %>>비즈모델공간(Biz Model Space)</option>
					</select>
					<span class="js_progress_span"></span>
				</form>
			</th>
			<th class="r_line" style="width:162px;">
				<a href="" class="js_select_field_sorting" fieldId="<%=ProductService.FIELD_LAST_MODIFIED_USER%>">최종수정자
					<span class="<%if(sortedField.getFieldId().equals(ProductService.FIELD_LAST_MODIFIED_USER)){
						if(sortedField.isAscending()){ %>icon_in_up<%}else{ %>icon_in_down<%}}%>"></span>
				</a>/
				<a href="" class="js_select_field_sorting" fieldId="<%=ProductService.FIELD_LAST_MODIFIED_DATE%>">최종수정일
					<span class="<%if(sortedField.getFieldId().equals(ProductService.FIELD_LAST_MODIFIED_DATE)){
						if(sortedField.isAscending()){ %>icon_in_up<%}else{ %>icon_in_down<%}}%>"></span>
				</a>
				<span class="js_progress_span"></span>
			</th>		
		</tr>	
	<%
	}
	%>
</table>
<!-- 목록 테이블 //-->
<%
if(instanceList == null || SmartUtil.isBlankObject(instanceList.getInstanceDatas())){
%>
	<div class="tc mt5mb5">항목이 존재하지 않습니다.</div>
<%
}
if(!SmartUtil.isBlankObject(sortedField)){
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
			boolean isLast10Pages = (((currentPage - 1)  / 10) == ((totalPages - 1) / 10)) ? true : false;
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
	
	<div class="num_box">
		<span class="js_progress_span"></span>
		<select class="js_select_page_size" name="selPageSize" title="<fmt:message key='common.title.count_in_page'/>">
			<option <%if (pageSize == 20) {%> selected <%}%>>20</option>
			<option <%if (pageSize == 30) {%> selected <%}%>>30</option>
			<option <%if (pageSize == 50) {%> selected <%}%>>50</option>
			<option <%if (pageSize == 100) {%> selected <%}%>>100</option>
		</select>
	</div>
	<!-- 페이징 //-->
</form>
