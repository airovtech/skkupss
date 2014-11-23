<%@page import="net.smartworks.service.IPssService"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
<%
	IPssService pssService = (IPssService) request.getAttribute("pssService");
%>
This is Test.jsp<br>
<%=pssService.getTest()%> 
</body>
</html>