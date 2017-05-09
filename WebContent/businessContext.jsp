<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@page import="net.smartworks.util.LocalDate"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.User"%>
<%
	String psId = (String) request.getAttribute("psId");
%>


<script type="text/javascript" src="/skkupss/js/Nwagon.js"></script>
<link rel="stylesheet" href="/skkupss/css/Nwagon.css"/>
<style>
	.txt_btn_start {
		background: url(/skkupss/images/btn_gr_left.jpg) repeat scroll 0 0 transparent;
	    float: left;
	    height: 22px;
	    width: 5px;
    }
    .txt_btn_center {
	    background: url(/skkupss/images/btn_gr_center.jpg) repeat scroll 0 0 transparent;
	    float: left;
	    color: #fff !important;
	    height: 20px;
	    padding: 2px 3px 0;
	    text-align: center;
	    font-weight: bold;
    }
    .txt_btn_end {
	    background: url(/skkupss/images/btn_gr_right.jpg) repeat scroll 0 0 transparent;
	    float: left;
	    height: 22px;
	    width: 5px;
    }
    .column_title { 
   		font-size: 16.5px;
    	text-align:center;
    }
    .list_parent {
    	font-size:16.5px;
    	margin-top:5px;
    }
    .list_children {
    	font-size:16px; 
    	margin-left:50px;
    	margin-top:3px;
    	margin-bottom:3px;
    }
    input[type=checkbox] {
	  /* Double-sized Checkboxes */
	  -ms-transform: scale(1.2); /* IE */
	  -moz-transform: scale(1.2); /* FF */
	  -webkit-transform: scale(1.2); /* Safari and Chrome */
	  -o-transform: scale(1.2); /* Opera */
	}
</style>
<!-- 컨텐츠 레이아웃-->

<%
	User cUser = SmartUtil.getCurrentUser();
%>
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />

<!--<div class="js_space_tab js_service_space"> -->
<div class="business_context_tableForm">
	<table>
		<tr>
			<th class="column_title_list" style="font-size: 16px;text-align:center;width:430px;"><fmt:message key="pss.title.business_context_chart"/></th>
			<th class="column_title">
				<img src="images/mark2.jpg" class="point_pic" style="min-width:400px;">
			</th>
			<th class="column_title"></th>
		</tr>
		<tr>
			<td>
				<div class="list_parent"> ● 비즈니스 환경의 변화
					<div class="list_children"> ● 현 제조 비즈니스의 포지셔닝</div>
					<div style="font-size:12px; margin-left:100px;"></div>
					<div class="list_children"> ● 주력 제품 PLC</div>
					<div class="list_children"> ● 제품 포트폴리오 구성 및 변화</div>
				</div>
				<div class="list_parent"> ● 내부 역량의 활용
					<div class="list_children"> ● 재무적 관점</div>
					<div class="list_children"> ● 조직적 관점</div>
					<div class="list_children"> ● 기술/지식적 관점</div>
					<div class="list_children"> ● 관계사 및 비즈니스 파트너</div>
				</div>
				<div class="list_parent"> ● 고객의 서비스에 대한 니즈
					<div class="list_children"> ● 제품 판매/구매 방식의 변화/보완 필요성</div>
					<div class="list_children"> ● 기존 제품 관련 서비스 대체 가능성</div>
					<div class="list_children"> ● 기존 제품 관련 신규 서비스 창출 가능성</div>
					<div class="list_children"> ● 기존 제품의 목표 고객 대상의 서비스 진입 가능성</div>
					<div class="list_children"> ● 기존 제품의 목표 고객 대상 신규 서비스 창출 가능성</div>
				</div>
			</td>
			<td>
				<div>
					<label><span style="visibility:hidden;">blank</span></label>
				</div>
				<div>
					<div class="position_business"></div>
				</div>
				<div>
					<div class="product_plc"></div>
				</div>
				<div>
					<div class="portpolio_innovation"></div>
				</div>
				<div>
					<span style="padding-left:31px; visibility:hidden;">blank</span>
				</div>
				<div>
					<div class="finance"></div>
				</div>
				<div>
					<div class="organization"></div>
				</div>
				<div>
					<div class="technique"></div>
				</div>
				<div>
					<div class="partner"></div>
				</div>
				<div>
					<span style="padding-left:31px; visibility:hidden;">blank</span>
				</div>
				<div>
					<div class="sale_purchase"></div>
				</div>
				<div>
					<div class="origin_service"></div>
				</div>
				<div>
					<div class="origin_service_improve"></div>
				</div>
				<div>
					<div class="new_service"></div>
				</div>
				<div>
					<div class="new_service_create"></div>
				</div>
			</td>
			<td>
				<div id="chart11"></div>
			</td>
		</tr>
		<tr>
			<td colspan="3">
				<span class="business_context_value" style="float:right;">
					<span class="txt_btn_start"></span>
					<span class="txt_btn_center" style="cursor:pointer;">확인</span> 
					<span class="txt_btn_end"></span>
				</span> 
			</td>
		</tr>
	</table>
</div>

<script>
	/* 차트 그리기 */ 
	var psId = "<%=psId%>";
	get_radarChart();
	
	/* 간격 길이 조정  */
	var tableFormWidth = $(".js_new_product_service_fields").css("width").replace("px", "");
	var column_title_width = (tableFormWidth - $(".column_title_list").css("width").replace("px",""))/2;
	$(".column_title").css("width", column_title_width);
	$("#chart11").css("width", column_title_width);
	$(".point_pic").css("width",column_title_width);
	$("body").css("overflow-x", "hidden");

	/* 항목 체크박스 생성 */
	makeCheckbox();
	
	/* 차트 정보 가져오기 */
	function get_radarChart() {
		$.ajax({
			type : "POST",
			url : "get_business_context_value.sw",
			headers : {
				"Content-Type" : " application/json",
				"X-HTTP-Method-Override" : "POST"
			},
			data : psId,
			dataType:"json",
			success : function(result) {
				/* 점수조정 (Nwagon chart 라이브러리가 차트 표현시, 0~100점 기준으로 설정되있으므로 알맞게 점수 조정) */
				var dataArray = new Array();					
				dataArray.push(result.finance*20);
				dataArray.push(result.organization*20);
				dataArray.push(result.technique*20);
				dataArray.push(result.partner*20);
				dataArray.push(result.sale_purchase*20);
				dataArray.push(result.origin_service*20);
				dataArray.push(result.origin_service_improve*20);
				dataArray.push(result.new_service*20);
				dataArray.push(result.new_service_create*20);
				dataArray.push(result.position_business*20);
				dataArray.push(result.product_plc*20);
				dataArray.push(result.portpolio_innovation*20);
				radarChart(dataArray);
				
				/* 체크박스 점수 채움 */
				setCheckbox(result);
			},
			error : function(result) {
				alert(result);
			}
		});		
	}

	/* 레이더차트 생성 */
	function radarChart(dataArray) {
		var options = {
			'legend':{
				names: ['재무', '조직', '기술/지식', '파트너 NW','판매/구매 변화', "기존서비스 추가", "기존서비스 개선", "신규서비스 진입", "신규서비스 창출", '포지셔닝', '주력제품 PLC', '포트폴리오 혁신'],
				hrefs: []
					},
			'dataset': {
				title: 'Web accessibility status',
				values: [[33,53,67,23,78,45,69,89,55,10,66,95]], 
				bgColor: '#f9f9f9',
				fgColor: '#6799FF'
			},
			'chartDiv': 'chart11',
			'chartType': 'radar',
			'chartSize': {width:600, height:300}
		};
		options.dataset.values = [dataArray];
		Nwagon.chart(options);
		$(".Nwagon_radar").attr("viewBox", "-200 -150 600 300");

		/* 점수라벨 위치 조정 */
		var yPosition = [-100, -80, -60, -40, -20, 00];
		for(var i=0; i<5; i++) {
			$(".xAxis").children().eq(i).attr("x", 0).attr("y", yPosition[i]).css("font-size", "11px").html(5-i);
		}
		
		/* 차트 위치 조정 */
		var chartHeight = $("#chart11").children("svg").css("height").replace("px", "");
		var tdHeight = $("#chart11").closest("td").css("height").replace("px", "");
		$("#chart11").children("svg").css("margin-top", (tdHeight - chartHeight)/2 - 15);
		var chartWidth = $("#chart11").css("width").replace("px", "");
		chartWidth = parseInt(chartWidth);
		chartPosition(chartWidth);
		
		/* 컨셉들 속성 변경 */
		$("text").attr("onclick", "");
		$("text").css("text-decoration" , "blink");
		
		/* 포인트 점 제거 */
		$("circle").remove();
	}
	
	/* 항목 점수 체크 컨트롤 */
	$(".position_business").click(function() {
		var checkedNum;
		for(var i=1; i<7; i++) {
			var isCheck = $(".position_business").children().eq(i).is(":checked");
			if(isCheck) {
				var oldCheck = $(".position_business").children().eq(i).attr("oldCheck");
				if(oldCheck == "false") {
					checkedNum = i;					
				}
			}
			$(".position_business").children().eq(i).attr("checked", false).attr("oldCheck", "false");
		}
		$(".position_business").children().eq(checkedNum).attr("checked", true).attr("oldCheck", "true");
	});
	
	$(".product_plc").click(function() {
		var checkedNum;
		for(var i=1; i<7; i++) {
			var isCheck = $(".product_plc").children().eq(i).is(":checked");
			if(isCheck) {
				var oldCheck = $(".product_plc").children().eq(i).attr("oldCheck");
				if(oldCheck == "false") {
					checkedNum = i;					
				}
			}
			$(".product_plc").children().eq(i).attr("checked", false).attr("oldCheck", "false");
		}
		$(".product_plc").children().eq(checkedNum).attr("checked", true).attr("oldCheck", "true");
	});
	
	$(".portpolio_innovation").click(function() {
		var checkedNum;
		for(var i=1; i<7; i++) {
			var isCheck = $(".portpolio_innovation").children().eq(i).is(":checked");
			if(isCheck) {
				var oldCheck = $(".portpolio_innovation").children().eq(i).attr("oldCheck");
				if(oldCheck == "false") {
					checkedNum = i;					
				}
			}
			$(".portpolio_innovation").children().eq(i).attr("checked", false).attr("oldCheck", "false");
		}
		$(".portpolio_innovation").children().eq(checkedNum).attr("checked", true).attr("oldCheck", "true");
	});
	
	$(".finance").click(function() {
		var checkedNum;
		for(var i=1; i<7; i++) {
			var isCheck = $(".finance").children().eq(i).is(":checked");
			if(isCheck) {
				var oldCheck = $(".finance").children().eq(i).attr("oldCheck");
				if(oldCheck == "false") {
					checkedNum = i;					
				}
			}
			$(".finance").children().eq(i).attr("checked", false).attr("oldCheck", "false");
		}
		$(".finance").children().eq(checkedNum).attr("checked", true).attr("oldCheck", "true");
	});
	
	$(".organization").click(function() {
		var checkedNum;
		for(var i=1; i<7; i++) {
			var isCheck = $(".organization").children().eq(i).is(":checked");
			if(isCheck) {
				var oldCheck = $(".organization").children().eq(i).attr("oldCheck");
				if(oldCheck == "false") {
					checkedNum = i;					
				}
			}
			$(".organization").children().eq(i).attr("checked", false).attr("oldCheck", "false");
		}
		$(".organization").children().eq(checkedNum).attr("checked", true).attr("oldCheck", "true");
	});
	
	$(".technique").click(function() {
		var checkedNum;
		for(var i=1; i<7; i++) {
			var isCheck = $(".technique").children().eq(i).is(":checked");
			if(isCheck) {
				var oldCheck = $(".technique").children().eq(i).attr("oldCheck");
				if(oldCheck == "false") {
					checkedNum = i;					
				}
			}
			$(".technique").children().eq(i).attr("checked", false).attr("oldCheck", "false");
		}
		$(".technique").children().eq(checkedNum).attr("checked", true).attr("oldCheck", "true");
	});
	
	$(".partner").click(function() {
		var checkedNum;
		for(var i=1; i<7; i++) {
			var isCheck = $(".partner").children().eq(i).is(":checked");
			if(isCheck) {
				var oldCheck = $(".partner").children().eq(i).attr("oldCheck");
				if(oldCheck == "false") {
					checkedNum = i;					
				}
			}
			$(".partner").children().eq(i).attr("checked", false).attr("oldCheck", "false");
		}
		$(".partner").children().eq(checkedNum).attr("checked", true).attr("oldCheck", "true");
	});
	
	$(".sale_purchase").click(function() {
		var checkedNum;
		for(var i=1; i<7; i++) {
			var isCheck = $(".sale_purchase").children().eq(i).is(":checked");
			if(isCheck) {
				var oldCheck = $(".sale_purchase").children().eq(i).attr("oldCheck");
				if(oldCheck == "false") {
					checkedNum = i;					
				}
			}
			$(".sale_purchase").children().eq(i).attr("checked", false).attr("oldCheck", "false");
		}
		$(".sale_purchase").children().eq(checkedNum).attr("checked", true).attr("oldCheck", "true");
	});
	
	$(".origin_service").click(function() {
		var checkedNum;
		for(var i=1; i<7; i++) {
			var isCheck = $(".origin_service").children().eq(i).is(":checked");
			if(isCheck) {
				var oldCheck = $(".origin_service").children().eq(i).attr("oldCheck");
				if(oldCheck == "false") {
					checkedNum = i;					
				}
			}
			$(".origin_service").children().eq(i).attr("checked", false).attr("oldCheck", "false");
		}
		$(".origin_service").children().eq(checkedNum).attr("checked", true).attr("oldCheck", "true");
	});
	
	$(".origin_service_improve").click(function() {
		var checkedNum;
		for(var i=1; i<7; i++) {
			var isCheck = $(".origin_service_improve").children().eq(i).is(":checked");
			if(isCheck) {
				var oldCheck = $(".origin_service_improve").children().eq(i).attr("oldCheck");
				if(oldCheck == "false") {
					checkedNum = i;					
				}
			}
			$(".origin_service_improve").children().eq(i).attr("checked", false).attr("oldCheck", "false");
		}
		$(".origin_service_improve").children().eq(checkedNum).attr("checked", true).attr("oldCheck", "true");
	});
	
	$(".new_service").click(function() {
		var checkedNum;
		for(var i=1; i<7; i++) {
			var isCheck = $(".new_service").children().eq(i).is(":checked");
			if(isCheck) {
				var oldCheck = $(".new_service").children().eq(i).attr("oldCheck");
				if(oldCheck == "false") {
					checkedNum = i;					
				}
			}
			$(".new_service").children().eq(i).attr("checked", false).attr("oldCheck", "false");
		}
		$(".new_service").children().eq(checkedNum).attr("checked", true).attr("oldCheck", "true");
	});

	$(".new_service_create").click(function() {
		var checkedNum;
		for(var i=1; i<7; i++) {
			var isCheck = $(".new_service_create").children().eq(i).is(":checked");
			if(isCheck) {
				var oldCheck = $(".new_service_create").children().eq(i).attr("oldCheck");
				if(oldCheck == "false") {
					checkedNum = i;					
				}
			}
			$(".new_service_create").children().eq(i).attr("checked", false).attr("oldCheck", "false");
		}
		$(".new_service_create").children().eq(checkedNum).attr("checked", true).attr("oldCheck", "true");
	});
	
	
	/* 점수체크 */
	$(".business_context_value").click(function() {
		var position_business, product_plc, portpolio_innovation, finance, organization, technique, 
		partner, sale_purchase, origin_service, origin_service_improve, new_service, new_service_create; 
		for(var i=1; i<7; i++) {
			var checked;
			checked = $(".position_business").children().eq(i).is(":checked");
			if(checked) {
				position_business = $(".position_business").children().eq(i).attr("value");
			}
			checked = $(".product_plc").children().eq(i).is(":checked");
			if(checked) {
				product_plc = $(".product_plc").children().eq(i).attr("value");
			}
			checked = $(".portpolio_innovation").children().eq(i).is(":checked");
			if(checked) {
				portpolio_innovation = $(".portpolio_innovation").children().eq(i).attr("value");
			}
			checked = $(".finance").children().eq(i).is(":checked");
			if(checked) {
				finance = $(".finance").children().eq(i).attr("value");
			}
			checked = $(".organization").children().eq(i).is(":checked");
			if(checked) {
				organization = $(".organization").children().eq(i).attr("value");
			}
			checked = $(".technique").children().eq(i).is(":checked");
			if(checked) {
				technique = $(".technique").children().eq(i).attr("value");
			}
			checked = $(".partner").children().eq(i).is(":checked");
			if(checked) {
				partner = $(".partner").children().eq(i).attr("value");
			}
			checked = $(".sale_purchase").children().eq(i).is(":checked");
			if(checked) {
				sale_purchase = $(".sale_purchase").children().eq(i).attr("value");
			}
			checked = $(".origin_service").children().eq(i).is(":checked");
			if(checked) {
				origin_service = $(".origin_service").children().eq(i).attr("value");
			}
			checked = $(".origin_service_improve").children().eq(i).is(":checked");
			if(checked) {
				origin_service_improve = $(".origin_service_improve").children().eq(i).attr("value");
			}
			checked = $(".new_service").children().eq(i).is(":checked");
			if(checked) {
				new_service = $(".new_service").children().eq(i).attr("value");
			}
			checked = $(".new_service_create").children().eq(i).is(":checked");
			if(checked) {
				new_service_create = $(".new_service_create").children().eq(i).attr("value");
			}
		}
		
		/* 차트 점수 입력 */
		try{
			if(!(position_business && product_plc && portpolio_innovation && finance && organization && technique && partner && sale_purchase && origin_service && origin_service_improve && new_service && new_service_create)) {
				throw "점수를 체크해주세요.";
			}
			var scoreparam = {psId : psId, position_business : position_business, product_plc : product_plc, portpolio_innovation : portpolio_innovation,
					finance : finance, organization : organization, technique : technique, partner : partner, sale_purchase : sale_purchase,
					origin_service : origin_service, origin_service_improve : origin_service_improve, new_service : new_service, new_service_create : new_service_create};
			$.ajax({
				type : "POST",
				url : "set_business_context_value.sw",
				headers : {
					"Content-Type" : " application/json",
					"X-HTTP-Method-Override" : "POST"
				},
				data : JSON.stringify(scoreparam),
				dataType:"text",
				success : function(result) {
					/* 차트 초기화 */
					$("#chart11").html("");
					
					/* 점수조정 (Nwagon chart 라이브러리가 차트 표현시, 0~100점 기준으로 설정되있으므로 알맞게 점수 조정) */
					var dataArray = new Array();					
					dataArray.push(finance*20);
					dataArray.push(organization*20);
					dataArray.push(technique*20);
					dataArray.push(partner*20);
					dataArray.push(sale_purchase*20);
					dataArray.push(origin_service*20);
					dataArray.push(origin_service_improve*20);
					dataArray.push(new_service*20);
					dataArray.push(new_service_create*20);
					dataArray.push(position_business*20);
					dataArray.push(product_plc*20);
					dataArray.push(portpolio_innovation*20);
					radarChart(dataArray);
					alert("점수 체크 완료");
				},
				error : function(result) {
					alert(result);
				}
			});
		}catch(error) {
			alert(error);
		}

	});
	
	
	/* 체크박스 생성 */
	function makeCheckbox() {
		var first_checkbox, second_checkbox, other_checkbox;
/*
		if(column_title_width < 412.5) {						// 가로길이 400 적용
			first_checkbox = column_title_width / 4.2;
			second_checkbox = column_title_width / 9.218;
			other_checkbox = column_title_width / 9.756;
		} else if(column_title_width < 437.5) {					// 425
			first_checkbox = column_title_width / 4.2;
			second_checkbox = column_title_width / 9.042;
			other_checkbox = column_title_width / 9.659;
		} else if(column_title_width < 462.5) {					// 450
			first_checkbox = column_title_width / 4.2;
			second_checkbox = column_title_width / 9;
			other_checkbox = column_title_width / 9.375;
		} else if(column_title_width < 487.5) {					// 475
			first_checkbox = column_title_width / 4.2;
			second_checkbox = column_title_width / 8.636;
			other_checkbox = column_title_width / 9.5;
		} else if(column_title_width < 512.5) {					// 500
			first_checkbox = column_title_width / 4.2;
			second_checkbox = column_title_width / 8.62;
			other_checkbox = column_title_width / 9.09;
		} else if(column_title_width < 537.5) {					// 525
			first_checkbox = column_title_width / 4.13;
			second_checkbox = column_title_width / 8.73;
			other_checkbox = column_title_width / 9.051;
		} else if(column_title_width < 562.5) {					// 550
			first_checkbox = column_title_width / 4.13;
			second_checkbox = column_title_width / 8.461;
			other_checkbox = column_title_width / 9.016;
		} else if(column_title_width < 587.5) {					// 575
			first_checkbox = column_title_width / 4.13;
			second_checkbox = column_title_width / 8.455;
			other_checkbox = column_title_width / 8.98;
		} else if(column_title_width < 612.5) {					// 600
			first_checkbox = column_title_width / 4.13;
			second_checkbox = column_title_width / 8.45;
			other_checkbox = column_title_width / 8.955;
		} else if(column_title_width < 637.5) {					// 625
			first_checkbox = column_title_width / 4.13;
			second_checkbox = column_title_width / 8.33;
			other_checkbox = column_title_width / 8.802;
		} else if(column_title_width < 662.5) {					// 650
			first_checkbox = column_title_width / 4.13;
			second_checkbox = column_title_width / 8.227;
			other_checkbox = column_title_width / 8.783;
		} else if(column_title_width < 687.5) {					// 675					
			first_checkbox = column_title_width / 4.13;
			second_checkbox = column_title_width / 8.231;
			other_checkbox = column_title_width / 8.766;
		} else if(column_title_width < 712.5) {					// 700
			first_checkbox = column_title_width / 4.13;
			second_checkbox = column_title_width / 8.235;
			other_checkbox = column_title_width / 8.75;
		} else if(column_title_width < 737.5) {					// 725					
			first_checkbox = column_title_width / 4.13;
			second_checkbox = column_title_width / 8.238;
			other_checkbox = column_title_width / 8.630;
		} else if(column_title_width < 762.5) {					// 750					
			first_checkbox = column_title_width / 4.13;
			second_checkbox = column_title_width / 8.152;
			other_checkbox = column_title_width / 8.522;
		} else if(column_title_width < 787.5) {					// 775					
			first_checkbox = column_title_width / 4.13;
			second_checkbox = column_title_width / 8.072;
			other_checkbox = column_title_width / 8.516;
		} else if(column_title_width < 812.5) {					// 800					
			first_checkbox = column_title_width / 4.13;
			second_checkbox = column_title_width / 8;
			other_checkbox = column_title_width / 8.51;
		} else if(column_title_width < 837.5) {					// 825					
			first_checkbox = column_title_width / 4.13;
			second_checkbox = column_title_width / 7.932;
			other_checkbox = column_title_width / 8.418;
		} else if(column_title_width < 862.5) {					// 850					
			first_checkbox = column_title_width / 4.13;
			second_checkbox = column_title_width / 7.87;
			other_checkbox = column_title_width / 8.333;
		} else if(column_title_width < 887.5) {					// 875					
			first_checkbox = column_title_width / 4.088;
			second_checkbox = column_title_width / 7.954;
			other_checkbox = column_title_width / 8.413;
		} else if(column_title_width < 912.5) {					// 900		
			first_checkbox = column_title_width / 4.072;
			second_checkbox = column_title_width / 8.035;
			other_checkbox = column_title_width / 8.411;
		} else if(column_title_width < 937.5) {					// 925					
			first_checkbox = column_title_width / 4.057;
			second_checkbox = column_title_width / 7.974;
			other_checkbox = column_title_width / 8.486;
		} else if(column_title_width < 962.5) {					// 950
			first_checkbox = column_title_width / 4.077;
			second_checkbox = column_title_width / 7.916;
			other_checkbox = column_title_width / 8.333;
		} else if(column_title_width < 987.5) {					// 975					
			first_checkbox = column_title_width / 4.062;
			second_checkbox = column_title_width / 7.926;
			other_checkbox = column_title_width / 8.405;
		} else {
			first_checkbox = column_title_width / 4.062;		
			second_checkbox = column_title_width / 7.926;
			other_checkbox = column_title_width / 8.405;
		}
*/

		if(column_title_width < 400) {
			column_title_width = 400;
		}
	
		if(column_title_width < 412.5) {						// 가로길이 400 적용
			first_checkbox = column_title_width / 13.33;
			second_checkbox = column_title_width / 7.142;
			other_checkbox = column_title_width / 7.547;
		} else if(column_title_width < 437.5) {					// 425
			first_checkbox = column_title_width / 12.87;
			second_checkbox = column_title_width / 7.083;
			other_checkbox = column_title_width / 7.589;
		} else if(column_title_width < 462.5) {					// 450
			first_checkbox = column_title_width / 12.5;
			second_checkbox = column_title_width / 7.031;
			other_checkbox = column_title_width / 7.5;
		} else if(column_title_width < 487.5) {					// 475
			first_checkbox = column_title_width / 12.5;
			second_checkbox = column_title_width / 7.089;
			other_checkbox = column_title_width / 7.307;
		} else if(column_title_width < 512.5) {					// 500
			first_checkbox = column_title_width / 12.5;
			second_checkbox = column_title_width / 7.042;
			other_checkbox = column_title_width / 7.246;
		} else if(column_title_width < 537.5) {					// 525
			first_checkbox = column_title_width / 12.5;
			second_checkbox = column_title_width / 6.907;
			other_checkbox = column_title_width / 7.191;
		} else if(column_title_width < 562.5) {					// 550
			first_checkbox = column_title_width / 12.5;
			second_checkbox = column_title_width / 6.875;
			other_checkbox = column_title_width / 7.051;
		} else if(column_title_width < 587.5) {					// 575
			first_checkbox = column_title_width / 12.5;
			second_checkbox = column_title_width / 6.845;
			other_checkbox = column_title_width / 7.012;
		} else if(column_title_width < 612.5) {					// 600
			first_checkbox = column_title_width / 12.5;
			second_checkbox = column_title_width / 6.666;
			other_checkbox = column_title_width / 6.976;
		} else if(column_title_width < 637.5) {					// 625
			first_checkbox = column_title_width / 12.5;
			second_checkbox = column_title_width / 6.578;
			other_checkbox = column_title_width / 7.022;
		} else if(column_title_width < 662.5) {					// 650
			first_checkbox = column_title_width / 12.5;
			second_checkbox = column_title_width / 6.565;
			other_checkbox = column_title_width / 7.065;
		} else if(column_title_width < 687.5) {					// 675					
			first_checkbox = column_title_width / 12.05;
			second_checkbox = column_title_width / 6.617;
			other_checkbox = column_title_width / 7.031;
		} else if(column_title_width < 712.5) {					// 700
			first_checkbox = column_title_width / 12.068;
			second_checkbox = column_title_width / 6.603;
			other_checkbox = column_title_width / 7;
		} else if(column_title_width < 737.5) {					// 725					
			first_checkbox = column_title_width / 12.083;
			second_checkbox = column_title_width / 6.531;
			other_checkbox = column_title_width / 6.904;
		} else if(column_title_width < 762.5) {					// 750					
			first_checkbox = column_title_width / 12.096;
			second_checkbox = column_title_width / 6.465;
			other_checkbox = column_title_width / 6.818;
		} else if(column_title_width < 787.5) {					// 775					
			first_checkbox = column_title_width / 11.923;
			second_checkbox = column_title_width / 6.512;
			other_checkbox = column_title_width / 6.798;
		} else if(column_title_width < 812.5) {					// 800					
			first_checkbox = column_title_width / 11.764;
			second_checkbox = column_title_width / 6.504;
			other_checkbox = column_title_width / 6.837;
		} else if(column_title_width < 837.5) {					// 825					
			first_checkbox = column_title_width / 11.785;
			second_checkbox = column_title_width / 6.496;
			other_checkbox = column_title_width / 6.818;
		} else if(column_title_width < 862.5) {					// 850					
			first_checkbox = column_title_width / 11.805;
			second_checkbox = column_title_width / 6.488;
			other_checkbox = column_title_width / 6.746;
		} else if(column_title_width < 887.5) {					// 875					
			first_checkbox = column_title_width / 11.824;
			second_checkbox = column_title_width / 6.481;
			other_checkbox = column_title_width / 6.73;
		} else {														
			first_checkbox = column_title_width / 11.842;
			second_checkbox = column_title_width / 6.474;
			other_checkbox = column_title_width / 6.666;
		} 
		
		var html = "<input type='checkbox' value='-1' style='margin-left:33px; display:none;'/>";
		html += "<input type='checkbox' value='0' oldCheck='false' style='margin-left:" + first_checkbox + "px; margin-bottom:9px!important;'/>";
		html += "<input type='checkbox' value='1' oldCheck='false' style='margin-left:" + second_checkbox + "px; margin-bottom:9px!important;'/>";
		html += "<input type='checkbox' value='2' oldCheck='false' style='margin-left:" + other_checkbox + "px; margin-bottom:9px!important;'/>";
		html += "<input type='checkbox' value='3' oldCheck='false' style='margin-left:" + (other_checkbox+1) + "px; margin-bottom:9px!important;'/>";
		html += "<input type='checkbox' value='4' oldCheck='false'style='margin-left:" + (other_checkbox+1) + "px; margin-bottom:9px!important;'/>";
		html += "<input type='checkbox' value='5' oldCheck='false' style='margin-left:" + (other_checkbox+1) + "px; margin-bottom:9px!important;'/>";
		$(".position_business").html(html);
		$(".product_plc").html(html);
		$(".portpolio_innovation").html(html);
		$(".finance").html(html);
		$(".organization").html(html);
		$(".technique").html(html);
		$(".partner").html(html);
		$(".sale_purchase").html(html);
		$(".origin_service").html(html);
		$(".origin_service_improve").html(html);
		$(".new_service").html(html);
		$(".new_service_create").html(html);		
	}
	
	
	/* 체크박스 점수 채워준다 */
	function setCheckbox(result) {
		for(var i=1; i<7; i++) {
			var score = result.position_business;
			if(score == $(".position_business").children().eq(i).attr("value")) {
				$(".position_business").children().eq(i).attr("checked", true).attr("oldCheck", "true");
			}
			
			score = result.product_plc;
			if(score == $(".product_plc").children().eq(i).attr("value")) {
				$(".product_plc").children().eq(i).attr("checked", true).attr("oldCheck", "true");
			}
			
			score = result.portpolio_innovation;
			if(score == $(".portpolio_innovation").children().eq(i).attr("value")) {
				$(".portpolio_innovation").children().eq(i).attr("checked", true).attr("oldCheck", "true");
			}
			
			score = result.finance;
			if(score == $(".finance").children().eq(i).attr("value")) {
				$(".finance").children().eq(i).attr("checked", true).attr("oldCheck", "true");
			}
			
			score = result.organization;
			if(score == $(".organization").children().eq(i).attr("value")) {
				$(".organization").children().eq(i).attr("checked", true).attr("oldCheck", "true");
			}
			
			score = result.technique;
			if(score == $(".technique").children().eq(i).attr("value")) {
				$(".technique").children().eq(i).attr("checked", true).attr("oldCheck", "true");
			}
			
			score = result.partner;
			if(score == $(".partner").children().eq(i).attr("value")) {
				$(".partner").children().eq(i).attr("checked", true).attr("oldCheck", "true");
			}
			
			score = result.sale_purchase;
			if(score == $(".sale_purchase").children().eq(i).attr("value")) {
				$(".sale_purchase").children().eq(i).attr("checked", true).attr("oldCheck", "true");
			}
			
			score = result.origin_service;
			if(score == $(".origin_service").children().eq(i).attr("value")) {
				$(".origin_service").children().eq(i).attr("checked", true).attr("oldCheck", "true");
			}
			
			score = result.origin_service_improve;
			if(score == $(".origin_service_improve").children().eq(i).attr("value")) {
				$(".origin_service_improve").children().eq(i).attr("checked", true).attr("oldCheck", "true");
			}
			
			score = result.new_service;
			if(score == $(".new_service").children().eq(i).attr("value")) {
				$(".new_service").children().eq(i).attr("checked", true).attr("oldCheck", "true");
			}
			
			score = result.new_service_create;
			if(score == $(".new_service_create").children().eq(i).attr("value")) {
				$(".new_service_create").children().eq(i).attr("checked", true).attr("oldCheck", "true");
			}
		}
	}
	
	
	/* 차트 위치 조정  */
	function chartPosition(chartWidth) {
		if(chartWidth < 412.5) {
			$("#chart11").children("svg").css("margin-left", 5);
		} else if(chartWidth < 437.5) {
			$("#chart11").children("svg").css("margin-left", 15);
		} else if(chartWidth < 462.5) {
			$("#chart11").children("svg").css("margin-left", 25);
		} else if(chartWidth < 487.5) {
			$("#chart11").children("svg").css("margin-left", 40);
		} else if(chartWidth < 512.5) {
			$("#chart11").children("svg").css("margin-left", 50);
		} else if(chartWidth < 537.5) {
			$("#chart11").children("svg").css("margin-left", 65);
		} else if(chartWidth < 562.5) {
			$("#chart11").children("svg").css("margin-left", 75);
		} else if(chartWidth < 577.5) {
			$("#chart11").children("svg").css("margin-left", 90);
		} else if(chartWidth < 612.5) {
			$("#chart11").children("svg").css("margin-left", 100);
		} else if(chartWidth < 637.5) {
			$("#chart11").children("svg").css("margin-left", 115);
		} else if(chartWidth < 662.5) {
			$("#chart11").children("svg").css("margin-left", 125);
		} else if(chartWidth < 687.5) {
			$("#chart11").children("svg").css("margin-left", 140);
		} else if(chartWidth < 712.5) {
			$("#chart11").children("svg").css("margin-left", 150);
		} else if(chartWidth < 737.5) {
			$("#chart11").children("svg").css("margin-left", 165);
		} else if(chartWidth < 762.5) {
			$("#chart11").children("svg").css("margin-left", 175);
		} else if(chartWidth < 787.5) {
			$("#chart11").children("svg").css("margin-left", 190);
		} else if(chartWidth < 812.5) {
			$("#chart11").children("svg").css("margin-left", 200);
		} else if(chartWidth < 837.5) {
			$("#chart11").children("svg").css("margin-left", 215);
		} else if(chartWidth < 862.5) {
			$("#chart11").children("svg").css("margin-left", 225);
		} else if(chartWidth < 887.5) {
			$("#chart11").children("svg").css("margin-left", 240);
		} else if(chartWidth < 912.5) {
			$("#chart11").children("svg").css("margin-left", 250);
		} else if(chartWidth < 937.5) {
			$("#chart11").children("svg").css("margin-left", 265);
		} else if(chartWidth < 962.5) {
			$("#chart11").children("svg").css("margin-left", 275);
		} else if(chartWidth < 987.5) {
			$("#chart11").children("svg").css("margin-left", 290);
		} else {
			$("#chart11").children("svg").css("margin-left", 300);
		}
	}
</script>

<!-- 컨텐츠 레이아웃//-->