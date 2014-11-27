/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 11. 20.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.skkupss.dao;

import net.smartworks.skkupss.model.db.Db_BizModelSpace;
import net.smartworks.skkupss.model.db.Db_BizModelSpaceCond;
import net.smartworks.skkupss.model.db.Db_ProductService;
import net.smartworks.skkupss.model.db.Db_ProductServiceCond;
import net.smartworks.skkupss.model.db.Db_ServiceSpace;
import net.smartworks.skkupss.model.db.Db_ServiceSpaceCond;
import net.smartworks.skkupss.model.db.Db_ValueSpace;
import net.smartworks.skkupss.model.db.Db_ValueSpaceCond;

public interface IDbDao {
	
	public int getProductServiceWithSelectedSpaceSize(String userId, String spaceType, Db_ProductServiceCond cond) throws Exception;
	public Db_ProductService[] getProductServiceWithSelectedSpace(String userId, String spaceType, Db_ProductServiceCond cond) throws Exception;

	public Db_ProductService getProductService(String userId, String id) throws Exception;
	public String setProductService(String userId, Db_ProductService productService) throws Exception;
	public void removeProductService(String userId, String id) throws Exception;
	public Db_ProductService[] getProductServices(String userId, Db_ProductServiceCond cond) throws Exception;
	
	public String getProductServicePicture(String userId, String psId) throws Exception;
	
	public Db_ValueSpace getValueSpace(String userId, String id) throws Exception;
	public void setValueSpace(String userId, Db_ValueSpace valueSpace) throws Exception;
	public void removeValueSpace(String userId, String id) throws Exception;
	public void removeValueSpaceByProductId(String userId, String productId) throws Exception;
	public Db_ValueSpace[] getValueSpaces(String userId, Db_ValueSpaceCond cond) throws Exception;

	public Db_ServiceSpace getServiceSpace(String userId, String id) throws Exception;
	public void setServiceSpace(String userId, Db_ServiceSpace serviceSpace) throws Exception;
	public void removeServiceSpace(String userId, String id) throws Exception;
	public void removeServiceSpaceByProductId(String userId, String productId) throws Exception;
	public Db_ServiceSpace[] getServiceSpaces(String userId, Db_ServiceSpaceCond cond) throws Exception;
	
	public Db_BizModelSpace getBizModelSpace(String userId, String id) throws Exception;
	public void setBizModelSpace(String userId, Db_BizModelSpace bizModelSpace) throws Exception;
	public void removeBizModelSpace(String userId, String id) throws Exception;
	public void removeBizModelSpaceByProductId(String userId, String productId) throws Exception;
	public Db_BizModelSpace[] getBizModelSpaces(String userId, Db_BizModelSpaceCond cond) throws Exception;
	
}
