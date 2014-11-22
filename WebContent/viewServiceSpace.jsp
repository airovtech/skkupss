<%@page import="net.smartworks.util.CommonUtil"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.ServiceSpace"%>
<%@ page contentType="text/html; charset=utf-8"%>

<%
	ServiceSpace serviceSpace = (ServiceSpace)request.getAttribute("serviceSpace");
	String isEditModeStr = request.getParameter("isEditMode");
	boolean isEditMode = SmartUtil.isBlankObject(isEditModeStr) || !isEditModeStr.equalsIgnoreCase("true") ? false : true;
	if(SmartUtil.isBlankObject(serviceSpace)) return;

	String[] values = null;
%>
 	 
<!-- 컨텐츠 레이아웃-->
<table class="up tc" style="width:500px;min-height:200px">
	<tr style="border-bottom: darkgray solid 8px;height:24px">
		<th style="width:20%"><img src="images/pss/service-bullet.png" style="width: 24px;height: 24px;position: relative;top: 17px;"/></th>
		<th style="width:20%"><img src="images/pss/service-bullet.png" style="width: 24px;height: 24px;position: relative;top: 17px;"/></th>
		<th style="width:20%"><img src="images/pss/service-bullet.png" style="width: 24px;height: 24px;position: relative;top: 17px;"/></th>
		<th style="width:20%"><img src="images/pss/service-bullet.png" style="width: 24px;height: 24px;position: relative;top: 17px;"/></th>
		<th style="width:20%"><img src="images/pss/service-bullet.png" style="width: 24px;height: 24px;position: relative;top: 17px;"/></th>
	</tr>
	<tr>
		<td class="tc" style="height:100%">
			<div style="font-size:15px;font-weight:bold">SSPP</div>
			<div style="padding:5px">
				<%
					values = serviceSpace.getSspp();
					for(int i=0; values!=null && i<values.length; i++){
				%>
						<div style="border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:100%;font-size:11px"><%=CommonUtil.toNotNull(values[i]) %></div>
				<%
					}
				%>
			</div>
		</td>
		<td class="tc" style="height:100%">
			<div style="font-size:15px;font-weight:bold">SSPc</div>
			<div style="padding:5px">
				<%
					values = serviceSpace.getSsp();
					for(int i=0; values!=null && i<values.length; i++){
				%>
						<div style="border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:100%;font-size:11px"><%=CommonUtil.toNotNull(values[i]) %></div>
				<%
					}
				%>
			</div>
		</td>
		<td class="tc" style="height:100%">
			<div style="font-size:15px;font-weight:bold">SSPC</div>
			<div style="padding:5px">
				<%
					values = serviceSpace.getSspc();
					for(int i=0; values!=null && i<values.length; i++){
				%>
						<div style="border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:100%;font-size:11px"><%=CommonUtil.toNotNull(values[i]) %></div>
				<%
					}
				%>
			</div>
		</td>
		<td class="tc" style="height:100%">
			<div style="font-size:15px;font-weight:bold">SSCp</div>
			<div style="padding:5px">
				<%
					values = serviceSpace.getSsc();
					for(int i=0; values!=null && i<values.length; i++){
				%>
						<div style="border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:100%;font-size:11px"><%=CommonUtil.toNotNull(values[i]) %></div>
				<%
					}
				%>
			</div>
		</td>
		<td class="tc" style="height:100%">
			<div style="font-size:15px;font-weight:bold">SSCC</div>
			<div style="padding:5px">
				<%
					values = serviceSpace.getSscc();
					for(int i=0; values!=null && i<values.length; i++){
				%>
						<div style="border: 1px solid #c7c7c7;background-color:#BFF7F5;margin:5px 0;width:100%;font-size:11px"><%=CommonUtil.toNotNull(values[i]) %></div>
				<%
					}
				%>
			</div>
		</td>
	</tr>
</table>
<!-- 컨텐츠 레이아웃//-->
