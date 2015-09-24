<%@page import="net.smartworks.util.CommonUtil"%>
<%@page import="net.smartworks.skkupss.model.User"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="net.smartworks.util.LocalDate"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<%
	User cUser = SmartUtil.getCurrentUser();
	String filterId = null;
	String filterName = null;
%>
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />


<!-- 상세 필터 -->
<div class="filter_group js_search_filter_page" filterId="<%=filterId%>" filterName="<%=CommonUtil.toNotNull(filterName) %>">
	<table>
		<tr>
			<td>
				<form name="frmSearchFilter" style="display: none"
					class="filter_area js_filter_condition js_new_condition js_validation_required">
					<span class="js_filter_operator">
					</span>
				</form> 
			</td>
			
			<!-- 추가 버튼  -->
			<td class="btn_plus_space vb">
				<span class="btn_plus js_add_condition" /> </span>
			</td>
		</tr>
	</table>
		<div class="glo_btn_space">
			<div class="fr">
					<span class="btn_gray"> 
						<a href="" class="js_search_filter_saveas"> 
							<span class="txt_btn_start"></span> 
							<span class="txt_btn_center"><fmt:message key="common.button.save_as"/></span> 
							<span class="txt_btn_end"></span>
						</a> 
					</span> 
	 			<%
	 			if(!(!SmartUtil.isBlankObject(filter) && filter.isSystemFilter())){
				%>
					<span class="btn_gray"> 
						<a href="" class="js_search_filter_save"> 
							<span class="txt_btn_start"></span> 
							<span class="txt_btn_center"><fmt:message key="common.button.save"/></span> 
							<span class="txt_btn_end"></span>
						</a> 
					</span>
					<span class="btn_gray"> 
						<a href="" class="js_search_filter_delete"> 
							<span class="txt_btn_start"></span> 
							<span class="txt_btn_center"><fmt:message key="common.button.delete"/></span> 
							<span class="txt_btn_end"></span>
						</a> 
					</span> 
				<%
				}
				%>
		
				<span class="btn_gray"> 
					<a href="" class="js_search_filter_execute"> 
						<span class="txt_btn_start"></span> 
						<span class="txt_btn_center"><fmt:message key="common.button.execute"/></span> 
						<span class="txt_btn_end"></span>
					</a> 
				</span> 
				<span class="btn_gray">
					<a href="" class="js_search_filter_close"> 
						<span class="txt_btn_start"></span> 
						<span class="txt_btn_center"><fmt:message key="common.button.cancel"/></span> 
						<span class="txt_btn_end"></span> 
					</a> 
				</span>
			</div>
			<form name="frmSearchFilterActions" class="pr10 fr js_validation_required">
				<input class="fieldline" style="width:160px; line-height: 16px" type="text" name="txtNewFilterName" value="<%=filter==null || filter.isSystemFilter() ? "" : filterName %>" />
			</form>
			
			<!--  실행시 표시되는 프로그래스아이콘을 표시할 공간 -->
			<span class="fr form_space js_progress_span" ></span>
			
			<!-- 실행시 데이터 유효성 검사이상시 에러메시지를 표시할 공간 -->
			<div class="form_space sw_error_message js_filter_error_message" style="text-align:right; color: red; line-height: 20px"></div>
			
		</div>
	<%} %>
</div>
