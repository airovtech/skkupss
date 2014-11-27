/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 11. 20.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.skkupss.dao.impl;

import java.util.List;

import net.smartworks.factory.SessionFactory;
import net.smartworks.skkupss.dao.IDbDao;
import net.smartworks.skkupss.model.ProductService;
import net.smartworks.skkupss.model.db.Db_BizModelSpace;
import net.smartworks.skkupss.model.db.Db_BizModelSpaceCond;
import net.smartworks.skkupss.model.db.Db_ProductService;
import net.smartworks.skkupss.model.db.Db_ProductServiceCond;
import net.smartworks.skkupss.model.db.Db_ServiceSpace;
import net.smartworks.skkupss.model.db.Db_ServiceSpaceCond;
import net.smartworks.skkupss.model.db.Db_ValueSpace;
import net.smartworks.skkupss.model.db.Db_ValueSpaceCond;
import net.smartworks.util.IdUtil;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

public class DbDaoImpl implements IDbDao {

	@Override
	public int getProductServiceWithSelectedSpaceSize(String userId, String spaceType, Db_ProductServiceCond cond) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			
			String selectId = "getProductServiceSize";
			if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_VALUE)) {
				selectId = "getProductServiceWithValueSpaceSize";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_SERVICE)) {
				selectId = "getProductServiceWithServiceSpaceSize";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_BIZ_MODEL)) {
				selectId = "getProductServiceWithBizModelSpaceSize";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_VALUE_SERVICE)) {
				selectId = "getProductServiceWithValueServiceSpaceSize";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_VALUE_BIZ_MODEL)) {
				selectId = "getProductServiceWithValueBizModelSpaceSize";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_SERVICE_BIZ_MODEL)) {
				selectId = "getProductServiceWithServiceBizModelSpaceSize";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_VALUE_SERVICE_BIZ_MODEL)) {
				selectId = "getProductServiceWithValueServiceBizModelSpaceSize";
			}
			
			int totalSize = session.selectOne(selectId, cond);
			
			return totalSize;
		} catch (Exception e) {
			throw e;
		} finally {
			if (session != null)
				session.close();
		}
	}
	
	@Override
	public Db_ProductService[] getProductServiceWithSelectedSpace(String userId, String spaceType, Db_ProductServiceCond cond) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			
			RowBounds Rb = null;
			if (cond.getPageSize() != -1) {
				int pageNo = cond.getPageNo();
				int pageSize = cond.getPageSize();
				int startPage = (pageNo - 1) * pageSize;
				Rb = new RowBounds(startPage, pageSize);
			} else {
				Rb = new RowBounds();
			}
			
			String selectId = "getProductService";
			if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_VALUE)) {
				selectId = "getProductServiceWithValueSpace";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_SERVICE)) {
				selectId = "getProductServiceWithServiceSpace";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_BIZ_MODEL)) {
				selectId = "getProductServiceWithBizModelSpace";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_VALUE_SERVICE)) {
				selectId = "getProductServiceWithValueServiceSpace";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_VALUE_BIZ_MODEL)) {
				selectId = "getProductServiceWithValueBizModelSpace";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_SERVICE_BIZ_MODEL)) {
				selectId = "getProductServiceWithServiceBizModelSpace";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_VALUE_SERVICE_BIZ_MODEL)) {
				selectId = "getProductServiceWithValueServiceBizModelSpace";
			}
			
			List<Db_ProductService> productServiceList = session.selectList(selectId, cond, Rb);
			if (productServiceList != null && productServiceList.size() != 0) {
				Db_ProductService[] result = new Db_ProductService[productServiceList.size()];
				productServiceList.toArray(result);
				return result;
			} else {
				return null;
			}
		} catch (Exception e) {
			throw e;
		} finally {
			if (session != null)
				session.close();
		}	
	}
	
	@Override
	public Db_ProductService getProductService(String userId, String id) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			Db_ProductServiceCond productServiceCond = new Db_ProductServiceCond();
			productServiceCond.setId(id);
			Db_ProductService productService = session.selectOne("getProductService", productServiceCond);
			return productService;
		} catch (Exception e) {
			throw e;
		} finally {
			if (session != null)
				session.close();
		}		
	}

	@Override
	public String setProductService(String userId, Db_ProductService productService) throws Exception {
		SqlSession session = null;
		try {
			if (productService == null)
				return null;
			
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			session.commit(false);
			
			if (productService.getId() == null) {
				productService.setId(IdUtil.getInstance().generate());
			} else {
				session.delete("removeProductService", productService.getId());
			}
			
			session.insert("setProductService", productService);
			session.commit();
			
			return productService.getId();
			
		} catch (Exception e) {
			session.rollback();
			throw e;
		} finally {
			if (session != null)
				session.close();
		}		
	}

	@Override
	public void removeProductService(String userId, String id) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			session.commit(false);
			session.delete("removeProductService", id);
			session.commit();
		} catch (Exception e) {
			session.rollback();
			throw e;
		} finally {
			if (session != null)
				session.close();
		}		
	}
	
	@Override
	public Db_ProductService[] getProductServices(String userId, Db_ProductServiceCond cond) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			
			RowBounds Rb = null;
			if (cond.getPageSize() != -1) {
				int pageNo = cond.getPageNo();
				int pageSize = cond.getPageSize();
				int startPage = (pageNo - 1) * pageSize;
				Rb = new RowBounds(startPage, pageSize);
			} else {
				Rb = new RowBounds();
			}
			
			List<Db_ProductService> productServiceList = session.selectList("getProductService", cond, Rb);
			if (productServiceList != null && productServiceList.size() != 0) {
				Db_ProductService[] result = new Db_ProductService[productServiceList.size()];
				productServiceList.toArray(result);
				return result;
			} else {
				return null;
			}
		} catch (Exception e) {
			throw e;
		} finally {
			if (session != null)
				session.close();
		}		
	}

	@Override
	public String getProductServicePicture(String userId, String psId) throws Exception {

		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			
			String picture = session.selectOne("getProductServicePicture", psId);
			
			return picture;
		} catch (Exception e) {
			throw e;
		} finally {
			if (session != null)
				session.close();
		}
	}
	
	@Override
	public Db_ValueSpace getValueSpace(String userId, String id) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			Db_ValueSpaceCond valueSpaceCond = new Db_ValueSpaceCond();
			valueSpaceCond.setId(id);
			Db_ValueSpace valueSpace = session.selectOne("getValueSpace", valueSpaceCond);
			return valueSpace;
		} catch (Exception e) {
			throw e;
		} finally {
			if (session != null)
				session.close();
		}	
	}

	@Override
	public void setValueSpace(String userId, Db_ValueSpace valueSpace) throws Exception {
		
		SqlSession session = null;
		try {
			if (valueSpace == null)
				return;
			
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			session.commit(false);
			
			if (valueSpace.getId() == null) {
				valueSpace.setId(IdUtil.getInstance().generate());
				if (valueSpace.getPsId() != null)
					session.delete("removeValueSpaceByProductId", valueSpace.getPsId());
			} else {
				session.delete("removeValueSpace", valueSpace.getId());
			}
			
			session.insert("setValueSpace", valueSpace);
			session.commit();
		} catch (Exception e) {
			session.rollback();
			throw e;
		} finally {
			if (session != null)
				session.close();
		}		
	}

	@Override
	public void removeValueSpace(String userId, String id) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			session.commit(false);
			session.delete("removeValueSpace", id);
			session.commit();
		} catch (Exception e) {
			session.rollback();
			throw e;
		} finally {
			if (session != null)
				session.close();
		}		
	}

	@Override
	public void removeValueSpaceByProductId(String userId, String productId) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			session.commit(false);
			session.delete("removeValueSpaceByProductId", productId);
			session.commit();
		} catch (Exception e) {
			session.rollback();
			throw e;
		} finally {
			if (session != null)
				session.close();
		}		
	}

	@Override
	public Db_ValueSpace[] getValueSpaces(String userId, Db_ValueSpaceCond cond) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			
			RowBounds Rb = null;
			if (cond.getPageSize() != -1) {
				int pageNo = cond.getPageNo();
				int pageSize = cond.getPageSize();
				int startPage = (pageNo - 1) * pageSize;
				Rb = new RowBounds(startPage, pageSize);
			} else {
				Rb = new RowBounds();
			}
			
			List<Db_ValueSpace> valueSpaceList = session.selectList("getValueSpace", cond, Rb);
			if (valueSpaceList != null && valueSpaceList.size() != 0) {
				Db_ValueSpace[] result = new Db_ValueSpace[valueSpaceList.size()];
				valueSpaceList.toArray(result);
				return result;
			} else {
				return null;
			}
		} catch (Exception e) {
			throw e;
		} finally {
			if (session != null)
				session.close();
		}		
	}

	@Override
	public Db_ServiceSpace getServiceSpace(String userId, String id) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			Db_ServiceSpace serviceSpaceCond = new Db_ServiceSpace();
			serviceSpaceCond.setId(id);
			Db_ServiceSpace serviceSpace = session.selectOne("getServiceSpace", serviceSpaceCond);
			return serviceSpace;
		} catch (Exception e) {
			throw e;
		} finally {
			if (session != null)
				session.close();
		}	
	}

	@Override
	public void setServiceSpace(String userId, Db_ServiceSpace serviceSpace) throws Exception {
		SqlSession session = null;
		try {
			if (serviceSpace == null)
				return;
			
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			session.commit(false);
			
			if (serviceSpace.getId() == null) {
				serviceSpace.setId(IdUtil.getInstance().generate());
				if (serviceSpace.getPsId() != null)
					session.delete("removeServiceSpaceByProductId", serviceSpace.getPsId());
			} else {
				session.delete("removeServiceSpace", serviceSpace.getId());
			}
			
			session.insert("setServiceSpace", serviceSpace);
			session.commit();
		} catch (Exception e) {
			session.rollback();
			throw e;
		} finally {
			if (session != null)
				session.close();
		}		
	}

	@Override
	public void removeServiceSpace(String userId, String id) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			session.commit(false);
			session.delete("removeServiceSpace", id);
			session.commit();
		} catch (Exception e) {
			session.rollback();
			throw e;
		} finally {
			if (session != null)
				session.close();
		}		
	}
	@Override
	public void removeServiceSpaceByProductId(String userId, String productId) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			session.commit(false);
			session.delete("removeServiceSpaceByProductId", productId);
			session.commit();
		} catch (Exception e) {
			session.rollback();
			throw e;
		} finally {
			if (session != null)
				session.close();
		}		
	}

	@Override
	public Db_ServiceSpace[] getServiceSpaces(String userId, Db_ServiceSpaceCond cond) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			
			RowBounds Rb = null;
			if (cond.getPageSize() != -1) {
				int pageNo = cond.getPageNo();
				int pageSize = cond.getPageSize();
				int startPage = (pageNo - 1) * pageSize;
				Rb = new RowBounds(startPage, pageSize);
			} else {
				Rb = new RowBounds();
			}
			
			List<Db_ServiceSpace> serviceSpaceList = session.selectList("getServiceSpace", cond, Rb);
			if (serviceSpaceList != null && serviceSpaceList.size() != 0) {
				Db_ServiceSpace[] result = new Db_ServiceSpace[serviceSpaceList.size()];
				serviceSpaceList.toArray(result);
				return result;
			} else {
				return null;
			}
		} catch (Exception e) {
			throw e;
		} finally {
			if (session != null)
				session.close();
		}		
	}

	@Override
	public Db_BizModelSpace getBizModelSpace(String userId, String id) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			Db_BizModelSpace bizModelSpaceCond = new Db_BizModelSpace();
			bizModelSpaceCond.setId(id);
			Db_BizModelSpace bizModelSpace = session.selectOne("getBizModelSpace", bizModelSpaceCond);
			return bizModelSpace;
		} catch (Exception e) {
			throw e;
		} finally {
			if (session != null)
				session.close();
		}	
	}

	@Override
	public void setBizModelSpace(String userId, Db_BizModelSpace bizModelSpace) throws Exception {
		SqlSession session = null;
		try {
			if (bizModelSpace == null)
				return;
			
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			session.commit(false);
			
			if (bizModelSpace.getId() == null) {
				bizModelSpace.setId(IdUtil.getInstance().generate());
				if (bizModelSpace.getPsId() != null)
					session.delete("removeBizModelSpaceByProductId", bizModelSpace.getPsId());
			} else {
				session.delete("removeBizModelSpace", bizModelSpace.getId());
			}
			
			session.insert("setBizModelSpace", bizModelSpace);
			session.commit();
		} catch (Exception e) {
			session.rollback();
			throw e;
		} finally {
			if (session != null)
				session.close();
		}		
	}

	@Override
	public void removeBizModelSpace(String userId, String id) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			session.commit(false);
			session.delete("removeBizModelSpace", id);
			session.commit();
		} catch (Exception e) {
			session.rollback();
			throw e;
		} finally {
			if (session != null)
				session.close();
		}		
	}
	@Override
	public void removeBizModelSpaceByProductId(String userId, String productId) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			session.commit(false);
			session.delete("removeBizModelSpaceByProductId", productId);
			session.commit();
		} catch (Exception e) {
			session.rollback();
			throw e;
		} finally {
			if (session != null)
				session.close();
		}		
	}

	@Override
	public Db_BizModelSpace[] getBizModelSpaces(String userId, Db_BizModelSpaceCond cond) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			
			RowBounds Rb = null;
			if (cond.getPageSize() != -1) {
				int pageNo = cond.getPageNo();
				int pageSize = cond.getPageSize();
				int startPage = (pageNo - 1) * pageSize;
				Rb = new RowBounds(startPage, pageSize);
			} else {
				Rb = new RowBounds();
			}
			
			List<Db_BizModelSpace> bizModelSpaceList = session.selectList("getBizModelSpace", cond, Rb);
			if (bizModelSpaceList != null && bizModelSpaceList.size() != 0) {
				Db_BizModelSpace[] result = new Db_BizModelSpace[bizModelSpaceList.size()];
				bizModelSpaceList.toArray(result);
				return result;
			} else {
				return null;
			}
		} catch (Exception e) {
			throw e;
		} finally {
			if (session != null)
				session.close();
		}		
	}

}
