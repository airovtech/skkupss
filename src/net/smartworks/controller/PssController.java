/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 11. 23.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.smartworks.factory.DaoFactory;
import net.smartworks.factory.ManagerFactory;
import net.smartworks.skkupss.model.ActorSpace;
import net.smartworks.skkupss.model.BizModelSpace;
import net.smartworks.skkupss.model.ContextSpace;
import net.smartworks.skkupss.model.CustomerSpace;
import net.smartworks.skkupss.model.CustomerType;
import net.smartworks.skkupss.model.DefaultSpace;
import net.smartworks.skkupss.model.ProductService;
import net.smartworks.skkupss.model.ProductSpace;
import net.smartworks.skkupss.model.RequestParams;
import net.smartworks.skkupss.model.ServiceSpace;
import net.smartworks.skkupss.model.SimilarityMatrix;
import net.smartworks.skkupss.model.SimilaritySpaceType;
import net.smartworks.skkupss.model.SortingField;
import net.smartworks.skkupss.model.TimeSpace;
import net.smartworks.skkupss.model.TouchPointSpace;
import net.smartworks.skkupss.model.User;
import net.smartworks.skkupss.model.ValueSpace;
import net.smartworks.skkupss.model.db.Db_CustomerType;
import net.smartworks.skkupss.model.db.Db_UnspscName;
import net.smartworks.skkupss.model.db.Db_User;
import net.smartworks.util.CommonUtil;
import net.smartworks.util.LocalDate;
import net.smartworks.util.ServiceUtil;
import net.smartworks.util.SmartMessage;
import net.smartworks.util.SmartUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PssController {
	
	@Autowired
	private AuthenticationManager authenticationManager;

	@RequestMapping("/index")
	public ModelAndView index(HttpServletRequest request, HttpServletResponse response) throws Exception {
		return ServiceUtil.returnMnv(request, "index.jsp", "index.jsp");
	}
	
	@RequestMapping("/login")
	public ModelAndView login(HttpServletRequest request, HttpServletResponse response) throws Exception {
		return ServiceUtil.returnMnv(request, "login.jsp", "login.jsp");
	}

	@RequestMapping("/logout")
	public ModelAndView logouts(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			String userId = request.getParameter("userId");
			request.getSession().removeAttribute(userId);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		ModelAndView mnv = new ModelAndView();
		mnv.addObject("href", "logout");
		mnv.setViewName("movePage.jsp");
		return mnv;
	}
	
	@RequestMapping("/home")
	public ModelAndView home(HttpServletRequest request, HttpServletResponse response) throws Exception {
		return SmartUtil.returnMnv(request, "psList.jsp", "psList.tiles");
	}
	
	@RequestMapping("/psList")
	public ModelAndView psList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		return SmartUtil.returnMnv(request, "psList.jsp", "psList.tiles");
	}
	
	@RequestMapping("/psListPic")
	public ModelAndView psListPic(HttpServletRequest request, HttpServletResponse response) throws Exception {
		return SmartUtil.returnMnv(request, "psListPic.jsp", "psListPic.tiles");
	}
	
	@RequestMapping("/psListPicNDesc")
	public ModelAndView psListPicNDesc(HttpServletRequest request, HttpServletResponse response) throws Exception {
		return SmartUtil.returnMnv(request, "psListPicNDesc.jsp", "psListPicNDesc.tiles");
	}
	
	@RequestMapping("/newProductService")
	public ModelAndView newProductService(HttpServletRequest request, HttpServletResponse response) {
		return SmartUtil.returnMnv(request, "newProductService.jsp", "newProductService.tiles");
	}

	@RequestMapping("/psSimilarityMatrix")
	public ModelAndView psSimilarityMatrix(HttpServletRequest request, HttpServletResponse response) {
		return SmartUtil.returnMnv(request, "psSimilarityMatrix.jsp", "psSimilarityMatrix.tiles");
	}

	@RequestMapping("/doubleProductServices")
	public ModelAndView doubleProductServices(HttpServletRequest request, HttpServletResponse response) {
		return SmartUtil.returnMnv(request, "doubleProductServices.jsp", "doubleProductServices.tiles");
	}
	
	@RequestMapping("/search_filter")
	public ModelAndView searchFilter(HttpServletRequest request, HttpServletResponse response) {
		return SmartUtil.returnMnv(request, "search_filter.jsp", "");
	}
	
	@RequestMapping("/pop_space_combination")
	public ModelAndView popSpaceCombination(HttpServletRequest request, HttpServletResponse response) {
		return SmartUtil.returnMnv(request, "pop_space_combination.jsp", "");
	}
	
	@RequestMapping("/viewActorSpace")
	public ModelAndView viewActorSpace(HttpServletRequest request, HttpServletResponse response) {
		return SmartUtil.returnMnv(request, "viewActorSpace.jsp", "");
	}
	
	@RequestMapping(value = "/set_product_service", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	public void setProductService(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {

		try{
			
			String psId = (String)requestBody.get("psId");
			
			Map<String, Object> frmNewProductService = (Map<String, Object>)requestBody.get("frmNewProductService");
			if(frmNewProductService == null) return;
			
			ProductService productService = new ProductService();

			if(!SmartUtil.isBlankObject(psId))
				productService.setId(psId);
			productService.setName((String)frmNewProductService.get("txtName"));
			productService.setDesc((String)frmNewProductService.get("txtDesc"));			
			
			Map<String, Object> imgPicture = (Map<String, Object>)frmNewProductService.get("imgPicture");
			if(imgPicture!=null){
				List<Map<String, String>> files = (ArrayList<Map<String, String>>)imgPicture.get("files");
				if(files!=null && files.size()==1){
					productService.setPicture(files.get(0).get("fileId"));
				}else if(!SmartUtil.isBlankObject(psId)){
					productService.setPicture(ManagerFactory.getInstance().getServiceManager().getProductServicePicture("", psId));
				}
			}
			
			Map<String, Object> frmActorServitizationProcess = (Map<String, Object>)requestBody.get("frmActorServitizationProcess");
			String txtServitizationProcess = null;
			if(frmActorServitizationProcess!=null)
				txtServitizationProcess = (String)frmActorServitizationProcess.get("txtServitizationProcess");
			
			Map<String, Object> frmSpaceTabs = (Map<String, Object>)requestBody.get("frmSpaceTabs");
			if(frmSpaceTabs!=null){
				productService.setValueSpace(ValueSpace.createValueSpace((Map<String, Object>)frmSpaceTabs.get("" + ProductService.SPACE_TYPE_VALUE)));				
				productService.setProductServiceSpace(DefaultSpace.createDefaultSpaceWithDelimeter((String)frmSpaceTabs.get("" + ProductService.SPACE_TYPE_PRODUCT_SERVICE), ";"));
				productService.setProductSpace(ProductSpace.createProductSpace((Map<String, String>)frmSpaceTabs.get("" + ProductService.SPACE_TYPE_PRODUCT)));
				productService.setServiceSpace(ServiceSpace.createServiceSpace((Map<String, Object>)frmSpaceTabs.get("" + ProductService.SPACE_TYPE_SERVICE)));
				productService.setTouchPointSpace(TouchPointSpace.createTouchPointSpace(psId, (List<Map<String, Object>>)frmSpaceTabs.get("" + ProductService.SPACE_TYPE_TOUCH_POINT)));
				productService.setCustomerSpace(CustomerSpace.createCustomerSpace((Map<String, Object>)frmSpaceTabs.get("" + ProductService.SPACE_TYPE_CUSTOMER)));
				productService.setBizModelSpace(BizModelSpace.createBizModelSpace((Map<String, Object>)frmSpaceTabs.get("" + ProductService.SPACE_TYPE_BIZ_MODEL)));
				productService.setActorSpace(ActorSpace.createActorSpace((String)frmSpaceTabs.get("" + ProductService.SPACE_TYPE_ACTOR), txtServitizationProcess));
				productService.setSocietySpace(DefaultSpace.createSocietySpace((Map<String, Object>)frmSpaceTabs.get("" + ProductService.SPACE_TYPE_SOCIETY)));
				productService.setContextSpace(ContextSpace.createContextSpace((String)frmSpaceTabs.get("" + ProductService.SPACE_TYPE_CONTEXT)));
				productService.setTimeSpace(TimeSpace.createTimeSpace((Map<String, Object>)frmSpaceTabs.get("" + ProductService.SPACE_TYPE_TIME)));
				productService.setEnvironmentSpace(DefaultSpace.createEnvironmentSpace((Map<String, Object>)frmSpaceTabs.get("" + ProductService.SPACE_TYPE_ENVIRONMENT)));
			}
			
			productService.setCreatedDate(new LocalDate());
			productService.setCreatedUser(SmartUtil.getCurrentUser());
			productService.setLastModifiedDate(new LocalDate());
			productService.setLastModifiedUser(SmartUtil.getCurrentUser());
			ManagerFactory.getInstance().getServiceManager().setProductService(SmartUtil.getCurrentUser().getId(), productService, ProductService.SPACE_TYPE_ALL);
			
		}catch (Exception e){
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/set_instance_list_params", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	public ModelAndView setInstanceListParams(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {

		RequestParams requestParams = new RequestParams();
		try{
			
			Map<String, Object> frmSearchInstance = (Map<String, Object>)requestBody.get("frmSearchInstance");
			if(frmSearchInstance != null) {
				String txtSearchInstance = (String)frmSearchInstance.get("txtSearchInstance");
				requestParams.setSearchKey(txtSearchInstance);
			}
	

			Map<String, Object> frmSortingField = (Map<String, Object>)requestBody.get("frmSortingField");
			if(frmSortingField != null){
				String hdnSortingFieldId = (String)frmSortingField.get("hdnSortingFieldId");
				String hdnSortingIsAscending = (String)frmSortingField.get("hdnSortingIsAscending");
				SortingField sortingField = new SortingField();
				sortingField.setFieldId(hdnSortingFieldId);
				sortingField.setAscending(Boolean.parseBoolean(hdnSortingIsAscending));
				requestParams.setSortingField(sortingField);
			}

			Map<String, Object> frmSpaceName = (Map<String, Object>)requestBody.get("frmSpaceName");
			if(frmSpaceName != null){
				requestParams.setSpaceType((String)frmSpaceName.get("selSpaceName"));
			}else{
				requestParams.setSpaceType(ProductService.PSS_SPACE_VALUE);				
			}
			
			Map<String, Object> frmInstanceListPaging = (Map<String, Object>)requestBody.get("frmInstanceListPaging");
			Map<String, Object> frmWorkHourListPaging = (Map<String, Object>)requestBody.get("frmWorkHourListPaging");
			Map<String, Object> frmCompanyEventListPaging = (Map<String, Object>)requestBody.get("frmCompanyEventListPaging");
			Map<String, Object> frmApprovalLineListPaging = (Map<String, Object>)requestBody.get("frmApprovalLineListPaging");
			Map<String, Object> frmWebServiceListPaging = (Map<String, Object>)requestBody.get("frmWebServiceListPaging");
			Map<String, Object> frmExternalFormListPaging = (Map<String, Object>)requestBody.get("frmExternalFormListPaging");

			Map<String, Object> existListPaging = new LinkedHashMap<String, Object>();

			if(frmInstanceListPaging != null)
				existListPaging = frmInstanceListPaging;
			else if(frmWorkHourListPaging != null)
				existListPaging = frmWorkHourListPaging;
			else if(frmCompanyEventListPaging != null)
				existListPaging = frmCompanyEventListPaging;
			else if(frmApprovalLineListPaging != null)
				existListPaging = frmApprovalLineListPaging;
			else if(frmWebServiceListPaging != null)
				existListPaging = frmWebServiceListPaging;
			else if(frmExternalFormListPaging != null)
				existListPaging = frmExternalFormListPaging;

			String hdnCurrentPage = (String)existListPaging.get("hdnCurrentPage");
			String selPageSize = (String)existListPaging.get("selPageSize");
			boolean hdnNext10 = Boolean.parseBoolean((String)existListPaging.get("hdnNext10"));
			boolean hdnNextEnd = Boolean.parseBoolean((String)existListPaging.get("hdnNextEnd"));
			boolean hdnPrev10 = Boolean.parseBoolean((String)existListPaging.get("hdnPrev10"));
			boolean hdnPrevEnd = Boolean.parseBoolean((String)existListPaging.get("hdnPrevEnd"));
			if(hdnCurrentPage != null)
				requestParams.setCurrentPage(Integer.parseInt(hdnCurrentPage));
			if(selPageSize != null)
				requestParams.setPageSize(Integer.parseInt(selPageSize));
			if(hdnNext10)
				requestParams.setPagingAction(RequestParams.PAGING_ACTION_NEXT10);
			else if(hdnNextEnd)
				requestParams.setPagingAction(RequestParams.PAGING_ACTION_NEXTEND);
			else if(hdnPrev10)
				requestParams.setPagingAction(RequestParams.PAGING_ACTION_PREV10);
			else if(hdnPrevEnd)
				requestParams.setPagingAction(RequestParams.PAGING_ACTION_PREVEND);
		}catch (Exception e){
			// Exception Handling Required
			e.printStackTrace();
			return null;			
			// Exception Handling Required			
		}
		String href = (String)requestBody.get("href");
		ModelAndView mnv = new ModelAndView();
		mnv.addObject("requestParams", requestParams);
		mnv.setViewName(href);
		return mnv;

	}

	@RequestMapping(value = "/calculate_ps_similarities", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	public ModelAndView calculatePsSimilarities(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {

		SimilarityMatrix[][] psSimilarities = null;
		String[] psIds = null;
		String[] psNames = null;
		String spaceType = null;
		try{
			
			SimilaritySpaceType[] simSpaceTypes = null;
			
			spaceType = (String)requestBody.get("spaceType");
			if(!ProductService.PSS_SPACE_COMPLEX.equals(spaceType)){
				simSpaceTypes = new SimilaritySpaceType[]{new SimilaritySpaceType(spaceType)};
			}else{
				
			}
			List<String> psIdList = (ArrayList<String>)requestBody.get("psIds");
			List<String> psNameList = (ArrayList<String>)requestBody.get("psNames");
			if(psIdList!=null && psNameList!=null){
				psIds = new String[psIdList.size()];
				psIdList.toArray(psIds);
				psNames = new String[psNameList.size()];
				psNameList.toArray(psNames);
				psSimilarities = ManagerFactory.getInstance().getServiceManager().caculatePsSimilarities(psIds, psNames, simSpaceTypes);

			}
		}catch (Exception e){
			// Exception Handling Required
			e.printStackTrace();
			return null;			
			// Exception Handling Required			
		}
		String href = (String)requestBody.get("href");
		ModelAndView mnv = new ModelAndView();
		mnv.addObject("psSimilarities", psSimilarities);
		mnv.addObject("psIds", psIds);
		mnv.addObject("psNames", psNames);
		mnv.addObject("spaceType", spaceType);		
		mnv.setViewName(href);
		return mnv;

	}
	
	@RequestMapping(value = "/remove_product_service", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	public void removeProductService(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String psId = (String)requestBody.get("psId");
		try{
			ManagerFactory.getInstance().getServiceManager().removeProductService(psId);
		}catch (Exception e){e.printStackTrace();}
	}
	
	@RequestMapping(value = "/ajax_upload_file", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public @ResponseBody void ajaxUploadFile(HttpServletRequest request, HttpServletResponse response) throws Exception {
//		smartworks.ajaxUploadFile(request, response);
	}

	@RequestMapping(value = "/upload_temp_file", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public @ResponseBody void uploadTempFile(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ManagerFactory.getInstance().getDocFileManager().uploadTempFile(request, response);
	}

	@RequestMapping(value = "/get_service_value_html", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody ResponseEntity<String> getServerIPAddress(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.add("Content-Type", "text/html; charset=utf-8");
		return new ResponseEntity<String>(ServiceSpace.getValueHtml(request.getParameter("serviceValue")), responseHeaders, HttpStatus.CREATED);
	}	

	@RequestMapping("/my_profile")
	public ModelAndView myProfile(HttpServletRequest request, HttpServletResponse response) {
		return SmartUtil.returnMnv(request, "my_profile.jsp", "my_profile.tiles");
	}

	@RequestMapping(value = "/update_my_profile", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	public void updateMyProfile(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			Map<String, Object> frmMyProfileSetting = (Map<String, Object>)requestBody.get("frmMyProfileSetting");
	
			Set<String> keySet = frmMyProfileSetting.keySet();
			Iterator<String> itr = keySet.iterator();
	
			List<Map<String, String>> imgMyProfile = null;
			List<Map<String, String>> imgMySignPic = null;
			String groupId = null;
			String txtUserProfileUserId = null;
			String pwUserProfilePW = null;
			String txtUserProfileCompany = null;
			String selUserProfileLocale = null;
			String selUserProfileTimeZone = null;
			String txtUserProfileCellNo = null;
			String profileFileId = null;
			String profileFileName = null;
			String txtUserProfilePicture = null;
			String homePhoneNo = null, homeAddress = null;
			
			while (itr.hasNext()) {
				String fieldId = (String)itr.next();
				Object fieldValue = frmMyProfileSetting.get(fieldId);
				if (fieldValue instanceof LinkedHashMap) {
					Map<String, Object> valueMap = (Map<String, Object>)fieldValue;
					groupId = (String)valueMap.get("groupId");
					if(!CommonUtil.isEmpty(groupId)) {
						if(fieldId.equals("imgMyProfile"))
							imgMyProfile = (ArrayList<Map<String,String>>)valueMap.get("files");
					}
				} else if(fieldValue instanceof String) {
					String valueString = (String)fieldValue;
					if(fieldId.equals("txtUserProfileUserId"))
						txtUserProfileUserId = valueString;
					else if(fieldId.equals("pwUserProfilePW"))
						pwUserProfilePW = valueString;
					else if(fieldId.equals("txtUserProfileCompany"))
						txtUserProfileCompany = valueString;
					else if(fieldId.equals("selUserProfileLocale"))
						selUserProfileLocale = valueString;
					else if(fieldId.equals("selUserProfileTimeZone"))
						selUserProfileTimeZone = valueString;
					else if(fieldId.equals("txtUserProfileCellNo"))
						txtUserProfileCellNo = valueString;
					else if (fieldId.equals("txtUserHomePhoneNo"))
						homePhoneNo = valueString;
					else if (fieldId.equals("txtUserHomeAddress"))
						homeAddress = valueString;
				}
			}
	
			User user = ManagerFactory.getInstance().getServiceManager().getUser(txtUserProfileUserId);
	
			if(!imgMyProfile.isEmpty()) {
				for(int i=0; i < imgMyProfile.subList(0, imgMyProfile.size()).size(); i++) {
					Map<String, String> file = imgMyProfile.get(i);
					profileFileId = file.get("fileId");
					profileFileName = file.get("fileName");
					if(user.getPicture()==null || !user.getPicture().equals(profileFileId))
						txtUserProfilePicture = ManagerFactory.getInstance().getDocFileManager().insertProfilesFile(profileFileId);
					user.setPicture(profileFileId);
				}
			}
	
			user.setPassword(pwUserProfilePW);
			user.setLocale(selUserProfileLocale);
			user.setTimeZone(selUserProfileTimeZone);
			user.setMobilePhoneNo(txtUserProfileCellNo);
			user.setCompany(txtUserProfileCompany);
			user.setHomePhoneNo(homePhoneNo);
			user.setHomeAddress(homeAddress);
			try {
				ManagerFactory.getInstance().getServiceManager().setUser(txtUserProfileUserId, user);
	
				UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(user.getId(), user.getPassword());
		        Authentication authentication = authenticationManager.authenticate(authRequest);
		        SecurityContext securityContext = new SecurityContextImpl();
		        securityContext.setAuthentication(authentication);
		        SecurityContextHolder.setContext(securityContext);
		        request.getSession().setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, securityContext);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}catch (Exception e){
			// Exception Handling Required
			e.printStackTrace();
			// Exception Handling Required			
		}
	}
	
	@RequestMapping("/settings_home")
	public ModelAndView settingsHome(HttpServletRequest request, HttpServletResponse response) throws Exception {
		return SmartUtil.returnMnv(request, "settings.jsp", "settings_home.tiles");
	}
	
	@RequestMapping("/userManagement")
	public ModelAndView userManagement(HttpServletRequest request, HttpServletResponse response) {
		return SmartUtil.returnMnv(request, "userManagement.jsp", "userManagement.tiles");
	}

	@RequestMapping("/editUser")
	public ModelAndView editUser(HttpServletRequest request, HttpServletResponse response) {
		return SmartUtil.returnMnv(request, "editUser.jsp", "");
	}

	@RequestMapping(value = "/check_id_duplication", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody void checkIdDuplication(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			User user = ManagerFactory.getInstance().getServiceManager().getUser(request.getParameter("userId"));
			if(user!=null) throw new DuplicateKeyException("duplicateKeyException");
		} catch(Exception e) {
			throw new DuplicateKeyException("duplicateKeyException");
		}
	}
	
	@RequestMapping(value = "/remove_user", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	public void removeUser(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String userId = (String)requestBody.get("userId");
		try{
			ManagerFactory.getInstance().getServiceManager().removeUser(userId);
		}catch (Exception e){e.printStackTrace();}
	}

	@RequestMapping(value = "/set_user", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	public void setUser(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			Map<String, Object> frmMyProfileSetting = (Map<String, Object>)requestBody.get("frmEditUser");
	
			Set<String> keySet = frmMyProfileSetting.keySet();
			Iterator<String> itr = keySet.iterator();
	
			String txtUserProfileUserId = null;
			String txtUserProfileUserName = null;
			String pwUserProfilePW = null;
			String selUserLevel = null;
			String txtUserProfileCompany = null;
			String selUserProfileLocale = null;
			String selUserProfileTimeZone = null;
			String txtUserProfileCellNo = null;
			String homePhoneNo = null, homeAddress = null;
			
			while (itr.hasNext()) {
				String fieldId = (String)itr.next();
				Object fieldValue = frmMyProfileSetting.get(fieldId);
				if(fieldValue instanceof String) {
					String valueString = (String)fieldValue;
					if(fieldId.equals("txtUserProfileUserId"))
						txtUserProfileUserId = valueString;
					else if(fieldId.equals("txtUserProfileUserName"))
						txtUserProfileUserName = valueString;
					else if(fieldId.equals("pwUserProfilePW"))
						pwUserProfilePW = valueString;
					else if (fieldId.equals("selUserProfileUserLevel"))
						selUserLevel = valueString;
					else if(fieldId.equals("txtUserProfileCompany"))
						txtUserProfileCompany = valueString;
					else if(fieldId.equals("selUserProfileLocale"))
						selUserProfileLocale = valueString;
					else if(fieldId.equals("selUserProfileTimeZone"))
						selUserProfileTimeZone = valueString;
					else if(fieldId.equals("txtUserProfileCellNo"))
						txtUserProfileCellNo = valueString;
					else if (fieldId.equals("txtUserHomePhoneNo"))
						homePhoneNo = valueString;
					else if (fieldId.equals("txtUserHomeAddress"))
						homeAddress = valueString;
				}
			}
	
			User user = ManagerFactory.getInstance().getServiceManager().getUser(txtUserProfileUserId);
			if(user==null){
				user = new User();
				user.setId(txtUserProfileUserId);
			}
			user.setName(txtUserProfileUserName);
			user.setPassword(pwUserProfilePW);
			user.setUserLevel(Integer.parseInt(selUserLevel));
			user.setCompany(txtUserProfileCompany);
			user.setLocale(selUserProfileLocale);
			user.setTimeZone(selUserProfileTimeZone);
			user.setMobilePhoneNo(txtUserProfileCellNo);
			user.setCompany(txtUserProfileCompany);
			user.setHomePhoneNo(homePhoneNo);
			user.setHomeAddress(homeAddress);
			try {
				ManagerFactory.getInstance().getServiceManager().setUser(txtUserProfileUserId, user);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}catch (Exception e){
			// Exception Handling Required
			e.printStackTrace();
			// Exception Handling Required			
		}
	}
	
	@RequestMapping(value = "/clone_product_service", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody String cloneProductService(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String psId = request.getParameter("psId");
		String clonedPsId = null;
		User user = SmartUtil.getCurrentUser();
		try {
			ProductService ps = ManagerFactory.getInstance().getServiceManager().getProductService(psId, -1);
			if(ps==null) return null;
			ps.setId(null);
			ps.setCreatedUser(user);
			ps.setCreatedDate(new LocalDate());
			ps.setLastModifiedUser(user);
			ps.setLastModifiedDate(ps.getCreatedDate());			
			ps.setName(SmartMessage.getString("pss.title.copyOf", new String[]{ps.getName()}));
			clonedPsId = ManagerFactory.getInstance().getServiceManager().setProductService(SmartUtil.getCurrentUser().getId(), ps, -1);			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return clonedPsId;
	}
	
	@RequestMapping(value = "/get_unspsc_codes", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody String getUnspscCodes(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String returnString = "";
		
		try {			
			String levelStr = request.getParameter("level");
			String level1 = request.getParameter("level1");
			String level2 = request.getParameter("level2");
			String level3 = request.getParameter("level3");
			int level = Integer.parseInt(levelStr);
			Map<String, String> params = new HashMap<String, String>();
			params.put("level1", level1);
			params.put("level2", level2);
			params.put("level3", level3);
			String[] unspscCodes = DaoFactory.getInstance().getDbDao().getUnspscCodes(level, params);
			if(SmartUtil.isBlankObject(unspscCodes)) return returnString;
			
			for(int i=0; i<unspscCodes.length; i++){
				String code = unspscCodes[i];
				returnString = returnString + "<option value='" + code + "'>" + code + "</option>"; 
			}
		} catch(Exception e){
			e.printStackTrace();
		}
		return returnString;
	}
	
	@RequestMapping(value = "/get_unspsc_names", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody Map<String, String> getUnspscNames(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		Map<String, String> map = new HashMap<String, String>();
		String returnString = "<option value='00'>" + SmartMessage.getString("common.title.none") + "</option>";
		
		try {
			String levelStr = request.getParameter("level");
			String level0Str = request.getParameter("level0");
			String level1 = request.getParameter("level1");
			String level2 = request.getParameter("level2");
			String level3 = request.getParameter("level3");
			int level = Integer.parseInt(levelStr);
			Map<String, String> params = new HashMap<String, String>();
			params.put("level1", level1);
			params.put("level2", level2);
			params.put("level3", level3);
			Db_UnspscName[] unspscNames = DaoFactory.getInstance().getDbDao().getUnspscNames(level, params);
			if(SmartUtil.isBlankObject(unspscNames)) return map;
			int level0 = SmartUtil.isBlankObject(level0Str)?0:Integer.parseInt(level0Str);
			for(int i=0; i<unspscNames.length; i++){
				Db_UnspscName code = unspscNames[i];
				if(level==1 && level0>0 && ProductSpace.getUnspscCode0FromUnspscName(code.getId())!=level0) continue;
				returnString = returnString + "<option value='" + ProductSpace.getUnspscNameCode(code.getId(), level-1) + "'>" + code.getName() + "</option>"; 
			}
		} catch(Exception e){
			e.printStackTrace();
		}
		map.put("data", returnString);
		return map;
	}
	
	@RequestMapping(value = "/get_customer_types", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody Map<String, String> getCustomerTypes(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		Map<String, String> map = new HashMap<String, String>();
		String returnString = "<option value='00'>" + SmartMessage.getString("common.title.none") + "</option>";
		
		try {			
			String levelStr = request.getParameter("level");
			String level1 = request.getParameter("level1");
			String level2 = request.getParameter("level2");
			String level3 = request.getParameter("level3");
			int level = Integer.parseInt(levelStr);
			Map<String, String> params = new HashMap<String, String>();
			params.put("level1", level1);
			params.put("level2", level2);
			params.put("level3", level3);
			Db_CustomerType[] customerTypes = DaoFactory.getInstance().getDbDao().getCustomerTypes(level, params);
			if(SmartUtil.isBlankObject(customerTypes)) return map;			
			for(int i=0; i<customerTypes.length; i++){
				Db_CustomerType code = customerTypes[i];
				returnString = returnString + "<option value='" + CustomerSpace.getCustomerTypeCode(code.getId(), level-1) + "'>" + code.getName() + "</option>"; 
			}
		} catch(Exception e){
			e.printStackTrace();
		}
		map.put("data", returnString);
		return map;
	}
	
	
}
