/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 11. 20.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.skkupss.manager.impl;

import net.smartworks.factory.DaoFactory;
import net.smartworks.skkupss.dao.IDbDao;
import net.smartworks.skkupss.manager.IDbManager;
import net.smartworks.skkupss.model.BizModelSpace;
import net.smartworks.skkupss.model.BizModelSpaceCond;
import net.smartworks.skkupss.model.DefaultSpace;
import net.smartworks.skkupss.model.ProductService;
import net.smartworks.skkupss.model.ProductServiceCond;
import net.smartworks.skkupss.model.ServiceSpace;
import net.smartworks.skkupss.model.ServiceSpaceCond;
import net.smartworks.skkupss.model.ValueSpace;
import net.smartworks.skkupss.model.ValueSpaceCond;
import net.smartworks.skkupss.model.db.Db_BizModelSpace;
import net.smartworks.skkupss.model.db.Db_BizModelSpaceCond;
import net.smartworks.skkupss.model.db.Db_ProductService;
import net.smartworks.skkupss.model.db.Db_ServiceSpace;
import net.smartworks.skkupss.model.db.Db_ServiceSpaceCond;
import net.smartworks.skkupss.model.db.Db_ValueSpace;
import net.smartworks.skkupss.model.db.Db_ValueSpaceCond;

import org.springframework.util.StringUtils;

public class DbManagerImpl implements IDbManager {

	public static final String delimiters = ";";
	
	private DefaultSpace getDefaultSpace(String[] elements) throws Exception {
		if (elements == null)
			return null;
		DefaultSpace defaultSpace = new DefaultSpace();
		defaultSpace.setElements(elements);
		return defaultSpace;
	}
	private String makeStringWithDelimiters(String[] elements) throws Exception {
		if (elements == null)
			return null;
		
		StringBuffer buff = new StringBuffer();
		boolean isFirst = true;
		for (int i = 0; i < elements.length; i++) {
			if (isFirst) {
				buff.append(elements[i]);
				isFirst = false;
			} else {
				buff.append(delimiters).append(elements[i]);
			}
		}
		return buff.toString();
	}
	
	@Override
	public ProductService getProductService(String userId, String psId) throws Exception {

		if (psId == null)
			return null;
		
		IDbDao dao = DaoFactory.getInstance().getDbDao();
		
		Db_ProductService dbPs = dao.getProductService(userId, psId);
		
		if (dbPs == null)
			return null;
		
		ProductService productService = new ProductService();
		productService.setId(dbPs.getId());
		productService.setName(dbPs.getName());
		productService.setPicture(dbPs.getPicture());
		productService.setDesc(dbPs.getDescription());
		
		//valueSpace
		Db_ValueSpaceCond dbVsCond = new Db_ValueSpaceCond();
		dbVsCond.setPsId(psId);
		Db_ValueSpace[] dbVs = dao.getValueSpaces(userId, dbVsCond);
		if (dbVs != null) {
			ValueSpace valueSpace = new ValueSpace();
			valueSpace.setId(dbVs[0].getId());
			valueSpace.setPsId(dbVs[0].getPsId());
			valueSpace.setEconomical(StringUtils.tokenizeToStringArray(dbVs[0].getEconomical(), delimiters));
			valueSpace.setEcological(StringUtils.tokenizeToStringArray(dbVs[0].getEcological(), delimiters));
			valueSpace.setFunction(StringUtils.tokenizeToStringArray(dbVs[0].getFunction(), delimiters));
			valueSpace.setExtrinsicSocial(StringUtils.tokenizeToStringArray(dbVs[0].getExtrinsicSocial(), delimiters));
			valueSpace.setActiveEmotional(StringUtils.tokenizeToStringArray(dbVs[0].getActiveEmotional(), delimiters));
			valueSpace.setReactiveEmotional(StringUtils.tokenizeToStringArray(dbVs[0].getReactiveEmotional(), delimiters));
			valueSpace.setIntrinsicSocial(StringUtils.tokenizeToStringArray(dbVs[0].getIntrinsicSocial(), delimiters));
			valueSpace.setEpistemic(StringUtils.tokenizeToStringArray(dbVs[0].getEpistemic(), delimiters));
			
			productService.setValueSpace(valueSpace);
		}

		//serviceSpace
		Db_ServiceSpaceCond dbSsCond = new Db_ServiceSpaceCond();
		dbSsCond.setPsId(psId);
		Db_ServiceSpace[] dbSs = dao.getServiceSpaces(userId, dbSsCond);
		if (dbSs != null) {
			ServiceSpace serviceSpace = new ServiceSpace();
			serviceSpace.setId(dbSs[0].getId());
			serviceSpace.setPsId(dbSs[0].getPsId());
			
			serviceSpace.setSspp(StringUtils.tokenizeToStringArray(dbSs[0].getSspp(), delimiters));
			serviceSpace.setSsp(StringUtils.tokenizeToStringArray(dbSs[0].getSsp(), delimiters));
			serviceSpace.setSspc(StringUtils.tokenizeToStringArray(dbSs[0].getSspc(), delimiters));
			serviceSpace.setSsc(StringUtils.tokenizeToStringArray(dbSs[0].getSsc(), delimiters));
			serviceSpace.setSscc(StringUtils.tokenizeToStringArray(dbSs[0].getSscc(), delimiters));
			
			productService.setServiceSpace(serviceSpace);
		}
		
		//bizModelSpace
		Db_BizModelSpaceCond dbBmsCond = new Db_BizModelSpaceCond();
		dbBmsCond.setPsId(psId);
		Db_BizModelSpace[] dbBms = dao.getBizModelSpaces(userId, dbBmsCond);
		if (dbBms != null) {
			BizModelSpace bizModelSpace = new BizModelSpace();
			bizModelSpace.setId(dbBms[0].getId());
			bizModelSpace.setPsId(dbBms[0].getPsId());

			bizModelSpace.setCustomerSegment(StringUtils.tokenizeToStringArray(dbBms[0].getCustomerSegment(), delimiters));
			bizModelSpace.setCustomerRelationshipsUser(StringUtils.tokenizeToStringArray(dbBms[0].getCustomerRelationshipsUser(), delimiters));
			bizModelSpace.setCustomerRelationships(StringUtils.tokenizeToStringArray(dbBms[0].getCustomerRelationships(), delimiters));
			bizModelSpace.setCustomerRelationshipsUser(StringUtils.tokenizeToStringArray(dbBms[0].getCustomerRelationshipsUser(), delimiters));
			bizModelSpace.setChannels(StringUtils.tokenizeToStringArray(dbBms[0].getChannels(), delimiters));
			bizModelSpace.setChannelsUser(StringUtils.tokenizeToStringArray(dbBms[0].getChannelsUser(), delimiters));
			bizModelSpace.setKeyActivities(StringUtils.tokenizeToStringArray(dbBms[0].getKeyActivities(), delimiters));
			bizModelSpace.setKeyActivitiesUser(StringUtils.tokenizeToStringArray(dbBms[0].getKeyActivitiesUser(), delimiters));
			bizModelSpace.setKeyResources(StringUtils.tokenizeToStringArray(dbBms[0].getKeyResources(), delimiters));
			bizModelSpace.setKeyResourcesUser(StringUtils.tokenizeToStringArray(dbBms[0].getKeyResourcesUser(), delimiters));
			bizModelSpace.setKeyPartners(StringUtils.tokenizeToStringArray(dbBms[0].getKeyPartners(), delimiters));
			bizModelSpace.setKeyPartnersUser(StringUtils.tokenizeToStringArray(dbBms[0].getKeyPartnersUser(), delimiters));
			bizModelSpace.setCostStructure(StringUtils.tokenizeToStringArray(dbBms[0].getCostStructure(), delimiters));
			bizModelSpace.setCostStructureUser(StringUtils.tokenizeToStringArray(dbBms[0].getCostStructureUser(), delimiters));
			bizModelSpace.setRevenueStreams(StringUtils.tokenizeToStringArray(dbBms[0].getRevenueStreams(), delimiters));
			bizModelSpace.setRevenueStreamsUser(StringUtils.tokenizeToStringArray(dbBms[0].getRevenueStreamsUser(), delimiters));
			
			productService.setBizModelSpace(bizModelSpace);
		}
		
		productService.setProductServiceSpace(getDefaultSpace(StringUtils.tokenizeToStringArray(dbPs.getProductServiceSpace(), delimiters)));
		productService.setProductSpace(getDefaultSpace(StringUtils.tokenizeToStringArray(dbPs.getProductSpace(), delimiters)));
		
		productService.setTouchPointSpace(getDefaultSpace(StringUtils.tokenizeToStringArray(dbPs.getTouchPointSpace(), delimiters)));
		productService.setCustomerSpace(getDefaultSpace(StringUtils.tokenizeToStringArray(dbPs.getCustomerSpace(), delimiters)));
		productService.setActorSpace(getDefaultSpace(StringUtils.tokenizeToStringArray(dbPs.getActorSpace(), delimiters)));
		productService.setSocietySpace(getDefaultSpace(StringUtils.tokenizeToStringArray(dbPs.getSocietySpace(), delimiters)));
		productService.setContextSpace(getDefaultSpace(StringUtils.tokenizeToStringArray(dbPs.getContextSpace(), delimiters)));
		productService.setTimeSpace(getDefaultSpace(StringUtils.tokenizeToStringArray(dbPs.getTimeSpace(), delimiters)));
		productService.setEnvironmentSpace(getDefaultSpace(StringUtils.tokenizeToStringArray(dbPs.getEnvironmentSpace(), delimiters)));

		productService.setLastModifiedUser(dbPs.getLastModifiedUser());
		productService.setLastModifiedDate(dbPs.getLastModifiedDate());
		productService.setCreatedUser(dbPs.getCreatedUser());
		productService.setCreatedDate(dbPs.getCreatedDate());
		
		return productService;
	}

	@Override
	public void setProductService(String userId, ProductService productService) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeProductService(String userId, String id) throws Exception {

		IDbDao dao = DaoFactory.getInstance().getDbDao();
		dao.removeBizModelSpaceByProductId(userId, id);
		dao.removeServiceSpaceByProductId(userId, id);
		dao.removeValueSpaceByProductId(userId, id);
		dao.removeProductService(userId, id);
		
	}

	@Override
	public ProductService[] getProductServices(String userId, ProductServiceCond cond) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ValueSpace getValueSpace(String userId, String id) throws Exception {

		IDbDao dao = DaoFactory.getInstance().getDbDao();
		Db_ValueSpace dbVs = dao.getValueSpace(userId, id);
		if (dbVs != null) {
			ValueSpace valueSpace = new ValueSpace();
			valueSpace.setId(dbVs.getId());
			valueSpace.setPsId(dbVs.getPsId());
			valueSpace.setEconomical(StringUtils.tokenizeToStringArray(dbVs.getEconomical(), delimiters));
			valueSpace.setEcological(StringUtils.tokenizeToStringArray(dbVs.getEcological(), delimiters));
			valueSpace.setFunction(StringUtils.tokenizeToStringArray(dbVs.getFunction(), delimiters));
			valueSpace.setExtrinsicSocial(StringUtils.tokenizeToStringArray(dbVs.getExtrinsicSocial(), delimiters));
			valueSpace.setActiveEmotional(StringUtils.tokenizeToStringArray(dbVs.getActiveEmotional(), delimiters));
			valueSpace.setReactiveEmotional(StringUtils.tokenizeToStringArray(dbVs.getReactiveEmotional(), delimiters));
			valueSpace.setIntrinsicSocial(StringUtils.tokenizeToStringArray(dbVs.getIntrinsicSocial(), delimiters));
			valueSpace.setEpistemic(StringUtils.tokenizeToStringArray(dbVs.getEpistemic(), delimiters));
			return valueSpace;
		} else {
			return null;
		}
	}

	@Override
	public void setValueSpace(String userId, ValueSpace valueSpace) throws Exception {

		if (valueSpace == null)
			return;
		Db_ValueSpace dbVs = new Db_ValueSpace();
		
		dbVs.setId(valueSpace.getId());
		dbVs.setPsId(valueSpace.getPsId());
		
		dbVs.setEconomical(makeStringWithDelimiters(valueSpace.getEconomical()));
		dbVs.setEcological(makeStringWithDelimiters(valueSpace.getEcological()));
		dbVs.setFunction(makeStringWithDelimiters(valueSpace.getFunction()));
		dbVs.setExtrinsicSocial(makeStringWithDelimiters(valueSpace.getExtrinsicSocial()));
		dbVs.setActiveEmotional(makeStringWithDelimiters(valueSpace.getActiveEmotional()));
		dbVs.setReactiveEmotional(makeStringWithDelimiters(valueSpace.getReactiveEmotional()));
		dbVs.setIntrinsicSocial(makeStringWithDelimiters(valueSpace.getIntrinsicSocial()));
		dbVs.setEpistemic(makeStringWithDelimiters(valueSpace.getEpistemic()));
		
		IDbDao dao = DaoFactory.getInstance().getDbDao();
		dao.setValueSpace(userId, dbVs);
		
	}

	@Override
	public void removeValueSpace(String userId, String id) throws Exception {

		IDbDao dao = DaoFactory.getInstance().getDbDao();
		dao.removeValueSpace(userId, id);		
	
	}

	@Override
	public ValueSpace[] getValueSpaces(String userId, ValueSpaceCond cond) throws Exception {

		if (cond == null)
			return null;
		
		Db_ValueSpaceCond dbCond = new Db_ValueSpaceCond();
		String id = cond.getId();
		String psId = cond.getPsId();

		//추가 검색 조건 추가 위치
		
		int pageNo = cond.getPageNo();
		int pageSize = cond.getPageSize();
		dbCond.setPageNo(pageNo);
		dbCond.setPageSize(pageSize);
		
		if (id != null)
			dbCond.setId(id);
		if (psId != null)
			dbCond.setPsId(psId);
		
		IDbDao dao = DaoFactory.getInstance().getDbDao();
		Db_ValueSpace[] dbVss = dao.getValueSpaces(userId, dbCond);

		if (dbVss == null || dbVss.length == 0)
			return null;
		
		ValueSpace[] result = new ValueSpace[dbVss.length];
		for (int i = 0; i < dbVss.length; i++) {
			Db_ValueSpace dbVs = dbVss[i];

			ValueSpace valueSpace = new ValueSpace();
			valueSpace.setId(dbVs.getId());
			valueSpace.setPsId(dbVs.getPsId());
			valueSpace.setEconomical(StringUtils.tokenizeToStringArray(dbVs.getEconomical(), delimiters));
			valueSpace.setEcological(StringUtils.tokenizeToStringArray(dbVs.getEcological(), delimiters));
			valueSpace.setFunction(StringUtils.tokenizeToStringArray(dbVs.getFunction(), delimiters));
			valueSpace.setExtrinsicSocial(StringUtils.tokenizeToStringArray(dbVs.getExtrinsicSocial(), delimiters));
			valueSpace.setActiveEmotional(StringUtils.tokenizeToStringArray(dbVs.getActiveEmotional(), delimiters));
			valueSpace.setReactiveEmotional(StringUtils.tokenizeToStringArray(dbVs.getReactiveEmotional(), delimiters));
			valueSpace.setIntrinsicSocial(StringUtils.tokenizeToStringArray(dbVs.getIntrinsicSocial(), delimiters));
			valueSpace.setEpistemic(StringUtils.tokenizeToStringArray(dbVs.getEpistemic(), delimiters));
			
			result[i] = valueSpace;
		}
		return result;
	}

	@Override
	public ServiceSpace getServiceSpace(String userId, String id) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setServiceSpace(String userId, ServiceSpace serviceSpace) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeServiceSpace(String userId, String id) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public ServiceSpace[] getServiceSpaces(String userId, ServiceSpaceCond cond) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public BizModelSpace getBizModelSpace(String userId, String id) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setBizModelSpace(String userId, BizModelSpace bizModelSpace) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeBizModelSpace(String userId, String id) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public BizModelSpace[] getBizModelSpace(String userId, BizModelSpaceCond cond) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
