<%@page import="net.smartworks.skkupss.model.User"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%
try{

	User cUser = SmartUtil.getCurrentUser();
	String psId = request.getParameter("psId");
	
	String wValueStr = request.getParameter("value");
	String wProductServiceStr = request.getParameter("productService");
	String wProductStr = request.getParameter("product");
	String wServiceStr = request.getParameter("service");
	String wTouchPointStr = request.getParameter("touchPoint");
	String wCustomerStr = request.getParameter("customer");
	String wBizModelStr = request.getParameter("bizModel");
	String wActorStr = request.getParameter("actor");
	String wSocietyStr = request.getParameter("society");
	String wContextStr = request.getParameter("context");
	String wTimeStr = request.getParameter("time");
	String wEnvironmentStr = request.getParameter("environment");
	
	float wSummary, wValue, wProductService, wProduct, wService, wTouchPoint, wCustomer, wBizModel, wActor, wSociety, wContext, wTime, wEnvironment;
	wValue = SmartUtil.isBlankObject(wValueStr)?0:Float.parseFloat(wValueStr);
	wProductService = SmartUtil.isBlankObject(wProductServiceStr)?0:Float.parseFloat(wProductServiceStr);
	wProduct = SmartUtil.isBlankObject(wProductStr)?0:Float.parseFloat(wProductStr);
	wService = SmartUtil.isBlankObject(wServiceStr)?0:Float.parseFloat(wServiceStr);
	wTouchPoint = SmartUtil.isBlankObject(wTouchPointStr)?0:Float.parseFloat(wTouchPointStr);
	wCustomer = SmartUtil.isBlankObject(wCustomerStr)?0:Float.parseFloat(wCustomerStr);
	wBizModel = SmartUtil.isBlankObject(wBizModelStr)?0:Float.parseFloat(wBizModelStr);
	wActor = SmartUtil.isBlankObject(wActorStr)?0:Float.parseFloat(wActorStr);
	wSociety = SmartUtil.isBlankObject(wSocietyStr)?0:Float.parseFloat(wSocietyStr);
	wContext = SmartUtil.isBlankObject(wContextStr)?0:Float.parseFloat(wContextStr);
	wTime = SmartUtil.isBlankObject(wTimeStr)?0:Float.parseFloat(wTimeStr);
	wEnvironment = SmartUtil.isBlankObject(wEnvironmentStr)?0:Float.parseFloat(wEnvironmentStr);
	wSummary = wValue+wProductService+wProduct+wService+wTouchPoint+wCustomer+wBizModel+wActor+wSociety+wContext+wTime+wEnvironment;
	
%>
<script type="text/javascript">
try{
	function submitForms(e) {
		var popSpaceCombination = $('.js_pop_space_combination_page');
		if (SmartWorks.GridLayout.validate(popSpaceCombination.find('form.js_validation_required'), $('.js_pop_error_message'))) {
			if(parseFloat(popSpaceCombination.find('.js_weight_summary').attr('value'))!=1){
				smartPop.showInfo(smartPop.WARN, smartMessage.get('pssSimWeightTotalError'));				
				return;
			}
			
			var spaceType = "complexSpace";
			var params = ""
			var simWeights = popSpaceCombination.find('.js_sim_weight:visible');
			simWeights.each(function(){
				var simWeight = $(this);
				params = params + "&" + simWeight.attr('spaceName') + "=" + simWeight.attr('value');  
			});
			console.log(spaceType, simWeights, params);
			var progressSpan = popSpaceCombination.find('.js_progress_span');
			smartPop.progressCont(progressSpan);
			$.ajax({
				url : "psSimilarityMatrix.jsp?spaceType=" + spaceType + params,
				success : function(data, status, jqXHR) {
					$('#content').html(data);
					smartPop.closeProgress();
					smartPop.close();
				}
			});
		}
	};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[pop_space_combination script]', null, error);
}
</script>

<!--  다국어 지원을 위해, 로케일 및 다국어 resource bundle 을 설정 한다. -->
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />

<!--  전체 레이아웃 -->
<div class="pop_corner_all list_contents js_pop_space_combination_page" psId="<%=psId%>">

	<!-- 팝업 타이틀 -->
	<div class="form_title">
		<div class="pop_title"><fmt:message key="pss.title.select_space_combination"></fmt:message></div>
		<div class="txt_btn">
			<a class="btn_x" href="" onclick="smartPop.close();return false;"></a>
		</div>
		<div class="solid_line"></div>
	</div>
	<!-- 팝업 타이틀 //-->
	<!-- 컨텐츠 -->
	<form name="frmSpaceCombination" class="js_validation_required">
		<div class="contents_space">
			<table class="js_select_sim_space">
				<tr class="tit_bg">
					<th class="check r_line" width="20px"></th>
			 		<th class="r_line"><span><fmt:message key="pss.title.space"/></span></th>
			 		<th><span><fmt:message key="pss.title.sim_weight"/></span></th>
				</tr>
				<tr>
					<td><input type="checkbox" <%if(wValue>0){ %>checked<%} %>/></td>
					<td><fmt:message key="pss.title.space.value" /></td>
					<td><input spaceName="value" <%if(wValue==0){%>style="display:none"<%}%> class="fieldline sw_required js_sim_weight" type="text" value="<%=wValue%>"></td>
				</tr>
				<tr>
					<td><input type="checkbox" <%if(wProductService>0){ %>checked<%} %>/></td>
					<td><fmt:message key="pss.title.space.product_service" /></td>
					<td><input spaceName="productService" <%if(wProductService==0){%>style="display:none"<%}%> class="fieldline sw_required js_sim_weight" type="text" value="<%=wProductService%>"></td>
				</tr>
				<tr>
					<td><input type="checkbox" <%if(wProduct>0){ %>checked<%} %>/></td>
					<td><fmt:message key="pss.title.space.product" /></td>
					<td><input spaceName="product" <%if(wProduct==0){%>style="display:none"<%}%> class="fieldline sw_required js_sim_weight" type="text" value="<%=wProduct%>"></td>
				</tr>
				<tr>
					<td><input type="checkbox" <%if(wService>0){ %>checked<%} %>/></td>
					<td><fmt:message key="pss.title.space.service" /></td>
					<td><input spaceName="service" <%if(wService==0){%>style="display:none"<%}%> class="fieldline sw_required js_sim_weight" type="text" value="<%=wService%>"></td>
				</tr>
				<tr>
					<td><input type="checkbox" <%if(wTouchPoint>0){ %>checked<%} %>/></td>
					<td><fmt:message key="pss.title.space.touch_point" /></td>
					<td><input spaceName="touchPoint" <%if(wTouchPoint==0){%>style="display:none"<%}%> class="fieldline sw_required js_sim_weight" type="text" value="<%=wTouchPoint%>"></td>
				</tr>
				<tr>
					<td><input type="checkbox" <%if(wCustomer>0){ %>checked<%} %>/></td>
					<td><fmt:message key="pss.title.space.customer" /></td>
					<td><input spaceName="customer" <%if(wCustomer==0){%>style="display:none"<%}%> class="fieldline sw_required js_sim_weight" type="text" value="<%=wCustomer%>"></td>
				</tr>
				<tr>
					<td><input type="checkbox" <%if(wBizModel>0){ %>checked<%} %>/></td>
					<td><fmt:message key="pss.title.space.biz_model" /></td>
					<td><input spaceName="bizModel" <%if(wBizModel==0){%>style="display:none"<%}%> class="fieldline sw_required js_sim_weight" type="text" value="<%=wBizModel%>"></td>
				</tr>
				<tr>
					<td><input type="checkbox" <%if(wActor>0){ %>checked<%} %>/></td>
					<td><fmt:message key="pss.title.space.actor" /></td>
					<td><input spaceName="actor" <%if(wActor==0){%>style="display:none"<%}%> class="fieldline sw_required js_sim_weight" type="text" value="<%=wActor%>"></td>
				</tr>
				<tr>
					<td><input type="checkbox" <%if(wSociety>0){ %>checked<%} %>/></td>
					<td><fmt:message key="pss.title.space.society" /></td>
					<td><input spaceName="society" <%if(wSociety==0){%>style="display:none"<%}%> class="fieldline sw_required js_sim_weight" type="text" value="<%=wSociety%>"></td>
				</tr>
				<tr>
					<td><input type="checkbox" <%if(wContext>0){ %>checked<%} %>/></td>
					<td><fmt:message key="pss.title.space.product_service" /></td>
					<td><input spaceName="context" <%if(wContext==0){%>style="display:none"<%}%> class="fieldline sw_required js_sim_weight" type="text" value="<%=wContext%>"></td>
				</tr>
				<tr>
					<td><input type="checkbox" <%if(wTime>0){ %>checked<%} %>/></td>
					<td><fmt:message key="pss.title.space.time" /></td>
					<td><input spaceName="time" <%if(wTime==0){%>style="display:none"<%}%> class="fieldline sw_required js_sim_weight" type="text" value="<%=wTime%>"></td>
				</tr>
				<tr>
					<td><input type="checkbox" <%if(wEnvironment>0){ %>checked<%} %>/></td>
					<td><fmt:message key="pss.title.space.environment" /></td>
					<td><input spaceName="environment" <%if(wEnvironment==0){%>style="display:none"<%}%> class="fieldline sw_required js_sim_weight" type="text" value="<%=wEnvironment%>"></td>
				</tr>
				<tr>
					<td></td>
					<td><fmt:message key="pss.title.weight_summary" /></td>
					<td><input class="js_weight_summary" type="text" readonly value="<%=wSummary %>"/></td>
				</tr>
			</table>
		</div>
	</form>
	<!-- 컨텐츠 //-->
	<!-- 버튼 영역 -->
	<div class="glo_btn_space">
		<div class="fr">
			<span class="btn_gray">
				<a href="" onclick='submitForms(); return false;'>
					<span class="txt_btn_start"></span>
					<span class="txt_btn_center"><fmt:message key="common.button.complete"/></span>
					<span class="txt_btn_end"></span>
				</a> 
			</span>
			 <span class="btn_gray ml5"> 
				 <a href="" class="js_close_space_combination"> 
				 	<span class="txt_btn_start"></span>
				 	<span class="txt_btn_center"><fmt:message key="common.button.cancel"/></span>
				 	<span class="txt_btn_end"></span> 
				 </a>
			</span>
		</div>

		<!--  실행시 표시되는 프로그래스아이콘을 표시할 공간 -->
		<span class="fr form_space js_progress_span"></span>
	
		<!-- 실행시 데이터 유효성 검사이상시 에러메시지를 표시할 공간 -->
		<div class="form_space sw_error_message js_pop_error_message" style="color: red; line-height: 20px"></div>
		
	</div>
	<!-- 버튼 영역 //-->

</div>
<!-- 전체 레이아웃//-->
<%
}catch(Exception e){ e.printStackTrace();
%>
	<script type="text/javascript">smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[pop_space_combination jsp]', null, "<%=e%>");</script>
<%
}
%>