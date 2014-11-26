<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.SimilarityMatrix"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.util.Date"%>
<%@ page contentType="text/html; charset=utf-8"%>

<%

	SimilarityMatrix[][] data = null;
	try{
		data = (SimilarityMatrix[][])request.getAttribute("psSimilarities");
	}catch(Exception e){}

	SimilarityMatrix sm1 = new SimilarityMatrix();
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
	if(SmartUtil.isBlankObject(data)) return;
	
	

%>

<script type="text/javascript">

	var colNames = [];
	var colModels = [];

	colNames[0]  = "제품-서비스 이름";
	colModels[0] =  {name: "제품-서비스 이름", index:'name', align: 'center', sortable:true, width:'200'};
	
	<%
	for(int i=0; !SmartUtil.isBlankObject(data[0]) && i<data[0].length; i++){
		SimilarityMatrix sm = data[0][i];
	%>
		colNames[<%=i+1%>]  = "<%=sm.getTargetPsName()%>";
		colModels[<%=i+1%>] =  {name: "<%=sm.getTargetPsName()%>", index: "<%=sm.getTargetPsId()%>", align: 'right',  sortable:false, formatter:'integer',  formatoptions:{defaultValue:'0', thousandsSeparator: ",",  decimalPlaces: 2 }};
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

<table id="matrix_list"></table> 
 
 