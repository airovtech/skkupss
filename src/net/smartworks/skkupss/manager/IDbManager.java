/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 11. 20.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.skkupss.manager;

import net.smartworks.skkupss.model.BizModelSpace;
import net.smartworks.skkupss.model.BizModelSpaceCond;
import net.smartworks.skkupss.model.ProductService;
import net.smartworks.skkupss.model.ProductServiceCond;
import net.smartworks.skkupss.model.ServiceSpace;
import net.smartworks.skkupss.model.ServiceSpaceCond;
import net.smartworks.skkupss.model.ValueSpace;
import net.smartworks.skkupss.model.ValueSpaceCond;

public interface IDbManager {

	public ProductService getProductService(String userId, String id) throws Exception;
	public void setProductService(String userId, ProductService productService) throws Exception;
	public void removeProductService(String userId, String id) throws Exception;
	public ProductService[] getProductServices(String userId, ProductServiceCond cond) throws Exception;
	
	public ValueSpace getValueSpace(String userId, String id) throws Exception;
	public void setValueSpace(String userId, ValueSpace valueSpace) throws Exception;
	public void removeValueSpace(String userId, String id) throws Exception;
	public ValueSpace[] getValueSpaces(String userId, ValueSpaceCond cond) throws Exception;
	
	public ServiceSpace getServiceSpace(String userId, String id) throws Exception;
	public void setServiceSpace(String userId, ServiceSpace serviceSpace) throws Exception;
	public void removeServiceSpace(String userId, String id) throws Exception;
	public ServiceSpace[] getServiceSpaces(String userId, ServiceSpaceCond cond) throws Exception;
	
	public BizModelSpace getBizModelSpace(String userId, String id) throws Exception;
	public void setBizModelSpace(String userId, BizModelSpace bizModelSpace) throws Exception;
	public void removeBizModelSpace(String userId, String id) throws Exception;
	public BizModelSpace[] getBizModelSpace(String userId, BizModelSpaceCond cond) throws Exception;
	
}
