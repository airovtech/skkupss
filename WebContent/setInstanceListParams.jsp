<%@page import="net.smartworks.skkupss.model.BizModelSpace"%>
<%@page import="net.smartworks.skkupss.model.ServiceSpace"%>
<%@page import="net.smartworks.skkupss.model.ValueSpace"%>
<%@page import="net.smartworks.util.LocalDate"%>
<%@page import="java.util.Date"%>
<%@page import="net.smartworks.skkupss.model.ProductService"%>
<%@page import="net.smartworks.skkupss.model.SortingField"%>
<%@page import="net.smartworks.factory.ManagerFactory"%>
<%@page import="net.smartworks.skkupss.model.InstanceList"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.RequestParams"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%

	RequestParams requestParams = ManagerFactory.getInstance().getServiceManager().setInstanceListParams(request.getrequestBody, request);
	String href = (String)requestBody.get("href");
	ISmartWorks smartworks = (ISmartWorks)SmartUtil.getBean("smartWorks", request);
	ModelAndView mnv = new ModelAndView();
	mnv.addObject(smartworks);
	mnv.addObject("requestParams", requestParams);
	mnv.setViewName(href);
%>
