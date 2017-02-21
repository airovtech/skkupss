/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 11. 20.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.skkupss.dao.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.smartworks.factory.SessionFactory;
import net.smartworks.skkupss.dao.IDbDao;
import net.smartworks.skkupss.model.ProductService;
import net.smartworks.skkupss.model.SBPService;
import net.smartworks.skkupss.model.db.Db_BizModelSpace;
import net.smartworks.skkupss.model.db.Db_BizModelSpaceCond;
import net.smartworks.skkupss.model.db.Db_CustomerType;
import net.smartworks.skkupss.model.db.Db_ProductService;
import net.smartworks.skkupss.model.db.Db_ProductServiceCond;
import net.smartworks.skkupss.model.db.Db_ServiceSpace;
import net.smartworks.skkupss.model.db.Db_ServiceSpaceCond;
import net.smartworks.skkupss.model.db.Db_UnspscName;
import net.smartworks.skkupss.model.db.Db_User;
import net.smartworks.skkupss.model.db.Db_UserCond;
import net.smartworks.skkupss.model.db.Db_ValueSpace;
import net.smartworks.skkupss.model.db.Db_ValueSpaceCond;
import net.smartworks.util.IDCreator;
import net.smartworks.util.IdUtil;
import net.smartworks.util.SmartMessage;
import net.smartworks.util.SmartUtil;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import antlr.StringUtils;

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
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_CONTEXT)) {
				selectId = "getProductServiceWithContextSpaceSize";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_VALUE_SERVICE)) {
				selectId = "getProductServiceWithValueServiceSpaceSize";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_VALUE_BIZ_MODEL)) {
				selectId = "getProductServiceWithValueBizModelSpaceSize";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_SERVICE_BIZ_MODEL)) {
				selectId = "getProductServiceWithServiceBizModelSpaceSize";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_VALUE_SERVICE_BIZ_MODEL)) {
				selectId = "getProductServiceWithValueServiceBizModelSpaceSize";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_PRODUCT_SERVICE)) {
				selectId = "getProductServiceWithProductServiceSpaceSize";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_PRODUCT)) {
				selectId = "getProductServiceWithProductSpaceSize";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_TOUCH_POINT)) {
				selectId = "getProductServiceWithTouchPointSpaceSize";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_CUSTOMER)) {
				selectId = "getProductServiceWithCustomerSpaceSize";
			} else if (spaceType != null && (spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_ACTOR) || spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_ACTOR_CVCA))) {
				selectId = "getProductServiceWithActorSpaceSize";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_SOCIETY)) {
				selectId = "getProductServiceWithSocietySpaceSize";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_CONTEXT)) {
				selectId = "getProductServiceWithContextSpaceSize";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_TIME)) {
				selectId = "getProductServiceWithTimeSpaceSize";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_ENVIRONMENT)) {
				selectId = "getProductServiceWithEnvironmentSpaceSize";
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
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_CONTEXT)) {
				selectId = "getProductServiceWithContextSpace";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_VALUE_SERVICE)) {
				selectId = "getProductServiceWithValueServiceSpace";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_VALUE_BIZ_MODEL)) {
				selectId = "getProductServiceWithValueBizModelSpace";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_SERVICE_BIZ_MODEL)) {
				selectId = "getProductServiceWithServiceBizModelSpace";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_VALUE_SERVICE_BIZ_MODEL)) {
				selectId = "getProductServiceWithValueServiceBizModelSpace";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_PRODUCT_SERVICE)) {
				selectId = "getProductServiceWithProductServiceSpace";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_PRODUCT)) {
				selectId = "getProductServiceWithProductSpace";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_TOUCH_POINT)) {
				selectId = "getProductServiceWithTouchPointSpace";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_CUSTOMER)) {
				selectId = "getProductServiceWithCustomerSpace";
			} else if (spaceType != null && (spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_ACTOR) || spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_ACTOR_CVCA))) {
				selectId = "getProductServiceWithActorSpace";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_SOCIETY)) {
				selectId = "getProductServiceWithSocietySpace";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_CONTEXT)) {
				selectId = "getProductServiceWithContextSpace";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_TIME)) {
				selectId = "getProductServiceWithTimeSpace";
			} else if (spaceType != null && spaceType.equalsIgnoreCase(ProductService.PSS_SPACE_ENVIRONMENT)) {
				selectId = "getProductServiceWithEnvironmentSpace";
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

	@Override
	public Db_User getUser(String userId, String id) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			Db_User user = session.selectOne("getUser", id);
			return user;
		} catch (Exception e) {
			throw e;
		} finally {
			if (session != null)
				session.close();
		}	
	}

	@Override
	public String setUser(String userId, Db_User user) throws Exception {
		SqlSession session = null;
		try {
			if (user == null)
				return null;
			
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			session.commit(false);
			
			if (user.getId() == null) {
				user.setId(IdUtil.getInstance().generate());
			} else {
				session.delete("removeUser", user.getId());
			}
			
			session.insert("setUser", user);
			session.commit();
			return user.getId();
		} catch (Exception e) {
			session.rollback();
			throw e;
		} finally {
			if (session != null)
				session.close();
		}		
	}

	@Override
	public void removeUser(String userId, String id) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			session.commit(false);
			session.delete("removeUser", id);
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
	public int getUserSize(String userId, Db_UserCond cond) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			
			String selectId = "getUserSize";
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
	public Db_User[] getUsers(String userId, Db_UserCond cond) throws Exception {
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
			
			List<Db_User> userList = session.selectList("getUsers", cond, Rb);
			if (userList != null && userList.size() != 0) {
				Db_User[] result = new Db_User[userList.size()];
				userList.toArray(result);
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
	public String[] getUnspscCodes(int level, Map<String, String> params) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			
			RowBounds Rb = new RowBounds();
			
			List<String> codeList = session.selectList("getUnspscCodeLevel" + level, params, Rb);
			if (codeList != null && codeList.size() != 0) {
				String[] codes = new String[codeList.size()];
				codeList.toArray(codes);
				return codes;
			} else {
				return new String[]{"00"};
			}
		} catch (Exception e) {
			throw e;
		} finally {
			if (session != null)
				session.close();
		}		
	}

	@Override
	public Db_UnspscName[] getUnspscNames(int level, Map<String, String> params) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			
			RowBounds Rb = new RowBounds();
			if(params ==null){
				params = new HashMap<String, String>();
			}
			params.put("locale", SmartUtil.getCurrentUser().getLocale());
			
			List<Db_UnspscName> nameList = session.selectList("getUnspscNamesLevel" + level, params, Rb);
			if (nameList != null && nameList.size() != 0) {
				Db_UnspscName[] names = new Db_UnspscName[nameList.size()];
				nameList.toArray(names);
				return names;
			} else {
				return new Db_UnspscName[]{new Db_UnspscName("00", SmartMessage.getString("common.title.none"))};
			}
		} catch (Exception e) {
			throw e;
		} finally {
			if (session != null)
				session.close();
		}		
	}
	
	@Override
	public Db_CustomerType[] getCustomerTypes(int level, Map<String, String> params) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			
			RowBounds Rb = new RowBounds();
			if(params ==null){
				params = new HashMap<String, String>();
			}
			params.put("locale", SmartUtil.getCurrentUser().getLocale());
			
			List<Db_CustomerType> typeList = session.selectList("getCustomerTypesLevel" + level, params, Rb);
			if (typeList != null && typeList.size() != 0) {
				Db_CustomerType[] types = new Db_CustomerType[typeList.size()];
				typeList.toArray(types);
				return types;
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
	public String getCustomerName(String id) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			
			RowBounds Rb = new RowBounds();
			List<String> nameList = session.selectList("getCustomerNames", id, Rb);
			if (nameList != null && nameList.size() == 1) {
				return nameList.get(0);
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/* Service Concept 정보를 (타이틀&키워드를) 제외하고 초기화 시켜준다. */
	@Override
	public boolean disConnect_SBPService(SBPService serviceSpace, String psId) throws Exception {

		SqlSession session = null;
		boolean result = false;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			
			/* service concept데이터들 */
			Map<String, String> data = new HashMap<String, String>();
			data.put("sspp", serviceSpace.getSspp());
			data.put("ssp", serviceSpace.getSsp());		
			data.put("sspc", serviceSpace.getSspc());	
			data.put("ssc", serviceSpace.getSsc());
			data.put("sscc", serviceSpace.getSscc());
			data.put("psId", psId);
			session.update("disConnect_SBPService", data);
			session.commit();
			result = true;
		} catch (Exception e) {
			e.toString();
			throw e;
		} finally {
			if (session != null)
				session.close();
		}
		return result;
	}
	
	
	

	/* ServiceSpace테이블 정보 update. */
	@Override
	public boolean updateSbpMapData(String result_data, String psId, String itemName) throws Exception {

		SqlSession session = null;
		boolean result = false;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			Map<String, String> data = new HashMap<String, String>();
			data.put("psId", psId);											// pss 프로젝트 Id
			data.put("itemName", itemName);									// 컬럼명 (service concept종류)
			data.put("result_data", result_data);							// update할 data 
			session.update("update_ServiceSpace", data);
			session.commit();
			result = true;
		} catch (Exception e) {
			e.toString();
			throw e;
		} finally {
			if (session != null)
				session.close();
		}
		return result;
	}
	
	

	/* ServiceSpace테이블 정보를 가져온다. */
	@Override
	public SBPService selectSbpMapData(String psId) throws Exception {

		SqlSession session = null;
		SBPService serviceSpace = new SBPService();
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			serviceSpace = session.selectOne("get_SBP_Name_Service", psId);
		} catch (Exception e) {
			e.toString();
			throw e;
		} finally {
			if (session != null)
				session.close();
		}
		return serviceSpace;
	}

	
	
	
	/* 연결된 SBP프로젝트 정보를 가져온다 */
	@Override
	public SBPService getSBPService(String psId) throws Exception {
		SqlSession session = null;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			
			List<SBPService> sbpInfoList = session.selectList("get_SBP_Project_Service", psId);		// 연결된 PSS 프로젝트와 SBP프로젝트 이름 및 정보를 가져온다. 

			if(!(sbpInfoList.size() == 0)) {
				SBPService sbpInfo = session.selectOne("get_SBP_Name_Service", psId);				// 연결된 SBP프로젝트가 있을 경우에 연결된 SBP도 있다면 가져와 SBP프로젝트 정보를 가지고있는 model과 합쳐준다. 
				
				SBPService sbpService = sbpInfoList.get(0);											
				if(sbpInfo != null) {																// PSS 프로젝트의 Service concept데이터가 있을경우 데이터 합쳐준다. 
					sbpService.setId(sbpInfo.getId());
					sbpService.setSspp(sbpInfo.getSspp());
					sbpService.setSsp(sbpInfo.getSsp());
					sbpService.setSspc(sbpInfo.getSspc());
					sbpService.setSsc(sbpInfo.getSsc());
					sbpService.setSscc(sbpInfo.getSscc());
				} 
				return sbpService;																	// PSS 프로젝트의 Service concept데이터가 없을경우, 연결된 PSS 프로젝트와 SBP프로젝트 이름 및 정보만 return  
			} else {
				SBPService empty = new SBPService();
				return empty;																		// SBP프로젝트가 전혀 없을 경우, null이 리턴됨을 방지하기위해, 빈값을 생성해 return 한다. 
			}
		} catch (Exception e) {
			throw e;
		} finally {
			if (session != null)
				session.close();
		}
	}
	
	/* PSS프로젝트와 SBP프로젝트를 연결시켜준다 */
	@Override
	public boolean set_PSS_SBP_Servcie_Connect(Map<String, Object> requestBody) throws Exception {
		SqlSession session = null;
		boolean result = true;
		try {
			SqlSessionFactory factory = SessionFactory.getInstance().getSqlSessionFactory();
			session = factory.openSession();
			
			try {
				session.insert("set_PSS_SBP_Servcie_Connect", requestBody);
				session.commit();
			} catch(Exception x) {
				x.toString();
				result = false;
			}
			return result;
		} catch (Exception e) {
			throw e;
		} finally {
			if (session != null)
				session.close();
		}		
	}

}
