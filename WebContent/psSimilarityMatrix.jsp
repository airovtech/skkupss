<%@page import="net.smartworks.skkupss.model.User"%>
<%@page import="net.smartworks.factory.ManagerFactory"%>
<%@page import="net.smartworks.skkupss.model.ProductService"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.SimilarityMatrix"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.util.Date"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<%
	User cUser = SmartUtil.getCurrentUser();

	String spaceType = (String)request.getAttribute("spaceType");
	SimilarityMatrix[][] data = (SimilarityMatrix[][])request.getAttribute("psSimilarities");
	String[] psIds = (String[])request.getAttribute("psIds");
	String[] psNames = (String[])request.getAttribute("psNames");
	
	if(SmartUtil.isBlankObject(psIds)){
		spaceType = request.getParameter("spaceType");
		psIds = (String[])session.getAttribute("psIds");
		psNames = (String[])session.getAttribute("psNames");
		try{
			data = ManagerFactory.getInstance().getServiceManager().caculatePsSimilarities(psIds, psNames, spaceType);
		}catch(Exception e){}
	}
	
	String spaceName = ProductService.PSS_SPACE_VALUE;
	switch(ProductService.getSpaceType(spaceType)){
	case ProductService.SPACE_TYPE_PRODUCT:
		spaceName = ProductService.PSS_SPACE_PRODUCT;
		break;
	case ProductService.SPACE_TYPE_SERVICE:
	case ProductService.SPACE_TYPE_SERVICE_BIZ_MODEL:
		spaceName = ProductService.PSS_SPACE_SERVICE;
		break;
	case ProductService.SPACE_TYPE_BIZ_MODEL:
		spaceName = ProductService.PSS_SPACE_BIZ_MODEL;
		break;	
	case ProductService.SPACE_TYPE_CONTEXT:
		spaceName = ProductService.PSS_SPACE_CONTEXT;
		break;	
	}
	
	session.setAttribute("psIds", psIds);
	session.setAttribute("psNames", psNames);
	session.setAttribute("psNames", psNames);

 	if(SmartUtil.isBlankObject(data)) return;
	
%>
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />

<script type="text/javascript">

	var colNames = [];
	var colModels = [];

	colNames[0]  = "제품-서비스 이름";
	colModels[0] =  {name: "name", index:'name', align: 'center', sortable:true, width:'200'};
	
	<%
	for(int i=0; !SmartUtil.isBlankObject(data[0]) && i<data[0].length; i++){
		SimilarityMatrix sm = data[0][i];
	%>
		colNames[<%=i+1%>]  = "<%=sm.getTargetPsName()%>";
		colModels[<%=i+1%>] =  {name: "<%=sm.getTargetPsId()%>", index: "<%=sm.getTargetPsId()%>", align: 'right',  sortable:false, formatter:'integer',  formatoptions:{defaultValue:'', thousandsSeparator: ",",  decimalPlaces: 2 }};
	<%
	}
	%>
	
	
	var matrixData = Array();
	<%
	for(int i=0; !SmartUtil.isBlankObject(data) && i<data.length; i++){
	%>
		var rowData = [];
		rowData['name'] = '<%=data[i][0].getSourcePsName()%>';
		<%
		for(int j=0; !SmartUtil.isBlankObject(data[i]) && j<data[i].length; j++){
			SimilarityMatrix sm = data[i][j];
		%>
			rowData['<%=sm.getTargetPsId()%>'] = <%=sm.getSimilarity()%>;		
		<%	
			if(data[i][j].getSourcePsId().equals(data[i][j].getTargetPsId()))
				break;
		}
		%>
		matrixData[<%=i%>] = rowData;
	<%
	}
	%>

	function useColorValues(){
	    var gridData = $("#matrix_list").jqGrid('getRowData');
	    for(var i=0; i<=gridData.length; i++) {
	        var rowData = $("#matrix_list").jqGrid('getRowData',i+1);
	        for(var j=1; j<colModels.length; j++){
		        if(rowData[colModels[j].name] >= 0.9) { 
		            $("#matrix_list").jqGrid('setCell', i+1, j,"",{color:'blue'});
		        }else if(rowData[colModels[j].name] < 0.9 && rowData[colModels[j].name] >= 0.8) { 
		            $("#matrix_list").jqGrid('setCell', i+1, j,"",{color:'green'});
		        }else if(rowData[colModels[j].name] <= 0.6) { 
		            $("#matrix_list").jqGrid('setCell', i+1, j,"",{color:'red'});
		        }   			        	
	        }
  		}
	}
	
	function clearColorValues(){
	    var gridData = $("#matrix_list").jqGrid('getRowData');
	    for(var i=0; i<=gridData.length; i++) {
	        var rowData = $("#matrix_list").jqGrid('getRowData',i+1);
	        for(var j=1; j<colModels.length; j++){
	            $("#matrix_list").jqGrid('setCell', i+1, j,"",{color:'#363636'});
	        }
  		}
	}
	
	$(document).ready( function() { 	
		jQuery("#matrix_list").jqGrid({
			data: matrixData,  
			datatype: "local",      //json형태로 데이터 받음.  
			height: "auto",
			grouping:false, //그룹화 하기위한 옵션
			autowidth:true,
			colNames:colNames,
			colModel:colModels,
			onCellSelect : function(rowid, colid, value){
				if(rowid==0 || colid==0 || value==null || value=="" || rowid==colid) return;
				console.log('colModels=', colModels[rowid]);
				var sourcePsId = colModels[rowid].name;
				var targetPsId = colModels[colid].name;
				smartPop.progressCenter();
				$.ajax({
					url : "doubleProductServices.jsp?sourcePsId=" + sourcePsId + "&targetPsId=" + targetPsId + "&spaceType=<%=spaceName%>" + "&isSim=true&value=" + value,
					success : function(data, status, jqXHR) {
						$('#double_product_service').html(data);
						smartPop.closeProgress();
					}
				});
				
			},
			gridComplete : function() { 	        	  
			},
			loadError:function(xhr, status, error) {
				console.log("error=" + error);
			},
			multiselect: false
	     });
	});

 </script>

<!-- 컨텐츠 레이아웃-->
<div class="section_portlet js_similarity_matrix_page js_work_list_page">
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
					
						<div class="title_line_options">
							<div class="form_space po_left">
								<select name="selFilterName" class="js_select_recent_similarity">
									<option>
										<fmt:message key='pss.title.recent_history.none' />
									</option>
<%-- 									<%
									SearchFilterInfo[] filters = work.getSearchFilters();
									if (filters != null) {
										for (SearchFilterInfo filter : filters) {
											if(SmartUtil.isBlankObject(filter.getId())) continue;
									%>
											<option class="js_custom_filter" value="<%=filter.getId()%>" <%if(filter.getId().equals(selectedFilterId)){%> selected <%} %>><%=CommonUtil.toNotNull(filter.getName())%></option>
									<%
										}
									}
									%>
 --%>								</select>
							</div>
							<select name="selSpaceName" class="js_select_space_name">
								<option value="<%=ProductService.PSS_SPACE_VALUE%>" <%if(spaceType.equals(ProductService.PSS_SPACE_VALUE)){%>selected<%} %>><fmt:message key="pss.title.space.value"/></option>
								<option value="<%=ProductService.PSS_SPACE_PRODUCT%>" <%if(spaceType.equals(ProductService.PSS_SPACE_PRODUCT)){%>selected<%} %>><fmt:message key="pss.title.space.product"/></option>
								<option value="<%=ProductService.PSS_SPACE_SERVICE%>" <%if(spaceType.equals(ProductService.PSS_SPACE_SERVICE)){%>selected<%} %>><fmt:message key="pss.title.space.service"/></option>
								<option value="<%=ProductService.PSS_SPACE_CUSTOMER%>" <%if(spaceType.equals(ProductService.PSS_SPACE_CUSTOMER)){%>selected<%} %>><fmt:message key="pss.title.space.customer"/></option>
								<option value="<%=ProductService.PSS_SPACE_BIZ_MODEL%>" <%if(spaceType.equals(ProductService.PSS_SPACE_BIZ_MODEL)){%>selected<%} %>><fmt:message key="pss.title.space.biz_model"/></option>
								<option value="<%=ProductService.PSS_SPACE_CONTEXT%>" <%if(spaceType.equals(ProductService.PSS_SPACE_CONTEXT)){%>selected<%} %>><fmt:message key="pss.title.space.context"/></option>
								<option value="<%=ProductService.PSS_SPACE_TIME%>" <%if(spaceType.equals(ProductService.PSS_SPACE_TIME)){%>selected<%} %>><fmt:message key="pss.title.space.time"/></option>
								<option value="<%=ProductService.PSS_SPACE_VALUE_SERVICE%>" <%if(spaceType.equals(ProductService.PSS_SPACE_VALUE_SERVICE)){%>selected<%} %>><fmt:message key="pss.title.space.valueNservice"/></option>
								<option value="<%=ProductService.PSS_SPACE_VALUE_BIZ_MODEL%>" <%if(spaceType.equals(ProductService.PSS_SPACE_VALUE_BIZ_MODEL)){%>selected<%} %>><fmt:message key="pss.title.space.valueNbiz_model"/></option>
								<option value="<%=ProductService.PSS_SPACE_SERVICE_BIZ_MODEL%>" <%if(spaceType.equals(ProductService.PSS_SPACE_SERVICE_BIZ_MODEL)){%>selected<%} %>><fmt:message key="pss.title.space.serviceNbiz_model"/></option>
								<option value="<%=ProductService.PSS_SPACE_VALUE_SERVICE_BIZ_MODEL%>" <%if(spaceType.equals(ProductService.PSS_SPACE_VALUE_SERVICE_BIZ_MODEL)){%>selected<%} %>><fmt:message key="pss.title.space.valueNserviceNbiz_model"/></option>
							</select>
							<span class="js_progress_span"></span>
							<input style="margin-left:20px" class="js_toggle_use_sim_color" type="checkbox"/><span style="margin-left:6px"><fmt:message key="pss.desc.similarity_legend"/></span>
						</div>
					</div>
					<!-- 목록보기 타이틀-->

					<!-- 상세필터 및 새업무등록하기 화면 -->
					<div id="search_filter" class="filter_section js_new_work_form"></div>
					<!-- 상세필터 -->

					<!-- 목록 테이블 -->
					<div class="list_contents">
						<div id='iwork_instance_list_page'>
							<table id="matrix_list"></table> 
						</div>
					</div>
					<!-- 목록 테이블 //-->
				</div>
				<!-- 목록 보기 -->
			</div>
			<!-- 목록영역 // -->
			
			<div id="double_product_service"></div>
		</ul>
	</div>
	<div class="portlet_b" style="display: block;"></div>
</div>
<!-- 컨텐츠 레이아웃//-->
 
 