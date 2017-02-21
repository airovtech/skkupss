<%@page import="net.smartworks.util.ServletUtil"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.User"%>
<%@ page contentType="text/html; charset=utf-8"%>

<link rel="stylesheet" href="http://www.w3schools.com/lib/w3.css">

<%	
	String psName = (String) request.getAttribute("psName");
	String psId = (String) request.getAttribute("psId");
	String result = ServletUtil.request("http://sbp.pssd.or.kr/sbp/sbpListForHvm.jsp?hvm=true&memberId=sbpAdmin"); // 모든 SBP Project List를 가져온다. 
%>
<style>
	#sbpProjectList {
		position: fixed;
		margin-top:20px;
		z-index:1043;
		border: 8px solid white;
		border-radius:5px;
		background-color:white;
	}
	.search {
		font-size:15px;
		width:88%!important;
		height:25px;		
		margin-right: 10px;
	}
	.cursor {
		cursor:pointer;
	}
</style>
<script>
	var psName = "<%=psName%>";					// PSS 프로젝트 이름 
	var psId = "<%=psId%>"; 					// PSS 프로젝트 ID
	var result = <%=result%>;					// 모든 SBP Project 리스트
	var sbpProjectList = result.list;			// JSON에서 list만 추출 
	var html = "<table class='w3-table-all'>";
		html += 	"<thead>"
			+			"<tr class='w3-light-gray'>"
			+				"<th style='font-size:15px; text-align:center;'>SBP가 소속된 프로젝트를 선택하세요</th>"
			+				"<th>"
			+					"<a class='modalCloseImg simplemodal-close cursor' title='Close' style='float:right; margin-right:5px;'>"
			+						"<img style='width:15px; height:15px;' src='/skkupss/smarteditor/img/btn_close.png'/>"
			+					"</a>"
			+				"</th>"
			+			"</tr>"
			+			"<tr>"
			+				"<th colspan='2'>"
			+					"<input id='search' class='search' type='text' placeholder='검색해주세요.' onkeydown='javascript:if( event.keyCode == 13 ) search();' />"
			+					"<button class='w3-btn w3-white w3-border w3-round-large' onclick='search();'>검색</button>"
			+				"</th>"
			+			"</tr>"
			+		"</thead>";
	$(sbpProjectList).each(function() {
			html +=	"<tr class='w3-hover-light-blue sbpPrjSelect simplemodal-close cursor'>" 
				+		"<td colspan='2' style='font-size:15px; height:30px;' sbpPrjName='" + this.project_name + "' psName='" + psName +"' psId='" + psId +"' puId='" + this.project_puid +"'>"
				+		"Project_Name : " + this.project_name + "</td>"
				+	"</tr>";
	});
	html += "</table>";
	
	document.getElementById("sbpProjectList").innerHTML = html;
		
	var width = $(window).width() / 2;
	var height = $(window).height()-100;
	$("#sbpProjectList").css("width", width);
	$("#sbpProjectList").css("height", height);
	
	

	
	/* SBP프로젝트를 검색해준다 */
	function search() {
		var search_value = $("#search").val();
		var result_Pn_list =  new Array();
		var result_Puid_list =  new Array();
		
		$(sbpProjectList).each(function() {
			if(this.project_name.includes(search_value)) {
				result_Pn_list.push(this.project_name);
				result_Puid_list.push(this.project_puid);
			}
		});
		
		var html = "<table class='w3-table-all'>";
		html += 	"<thead>"
			+			"<tr class='w3-light-gray'>"
			+				"<th style='font-size:15px; text-align:center;'>SBP가 소속된 프로젝트를 선택하세요</th>"
			+				"<th>"
			+					"<a class='modalCloseImg simplemodal-close close_search cursor' title='Close' style='float:right; margin-right:5px;'>"
			+						"<img style='width:15px; height:15px;' src='/skkupss/smarteditor/img/btn_close.png'/>"
			+					"</a>"
			+				"</th>"
			+			"</tr>"
			+			"<tr>"
			+				"<th colspan='2'>"
			+					"<input id='search' class='search' type='text' placeholder='검색해주세요.' onkeydown='javascript:if( event.keyCode == 13 ) search();' />"
			+					"<button class='w3-btn w3-white w3-border w3-round-large' onclick='search();'>검색</button>"
			+				"</th>"
			+			"</tr>"
			+		"</thead>";
			for(var i=0; i<result_Pn_list.length; i++) {
			html +=	"<tr class='w3-hover-light-blue sbpPrjSelect simplemodal-close cursor'>" 
				+		"<td colspan='2' style='font-size:15px; height:30px;' sbpPrjName='" + result_Pn_list[i] + "' psName='" + psName +"' psId='" + psId +"' puId='" + result_Puid_list[i] +"'>"
				+		"Project_Name : " + result_Pn_list[i] + "</td>"
				+	"</tr>";
			}

			+ 	"</table>";
		document.getElementById("sbpProjectList").innerHTML = html;
		
		$.modal.impl.bindEvents();	// 검색 후에 modal 창을 닫는 'simplemodal-close' 클래스 이벤트가 적용되지 않아, 실제 modal창을 닫는 소스가 적혀있는 event function을 libray로부터 호출해서 적용시켜준다. (jquery 1.4.5.js)
	}
	
</script>
<div id="sbpline">
	<div id="sbpProjectList" style='overflow:scroll; overflow-x:hidden'></div>
</div>

