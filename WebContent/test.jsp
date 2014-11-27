<%@page import="net.smartworks.skkupss.model.RequestParams"%>
<%@page import="net.smartworks.factory.ManagerFactory"%>
<%@page import="net.smartworks.skkupss.model.InstanceList"%>
<%@page import="net.smartworks.skkupss.model.ProductService"%>
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

 /* 
	Db_ProductService productService = new Db_ProductService();
	productService.setId("ps98765");
	productService.setName("name222");
	productService.setPicture("picture22");
	productService.setDescription("description222");
	productService.setProductServiceSpace("productServiceSpace222");
	productService.setProductSpace("productSpace222");
	productService.setTouchPointSpace("touchPointSpace222");
	productService.setCustomerSpace("customerSpace222");
	productService.setActorSpace("actorSpace222");
	productService.setSocietySpace("societySpace22");
	productService.setContextSpace("contextSpace2");
	productService.setTimeSpace("timeSpace22");
	productService.setEnvironmentSpace("environmentSpace2");
	productService.setLastModifiedUser("lastModifiedUser2");
	productService.setLastModifiedDate(new Date());
	productService.setCreatedUser("createdUser2");
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
	

	
 	/* Db_ValueSpace v = new Db_ValueSpace();
	
	v.setId("4028800b49d1887702");
	v.setPsId("ps98765");
	v.setActiveEmotional("activeEmotiona02");
	v.setEcological("ecological2");
	v.setEconomical("economical2");
	v.setEpistemic("epistemic2");
	v.setExtrinsicSocial("extrinsicSocial2");
	v.setFunction("function2");
	v.setIntrinsicSocial("intrinsicSocial2");
	v.setReactiveEmotional("reactiveEmotional2");
	
	DaoFactory.getInstance().getDbDao().setValueSpace("", v); */
	
	/* 
	Db_ProductServiceCond cond = new Db_ProductServiceCond();
	//cond.setId("ps12345");
	Db_ProductService[] result = DaoFactory.getInstance().getDbDao().getProductServiceWithSpace("", ProductService.PSS_SPACE_BIZ_MODEL , cond);
	 */
	 
/* 	RequestParams params = new RequestParams();
	
	params.setCurrentPage(1);
	params.setPageSize(20);
	//params.setSearchKey("");
	 
	params.setSpaceType(ProductService.PSS_SPACE_SERVICE);
	
	InstanceList il = ManagerFactory.getInstance().getServiceManager().getProductInstanceList(params);
	
	out.println(il); */
	
	/* Db_ProductServiceCond cond = new Db_ProductServiceCond();
	cond.setIdIns(new String[]{"3","4","5"});
	cond.setSearchKey("3");
	
	String selectId = ProductService.PSS_SPACE_SERVICE; 
	
	Db_ProductService[] re = DaoFactory.getInstance().getDbDao().getProductServiceWithSelectedSpace("", selectId, cond);
	
	int size = DaoFactory.getInstance().getDbDao().getProductServiceWithSelectedSpaceSize("", selectId, cond);
	
	out.println(re.length + "  =  " + size); */
	
	
	Db_ProductServiceCond cond = new Db_ProductServiceCond();
	Db_ProductService[] ps = DaoFactory.getInstance().getDbDao().getProductServiceWithSelectedSpace("", ProductService.PSS_SPACE_VALUE_SERVICE_BIZ_MODEL , cond);
	
	out.println(ps);
	
	
	
%>
</body>
</html>