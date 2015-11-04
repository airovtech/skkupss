/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 11. 20.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.skkupss.manager.impl;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.smartworks.common.Order;
import net.smartworks.factory.ManagerFactory;
import net.smartworks.skkupss.manager.IServiceManager;
import net.smartworks.skkupss.model.BizModelSpace;
import net.smartworks.skkupss.model.ContextSpace;
import net.smartworks.skkupss.model.InstanceList;
import net.smartworks.skkupss.model.ProductService;
import net.smartworks.skkupss.model.ProductServiceCond;
import net.smartworks.skkupss.model.ProductSpace;
import net.smartworks.skkupss.model.RequestParams;
import net.smartworks.skkupss.model.ServiceSpace;
import net.smartworks.skkupss.model.SimilarityMatrix;
import net.smartworks.skkupss.model.SortingField;
import net.smartworks.skkupss.model.User;
import net.smartworks.skkupss.model.UserCond;
import net.smartworks.skkupss.model.ValueSpace;
import net.smartworks.skkupss.smcal.SimBizModel;
import net.smartworks.skkupss.smcal.SimContext;
import net.smartworks.skkupss.smcal.SimProduct;
import net.smartworks.skkupss.smcal.SimService;
import net.smartworks.skkupss.smcal.SimValue;
import net.smartworks.util.SmartUtil;

import org.springframework.stereotype.Service;

@Service
public class ServiceManagerImpl implements IServiceManager {

	@Override
	public InstanceList getProductInstanceList(RequestParams params) throws Exception {

		if (params == null)
			return null;
		
		ProductServiceCond productServiceCond = new ProductServiceCond();

		//ProductService�� name, desc, lastModifiedUser �ʵ�鸸 like �˻�
		if(!SmartUtil.isBlankObject(params.getSearchKey())){
				productServiceCond.setSearchKey(params.getSearchKey());
		}else{
			productServiceCond.setSearchKey(null);
			
		}

		//PSS_SPACE_VALUE, PSS_SPACE_SERVICE, PSS_SPACE_BIZ_MODEL, PSS_SPACE_CONTEXT 4������ �ϳ��� �׻� ���޵Ǹ�,
		//������ SPACE���� ������ �ش�.
		String spaceType = params.getSpaceType();
		
		int totalSize = 0;
		try{
			totalSize = ManagerFactory.getInstance().getDbManager().getProductServiceWithSelectedSpaceSize("", spaceType, productServiceCond);
		}catch (Exception e){
			e.printStackTrace();
		}
		
		int pageSize = params.getPageSize();
		int currentPage = params.getCurrentPage();
		int pagingAction = params.getPagingAction();
		
		if (pageSize != -1) {
			productServiceCond.setPageNo(currentPage);
			productServiceCond.setPageSize(pageSize);
		}

		//ProductService�� ProductService.FILED_NAME, ProductService.FILED_LAST_MODIFIED_USER, ProductService.FILED_LAST_MODIFIED_DATE�� ������ 
		SortingField sortingField = params.getSortingField();
		if (sortingField == null) {
			sortingField = new SortingField(ProductService.FIELD_LAST_MODIFIED_DATE, false);
			params.setSortingField(sortingField);
		}
		String fieldId = sortingField.getFieldId();
		boolean isAsc = sortingField.isAscending();
		Order order = new Order(fieldId, isAsc);
		productServiceCond.setOrders(new Order[]{order});

		ProductService[] productServices = null;
		try{
			productServices = ManagerFactory.getInstance().getDbManager().getProductServiceWithSelectedSpace("", spaceType, productServiceCond);
		}catch(Exception e){
			e.printStackTrace();
		}
		
		if (productServices == null || productServices.length == 0)
			return null;
		
		InstanceList result = new InstanceList();
		
		result.setInstanceDatas(productServices);
		result.setSortedField(sortingField);
		result.setPageSize(pageSize);
		
		int totalPages = (int)totalSize % pageSize;
		if(totalPages == 0) {
			totalPages = (int)totalSize / pageSize;
		} else {
			totalPages = (int)totalSize / pageSize + 1;
		}
		result.setTotalPages(totalPages);
		result.setCurrentPage(currentPage);
		result.setTotalSize(totalSize);
		
		return result;
	}

	@Override
	public String setProductService(String userId, ProductService productService, int spaceType) throws Exception {
		return ManagerFactory.getInstance().getDbManager().setProductService(userId, productService);		
	}

	@Override
	public void removeProductService(String psId) throws Exception {
		ManagerFactory.getInstance().getDbManager().removeProductService("", psId);
	}

	@Override
	public ProductService getProductService(String psId, int spaceType) throws Exception {

		ProductService productService = ManagerFactory.getInstance().getDbManager().getProductService("", psId);
		return productService;
		
	}

	@Override
	public RequestParams setInstanceListParams(Map<String, Object> requestBody, HttpServletRequest request) throws Exception {

		try{
			RequestParams requestParams = new RequestParams();
			
			String isUserMode = (String)requestBody.get("isUserMode");
	
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

			List<Map<String, Object>> frmSearchFilters = (ArrayList<Map<String, Object>>)requestBody.get("frmSearchFilters");

			return requestParams;
		}catch (Exception e){
			// Exception Handling Required
			e.printStackTrace();
			return null;			
			// Exception Handling Required			
		}
	}

	@Override
	public SimilarityMatrix[][] caculatePsSimilarities(String[] psIds, String[] psNames, String spaceType) throws Exception {
		SimilarityMatrix[][] psSimilarities = null;
		
		try{
			ProductService[] productServices = ManagerFactory.getInstance().getDbManager().getProductServiceWithSelectedSpace(SmartUtil.getCurrentUser().getId(), spaceType, psIds);
			if(SmartUtil.isBlankObject(productServices)) return null;
			
			psSimilarities = new SimilarityMatrix[productServices.length][productServices.length];
			
			for(int i=0; i<productServices.length; i++){
				for(int j=0; j<productServices.length; j++){		
					SimilarityMatrix sm = new SimilarityMatrix();
					sm.setSpaceType(ProductService.getSpaceType(spaceType));
					sm.setSourcePsId(productServices[i].getId());
					sm.setTargetPsId(productServices[j].getId());
					sm.setSourcePsName(productServices[i].getName());
					sm.setTargetPsName(productServices[j].getName());

					ProductService source = productServices[i];
					ProductService target = productServices[j];

					ValueSpace sourceValue = source.getValueSpace();
					ValueSpace targetValue = target.getValueSpace();
					ProductSpace sourceProduct = source.getProductSpace();
					ProductSpace targetProduct = target.getProductSpace();
					ServiceSpace sourceService = source.getServiceSpace();
					ServiceSpace targetService = target.getServiceSpace();
					BizModelSpace sourceBizModel = source.getBizModelSpace();
					BizModelSpace targetBizModel = target.getBizModelSpace();
					ContextSpace sourceContext = source.getContextSpace();
					ContextSpace targetContext = target.getContextSpace();
					
					switch(ProductService.getSpaceType(spaceType)){
					case ProductService.SPACE_TYPE_VALUE:
						if(!SmartUtil.isBlankObject(sourceValue) && !SmartUtil.isBlankObject(targetValue))
							sm.setSimilarity((new SimValue(sourceValue.getNumOfValues(), sourceValue.getValues(), targetValue.getNumOfValues(), targetValue.getValues())).calculateSimularity());
						break;
					case ProductService.SPACE_TYPE_PRODUCT:
						if(!SmartUtil.isBlankObject(sourceProduct) && !SmartUtil.isBlankObject(targetProduct))
							sm.setSimilarity((new SimProduct(sourceProduct.getUnspsc(), targetProduct.getUnspsc())).calculateSimularity());
						break;
					case ProductService.SPACE_TYPE_SERVICE:
						if(!SmartUtil.isBlankObject(sourceService) && !SmartUtil.isBlankObject(targetService))
							sm.setSimilarity((new SimService(sourceService.getNumOfActs(), sourceService.getValues(), targetService.getNumOfActs(), targetService.getValues())).calculateSimularity());
						break;
					case ProductService.SPACE_TYPE_BIZ_MODEL:
						if(!SmartUtil.isBlankObject(sourceBizModel) && !SmartUtil.isBlankObject(targetBizModel))
							sm.setSimilarity((new SimBizModel(sourceBizModel.getNumOfStrategies(), sourceBizModel.getStrategies(), targetBizModel.getNumOfStrategies(), targetBizModel.getStrategies())).calculateSimularity());
						break;
					case ProductService.SPACE_TYPE_CONTEXT:
						if(!SmartUtil.isBlankObject(sourceContext) && !SmartUtil.isBlankObject(targetContext)){
		        	        float resultAB = (new SimContext()).measureSimilarityAB(sourceContext.getSimGraph(), targetContext.getSimGraph());
		        	        float resultBC = (new SimContext()).measureSimilarityBC(sourceContext.getSimGraph(), targetContext.getSimGraph());
		        	        float resultAC = (new SimContext()).measureSimilarityAC(sourceContext.getSimGraph(), targetContext.getSimGraph());		        	        
		        	        float result = (resultAB+resultBC+resultAC)/3;
							sm.setSimilarity(result);
						}
						break;
					case ProductService.SPACE_TYPE_VALUE_SERVICE:
						if(!SmartUtil.isBlankObject(sourceValue) && !SmartUtil.isBlankObject(targetValue)
							&& !SmartUtil.isBlankObject(sourceService) && !SmartUtil.isBlankObject(targetService))
							sm.setSimilarity(
									((new SimValue(sourceValue.getNumOfValues(), sourceValue.getValues(), targetValue.getNumOfValues(), targetValue.getValues())).calculateSimularity()
									+(new SimService(sourceService.getNumOfActs(), sourceService.getValues(), targetService.getNumOfActs(), targetService.getValues())).calculateSimularity())/2);
						break;
					case ProductService.SPACE_TYPE_VALUE_BIZ_MODEL:
						if(!SmartUtil.isBlankObject(sourceValue) && !SmartUtil.isBlankObject(targetValue)
							&& !SmartUtil.isBlankObject(sourceBizModel) && !SmartUtil.isBlankObject(targetBizModel))
							sm.setSimilarity(
									((new SimValue(sourceValue.getNumOfValues(), sourceValue.getValues(), targetValue.getNumOfValues(), targetValue.getValues())).calculateSimularity()
									+(new SimBizModel(sourceBizModel.getNumOfStrategies(), sourceBizModel.getStrategies(), targetBizModel.getNumOfStrategies(), targetBizModel.getStrategies())).calculateSimularity())/2);
						break;
					case ProductService.SPACE_TYPE_SERVICE_BIZ_MODEL:
						if(!SmartUtil.isBlankObject(sourceService) && !SmartUtil.isBlankObject(targetService)
							&& !SmartUtil.isBlankObject(sourceBizModel) && !SmartUtil.isBlankObject(targetBizModel))
							sm.setSimilarity(
									((new SimService(sourceService.getNumOfActs(), sourceService.getValues(), targetService.getNumOfActs(), targetService.getValues())).calculateSimularity()
									+(new SimBizModel(sourceBizModel.getNumOfStrategies(), sourceBizModel.getStrategies(), targetBizModel.getNumOfStrategies(), targetBizModel.getStrategies())).calculateSimularity())/2);
						break;
					case ProductService.SPACE_TYPE_VALUE_SERVICE_BIZ_MODEL:
						if(!SmartUtil.isBlankObject(sourceValue) && !SmartUtil.isBlankObject(targetValue)
							&& !SmartUtil.isBlankObject(sourceService) && !SmartUtil.isBlankObject(targetService)
							&& !SmartUtil.isBlankObject(sourceBizModel) && !SmartUtil.isBlankObject(targetBizModel))
							sm.setSimilarity(
									((new SimValue(sourceValue.getNumOfValues(), sourceValue.getValues(), targetValue.getNumOfValues(), targetValue.getValues())).calculateSimularity()
									+(new SimService(sourceService.getNumOfActs(), sourceValue.getValues(), targetService.getNumOfActs(), targetService.getValues())).calculateSimularity()
									+(new SimBizModel(sourceBizModel.getNumOfStrategies(), sourceBizModel.getStrategies(), targetBizModel.getNumOfStrategies(), targetBizModel.getStrategies())).calculateSimularity())/3);
						break;
					}
					psSimilarities[i][j] = sm;
				}
			}
		}catch (Exception e){
			e.printStackTrace();
		}
		
		return psSimilarities;
	}

	@Override
	public String getProductServicePicture(String userId, String psId) throws Exception {
		String picture = ManagerFactory.getInstance().getDbManager().getProductServicePicture(userId, psId);
		return picture;
	}
	
	@Override
	public InstanceList getUserInstanceList(RequestParams params) throws Exception {

		if (params == null)
			return null;
		
		UserCond userCond = new UserCond();

		if(!SmartUtil.isBlankObject(params.getSearchKey())){
			userCond.setSearchKey(params.getSearchKey());
		}else{
			userCond.setSearchKey(null);
			
		}

		String spaceType = params.getSpaceType();
		
		int totalSize = 0;
		try{
			totalSize = ManagerFactory.getInstance().getDbManager().getUserSize("", userCond);
		}catch (Exception e){
			e.printStackTrace();
		}
		
		int pageSize = params.getPageSize();
		int currentPage = params.getCurrentPage();
		int pagingAction = params.getPagingAction();
		
		if (pageSize != -1) {
			userCond.setPageNo(currentPage);
			userCond.setPageSize(pageSize);
		}

		SortingField sortingField = params.getSortingField();
		if (sortingField == null) {
			sortingField = new SortingField("modifiedTime", false);
			params.setSortingField(sortingField);
		}
		String fieldId = sortingField.getFieldId();
		boolean isAsc = sortingField.isAscending();
		Order order = new Order(fieldId, isAsc);
		userCond.setOrders(new Order[]{order});

		User[] users = null;
		try{
			users = ManagerFactory.getInstance().getDbManager().getUsers("", userCond);
		}catch(Exception e){
			e.printStackTrace();
		}
				
		InstanceList result = new InstanceList();
		if (users == null || users.length == 0)
			return result;
		
		result.setInstanceDatas(users);
		result.setSortedField(sortingField);
		result.setPageSize(pageSize);
		
		
		int totalPages = (int)totalSize % pageSize;
		if(totalPages == 0) {
			totalPages = (int)totalSize / pageSize;
		} else {
			totalPages = (int)totalSize / pageSize + 1;
		}
		result.setTotalPages(totalPages);
		result.setCurrentPage(currentPage);
		result.setTotalSize(totalSize);
		
		return result;
	}

	@Override
	public String setUser(String userId, User user) throws Exception {
		ManagerFactory.getInstance().getDbManager().setUser("", user);
		return user.getId();
	}

	@Override
	public void removeUser(String userId) throws Exception {
		ManagerFactory.getInstance().getDbManager().removeUser("", userId);
	}

	@Override
	public User getUser(String userId) throws Exception {

		User user = ManagerFactory.getInstance().getDbManager().getUser("", userId);
		return user;
		
	}

}
