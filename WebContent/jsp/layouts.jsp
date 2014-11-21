<%@page import="net.smartworks.model.company.CompanyOption"%>
<%@page import="net.smartworks.model.company.CompanyGeneral"%>
<%@page import="net.smartworks.server.engine.common.manager.IManager"%>
<%@page import="net.smartworks.server.service.factory.SwServiceFactory"%>
<%@page import="net.smartworks.server.engine.common.loginuser.model.LoginUser"%>
<%@page import="net.smartworks.server.engine.factory.SwManagerFactory"%>
<%@page import="java.util.TimeZone"%>
<%@page import="net.smartworks.model.community.WorkSpace"%>
<%@page import="net.smartworks.model.community.info.UserInfo"%>
<%@page import="org.claros.commons.configuration.PropertyFile"%>
<%@page import="org.claros.commons.mail.utility.Constants"%>
<%@page import="org.claros.commons.mail.protocols.Protocol"%>
<%@page import="org.claros.commons.mail.protocols.ProtocolFactory"%>
<%@page import="org.claros.commons.auth.models.AuthProfile"%>
<%@page import="org.claros.commons.mail.models.ConnectionMetaHandler"%>
<%@page import="org.claros.commons.mail.models.ConnectionProfile"%>
<%@page import="java.util.Locale"%>
<%@page import="net.smartworks.util.LocalDate"%>
<%@page import="net.smartworks.server.engine.scheduling.manager.impl.SchdulingManagerImpl"%>
<%@page import="net.smartworks.server.service.impl.SchedulingService"%>
<%@page	import="org.springframework.security.web.context.HttpSessionSecurityContextRepository"%>
<%@page import="java.util.Calendar"%>
<%@page import="net.smartworks.server.engine.security.model.Login"%>
<%@page import="org.springframework.security.core.Authentication"%>
<%@page	import="org.springframework.security.core.context.SecurityContext"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.model.community.User"%>
<%@page import="net.smartworks.service.ISmartWorks"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="true"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<!-- For Development Purpose -->
<%
try{
	SecurityContext context = (SecurityContext) request.getSession().getAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY);
	if (!SmartUtil.isBlankObject(context)) {
		Authentication auth = context.getAuthentication();
		if(!SmartUtil.isBlankObject(auth)) {
			String connectUserId = ((Login) auth.getPrincipal()).getId();
			if(SmartUtil.isBlankObject(session.getAttribute(connectUserId))) {
				System.out.println("-------------------------------------------");
				System.out.println(((Login) auth.getPrincipal()).getPosition() + " " + ((Login) auth.getPrincipal()).getName() + " 님이 접속하였습니다.");
				System.out.println("ID : " + ((Login) auth.getPrincipal()).getId());
				System.out.println("DEPT : " + ((Login) auth.getPrincipal()).getDepartment());
				System.out.println("ConnectTime : " + (new LocalDate()).toLocalDateValue() ); 
				System.out.println("-------------------------------------------");
	
				UserInfo[] userInfos = SwServiceFactory.getInstance().getCommunityService().getAvailableChatter(request);
				SmartUtil.publishAChatters(userInfos);

				session.setAttribute(connectUserId, new LocalDate());
			}
		}
	} else {
		response.sendRedirect("login.sw");
		return;
	}

	String cid = (String) session.getAttribute("cid");
	String wid = (String) session.getAttribute("wid");
	if (SmartUtil.isBlankObject(cid)) {
		session.setAttribute("cid", ISmartWorks.CONTEXT_HOME);
	}
	ISmartWorks smartWorks = (ISmartWorks) request.getAttribute("smartWorks");
	User currentUser = SmartUtil.getCurrentUser();
	CompanyGeneral companyGeneral = smartWorks.getCompanyGeneral();
	CompanyOption companyOption = SmartUtil.getCompanyOption();
	boolean emailEnabled =  !SmartUtil.isBlankObject(smartWorks.getEmailServers());
	session.setAttribute("emailEnabled", emailEnabled);
	
%>
<fmt:setLocale value="<%=currentUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />

<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
<script type="">
try{
	currentUser = {
		userId : "<%=currentUser.getId()%>",
		name : "<%=currentUser.getName()%>",
		longName : "<%=currentUser.getLongName()%>",
		nickName : "<%=currentUser.getNickName()%>",
		company : "<%=currentUser.getCompany()%>",
		companyId : "<%=currentUser.getCompanyId()%>",
		department : "<%=currentUser.getDepartment()%>",
		departmentId : "<%=currentUser.getDepartmentId()%>",
		isUseMail : "<%=currentUser.isUseMail() && emailEnabled%>",
		minPicture : "<%=currentUser.getMinPicture()%>",
		midPicture : "<%=currentUser.getMidPicture()%>",
		orgPicture : "<%=currentUser.getOrgPicture()%>",
		locale : "<%=currentUser.getLocale()%>",
		timeZone : "<%=currentUser.getTimeZone()%>",
		timeOffset : "<%=currentUser.getTimeOffsetInHour()%>",
		signPicture : "<%=currentUser.getSignPicture()%>"
	};

	companyGeneral = {
		useMessagingService : "<%=companyGeneral.isUseMessagingService()%>",
		useChattingService : "<%=companyGeneral.isUseChattingService()%>",
		fileUploadLimit : <%=companyGeneral.getFileUploadLimit()%>
	};

	companyOption = {
		htmlWriterPlugined : "<%=companyOption.isHtmlWriterPlugined()%>",
		pdfWriterPlugined : "<%=companyOption.isPdfWriterPlugined()%>"
	};

	function logout() {
		document.location.href = "logout.sw?userId=" + currentUser.userId;
	};
}catch(e){
}
</script>

<link href="http://meyerweb.com/eric/tools/css/reset/reset.css" rel="stylesheet" type="text/css" />
<link href="css/default.css?v=3.5.3" type="text/css" rel="stylesheet" />
<link href="css/black/layout.css?v=3.5.3.1" type="text/css" rel="stylesheet" />
<link href="css/black/detail.css?v=3.5.3" type="text/css" rel="stylesheet" />
<link href="css/black/chat.css?v=3.5.3" type="text/css" rel="stylesheet" />
<link href="css/black/form.css?v=3.5.3" type="text/css" rel="stylesheet" />
<link href="css/black/pop.css?v=3.5.3" type="text/css" rel="stylesheet" />
<link href="css/black/media.css?v=3.5.3" type="text/css" rel="stylesheet"/>

<link href="css/ui-lightness/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css" title="ui-theme" />
<link href="css/jqgrid/themes/ui.jqgrid.css" rel="stylesheet" type="text/css" media="screen" />
<link href="css/ext/ext-all.css" type="text/css" rel="stylesheet" />
<link href="css/fileuploader/fileuploader.css" type="text/css" rel="stylesheet"/>
<link href="css/fullcalendar/fullcalendar.css" type="text/css" rel="stylesheet"/>
<!-- <link href="smarteditor/css/default_kor.css" rel="stylesheet" type="text/css" />
 --><link rel="shortcut icon" href="images/favicon/smartworks.ico"/>

<!--[if lte IE 8]><link rel="stylesheet" href="css/black/ie8.css" type="text/css" media="all"><![endif]-->
 
<script type="text/javascript" src="js/jquery/jquery-1.6.2.min.js"></script>
<!--  
<script type="text/javascript" src="js/jquery/jquery-1.7.1.min.js"></script>
 -->
<script type="text/javascript" src="js/jquery/jquery.ui.core.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.validate.js"></script>
<script type="text/javascript" src="js/jquery/jquery.effects.core.js"></script>
<script type="text/javascript" src="js/jquery/jquery.effects.explode.js"></script>
<script type="text/javascript" src="js/jquery/jquery-ui-1.8.16.custom.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.ui.widget.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.ui.mouse.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.ui.draggable.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.ui.resizable.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.ui.slider.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.ui.datepicker.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.ui.datepicker-ko.js"></script>
<script type="text/javascript" src="js/jquery/jquery-ui-timepicker-addon.js"></script>
<script type="text/javascript" src="js/jquery/jquery-ui-timepicker-ko.js"></script>
<script type="text/javascript" src="js/jquery/history/jquery.history.js"></script>
<script type="text/javascript" src="js/jquery/jquery.json-2.3.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.zclip.min.js"></script>
<script type="text/javascript" src="js/jquery/jshashtable-2.1.js"></script>
<script type="text/javascript" src="js/jquery/jquery.numberformatter-1.2.2.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.formatCurrency-1.4.0.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.simplemodal.1.4.2.min.js"></script>
<script type="text/javascript" src="js/jquery/fullcalendar.js"></script>
<script type="text/javascript" src="js/jquery/jquery-ui-1.8.21.custom.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.layout.js"></script>
<script type="text/javascript" src="js/jquery/i18n/grid.locale-en.js"></script>
<script type="text/javascript" src="js/jquery/jquery.jqGrid.min.js"></script>

<%if(companyGeneral.isUseMessagingService() || companyGeneral.isUseChattingService()){ %>
	<script type="text/javascript" src="js/jstorage/jstorage.js"></script>
	<script type="text/javascript" src="js/faye/faye-browser-min.js"></script>
<%} %>
<!-- <script type="text/javascript" src="js/ext/bootstrap.js"></script> -->
<script type="text/javascript" src="js/ext/ext-all.js"></script>


<script type="text/javascript" src="js/sw/sw-jquery.js?v=3.5.3"></script>
<script type="text/javascript" src="js/sw/sw-common.js?v=3.5.3"></script>
<script type="text/javascript" src="js/sw/sw-util.js?v=3.5.3"></script>
<script type="text/javascript" src="js/sw/sw-language.js?v=3.5.3"></script>
<script type="text/javascript" src="js/sw/sw-language-ko.js?v=3.5.3"></script>
<script type="text/javascript" src="js/sw/sw-language-en.js?v=3.5.3"></script>
<script type="text/javascript" src="js/sw/sw-more.js?v=3.5.3"></script>
<script type="text/javascript" src="js/sw/sw-nav.js?v=3.5.3"></script>
<script type="text/javascript" src="js/sw/sw-validate.js?v=3.5.3"></script>
<script type="text/javascript" src="js/sw/sw-flash.js?v=3.5.3"></script>
<script type="text/javascript" src="js/sw/sw-iframe-autoheight.js?v=3.5.3"></script>

<%if(companyGeneral.isUseMessagingService() || companyGeneral.isUseChattingService()){ %>
	<script type="text/javascript" src="js/sw/sw-faye.js?v=3.5.3"></script>
	<script type="text/javascript" src="js/sw/sw-chat.js?v=3.5.3"></script>
<%} %>
<script type="text/javascript" src="js/sw/sw-report.js?v=3.5.3"></script>
<script type="text/javascript" src="js/sw/sw-file.js?v=3.5.3"></script>
<!-- <script type="text/javascript" src="js/sw/sw-webmail.js"></script>
 -->
<script type="text/javascript" src='js/sw/sw-formFields.js?v=3.5.3'></script>
<script type="text/javascript" src='js/sw/sw-popup.js?v=3.5.3'></script>

<script type="text/javascript" src="js/sw/sw-act-nav.js?v=3.5.3"></script>
<script type="text/javascript" src="js/sw/sw-act-report.js?v=3.5.3"></script>
<script type="text/javascript" src="js/sw/sw-act-search.js?v=3.5.3"></script>
<script type="text/javascript" src="js/sw/sw-act-filter.js?v=3.5.3"></script>
<script type="text/javascript" src="js/sw/sw-act-work.js?v=3.5.3"></script>
<script type="text/javascript" src="js/sw/sw-act-space.js?v=3.5.3.1"></script>
<script type="text/javascript" src="js/sw/sw-act-form.js?v=3.5.3"></script>
<script type="text/javascript" src="js/sw/sw-act-settings.js?v=3.5.3"></script>
<script type="text/javascript" src="js/sw/sw-act-builder.js?v=3.5.3"></script>
<script type="text/javascript" src="js/sw/sw-act-mail.js?v=3.5.3"></script>

<script type="text/javascript" src='js/smartform/smartworks.js?v=3.5.3'></script>
<script type="text/javascript" src='js/smartform/sw-form-layout.js?v=3.5.3'></script>
<script type="text/javascript" src='js/smartform/sw-form-field-builder.js?v=3.5.3'></script>
<script type="text/javascript" src='js/smartform/sw-form-dataFields.js?v=3.5.3'></script>
<script type="text/javascript" src='js/smartform/field/currency_input.js?v=3.5.3'></script>
<script type="text/javascript" src='js/smartform/field/radio_button.js?v=3.5.3'></script>
<script type="text/javascript" src='js/smartform/field/check_box.js?v=3.5.3'></script>
<script type="text/javascript" src='js/smartform/field/combo_box.js?v=3.5.3'></script>
<script type="text/javascript" src='js/smartform/field/date_chooser.js?v=3.5.3'></script>
<script type="text/javascript" src='js/smartform/field/email_input.js?v=3.5.3'></script>
<script type="text/javascript" src='js/smartform/field/file_field.js?v=3.5.3'></script>
<script type="text/javascript" src='js/smartform/field/number_input.js?v=3.5.3'></script>
<script type="text/javascript" src='js/smartform/field/percent_input.js?v=3.5.3'></script>
<script type="text/javascript" src='js/smartform/field/rich_editor.js?v=3.5.3'></script>
<script type="text/javascript" src='js/smartform/field/text_input.js?v=3.5.3'></script>
<script type="text/javascript" src='js/smartform/field/label.js?v=3.5.3'></script>
<script type="text/javascript" src='js/smartform/field/time_chooser.js?v=3.5.3'></script>
<script type="text/javascript" src='js/smartform/field/datetime_chooser.js?v=3.5.3'></script>
<script type="text/javascript" src='js/smartform/field/user_field.js?v=3.5.3'></script>
<script type="text/javascript" src='js/smartform/field/department_field.js?v=3.5.3'></script>
<script type="text/javascript" src='js/smartform/field/ref_form_field.js?v=3.5.3'></script>
<script type="text/javascript" src='js/smartform/field/image_box.js?v=3.5.3'></script>
<script type="text/javascript" src='js/smartform/field/videoYT_box.js?v=3.5.3'></script>
<script type="text/javascript" src='js/smartform/field/auto_index.js?v=3.5.3'></script>
<script type="text/javascript" src='js/smartform/field/data_grid.js?v=3.5.3'></script>

<script type="text/javascript" src="smarteditor/js/HuskyEZCreator.js?v=3.5.3" charset="utf-8"></script>
<script type="text/javascript" src="js/jquery/fileuploader/fileuploader.js" ></script>
<script type="text/javascript" src="js/jquery/image-preview.js" ></script>

<script type="text/javascript" src="js/sw/sw-work-util.js?v=3.5.3.1" ></script>

<title><fmt:message key="head.title"><fmt:param value="<%=currentUser.getCompany() %>" /></fmt:message></title>

</head>

<body>

<script type="">smartPop.progressCenter();</script>

	<div id="wrap">
		<!-- Header -->
		<div id="header">
			<tiles:insertAttribute name="header" />
		</div>
		<!-- Header//-->

 		<!-- Navigation -->
		<div id="nav">
			<tiles:insertAttribute name="nav" />
		</div>
		<!-- Navigation// -->

		<!-- Broadcasting Board -->
		<div id="board">
			<tiles:insertAttribute name="board" />
		</div>
		<!-- Broadcasting Board//-->

		<!-- Contents-->
		<div id="content">
			<tiles:insertAttribute name="content" />
		</div>
		<!-- Contents//-->

		<!-- Footer-->
		<div id="footer">
			<tiles:insertAttribute name="footer" />
		</div>
		<!-- Footer //-->
		
 		<!-- Nav Collase Button -->
		<div titleCol="<fmt:message key='nav.title.menu_collapse'/>" titleExp="<fmt:message key='nav.title.menu_expand'/>" style="height:0px!important"><a href="" class="btn_collapse_nav" title="<fmt:message key='nav.title.menu_collapse'/>"></a></div>

	</div>
 	<%if(companyGeneral.isUseChattingService()){ %>
 		<jsp:include page="/jsp/chatting/chatter_list.jsp" />
 	<%} %>

<script type="">smartPop.closeProgress();</script>
<%if(currentUser.isUseMail() && emailEnabled){ %>
	<script type="">smartCommon.autoCheckMail();</script>
<%} %>
</body>
</html>
<%
}catch(Exception e){ e.printStackTrace();
%>
	<script type="text/javascript">smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[layouts jsp]', null, "<%=e%>");</script>
<%
}
%>
