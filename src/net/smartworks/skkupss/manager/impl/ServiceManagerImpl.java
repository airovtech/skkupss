/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 11. 20.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.skkupss.manager.impl;

import net.smartworks.common.Order;
import net.smartworks.factory.ManagerFactory;
import net.smartworks.skkupss.manager.IServiceManager;
import net.smartworks.skkupss.model.InstanceList;
import net.smartworks.skkupss.model.ProductService;
import net.smartworks.skkupss.model.ProductServiceCond;
import net.smartworks.skkupss.model.RequestParams;
import net.smartworks.skkupss.model.SortingField;


public class ServiceManagerImpl implements IServiceManager {

	@Override
	public InstanceList getProductInstanceList(RequestParams params) throws Exception {

		if (params == null)
			return null;
		
		ProductServiceCond productServiceCond = new ProductServiceCond();

		//ProductService의 name, desc, lastModifiedUser 필드들만 like 검색
		productServiceCond.setSearchKey(params.getSearchKey());

		//PSS_SPACE_VALUE, PSS_SPACE_SERVICE, PSS_SPACE_BIZ_MODEL 3가지중 하나가 항상 전달되며,
		//지정한 SPACE값만 가져다 준다.
		String spaceType = params.getSpaceType();
		
		int totalSize = ManagerFactory.getInstance().getDbManager().getProductServiceWithSelectedSpaceSize("", spaceType, productServiceCond);
		
		int pageSize = params.getPageSize();
		int currentPage = params.getCurrentPage();
		int pagingAction = params.getPagingAction();
		
		if (pageSize != -1) {
			productServiceCond.setPageNo(currentPage);
			productServiceCond.setPageSize(pageSize);
		}

		//ProductService의 ProductService.FILED_NAME, ProductService.FILED_LAST_MODIFIED_USER, ProductService.FILED_LAST_MODIFIED_DATE만 정렬함 
		SortingField sortingField = params.getSortingField();
		if (sortingField != null) {
			String fieldId = sortingField.getFieldId();
			boolean isAsc = sortingField.isAscending();
			Order order = new Order(fieldId, isAsc);
			productServiceCond.setOrders(new Order[]{order});
		}

		ProductService[] productServices = ManagerFactory.getInstance().getDbManager().getProductServiceWithSelectedSpace("", spaceType, productServiceCond);
		
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
	public String setProductService(String userId, ProductService productService) throws Exception {
		ManagerFactory.getInstance().getDbManager().setProductService("", productService);
		return productService.getId();
	}

	@Override
	public void removeProductService(String psId) throws Exception {
		ManagerFactory.getInstance().getDbManager().removeProductService("", psId);
	}

	@Override
	public ProductService getProductService(String psId) throws Exception {

		ProductService productService = ManagerFactory.getInstance().getDbManager().getProductService("", psId);
		return productService;
		
	}


}
