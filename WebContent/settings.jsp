<%@page import="net.smartworks.skkupss.model.User"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%
	User cUser = SmartUtil.getCurrentUser();
%>
<!--  다국어 지원을 위해, 로케일 및 다국어 resource bundle 을 설정 한다. -->
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />

<div id="nav">
	<!-- Nav Title -->
	<div class="personal_info">
		<ul>
			<li class="setting"></li>
			<li class="mt25"><span class="t_nav"><fmt:message key="settings.title.settings"/></span></li>
		</ul>
	</div>
	<!-- Nav Title//-->
	<!-- Nav List -->
	<div class="nav_list">
		<div class="nav_sub_list">
			<div id="m_setting">
				<!-- 내부 메뉴 -->
				<ul>
					<li><a href="userManagement.jsp" class="js_content"><span class="icon_b1dep"><fmt:message key="pss.title.user_management"/></span></a></li>
				</ul>
				<!--내부메뉴//-->
			</div>
		</div>
	</div>
	<!-- Nav List//-->
</div>

<script type="text/javascript">
$(function() {
	$('#navigation').css('height', '100%');
});
</script>
