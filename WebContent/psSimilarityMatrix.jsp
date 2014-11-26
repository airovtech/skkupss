<%@page import="net.smartworks.factory.ManagerFactory"%>
<%@page import="net.smartworks.skkupss.model.ProductService"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.SimilarityMatrix"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.util.Date"%>
<%@ page contentType="text/html; charset=utf-8"%>

<%

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
	
	session.setAttribute("psIds", psIds);
	session.setAttribute("psNames", psNames);
	session.setAttribute("psNames", psNames);

	
/* 	SimilarityMatrix sm1 = new SimilarityMatrix();
	sm1.setSourcePsId("s1");
	sm1.setSourcePsName("이름1");
	sm1.setTargetPsId("s1");
	sm1.setTargetPsName("이름1");
	sm1.setSimilarity(new Float(1.0));

	SimilarityMatrix sm2 = new SimilarityMatrix();
	sm2.setSourcePsId("s1");
	sm2.setSourcePsName("이름1");
	sm2.setTargetPsId("s2");
	sm2.setTargetPsName("이름2");
	sm2.setSimilarity(new Float(0.5));
	
	SimilarityMatrix sm3 = new SimilarityMatrix();
	sm3.setSourcePsId("s2");
	sm3.setSourcePsName("이름2");
	sm3.setTargetPsId("s1");
	sm3.setTargetPsName("이름1");
	sm3.setSimilarity(new Float(0.5));

	SimilarityMatrix sm4 = new SimilarityMatrix();
	sm4.setSourcePsId("s2");
	sm4.setSourcePsName("이름2");
	sm4.setTargetPsId("s2");
	sm4.setTargetPsName("이름2");
	sm4.setSimilarity(new Float(1.0));

	data = new SimilarityMatrix[][]{{sm1, sm2},{sm3, sm4}};
 */
 
 	if(SmartUtil.isBlankObject(data)) return;
	
	

%>

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
		colModels[<%=i+1%>] =  {name: "<%=sm.getTargetPsId()%>", index: "<%=sm.getTargetPsId()%>", align: 'right',  sortable:false, formatter:'integer',  formatoptions:{defaultValue:'0', thousandsSeparator: ",",  decimalPlaces: 2 }};
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
		}
		%>
		matrixData[<%=i%>] = rowData;
	<%
	}
	%>

	console.log(colNames);
	console.log(colModels);
	console.log(matrixData);
	
	$(document).ready( function() { 	
		jQuery("#matrix_list").jqGrid({
			data: matrixData,  
			datatype: "local",      //json형태로 데이터 받음.  
			height: "auto",
			grouping:false, //그룹화 하기위한 옵션
			autowidth:true,
			colNames:colNames,
			colModel:colModels,
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
								<a href="home.sw" class="icon_btn_tail">목록으로 이동하기</a>
							</div>
						</div>
					
						<div class="title_line_options">
							<select name="selSpaceName" class="js_select_space_name">
								<option value="<%=ProductService.PSS_SPACE_VALUE%>" <%if(spaceType.equals(ProductService.PSS_SPACE_VALUE)){%>selected<%} %>>가치공간(Value Space)</option>
								<option value="<%=ProductService.PSS_SPACE_SERVICE%>" <%if(spaceType.equals(ProductService.PSS_SPACE_SERVICE)){%>selected<%} %>>서비스공간(Service Space)</option>
								<option value="<%=ProductService.PSS_SPACE_BIZ_MODEL%>" <%if(spaceType.equals(ProductService.PSS_SPACE_BIZ_MODEL)){%>selected<%} %>>비즈모델공간(Biz Model Space)</option>
							</select>
							<span class="js_progress_span"></span>
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
		</ul>
	</div>
	<div class="portlet_b" style="display: block;"></div>
</div>
<!-- 컨텐츠 레이아웃//-->
 
 