<%@page import="net.smartworks.util.PropertiesLoader"%>
<%@page import="net.smartworks.skkupss.model.Affordance"%>
<%@page import="net.smartworks.skkupss.model.TouchPoint"%>
<%@page import="net.smartworks.skkupss.model.TouchPointSpace"%>
<%@page import="net.smartworks.skkupss.model.DefaultSpace"%>
<%@page import="net.smartworks.factory.ManagerFactory"%>
<%@page import="net.smartworks.skkupss.model.ProductService"%>
<%@page import="net.smartworks.skkupss.model.ValueSpace"%>
<%@page import="net.smartworks.util.CommonUtil"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.ServiceSpace"%>
<%@ page contentType="text/html; charset=utf-8"%>

<%
	TouchPointSpace touchPointSpace = (TouchPointSpace)request.getAttribute("touchPointSpace");
	String psId = request.getParameter("psId");
	String spaceTypeStr = request.getParameter("spaceType");
	int spaceType = SmartUtil.isBlankObject(spaceTypeStr) ? ProductService.SPACE_TYPE_NONE : Integer.parseInt(spaceTypeStr);
	
	if(SmartUtil.isBlankObject(touchPointSpace) && !SmartUtil.isBlankObject(psId) && spaceType > ProductService.SPACE_TYPE_ALL ){

		ProductService productService = null;
		try{
			productService = ManagerFactory.getInstance().getServiceManager().getProductService(psId, spaceType);
		}catch(Exception e){}
		
		touchPointSpace = productService.getTouchPointSpace();
	}
	String isEditModeStr = request.getParameter("isEditMode");
	boolean isEditMode = SmartUtil.isBlankObject(isEditModeStr) || !isEditModeStr.equalsIgnoreCase("true") ? false : true;
	if(SmartUtil.isBlankObject(touchPointSpace)) touchPointSpace = new TouchPointSpace();
	
	TouchPoint[] touchPoints = touchPointSpace.getTouchPoints();
	if(SmartUtil.isBlankObject(touchPoints)){
		touchPoints = new TouchPoint[]{new TouchPoint()};
	}
	
	
%>
 	 
<!-- 컨텐츠 레이아웃-->
<div class="js_space_tab js_touch_point_space" spaceType="<%=spaceType%>">
	<%
	for(int i=0; i<touchPoints.length; i++){
		TouchPoint tp = touchPoints[i];
		if(tp==null) continue;
	%>
		<form name="frmTouchPointSpace" class="js_validation_required">
		<table class="tc fieldline" style="width:800px;min-height:200px;margin-left:auto;margin-right:auto;">
			<tr>
				<th class="tc vm" style="width:20%">
					<div style="margin-bottom:15px">Service Receiver</div>
					<img src="images/pss/pss-receiver.png" style="width:100px;hieght:100px"/>
					<textarea name="txtReceiverName" <%if(!isEditMode){ %>disabled<%} %> style="margin-top:5px!important;width:100px;text-align:center" rows="2" class="<%if(isEditMode){ %>fieldline<%}%>"><%=CommonUtil.toNotNull(tp.getReceiverName()) %></textarea>
				</th>
				<th class="tc vb" style="width:20%">
					<img style="margin:10px 0" src="images/pss/interaction.png" style="width:100px"/>
					<select name="selReceiverInteractionType" class="js_select_interaction_type" <%if(!isEditMode){ %>disabled<%} %>>
	 					<option class="interaction-hpi" <%if("HPI".equals(tp.getReceiverInteraction())){ %>selected<%} %>>HPI</option>
						<option class="interaction-hpim" <%if("HPI+M".equals(tp.getReceiverInteraction())){ %>selected<%} %>>HPI+M</option>
						<option class="interaction-hpihhi" <%if("HPI+HHI".equals(tp.getReceiverInteraction())){ %>selected<%} %>>HPI+HHI</option>
						<option class="interaction-hpihhi2" <%if("HPI+HHI2".equals(tp.getReceiverInteraction())){ %>selected<%} %>>HPI+HHI2</option>
					</select>
	                <ul style="margin:2px 0" class="js_interaction_details">
	                    <li value="HPI" <%if(tp.getReceiverInteraction()!=null && !"HPI".equals(tp.getReceiverInteraction())){ %>style="display:none"<%} %>><img style="width:40px;height:40px" src="images/pss/interaction-hpi.png" title="Human-Product Interaction" /></li>
	                    <li value="HPI+M" <%if(!"HPI+M".equals(tp.getReceiverInteraction())){ %>style="display:none"<%} %>><img style="width:40px;height:40px" src="images/pss/interaction-hpim.png" title="Human-Product Interaction + Mankind" /></li>
	                    <li value="HPI+HHI" <%if(!"HPI+HHI".equals(tp.getReceiverInteraction())){ %>style="display:none"<%} %>><img style="width:40px;height:40px" src="images/pss/interaction-hpihhi.png" title="Human-Product Interaction + Human-Human Interaction" /></li>
	                    <li value="HPI+HHI2" <%if(!"HPI+HHI2".equals(tp.getReceiverInteraction())){ %>style="display:none"<%} %>><img style="width:40px;height:40px" src="images/pss/interaction-hpihhi2.png" title="Human-Product Interaction + Human-Human Interaction 2" /></li>
	                </ul>
				</th>
				<th class="tc vm" style="width:20%">
					<div style="margin-bottom:15px">Touch Point</div>
					<div><div class="js_touch_point_fields" style="border: 3px solid rgb(155,174,0);width:100px;height:100px;margin-left:25px"></div></div>
					<textarea name="txtTouchPointName" <%if(!isEditMode){ %>disabled<%} %> style="margin-top:5px!important;width:100px;text-align:center" rows="2" class="<%if(isEditMode){ %>fieldline<%}%>"><%=CommonUtil.toNotNull(tp.getTouchPointName()) %></textarea>
				</th>
				<th class="tc vb" style="width:20%">
					<img style="margin:10px 0" src="images/pss/interaction.png" style="width:100px"/>
					<select name="selProviderInteractionType" class="js_select_interaction_type" <%if(!isEditMode){ %>disabled<%} %>>
	 					<option class="interaction-hpi" <%if("HPI".equals(tp.getProviderInteraction())){ %>selected<%} %>>HPI</option>
						<option class="interaction-hpim" <%if("HPI+M".equals(tp.getProviderInteraction())){ %>selected<%} %>>HPI+M</option>
						<option class="interaction-hpihhi" <%if("HPI+HHI".equals(tp.getProviderInteraction())){ %>selected<%} %>>HPI+HHI</option>
						<option class="interaction-hpihhi2" <%if("HPI+HHI2".equals(tp.getProviderInteraction())){ %>selected<%} %>>HPI+HHI2</option>
					</select>
	                <ul style="margin:2px 0" class="js_interaction_details">
	                    <li value="HPI" <%if(tp.getProviderInteraction()!=null && !"HPI".equals(tp.getProviderInteraction())){ %>style="display:none"<%} %>><img style="width:40px;height:40px" src="images/pss/interaction-hpi.png" title="Human-Product Interaction" /></li>
	                    <li value="HPI+M" <%if(!"HPI+M".equals(tp.getProviderInteraction())){ %>style="display:none"<%} %>><img style="width:40px;height:40px" src="images/pss/interaction-hpim.png" title="Human-Product Interaction + Mankind" /></li>
	                    <li value="HPI+HHI" <%if(!"HPI+HHI".equals(tp.getProviderInteraction())){ %>style="display:none"<%} %>><img style="width:40px;height:40px" src="images/pss/interaction-hpihhi.png" title="Human-Product Interaction + Human-Human Interaction" /></li>
	                    <li value="HPI+HHI2" <%if(!"HPI+HHI2".equals(tp.getProviderInteraction())){ %>style="display:none"<%} %>><img style="width:40px;height:40px" src="images/pss/interaction-hpihhi2.png" title="Human-Product Interaction + Human-Human Interaction 2" /></li>
	                </ul>
				</th>
				<th class="tc vm" style="width:20%">
					<div style="margin-bottom:15px">Service Provider</div>
					<img src="images/pss/pss-provider.png" style="width:100px;hieght:100px"/>
					<textarea name="txtProviderName" <%if(!isEditMode){ %>disabled<%} %> style="margin-top:5px!important;width:100px;text-align:center" rows="2" class="<%if(isEditMode){ %>fieldline<%}%>"><%=CommonUtil.toNotNull(tp.getProviderName()) %></textarea>
				</th>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td class="tc"><a href="" class="linkline js_toggle_affordance">Affordance Features</a><span class="icon_in_down"></span></td>
				<td></td>
				<td></td>
			</tr>
 	 		<tr style="display:none">
	 			<td colSpan="2">
	 				<span>Receiver Interaction : </span>
	 				<ul>
	 					<%
	 					Affordance[] rAffordances = tp.getReceiverAffordances();
	 					if(SmartUtil.isBlankObject(rAffordances) && isEditMode )
							rAffordances = new Affordance[]{new Affordance(), new Affordance(), new Affordance(), new Affordance(), new Affordance()};
	 					else if(SmartUtil.isBlankObject(rAffordances))
							rAffordances = new Affordance[]{new Affordance()};
	 					for(int j=0; j<rAffordances.length; j++){
	 						Affordance af = rAffordances[j];
	 						if(af==null) continue;
	 					%>
							<li class="tc vm">
								<div class="fl">
									<div>Features Text</div>
									<textarea name="txtRAffordanceName" <%if(!isEditMode){ %>disabled<%} %> style="width:160px;text-align:left;margin:5px" rows="4" class="fieldline"><%=CommonUtil.toNotNull(af.getAffordanceName()) %></textarea>
								</div>
								<div class="fl fieldline js_raffordance_fields" style="width:100px;height:100px;margin:5px"></div>
							</li>
						<%
						} %>
					</ul>
				</td>
				<td></td>
	 			<td colSpan="2">
	 				<span>Provider Interaction : </span>
	 				<ul>
	 					<%
	 					Affordance[] pAffordances = tp.getProviderAffordances();
	 					if(SmartUtil.isBlankObject(pAffordances) && isEditMode )
	 						pAffordances = new Affordance[]{new Affordance(), new Affordance(), new Affordance(), new Affordance(), new Affordance()};
	 					else if(SmartUtil.isBlankObject(rAffordances))
	 						pAffordances = new Affordance[]{new Affordance()};
	 					for(int j=0; j<pAffordances.length; j++){
	 						Affordance af = pAffordances[j];
	 						if(af==null) continue;
	 					%>
							<li class="tc vm">
								<div class="fl">
									<div>Features Text</div>
									<textarea name="txtPAffordanceName" <%if(!isEditMode){ %>disabled<%} %> style="width:160px;text-align:left;margin:5px" rows="4" class="fieldline"><%=CommonUtil.toNotNull(af.getAffordanceName()) %></textarea>
								</div>
								<div class="fl fieldline js_paffordance_fields" style="width:100px;height:100px;margin:5px"></div>
							</li>
						<%
						} %>
					</ul>
				</td>
			</tr>
		</table>
		</form>
	<%
	}
	%>
</div>
<!-- 컨텐츠 레이아웃//-->
<script type="text/javascript">
$(function() {
	var touchPointFields = $('.js_touch_point_space:first').find('div.js_touch_point_fields');
	if(!isEmpty(touchPointFields) && (touchPointFields.length==<%=touchPoints.length%>)) {
		<%
		String PSS_PICTURE_URL = PropertiesLoader.loadPropByClassPath("/net/smartworks/conf/config.properties").getProperty("pss.picture.url");
		for(int i=0; i<touchPoints.length; i++){
			if(touchPoints[i]==null) continue;
			Affordance[] rAffordances = touchPoints[i].getReceiverAffordances();
			if(SmartUtil.isBlankObject(rAffordances) && isEditMode) 
				rAffordances = new Affordance[]{new Affordance(), new Affordance(), new Affordance(), new Affordance(), new Affordance()};
			else if(SmartUtil.isBlankObject(rAffordances))
				rAffordances = new Affordance[]{new Affordance()};
			Affordance[] pAffordances = touchPoints[i].getProviderAffordances();
			if(SmartUtil.isBlankObject(pAffordances) && isEditMode) 
				pAffordances = new Affordance[]{new Affordance(), new Affordance(), new Affordance(), new Affordance(), new Affordance()};
			else if(SmartUtil.isBlankObject(pAffordances))
				pAffordances = new Affordance[]{new Affordance()};
			String touchPointImg = SmartUtil.isBlankObject(touchPoints[i].getTouchPointImage()) ? "" : PSS_PICTURE_URL + touchPoints[i].getTouchPointImage();

		%>
			var touchPointField = $(touchPointFields[<%=i%>]);
			var gridRow = SmartWorks.GridLayout.newGridRow();
			var gridTable = SmartWorks.GridLayout.newGridTable();
			touchPointField.html(gridTable.html(gridRow));
			
			SmartWorks.FormRuntime.ImageBoxBuilder.buildEx({
				container: gridRow,
				fieldId: "imgTouchPoint",
				fieldName: "picture profile",
	 			imgSource: '<%=touchPointImg%>',
				pictureWidth: 100,
				pictureHeight: 100,
				required: false,
				readOnly: <%=!isEditMode%>							
			}); 
			
			gridRow.find('.form_label').css('margin-top', '-26px').css('margin-left', '16px');
			gridRow.find('.form_value').attr('style', 'padding-top:0px!important;margin:0px!important');

			var rAffordanceFields = $('.js_touch_point_space:first').find('div.js_raffordance_fields');
			if(!isEmpty(rAffordanceFields) && (rAffordanceFields.length==<%=rAffordances.length%>)) {
				<%
				for(int j=0; j<rAffordances.length; j++){
					String rAfforanceImg = SmartUtil.isBlankObject(rAffordances[j].getAffordanceImage()) ? "" : PSS_PICTURE_URL + rAffordances[j].getAffordanceImage();
				%>
					var rAffordanceField = $(rAffordanceFields[<%=j%>]);
					var gridRow = SmartWorks.GridLayout.newGridRow();
					var gridTable = SmartWorks.GridLayout.newGridTable();
					rAffordanceField.html(gridTable.html(gridRow));
					
					SmartWorks.FormRuntime.ImageBoxBuilder.buildEx({
						container: gridRow,
						fieldId: "imgRAffordance"+'<%=j%>',
						fieldName: "picture profile",
			 			imgSource: '<%=rAfforanceImg%>',
						pictureWidth: 100,
						pictureHeight: 100,
						required: false,
						readOnly: <%=!isEditMode%>						
					}); 
					
					gridRow.find('.form_label').css('margin-top', '-26px').css('margin-left', '16px');
					gridRow.find('.form_value').attr('style', 'padding-top:0px!important;margin:0px!important');
				<%}%>
		 	}
			
			var pAffordanceFields = $('.js_touch_point_space:first').find('div.js_paffordance_fields');
			if(!isEmpty(pAffordanceFields) && (pAffordanceFields.length==<%=pAffordances.length%>)) {
				<%
				for(int j=0; j<pAffordances.length; j++){
					String pAfforanceImg = SmartUtil.isBlankObject(pAffordances[j].getAffordanceImage()) ? "" : PSS_PICTURE_URL + pAffordances[j].getAffordanceImage();
				%>
					var pAffordanceField = $(pAffordanceFields[<%=j%>]);
					var gridRow = SmartWorks.GridLayout.newGridRow();
					var gridTable = SmartWorks.GridLayout.newGridTable();
					pAffordanceField.html(gridTable.html(gridRow));
					
					SmartWorks.FormRuntime.ImageBoxBuilder.buildEx({
						container: gridRow,
						fieldId: "imgPAffordance"+'<%=j%>',
						fieldName: "picture profile",
			 			imgSource: '<%=pAfforanceImg%>',
						pictureWidth: 100,
						pictureHeight: 100,
						required: false,
						readOnly: <%=!isEditMode%>									
					}); 
					
					gridRow.find('.form_label').css('margin-top', '-26px').css('margin-left', '16px');
					gridRow.find('.form_value').attr('style', 'padding-top:0px!important;margin:0px!important');
				<%}%>
		 	}
			
		<%}%>
 	}
	
});