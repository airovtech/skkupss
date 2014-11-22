<%@page import="net.smartworks.skkupss.model.ValueSpace"%>
<%@page import="net.smartworks.util.CommonUtil"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.ServiceSpace"%>
<%@ page contentType="text/html; charset=utf-8"%>

<%
	ValueSpace valueSpace = (ValueSpace)request.getAttribute("valueSpace");
	String isEditModeStr = request.getParameter("isEditMode");
	boolean isEditMode = SmartUtil.isBlankObject(isEditModeStr) || !isEditModeStr.equalsIgnoreCase("true") ? false : true;
	if(SmartUtil.isBlankObject(valueSpace)) return;

	String[] values = null;
%>
 	 
<!-- 컨텐츠 레이아웃-->
<table class="tc" style="width:640px;min-height:200px">
	<tr>
		<th style="width:12.5%;height:0;border-bottom:none"></th>
		<th style="width:12.5%;height:0;border-bottom:none"></th>
		<th style="width:12.5%;height:0;border-bottom:none"></th>
		<th style="width:12.5%;height:0;border-bottom:none"></th>
		<th style="width:12.5%;height:0;border-bottom:none"></th>
		<th style="width:12.5%;height:0;border-bottom:none"></th>
		<th style="width:12.5%;height:0;border-bottom:none"></th>
		<th style="width:12.5%;height:0;border-bottom:none"></th>
	</tr>
	<tr>
		<td colspan="8" style="height:20px;border-bottom:none;padding-bottom:0">
			<div class="tc" style="margin: 0px 270px;background-color: rgb(253, 125, 253);border: black 2px solid;font-size: 11px;">PSS Values</div>
			<div style="float:left;width:50%;height:7px;border-right:black 2px solid"></div>
		</td>
	</tr>
	<tr>
		<td class="vt" colspan="1" style="height:100%;padding:0;border-bottom:none">
			<div style="float:right;width:50%;border-top:black 2px solid;border-left: black 2px solid;height: 7px;"></div>
			<div class="tc" style="font-size: 11px;border: black 2px solid;margin: 7px;background-color: yellow;line-height: 12px;">Economical Value</div>
			<div>
				<%
				values = valueSpace.getEconomical();
				for(int i=0; values!=null && i<values.length; i++){
				%>
					<div style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;height: 20px;margin: 2px 2px;"><%=CommonUtil.toNotNull(values[i]) %></div>
				<%
				}
				%>
			</div>
		</td>
		<td class="vt" colspan="1" style="height:100%;padding:0;border-bottom:none">
			<div style="float:left;width:100%;border-top:black 2px solid"></div>
			<div style="float:left;width:50%;border-right: black 2px solid;height: 7px;"></div>
			<div class="tc" style="font-size: 11px;border: black 2px solid;margin: 7px;background-color: yellow;line-height: 12px;">Ecological Value</div>
			<div>
				<%
				values = valueSpace.getEcological();
				for(int i=0; values!=null && i<values.length; i++){
				%>
					<div style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;height: 20px;margin: 2px 2px;"><%=CommonUtil.toNotNull(values[i]) %></div>
				<%
				}
				%>
			</div>
		</td>
		<td class="vt" colspan="6" style="height:100%;padding:0;border-bottom:none">
			<div style="float:left;width:50%;border-top:black 2px solid;border-right: black 2px solid;height: 7px;"></div>
			<div class="tc cb" style="font-size: 11px;border: black 2px solid;margin: 7px 200px;background-color: yellow;line-height: 12px;margin-bottom:0">Experience Value</div>
			<div style="float:left;width:50%;height:7px;border-right:black 2px solid"></div>
			<table class="tc" style="width:100%;height:100%">
				<tr>
					<th style="width:16.6%;height:0;border-bottom:none;padding:0"></th>
					<th style="width:16.6%;height:0;border-bottom:none;padding:0"></th>
					<th style="width:16.6%;height:0;border-bottom:none;padding:0"></th>
					<th style="width:16.6%;height:0;border-bottom:none;padding:0"></th>
					<th style="width:16.6%;height:0;border-bottom:none;padding:0"></th>
					<th style="width:16.6%;height:0;border-bottom:none;padding:0"></th>
				</tr>
				<tr>
					<td colspan="2"  style="height:100%;padding:0;border-bottom:none">
						<div style="float:right;width:50%;border-top:black 2px solid;border-left: black 2px solid;height: 7px;"></div>
						<div class="tc cb" style="font-size: 11px;border: black 2px solid;margin: 7px 40px 0;background-color: rgb(252, 220, 247);line-height: 16px;">Extrinsic</div>
						<div style="float:left;width:50%;height:7px;border-right:black 2px solid"></div>
					</td>
					<td colspan="4"  style="height:100%;padding:0;border-bottom:none">
						<div style="float:left;width:50%;border-top:black 2px solid;border-right: black 2px solid;height: 7px;"></div>
						<div class="tc cb" style="font-size: 11px;border: black 2px solid;margin: 7px 120px 0;background-color: rgb(252, 220, 247);line-height: 16px;">Intrinsic</div>
						<div style="float:left;width:50%;height:7px;border-right:black 2px solid"></div>
					</td>
				</tr>
				<tr>
					<td style="height:100%;padding:0;border-bottom:none">
						<div style="float:right;width:50%;border-top:black 2px solid;border-left: black 2px solid;height: 7px;"></div>
						<div class="tc cb" style="font-size: 11px;border: black 2px solid;margin: 7px;background-color: rgb(183, 229, 253);line-height:12px;height:24px"><span style="position: relative;top: 7px;">Function</span></div>
						<div>
							<%
							values = valueSpace.getFunction();
							for(int i=0; values!=null && i<values.length; i++){
							%>
								<div style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;height: 20px;margin: 2px 2px;"><%=CommonUtil.toNotNull(values[i]) %></div>
							<%
							}
							%>
						</div>
					</td>
					<td style="height:100%;padding:0;border-bottom:none">
						<div style="float:left;width:50%;border-top:black 2px solid;border-right: black 2px solid;height: 7px;"></div>
						<div class="tc cb" style="font-size: 11px;border: black 2px solid;margin: 7px;background-color: rgb(183, 229, 253);line-height:12px">Extrinsic Social</div>
						<div>
							<%
							values = valueSpace.getExtrinsicSocial();
							for(int i=0; values!=null && i<values.length; i++){
							%>
								<div style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;height: 20px;margin: 2px 2px;"><%=CommonUtil.toNotNull(values[i]) %></div>
							<%
							}
							%>
						</div>
					</td>
					<td style="height:100%;padding:0;border-bottom:none">
						<div style="float:right;width:50%;border-top:black 2px solid;border-left: black 2px solid;height: 7px;"></div>
						<div class="tc cb" style="font-size: 11px;border: black 2px solid;margin: 7px;background-color: rgb(183, 229, 253);line-height:12px">Active Emotional</div>
						<div>
							<%
							values = valueSpace.getActiveEmotional();
							for(int i=0; values!=null && i<values.length; i++){
							%>
								<div style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;height: 20px;margin: 2px 2px;"><%=CommonUtil.toNotNull(values[i]) %></div>
							<%
							}
							%>
						</div>
					</td>
					<td style="height:100%;padding:0;border-bottom:none">
						<div style="width:100%;border-top:black 2px solid"></div>
						<div style="float:left;width:50%;border-right: black 2px solid;height: 7px;"></div>
						<div class="tc cb" style="font-size: 11px;border: black 2px solid;margin: 7px;background-color: rgb(183, 229, 253);line-height:12px">Reactive Emotional</div>
						<div>
							<%
							values = valueSpace.getReactiveEmotional();
							for(int i=0; values!=null && i<values.length; i++){
							%>
								<div style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;height: 20px;margin: 2px 2px;"><%=CommonUtil.toNotNull(values[i]) %></div>
							<%
							}
							%>
						</div>
					</td>
					<td style="height:100%;padding:0;border-bottom:none">
						<div style="width:100%;border-top:black 2px solid"></div>
						<div style="float:left;width:50%;border-right: black 2px solid;height: 7px;"></div>
						<div class="tc cb" style="font-size: 11px;border: black 2px solid;margin: 7px;background-color: rgb(183, 229, 253);line-height:12px">Intrinsic Social</div>
						<div>
							<%
							values = valueSpace.getIntrinsicSocial();
							for(int i=0; values!=null && i<values.length; i++){
							%>
								<div style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;height: 20px;margin: 2px 2px;"><%=CommonUtil.toNotNull(values[i]) %></div>
							<%
							}
							%>
						</div>
					</td>
					<td style="height:100%;padding:0;border-bottom:none">
						<div style="float:left;width:50%;border-top:black 2px solid;border-right: black 2px solid;height: 7px;"></div>
						<div class="tc cb" style="font-size: 11px;border: black 2px solid;margin: 7px;background-color: rgb(183, 229, 253);line-height:12px;height:24px"><span style="position: relative;top: 7px;">Epistemic</span></div>
						<div>
							<%
							values = valueSpace.getEpistemic();
							for(int i=0; values!=null && i<values.length; i++){
							%>
								<div style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;height: 20px;margin: 2px 2px;"><%=CommonUtil.toNotNull(values[i]) %></div>
							<%
							}
							%>
						</div>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
<!-- 컨텐츠 레이아웃//-->
