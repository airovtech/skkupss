<%@ page contentType="text/html; charset=utf-8"%>

<%
	String sbpId = (String) request.getAttribute("sbpId");
	String psId = (String) request.getAttribute("psId");
	String itemName = (String) request.getAttribute("itemName");													// Service Concept 종류
	String title = (String) request.getAttribute("title");															// Service Concept 이름 
	String svcNameNum = (String) request.getAttribute("svcNameNum");												// Service concept 종류안에 속해있는것들중에 선택한 service concept
	String sbpPrjName = (String) request.getAttribute("sbpPrjName");												// SBP 프로젝트 이름 
	String sbpName = (String) request.getAttribute("sbpName");														// SBP 이름 

	String srcUrl = "http://sbp.pssd.or.kr/sbp/panel8ForHvm.jsp?seq=" + sbpId + "&hvm=true&memberId=sbpAdmin&sPUID=&docTitle=" + sbpName + "&sProjectName=" + sbpPrjName + ""; // SBP Project Map을 보여준다 
//	String srcUrl = "http://sbp.pssd.or.kr/sbp/panel8ForHvm.jsp?seq=" + sbpId + "&hvm=true&memberId=sbpAdmin&sPUID=&docTitle=" + sbpName + "&sProjectName=" + "NiceTest" + "&xPosition=" + "testing50" + ""; 	// SBP Project Map을 보여준다
//	srcUrl += "";
%>
<style>
	#sbpline {
		position: fixed;
		z-index:1042;
		border: 50px solid white;
		border-radius:5px;
		background-color:white;
	}
	.sbpline {
		position: fixed;
		margin-top:10px;
		z-index:1042;
		border-top: 160px solid white;
		border-right: 30px solid white;
		border-bottom: 50px solid white;
		border-left: 30px solid white;
		border-radius:5px;
		background-color:white;
	}
	.close_btn {
		z-index:1045;
		float:right;
		margin-top:30px;
		margin-right:-14px;
	}
	.close_btn_pic {
		position:fixed;
		width:15px; 
		height:15px;
		z-index:1045;
		cursor:pointer;
	}
	.title {
		position: fixed;
		z-index:1045;
		font-size:30px;
		margin-left:63px;
		margin-top:37px;
	}
	.dataEnsure2 {
		position: fixed;
		bottom:0px;
		margin-bottom:27px;
		width:45px;
		height:30px;
		z-index:1045;
		text-align:center;
		
	}
	.disConnect {
		position: fixed;
		bottom:0px;
		margin-bottom:27px;
		width:115px;
		height:30px;
		z-index:1045;
		color:white;
		text-align:center;
	}
	.activity_content_wrap {
		position: fixed;
		z-index:1045;
		font-size:15px;
		margin-left:60px;
		margin-top:106px;
	}
	.activity_content {
		position: fixed;
		z-index:1045;
		font-size:13px;
		margin-top:84px;
		margin-left:200px;
		height:33px;
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
	.sbp-disconnect-modal-content {
		position: fixed;
		z-index:1045;
		border: 5px solid #0095cd;
		border-radius:5px;
	    background-color: #fefefe;
	    margin-left:42%;
	    margin-top:18%;
	    padding: 20px;
	    width: 250px;
	    height:80px;
	}
</style>
<script>
	/* view에 관한 속성들 변경 */
	var width = $(window).width()-200;
	var height = $(window).height()-250;
	$(".sbpline").css("width", width);
	$(".sbpline").css("height", height);
	$(".dataEnsure2").css("margin-left", width/2 - 35);
	$(".disConnect").css("margin-left", width/2 + 35);
	$(".activity_content").css("width", width-280);
	
	/* 수정모드가 아닐경우 -> 연결된 activity는 보이되, 수정은 불가능
	   ViewMode(service concept이 아닌 'SBP-프로젝트 이름'을 클릭했을 때 -> SBP Map만 보여준다.)*/
	var psId = "<%=psId%>";	
	var svcNameNum = "<%=svcNameNum%>";
	editMode = $("." + svcNameNum).attr("editMode");
	if((editMode == "false") || (psId == "" || psId == "null")) {		
		$(".dataEnsure2").css("display", "none");
		$(".disConnect").css("display", "none");
		if(viewMode == "true") {
			$(".activity_content").css("display", "none");
			$(".activity_content_wrap").css("display", "none");
			$(".sbpline").css("border-top", "75px solid white");
			var height_ViewMode = $(window).height()-180;
			$(".sbpline").css("height", height_ViewMode);
		}
	}
	
	/* SBP Map 창을 닫으면 데이터 바구니역할(header.jsp의 변수들)을 하는 변수들을 리셋해준다. */
	$(".resetSbpData2").live("click", function() {
		sbp_dt = "";
		sbpId_dt = "";
		activityId_dt = "";
		activityName_dt = "";
		activityId_Array = new Array();
		activityName_Array = new Array();
		seq_Array = new Array();
		viewMode = "false";
	});
	
	
	/* SBP Map창을 볼 때 -> 연결된 SBP Activity들을 보여준다. */
	var title = "<%=title%>";
	var itemName = "<%=itemName%>";
	$.ajax({
		type: 'POST',
		url: "showConnectedActivity.sw",
		headers:{
			"Content-Type" : "application/json",
			"X-HTTP-Method-Override":"POST",
		},
		data : JSON.stringify({psId : psId , title : title, itemName : itemName}),
		dataType:'json',
		success : function(result) {
			/* 데이터바구니(header.jsp)에 DB에서 꺼내온 데이터를 담는다.  */
			$(result).each(function() {
				activityId_Array = this.activityId;
				activityName_Array = this.activityName;
				seq_Array = this.seq;
				activityId_dt =  this.activityId;
				activityName_dt = this.activityName;
				sbpId_dt = this.sbpId; 
				sbp_dt = this.sbpName;
			});

			/* DB에서 꺼내온 데이터를 바로 보여준다. */
			var activityName_Array_Impl = "";
			for(var i=0; i<activityName_Array.length; i++) {
				activityName_Array_Impl += activityName_Array[i];
				if((i+=1) != (activityName_Array.length)) {
					activityName_Array_Impl += ",&nbsp;&nbsp;&nbsp;&nbsp;";
					i-=1;
				}
			}
			$(".activity_content").html(activityName_Array_Impl);
			
			/* sbp서버로 선택했었던 activity seq 값들을 파라미터로 전송한다. */
			var srcUrl = "http://sbp.pssd.or.kr/sbp/panel8ForHvm.jsp?seq=" + "<%=sbpId%>" + "&hvm=true&memberId=sbpAdmin&sPUID=&docTitle=" + "<%=sbpName%>" + "&sProjectName=" + "<%=sbpPrjName%>" + "";
			srcUrl += "&seqArray=" + seq_Array + "&editMode=" + editMode;
			$(".sbpline").attr("src", srcUrl);
		},
		error : function(result){
			alert("error : " + result);
		}
	});
	
	
	
	
	
	
	
	
	
	
	
	/* 선택한 activity 데이터 저장 (이미 연결한 Activity가 있을 때 -> 즉, 수정 할 때 ) */	
	function dataEnsure2() {
		var sbpMapDataUrl = "insertSbpMapData.sw";
		var itemName = "<%=itemName%>";					// Service Concept 종류
		var title = "<%=title%>";						// Service Concept 이름 
		var psId = "<%=psId%>";							// PSS 프로젝트 ID 
		var sbpName = sbp_dt;							// SBP 프로젝트 이름 
		var sbpId = sbpId_dt;							// SBP ID
		var activityIdArray = activityId_dt; 			// activity ID
		var activityNameArray = activityName_dt; 		// activity 이름		
		var seqArray = seq_dt;							// activity seq(primary key)
		
		var activityId = [];							
		for (var i=0; i<activityIdArray.length; i++) {
			activityId[i] = "\"" + activityIdArray[i] + "\"";
		}
		
		var activityName = [];
		for (var i=0; i<activityNameArray.length; i++) {
			activityName[i] = "\"" + activityNameArray[i] + "\"";
		}
		
		var seq = [];
		for (var i=0; i<seqArray.length; i++) {
			seq[i] = "\"" + seqArray[i] + "\"";
		}

		var totalData = {"\"Info\"" : [{"\"seq\"" : seq, "\"itemName\"" : "\"" + itemName + "\"", "\"title\"" : "\"" + title + "\"" , "\"psId\"" : "\"" + psId + "\"" , "\"sbpName\"" : "\"" + sbpName + "\"" , "\"sbpId\"" : "\"" + sbpId + "\"" , "\"activityId\"" : activityId , "\"activityName\"" : activityName}, {"\"seq\"" : seq, "\"itemName\"" : "\"" + itemName + "\"", "\"title\"" : "\"" + title + "\"" , "\"psId\"" : "\"" + psId + "\"" , "\"sbpName\"" : "\"" + sbpName + "\"" , "\"sbpId\"" : "\"" + sbpId + "\"" , "\"activityId\"" : activityId , "\"activityName\"" : activityName}]}; // java에서 json데이터로 사용하기 편하게 맞춰준다. 2번째 배열에있는 데이터는 java에서 json배열이 1개만 올때 error발생으로, 임의로 추가해줬다.(이 데이터는 사용 안함.)

		$.ajax({
			type: 'POST',
			url: sbpMapDataUrl,
			headers:{
				"Content-Type" : "application/json",
				"X-HTTP-Method-Override":"POST",
			},
			data : JSON.stringify(totalData),
			dataType:'text',
			success : function(result) {
				alert("Activity 연결 성공!");
			},
			error : function(result){
				alert("error : " + result);
			}
		}); 
		
		// 데이터 초기화
		sbp_dt = "";
		sbpId_dt = "";
		activityId_dt = "";
		activityName_dt = "";
		activityId_Array = new Array();
		activityName_Array = new Array();
		seq_Array = new Array();
	}
	
	
	/* SBP 연결끊기 확인 modal 띄우기 */
	function disConnect_check() {
		$("#SBP_DisConnect_Modal").css("display", "block");
		$(".sbp-disconnect-modal-content").css("display", "block");
	}
	
	/* SBP 연결끊기 확인 modal 취소 */
	function disConnect_Cancel() {
		$(".sbp-disconnect-modal-content").css("display", "none");
		$("#SBP_DisConnect_Modal").css("display", "none");
	}
	
	/* SBP와의 연결을 끊는다. (연결된 activity가 있다면 모두 제거됨) */
	function disConnect() {
		var itemName = "<%=itemName%>";
		var svcNameNum = "<%=svcNameNum%>";
		var sbpId = "<%=sbpId%>";
		var title = "<%=title%>";
		var disConnectUrl = "sbpDisConnect.sw";
		$.ajax({
			type: 'POST',
			url: disConnectUrl,
			headers:{
				"Content-Type" : "application/json",
				"X-HTTP-Method-Override":"POST",
			},
			data : JSON.stringify({psId : psId, itemName : itemName, title : title}),
			dataType:'text',
			success : function(result) {
				alert("SBP와의 연결이 해제 되었습니다.");
				
				/* 연결 제거된 service concept 속성 변경 */
				var svcNameNum2 = "." + svcNameNum;
				var sbpPrjName = $(svcNameNum2).attr("sbpPrjName");
				var title = "<%=title%>";
				$(svcNameNum2).attr("class", "showSbpPrjList serviceConcept2 js_action_element_item " + svcNameNum);
				$(svcNameNum2).attr("sbpPrjName", sbpPrjName);
				$(svcNameNum2).attr("title", title);
				$(svcNameNum2).attr("sbpId", "");
				$(svcNameNum2).children().attr("class", "showSbpPrjList serviceConcept2 js_action_element_item " + svcNameNum);
				$(svcNameNum2).children().attr("sbpPrjName", sbpPrjName);
				$(svcNameNum2).children().attr("title", title);
				$(svcNameNum2).children().attr("sbpId", "");
				
				/* 연결된 'SBP-프로젝트 이름'을 보여주는곳 변경 */
				var title_Create_url = "title_Create.sw";
				var sbpPrjName = "<%=sbpPrjName%>";
				var sbpName = "<%=sbpName%>";
				$.ajax({
					type: 'POST',
					url: title_Create_url,
					headers:{
						"Content-Type" : "application/json",
						"X-HTTP-Method-Override":"POST",
					},
					data : JSON.stringify({psId : psId}),
					dataType:'html',
					success : function(result) {
						/* 서버encode -> 클라이언트decode 해줘도 특수문자가 깨져서 와서 깨진부분만 수정 */
						result = decodeURI(result);
						result = result.replace(/\+/gi," ");
						result = result.replace(/%2F/gi,"/");
						result = result.replace(/%3D/gi,"=");
						result = result.replace(/%3A/gi,":");
						result = result.replace(/%3B/gi,";");
						result = result.replace(/%2C/gi,",");
						$(".connect_SBPPrj").parent().html(result);
					},
					error : function(result){
						alert("error : " + result);
					}
				});
			},
			error : function(result){
				alert("error : " + result);
			}
		}); 
		
		// 데이터 초기화
		sbp_dt = "";
		sbpId_dt = "";
		activityId_dt = "";
		activityName_dt = "";
		activityId_Array = new Array();
		activityName_Array = new Array();
		seq_Array = new Array();
	}
</script>
<div id="sbpline">
	<span class='title'>SBP</span>
	<span class="activity_content_wrap">
		연결된 SBP_Activity : 
	</span>
	<span class="activity_content w3-container w3-section w3-border w3-border-blue" style='overflow:scroll; overflow-x:hidden'></span>
	<span>
		<a class='close_btn' title='Close'>
			<img class='modalCloseImg simplemodal-close close_btn_pic resetSbpData2' src="/skkupss/smarteditor/img/btn_close.png"/>
		</a>
	</span>
	<iframe class="sbpline" src=""></iframe>
	<!--<button class="dataEnsure2 simplemodal-close" type="button" onclick="dataEnsure2();">확인</button>-->
	<span class="btn_gray dataEnsure2 simplemodal-close cursor" onclick="dataEnsure2();">
		<span class="txt_btn_start"></span>
		<span class="txt_btn_center">확인</span>
		<span class="txt_btn_end"></span>
	</span>
	<!--<button class="disConnect simplemodal-close" type="button" onclick="disConnect();">SBP와 연결해제</button>-->
	<span class="btn_gray disConnect cursor" onclick="disConnect_check();">
		<span class="txt_btn_start"></span>
		<span class="txt_btn_center">SBP와 연결해제</span>
		<span class="txt_btn_end"></span>
	</span>
</div>

<!--SBP 와 연결끊기 확인 modal -->
<div>
	<div id="SBP_DisConnect_Modal" class="modal" style="display:none;">
		<div class="sbp-disconnect-modal-content" style="display:none;">
			<div style="text-align:center;">SBP와의 연결을 해제합니다.</div> 
			<div style="text-align:center; margin-top:5px;">계속 하시겠습니까?</div>
			<div style="margin-top:20px; text-align:center;">
				<button type="button" class="button blue simplemodal-close" style="width:35px;" onclick="disConnect();">예</button>
				<button type="button" class="button blue" style="width:45px;" onclick="disConnect_Cancel();">아니오</button>
			</div>
		</div>
	</div>
</div>

