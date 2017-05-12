<%@page import="net.smartworks.util.ServletUtil"%>
<%@page import="net.smartworks.util.IDCreator"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%
	String sbpPrjName = (String) request.getAttribute("sbpPrjName");												// SBP Project이름을 가져온다. 
	
	String psId = (String) request.getAttribute("psId");															// PSS 프로젝트ID 
	
	String itemName = (String) request.getAttribute("itemName");													// Service Concept 종류
	
	String title = (String) request.getAttribute("title");															// Service Concept 이름 
	
	String svcNameNum = (String) request.getAttribute("svcNameNum");												// Service concept 종류안에 속해있는것들중에 선택한 service concept
	
	String result = ServletUtil.request("http://sbp.pssd.or.kr/sbp/sbpListForHvm.jsp?hvm=true&memberId=sbpAdmin");	// 모든 SBP Project List를 가져온다. 
	
%>
<style>
	#sbpline {
		border-right:50px solid white;
		border-left:50px solid white;
		border-bottom:50px solid white;
		border-radius:5px;
		background-color:white;
		margin-top:37px;
	}
	.sbpline {
		margin-top:45px;
		border-radius:5px;
		background-color:white;
	}
	.close_btn {
		float:right;
		margin-right:-14px;
	}
	.close_btn_pic {
		width:15px; 
		height:15px;
		cursor:pointer;
	}
	.serviceconcept_title {
		font-size:25px;
		margin-left:27px;
		margin-top:25px;
		height:30px;
	}
	.dataEnsure1 {
		bottom:0px;
		margin-bottom:26px;
		width:45px;
		height:30px;
		font-size:15px;
		text-align:center;
	}
	.activity_content_wrap {
		position:absolute;
		float:left;
		font-size:15px;
		margin-left:30px;
		margin-top:82px;
	}
	.activity_content {
		position:absolute;
		font-size:13px;
		margin-top:64px;
		margin-left:200px;
		line-height:200%;
		height:20px;
		padding:16px;
		margin-bottom:16px!important;
		border:1px solid #ccc!important;
		border-color:#2196F3!important;
	}
	.cursor{
		cursor:pointer;
	}
</style>
<script>
	editMode = localStorage.getItem("editMode");

	var sbpPrjName = "<%=sbpPrjName%>";			// SBP Project의 이름 
	var sbpPrjPuid;								// SBP Project의 puid 
	var result = <%=result%>;					// 모든 SBP Project List (프로젝트 이름 + 프로젝트 puid)
	var sbpProjectList = result.list;			// JSON에서 list만 추출 

	$(sbpProjectList).each(function() {			// 모든 SBP Project 들을 검색하여 그중에서, 현재 연결되어있는 SBP Project 이름과 일치하는 값의 SBP puid를 추출한다. (SBP list들을 보기위함)
		if(this.project_name == sbpPrjName) {
			sbpPrjPuid = this.project_puid;
		}
	});
	
	/* SBP list를 보려면 SBP프로젝트이름과 SBP Puid가 필요하다 */
	var sbpNameListUrl = "http://sbp.pssd.or.kr/sbp/listForHvm.jsp?hvm=true&memberId=sbpAdmin&sPUID=" + sbpPrjPuid + "&sProjectName=" + encodeURI(sbpPrjName, "UTF-8") + "&editMode=true";	
	$(".sbpline").attr("src", sbpNameListUrl);	
	
	/* view에 관한 속성들 변경 */
	$(".sbpline").css("width", spaceWidth-100);
	$(".sbpline").css("height", 700);
	$(".dataEnsure1").css("margin-left", (spaceWidth-100)/2);
	$(".activity_content").css("width", (spaceWidth-100)-280);
	
	/* 처음 블루프린트 선택 후 activity선택화면으로 넘어 왔을시, activity 값 초기화 */
	sbp_dt = "";
	sbpId_dt = "";
	activityId_dt = "";
	activityName_dt = "";
	activityId_Array = new Array();
	activityName_Array = new Array();
	seq_Array = new Array();
	viewMode = "false";
	
	/* 이페이지에서 처음에는 Iframe으로 SBP들을 보여주지만, SBP중에 하나를 클릭하여 SBP Map까지 넘어왔을 때 발생할수 있는 Event */
	$(".resetSbpData1").live("click", function() {		// X버튼으로 창을 닫으면 선택한 Activity 목록들을 지워준다
		sbp_dt = "";
		sbpId_dt = "";
		activityId_dt = "";
		activityName_dt = "";
		activityId_Array = new Array();
		activityName_Array = new Array();
		seq_Array = new Array();
		viewMode = "false";
	});
			
	/* 선택한 activity 데이터 저장 (Activity를 처음 연결했을 때)*/
	function dataEnsure1() {
		var sbpMapDataUrl = "insertSbpMapData.sw";
		var itemName = "<%=itemName%>";					// Service Concept 종류
		var title = "<%=title%>";						// Service Concept 이름
		var psId = "<%=psId%>";							// PSS 프로젝트 ID
		var sbpName = sbp_dt;							// SBP 이름 
		var sbpId = sbpId_dt;							// SBP ID
		var activityIdArray = activityId_dt; 			// activity ID
		var activityNameArray = activityName_dt; 		// activity 이름		
		var seqArray = seq_dt;							// activity seq(primary key)
		var color = selectedColor;								// service concept 에서 선택한 이 컬러로 액티비티 테두리 색깔이 칠해지게 된다. 
/*
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
*/
//		var totalData = {"\"Info\"" : [{"\"seq\"" : seq, "\"itemName\"" : "\"" + itemName + "\"", "\"title\"" : "\"" + title + "\"" , "\"psId\"" : "\"" + psId + "\"" , "\"sbpName\"" : "\"" + sbpName + "\"" , "\"sbpId\"" : "\"" + sbpId + "\"" , "\"activityId\"" : activityId , "\"activityName\"" : activityName}, {"\"seq\"" : seq, "\"itemName\"" : "\"" + itemName + "\"", "\"title\"" : "\"" + title + "\"" , "\"psId\"" : "\"" + psId + "\"" , "\"sbpName\"" : "\"" + sbpName + "\"" , "\"sbpId\"" : "\"" + sbpId + "\"" , "\"activityId\"" : activityId , "\"activityName\"" : activityName}]}; // java에서 json데이터로 사용하기 편하게 맞춰준다. 2번째 배열에있는 데이터는 java에서 json배열이 1개만 올때 error발생으로, 임의로 추가해줬다.(이 데이터는 사용 안함.)


		var activityId = [];							
		for (var i=0; i<activityIdArray.length+2; i++) {
			if(i==0) {
				activityId[i] = "/(start)/";
			} else if(i==activityIdArray.length+1) {
				activityId[i] = "/(end)/";
			} else {
				activityId[i] = activityIdArray[i-1];
			}
		}
		
		var activityName = [];
		for (var i=0; i<activityNameArray.length+2; i++) {
			if(i==0) {
				activityName[i] = "/(start)/";
			} else if(i==activityNameArray.length+1) {
				activityName[i] = "/(end)/";
			} else {
				activityName[i] = activityNameArray[i-1];
			}
		}
		
		var seq = [];
		for (var i=0; i<seqArray.length+2; i++) {
			if(i==0) {
				seq[i] = "/(start)/";
			} else if(i==seqArray.length+1) {
				seq[i] = "/(end)/";
			} else {
				seq[i] = seqArray[i-1];
			}
		}
		
		var sbpNameArray = [];
		sbpNameArray[0] = "/(start)/";
		sbpNameArray[1] = sbpName;
		sbpNameArray[2] = "/(end)/";
		
		var colorArray = [];
		colorArray[0] = "/(start)/";
		colorArray[1] = color;
		colorArray[2] = "/(end)/";
		
//		var totalData = {Info : [{seq : seq, itemName : itemName, title : title, psId : psId, sbpName : sbpName, sbpId : sbpId, activityId : activityId, activityName : activityName}]};// {"\"seq\"" : seq, "\"itemName\"" : "\"" + itemName + "\"", "\"title\"" : "\"" + title + "\"" , "\"psId\"" : "\"" + psId + "\"" , "\"sbpName\"" : "\"" + sbpName + "\"" , "\"sbpId\"" : "\"" + sbpId + "\"" , "\"activityId\"" : activityId , "\"activityName\"" : activityName}]}; // java에서 json데이터로 사용하기 편하게 맞춰준다. 2번째 배열에있는 데이터는 java에서 json배열이 1개만 올때 error발생으로, 임의로 추가해줬다.(이 데이터는 사용 안함.)
//		var totalData = {Info : [{seq : seq, itemName : itemName, title :   title   , psId :   psId   , sbpName :   sbpName   , sbpId :   sbpId   , activityId : activityId , activityName : activityName}, {seq : seq, itemName :   itemName  , title :   title   , psId :   psId   , sbpName :   sbpName   , sbpId :   sbpId   , activityId : activityId , activityName : activityName}]}; // java에서 json데이터로 사용하기 편하게 맞춰준다. 2번째 배열에있는 데이터는 java에서 json배열이 1개만 올때 error발생으로, 임의로 추가해줬다.(이 데이터는 사용 안함.)
		var totalData = {seq : seq, itemName : itemName, title : title, psId : psId, sbpName : sbpNameArray, sbpId : sbpId, activityId : activityId , activityName : activityName, color : colorArray}; 
		var totalDataToString = title + "||{seq:[";
		for(var i=0; i<seq.length; i++) {
			if(i == seq.length-1) {
				totalDataToString += seq[i];
			} else {
				totalDataToString += seq[i] + ", ";
			}
		}
		totalDataToString += "], itemName:" + itemName + ", title:" + title +", psId:" + psId + ", sbpName:[";
		for(var i=0; i<sbpNameArray.length; i++) {
			if(i == sbpNameArray.length-1) {
				totalDataToString += sbpNameArray[i];
			} else {
				totalDataToString += sbpNameArray[i] + ", ";
			}
		}
		totalDataToString += "], sbpId:" + sbpId + ", activityId:[";
		for(var i=0; i<activityId.length; i++) {
			if(i == activityId.length-1) {
				totalDataToString += activityId[i];
			} else {
				totalDataToString += activityId[i] + ", ";
			}
		}
		totalDataToString += "], activityName:[";
		for(var i=0; i<activityName.length; i++) {
			if(i == activityName.length-1) {
				totalDataToString += activityName[i];
			} else {
				totalDataToString += activityName[i] + ", ";
			}
		}
		totalDataToString += "], color:[";
		for(var i=0; i<colorArray.length; i++) {
			if(i == colorArray.length-1) {
				totalDataToString += colorArray[i];
			} else {
				totalDataToString += colorArray[i] + ", ";
			}
		}
		totalDataToString += "]}";

		if(!(sbpId == "null" || sbpId == "undefined" || sbpId == "")) {
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
					if(result == "true") {
						alert("Activity 연결 성공!");
						var svcNameNum = ".<%=svcNameNum%>";						// svcNameNum 속성값으로 class name을 찾아서 속성값을 넣어준다.
						var svcNameNum2 = "<%=svcNameNum%>";
							/* activity가 연결된 service concept의 속성을 변경해준다. */
							$(svcNameNum).parents("span .icon_btn_edit").addClass("class", "showSbpPrjList")
							$(svcNameNum).attr("class", "underline js_action_element_item " + svcNameNum2);
							$(svcNameNum).attr("sbpId", sbpId);	
							$(svcNameNum).attr("psId", psId);
							$(svcNameNum).attr("itemName", itemName);
							$(svcNameNum).attr("title", title);
							$(svcNameNum).attr("sbpName", sbpName);
							$(svcNameNum).children().attr("class", "underline js_action_element_item " + svcNameNum2);
							$(svcNameNum).children().attr("sbpId", sbpId);	
							$(svcNameNum).children().attr("psId", psId);
							$(svcNameNum).children().attr("itemName", itemName);
							$(svcNameNum).children().attr("title", title);
							$(svcNameNum).children().attr("sbpName", sbpName);							
							$('input[svcNameNum=' + svcNameNum2 + ']').attr("value", totalDataToString);
							
							hidePSSD();
							
							/* 선택한 SBP의 이름을 보여준다.(SBP프로젝트 타이틀 보여주는곳) */
/*
							var title_Create_url = "title_Create.sw";
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
									/* 서버encode -> 클라이언트decode 해줘도 특수문자가 깨져서 와서 깨진부분만 수정 
									result = decodeURI(result);
									result = result.replace(/\+/gi," ");
									result = result.replace(/%2F/gi,"/");
									result = result.replace(/%3D/gi,"=");
									result = result.replace(/%3A/gi,":");
									result = result.replace(/%3B/gi,";");
									result = result.replace(/%2C/gi,",");
									if(document.getElementById("noSelected") != null) {
										$("#noSelected").html(result);
									} else {
										$(".connect_SBPPrj").parent().html(result);
									}
								},
								error : function(result){
									alert("error[SbpNameList_title] : " + result);
								}
							});
*/
					} else {
						alert("Success / fail");
					}
				},
				error : function(result){
					alert("error[SbpNameList_activity] : " + result);
				}
			}); 
		} else {
			alert("activity를 선택해주세요.");
		}
		// 데이터 초기화
		sbp_dt = "";
		sbpId_dt = "";
		activityId_dt = "";
		activityName_dt = "";
		activityId_Array = new Array();
		activityName_Array = new Array();
		seq_Array = new Array();
	}
	
	$(".serviceconcept_title").html("<%=title%>");
	
	/* PSSD 화면을 숨겨준다. */
	function hidePSSD() {
		$(".showPSSDForm").css("display", "none");
	}
</script>

<div id="sbpline">
	<span class='serviceconcept_title'></span>
	<span class="activity_content_wrap" style="display:none;">
		Selected Activity : 
	</span>
	<span class="activity_content" style='overflow:scroll; overflow-x:hidden; display:none;'></span>
	<span>
		<a class='close_btn' title='Close'>
			<img class='modalCloseImg simplemodal-close close_btn_pic resetSbpData1' src="/skkupss/smarteditor/img/btn_close.png" onclick="hidePSSD();" />
		</a>
	</span>
	<iframe class="sbpline" src="" style='overflow:scroll; overflow-x:hidden'></iframe>
	<!--<button class="dataEnsure1 simplemodal-close" type="button" onclick="dataEnsure1();">확인</button>-->
	<span class="btn_gray dataEnsure1 simplemodal-close cursor" onclick="dataEnsure1();" style="display:none;">
		<span class="txt_btn_start"></span>
		<span class="txt_btn_center">확인</span>
		<span class="txt_btn_end"></span>
	</span>
</div>

