<%@ page contentType="text/html; charset=utf-8"%>
<script type="text/javascript">
try{

	getIntanceList = function(paramsJson, progressSpan, isGray){
		if(isEmpty(progressSpan))
			progressSpan = $('.js_work_list_title').find('.js_progress_span:first');
		if(isGray)
			smartPop.progressContGray(progressSpan);
		else
			smartPop.progressCont(progressSpan);
		console.log(JSON.stringify(paramsJson));
		var url = "set_instance_list_params.sw";
		$.ajax({
			url : url,
			contentType : 'application/json',
			type : 'POST',
			data : JSON.stringify(paramsJson),
			success : function(data, status, jqXHR) {
				$('#iwork_instance_list_page').html(data);
				smartPop.closeProgress();
			},
			error : function(xhr, ajaxOptions, thrownError) {
				smartPop.closeProgress();
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('workListError'), null, thrownError);
			}
		});
	};
	
	selectListParam = function(progressSpan, isGray){
		var iworkList = $('.js_iwork_list_page');
		var forms = iworkList.find('form:visible');
		var paramsJson = {};
		var isUserMode = iworkList.attr('isUserMode');
		paramsJson["isUserMode"] = isUserMode;
		var workId = iworkList.attr('workId');
		paramsJson["href"] = "psInstanceList.jsp";
		console.log('forms=', forms);
		for(var i=0; i<forms.length; i++){
			var form = $(forms[i]);
			paramsJson[form.attr('name')] = mergeObjects(form.serializeObject(), SmartWorks.GridLayout.serializeObject(form));
		}
		if(isEmpty(progressSpan)) progressSpan = iworkList.find('.js_search_filter_page').next('span.js_progress_span:first');
		getIntanceList(paramsJson, progressSpan, isGray);		
	};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[iwork script]', null, error);
}
</script>

<%
	String spaceType = request.getParameter("spaceType");
%>


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
								<a href="newProductService.jsp" class="js_instance_detail icon_btn_tail">새항목 등록하기</a>
							</div>
							<div class="icon_btn_start">
								<a href="" class="js_eyeball_comparison icon_btn_tail">육안 비교</a>
							</div>
							<div class="icon_btn_start">
								<a href="" class="js_similarity_calculation icon_btn_tail">유사도 비교</a>
							</div>
						</div>
					
						<div class="title_line_options">
							<form name="frmSearchInstance" class="po_left ml10"> 
								<div class="srch_wh srch_wsize">
									<input name="txtSearchInstance" class="nav_input" value="" type="text" placeholder="항목찾기">
									<button title="함목찾기" onclick="selectListParam($('.js_work_list_title').find('.js_progress_span:first'), false);return false;"></button>
								</div>
							</form>
							<span class="js_progress_span"></span>
						</div>
					</div>
					<!-- 목록보기 타이틀-->

					<!-- 상세필터 및 새업무등록하기 화면 -->
					<div id="search_filter" class="filter_section js_new_work_form"></div>
					<!-- 상세필터 -->

					<!-- 목록 테이블 -->
					<div class="list_contents">
						<div id='iwork_instance_list_page' >
 							<jsp:include page="psInstanceList.jsp">
 								<jsp:param value="<%=spaceType %>" name="spaceType"/>
 							</jsp:include>
						</div>
					</div>
					<!-- 목록 테이블 //-->
				</div>
				<!-- 목록 보기 -->
			</div>
			<!-- 목록영역 // -->
		</ul>
	</div>
	<div class="portlet_b" style="display: block;"></div>
</div>
<!-- 컨텐츠 레이아웃//-->



