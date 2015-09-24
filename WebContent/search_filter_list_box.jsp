<%@page import="net.smartworks.model.report.ChartReport"%>
<%@page import="net.smartworks.model.report.info.ReportInfo"%>
<%@page import="net.smartworks.model.filter.info.SearchFilterInfo"%>
<%@page import="net.smartworks.model.report.Report"%>
<%@page import="net.smartworks.model.work.FormField"%>
<%@page import="net.smartworks.model.work.SmartForm"%>
<%@page import="net.smartworks.model.filter.SearchFilter"%>
<%@page import="net.smartworks.model.community.User"%>
<%@page import="net.smartworks.model.security.EditPolicy"%>
<%@page import="net.smartworks.model.security.WritePolicy"%>
<%@page import="net.smartworks.model.security.AccessPolicy"%>
<%@page import="net.smartworks.model.work.InformationWork"%>
<%@page import="net.smartworks.model.work.SmartWork"%>
<%@page import="net.smartworks.model.work.Work"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ page import="net.smartworks.service.ISmartWorks"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<%
try{
	ISmartWorks smartWorks = (ISmartWorks) request.getAttribute("smartWorks");
	User cUser = SmartUtil.getCurrentUser();

	String workId = request.getParameter("workId");
	String targetSpaceId = request.getParameter("targetSpaceId");
	SmartWork work = (SmartWork)smartWorks.getWorkById(workId);
	SearchFilterInfo[] filters = (work!=null) ? work.getSearchFilters() : smartWorks.getSearchFilterByTargetSpaceId(cUser.getId(), targetSpaceId);
%>
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />

	<%
	if (filters != null) {
		for (SearchFilterInfo filter : filters) {
	%>
		<option class="js_custom_filter" value="<%=filter.getId()%>"><%=filter.getName()%></option>
	<%
		}
	}
	%>
<%
}catch(Exception e){ e.printStackTrace();
%>
	<script type="text/javascript">smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[search_filter_list_box jsp]', null, "<%=e%>");</script>
<%
}
%>
	