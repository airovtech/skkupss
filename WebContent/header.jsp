<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.User"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%
	User cUser = SmartUtil.getCurrentUser();
%>
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />
<script type="text/javascript">
function logout() {
	smartPop.progressCenter();
	document.location.href = "logout.sw?userId=" + currentUser.userId;
};
</script>

<div class="company_logo">
	<span>
		<a href="home.sw">
			<img style="width:auto" class="js_auto_picture js_company_logo_src" src="images/pss/company_logo.png" />
		</a>
	</span>
</div>
<!-- 회사 로고 및 연결 링크 //-->

<!-- 헤더에 있는 메뉴들 및 연결 기능 -->
<div class="top_menu" style="color:white;text-align:center; font-size:20px;width:510px;height:35px;padding-top: 15px !important;"><fmt:message key="pss.title.repository"/></div>
<!-- 헤더에 있는 메뉴들 및 연결 기능 // -->

<!--  전체 메뉴  -->
<div class="global_menu">

 	<%
	if (cUser.getUserLevel() == User.USER_LEVEL_ADMINISTRATOR) {
 	%>
		<!-- 관리자 권한이 있는 사용자에게 제공되는 시스템설정, 스마트빌더, 앱스토어 버튼들  -->
		<div class="pop_admin">
			<a href="settings_home.sw"><span class="btn_setting" title="<fmt:message key='header.global_menu.settings'/>" ></span></a>
		</div>
 	<%
 	}
 	%>
	<!-- 개인정보수정 및 로그아웃 영역  -->
	<div>
		<a href="" onclick="$(this).parent().next('div').toggle(); return false;"><img class="profile_size_s mb3 mr3" src="<%=cUser.getMinPicture()%>"/><%=cUser.getLongName()%>▼ </a>
	</div>

	<!-- 위의 사용자정보 클릭시 나타나는 개인정보수정 및 로그아웃 버튼들  -->
	<div class="pop js_header_user_settings" style="display: none">
		<ul>
			<li><a href="my_profile.sw?userId=<%=cUser.getId()%>"><fmt:message key="header.global_menu.edit_my_profile" /></a></li>
			<li><a href="javascript:logout();"><fmt:message key="header.global_menu.logout" />
			</a>
			</li>
		</ul>
	</div>
</div>
