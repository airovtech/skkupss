<%@page import="net.smartworks.util.PropertiesLoader"%>
<%@page import="net.smartworks.skkupss.manager.impl.DocFileManagerImpl"%>
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
<%

	String PSS_PICTURE_URL = PropertiesLoader.loadPropByClassPath("/net/smartworks/conf/config.properties").getProperty("pss.picture.url");

	String sourcePsId = request.getParameter("sourcePsId");
	String targetPsId = request.getParameter("targetPsId");
	String spaceType = request.getParameter("spaceType");
	String value = request.getParameter("value");
	String isSimStr = request.getParameter("isSim");
	boolean isNotSim = SmartUtil.isBlankObject(isSimStr) ? true : !isSimStr.equals("true");
	
	ProductService sourcePs = ManagerFactory.getInstance().getServiceManager().getProductService(sourcePsId, ProductService.getSpaceType(spaceType));
	ProductService targetPs = ManagerFactory.getInstance().getServiceManager().getProductService(targetPsId, ProductService.getSpaceType(spaceType));

	if(sourcePs==null || targetPs==null) return;
	
	String sourcePsPicUrl = SmartUtil.isBlankObject(sourcePs.getPicture()) ? "" : PSS_PICTURE_URL +  sourcePs.getPicture();
	String targetPsPicUrl = SmartUtil.isBlankObject(targetPs.getPicture()) ? "" : PSS_PICTURE_URL +  targetPs.getPicture();

%>

<%if(isNotSim){ %>
<!-- 컨텐츠 레이아웃-->
<div class="section_portlet js_iwork_list_page js_work_list_page">
	<div class="portlet_t"><div class="portlet_tl"></div></div>
	<div class="portlet_l" style="display: block;">
		<ul class="portlet_r" style="display: block;">
			<!-- 타이틀 -->
			<div class="body_titl"></div>
			<!-- 목록영역  -->
<%} %>
			<div class="contents_space">
				<div>
					<!-- 목록보기 타이틀-->
					<div class="list_title_space js_work_list_title mt15">
						<%if(isNotSim){ %>
							<div class="title_line_btns">
								<div class="icon_btn_start">
									<a href="home.sw?spaceType=<%=spaceType %>" class="icon_btn_tail">목록으로 이동하기</a>
								</div>
							</div>
						<%} %>
					
						<div class="title_line_options">
							<select class="js_select_double_space_name" sourcePsId="<%=sourcePsId %>" targetPsId="<%=targetPsId%>">
								<option href="viewValueSpace.jsp" spaceType="1" value="<%=ProductService.PSS_SPACE_VALUE%>" <%if(spaceType.equals(ProductService.PSS_SPACE_VALUE)){%>selected<%} %>>가치공간(Value Space)</option>
								<option href="viewDefaultSpace.jsp" spaceType="2" value="<%=ProductService.PSS_SPACE_PRODUCT_SERVICE%>" <%if(spaceType.equals(ProductService.PSS_SPACE_PRODUCT_SERVICE)){%>selected<%} %>>제품-서비스공간(Product-Service Space)</option>
								<option href="viewDefaultSpace.jsp" spaceType="3" value="<%=ProductService.PSS_SPACE_PRODUCT%>" <%if(spaceType.equals(ProductService.PSS_SPACE_PRODUCT)){%>selected<%} %>>제품공간(Product Space)</option>
								<option href="viewServiceSpace.jsp" spaceType="4" value="<%=ProductService.PSS_SPACE_SERVICE%>" <%if(spaceType.equals(ProductService.PSS_SPACE_SERVICE)){%>selected<%} %>>서비스공간(Service Space)</option>
								<option href="viewDefaultSpace.jsp" spaceType="5" value="<%=ProductService.PSS_SPACE_TOUCH_POINT%>" <%if(spaceType.equals(ProductService.PSS_SPACE_TOUCH_POINT)){%>selected<%} %>>터치포인트공간(Touch Point Space)</option>
								<option href="viewDefaultSpace.jsp" spaceType="6" value="<%=ProductService.PSS_SPACE_CUSTOMER%>" <%if(spaceType.equals(ProductService.PSS_SPACE_CUSTOMER)){%>selected<%} %>>고객공간(Customer Space)</option>
								<option href="viewBizModelSpace.jsp" spaceType="7" value="<%=ProductService.PSS_SPACE_BIZ_MODEL%>" <%if(spaceType.equals(ProductService.PSS_SPACE_BIZ_MODEL)){%>selected<%} %>>비즈모델공간(Biz Model Space)</option>
								<option href="viewDefaultSpace.jsp" spaceType="8" value="<%=ProductService.PSS_SPACE_ACTOR%>" <%if(spaceType.equals(ProductService.PSS_SPACE_ACTOR)){%>selected<%} %>>역할자공간(Actor Space)</option>
								<option href="viewDefaultSpace.jsp" spaceType="9" value="<%=ProductService.PSS_SPACE_SOCIETY%>" <%if(spaceType.equals(ProductService.PSS_SPACE_SOCIETY)){%>selected<%} %>>역할자공간(Actor Space)</option>
								<option href="viewDefaultSpace.jsp" spaceType="10" value="<%=ProductService.PSS_SPACE_CONTEXT%>" <%if(spaceType.equals(ProductService.PSS_SPACE_CONTEXT)){%>selected<%} %>>컨텍스트공간(Context Space)</option>
								<option href="viewDefaultSpace.jsp" spaceType="11" value="<%=ProductService.PSS_SPACE_TIME%>" <%if(spaceType.equals(ProductService.PSS_SPACE_TIME)){%>selected<%} %>>시간공간(Time Space)</option>
								<option href="viewDefaultSpace.jsp" spaceType="12" value="<%=ProductService.PSS_SPACE_ENVIRONMENT%>" <%if(spaceType.equals(ProductService.PSS_SPACE_ENVIRONMENT)){%>selected<%} %>>환경공간(Environment Space)</option>
							</select>
							<%if(!SmartUtil.isBlankObject(value)) {%>
								<span style="font-size: 12px;font-weight: bold;margin-left: 10px;">[유사도 : <%=value %>]</span>
							<%} %>
						</div>
					</div>
					<!-- 목록보기 타이틀-->

					<!-- 상세필터 및 새업무등록하기 화면 -->
					<div id="search_filter" class="filter_section js_new_work_form">
					</div>
					<!-- 목록 테이블 -->
					<div class="list_contents">
						<div id='iwork_instance_list_page' >					
							<div class="form_wrap up js_form_wrap js_new_iwork_page js_double_product_services_page" sourcePsId="<%=sourcePsId%>" targetPsId="<%=targetPsId %>" spaceType="<%=spaceType%>">
								<form name="frmDoubleProductServices" class="js_validation_required form_layout">
									<table>
										<tr class="tit_bg">
											<th class="r_line" style="width:50%"><%=CommonUtil.toNotNull(sourcePs.getName()) %></th>
											<th class="" style="width:50%"><%=CommonUtil.toNotNull(targetPs.getName()) %></th>
										</tr>
										<tr>								
											<td class="tc r_line"><img class="vt up" style="height:200px<%if(SmartUtil.isBlankObject(sourcePsPicUrl)){ %>;width:200px<%} %>" src="<%=sourcePsPicUrl%>"></td>
											<td class="tc"><img class="vt up" style="height:200px<%if(SmartUtil.isBlankObject(targetPsPicUrl)){ %>;width:200px<%} %>" src="<%=targetPsPicUrl%>"></td>
										</tr>
										<tr>								
											<td class="tc r_line">
												<div id="source_view_target">
													<%
													switch(ProductService.getSpaceType(spaceType)){
													case ProductService.SPACE_TYPE_VALUE:
													%>
														<jsp:include page="viewValueSpace.jsp">
															<jsp:param value="<%=sourcePsId %>" name="psId"/>
														</jsp:include>
													<%
													break;
													case ProductService.SPACE_TYPE_SERVICE:
													%>
														<jsp:include page="viewServiceSpace.jsp">
															<jsp:param value="<%=sourcePsId %>" name="psId"/>
														</jsp:include>
													<%
													break;
													case ProductService.SPACE_TYPE_BIZ_MODEL:
													%>
														<jsp:include page="viewBizModelSpace.jsp">
															<jsp:param value="<%=sourcePsId %>" name="psId"/>
														</jsp:include>
													<%
													break;
													default:
													%>
														<jsp:include page="viewValueSpace.jsp">
															<jsp:param value="<%=sourcePsId %>" name="psId"/>
														</jsp:include>
													<%
													break;
													}
													%>
												</div>
											</td>
											<td class="tc">
												<div id="target_view_target">
													<%
													switch(ProductService.getSpaceType(spaceType)){
													case ProductService.SPACE_TYPE_VALUE:
													%>
														<jsp:include page="viewValueSpace.jsp">
															<jsp:param value="<%=targetPsId %>" name="psId"/>
														</jsp:include>
													<%
													break;
													case ProductService.SPACE_TYPE_SERVICE:
													%>
														<jsp:include page="viewServiceSpace.jsp">
															<jsp:param value="<%=targetPsId %>" name="psId"/>
														</jsp:include>
													<%
													break;
													case ProductService.SPACE_TYPE_BIZ_MODEL:
													%>
														<jsp:include page="viewBizModelSpace.jsp">
															<jsp:param value="<%=targetPsId %>" name="psId"/>
														</jsp:include>
													<%
													break;
													default:
													%>
														<jsp:include page="viewValueSpace.jsp">
															<jsp:param value="<%=targetPsId %>" name="psId"/>
														</jsp:include>
													<%
													break;
													}
													%>
												</div>
											</td>
										</tr>
									</table>
								</form>
								<div class="js_hidden_form_content" style="display:none"></div>
								<!-- 새이벤트를 등록하기위한 완료 버튼과 취소 버튼 -->
								<div class="js_upload_buttons">
								</div>
							</div>
						</div>
					</div>
					<!-- 상세필터 -->
				</div>
				<!-- 목록 보기 -->
			</div>
			<!-- 목록영역 // -->
<%if(isNotSim){ %>
		</ul>
	</div>
	<div class="portlet_b" style="display: block;"></div>
</div>
<%} %>
<!-- 컨텐츠 레이아웃//-->

<script>
	$('#content').css({"min-width": "1360px"});
	$('#wrap').css({"min-width": "1385px"});
</script>
