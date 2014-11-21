<%@page import="net.smartworks.skkupss.model.db.Db_ValueSpace"%>
<%@page import="net.smartworks.skkupss.model.db.Db_ProductServiceCond"%>
<%@page import="java.util.Date"%>
<%@page import="net.smartworks.skkupss.model.db.Db_ProductService"%>
<%@page import="net.smartworks.factory.DaoFactory"%>
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


	/* Db_ProductService productService = new Db_ProductService();
	productService.setId("id4");
	productService.setName("name444444");
	productService.setPicture("picture444444");
	productService.setDescription("description44444");
	productService.setProductServiceSpace("productServiceSpace4444");
	productService.setProductSpace("productSpace");
	productService.setTouchPointSpace("touchPointSpace");
	productService.setCustomerSpace("customerSpace");
	productService.setActorSpace("actorSpace");
	productService.setSocietySpace("societySpace");
	productService.setContextSpace("contextSpace");
	productService.setTimeSpace("timeSpace");
	productService.setEnvironmentSpace("environmentSpace");
	productService.setLastModifiedUser("lastModifiedUser");
	productService.setLastModifiedDate(new Date());
	productService.setCreatedUser("createdUser");
	productService.setCreatedDate(new Date());
	
	DaoFactory.getInstance().getDbDao().setProductService("kmyu", productService); */

	
	/* Db_ProductService ps = DaoFactory.getInstance().getDbDao().getProductService("", "id"); 
	out.println(ps.getPicture()); */
	
	/* DaoFactory.getInstance().getDbDao().removeProductService("", "id"); */ 
	
	/* Db_ProductServiceCond cond = new Db_ProductServiceCond();
	cond.setSocietySpace("soci");
	cond.setPageSize(2); 
	Db_ProductService[] result = DaoFactory.getInstance().getDbDao().getProductServices("", cond);
	
	out.println(result); */
	

	
/* 	Db_ValueSpace v = new Db_ValueSpace();
	
	v.setId("4028800b49d188770149d18877400000");
	v.setPsId("psID");
	v.setActiveEmotional("activeEmotiona0");
	v.setEcological("ecological");
	v.setEconomical("economical");
	v.setEpistemic("epistemic");
	v.setExtrinsicSocial("extrinsicSocial");
	v.setFunction("function");
	v.setIntrinsicSocial("intrinsicSocial");
	v.setReactiveEmotional("reactiveEmotional");
	
	DaoFactory.getInstance().getDbDao().setValueSpace("", v); */
	
%>
</body>
</html>