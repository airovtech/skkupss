/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 11. 20.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.skkupss.dao.impl;

import net.smartworks.skkupss.dao.IDbDao;
import net.smartworks.skkupss.model.db.Db_BizModelSpace;
import net.smartworks.skkupss.model.db.Db_BizModelSpaceCond;
import net.smartworks.skkupss.model.db.Db_ProductService;
import net.smartworks.skkupss.model.db.Db_ProductServiceCond;
import net.smartworks.skkupss.model.db.Db_ServiceSpace;
import net.smartworks.skkupss.model.db.Db_ServiceSpaceCond;
import net.smartworks.skkupss.model.db.Db_ValueSpace;
import net.smartworks.skkupss.model.db.Db_ValueSpaceCond;

public class DbDaoImpl implements IDbDao {

	@Override
	public Db_ProductService getProductService(String userId, String id)
			throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setProductService(String userId,
			Db_ProductService productService) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeProductService(String userId, String id) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Db_ProductService[] getProductServices(String userId,
			Db_ProductServiceCond cond) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Db_ValueSpace getValueSpace(String userId, String id)
			throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setValueSpace(String userId, Db_ValueSpace valueSpace)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeValueSpace(String userId, String id) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Db_ValueSpace[] getValueSpaces(String userId, Db_ValueSpaceCond cond)
			throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Db_ServiceSpace getServiceSpace(String userId, String id)
			throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setServiceSpace(String userId, Db_ServiceSpace serviceSpace)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeServiceSpace(String userId, String id) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Db_ServiceSpace[] getServiceSpaces(String userId,
			Db_ServiceSpaceCond cond) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Db_BizModelSpace getBizModelSpace(String userId, String id)
			throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setBizModelSpace(String userId, Db_BizModelSpace bizModelSpace)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeBizModelSpace(String userId, String id) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Db_BizModelSpace[] getBizModelSpace(String userId,
			Db_BizModelSpaceCond cond) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
