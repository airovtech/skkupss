<%@page import="net.smartworks.util.SmartUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<script>
	console.log("parent.location.href=" + parent.location.href);
//	document.location.href = parent.location.href;
</script>

<%

	response.sendRedirect("home.sw");

%>