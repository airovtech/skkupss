<%@page import="java.util.TimeZone"%>
<%@page import="java.util.Locale"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ page session="true"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
<script type="">
try{
	currentUser = {
		userId : "cdiuser@skku.edu",
		name : "CDI 사용자",
		longName : "CDI 사용자",
		nickName : "CDI 사용자",
		company : "성균관대학교",
		companyId : "skku",
		department : "",
		departmentId : "",
		isUseMail : "false",
		minPicture : "",
		midPicture : "",
		orgPicture : "",
		locale : "<%=Locale.KOREAN%>",
		timeZone : "",
		timeOffset : "",
		signPicture : ""
	};

	companyGeneral = {
		useMessagingService : "false",
		useChattingService : "false",
		fileUploadLimit : <%=500%>
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
<link href="css/black/pss.css?v=3.5.3" type="text/css" rel="stylesheet"/>

<link href="css/ui-lightness/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css" title="ui-theme" />
<link href="css/jqgrid/themes/ui.jqgrid.css" rel="stylesheet" type="text/css" media="screen" />
<link href="css/ext/ext-all.css" type="text/css" rel="stylesheet" />
<link href="css/fileuploader/fileuploader.css" type="text/css" rel="stylesheet"/>
<link href="css/fullcalendar/fullcalendar.css" type="text/css" rel="stylesheet"/>

<link rel="stylesheet" type="text/css" href="js/jqgrid/themes/redmond/jquery-ui-1.8.2.custom.css" media="screen" />
<link rel="stylesheet" type="text/css" href="js/jqgrid/themes/ui.jqgrid.css"  media="screen"/>

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

<script src="js/jqgrid/js/i18n/grid.locale-en.js" type="text/javascript"></script>
<script src="js/jqgrid/js/jquery.jqGrid.min.js" type="text/javascript"></script>

<!-- <script type="text/javascript" src="js/ext/bootstrap.js"></script> -->
<script type="text/javascript" src="js/ext/ext-all.js"></script>

<script src="js/smartChart-sencha.js" type="text/javascript"></script>

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
<script type="text/javascript" src="js/sw/sw-act-pss.js?v=3.5.3.1" ></script>

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

<title>Product-Service Support System</title>
<link rel="shortcut icon" href="images/pss/cdi-logo-s.png"/>

</head>

<body>

<script type="">smartPop.progressCenter();</script>

<%

	String spaceType = request.getParameter("spaceType");
%>

	<div id="wrap">
		<!-- Header -->
		<div id="header" style="">
			<jsp:include page="header.jsp" />
		</div>
		<!-- Header//-->

		<!-- Contents-->
		<div id="content" style="min-width:1200px">
			<jsp:include page="psList.jsp">
				<jsp:param value="<%=spaceType %>" name="spaceType"/>
			</jsp:include>
		</div>
		<!-- Contents//-->

		<!-- Footer-->
		<div id="footer">
			<jsp:include page="footer.jsp" />
		</div>
		<!-- Footer //-->
		
	</div>
<script type="">smartPop.closeProgress();</script>
</body>
</html>
