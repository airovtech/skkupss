<%@page import="net.smartworks.skkupss.model.BizModelSpace"%>
<%@page import="net.smartworks.util.CommonUtil"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.ServiceSpace"%>
<%@ page contentType="text/html; charset=utf-8"%>

<%

	BizModelSpace bizModelSpace = (BizModelSpace)request.getAttribute("bizModelSpace");
	String isEditModeStr = request.getParameter("isEditMode");
	boolean isEditMode = SmartUtil.isBlankObject(isEditModeStr) || !isEditModeStr.equalsIgnoreCase("true") ? false : true;
	if(SmartUtil.isBlankObject(bizModelSpace)) return;

	String[] values = null;
	String[] userValues = null;
%>
 	 
<!-- 컨텐츠 레이아웃-->
<table class="tc" style="width:600px;height:300px;border: 1px solid #c7c7c7;padding: 0;">
	<tr>
		<th class="r_line" style="width:20%; border-bottom:none">
			<div class="fl" style="font-size:11px; font-style:italic;line-height: 11px;color: gray;text-align: left;">Key<br>Partners</div>
			<img class="fr" src="images/pss/biz-model/key-partners.png" style="height:70%"/>
		</th>
		<th class="r_line" style="width:20%; border-bottom:none">
			<div class="fl" style="font-size:11px; font-style:italic;line-height: 11px;color: gray;text-align: left;">Key<br>Activities</div>
			<img class="fr" src="images/pss/biz-model/key-activities.png" style="height:70%"/>
		</th>
		<th class="r_line" style="width:20%; border-bottom:none">
			<div class="fl" style="font-size:11px; font-style:italic;line-height: 11px;color: gray;text-align: left;">Value<br>Proposition</div>
			<img class="fr" src="images/pss/biz-model/value-proposition.png" style="height:70%"/>
		</th>
		<th class="r_line" style="width:20%; border-bottom:none">
			<div class="fl" style="font-size:11px; font-style:italic;line-height: 11px;color: gray;text-align: left;">Customer<br>Relationships</div>
			<img class="fr" src="images/pss/biz-model/customer-relationships.png" style="height:70%"/>
		</th>
		<th style="width:20%; border-bottom:none">
			<div class="fl" style="font-size:11px; font-style:italic;line-height: 11px;color: gray;text-align: left;">Customer<br>Segments</div>
			<img class="fr" src="images/pss/biz-model/customer-segments.png" style="height:70%"/>
		</th>
	</tr>
	<tr>
		<td class="tc vm r_line" style="height:100%">
			<%
				values = bizModelSpace.getKeyPartners();
				for(int i=0; values!=null && i<values.length; i++){
			%>
					<div style="color:red;font-size:11px"><%=CommonUtil.toNotNull(values[i]) %></div>
			<%
				}
				userValues = bizModelSpace.getKeyPartnersUser();
				for(int i=0; userValues!=null && i<userValues.length; i++){
			%>
					<div style="color:blue;font-size:11px"><%=CommonUtil.toNotNull(userValues[i]) %></div>
			<%
				}
			%>
		</td>
		<td class="tc r_line" style="height:100%;padding:0">
			<div class="vm" style="padding:4px 5px;height:110px">
				<%
					values = bizModelSpace.getKeyActivities();
					for(int i=0; values!=null && i<values.length; i++){
				%>
						<div style="color:red;font-size:11px"><%=CommonUtil.toNotNull(values[i]) %></div>
				<%
					}
					userValues = bizModelSpace.getKeyActivitiesUser();
					for(int i=0; userValues!=null && i<userValues.length; i++){
				%>
						<div style="color:blue;font-size:11px"><%=CommonUtil.toNotNull(userValues[i]) %></div>
				<%
					}
				%>
			</div>
			<div style="height:27px;border-top: 1px solid #c7c7c7;padding:2px">
				<div class="fl" style="font-size:11px; font-style:italic;line-height: 11px;color: gray;text-align: left;">Key<br>Resources</div>
				<img class="fr" src="images/pss/biz-model/key-resources.png" style="height:70%"/>
			</div>
			<div class="vm"  style="padding:4px 5px;height:110px">
				<%
					values = bizModelSpace.getKeyResources();
					for(int i=0; values!=null && i<values.length; i++){
				%>
						<div style="color:red;font-size:11px"><%=CommonUtil.toNotNull(values[i]) %></div>
				<%
					}
					userValues = bizModelSpace.getKeyResourcesUser();
					for(int i=0; userValues!=null && i<userValues.length; i++){
				%>
						<div style="color:blue;font-size:11px"><%=CommonUtil.toNotNull(userValues[i]) %></div>
				<%
					}
				%>
			</div>
		</td>
		<td class="tc vm r_line" style="height:100%">
			<%
				userValues = bizModelSpace.getValuePropositionsUser();
				for(int i=0; userValues!=null && i<userValues.length; i++){
			%>
					<div style="color:blue;font-size:11px"><%=CommonUtil.toNotNull(userValues[i]) %></div>
			<%
				}
			%>
		</td>
		<td class="tc r_line" style="height:100%;padding:0">
			<div class="vm" style="padding:4px 5px;height:110px">
				<%
					values = bizModelSpace.getCustomerRelationships();
					for(int i=0; values!=null && i<values.length; i++){
				%>
						<div style="color:red;font-size:11px"><%=CommonUtil.toNotNull(values[i]) %></div>
				<%
					}
					userValues = bizModelSpace.getCustomerRelationshipsUser();
					for(int i=0; userValues!=null && i<userValues.length; i++){
				%>
						<div style="color:blue;font-size:11px"><%=CommonUtil.toNotNull(userValues[i]) %></div>
				<%
					}
				%>
			</div>
			<div style="height:27px;border-top: 1px solid #c7c7c7;padding:2px">
				<div class="fl" style="font-size:11px; font-style:italic;line-height: 11px;color: gray;text-align: left;">Channels</div>
				<img class="fr" src="images/pss/biz-model/channels.png" style="height:70%"/>
			</div>
			<div class="vm" style="padding:4px 5px;height:110px">
				<%
					values = bizModelSpace.getChannels();
					for(int i=0; values!=null && i<values.length; i++){
				%>
						<div style="color:red;font-size:11px"><%=CommonUtil.toNotNull(values[i]) %></div>
				<%
					}
					userValues = bizModelSpace.getChannelsUser();
					for(int i=0; userValues!=null && i<userValues.length; i++){
				%>
						<div style="color:blue;font-size:11px"><%=CommonUtil.toNotNull(userValues[i]) %></div>
				<%
					}
				%>
			</div>
		</td>
		<td class="tc vm" style="height:100%">
			<%
				values = bizModelSpace.getCustomerSegments();
				for(int i=0; values!=null && i<values.length; i++){
			%>
					<div style="color:red;font-size:11px"><%=CommonUtil.toNotNull(values[i]) %></div>
			<%
				}
				userValues = bizModelSpace.getCustomerSegmentsUser();
				for(int i=0; userValues!=null && i<userValues.length; i++){
			%>
					<div style="color:blue;font-size:11px"><%=CommonUtil.toNotNull(userValues[i]) %></div>
			<%
				}
			%>
		</td>
	</tr>
</table>
<table class="tc" style="width:600px;height:100px;border-left: 1px solid #c7c7c7;border-right: 1px solid #c7c7c7;border-bottom: 1px solid #c7c7c7;padding: 0;">
	<tr>
		<th class="r_line" style="width:50%; border-bottom:none">
			<div class="fl" style="font-size:11px; font-style:italic;line-height: 11px;color: gray;text-align: left;">Cost<br>Structure</div>
			<img class="fr" src="images/pss/biz-model/cost-structure.png" style="height:70%"/>
		</th>
		<th style="width:50%; border-bottom:none">
			<div class="fl" style="font-size:11px; font-style:italic;line-height: 11px;color: gray;text-align: left;">Revenue<br>Streams</div>
			<img class="fr" src="images/pss/biz-model/revenue-streams.png" style="height:70%"/>
		</th>
	</tr>
	<tr>
		<td class="tc vm r_line" style="height:100%">
			<%
				values = bizModelSpace.getCostStructure();
				for(int i=0; values!=null && i<values.length; i++){
			%>
					<span style="color:red"><%=CommonUtil.toNotNull(values[i]) %></span>
			<%
				}
				userValues = bizModelSpace.getCostStructureUser();
				for(int i=0; userValues!=null && i<userValues.length; i++){
			%>
					<span style="color:blue"><%=CommonUtil.toNotNull(userValues[i]) %></span>
			<%
				}
			%>
		</td>
		<td class="tc vm" style="height:100%">
			<%
				values = bizModelSpace.getRevenueStreams();
				for(int i=0; values!=null && i<values.length; i++){
			%>
					<span style="color:red"><%=CommonUtil.toNotNull(values[i]) %></span>
			<%
				}
				userValues = bizModelSpace.getRevenueStreamsUser();
				for(int i=0; userValues!=null && i<userValues.length; i++){
			%>
					<span style="color:blue"><%=CommonUtil.toNotNull(userValues[i]) %></span>
			<%
				}
			%>
		</td>
	</tr>
</table>
<!-- 컨텐츠 레이아웃//-->
