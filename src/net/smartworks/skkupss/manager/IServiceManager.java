/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 11. 20.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.skkupss.manager;

import net.smartworks.skkupss.model.InstanceList;
import net.smartworks.skkupss.model.ProductService;
import net.smartworks.skkupss.model.RequestParams;

public interface IServiceManager {

	public InstanceList getProductInstanceList(RequestParams params) throws Exception;
	
	public String setProductService(String userId, ProductService productService) throws Exception;
	
	public void removeProductService(String psId) throws Exception;
	
	public ProductService getProductService(String psId) throws Exception;
	
}
