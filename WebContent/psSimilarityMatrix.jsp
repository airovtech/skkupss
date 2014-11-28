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
	
	String spaceName = ProductService.PSS_SPACE_VALUE;
	switch(ProductService.getSpaceType(spaceType)){
	case ProductService.SPACE_TYPE_SERVICE:
	case ProductService.SPACE_TYPE_SERVICE_BIZ_MODEL:
		spaceName = ProductService.PSS_SPACE_SERVICE;
		break;
	case ProductService.SPACE_TYPE_BIZ_MODEL:
		spaceName = ProductService.PSS_SPACE_BIZ_MODEL;
		break;	
	}
	
	session.setAttribute("psIds", psIds);
	session.setAttribute("psNames", psNames);
	session.setAttribute("psNames", psNames);

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
								<a href="home.sw?spaceType=<%=spaceType %>" class="icon_btn_tail">목록으로 이동하기</a>
							</div>
						</div>
					
						<div class="title_line_options">
							<select name="selSpaceName" class="js_select_space_name">
								<option value="<%=ProductService.PSS_SPACE_VALUE%>" <%if(spaceType.equals(ProductService.PSS_SPACE_VALUE)){%>selected<%} %>>가치공간(Value Space)</option>
								<option value="<%=ProductService.PSS_SPACE_SERVICE%>" <%if(spaceType.equals(ProductService.PSS_SPACE_SERVICE)){%>selected<%} %>>서비스공간(Service Space)</option>
								<option value="<%=ProductService.PSS_SPACE_BIZ_MODEL%>" <%if(spaceType.equals(ProductService.PSS_SPACE_BIZ_MODEL)){%>selected<%} %>>비즈모델공간(Biz Model Space)</option>
								<option value="<%=ProductService.PSS_SPACE_VALUE_SERVICE%>" <%if(spaceType.equals(ProductService.PSS_SPACE_VALUE_SERVICE)){%>selected<%} %>>가치 및 서비스 공간 (Value & Service Space)</option>
								<option value="<%=ProductService.PSS_SPACE_VALUE_BIZ_MODEL%>" <%if(spaceType.equals(ProductService.PSS_SPACE_VALUE_BIZ_MODEL)){%>selected<%} %>>가치 및 비즈모델 공간(Value & Biz Model Space)</option>
								<option value="<%=ProductService.PSS_SPACE_SERVICE_BIZ_MODEL%>" <%if(spaceType.equals(ProductService.PSS_SPACE_SERVICE_BIZ_MODEL)){%>selected<%} %>>서비스 및 비즈모델 공간(Service & Biz Model Space)</option>
								<option value="<%=ProductService.PSS_SPACE_VALUE_SERVICE_BIZ_MODEL%>" <%if(spaceType.equals(ProductService.PSS_SPACE_VALUE_SERVICE_BIZ_MODEL)){%>selected<%} %>>가치, 서비스 및 비즈모델 공간(Value, Service & Biz Model Space)</option>
							</select>
							<span class="js_progress_span"></span>
							<input style="margin-left:20px" class="js_toggle_use_sim_color" type="checkbox"/><span style="margin-left:6px">컬러로 유사도 구분하기(0.9이상:파랑, 0.8이상:녹색, 0.6이하:빨강)</span>
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
 
 