<%@ page contentType="text/html; charset=utf-8"%>
<%
%>

<!-- 목록 테이블 -->
<table>
	<%	
//  	SortingField sortedField = null;
	int pageSize = 20, totalPages = 1, currentPage = 1;
/* 	if (instanceList != null && work != null) {
		int type = instanceList.getType();
		sortedField = instanceList.getSortedField();
		if(sortedField==null) sortedField = new SortingField();
		int colSpan = (isUserMode?4:6) + (work.getDisplayFields()==null?0:work.getDisplayFields().length);
 */	%>
		<tr class="tit_bg">
			<th class="check r_line"><input type="checkbox" class="js_toggle_select_all" /></th>
	 		<th class="r_line" style="width:40px;">
				<span>번호</span>
			</th>
	 		<th class="r_line" style="width:160px">
	 			<a href="" class="js_select_field_sorting" fieldId="">제품-서비스 이름
<%-- 			 		<span class="<%
					if(sortedField.getFieldId().equals(field.getId())){
						if(sortedField.isAscending()){ %>icon_in_up<%}else{ %>icon_in_down<%}}%>"></span>
 --%>				</a>
				<span class="js_progress_span"></span>
			</th>
	 		<th class="r_line"  style="min-width:200px">
	 			<a href="" class="js_select_field_sorting" fieldId="">설 명
				</a>
				<span class="js_progress_span"></span>
			</th>
	 		<th class="r_line">
				<form class="form_space js_form_filter_name" name="frmIworkFilterName">
					<select name="selFilterName" class="js_select_search_filter">
						<option value="">가치공간(Value Space)</option>
						<option value="">서비스공간(Service Space)</option>
						<option value="">비즈모델공간(Biz Model Space)</option>
					</select>
				</form>
			</th>
			<th class="r_line" style="width:162px;">
				<a href="" class="js_select_field_sorting" fieldId="">
					최종수정자<span class=""></span>
				</a>/
				<a href="" class="js_select_field_sorting" fieldId="">
					최종수정일<span class="icon_in_down"></span>
				</a>
				<span class="js_progress_span"></span>
			</th>		
		</tr>	
</table>
	<div class="tc mt5mb5">항목이 존재하지 않습니다.</div>
<!-- 목록 테이블 //-->

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
