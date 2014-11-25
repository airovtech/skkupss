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
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.smartworks.factory.ManagerFactory;
import net.smartworks.skkupss.model.BizModelSpace;
import net.smartworks.skkupss.model.DefaultSpace;
import net.smartworks.skkupss.model.ProductService;
import net.smartworks.skkupss.model.RequestParams;
import net.smartworks.skkupss.model.ServiceSpace;
import net.smartworks.skkupss.model.SortingField;
import net.smartworks.skkupss.model.ValueSpace;
import net.smartworks.util.ServiceUtil;
import net.smartworks.util.SmartUtil;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PssController {
	
	@RequestMapping("/home")
	public ModelAndView home(HttpServletRequest request, HttpServletResponse response) throws Exception {
		return ServiceUtil.returnMnv(request, "layouts.jsp", "layouts.jsp");
	}
	
	@RequestMapping(value = "/create_product_service", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	public void createProductService(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {

		try{
			
			Map<String, Object> frmNewProductService = (Map<String, Object>)requestBody.get("frmNewProductService");
			if(frmNewProductService == null) return;
			
			ProductService productService = new ProductService();

			productService.setName((String)frmNewProductService.get("txtName"));
			productService.setDesc((String)frmNewProductService.get("txtDesc"));			
			// TODO
			Map<String, Object> psPicture = (Map<String, Object>)frmNewProductService.get("imgPicture");
			// TODO
			
			Map<String, Object> frmSpaceTabs = (Map<String, Object>)requestBody.get("frmSpaceTabs");
			if(frmSpaceTabs!=null){
				productService.setValueSpace(ValueSpace.createValueSpace((Map<String, Object>)frmSpaceTabs.get("" + ProductService.SPACE_TYPE_VALUE)));				
				productService.setProductServiceSpace(DefaultSpace.createDefaultSpace((Map<String, Object>)frmSpaceTabs.get("" + ProductService.SPACE_TYPE_PRODUCT_SERVICE)));
				productService.setProductSpace(DefaultSpace.createDefaultSpace((Map<String, Object>)frmSpaceTabs.get("" + ProductService.SPACE_TYPE_PRODUCT)));
				productService.setServiceSpace(ServiceSpace.createServiceSpace((Map<String, Object>)frmSpaceTabs.get("" + ProductService.SPACE_TYPE_SERVICE)));
				productService.setTouchPointSpace(DefaultSpace.createDefaultSpace((Map<String, Object>)frmSpaceTabs.get("" + ProductService.SPACE_TYPE_TOUCH_POINT)));
				productService.setCustomerSpace(DefaultSpace.createDefaultSpace((Map<String, Object>)frmSpaceTabs.get("" + ProductService.SPACE_TYPE_CUSTOMER)));
				productService.setBizModelSpace(BizModelSpace.createBizModelSpace((Map<String, Object>)frmSpaceTabs.get("" + ProductService.SPACE_TYPE_BIZ_MODEL)));
				productService.setActorSpace(DefaultSpace.createDefaultSpace((Map<String, Object>)frmSpaceTabs.get("" + ProductService.SPACE_TYPE_ACTOR)));
				productService.setSocietySpace(DefaultSpace.createDefaultSpace((Map<String, Object>)frmSpaceTabs.get("" + ProductService.SPACE_TYPE_SOCIETY)));
				productService.setContextSpace(DefaultSpace.createDefaultSpace((Map<String, Object>)frmSpaceTabs.get("" + ProductService.SPACE_TYPE_CONTEXT)));
				productService.setTimeSpace(DefaultSpace.createDefaultSpace((Map<String, Object>)frmSpaceTabs.get("" + ProductService.SPACE_TYPE_TIME)));
				productService.setEnvironmentSpace(DefaultSpace.createDefaultSpace((Map<String, Object>)frmSpaceTabs.get("" + ProductService.SPACE_TYPE_ENVIRONMENT)));
			}
			
			productService.setCreatedDate(new Date());
			productService.setCreatedUser(SmartUtil.getUserId());
			productService.setLastModifiedDate(new Date());
			productService.setLastModifiedUser(SmartUtil.getUserId());
			ManagerFactory.getInstance().getServiceManager().setProductService(SmartUtil.getUserId(), productService, ProductService.SPACE_TYPE_ALL);
			
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
}
