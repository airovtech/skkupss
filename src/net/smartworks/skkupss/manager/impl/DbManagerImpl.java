/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 11. 20.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.skkupss.manager.impl;

import java.util.Date;

import net.smartworks.factory.DaoFactory;
import net.smartworks.skkupss.dao.IDbDao;
import net.smartworks.skkupss.manager.IDbManager;
import net.smartworks.skkupss.model.ActorSpace;
import net.smartworks.skkupss.model.BizModelSpace;
import net.smartworks.skkupss.model.ContextSpace;
import net.smartworks.skkupss.model.DefaultSpace;
import net.smartworks.skkupss.model.Login;
import net.smartworks.skkupss.model.ProductService;
import net.smartworks.skkupss.model.ProductServiceCond;
import net.smartworks.skkupss.model.ServiceSpace;
import net.smartworks.skkupss.model.TimeSpace;
import net.smartworks.skkupss.model.User;
import net.smartworks.skkupss.model.UserCond;
import net.smartworks.skkupss.model.ValueSpace;
import net.smartworks.skkupss.model.db.Db_BizModelSpace;
import net.smartworks.skkupss.model.db.Db_BizModelSpaceCond;
import net.smartworks.skkupss.model.db.Db_ProductService;
import net.smartworks.skkupss.model.db.Db_ProductServiceCond;
import net.smartworks.skkupss.model.db.Db_ServiceSpace;
import net.smartworks.skkupss.model.db.Db_ServiceSpaceCond;
import net.smartworks.skkupss.model.db.Db_User;
import net.smartworks.skkupss.model.db.Db_UserCond;
import net.smartworks.skkupss.model.db.Db_ValueSpace;
import net.smartworks.skkupss.model.db.Db_ValueSpaceCond;
import net.smartworks.util.LocalDate;
import net.smartworks.util.SmartUtil;

import org.springframework.util.StringUtils;

public class DbManagerImpl implements IDbManager {

	public static final String delimiters = ";";
	public static final String DELIMITER_ACTOR = "$SEVILIZATION_PROCESS=";
	
	private DefaultSpace getDefaultSpace(String[] elements) throws Exception {
		if (elements == null)
			return null;
		DefaultSpace defaultSpace = new DefaultSpace();
		defaultSpace.setElements(elements);
		return defaultSpace;
	}
	private String makeStringFromDefaultSpace(DefaultSpace defaultSpace) throws Exception {
		if (defaultSpace == null)
			return null;
		return makeStringWithDelimiters(defaultSpace.getElements());
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

	private TimeSpace getTimeSpace(String element) throws Exception {
		if (element == null)
			return null;
		TimeSpace timeSpace = new TimeSpace();
		timeSpace.setValueString(element);
		return timeSpace;
	}
	private String makeStringFromTimeSpace(TimeSpace timeSpace) throws Exception {
		if (timeSpace == null)
			return null;
		return timeSpace.getValueString();
	}
	
	private ActorSpace getActorSpace(String[] elements) throws Exception {
		if (elements == null || elements.length!=2)
			return null;
		ActorSpace actorSpace = new ActorSpace();
		actorSpace.setDiagramData(elements[0]);
		actorSpace.setServitizationProcess(elements[1]);
		return actorSpace;
	}
	private Db_ProductService[] convertProductServiceToDb_ProductService(ProductService[] productServices) throws Exception {

		if (productServices == null || productServices.length == 0)
			return null;

		Db_ProductService[] result = new Db_ProductService[productServices.length];
		
		for (int i = 0; i < productServices.length; i++) {
			ProductService ps = productServices[i];
			
			Db_ProductService productService = new Db_ProductService();
			
			productService.setId(ps.getId());
			productService.setName(ps.getName());
			productService.setPicture(ps.getPicture());
			productService.setDescription(ps.getDesc());
			
			ValueSpace vs = ps.getValueSpace();
			if (vs != null) {
				Db_ValueSpace valueSpace = new Db_ValueSpace();
				valueSpace.setId(vs.getId());
				valueSpace.setPsId(vs.getPsId());
				valueSpace.setEconomical(makeStringWithDelimiters(vs.getEconomical()));
				valueSpace.setEcological(makeStringWithDelimiters(vs.getEcological()));
				valueSpace.setFunction(makeStringWithDelimiters(vs.getFunction()));
				valueSpace.setExtrinsicSocial(makeStringWithDelimiters(vs.getExtrinsicSocial()));
				valueSpace.setActiveEmotional(makeStringWithDelimiters(vs.getActiveEmotional()));
				valueSpace.setReactiveEmotional(makeStringWithDelimiters(vs.getReactiveEmotional()));
				valueSpace.setIntrinsicSocial(makeStringWithDelimiters(vs.getIntrinsicSocial()));
				valueSpace.setEpistemic(makeStringWithDelimiters(vs.getEpistemic()));
				
				productService.setValueSpace(valueSpace);
			}

			//serviceSpace
			ServiceSpace ss = ps.getServiceSpace();
			if (ss != null) {
				Db_ServiceSpace serviceSpace = new Db_ServiceSpace();
				serviceSpace.setId(ss.getId());
				serviceSpace.setPsId(ss.getPsId());
				
				serviceSpace.setSspp(makeStringWithDelimiters(ss.getSspp()));
				serviceSpace.setSsp(makeStringWithDelimiters(ss.getSsp()));
				serviceSpace.setSspc(makeStringWithDelimiters(ss.getSspc()));
				serviceSpace.setSsc(makeStringWithDelimiters(ss.getSsc()));
				serviceSpace.setSscc(makeStringWithDelimiters(ss.getSscc()));
				
				productService.setServiceSpace(serviceSpace);
			}
			
			//bizModelSpace
			BizModelSpace bms = ps.getBizModelSpace();
			if (bms != null) {
				Db_BizModelSpace bizModelSpace = new Db_BizModelSpace();
				bizModelSpace.setId(bms.getId());
				bizModelSpace.setPsId(bms.getPsId());

				bizModelSpace.setCustomerSegments(makeStringWithDelimiters(bms.getCustomerSegments()));
				bizModelSpace.setCustomerSegmentsUser(makeStringWithDelimiters(bms.getCustomerSegmentsUser()));
				bizModelSpace.setCustomerRelationships(makeStringWithDelimiters(bms.getCustomerRelationships()));
				bizModelSpace.setCustomerRelationshipsUser(makeStringWithDelimiters(bms.getCustomerRelationshipsUser()));
				bizModelSpace.setChannels(makeStringWithDelimiters(bms.getChannels()));
				bizModelSpace.setChannelsUser(makeStringWithDelimiters(bms.getChannelsUser()));
				bizModelSpace.setKeyActivities(makeStringWithDelimiters(bms.getKeyActivities()));
				bizModelSpace.setKeyActivitiesUser(makeStringWithDelimiters(bms.getKeyActivitiesUser()));
				bizModelSpace.setKeyResources(makeStringWithDelimiters(bms.getKeyResources()));
				bizModelSpace.setKeyResourcesUser(makeStringWithDelimiters(bms.getKeyResourcesUser()));
				bizModelSpace.setKeyPartners(makeStringWithDelimiters(bms.getKeyPartners()));
				bizModelSpace.setKeyPartnersUser(makeStringWithDelimiters(bms.getKeyPartnersUser()));
				bizModelSpace.setValuePropositionsUser(makeStringWithDelimiters(bms.getValuePropositionsUser()));
				bizModelSpace.setCostStructure(makeStringWithDelimiters(bms.getCostStructure()));
				bizModelSpace.setCostStructureUser(makeStringWithDelimiters(bms.getCostStructureUser()));
				bizModelSpace.setRevenueStreams(makeStringWithDelimiters(bms.getRevenueStreams()));
				bizModelSpace.setRevenueStreamsUser(makeStringWithDelimiters(bms.getRevenueStreamsUser()));
				
				productService.setBizModelSpace(bizModelSpace);
			}
			
			productService.setProductServiceSpace(makeStringFromDefaultSpace(ps.getProductServiceSpace()));
			productService.setProductSpace(makeStringFromDefaultSpace(ps.getProductSpace()));
			
			productService.setTouchPointSpace(makeStringFromDefaultSpace(ps.getTouchPointSpace()));
			productService.setCustomerSpace(makeStringFromDefaultSpace(ps.getCustomerSpace()));
			if(ps.getActorSpace()!=null)
				productService.setActorSpace(ps.getActorSpace().getDiagramData() + DELIMITER_ACTOR + ps.getActorSpace().getServitizationProcess());
			productService.setSocietySpace(makeStringFromDefaultSpace(ps.getSocietySpace()));
			if(ps.getContextSpace()!=null)
				productService.setContextSpace(ps.getContextSpace().getContextData());
			productService.setTimeSpace(makeStringFromTimeSpace(ps.getTimeSpace()));
			productService.setEnvironmentSpace(makeStringFromDefaultSpace(ps.getEnvironmentSpace()));

			if(ps.getLastModifiedUser()!=null)
				productService.setLastModifiedUser(ps.getLastModifiedUser().getId());
			productService.setLastModifiedDate(ps.getLastModifiedDate());
			if(ps.getCreatedUser()!=null)
				productService.setCreatedUser(ps.getCreatedUser().getId());
			productService.setCreatedDate(ps.getCreatedDate());
			
			result[i] = productService;
		}
		return result;
	}
	
	private ProductService[] convertDbProductServiceToProductService(Db_ProductService[] productServices) throws Exception {
		
		if (productServices == null || productServices.length == 0)
			return null;
		
		ProductService[] result = new ProductService[productServices.length];
		
		for (int i = 0; i < productServices.length; i++) {
			Db_ProductService dbPs = productServices[i];
			
			ProductService productService = new ProductService();
			productService.setId(dbPs.getId());
			productService.setName(dbPs.getName());
			productService.setPicture(dbPs.getPicture());
			productService.setDesc(dbPs.getDescription());
			
			Db_ValueSpace dbVs = dbPs.getValueSpace();
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
				
				productService.setValueSpace(valueSpace);
			}

			//serviceSpace
			Db_ServiceSpace dbSs = dbPs.getServiceSpace();
			if (dbSs != null) {
				ServiceSpace serviceSpace = new ServiceSpace();
				serviceSpace.setId(dbSs.getId());
				serviceSpace.setPsId(dbSs.getPsId());
				
				serviceSpace.setSspp(StringUtils.tokenizeToStringArray(dbSs.getSspp(), delimiters));
				serviceSpace.setSsp(StringUtils.tokenizeToStringArray(dbSs.getSsp(), delimiters));
				serviceSpace.setSspc(StringUtils.tokenizeToStringArray(dbSs.getSspc(), delimiters));
				serviceSpace.setSsc(StringUtils.tokenizeToStringArray(dbSs.getSsc(), delimiters));
				serviceSpace.setSscc(StringUtils.tokenizeToStringArray(dbSs.getSscc(), delimiters));
				
				productService.setServiceSpace(serviceSpace);
			}
			
			//bizModelSpace
			Db_BizModelSpace dbBms = dbPs.getBizModelSpace();
			if (dbBms != null) {
				BizModelSpace bizModelSpace = new BizModelSpace();
				bizModelSpace.setId(dbBms.getId());
				bizModelSpace.setPsId(dbBms.getPsId());

				bizModelSpace.setCustomerSegments(StringUtils.tokenizeToStringArray(dbBms.getCustomerSegments(), delimiters));
				bizModelSpace.setCustomerSegmentsUser(StringUtils.tokenizeToStringArray(dbBms.getCustomerSegmentsUser(), delimiters));
				bizModelSpace.setCustomerRelationships(StringUtils.tokenizeToStringArray(dbBms.getCustomerRelationships(), delimiters));
				bizModelSpace.setCustomerRelationshipsUser(StringUtils.tokenizeToStringArray(dbBms.getCustomerRelationshipsUser(), delimiters));
				bizModelSpace.setChannels(StringUtils.tokenizeToStringArray(dbBms.getChannels(), delimiters));
				bizModelSpace.setChannelsUser(StringUtils.tokenizeToStringArray(dbBms.getChannelsUser(), delimiters));
				bizModelSpace.setKeyActivities(StringUtils.tokenizeToStringArray(dbBms.getKeyActivities(), delimiters));
				bizModelSpace.setKeyActivitiesUser(StringUtils.tokenizeToStringArray(dbBms.getKeyActivitiesUser(), delimiters));
				bizModelSpace.setKeyResources(StringUtils.tokenizeToStringArray(dbBms.getKeyResources(), delimiters));
				bizModelSpace.setKeyResourcesUser(StringUtils.tokenizeToStringArray(dbBms.getKeyResourcesUser(), delimiters));
				bizModelSpace.setKeyPartners(StringUtils.tokenizeToStringArray(dbBms.getKeyPartners(), delimiters));
				bizModelSpace.setKeyPartnersUser(StringUtils.tokenizeToStringArray(dbBms.getKeyPartnersUser(), delimiters));
				bizModelSpace.setCostStructure(StringUtils.tokenizeToStringArray(dbBms.getCostStructure(), delimiters));
				bizModelSpace.setCostStructureUser(StringUtils.tokenizeToStringArray(dbBms.getCostStructureUser(), delimiters));
				bizModelSpace.setRevenueStreams(StringUtils.tokenizeToStringArray(dbBms.getRevenueStreams(), delimiters));
				bizModelSpace.setRevenueStreamsUser(StringUtils.tokenizeToStringArray(dbBms.getRevenueStreamsUser(), delimiters));
				bizModelSpace.setValuePropositionsUser(StringUtils.tokenizeToStringArray(dbBms.getValuePropositionsUser(), delimiters));
				
				productService.setBizModelSpace(bizModelSpace);
			}
			
			productService.setProductServiceSpace(getDefaultSpace(StringUtils.tokenizeToStringArray(dbPs.getProductServiceSpace(), delimiters)));
			productService.setProductSpace(getDefaultSpace(StringUtils.tokenizeToStringArray(dbPs.getProductSpace(), delimiters)));
			
			productService.setTouchPointSpace(getDefaultSpace(StringUtils.tokenizeToStringArray(dbPs.getTouchPointSpace(), delimiters)));
			productService.setCustomerSpace(getDefaultSpace(StringUtils.tokenizeToStringArray(dbPs.getCustomerSpace(), delimiters)));
			productService.setActorSpace(getActorSpace(StringUtils.tokenizeToStringArray(dbPs.getActorSpace(), DELIMITER_ACTOR)));
			productService.setSocietySpace(getDefaultSpace(StringUtils.tokenizeToStringArray(dbPs.getSocietySpace(), delimiters)));
			productService.setContextSpace(ContextSpace.createContextSpace(dbPs.getContextSpace()));
			productService.setTimeSpace(getTimeSpace(dbPs.getTimeSpace()));
			productService.setEnvironmentSpace(getDefaultSpace(StringUtils.tokenizeToStringArray(dbPs.getEnvironmentSpace(), delimiters)));

			productService.setLastModifiedUser(SmartUtil.getUserFromUserId(dbPs.getLastModifiedUser()));
			if(dbPs.getLastModifiedDate()!=null)
				productService.setLastModifiedDate(new LocalDate(dbPs.getLastModifiedDate().getTime()));
			productService.setCreatedUser(SmartUtil.getUserFromUserId(dbPs.getCreatedUser()));
			if(dbPs.getCreatedDate()!=null)
				productService.setCreatedDate(new LocalDate(dbPs.getCreatedDate().getTime()));
			
			result[i] = productService;
		}
		return result;
	}

	@Override
	public int getProductServiceWithSelectedSpaceSize(String userId, String spaceType, ProductServiceCond cond) throws Exception {
		Db_ProductServiceCond dbCond = new Db_ProductServiceCond();

		if (cond.getSearchKey() != null) {
			dbCond.setSearchKey(cond.getSearchKey());
		}
		
		int totalSize = DaoFactory.getInstance().getDbDao().getProductServiceWithSelectedSpaceSize(userId, spaceType, dbCond);
		return totalSize;
	}
	@Override
	public ProductService[] getProductServiceWithSelectedSpace(String userId,	String spaceType, ProductServiceCond cond) throws Exception {
		
		Db_ProductServiceCond dbCond = new Db_ProductServiceCond();
		if (cond != null) {
			if (cond.getPageSize() != -1) {
				dbCond.setPageNo(cond.getPageNo());
				dbCond.setPageSize(cond.getPageSize());
			}
			if (!SmartUtil.isBlankObject(cond.getSearchKey())) {
				dbCond.setSearchKey(cond.getSearchKey());
			}
			if (cond.getOrders() != null) {
				dbCond.setOrders(cond.getOrders());
			}
		}
		Db_ProductService[] productService = DaoFactory.getInstance().getDbDao().getProductServiceWithSelectedSpace(userId, spaceType, dbCond);
		return convertDbProductServiceToProductService(productService);
	}

	@Override
	public ProductService[] getProductServiceWithSelectedSpace(String userId, String spaceType, String[] psIds) throws Exception {
		
		Db_ProductServiceCond dbCond = new Db_ProductServiceCond();
		if (psIds != null && psIds.length != 0) {
			dbCond.setIdIns(psIds);
		}
		Db_ProductService[] productService = DaoFactory.getInstance().getDbDao().getProductServiceWithSelectedSpace(userId, spaceType, dbCond);
		return convertDbProductServiceToProductService(productService);
	}
	
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

			bizModelSpace.setCustomerSegments(StringUtils.tokenizeToStringArray(dbBms[0].getCustomerSegments(), delimiters));
			bizModelSpace.setCustomerSegmentsUser(StringUtils.tokenizeToStringArray(dbBms[0].getCustomerSegmentsUser(), delimiters));
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
			bizModelSpace.setValuePropositionsUser(StringUtils.tokenizeToStringArray(dbBms[0].getValuePropositionsUser(), delimiters));
			
			productService.setBizModelSpace(bizModelSpace);
		}
		
		productService.setProductServiceSpace(getDefaultSpace(StringUtils.tokenizeToStringArray(dbPs.getProductServiceSpace(), delimiters)));
		productService.setProductSpace(getDefaultSpace(StringUtils.tokenizeToStringArray(dbPs.getProductSpace(), delimiters)));
		
		productService.setTouchPointSpace(getDefaultSpace(StringUtils.tokenizeToStringArray(dbPs.getTouchPointSpace(), delimiters)));
		productService.setCustomerSpace(getDefaultSpace(StringUtils.tokenizeToStringArray(dbPs.getCustomerSpace(), delimiters)));
		productService.setActorSpace(getActorSpace(StringUtils.tokenizeToStringArray(dbPs.getActorSpace(), delimiters)));
		productService.setSocietySpace(getDefaultSpace(StringUtils.tokenizeToStringArray(dbPs.getSocietySpace(), delimiters)));
		productService.setContextSpace(ContextSpace.createContextSpace(dbPs.getContextSpace()));
		productService.setTimeSpace(getTimeSpace(dbPs.getTimeSpace()));
		productService.setEnvironmentSpace(getDefaultSpace(StringUtils.tokenizeToStringArray(dbPs.getEnvironmentSpace(), delimiters)));

		productService.setLastModifiedUser(SmartUtil.getUserFromUserId(dbPs.getLastModifiedUser()));
		if(dbPs.getLastModifiedDate()!=null)
			productService.setLastModifiedDate(new LocalDate(dbPs.getLastModifiedDate().getTime()));
		productService.setCreatedUser(SmartUtil.getUserFromUserId(dbPs.getCreatedUser()));
		if(dbPs.getCreatedDate()!=null)
			productService.setCreatedDate(new LocalDate(dbPs.getCreatedDate().getTime()));
		
		return productService;
	}

	public String setProductService(String userId, ProductService productService) throws Exception {

		if (productService == null)
			return null;

		IDbDao dao = DaoFactory.getInstance().getDbDao();
		
		Db_ProductService[] dbPs = convertProductServiceToDb_ProductService(new ProductService[]{productService});
		if (dbPs == null || dbPs.length == 0)
			throw new Exception("File To Convert Model! ProductService -> Db_ProductService");
		
		if(productService.getId()!=null){
			Db_ProductService tDbPs = dao.getProductService(userId,  productService.getId());
			if(productService.getProductServiceSpace()==null)
				dbPs[0].setProductServiceSpace(tDbPs.getProductServiceSpace());
			if(productService.getProductSpace()==null)
				dbPs[0].setProductSpace(tDbPs.getProductSpace());
			if(productService.getTouchPointSpace()==null)
				dbPs[0].setTouchPointSpace(tDbPs.getTouchPointSpace());
			if(productService.getCustomerSpace()==null)
				dbPs[0].setCustomerSpace(tDbPs.getCustomerSpace());
			if(productService.getActorSpace()==null)
				dbPs[0].setActorSpace(tDbPs.getActorSpace());
			if(productService.getSocietySpace()==null)
				dbPs[0].setSocietySpace(tDbPs.getSocietySpace());
			if(productService.getContextSpace()==null)
				dbPs[0].setContextSpace(tDbPs.getContextSpace());
			if(productService.getTimeSpace()==null)
				dbPs[0].setTimeSpace(tDbPs.getTimeSpace());
			if(productService.getEnvironmentSpace()==null)
				dbPs[0].setEnvironmentSpace(tDbPs.getEnvironmentSpace());
		}
		
		String id = dao.setProductService(userId, dbPs[0]);
		
		if (dbPs[0].getValueSpace() != null){
			Db_ValueSpace valueSpace = dbPs[0].getValueSpace();
			if(productService.getId()==null)
				valueSpace.setId(null);
			valueSpace.setPsId(id);
			dao.setValueSpace(userId, valueSpace);
		}
		if (dbPs[0].getServiceSpace() != null){
			Db_ServiceSpace serviceSpace = dbPs[0].getServiceSpace();
			if(productService.getId()==null)
				serviceSpace.setId(null);
			serviceSpace.setPsId(id);
			dao.setServiceSpace(userId, serviceSpace);
		}
		if (dbPs[0].getBizModelSpace() != null){
			Db_BizModelSpace bizModelSpace = dbPs[0].getBizModelSpace();
			if(productService.getId()==null)
				bizModelSpace.setId(null);
			bizModelSpace.setPsId(id);
			dao.setBizModelSpace(userId, bizModelSpace);
		}
		return id;
	}

	public void removeProductService(String userId, String id) throws Exception {

		IDbDao dao = DaoFactory.getInstance().getDbDao();
		dao.removeBizModelSpaceByProductId(userId, id);
		dao.removeServiceSpaceByProductId(userId, id);
		dao.removeValueSpaceByProductId(userId, id);
		dao.removeProductService(userId, id);
		
	}
	@Override
	public String getProductServicePicture(String user, String psId) throws Exception {

		String picture = DaoFactory.getInstance().getDbDao().getProductServicePicture(user, psId);
		return picture;
	}
	@Override
	public String setUser(String userId, User user) throws Exception {

		if (user == null)
			return null;

		IDbDao dao = DaoFactory.getInstance().getDbDao();
		
		Db_User dbUser = getDbUserFromUser(user);
		if(SmartUtil.isBlankObject(dbUser))
			return null;
		dbUser.setModifier(userId);
		dbUser.setModifiedTime(new Date());
		String id = dao.setUser(userId, dbUser);

		return id;
	}
	@Override
	public void removeUser(String userId, String id) throws Exception {
		IDbDao dao = DaoFactory.getInstance().getDbDao();
		dao.removeUser(userId, id);
	}
	@Override
	public User getUser(String userId, String id) throws Exception {
		Db_User dbUser = DaoFactory.getInstance().getDbDao().getUser(userId, id);
		if(SmartUtil.isBlankObject(dbUser))
			return null;
		
		return getUserFromDbUser(dbUser);
	}
	@Override
	public int getUserSize(String userId, UserCond cond) throws Exception {
		Db_UserCond dbCond = new Db_UserCond();
		if (cond != null) {
			if (!SmartUtil.isBlankObject(cond.getSearchKey())) {
				dbCond.setSearchKey(cond.getSearchKey());
			}
		}
		
		int totalSize = DaoFactory.getInstance().getDbDao().getUserSize(userId, dbCond);
		return totalSize;
	}
	@Override
	public User[] getUsers(String userId, UserCond cond) throws Exception {
		
		Db_UserCond dbCond = new Db_UserCond();
		if (cond != null) {
			if (cond.getPageSize() != -1) {
				dbCond.setPageNo(cond.getPageNo());
				dbCond.setPageSize(cond.getPageSize());
			}
			if (!SmartUtil.isBlankObject(cond.getSearchKey())) {
				dbCond.setSearchKey(cond.getSearchKey());
			}
			if (cond.getOrders() != null) {
				dbCond.setOrders(cond.getOrders());
			}
		}
		
		Db_User[] dbUsers = DaoFactory.getInstance().getDbDao().getUsers(userId, dbCond);
		if(SmartUtil.isBlankObject(dbUsers))
			return null;
		
		User[] users = new User[dbUsers.length];
		for(int i=0; i<dbUsers.length; i++)
			users[i] = getUserFromDbUser(dbUsers[i]);
		return users;
	}
	
	private User getUserFromDbUser(Db_User dbUser){
		User user = new User();
		user.setId(dbUser.getId());
		user.setName(dbUser.getName());
		user.setPassword(dbUser.getPasswd());
		user.setUserLevel(Login.getUserLevel(dbUser.getAuthId()));
		if(!SmartUtil.isBlankObject(dbUser.getPicture())){
			String[] tokens = dbUser.getPicture().split("\\.");
			if(tokens.length==2){
				user.setBigPictureName(tokens[0]+"_thumb."+tokens[1]);
				user.setSmallPictureName(tokens[0]+"_thumb."+tokens[1]);
			}else{
				user.setBigPictureName(dbUser.getPicture());				
			}
		}
		user.setPicture(dbUser.getPicture());
		user.setCompany(dbUser.getCompany());
		if(!SmartUtil.isBlankObject(dbUser.getLocale()))
			user.setLocale(dbUser.getLocale());
		if(!SmartUtil.isBlankObject(dbUser.getTimeZone()))
			user.setTimeZone(dbUser.getTimeZone());
		user.setMobilePhoneNo(dbUser.getMobileNo());
		user.setHomePhoneNo(dbUser.getHomePhoneNo());
		user.setHomeAddress(dbUser.getHomeAddress());
		return user;
	}
	
	private Db_User getDbUserFromUser(User user){
		Db_User dbUser = new Db_User();
		dbUser.setId(user.getId());
		dbUser.setName(user.getName());
		dbUser.setPasswd(user.getPassword());
		dbUser.setAuthId(Login.getAuthId(user.getUserLevel()));
		dbUser.setPicture(user.getPicture());
		dbUser.setCompany(user.getCompany());
		dbUser.setLocale(user.getLocale());
		dbUser.setTimeZone(user.getTimeZone());
		dbUser.setMobileNo(user.getMobilePhoneNo());
		dbUser.setHomePhoneNo(user.getHomePhoneNo());
		dbUser.setHomeAddress(user.getHomeAddress());
		return dbUser;
	}
}
