<%@page import="java.util.Date"%>
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
	for(var i=0; i<spaceTabs.length; i++){
		var spaceTab = $(spaceTabs[i]);
		// 폼이름 키값으로 하여 해당 폼에 있는 모든 입력항목들을 JSON형식으로 Serialize 한다...
		if(isEmpty(spaceTab.parent('form'))){
			spaceTab = spaceTab.clone();
			newProductService.find('form[name="frmNewProductService"]').append($('<form name="frmSpaceTab"></form>').html(spaceTab).hide());
			paramsJsonHiddens[spaceTab.attr('spaceType')] = mergeObjects(spaceTab.parent('form').serializeObject(), SmartWorks.GridLayout.serializeObject(spaceTab.parent('form')));
			spaceTab.parent().remove();
		}else{
			paramsJsonHiddens[spaceTab.attr('spaceType')] = mergeObjects(spaceTab.parent('form').serializeObject(), SmartWorks.GridLayout.serializeObject(spaceTab.parent('form')));
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
	
	console.log(JSON.stringify(paramsJson));
	// 서비스요청 프로그래스바를 나타나게 한다....
	var progressSpan = newProductService.find('.js_progress_span');
	smartPop.progressCont(progressSpan);
	var url = "create_product_service.sw";
	$.ajax({
		url : url,
		contentType : 'application/json',
		type : 'POST',
		data : JSON.stringify(paramsJson),
		success : function(data, status, jqXHR) {
			// 성공시에 프로그래스바를 제거하고 성공메시지를 보여준다...
 			location.href = "home.sw";
			smartPop.closeProgress();
		}
	});
}
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[newProductService script]', null, error);
}

</script>

<%

	String psId = request.getParameter("psId");
	String isEditModeStr = request.getParameter("isEditMode");
	boolean isEditMode = SmartUtil.isBlankObject(isEditModeStr) ? true : isEditModeStr.equalsIgnoreCase("true"); 
	ProductService productService = new ProductService();
	if(!SmartUtil.isBlankObject(psId)){
		try{
			productService = ManagerFactory.getInstance().getServiceManager().getProductService(psId, ProductService.SPACE_TYPE_NONE);
		}catch(Exception e){}
	}

%>

<div class="form_wrap up js_form_wrap js_new_iwork_page js_new_product_service_page" psId="<%=psId%>" isEditMode="<%=isEditMode%>">
	<div class="form_title js_form_header">
		<!-- 해당 업무이름을 표시하는 곳 -->
		<div class="title">새항목 등록하기</div>
		
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
				<span class="btn_gray"> 
					<!--  완료버튼을 클릭시 해당 업로드 화면페이지에 있는 submitForms()함수를 실행한다.. -->
					<a href="" class="js_complete_action" onclick='submitForms();return false;'> 
						<span class="txt_btn_start"></span>
						<span class="txt_btn_center">완료</span> 
						<span class="txt_btn_end"></span> 
					</a>
				</span> 
						
				<span class="btn_gray">
					<!--  취소버튼을 클릭시 sw_act_work 에서 click event 로 정의 되어있는 함수를 실행한다... -->
					<a href="" class="js_cancel_action"> 
						<span class="txt_btn_start"></span> 
						<span class="txt_btn_center">취소</span> 
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
<script>
try{
	
	var psName = "<%=CommonUtil.toNotNull(productService.getName())%>";
	var psPicture = "<%=CommonUtil.toNotNull(productService.getPicture())%>";
	var psDesc = "<%=CommonUtil.toNotNull(productService.getDesc())%>";
	
	var newProductServiceFields = $('div.js_new_product_service_fields');
	if(!isEmpty(newProductServiceFields)) {
		var newProductServiceField = $(newProductServiceFields[0]);
		var gridRow = SmartWorks.GridLayout.newGridRow();
		var gridTable = SmartWorks.GridLayout.newGridTable();
		newProductServiceField.html(gridTable.html(gridRow));
		
		SmartWorks.FormRuntime.TextInputBuilder.buildEx({
			container: gridRow,
			fieldId: "txtName",
			fieldName: "제품-서비스 이름",
			columns: 3,
			colSpan: 3,
			value: psName,
			required: true,
			readOnly: <%=!isEditMode%>
		});
 		
		gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
 		SmartWorks.FormRuntime.ImageBoxBuilder.buildEx({
			container: gridRow,
			fieldId: "imgPicture",
			fieldName: "제품사진",
			imgSource: psPicture,
			columns: 3,
			colSpan: 1,
			required: false
		});
 		gridRow.find('td[fieldId="imgPicture"]').addClass("vt").find('.qq-upload-button').text("제품사진");
 		
		SmartWorks.FormRuntime.TextInputBuilder.buildEx({
			container: gridRow,
			fieldId: "txtDesc",
			fieldName: "설명",
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
					'<th class="current"><a spaceType="1" href="viewValueSpace.jsp">Value Space</a></th>' +  
					'<th><a spaceType="2" href="viewDefaultSpace.jsp">Product-Service Space</a></th>' +  
					'<th><a spaceType="3" href="viewDefaultSpace.jsp">Product Space</a></th>' +  
					'<th><a spaceType="4" href="viewServiceSpace.jsp">Service Space</a></th>' +  
					'<th><a spaceType="5" href="viewDefaultSpace.jsp">Touch Point Space</a></th>' +  
					'<th><a spaceType="6" href="viewDefaultSpace.jsp">Customer Space</a></th>' +  
					'<th><a spaceType="7" href="viewBizModelSpace.jsp">Biz Model Space</a></th>' +  
					'<th><a spaceType="8" href="viewDefaultSpace.jsp">Actor Space</a></th>' +  
					'<th><a spaceType="9" href="viewDefaultSpace.jsp">Society Space</a></th>' +  
					'<th><a spaceType="10" href="viewDefaultSpace.jsp">Context Space</a></th>' +  
					'<th><a spaceType="11" href="viewDefaultSpace.jsp">Time Space</a></th>' +  
					'<th><a spaceType="12" href="viewDefaultSpace.jsp">Environment Space</a></th>' +  
				'</tr>' + 
			'</table>' +
			'<div class="up" style="border-top: #dfeffc 1px solid">' +
				'<div style="width:100%; height:20px; background-color:#dfeffc"></div>' +
				'<div class="js_space_view_target"></div>' +
			'</div>';

 		gridRow.find("td[fieldId='tabSpaces'] .form_value").html(spaceContents);
 
 		$.ajax({
				url : "viewValueSpace.jsp?psId=" +"<%=psId%>" + "&isEditMode=" + "<%=isEditMode%>",
				success : function(data, status, jqXHR) {
						gridRow.find("td[fieldId='tabSpaces'] .form_value .js_space_view_target").html(data);
				}
			});		
	}
	
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[newProductService script]', null, error);
}
</script>
