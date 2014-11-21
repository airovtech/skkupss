<!-- Name 			: header.jsp									 
<!-- Description	: 화면구성중에 Header 에 해당 되는 부분을 표현하는 화면 	
<!-- Author			: Y.S. JUNG										 
<!-- Created Date	: 2011.9.										 
-->

<%@page import="net.smartworks.util.LocalDate"%>
<%@page import="net.smartworks.util.SmartMessage"%>
<%@page import="net.smartworks.model.company.UserMenu"%>
<%@page import="net.smartworks.model.work.SmartWork"%>
<%@page import="net.smartworks.model.mail.MailFolder"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page import="net.smartworks.service.ISmartWorks"%>
<%@ page import="net.smartworks.model.community.*"%>
<%@ page import="net.smartworks.model.notice.*"%>
<%@page import="net.smartworks.model.company.CompanyGeneral"%>

<%
try{
	// 스마트웍스 서비스들을 사용하기위한 핸들러를 가져온다. 그리고 현재사용자 정보도 가져온다.	
	ISmartWorks smartWorks = (ISmartWorks) request.getAttribute("smartWorks");
	User cUser = SmartUtil.getCurrentUser();
	String cid = request.getParameter("cid");
	String checkMail = request.getParameter("checkMail");
	if (SmartUtil.isBlankObject(cid))
		cid = ISmartWorks.CONTEXT_PREFIX_HOME + cUser.getId();
	String wid = request.getParameter("wid");
	if (SmartUtil.isBlankObject(wid))
		wid = cUser.getId();
	
	boolean emailEnabled = (Boolean)session.getAttribute("emailEnabled");
	// 서버에서 현재사용자에 대한 Notice들을 가져온다.
	Notice[] notices = smartWorks.getNoticesForMe(emailEnabled);
	//로고반영 구현을 위해 추가
	CompanyGeneral companyGeneral = smartWorks.getCompanyGeneral();
	String companyLogo = (SmartUtil.isBlankObject(companyGeneral) || SmartUtil.isBlankObject(companyGeneral.getCompanyLogo())) ? "images/logo_compay.gif" : companyGeneral.getCompanyLogo();

	String mailInboxId = emailEnabled ? smartWorks.getFolderIdByType(MailFolder.TYPE_SYSTEM_INBOX) : null; 
	UserMenu[] companyMenus = smartWorks.getCompanyMenus();
	
%>

<script>

// 서버에서 SmartUtil.publishMessage()로 NOTICE_COUNT를 현재사용자에게 메시지를 보내면 처리하는 함수이다.
function updateNoticeCount(message){
try{
	var type = message.type;
	var count = message.count;
	var data = "";
	var targetId = "";
	if (count > 0)
		data = "<em class='icon_number'>" + count + "<span></span></em>";
	if (type == <%=Notice.TYPE_NOTIFICATION%>) {
		targetId = "notification_count";
		$('#' + targetId).html(data);
		updateRecentOnHome();
	} else if (type == <%=Notice.TYPE_MESSAGE%>) {
		targetId = "message_count";
		$('#' + targetId).html(data);
	} else if (type == <%=Notice.TYPE_COMMENT%>) {
		targetId = "comment_count";
		$('#' + targetId).html(data);
		updateRecentOnHome();
	} else if (type == <%=Notice.TYPE_ASSIGNED%>) {
		targetId = "assigned_count";
		$('#' + targetId).html(data);
		if(count==0){
			$('#content .js_view_my_instances > a[viewType="assigned_instances"]').hide().find('.js_assigned_count').html('[0]');
			$('#content .js_view_my_instances > a[viewType="smartcaster_instances"]').click();
		}else{
			var assignedInstances = $('#content .js_view_my_instances > a[viewType="assigned_instances"]');
			assignedInstances.show().find('.js_assigned_count').html('[' + count + ']');
		}
		updateRecentOnHome();
	} else if (type == <%=Notice.TYPE_MAILBOX%>) {
		targetId = "mailbox_count";
		if(Number($('#' + targetId + ' .icon_number').text()) != count){
			$('#' + targetId).html(data);
 			if(!isEmpty($('.js_mail_folders:visible')))
 				refreshNavMail();
 			var mailListPage = $('#content .js_mail_list_page');
			if(!isEmpty(mailListPage)){
				var url = mailListPage.attr('currentHref') + '&refreshOnly=true';
				smartPop.progressCenter();
				$.ajax({
					url : url,
					data : {},
					success : function(data, status, jqXHR) {
						var mailListPage = $('#content .js_mail_list_page');
						if(!isEmpty(mailListPage))
							$('#content').html(data);
						smartPop.closeProgress();
					},
					error : function(xhr, ajaxOptions, thrownError){
						smartPop.closeProgress();
						smartPop.showInfo(smartPop.ERROR, '[header script]' + smartMessage.get('technicalProblemOccured'), null, thrownError);
					}
				});
			}
		}
	} else if (type == <%=Notice.TYPE_SAVEDBOX%>) {
		targetId = "savedbox_count";
		$('#' + targetId).html(data);
	} else if (type == <%=Notice.TYPE_UNFETCHED_MAILS%>) {
		var unfetchedMails = $('#unfetched_mails');
		if(count<=0){
			unfetchedMails.hide();
		}else{
			var size = message.size;
			unfetchedMails.find('.js_unfetched_size').text(size);
			unfetchedMails.find('.js_unfetched_count').text(count);
			unfetchedMails.show();
		}
	}
	
	if(count>0){
		$('#' + targetId).parent().show();
	}else{
		$('#' + targetId).parent().hide();
	}
	
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[header script]', null, error);
}
};

function logout() {
	smartPop.progressCenter();
	document.location.href = "logout.sw?userId=" + currentUser.userId;
};

</script>

<!-- 회사 로고 및 연결 링크 -->
<!--  style 확인 필요함 -->
<div class="company_logo">
	<span>
		<a href="home.sw?cid=<%=ISmartWorks.CONTEXT_PREFIX_HOME + cUser.getId()%>">
			<img class="js_auto_picture js_company_logo_src" src="<%=companyLogo%>" />
		</a>
	</span>
	<span class="line"> </span>
</div>
<!-- 회사 로고 및 연결 링크 //-->

<!-- Notice 아이콘들 및 연결 기능  -->
<div class="notice_icons js_notice_icons_area">
	<span>
		<ul class="mt4">
			<!--  Notification 알림 영역 -->
			<%-- *** js_notice_count : sw_act_nav.sw에서 이벤트를 받아 Message List Box를 보여준다. --%>
			<li class="icon_info js_notice_count" title="<fmt:message key='header.notice.icon.notification'/>" <%if (notices.length <= Notice.TYPE_NOTIFICATION || notices[Notice.TYPE_NOTIFICATION].getLength() == 0){%>style="display:none"<%} %>>
				<a id="notification_count" href="notice_message_box.sw?noticeType=<%=Notice.TYPE_NOTIFICATION%>">
					<%
		 			if (notices.length > Notice.TYPE_NOTIFICATION && notices[Notice.TYPE_NOTIFICATION].getLength() > 0) {
		 			%> 
		 				<em class="icon_number"><%=notices[Notice.TYPE_NOTIFICATION].getLength()%><span></span></em>
					<%} %>
				</a>
			</li> 
			<!--  Notification 알림 영역 --%>

 			<%if(companyGeneral.isUseChattingService()){ %>
				<!-- 쪽지 알림 영역 -->
				<!-- *** js_notice_count : sw_act_nav.sw에서 이벤트를 받아 Message List Box를 보여준다. --> 
				<li class="icon_note js_notice_count" title="<fmt:message key='header.notice.icon.message'/>" <%if (notices.length <= Notice.TYPE_MESSAGE || notices[Notice.TYPE_MESSAGE].getLength() == 0){%>style="display:none"<%} %>>
					<a id="message_count" href="notice_message_box.sw?noticeType=<%=Notice.TYPE_MESSAGE%>"> 
						<%
			 			if (notices.length > Notice.TYPE_MESSAGE && notices[Notice.TYPE_MESSAGE].getLength() > 0) {
			 			%> 
			 				<em class="icon_number"><%=notices[Notice.TYPE_MESSAGE].getLength()%><span></span></em> 
						<%}%>
					</a>
				</li>
				<!-- 쪽지 알림 영역 //-->
			<%} %>
			
			<!-- 댓글 알림 영역  -->
			<!-- *** js_notice_count : sw_act_nav.sw에서 이벤트를 받아 Message List Box를 보여준다. --> 
			<li class="icon_reply js_notice_count" title="<fmt:message key='header.notice.icon.comments'/>" <%if (notices.length <= Notice.TYPE_COMMENT || notices[Notice.TYPE_COMMENT].getLength() == 0){%>style="display:none"<%} %>>
				<a id="comment_count" href="notice_message_box.sw?noticeType=<%=Notice.TYPE_COMMENT%>">
					<%
				 	if (notices.length > Notice.TYPE_COMMENT && notices[Notice.TYPE_COMMENT].getLength() > 0) {
				 	%> 
					 	<em class="icon_number"><%=notices[Notice.TYPE_COMMENT].getLength()%><span></span></em> 
					<%}%>
				</a>
			</li>
			<!-- 댓글 알림 영역  //-->
	
			<!-- 할당업무 알림 영역  -->
			<!-- *** js_notice_count : sw_act_nav.sw에서 이벤트를 받아 Message List Box를 보여준다. --> 
			<li class="icon_assworks js_notice_count" title="<fmt:message key='header.notice.icon.assigned'/>" <%if (notices.length <= Notice.TYPE_ASSIGNED || notices[Notice.TYPE_ASSIGNED].getLength() == 0){%>style="display:none"<%} %>>
				<a id="assigned_count" href="notice_message_box.sw?noticeType=<%=Notice.TYPE_ASSIGNED%>">
					<%
				 	if (notices.length > Notice.TYPE_ASSIGNED && notices[Notice.TYPE_ASSIGNED].getLength() > 0) {
				 	%> 
					 	<em class="icon_number"><%=notices[Notice.TYPE_ASSIGNED].getLength()%><span></span></em>
					<%}%>
				</a>
			</li>
			<!-- 할당업무 알림 영역  //-->
			
			<!-- 메일 알림 영역  -->
			<!-- *** js_notice_count : sw_act_nav.sw에서 이벤트를 받아 Message List Box를 보여준다. -->
			<%if(cUser.isUseMail()){ %> 
				<li class="icon_mail js_notice_count" title="<fmt:message key='header.notice.icon.mailbox'/>" <%if (notices.length <= Notice.TYPE_MAILBOX || notices[Notice.TYPE_MAILBOX].getLength() == 0){%>style="display:none"<%} %>>
					<%--<a id="mailbox_count" href="notice_message_box.sw?noticeType=<%=Notice.TYPE_MAILBOX%> --%>
					<a id="mailbox_count" class="js_mailbox_notice" href="" mailInboxId="<%=mailInboxId%>">
						<%
					 	if (notices.length > Notice.TYPE_MAILBOX && notices[Notice.TYPE_MAILBOX].getLength() > 0) {
						%> 
							<em class="icon_number"><%=notices[Notice.TYPE_MAILBOX].getLength()%><span></span></em> 
						<%}%>
					</a>
				</li>
			<%
			} 
			%>
			<!-- 메일 알림 영역  //-->
	
			<!-- 임시저장 알림 영역  -->
			<!-- *** js_notice_count : sw_act_nav.sw에서 이벤트를 받아 Message List Box를 보여준다. --> 
			<li class="icon_saved js_notice_count" title="<fmt:message key='header.notice.icon.savedbox'/>" <%if (notices.length <= Notice.TYPE_SAVEDBOX || notices[Notice.TYPE_SAVEDBOX].getLength() == 0){%>style="display:none"<%} %>>
				<a id="savedbox_count" class="js_saved_notice" href=""> 
					<%
				 	if (notices.length > Notice.TYPE_SAVEDBOX && notices[Notice.TYPE_SAVEDBOX].getLength() > 0) {
				 	%> 
				 		<em class="icon_number"><%=notices[Notice.TYPE_SAVEDBOX].getLength()%><span></span></em> 
					<%}%>
				</a>
			</li>
 			<li id="unfetched_mails" class="mt5 tc" style="font-size:10px;color:red;width:100px;display:none"><fmt:message key="mail.title.unfetched_mails"/><br/><span class="js_unfetched_size"></span>(<span class="js_unfetched_count"></span>)</li>
 			<!-- 임시저장 알림 영역  -->
			<li class="mt5" style="width:20px"><span></span></li>
		</ul>
	</span>
</div>
<!-- Notice 아이콘들 및 연결 기능  //-->

<!-- Notice icon들을 클릭했을때 보여주는 메시지 리스트 박스 -->
<div class="pop_i_info" id="notice_message_box" style="display: none">
</div>

<!-- 헤더에 있는 메뉴들 및 연결 기능 -->
<div class="top_menu">
	<ul style="width:1100px">
		<!--  대시보드 메뉴  -->
		<%
		int companyMenuCount = 0;
		if(!SmartUtil.isBlankObject(companyMenus)){
			for(int i=0; i<UserMenu.MAX_USER_MENU && i<companyMenus.length; i++){
				UserMenu userMenu = companyMenus[i];
				if(!SmartUtil.isBlankObject(userMenu) && (SmartUtil.isBlankObject(userMenu.getAccessPolicy()) || userMenu.getAccessPolicy().isAccessableForMe(null, null) )){
					companyMenuCount++;
				}
			}
		}
		if(companyMenuCount<2){
		%>
			<li class="idx3" style="background:none"></li>
		<%
		}
		%>
		<li class="idx3">
 				<a class="js_content" href="dashboard.sw?cid=<%=ISmartWorks.CONTEXT_PREFIX_DASHBOARD + cUser.getId()%>"><fmt:message key="header.top_menu.dashboard" /></a> 
		</li>
		<!--  대시보드 메뉴  //-->

		<!--  스마트케스트 메뉴  -->
		<li class="idx3">
 				<a class="js_content" href="smartcaster.sw?cid=<%=ISmartWorks.CONTEXT_PREFIX_SMARTCASTER + cUser.getId()%>"><fmt:message key="header.top_menu.smartcaster" /></a> 
		</li>
		<!--  스마트케스트 메뉴 // -->

		<!--  커뮤너티 메뉴  -->
		<li class="idx3">
 				<a class="js_content" href="communities.sw?cid=<%=ISmartWorks.CONTEXT_PREFIX_COMMUNITIES + cUser.getId()%>"><fmt:message key="header.top_menu.communities" /></a> 
		</li>
		<!--  스마트케스트 메뉴 // -->
		<%
		if(!SmartUtil.isBlankObject(companyMenus)){ 
			companyMenuCount = 0;
			for(int i=0; i<UserMenu.MAX_USER_MENU && i<companyMenus.length; i++){
				if(companyMenuCount == 5) break;
				UserMenu userMenu = companyMenus[i];
				if(!SmartUtil.isBlankObject(userMenu) && (SmartUtil.isBlankObject(userMenu.getAccessPolicy()) || userMenu.getAccessPolicy().isAccessableForMe(null, null) )){
					companyMenuCount++;
		%>
					<li class="idx3">
						<%if(userMenu.isDockable()){ %>
			 				<a class="js_content" href="dashboard.sw?menuid=<%=userMenu.getId()%>" title="<%=userMenu.getName()%>"><%=userMenu.getName()%></a> 
						<%}else{ %>
			 				<a target="_blank" href="<%=userMenu.getMenuUrl()%>" title="<%=userMenu.getName()%>"><%=userMenu.getName()%></a> 
						<%} %>
		 			</li>
		<%
				}
			} 
		}
		%>

 	</ul>
	
	<!-- 통합 검색 기능  -->
	<div class="global_srch" style="display:none">
		<div class="srch srch_wsize">
			<input id="" class="nav_input" type="text" title="<fmt:message key='search.global_search'/>" placeholder="<fmt:message key='search.global_search'/>">
			<button title="<fmt:message key='search.search'/>" onclick=""></button>
		</div>
	</div>
	<!-- 통합 검색 기능  //-->

</div>
<!-- 헤더에 있는 메뉴들 및 연결 기능 // -->

<!--  전체 메뉴  -->
<div class="global_menu">

 	<%
	if(cUser.getUserLevel() == User.USER_LEVEL_BUILDER_USER || cUser.getUserLevel() == User.USER_LEVEL_ADMINISTRATOR || cUser.getUserLevel() == User.USER_LEVEL_SYSMANAGER){
	%>
		<!-- 관리자 권한이 있는 사용자에게 제공되는 시스템설정, 스마트빌더, 앱스토어 버튼들  -->
		<div class="pop_admin">
			<a href="settings_home.sw"><span class="btn_setting" title="<fmt:message key='header.global_menu.settings'/>" ></span></a>
 			<%if(cUser.getUserLevel() == User.USER_LEVEL_BUILDER_USER || cUser.getUserLevel() == User.USER_LEVEL_SYSMANAGER){ %>
				<a href="builder_home.sw"><span class="btn_builder" title="<fmt:message key='header.global_menu.smartbuilder'/>"></span></a>
				<a href="http://appstore.smartworks.net" target="_blank"><span class="btn_appstore" title="<fmt:message key='header.global_menu.appstore'/>"></span></a>
 			<%} %>
		</div>
 	<%
	}
	%>
	<!-- 개인정보수정 및 로그아웃 영역  -->
	<div>
		<%if(cUser.getWorkingStatus()>User.WORKING_STATUS_NORMAL){
			String statusMessage = "";
			String titleMessage = "";
			LocalDate today = LocalDate.getLocalDateOnly(new LocalDate());
			if(!SmartUtil.isBlankObject(cUser.getWorkingStatusFrom()) && !SmartUtil.isBlankObject(cUser.getWorkingStatusTo()) && cUser.getWorkingStatusTo().getTime()>=cUser.getWorkingStatusFrom().getTime()){
				if(cUser.getWorkingStatusTo().getTime()>=today.getTime()){
					switch (cUser.getWorkingStatus()){
					case User.WORKING_STATUS_VACATION:
						statusMessage = SmartMessage.getString("user.title.working_status_vacation");
						break;
					case User.WORKING_STATUS_LEAVE:
						statusMessage = SmartMessage.getString("user.title.working_status_leave");
						break;
					case User.WORKING_STAUTS_EDUCATION:
						statusMessage = SmartMessage.getString("user.title.working_status_education");
						break;
					case User.WORKING_STAUTS_TRAINING:
						statusMessage = SmartMessage.getString("user.title.working_status_training");
						break;
					case User.WORKING_STAUTS_BUSINESS_TRIP:
						statusMessage = SmartMessage.getString("user.title.working_status_business_trip");
						break;
					}				
				}
				if(cUser.getWorkingStatusFrom().getTime()>today.getTime()){
					statusMessage += " " + SmartMessage.getString("user.title.working_status_planned");
				}
				if(!SmartUtil.isBlankObject(cUser.getWorkDelegatedUser())){
					statusMessage += "(" + SmartMessage.getString("user.title.work_delegated") + ")";
				}
				titleMessage = SmartMessage.getString("user.title.working_status_duration") + " : " + cUser.getWorkingStatusFrom().toLocalDateSimpleString() + "~" + cUser.getWorkingStatusTo().toLocalDateSimpleString(); 
			}
			%><a class="js_content" href="my_profile.sw?cid=<%=ISmartWorks.CONTEXT_PREFIX_MYPROFILE + cUser.getId()%>" style="color:red" title="<%=titleMessage%>"><%=statusMessage %></a><%} %><a href="" onclick="$(this).parent().next('div').toggle(); return false;"><img class="profile_size_s mb3 mr3" src="<%=cUser.getMinPicture()%>"/><%=cUser.getLongName()%>▼ </a>
	</div>

	<!-- 위의 사용자정보 클릭시 나타나는 개인정보수정 및 로그아웃 버튼들  -->
	<div class="pop js_header_user_settings" style="display: none">
		<ul>
			<li><a class="js_content" 
				href="my_profile.sw?cid=<%=ISmartWorks.CONTEXT_PREFIX_MYPROFILE + cUser.getId()%>"><fmt:message
						key="header.global_menu.edit_my_profile" /> </a>
			</li>
			<li><a href="javascript:logout();"><fmt:message key="header.global_menu.logout" />
			</a>
			</li>
		</ul>
	</div>
	<!-- // -->
	<!-- 개인정보수정 및 로그아웃 영역  //-->
	<!-- 도움말 연결  -->
	<%-- <div class="mt4">
		<a title="<fmt:message key='header.global_menu.help'/>" target="_blank" href="http://manual.smartWorks.net/"><fmt:message key="header.global_menu.help" /> </a>
	</div> --%>
	<!-- 도움말 연결  //-->


</div>
<!--  전체 메뉴  //-->
<%
}catch(Exception e){ e.printStackTrace();
%>
	<script type="text/javascript">smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[header jsp]', null, "<%=e%>");</script>
<%
}
%>
