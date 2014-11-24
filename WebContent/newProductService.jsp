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
	var newAssetReservation = $('.js_new_asset_reservation_page');
	// new_asset_reservation 에 있는 활성화되어 있는 모든 입력화면들을 validation하여 이상이 없으면 submit를 진행한다...
	if(!SmartWorks.GridLayout.validate(newAssetReservation.find('form.js_validation_required:visible'), $('.js_upload_error_message'))) return;

	var form = newAssetReservation.find('form[name="frmNewEvent"]');
	var name = form.find('input[name="txtSubject"]').attr("value");
	var startDate = form.find('input[name="txtStartDate"]').attr("value");
	var endDate = form.find('input[name="txtEndDate"]').attr("value");
	if(!isEmpty(startDate) && !isEmpty(endDate)){
		if((new Date(startDate))>(new Date(endDate))){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get("eventOldEndDateError"));
			return;
		}
	}
	var assetId = form.find('select[name="selAsset"] option:selected').attr("assetId");
	var categoryId = form.find('select[name="selAssetFolder"] option:selected').attr("folderId");
	var repeatBy = form.find('select[name="selEventRepeatBy"] option:selected').attr('repeatBy');
	var repeatWeek = form.find('select[name="selEventRepeatWeek"] option:selected').attr('repeatWeek');
	var repeatDay = form.find('select[name="selEventRepeatDay"] option:selected').attr('repeatDay');
	var repeatDate = form.find('select[name="selEventRepeatDate"]').attr('value');
	var repeatEnd = form.find('select[name="selEventRepeatEnd"] option:selected').attr('repeatEnd');
	var repeatEndDate = form.find('input[name="txtEventRepeatEndDate"]').attr("value");
	var repeatEndCount = form.find('div[name="txtEventRepeatEndCount"] input').attr("value");
	var relatedUserField = form.find('.js_type_userField .js_community_item');
	var relatedUsers = new Array();
	for(var i=0; i<relatedUserField.length; i++){
		relatedUsers.push({
			userId : $(relatedUserField[i]).attr('comId'),
			longName : $(relatedUserField[i]).attr('comName')
		});
	}
	var content = form.find('textarea[name="txtContent"]').attr("value");
 	var formContent = newAssetReservation.find('.js_hidden_form_content');
	if(!isEmpty(startDate) && !isEmpty(repeatEndDate)){
		if((new Date(startDate))>(new Date(repeatEndDate))){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get("eventOldRepeatEndDateError"));
		}
	}

	if(!isEmpty(formContent)) {

		var workId = newAssetReservation.attr('workId');
		var instanceId = newAssetReservation.attr('instanceId');
		var tempSavedId = newAssetReservation.attr("tempSavedId");
		$.ajax({
			url : "get_form_xml.sw",
			data : {
				workId : workId
			},
			success : function(formXml, status, jqXHR) {
				try{
					// 화면 xml을 가져오면 가져온 값과 입력된 설명값들을 가지고 스마트폼을 이용해 화면을 그린다...
					new SmartWorks.GridLayout({
						target : formContent,
						formXml : formXml,
						formValues : createReservationDataFields({
							formXml : formXml,
							name : name,
							startDate : startDate,
							endDate : endDate,
							assetId : assetId,
							categoryId : categoryId,
							relatedUsers : relatedUsers,
							content : content
						}),
						mode : "edit"
					});
					// 그려진 화면에 있는 입력화면들을 JSON형식으로 Serialize한다...
					var forms = newAssetReservation.find('form');
					var paramsJson = {};
					for(var i=0; i<forms.length; i++){
						var form = $(forms[i]);
						// 폼이 스마트폼이면 formId와 formName 값을 전달한다...
						if(form.attr('name') === 'frmSmartForm'){
							paramsJson['formId'] = form.attr('formId');
							paramsJson['formName'] = form.attr('formName');
						}else if(form.attr('name') === 'frmNewEvent'){
							continue;
						}
						// 폼이름 키값으로 하여 해당 폼에 있는 모든 입력항목들을 JSON형식으로 Serialize 한다...
						paramsJson[form.attr('name')] = mergeObjects(form.serializeObject(), SmartWorks.GridLayout.serializeObject(form));
					}
					if(tempSave){
						paramsJson['isTempSave'] = true;
						paramsJson['workId'] = workId;
						paramsJson['instanceId'] = instanceId;
						if(!isEmpty(tempSavedId)){
							paramsJson['tempSavedId'] = tempSavedId;
						}
					}
					if(repeatBy !== "none"){
						var repeatPolicy = {};
						repeatPolicy['repeatBy'] = repeatBy;
						repeatPolicy['repeatWeek'] = repeatWeek;
						repeatPolicy['repeatDay'] = repeatDay;
						repeatPolicy['repeatDate'] = repeatDate;
						repeatPolicy['repeatEnd'] = repeatEnd;
						repeatPolicy['repeatEndDate'] = repeatEndDate;
						repeatPolicy['repeatEndCount'] = repeatEndCount;
						paramsJson['repeatPolicy'] = repeatPolicy;
					}
					console.log(JSON.stringify(paramsJson));
					// 서비스요청 프로그래스바를 나타나게 한다....
					var progressSpan = newAssetReservation.find('.js_progress_span');
					smartPop.progressCont(progressSpan);
					var url = "reserve_asset.sw?assetId=" + assetId + "&startDate=" + startDate + "&endDate=" + endDate;
					$.ajax({
						url : url,
						contentType : 'application/json',
						type : 'POST',
						data : JSON.stringify(paramsJson),
						success : function(data, status, jqXHR) {
							try{
								// 성공시에 프로그래스바를 제거하고 성공메시지를 보여준다...
								smartPop.closeProgress();
								if(tempSave){
									newAssetReservation.attr('instanceId', data.instanceId);
									newAssetReservation.attr('tempSavedId', data.instanceId);
								}else{
									refreshCurrentContent(newAssetReservation);
								}
							}catch(error){
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[new_asset_reservation reserve_asset]', null, error);
							}
						},
						error : function(xhr, ajaxOptions, e) {
							console.log("in e=", e);
							// 서비스 에러시에는 메시지를 보여주고 현재페이지에 그래도 있는다...
							smartPop.closeProgress();
							if(xhr.responseText === "duplicateKeyException")
								smartPop.showInfo(smartPop.WARN, smartMessage.get("duplicatedReservationException"), null, e);
							else
								smartPop.showInfo(smartPop.ERROR, smartMessage.get("createEventError"), null, e);
						}
					});
				}catch(error){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[new_asset_reservation get_form_xml]', null, error);
				}
			}
		});
	}
}
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[new_asset_reservation script]', null, error);
}

</script>

<%

	String psId = request.getParameter("psId");
	String isEditModeStr = request.getParameter("isEditMode");
	boolean isEditMode = SmartUtil.isBlankObject(isEditModeStr) ? true : isEditModeStr.equalsIgnoreCase("true"); 
	
	ProductService productService = null;
	if(!SmartUtil.isBlankObject(psId)){
		try{
			productService = ManagerFactory.getInstance().getServiceManager().getProductService(psId);
		}catch(Exception e){}
	}else{
		productService = new ProductService();
	}

%>

<div class="form_wrap up js_form_wrap js_new_product_service_page" psId="<%=psId%>">
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
	<form name="frmNewProductService" class="js_validation_required form_layout js_click_start_form">
		<div class="js_new_product_service_fields"></div>
	</form>
	<div class="js_hidden_form_content" style="display:none"></div>
	<!-- 새이벤트를 등록하기위한 완료 버튼과 취소 버튼 -->
	<div class="js_upload_buttons"></div>
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
			columns: 1,
			colSpan: 1,
			value: psName,
			required: true,
			readOnly: <%=!isEditMode%>
		});

		gridRow = SmartWorks.GridLayout.newGridRow().appendTo(gridTable);
		SmartWorks.FormRuntime.RichEditorBuilder.buildEx({
			container: gridRow,
			fieldId: "txtDesc",
			fieldName: "설명",
			columns: 4,
			colSpan: 2,
			value: psDesc,
			required: false
		});
		gridRow.find('#txtDesc').css({height:"100px"});
		SmartWorks.FormRuntime.RichEditorBuilder.buildEx({
			container: gridRow,
			fieldId: "txtDesc",
			fieldName: "설명",
			columns: 4,
			colSpan: 2,
			value: psDesc,
			required: false
		});
		gridRow.find('#txtDesc').css({height:"100px"});
/* 		SmartWorks.FormRuntime.ImageBoxBuilder.buildEx({
			container: gridRow,
			fieldId: "imgPicture",
			fieldName: "제품사진",
			imgSource: psPicture,
			columns: 4,
			colSpan: 1,
			required: false
		});
 */
	}
	
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[newProductService script]', null, error);
}
</script>
