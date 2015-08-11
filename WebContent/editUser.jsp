<%@page import="net.smartworks.util.LocaleInfo"%>
<%@page import="net.smartworks.util.KeyMap"%>
<%@page import="net.smartworks.util.CommonUtil"%>
<%@page import="net.smartworks.factory.ManagerFactory"%>
<%@page import="net.smartworks.skkupss.model.User"%>
<%@page import="net.smartworks.util.LocalDate"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%
try{
	User cUser = SmartUtil.getCurrentUser();
	
	String userId = request.getParameter("userId");
	User user = new User();
	if(!SmartUtil.isBlankObject(userId)){
		user =  ManagerFactory.getInstance().getServiceManager().getUser(userId);
	}

	KeyMap[] timeZoneNames = LocalDate.getAvailableTimeZoneNames(cUser.getLocale());

%>
<script type="text/javascript">
try{
	// 모든정보를 JSON형식으로 Serialize해서 서버의 set_company_event.sw 서비스를 호출하여 수정한다.
	function submitForms(e) {
		var editCompanyEvent = $('.js_editUser_page');
		if (SmartWorks.GridLayout.validate(editCompanyEvent.find('form.js_validation_required'), editCompanyEvent.find('.js_profile_error_message'))) {
			var forms = editCompanyEvent.find('form');
			var paramsJson = {};
			paramsJson['userId'] = editCompanyEvent.attr('userId');
			for(var i=0; i<forms.length; i++){
				var form = $(forms[i]);
				if(form.attr('name') === 'frmSmartForm'){
					paramsJson['formId'] = form.attr('formId');
					paramsJson['formName'] = form.attr('formName');
				}
				paramsJson[form.attr('name')] = mergeObjects(form.serializeObject(), SmartWorks.GridLayout.serializeObject(form));
 			}
			console.log(JSON.stringify(paramsJson));
			
			var url = "set_user.sw";
			var userId = editCompanyEvent.attr('userId'); 
			var confirmMessage = smartMessage.get("saveConfirmation");
			if(isEmpty(userId)){
				confirmMessage = smartMessage.get("createConfirmation")
			}
			smartPop.confirm( confirmMessage, function(){
				var progressSpan = editCompanyEvent.find('.js_progress_span');
				smartPop.progressCont(progressSpan);
				$.ajax({
					url : url,
					contentType : 'application/json',
					type : 'POST',
					data : JSON.stringify(paramsJson),
					success : function(data, status, jqXHR) {
						document.location.href = "userManagement.sw";					
						smartPop.closeProgress();
					},
					error : function(xhr, ajaxOptions, e) {
						smartPop.closeProgress();
						smartPop.showInfo(smartPop.ERROR, isEmpty(eventId) ? smartMessage.get('createCompanyEventError') : smartMessage.get('setCompanyEventError'), null, e);
					}
				});
			});
		}
	};
	
	function closePage() {
		$('.js_editUser_page').parent().slideUp(500).html('');
	};	
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[edit_company_event script]', null, error);
}
</script>
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />

<div class="form_wrap up mb2 js_editUser_page" userId="<%=CommonUtil.toNotNull(userId)%>">
	<div class="form_title">
		<%
		if(SmartUtil.isBlankObject(userId)){
		%>
			<div class="icon_iworks title_noico"><fmt:message key="settings.title.add_user"/></div>
		<%
		}else{
		%>
			<div class="icon_iworks title_noico"><fmt:message key="settings.title.modify_user"/></div>
		<%
		}
		%>
		<div class="solid_line"></div>
	</div>

	<form name="frmEditUser" class="form_layout con js_validation_required">
		<table>
			<tbody>
				<tr>
					<th class="required_label"><fmt:message key="profile.title.user_id"/></th>
					<td>
					
					<div class="btn_fb_space5">
					
							<input name="txtUserProfileUserId" <%if(!SmartUtil.isBlankObject(userId)){ %>class="sw_dup_checked fieldline required email" readonly<%}else{ %>class="fieldline required email" <%} %> type="text" value="<%=CommonUtil.toNotNull(user.getId()) %>" />
							<!-- 유저 아이디가 없을 경우 버튼 활성화 -->
							<%if(SmartUtil.getUserFromUserId(userId) == null){%>
							<div class="icon_btn_start icon_pos_right">
							<a class="icon_btn_tail js_check_id_duplication" href="" <%if(!SmartUtil.isBlankObject(userId)){%>style="display:none"<%} %>><fmt:message key="settings.button.duplication_check"/></a>
							<a class="icon_btn_tail js_change_id" href="" <%if(SmartUtil.isBlankObject(userId)){%>style="display:none"<%} %>><fmt:message key="settings.button.change_id"/></a>
							</div>
							<%} %>
					</div>
					
					<div class="t_s11 fl"><fmt:message key="settings.sentence.use_email"/></div>
					
					</td>
				</tr>		
				<tr>
					<th class="required_label"><fmt:message key="profile.title.user_name" /></th>
					<td>
						<input name="txtUserProfileUserName" type="text" class="fieldline required" value="<%=CommonUtil.toNotNull(user.getName())%>">		
					</td>
				</tr>
				<tr>
					<th class="required_label"><fmt:message key="profile.title.password" /></th>
					<td>
						<input name="pwUserProfilePW" class="fieldline required" type="password" value="<%=CommonUtil.toNotNull(user.getPassword())%>">		
					</td>
				</tr>
				<tr>
					<th class="required_label"><fmt:message key="profile.title.password_confirm" /></th>
					<td>
						<input name="pwUserProfilePWCfm" type="password" class="required fieldline" value="<%=CommonUtil.toNotNull(user.getPassword())%>">		
					</td>
				</tr>
				<tr>
					<th><fmt:message key="profile.title.user_level"/></th>
					<td><select name="selUserProfileUserLevel">
						<option <%if(user.getUserLevel()==User.USER_LEVEL_USER){ %>selected<%} %> value="<%=User.USER_LEVEL_USER%>"><fmt:message key="organization.user_level.internal_user"/></option>
						<option <%if(user.getUserLevel()==User.USER_LEVEL_ADMINISTRATOR){ %>selected<%} %> value="<%=User.USER_LEVEL_ADMINISTRATOR%>"><fmt:message key="organization.user_level.administrator"/></option>
					</select></td>
				</tr>
				<tr>
					<th><fmt:message key="profile.title.company" /></th>
					<td>
						<input name="txtUserProfileCompany" class="fieldline required" type="text" value="<%=CommonUtil.toNotNull(user.getCompany())%>">		
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
								<option value="<%=locale%>" <%if (user.getLocale().equals(locale)) {%> selected <%}%>><fmt:message key="<%=strKey%>" /></option>
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
								<option value="<%=timeZoneName.getId()%>" <%if (user.getTimeZone().equals(timeZoneName.getId())) {%> selected <%}%>><%=timeZoneName.getKey()%></option>
							<%
							}
							%>
						</select>
					</td>
				</tr>
				<tr>
					<th><fmt:message key="profile.title.cell_phone_no" /></th>
					<td>
						<input name="txtUserProfileCellNo" class="fieldline" type="text" value="<%=CommonUtil.toNotNull(user.getMobilePhoneNo())%>" title="">
					</td>
				</tr>
				<tr>
					<th><fmt:message key="profile.title.home_phone_no"/></th>
					<td>
						<input name="txtUserHomePhoneNo" class="fieldline" type="text" value="<%=CommonUtil.toNotNull(user.getHomePhoneNo()) %>" />
					</td>
				</tr>
				<tr class="end">
					<th><fmt:message key="profile.title.home_address"/></th>
					<td>
						<textarea name="txtUserHomeAddress" class="fieldline" rows="2"><%=CommonUtil.toNotNull(user.getHomeAddress()) %></textarea>
					</td>
				</tr>
			</tbody>
		</table>
	</form>

	<!-- 버튼영역 -->
	<div class="glo_btn_space">
		<div class="fr ml10">
			<span class="btn_gray"> 
				<a href="" onclick='submitForms(); return false;'>
					<span class="txt_btn_start"></span>
					<%
					if(SmartUtil.isBlankObject(userId)){
					%>
						<span class="txt_btn_center"><fmt:message key="common.button.add_new"/></span> 
					<%
					}else{
					%>
						<span class="txt_btn_center"><fmt:message key="common.button.modify"/></span>
					<%
					}
					%>
					<span class="txt_btn_end"></span>
				</a>
			</span> 
			<span class="btn_gray"> 
				<a href="" onclick='closePage();return false;'>
					<span class="txt_btn_start"></span>
					<span class="txt_btn_center"><fmt:message key="common.button.cancel"/></span> 
					<span class="txt_btn_end"></span>
				</a>
			</span>
		</div>
		<!--  실행시 표시되는 프로그래스아이콘을 표시할 공간 -->
		<span class="fr form_space js_progress_span"></span>
		<!-- 실행시 데이터 유효성 검사이상시 에러메시지를 표시할 공간 -->
		<div class="form_space sw_error_message js_profile_error_message" style="text-align:right; color: red;line-height:20px"></div>
	</div>
	<!-- 버튼영역 //-->

</div>
<!-- 추가하기 테이블 //-->

<script type="text/javascript">
try{
	smartCommon.liveTodayPicker();
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[edit_company_event script]', null, error);
}
</script>
<%
}catch(Exception e){ e.printStackTrace();
%>
	<script type="text/javascript">smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[edit_company_event jsp]', null, "<%=e%>");</script>
<%
}
%>
