<%@ page contentType="text/html; charset=utf-8"%>

<!-- 컨텐츠 레이아웃-->
<div class="up" style="width:">
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
								<a href="" class="js_create_new_work icon_btn_tail">새항목 등록하기</a>
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
 							<jsp:include page="psInstanceList.jsp"/>
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
