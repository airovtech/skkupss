<%@ page contentType="text/html; charset=utf-8"%>
<%@ page import="net.smartworks.skkupss.model.SBPService"%>
<%@ page import="net.smartworks.common.DataConvert" %>
<% 
	SBPService sbpInfo = (SBPService) request.getAttribute("sbpInfo");

	/* sbp서버로 보낼 모든 서비스컨셉에 대한 정보를 정리하여 추출 */
	DataConvert dataConvert = new DataConvert();
	String data = dataConvert.convertForPSSD(sbpInfo);
	int sbpId = dataConvert.getSbpId(sbpInfo);
	String sbpName = dataConvert.getSbpName(sbpInfo);
	String sbpPrjName = sbpInfo.getSbpPrjName();
	String psId = sbpInfo.getPssPrjid();
	
	/* modal 상단에 보여줄 서비스컨셉에 대한 정보를 정리하여 추출 */
	String data_PSS = dataConvert.convertForPSS(sbpInfo);

%>
<style>
	#sbpline {
		border-right:50px solid white;
		border-left:50px solid white;
		border-bottom:50px solid white;
		border-radius:5px;
		background-color:white;
	}
	.sbpline {
		margin-top:10px;
		border-top: 80px solid white;
		border-radius:5px;
		background-color:white;
	}
	.close_btn {
		float:right;
		margin-top:25px;
		margin-right:-14px;
	}
	.close_btn_pic {
		width:15px; 
		height:15px;
		cursor:pointer;
	}
	.serviceconcept_title {
		float:left;
		font-size:25px;
		margin-left:27px;
		margin-top:25px;
		height:30px;
	}

	.activity_content_wrap {
		position:absolute;
		float:left;
		font-size:15px;
		margin-left:30px;
		margin-top:82px;
	}
	.activity_content {
		height:20px;
		position:absolute;
		float:left;
		font-size:13px;
		margin-top:64px;
		margin-left:220px;
		line-height:200%;
		padding:16px;
		margin-bottom:16px!important;
		border:1px solid #ccc!important;
		border-color:#2196F3!important;
	}
	.cursor{
		cursor:pointer;
	}
	.modal {
	    display: none; /* Hidden by default */
	    position: fixed; /* Stay in place */
	    z-index: 1045; /* Sit on top */
	    left: 0;
	    top: 0;
	    width: 100%; /* Full width */
	    height: 100%; /* Full height */
	    overflow: auto; /* Enable scroll if needed */
	    background-color: rgb(0,0,0); /* Fallback color */
	    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	}
	.colorPallet{
		width:20px;
		height:20px;
		float:left;
		margin-right:3px;
		margin-bottom:3px;
	}
	.showAllActivity {
		bottom:0px;
		margin-bottom:27px;
		width:115px;
		height:30px;
		text-align:center;
	}
</style>
<script>
	editMode = "false";

	/* view에 관한 속성들 변경 */
//	var width = $(window).width()-200;
//	var height = $(window).height()-250;
	$(".sbpline").css("width", spaceWidth-100);
	$(".sbpline").css("height", 700);
	$(".showAllActivity").css("margin-left", (spaceWidth-100)/2);
	
	/* 서버에서 가져온 data를 클라이언트에서 사용할 수 있게끔 전환 */
	var data = "<%=data%>";
	var sbpId = "<%=sbpId%>";
	var sbpName = "<%=sbpName%>";
	var sbpPrjName = "<%=sbpPrjName%>";
	var data_PSS = "<%=data_PSS%>";
	var psId = "<%=psId%>";
	
	/* iframe을 데이터 전송과 함께 열어준다. */
	var url = "http://sbp.pssd.or.kr/sbp/panel8ForHvm.jsp?seq=" + sbpId + "&hvm=true&memberId=sbpAdmin&sPUID=&docTitle=" + encodeURI(sbpName, "UTF-8"); 
	url += "&sProjectName=" + encodeURI(sbpPrjName, "UTF-8") + "&mapShow=true" + "editMode=" + editMode + "&seqArrayWithColor=" + encodeURI(data, "UTF-8");
	$(".sbpline").attr("src", url);
	
	/* 모든 서비스컨셉명과 색깔을 보여준다 */
	var data_PSS_Array = data_PSS.split(",");
	var html = "";
	for(var i=0; i<data_PSS_Array.length; i++) {
		var data_PSS_Array_Detail = data_PSS_Array[i].split("/");
		html += "<a class='cursor' onclick='showOneServiceConcept(this);' serviceconceptname='" + data_PSS_Array_Detail[1] + "' itemname='" + data_PSS_Array_Detail[0] + "'><span style='float:left;'>" + data_PSS_Array_Detail[1] + "&nbsp;</span><span class='colorPallet' style='background:#" + data_PSS_Array_Detail[2] + "'></span></a>";
		if(i != data_PSS_Array.length-1) {
			html += "<span style='float:left;'>&nbsp;/&nbsp; </span>";
		}
	}
	$(".activity_content").html(html);
	
	/* activity_content 길이 조정 */
//	var modalWidth = $(".simplemodal-container").css("width").replace("px", "") - 300;
	$(".activity_content").css("width", spaceWidth-400);
	
	/* 서비스컨셉 1개에 대한 정보 보기로 넘어간다 */
	function showOneServiceConcept(self) {
		var title = $(self).attr("serviceconceptname");
		var itemName = $(self).attr("itemname");
		$.ajax({
			type: 'POST',
			url: "showConnectedActivity.sw",
			headers:{
				"Content-Type" : "application/json",
				"X-HTTP-Method-Override":"POST",
			},
			data : JSON.stringify({psId : psId , title : title, itemName : itemName, sbpId : sbpId}),
			dataType:'json',
			success : function(result) {		
				/* 데이터바구니(header.jsp)에 DB에서 꺼내온 데이터를 담는다.  */
				$(result).each(function() {
					activityId_Array = this.activityId;
					activityName_Array = this.activityName;
					seq_Array = this.seq;
					sbpId_dt = this.sbpId; 
					sbp_dt = this.sbpName;
					selectedColor = this.color;
				});

				/* DB에서 꺼내온 데이터를 바로 보여준다. */
				var activityName_Array_Impl = "";
				for(var i=0; i<activityName_Array.length; i++) {
					activityName_Array_Impl += activityName_Array[i] + ", ";
				}
				activityName_Array_Impl = activityName_Array_Impl.substring(0, activityName_Array_Impl.length-2);
				
				$(".activity_content").html(activityName_Array_Impl);
				$(".serviceconcept_title").html(title);
				$(".serviceconcept_title").css("font-size", "20px").css("margin-top", "45px");
				$(".activity_content_wrap").html("Selected Activity : ");
				
				/* sbp서버로, 선택했었던 activity seq 값들을 파라미터로 전송한다.(선택했던 activity들의 색깔을 채워주기 위해) */
				url = "http://sbp.pssd.or.kr/sbp/panel8ForHvm.jsp?seq=" + sbpId + "&hvm=true&memberId=sbpAdmin&sPUID=&docTitle=" + encodeURI(sbpName, "UTF-8") + "&sProjectName=" + encodeURI(sbpPrjName, "UTF-8") + "&mapShow=true";
				url += "&seqArray=" + seq_Array + "&editMode=" + editMode + "&selectedColor=" + selectedColor.substring(1, selectedColor.length);
				$(".sbpline").attr("src", url);
				
				$(".showAllActivity").css("display", "block");
			},
			error : function(result){
				alert("error : " + result);
			}
		});
	}
	
	/* 모든 서비스컨셉에 연결된 activity를 한번에 보여준다. */
	function showAllActivity() {
		/* iframe을 데이터 전송과 함께 열어준다. */
		url = "http://sbp.pssd.or.kr/sbp/panel8ForHvm.jsp?seq=" + sbpId + "&hvm=true&memberId=sbpAdmin&sPUID=&docTitle=" + encodeURI(sbpName, "UTF-8"); 
		url += "&sProjectName=" + encodeURI(sbpPrjName, "UTF-8") + "&mapShow=true" + "editMode=" + editMode + "&seqArrayWithColor=" + encodeURI(data, "UTF-8");
		console.log("url : " , url);
		$(".sbpline").attr("src", url);
		
		/* 서비스컨셉명과 색깔을 보여준다 */
		var data_PSS_Array = data_PSS.split(",");
		var html = "";
		for(var i=0; i<data_PSS_Array.length; i++) {
			var data_PSS_Array_Detail = data_PSS_Array[i].split("/");
			html += "<a class='cursor' onclick='showOneServiceConcept(this);' serviceconceptname='" + data_PSS_Array_Detail[1] + "' itemname='" + data_PSS_Array_Detail[0] + "'><span style='float:left;'>" + data_PSS_Array_Detail[1] + "&nbsp;</span><span class='colorPallet' style='background:#" + data_PSS_Array_Detail[2] + "'></span></a>";
			if(i != data_PSS_Array.length-1) {
				html += "<span style='float:left;'>&nbsp;/&nbsp; </span>";
			}
		}
		$(".activity_content").html(html);
		$(".showAllActivity").css("display", "none");
		$(".serviceconcept_title").html("SBP");
		$(".serviceconcept_title").css("font-size", "30px");
	}
	
	/* PSSD 화면을 숨겨준다. */
	function hidePSSD() {
		$(".showPSSDForm").css("display", "none");
	}
</script>
<div id="sbpline">
	<span class='serviceconcept_title'>SBP</span>
	<span class="activity_content_wrap">
		service concept / color
	</span>
	<span class="activity_content w3-container w3-section w3-border w3-border-blue" style='overflow:scroll; overflow-x:hidden'>
	</span>
	<span>
		<a class='close_btn' title='Close'>
			<img class='modalCloseImg simplemodal-close close_btn_pic resetSbpData2' src="/skkupss/smarteditor/img/btn_close.png" onclick="hidePSSD();" />
		</a>
	</span>
	<iframe class="sbpline" src=""></iframe>
	<span class="btn_gray showAllActivity cursor" style="display:none;" onclick="showAllActivity();">
		<span class="txt_btn_start"></span>
		<span class="txt_btn_center">뒤로가기</span>
		<span class="txt_btn_end"></span>
	</span>
</div>