<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="java.util.Locale"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<!--[if lte IE 8]><link rel="stylesheet" href="css/black/ie8.css" type="text/css" media="all"><![endif]-->
<html>
<fmt:setLocale value="<%=Locale.getDefault().getLanguage() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<link href="css/default.css" type="text/css" rel="stylesheet" /></link>
		<link href="css/black/pop.css" type="text/css" rel="stylesheet" /></link>
		<link href="css/black/login.css" type="text/css" rel="stylesheet" /></link>
		<script type="text/javascript" src="js/jquery/jquery-1.6.2.min.js"></script>
		<script type="text/javascript" src="js/sw/sw-language.js"></script>
		<script type="text/javascript" src="js/sw/sw-language-ko.js"></script>
		<script type="text/javascript" src="js/sw/sw-language-en.js"></script>
		<script type="text/javascript" src="js/sw/sw-util.js"></script>
		<script type="text/javascript" src='js/sw/sw-popup.js'></script>
		<title>Product-Service Support System</title>
		<link rel="shortcut icon" href="images/pss/cdi-logo-s.png"/>
		<script type="">
		</script>

	</head>

	<script type="text/javascript"> 
		var requestedHref =  document.location.href;
		if(isEmpty(parent.location.pathname.match('login.sw'))){
		    parent.location.href = "login.sw";
		}
		var currentUser = {
			locale : "<%=java.util.Locale.getDefault().getLanguage()%>"
		};
	</script>

	<body>
		<div id="lo_wrap">
	
			<!-- Header -->
			<div id="lo_header">
				<div class="lo_logo pt3 vb" style="color:white; font-size:20px;width:600px;padding-top: 20px !important;"><fmt:message key="pss.title.repository"/></div>	
 				<form class="lo_idp t_wh" action="j_spring_security_check" method="post">
					<div class="fl mr5" >
					<div class="mb2" style="width:142px"><fmt:message key="profile.title.email"/></div>
					<input id="j_username" name="j_username" maxlength="50" type="text"/>
					</div>
					
					<div class="fl">
					<div class="mb2"><fmt:message key="profile.title.password"/></div>
					<input id="j_password" name="j_password" maxlength="50" type="password"/>
					</div>
					
 					<input class="fl btn_login" type="submit" value="<fmt:message key="login.button.login"/>">					
 				</form>
			</div>
			<!-- Header //-->
	
			<!-- Contents -->
			<div id="lo_contents">
			<div><img src="images/pss/company_logo.png" border="0" /></div>
			</div>
			<!-- End of Contents -->
			
			<!-- Footer -->
			<div id="footer">
					<span class="bottom_text">Copyright <span>ⓒ</span> Sungkyunkwan University CDI. All Rights Reserved.</span>
			</div>
			<!-- End of Footer -->
		</div>
	</body>
</html>
<%
	String type = (String)request.getParameter("type");
	if(SmartUtil.isBlankObject(type)) type ="login";
%>
<script type="text/javascript">
$(function() {
	
	<%
	if(type.equals("failedLogin")) {
	%>
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('illegalAcountError'));
 	<%
	}
	%>
	
    $(document).keypress(function (e) {
    	var keyCode = e.which || e.keyCode;
        if (keyCode == 13) {
            $('input[type="submit"]').click();
            return false;
        } else {
            return true;
        }
    });
    
    $('input[type="submit"]').click(function(){
    });
});
</script>
