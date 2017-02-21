<%@page import="org.springframework.util.StringUtils"%>
<%@page import="java.util.StringTokenizer"%>
<%@page import="net.smartworks.util.SmartMessage"%>
<%@page import="net.smartworks.skkupss.model.User"%>
<%@page import="net.smartworks.util.PropertiesLoader"%>
<%@page import="net.smartworks.skkupss.manager.impl.DocFileManagerImpl"%>
<%@page import="java.util.Date"%>
<%@page import="java.util.List" %>
<%@page import="java.util.ArrayList" %>
<%@page import="java.util.Iterator" %>
<%@page import="net.smartworks.skkupss.model.SBPService" %>
<%@page import="net.smartworks.skkupss.model.BizModelSpace"%>
<%@page import="net.smartworks.skkupss.model.ServiceSpace"%>
<%@page import="net.smartworks.skkupss.model.ValueSpace"%>
<%@page import="net.smartworks.util.CommonUtil"%>
<%@page import="net.smartworks.factory.ManagerFactory"%>
<%@page import="net.smartworks.skkupss.model.ProductService"%>
<%@page import="java.text.DecimalFormat"%>
<%@page import="net.smartworks.util.LocalDate"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<script type="text/javascript">
try{
//완료버튼 클릭시 reserve_asset.sw 서비스를 실행하기 위해 submit하는 스크립트..
function submitForms(tempSave) {
	var newProductService = $('.js_new_product_service_page');
	// new_asset_reservation 에 있는 활성화되어 있는 모든 입력화면들을 validation하여 이상이 없으면 submit를 진행한다...
	if(!SmartWorks.GridLayout.validate(newProductService.find('form.js_validation_required:visible'), $('.js_upload_error_message'))) return;

	// 그려진 화면에 있는 입력화면들을 JSON형식으로 Serialize한다...
	var forms = newProductService.find('form');
	var paramsJsonHiddens = {};
	var spaceTabs = forms.find('.js_space_tab');
	var currentSpaceType = forms.find('.js_select_space_type th.current>a').attr('spaceTypeStr');
	var isCVCAEnabled = forms.find('.js_select_space_type th.current>a').attr('isCVCAEnabled');
	for(var i=0; i<spaceTabs.length; i++){
		var spaceTab = $(spaceTabs[i]);
		var spaceType = spaceTab.attr('spaceType');
		// 폼이름 키값으로 하여 해당 폼에 있는 모든 입력항목들을 JSON형식으로 Serialize 한다...
		if(spaceType == '<%=ProductService.SPACE_TYPE_CONTEXT%>'){
			var canvas = {};
			var nodes = new Array();
			var edgeLines = new Array();
			for(var j=0; j<CD$CONTROLLERS.length; j++){
				var ctrl = CD$CONTROLLERS[j];
				var model = ctrl.model;
				switch(ContextDiagram.getModelType(model)){
				case CD$TYPE_CANVAS :
					canvas =  model;
					break;
				case CD$TYPE_NODE :
					nodes.push(model);
					break;
				case CD$TYPE_EDGELINE :
					edgeLines.push(model);
					break;
				}
			}
			var contextSpaceValues = {
					canvasId: canvas.id,
					width: canvas.width,
					height: canvas.height,
					nodes: nodes,
					edgeLines: edgeLines
			};
			paramsJsonHiddens[spaceType] = JSON.stringify(contextSpaceValues);
		}else if(spaceType == '<%=ProductService.SPACE_TYPE_ACTOR%>'){
			var canvas = {};
			var nodes = new Array();
			var edgeLines = new Array();
			console.log('AD$CONTROLLERS :', AD$CONTROLLERS);
			for(var j=0; j<AD$CONTROLLERS.length; j++){
				var ctrl = AD$CONTROLLERS[j];
				var model = ctrl.model;
				console.log('ctrl ', ctrl);
				console.log('model ', model);
				switch(ActorDiagram.getModelType(model)){
				case AD$TYPE_CANVAS :
					canvas =  model;
					break;
				case AD$TYPE_NODE :
					nodes.push(model);
					break;
				case AD$TYPE_EDGELINE :
					edgeLines.push(model);
					break;
				}
			}
			var actorSpaceValues = {
					canvasId: canvas.id,
					width: canvas.width,
					height: canvas.height,
					nodes: nodes,
					edgeLines: edgeLines
			};
			paramsJsonHiddens[spaceType] = JSON.stringify(actorSpaceValues);
		}else if(spaceType == '<%=ProductService.SPACE_TYPE_PRODUCT%>'){
			var unspscCode = '';
			spaceTab.find('.js_select_unspsc_code').each(function() {
				unspscCode = unspscCode + $(this).find('option:selected').attr('value');
			});	
			var lifecycleSteps = '000000000000';
			if(!isEmpty(LD$DATA)){
				lifecycleSteps = '';
				for(var j=0; j<LD$DATA.length; j++)
					lifecycleSteps = lifecycleSteps + LD$DATA[j];
			}
			var productSpaceValues = {
					unspscCode : unspscCode,
					lifecycleSteps : lifecycleSteps
			};
			paramsJsonHiddens[spaceType] = productSpaceValues;
		}else if(spaceType == '<%=ProductService.SPACE_TYPE_CUSTOMER%>'){
			var customerTypes = new Array();
			spaceTab.find('.js_customer_type_list').each(function(){
				var customerType = '';
				$(this).find('.js_select_customer_type').each(function() {
					customerType = customerType + $(this).find('option:selected').attr('value');
				});	
				customerTypes.push(customerType);
			});
			var customerActivityTypes = new Array();
			spaceTab.find('.js_customer_activity_type_list').each(function(){
				var customerActivityType = '';
				$(this).find('.js_select_customer_activity_type').each(function() {
					customerActivityType = customerActivityType + $(this).find('option:selected').attr('value');
				});	
				customerActivityTypes.push(customerActivityType);
			});
			var customerSpaceValues = {
					types : customerTypes,
					activityTypes : customerActivityTypes
			};
			paramsJsonHiddens[spaceType] = customerSpaceValues;
		}else if(spaceType == '<%=ProductService.SPACE_TYPE_TOUCH_POINT%>'){
			var touchPoints = new Array();
			spaceTab.find('form.js_validation_required').each(function(){
				var touchPointId = {};
				if(!isEmpty($(this).attr('touchPointId')))
					touchPointId['touchPointId'] = $(this).attr('touchPointId'); 
				var affordanceNames = {};
				var txtRAffordanceNameValues = $(this).find('textarea[name="txtRAffordanceName"]');
				var txtPAffordanceNameValues = $(this).find('textarea[name="txtPAffordanceName"]');
				if(!isEmpty(txtRAffordanceNameValues)){
					var values = new Array();
					var ids = new Array();
					txtRAffordanceNameValues.each(function(){
						values.push($(this).attr('value'));
						ids.push($(this).attr('affordanceId'));
					});
					affordanceNames['txtRAffordanceNames'] = values;
					affordanceNames['txtRAffordanceIds'] = ids;					
				}
				if(!isEmpty(txtPAffordanceNameValues)){
					var values = new Array();
					var ids = new Array();
 					txtPAffordanceNameValues.each(function(){
						values.push($(this).attr('value'));
						ids.push($(this).attr('affordanceId'));
					});
					affordanceNames['txtPAffordanceNames'] = values;
					affordanceNames['txtPAffordanceIds'] = ids;
				}
				var affordanceImages = {};
				var imgRAffordances = $(this).find('.js_raffordance_fields');
				var imgPAffordances = $(this).find('.js_paffordance_fields');
				if(!isEmpty(imgRAffordances)){
					var values = new Array();
					imgRAffordances.each(function(){
						values.push(SmartWorks.GridLayout.serializeObject($(this))["imgRAffordance"]);
					});
					affordanceImages['imgRAffordances'] = values;
				}
				if(!isEmpty(imgPAffordances)){
					var values = new Array();
					imgPAffordances.each(function(){
						values.push(SmartWorks.GridLayout.serializeObject($(this))["imgPAffordance"]);
					});
					affordanceImages['imgPAffordances'] = values;
				}
				console.log(affordanceImages);
				touchPoints.push( merge3Objects($(this).serializeObject(), SmartWorks.GridLayout.serializeObject($(this)), merge3Objects(touchPointId, affordanceNames, affordanceImages)));
			});
			paramsJsonHiddens[spaceType] = touchPoints;
		}else if(spaceType == '<%=ProductService.SPACE_TYPE_PRODUCT_SERVICE%>'){
			var valueString = "";
			var psItems = spaceTab.find('.js_ps_item');
			for(var j=0; j<psItems.length; j++){
				valueString = valueString + (j==0?"":";") + ($(psItems[j]).hasClass('selected_background')?'selected':'no') 
			}
			paramsJsonHiddens[spaceType] = valueString;
		}else if(isEmpty(spaceTab.parent('form'))){
			newSpaceTab = spaceTab.clone();
			cloneSelectedValues(spaceTab, newSpaceTab);
			newProductService.find('form[name="frmNewProductService"]').append($('<form name="frmSpaceTab"></form>').html(newSpaceTab).hide());
			paramsJsonHiddens[spaceType] = mergeObjects(newSpaceTab.parent('form').serializeObject(), SmartWorks.GridLayout.serializeObject(newSpaceTab.parent('form')));
			spaceTab.parent().remove();
		}else{
			paramsJsonHiddens[spaceType] = mergeObjects(spaceTab.parent('form').serializeObject(), SmartWorks.GridLayout.serializeObject(spaceTab.parent('form')));
		}
	}
	spaceTabs.parent().remove();
	var paramsJson = {};
	for(var i=0; i<forms.length; i++){
		var form = $(forms[i]);
		// 폼이름 키값으로 하여 해당 폼에 있는 모든 입력항목들을 JSON형식으로 Serialize 한다...
		paramsJson[form.attr('name')] = mergeObjects(form.serializeObject(), SmartWorks.GridLayout.serializeObject(form));
	}
	paramsJson["frmSpaceTabs"] = paramsJsonHiddens;

	var psId = newProductService.attr('psId');
	if(!isEmpty(psId))
		paramsJson["psId"] = psId;
	
	console.log(JSON.stringify(paramsJson));
	// 서비스요청 프로그래스바를 나타나게 한다....
	var progressSpan = newProductService.find('.js_progress_span');
	smartPop.progressCont(progressSpan);
	var url = "set_product_service.sw";
	$.ajax({
		url : url,
		contentType : 'application/json',
		type : 'POST',
		data : JSON.stringify(paramsJson),
		success : function(data, status, jqXHR) {
			// 성공시에 프로그래스바를 제거하고 성공메시지를 보여준다...
			if(isEmpty(psId)){
				smartPop.confirm( smartMessage.get('pssContinueAddNew'), function(){
					var url = 'newProductService.jsp' + '?spaceType=' + currentSpaceType;
					var target = $('#content');
					$.ajax({
						url : url,
						success : function(data, status, jqXHR) {
							target.html(data);
							smartPop.closeProgress();
						}				
					});
				},
				function(){
					location.href = "home.sw";
					smartPop.closeProgress();
				});
			}else{
				var url = 'newProductService.jsp?psId=' + psId + '&isEditMode=false' + '&spaceType=' + (isCVCAEnabled === 'true' && currentSpaceType === 'actorSpace' ? 'actorCvcaSpace' : currentSpaceType);
				var target = $('#content');
				$.ajax({
					url : url,
					success : function(data, status, jqXHR) {
						target.html(data);
						smartPop.closeProgress();
					}				
				});
			}
		}
	});
}
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[newProductService script]', null, error);
}

</script>

<%
	SBPService sbpInfo = new SBPService();																// 연결된 SBP정보를 담기 위한 data
	
	User cUser = SmartUtil.getCurrentUser();

	String PSS_PICTURE_URL = PropertiesLoader.loadPropByClassPath("/net/smartworks/conf/config.properties").getProperty("pss.picture.url");
	
	String psId = request.getParameter("psId");
	String isEditModeStr = request.getParameter("isEditMode");
	boolean isEditMode = SmartUtil.isBlankObject(isEditModeStr) ? false : isEditModeStr.equalsIgnoreCase("true"); 
	String spaceType = request.getParameter("spaceType");
	boolean isCVCAEnabled = true;
	if(ProductService.PSS_SPACE_ACTOR_CVCA.equals(spaceType)){
		spaceType = ProductService.PSS_SPACE_ACTOR;
	}else if(ProductService.PSS_SPACE_ACTOR.equals(spaceType)){
		isCVCAEnabled = false;
	}
	ProductService productService = new ProductService();
	if(!SmartUtil.isBlankObject(psId)){
		try{
			productService = ManagerFactory.getInstance().getServiceManager().getProductService(psId, ProductService.SPACE_TYPE_NONE);
			
			sbpInfo = ManagerFactory.getInstance().getServiceManager().getSBPService(psId);				// 연결된 SBP Project 정보를 가져온다. 
		}catch(Exception e){}
	}else{
		isEditMode = true;
	}

	String psPictureUrl = SmartUtil.isBlankObject(productService.getPicture()) ? "" : PSS_PICTURE_URL +  productService.getPicture();

%>
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />

<!-- 컨텐츠 레이아웃-->
<div class="section_portlet js_iwork_list_page js_work_list_page">
	<div class="portlet_t"><div class="portlet_tl"></div></div>
	<div class="portlet_l" style="display: block;">
		<ul class="portlet_r" style="display: block;">
			<!-- 타이틀 -->
			<div class="body_titl"></div>
			<!-- 목록영역  -->
			<div class="contents_space">
				<div>
					<!-- 목록보기 타이틀-->
					<div class="list_title_space js_work_list_title mt15">
						<div class="title_line_btns">
							<div class="icon_btn_start">
								<a href="home.sw?spaceType=<%=spaceType %>" class="icon_btn_tail"><fmt:message key="pss.button.goto_list"/></a>
							</div>
						</div>					
					</div>
					<!-- 목록보기 타이틀-->

					<!-- 상세필터 및 새업무등록하기 화면 -->
					<div id="search_filter" class="filter_section js_new_work_form">
						<div class="form_wrap up js_form_wrap js_new_iwork_page js_new_product_service_page" psId="<%=psId%>" isEditMode="<%=isEditMode%>" spaceType="<%=spaceType%>" isCVCAEnabled="<%=isCVCAEnabled%>">
							<div class="form_title js_form_header">
								<!-- 해당 업무이름을 표시하는 곳 -->
								<%
								if(SmartUtil.isBlankObject(psId)){
								%>
									<div class="title"><fmt:message key="common.button.add_new_iwork"/></div>
								<%
								}else{
								%>
									<div class="title"><fmt:message key="pss.title.instance_detail"/></div>
								<%
								}
								%>
								
								<!-- 전자결재, 업무전달 버튼들 -->
								<div class="txt_btn mb2">
								</div>
								<!-- 전자결재, 업무전달 버튼들 //-->
								<div class="solid_line"></div>
							</div>
							<!-- 폼- 확장 -->
							<!-- 스마트폼에서 해당 업무화면을 그려주는 곳 -->
							<form name="frmNewProductService" class="js_validation_required form_layout">
								<div class="js_new_product_service_fields"></div>
							</form>
							<div class="js_hidden_form_content" style="display:none"></div>
							<!-- 새이벤트를 등록하기위한 완료 버튼과 취소 버튼 -->
							<div class="js_upload_buttons">
								<div class="glo_btn_space js_upload_buttons_page">		
									<!--  완료 및 취소 버튼 -->
									<div class="fr">
										<%if(SmartUtil.isBlankObject(psId)){ %>
											<span class="btn_gray"> 
												<!--  완료버튼을 클릭시 해당 업로드 화면페이지에 있는 submitForms()함수를 실행한다.. -->
												<a href="" class="js_complete_action" onclick='submitForms();return false;'> 
													<span class="txt_btn_start"></span>
													<span class="txt_btn_center"><fmt:message key="pss.button.complete"/></span> 
													<span class="txt_btn_end"></span> 
												</a>
											</span>
										<%}else if(isEditMode){ %>
											<span class="btn_gray"> 
												<!--  완료버튼을 클릭시 해당 업로드 화면페이지에 있는 submitForms()함수를 실행한다.. -->
												<a href="" class="js_complete_action" onclick='submitForms();return false;'> 
													<span class="txt_btn_start"></span>
													<span class="txt_btn_center"><fmt:message key="pss.button.complete_modify"/></span> 
													<span class="txt_btn_end"></span> 
												</a>
											</span>
											<span class="btn_gray"> 
												<!--  완료버튼을 클릭시 해당 업로드 화면페이지에 있는 submitForms()함수를 실행한다.. -->
												<a href="" class="js_cancel_modify_ps" psId="<%=productService.getId() %>"> 
													<span class="txt_btn_start"></span>
													<span class="txt_btn_center"><fmt:message key="pss.button.cancel_modify"/></span> 
													<span class="txt_btn_end"></span> 
												</a>
											</span>
										<%}else{ %>
											<span class="btn_gray"> 
												<!--  완료버튼을 클릭시 해당 업로드 화면페이지에 있는 submitForms()함수를 실행한다.. -->
												<a href="" class="js_saveas_product_service" psId="<%=productService.getId() %>"> 
													<span class="txt_btn_start"></span>
													<span class="txt_btn_center"><fmt:message key="pss.button.save_as"/></span> 
													<span class="txt_btn_end"></span> 
												</a>
											</span>
											<span class="btn_gray"> 
												<!--  완료버튼을 클릭시 해당 업로드 화면페이지에 있는 submitForms()함수를 실행한다.. -->
												<a href="" class="js_modify_product_service" psId="<%=productService.getId() %>"> 
													<span class="txt_btn_start"></span>
													<span class="txt_btn_center"><fmt:message key="pss.button.modify"/></span> 
													<span class="txt_btn_end"></span> 
												</a>
											</span>
											<span class="btn_gray"> 
												<!--  완료버튼을 클릭시 해당 업로드 화면페이지에 있는 submitForms()함수를 실행한다.. -->
												<a href="" class="js_remove_product_service" psId="<%=productService.getId() %>"> 
													<span class="txt_btn_start"></span>
													<span class="txt_btn_center"><fmt:message key="pss.button.delete"/></span> 
													<span class="txt_btn_end"></span> 
												</a>
											</span>
										<%} %> 
												
										<span class="btn_gray">
											<!--  취소버튼을 클릭시 sw_act_work 에서 click event 로 정의 되어있는 함수를 실행한다... -->
											<a href="home.sw?spaceType=<%=spaceType%>"> 
												<span class="txt_btn_start"></span> 
												<span class="txt_btn_center"><fmt:message key="common.button.cancel"/></span> 
												<span class="txt_btn_end"></span> 
											</a> 
										</span>
									</div>
									<!--  완료 및 취소 버튼 //-->
								
									<!--  실행시 표시되는 프로그래스아이콘을 표시할 공간 -->
									<div class="fr form_space js_progress_span"></div>
									
									<!-- 실행시 데이터 유효성 검사이상시 에러메시지를 표시할 공간 -->
									<span class="form_space sw_error_message js_upload_error_message" style="text-align:right; color: red; line-height:20px"></span>
								</div>
							</div>
						</div>
					</div>
					<!-- 상세필터 -->
				</div>
				<!-- 목록 보기 -->
			</div>
			<!-- 목록영역 // -->
			
		</ul>
		
		
	</div>
	<div class="portlet_b" style="display: block;"></div>
</div>
<!-- 컨텐츠 레이아웃//-->

<%
String productServiceName = SmartMessage.getString("pss.title.product_service_name");
String productPictureName = SmartMessage.getString("pss.title.product_picture");
String productDescName = SmartMessage.getString("common.title.desc");

String sbpServiceName = SmartMessage.getSBP_Service_String();									// 'SBP-프로젝트 이름' 메뉴
%>

<script>
try{
	var psName = "<%=CommonUtil.toNotNull(productService.getName())%>";
//	psName += "<br/>" + "&nbsp;";
	var psPicture = "<%=psPictureUrl%>";
 	var psDesc = "<%=SmartUtil.smartEncode(CommonUtil.toNotNull(productService.getDesc()))%>";
 		psDesc = smartDecode(psDesc);	

 	<%
		StringBuffer htmlCode = new StringBuffer();
		List<String> svConcept = ServiceSpace.ValueSbpInfo(sbpInfo);

		if(sbpInfo.getSbpPrjName() != null) {	// SBP 프로젝트와 연결되어있는경우
			if(svConcept.size() != 0) {			// SBP프로젝트, SBP, SBP Map Activity와 연결되있는 경우
				for(int i=0; i<svConcept.size(); i+=2) {
					htmlCode.append("<span class='sbpPrjNames connect_SBPPrj' viewMode='true' style='cursor: pointer;'").append(" sbpId='").append(svConcept.get(i)).append("' sbpPrjName='").append(sbpInfo.getSbpPrjName()).append("' sbpName='").append(svConcept.get(i+1)).append("'>").append(sbpInfo.getSbpPrjName()).append("_").append(svConcept.get(i+1)).append("</span><br/>");
				}
			}else {								// SBP 프로젝트만 연결되어있는 경우
				htmlCode.append("<span class='connect_SBPPrj'>").append(sbpInfo.getSbpPrjName()).append("</span><br/>");
			}
		} else {								// 아무것도 연결되어있지 않은 경우
			if(isEditMode) {
				htmlCode.append("<span class='sbpPrjNames connect_SBPPrj' style='cursor: pointer;' ");
			} else {
				htmlCode.append("<span ");
			}
			htmlCode.append(" id='noSelected' sbpId='selectSBPProject' psId='").append(psId).append("' ").append("psName='").append(CommonUtil.toNotNull(productService.getName())).append("'> SBP프로젝트를 선택해주세요.</span>");
		}
		
 	%>

 	var sbpInfo = "<%=htmlCode.toString()%>";													// 관련된 SBP프로젝트 정보
 	//sbpInfo += "<button id='test'> data insert!!</button>";
 	
	var newProductServiceFields = $('div.js_new_product_service_fields');
	if(!isEmpty(newProductServiceFields)) {
		var newProductServiceField = $(newProductServiceFields[0]);
		var gridRow = SmartWorks.GridLayout.newGridRow();
		var gridTable = SmartWorks.GridLayout.newGridTable();
		newProductServiceField.html(gridTable.html(gridRow));
		
		SmartWorks.FormRuntime.TextInputBuilder.buildEx({										// 폼빌더를 이용하여 항목 상세보기를 그려준다. 
			container: gridRow,
			fieldId: "txtName",
			fieldName: "<%=productServiceName %>",
			columns: 3,
			colSpan: 1,
			value: psName,
			required: true,
			readOnly: <%=!isEditMode%>
		});
		gridRow.find('.form_col[fieldId="txtName"]').addClass('vt');
		
		SmartWorks.FormRuntime.TextInputBuilder.buildEx({
			container: gridRow,
			fieldId: "txtName2",
			fieldName: "<%=sbpServiceName %>",
			columns: 3,
			colSpan: 2,
			value: sbpInfo,
			required: true,
			readOnly: true
		});
		
		gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
 		SmartWorks.FormRuntime.ImageBoxBuilder.buildEx({
			container: gridRow,
			fieldId: "imgPicture",
			fieldName: "<%=productPictureName%>",
			imgSource: psPicture,
			columns: 3,
			colSpan: 1,
			pictureHeight: 90,
			required: false,
			readOnly: <%=!isEditMode%>			
		});
		gridRow.find('.form_col[fieldId="imgPicture"]').addClass('vt');
  		
		SmartWorks.FormRuntime.TextInputBuilder.buildEx({
			container: gridRow,
			fieldId: "txtDesc",
			fieldName: "<%=productDescName%>",
			columns: 3,
			colSpan: 2,
			multiLines: 6,
			value: psDesc,
			required: false,
			readOnly: <%=!isEditMode%>
		});
 		
		
 		gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
		SmartWorks.FormRuntime.TextInputBuilder.buildEx({
			container: gridRow,
			fieldId: "tabSpaces",
			fieldName: "",
			columns: 3,
			colSpan: 3,
			value: "",
			required: false,
			readOnly: true
		});
 
		var spaceContents = 
			 '<table class="kpi_tab_area">' + 
				'<tr class="js_select_space_type">' + 
					'<th class="current"><a spaceType="1" spaceTypeStr="<%=ProductService.PSS_SPACE_VALUE%>" href="viewValueSpace.jsp">Value Space</a></th>' +  
					'<th><a spaceType="2" spaceTypeStr="<%=ProductService.PSS_SPACE_PRODUCT_SERVICE%>" href="viewProductServiceSpace.jsp">Product-Service Space</a></th>' +  
					'<th><a spaceType="3" spaceTypeStr="<%=ProductService.PSS_SPACE_PRODUCT%>" href="viewProductSpace.jsp">Product Space</a></th>' +  
					'<th><a spaceType="4" spaceTypeStr="<%=ProductService.PSS_SPACE_SERVICE%>" href="viewServiceSpace.jsp">Service Space</a></th>' +  
					'<th><a spaceType="5" spaceTypeStr="<%=ProductService.PSS_SPACE_TOUCH_POINT%>" href="viewTouchPointSpace.jsp">Touch Point Space</a></th>' +  
					'<th><a spaceType="6" spaceTypeStr="<%=ProductService.PSS_SPACE_CUSTOMER%>" href="viewCustomerSpace.jsp">Customer Space</a></th>' +  
					'<th><a spaceType="7" spaceTypeStr="<%=ProductService.PSS_SPACE_BIZ_MODEL%>" href="viewBizModelSpace.jsp">Biz Model Space</a></th>' +  
					'<th><a spaceType="8" spaceTypeStr="<%=ProductService.PSS_SPACE_ACTOR%>" isCVCAEnabled="<%=isCVCAEnabled%>" href="viewActorSpace.jsp">Actor Space</a></th>' +  
					'<th><a spaceType="9" spaceTypeStr="<%=ProductService.PSS_SPACE_SOCIETY%>" href="viewSocietySpace.jsp">Society Space</a></th>' +  
					'<th><a spaceType="10" spaceTypeStr="<%=ProductService.PSS_SPACE_CONTEXT%>" href="viewContextSpace.jsp">Interaction Context Space</a></th>' +  
					'<th><a spaceType="11" spaceTypeStr="<%=ProductService.PSS_SPACE_TIME%>" href="viewTimeSpace.jsp">Time Space</a></th>' +  
					'<th><a spaceType="12" spaceTypeStr="<%=ProductService.PSS_SPACE_ENVIRONMENT%>" href="viewEnvironmentSpace.jsp">Environment Space</a></th>' +  
				'</tr>' + 
			'</table>' +
			'<div class="up" style="border-top: #dfeffc 1px solid">' +
				'<div style="width:100%; height:20px; background-color:#dfeffc"></div>' +
				'<div class="js_space_view_target"></div>' +
			'</div>';

 		gridRow.find("td[fieldId='tabSpaces'] .form_value").html(spaceContents);
 
 		var spaceType = "<%=ProductService.getSpaceType(spaceType)==ProductService.SPACE_TYPE_NONE?ProductService.SPACE_TYPE_VALUE:ProductService.getSpaceType(spaceType)%>"
		gridRow.find('tr.js_select_space_type a[spaceType="' + spaceType + '"]:first').click();
 		
 	}
	
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[newProductService script]', null, error);
}
</script>
