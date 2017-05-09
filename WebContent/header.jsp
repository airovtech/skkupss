<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.User"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%
	User cUser = SmartUtil.getCurrentUser();
%>
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />
<script type="text/javascript">
function logout() {
	smartPop.progressCenter();
	document.location.href = "logout.sw?userId=" + currentUser.userId;
};









/* SBP서버로부터 데이터를 받아온다 */

//Create IE + others compatible event handler
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";



/* 데이터바구니 */
/* PSS와 SBP프로젝트 연결하는데 필요한 데이터를 담는 바구니역할을 변수들 */
var sbp_dt ="", sbpId_dt="", activityId_dt="", activityName_dt="", seq_dt="", selectedColor="";
var count_dt = 0;
var seq_Array = new Array();
var activityId_Array = new Array();
var activityName_Array = new Array();
var editMode = "";
var viewMode = "";

// Listen to message from child window
eventer(messageEvent,function(e) {
	
	/* 블루프린트를 선택후 activity로 넘어갈때 view 조정 */
	if(e.data == "showSelectedActivity") {
		$(".activity_content_wrap").css("display", "block").css("margin-top", 56);
		$(".activity_content").css("display", "block").css("margin-top", 35);
		$(".dataEnsure1").css("display", "block");
		$(".sbpline").css("border-top", "80px solid white");
		$(".sbpline").css("height", 700);
	} else {
		var sbpMapData = e.data.split("||");
	//  설명 										SBP서버에서 사용되고있는 실제 변수명
	//	sbpMapData[0]	->	SBP					//sbpName
	//	sbpMapData[1]	->	SBP id				//seqId
	//	sbpMapData[2]	->	activity 번호			//seq (*이게 유니크한 속성)
	//	sbpMapData[3]	->	activity id			//activity_seq
	//	sbpMapData[4]	->	activity name 		//activity_title
	//	sbpMapData[5]	->  activity 메인 이름		//groupTitle
	//    sbpMapData[4] += "(" + sbpMapData[5] + ")";		// activity이름과 메인이름을 합쳐준다. 
	
	    /* 선택한 activity seq 정렬과정 */
	   	var sign = false;
		var length_Seq_dt = seq_Array.length;
		if(length_Seq_dt == 0) {
			sign = true;
			seq_Array.push(sbpMapData[2]);
			activityId_Array.push(sbpMapData[3]);
			activityName_Array.push(sbpMapData[4]);
		} else {
			var key = false;
			for(var i=0; i<length_Seq_dt; i++) {
				if(seq_Array[i] != sbpMapData[2]) {
					key = true;
				} else {
					key = false;
					seq_Array.splice(i,1);
					activityId_Array.splice(i,1);
					activityName_Array.splice(i,1);
					i = length_Seq_dt;
				} 	
			}
			if(key) {
				sign = true;
				seq_Array.push(sbpMapData[2]);
				activityId_Array.push(sbpMapData[3]);
				activityName_Array.push(sbpMapData[4]);
			}
		}
	
		/* 선택한 activityId 정렬과정 (중복 선택 구별) */
	/*	var length_Id_dt = activityId_Array.length;
		if(length_Id_dt == 0) {
			activityId_Array.push(sbpMapData[3]);
		} else {
			var key = false;
			for(var i=0; i<length_Id_dt; i++) {
				if(activityId_Array[i] != sbpMapData[3]) {
					key = true;
				} else {
					key = false;
					activityId_Array.splice(i,1);
					i = length_Id_dt;
				} 	
			}
			if(key) {
				sign = true;
				activityId_Array.push(sbpMapData[3]);
			}
		}
	*/
		/* 선택한 activity Name 정렬과정 (중복 선택 구별) */
	/*	var length_Name_dt = activityName_Array.length;
		if(length_Name_dt == 0) {
			activityName_Array.push(sbpMapData[4]);
		} else {
			var key = false;
			for(var i=0; i<length_Name_dt; i++) {
				if(activityName_Array[i] != sbpMapData[4]) {
					key = true;
				} else {
					if(sign == false) {
						key = false;
						activityName_Array.splice(i,1);
						i = length_Name_dt;
					} else {
						key = true;
						i = length_Name_dt;
					}
				}
			}
			if(key) {
				activityName_Array.push(sbpMapData[4]);
			}
		}
	*/
		
		if(editMode != "false") {
			/* SBP Map에서 선택되어진 activity 이름을 보여준다 */
			var activityName_Array_Impl = "";
			for(var i=0; i<activityName_Array.length; i++) {
				activityName_Array_Impl += activityName_Array[i] + ", ";
			}
			activityName_Array_Impl = activityName_Array_Impl.substring(0, activityName_Array_Impl.length-2);
			$(".activity_content").html(activityName_Array_Impl);
			
/*			var activityName_Array_Impl = "";
			for(var i=0; i<activityName_Array.length; i++) {
				activityName_Array_Impl += activityName_Array[i];
				if((i+=1) != (activityName_Array.length)) {
					activityName_Array_Impl += ",&nbsp;&nbsp;&nbsp;&nbsp;";
					i-=1;
				}
				if((i!=0) && (i%7 == 0)) {
					activityName_Array_Impl += "<br/>";
				}
			}
			$(".activity_content").html(activityName_Array_Impl);
*/
		}
			
		sbp_dt = sbpMapData[0];
		sbpId_dt = sbpMapData[1];
		seq_dt = seq_Array;
		activityId_dt = activityId_Array;
		activityName_dt = activityName_Array;
		selectedColor = sbpMapData[6];		
	}
},false)





</script>

<div class="company_logo">
	<span>
		<a href="home.sw">
			<img style="width:auto" class="js_auto_picture js_company_logo_src" src="images/pss/company_logo.png" />
		</a>
	</span>
</div>
<!-- 회사 로고 및 연결 링크 //-->

<!-- 헤더에 있는 메뉴들 및 연결 기능 -->
<div class="top_menu" style="color:white;text-align:center; font-size:20px;width:710px;height:35px;padding-top: 15px !important;"><fmt:message key="pss.title.repository"/></div>
<!-- 헤더에 있는 메뉴들 및 연결 기능 // -->

<!--  전체 메뉴  -->
<div class="global_menu">

 	<%
	if (cUser.getUserLevel() == User.USER_LEVEL_ADMINISTRATOR) {
 	%>
		<!-- 관리자 권한이 있는 사용자에게 제공되는 시스템설정, 스마트빌더, 앱스토어 버튼들  -->
		<div class="pop_admin">
			<a href="settings_home.sw"><span class="btn_setting" title="<fmt:message key='header.global_menu.settings'/>" ></span></a>
		</div>
 	<%
 	}
 	%>
	<!-- 개인정보수정 및 로그아웃 영역  -->
	<div>
		<a href="" onclick="$(this).parent().next('div').toggle(); return false;"><img class="profile_size_s mb3 mr3" src="<%=cUser.getMinPicture()%>"/><%=cUser.getLongName()%>▼ </a>
	</div>

	<!-- 위의 사용자정보 클릭시 나타나는 개인정보수정 및 로그아웃 버튼들  -->
	<div class="pop js_header_user_settings" style="display: none">
		<ul>
			<li><a href="my_profile.sw?userId=<%=cUser.getId()%>"><fmt:message key="header.global_menu.edit_my_profile" /></a></li>
			<li><a href="javascript:logout();"><fmt:message key="header.global_menu.logout" />
			</a>
			</li>
		</ul>
	</div>
</div>
