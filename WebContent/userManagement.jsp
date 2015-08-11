<%@page import="net.smartworks.util.SmartMessage"%>
<%@page import="net.smartworks.util.LocalDate"%>
<%@page import="net.smartworks.util.KeyMap"%>
<%@page import="net.smartworks.util.CommonUtil"%>
<%@page import="net.smartworks.skkupss.model.InstanceList"%>
<%@page import="net.smartworks.factory.ManagerFactory"%>
<%@page import="net.smartworks.skkupss.model.User"%>
<%@page import="net.smartworks.skkupss.model.RequestParams"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%
try{
	// 스마트웍스 서비스들을 사용하기위한 핸들러를 가져온다. 현재사용자 정보도 가져온다..
	RequestParams params = (RequestParams)request.getAttribute("requestParams");
	if(SmartUtil.isBlankObject(params)){
		params = new RequestParams();
	}
	User cUser = SmartUtil.getCurrentUser();
	
	InstanceList instanceList = ManagerFactory.getInstance().getServiceManager().getUserInstanceList(params);
	int pageSize = instanceList.getPageSize();
	int totalPages = instanceList.getTotalPages();
	int currentPage = instanceList.getCurrentPage();
	User[] users = (User[])instanceList.getInstanceDatas();
	
%>
<script type="text/javascript">
try{
	selectListParam = function(progressSpan, isGray){
		var companyEvent = $('.js_userManagement_page');
		var forms = companyEvent.find('form:visible');
		var paramsJson = {};
		paramsJson["href"] = "userManagement.jsp";
		for(var i=0; i<forms.length; i++){
			var form = $(forms[i]);
			paramsJson[form.attr('name')] = mergeObjects(form.serializeObject(), SmartWorks.GridLayout.serializeObject(form));
		}
		progressSpan = companyEvent.find('span.js_progress_span:first');
		smartPop.progressCont(progressSpan);
		console.log(JSON.stringify(paramsJson));
		var url = "set_instance_list_params.sw";
		$.ajax({
			url : url,
			contentType : 'application/json',
			type : 'POST',
			data : JSON.stringify(paramsJson),
			success : function(data, status, jqXHR) {
				$('#content').html(data);
				smartPop.closeProgress();
			},
			error : function(xhr, ajaxOptions, thrownError) {
				smartPop.closeProgress();
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('companyEventListError'), null, thrownError);
			}
		});
	};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[company_event script]', null, error);
}
</script>
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />

<!-- 컨텐츠 레이아웃-->
<div class="section_portlet setting_section js_userManagement_page">
	<div class="portlet_t"><div class="portlet_tl"></div></div>
	<div class="portlet_l" style="display: block;">
		<ul class="portlet_r" style="display: block;">
			<!-- 타이틀 -->
			<div class="body_titl">
				<div class="user fl" style="margin-top:-1px"></div>
				<div class="noti_in_bodytitle" style="margin-top:25px">
					<div class="pr10 fl">
						<span class="title current"><fmt:message key="nav.works.user_management"/>
					</div>
				</div>				
				<!-- 우측 버튼 -->
				<div class="txt_btn" style="line-height: 27px">
				</div>
				<!-- 우측 버튼 //-->
				<div class="solid_line"></div>
			</div>
			<!-- 타이틀 -->
			<!-- 컨텐츠 -->
			<div class="contents_space">
				<!-- 타이틀 영역 -->
				<div class="list_title_space">
					<div class="title"><fmt:message key="common.title.user_list"/></div>
					<!-- 우측버튼 -->
					<div class="title_line_btns">
						<div class="icon_btn_add">
							<a class="icon_btn_tail js_new_user" href=""><fmt:message key="common.button.add_new"/></a>
						</div>
					</div>
					<!-- 우측버튼 //-->
				</div>
				<!-- 타이틀 영역// -->
				<!-- 추가하기 테이블 -->
				<div class="js_new_user"></div>
				<!-- 추가하기 테이블 //-->
				<!-- 근무정책 목록 -->
				<div class="list_contents">
					<div>
						<table>
							<tbody>
								<tr class="tit_bg">
									<th class="r_line"><fmt:message key="profile.title.user_name"/></th>
									<th class="r_line"><fmt:message key="profile.title.user_id"/></th>
									<th class="r_line"><fmt:message key="profile.title.user_level"/></th>
									<th class="r_line"><fmt:message key="profile.title.locale"/></th>
									<th class="r_line"><fmt:message key="profile.title.timezone"/></th>
									<th class="r_line"><fmt:message key="profile.title.cell_phone_no"/></th>
									<th class="r_line"><fmt:message key="profile.title.home_phone_no"/></th>
									<th width="20px"></th>
								</tr>
								<%
								if(!SmartUtil.isBlankObject(users)){
									KeyMap[] timeZoneNames = LocalDate.getAvailableTimeZoneNames(cUser.getLocale());
									for(User user : users){	
										String localeTitle = "common.title.locale." + user.getLocale();
										String userLevelString = "";
										switch(user.getUserLevel()){
										case User.USER_LEVEL_USER:
											userLevelString = SmartMessage.getString("organization.user_level.internal_user");
										break;
										case User.USER_LEVEL_ADMINISTRATOR:
											userLevelString = SmartMessage.getString("organization.user_level.administrator");
										break;
											
										}
								%>
										<tr class="js_edit_user list_action_item border_bottom" userId=<%=CommonUtil.toNotNull(user.getId()) %>>
											<td><a href=""><img class="profile_size_s mb3 mr3" src="<%=user.getMinPicture()%>"/><span><%=user.getLongName() %></span></a></td>
											<td><a href=""><%=user.getId() %></a></td>
											<td><a href=""><%=userLevelString %></a></td>
											<td><a href=""><fmt:message key="<%=localeTitle%>"/></a></td>
											<td><a href=""><%=KeyMap.getKeyById(timeZoneNames, user.getTimeZone()) %></a></td>
											<td><a href=""><%=CommonUtil.toNotNull(user.getMobilePhoneNo()) %></a></td>
											<td><a href=""><%=CommonUtil.toNotNull(user.getHomePhoneNo()) %></a></td>
											<td><%if(!SmartUtil.isBlankObject(user.getId())){ %><div class="list_action"><div title="<fmt:message key='common.button.delete'/>" class="js_delete_user"> X </div></div><%} %></td>
										</tr>
								<%
									}
								}
								%>
							</tbody>
						</table>
						<%
						if(SmartUtil.isBlankObject(users)){
						%>
							<div class="tc mt5mb5"><fmt:message key="common.message.no_instance"/></div>
						<%
						}
						%>
						<form name="frmCompanyEventListPaging">
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
									<option <%if (pageSize == 10) {%> selected <%}%>>10</option>
									<option <%if (pageSize == 20) {%> selected <%}%>>20</option>
									<option <%if (pageSize == 30) {%> selected <%}%>>30</option>
									<option <%if (pageSize == 50) {%> selected <%}%>>50</option>
								</select>
							</div>
							<!-- 페이징 //-->
						</form>
					</div>
				</div>
				<!-- 근무정책 목록 //-->
			</div>
			<!-- 컨텐츠 //-->
		</ul>
	</div>
	<div class="portlet_b" style="display: block;"></div>
</div>
<!-- 컨텐츠 레이아웃//-->
<%
}catch(Exception e){ e.printStackTrace();
%>
	<script type="text/javascript">smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[company_event jsp]', null, "<%=e%>");</script>
<%
}
%>
