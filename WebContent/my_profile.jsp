<%@page import="net.smartworks.util.CommonUtil"%>
<%@page import="net.smartworks.util.KeyMap"%>
<%@page import="net.smartworks.skkupss.model.User"%>
<%@page import="net.smartworks.util.LocalDate"%>
<%@page import="net.smartworks.util.LocaleInfo"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%

	User cUser = SmartUtil.getCurrentUser();

	// 사용가능한 타임존들을 가져와서, 타임존 선택박스에 리스트로 보여준다.
	KeyMap[] timeZoneNames = LocalDate.getAvailableTimeZoneNames(cUser.getLocale());

%>
<script type="text/javascript">

	// 개인정보프로파일 수정하기 버튼을 클릭하면, 
	// 모든정보를 JSON형식으로 Serialize해서 서버의 update_my_profile.sw 서비스를 호출하여 수정한다.
	function submitForms(e) {
		var myProfile = $('.js_my_profile_page');
		if (SmartWorks.GridLayout.validate(myProfile.find('form.js_validation_required'), $('.js_profile_error_message'))) {
			
			if(myProfile.find('.js_select_working_status option:selected').attr('value') != 0 ){
				var startDate = myProfile.find('input[name="datStartDate"]').attr("value");
				var endDate = myProfile.find('input[name="datEndDate"]').attr("value");
				if(!isEmpty(startDate) && !isEmpty(endDate)){
					if((new Date(startDate))>(new Date(endDate))){
						smartPop.showInfo(smartPop.ERROR, smartMessage.get("eventOldEndDateError"));
						return;
					}
				}
			}

			var forms = myProfile.find('form');
			var paramsJson = {};
			for(var i=0; i<forms.length; i++){
				var form = $(forms[i]);
				if(form.attr('name') === 'frmSmartForm'){
					paramsJson['formId'] = form.attr('formId');
					paramsJson['formName'] = form.attr('formName');
				}
				paramsJson[form.attr('name')] = mergeObjects(form.serializeObject(), SmartWorks.GridLayout.serializeObject(form));
			}
			console.log(JSON.stringify(paramsJson));
			var url = "update_my_profile.sw";
			var progressSpan = myProfile.find('.js_progress_span');
			smartPop.progressCont(progressSpan);
			if(!isEmpty(myProfile.find('input[name="chkUserProfileUseEmail"]:checked'))){
				var mailServerId = myProfile.find('select[name="selUserProfileEmailServerName"] option:selected').attr('value');
				var username = myProfile.find('input[name="txtUserProfileEmailUserName"]').attr('value');
				var password = myProfile.find('input[name="pwUserProfileEmailPW"]').attr('value');
				var accountJson = {};
				accountJson['mailServerId'] = mailServerId;
				accountJson['username'] = username;
				accountJson['password'] = password;
				$.ajax({
					url : "authenticate_email_account.sw",
					contentType : 'application/json',
					type : 'POST',
					data : JSON.stringify(accountJson),
					success : function(data, status, jqXHR) {
						try{
							if(data != 'true'){
								smartPop.closeProgress();
								smartPop.showInfo(smartPop.ERROR, smartMessage.get('invalidMailAccountError'));
								return;
							}
							$.ajax({
								url : url,
								contentType : 'application/json',
								type : 'POST',
								data : JSON.stringify(paramsJson),
								success : function(data, status, jqXHR) {
									// 사용자정보 수정이 정상적으로 완료되었으면, 현재 페이지에 그대로 있는다.
									document.location.href = "home.sw";
									smartPop.closeProgress();
								},
								error : function(xhr, ajaxOptions, e) {
									smartPop.closeProgress();
									smartPop.showInfo(smartPop.ERROR, smartMessage.get('setMyProfileError'), null, e);
								}
							});
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[my_profile authenticate_email_account]', null, error);
						}
					},
					error : function(xhr, ajaxOptions, e) {
						smartPop.closeProgress();
						smartPop.showInfo(smartPop.ERROR, smartMessage.get('invalidMailAccountError'), null, e);
					}
				});
				
				return;
			}
			
			$.ajax({
				url : url,
				contentType : 'application/json',
				type : 'POST',
				data : JSON.stringify(paramsJson),
				success : function(data, status, jqXHR) {
					// 사용자정보 수정이 정상적으로 완료되었으면, 현재 페이지에 그대로 있는다.
					document.location.href = "home.sw";
					smartPop.closeProgress();
				},
				error : function(xhr, ajaxOptions, e) {
					smartPop.closeProgress();
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('setMyProfileError'), null, e);
				}
			});
		}
	};
</script>
<!--  다국어 지원을 위해, 로케일 및 다국어 resource bundle 을 설정 한다. -->
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />

<!-- 컨텐츠 레이아웃-->
<div class="section_portlet js_my_profile_page">
	<div class="portlet_t">
		<div class="portlet_tl"></div>
	</div>
	<div class="portlet_l" style="display: block;">
		<ul class="portlet_r" style="display: block;">

			<!-- 타이틀 -->
			<div class="body_titl">
				<div class="body_titl_iworks title"><fmt:message key="content.title.my_profile"></fmt:message></div>

				<!-- 우측 버튼 -->
				<div class="txt_btn">
					<div class="fr"><span class="vb icon_required"></span><fmt:message key="profile.title.required_field" /></div>
				</div>
				<!-- 우측 버튼 //-->
				<div class="solid_line"></div>
			</div>
			<!-- 타이틀 -->
			
			<!-- 컨텐츠 -->
			<form name="frmMyProfileSetting" class="js_validation_required">
				<div class="contents_space oh">
					<div class="photo_section">
					
						<!--  *** js_my_profile_field : sw_act_work.js에서 화면로딩이 완료되면 이 클래스로 찾아서,  	-->
						<!--      현재사용자의 사진을 보여주고, 다른 사진을 올리줄 있도록하는 기능을 제공한다. 			-->
						<div class="js_my_profile_field js_auto_load_profile"></div>
						<div class="t_s11"><fmt:message key="profile.title.size_desc"/></div>
					</div>	
					<div class="table_normal600 fl">				
						<table>
							<tr>
								<th style="width:128px"><fmt:message key="profile.title.user_id" /></th>
								<td>
									<input name="txtUserProfileUserId" type="text" readonly="readonly"
										value="<%=CommonUtil.toNotNull(cUser.getId())%>">
								</td>
							</tr>		
							<tr>
								<th><fmt:message key="profile.title.user_name" /></th>
								<td>
									<input name="txtUserProfileUserName" readonly="readonly" type="text" value="<%=CommonUtil.toNotNull(cUser.getName())%>">		
								</td>
							</tr>
							<tr>
								<th class="required_label"><fmt:message key="profile.title.password" /></th>
								<td>
									<input name="pwUserProfilePW" class="fieldline required" type="password" value="<%=CommonUtil.toNotNull(cUser.getPassword())%>">		
								</td>
							</tr>
							<tr>
								<th class="required_label"><fmt:message key="profile.title.password_confirm" /></th>
								<td>
									<input name="pwUserProfilePWCfm" type="password" class="required fieldline" value="<%=CommonUtil.toNotNull(cUser.getPassword())%>">		
								</td>
							</tr>
							<tr>
								<th><fmt:message key="profile.title.company" /></th>
								<td>
									<input name="txtUserProfileCompany" class="fieldline required" type="text" value="<%=CommonUtil.toNotNull(cUser.getCompany())%>">		
								</td>
							</tr>
							<tr>
								<th class="required_label"><fmt:message key="profile.title.locale" /></th>
								<td>
									<select name="selUserProfileLocale">
										<%
										for (String locale : LocaleInfo.supportingLocales) {
											String strKey = "common.title.locale." + locale;
										%>
											<option value="<%=locale%>" <%if (cUser.getLocale().equals(locale)) {%> selected <%}%>><fmt:message key="<%=strKey%>" /></option>
										<%
										}
										%>
									</select>
								</td>
							</tr>
							<tr>
								<th  class="required_label"><fmt:message key="profile.title.timezone" /></th>
								<td>
									<select name="selUserProfileTimeZone">
										<%
										for (KeyMap timeZoneName : timeZoneNames) {
										%>
											<option value="<%=timeZoneName.getId()%>" <%if (cUser.getTimeZone().equals(timeZoneName.getId())) {%> selected <%}%>><%=timeZoneName.getKey()%></option>
										<%
										}
										%>
									</select>
								</td>
							</tr>
							<tr>
								<th><fmt:message key="profile.title.cell_phone_no" /></th>
								<td>
									<input name="txtUserProfileCellNo" class="fieldline" type="text" value="<%=CommonUtil.toNotNull(cUser.getMobilePhoneNo())%>" title="">
								</td>
							</tr>
							<tr>
								<th><fmt:message key="profile.title.home_phone_no"/></th>
								<td>
									<input name="txtUserHomePhoneNo" class="fieldline" type="text" value="<%=CommonUtil.toNotNull(cUser.getHomePhoneNo()) %>" />
								</td>
							</tr>
							<tr>
								<th><fmt:message key="profile.title.home_address"/></th>
								<td>
									<textarea name="txtUserHomeAddress" class="fieldline" rows="2"><%=CommonUtil.toNotNull(cUser.getHomeAddress()) %></textarea>
								</td>
							</tr>
						</table>
					</div>
				</form>
			</div>
			<!-- 컨텐츠 //-->
			
			<!-- 버튼 영역 -->
			<div class="glo_btn_space">
				<div class="fr ml10">
					<span class="btn_gray">
						<a href="" onclick='submitForms(); return false;'>
							<span class="txt_btn_start"></span>
							<span class="txt_btn_center"><fmt:message key="popup.button.modify_my_profile"/></span>
							<span class="txt_btn_end"></span>
						</a> 
					</span>
					 <span class="btn_gray ml5"> 
						 <a href="" onclick="return true;"> 
						 	<span class="txt_btn_start"></span>
						 	<span class="txt_btn_center"><fmt:message key="common.button.cancel"/></span>
						 	<span class="txt_btn_end"></span> 
						 </a>
					</span>
				</div>
				<!--  실행시 표시되는 프로그래스아이콘을 표시할 공간 -->
				<span class="fr form_space js_progress_span"></span>
				<!-- 실행시 데이터 유효성 검사이상시 에러메시지를 표시할 공간 -->
				<div class="form_space sw_error_message js_profile_error_message" style="text-align:right; color: red; line-height: 20px"></div>
			</div>
			<!-- 버튼 영역 //-->
						
		</ul>
	</div>
	<div class="portlet_b" style="display: block;"></div>
</div>
<script>
try{
	loadMyProfileField();
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[my_profile script]', null, error);
}

</script>
<!-- 컨텐츠 레이아웃//-->		
