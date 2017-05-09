/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 11. 20.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.skkupss.manager.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.smartworks.factory.DaoFactory;
import net.smartworks.factory.ManagerFactory;
import net.smartworks.skkupss.dao.IDbDao;
import net.smartworks.skkupss.manager.IDbManager;
import net.smartworks.skkupss.model.ActorSpace;
import net.smartworks.skkupss.model.BizModelSpace;
import net.smartworks.skkupss.model.BusinessContext;
import net.smartworks.skkupss.model.ContextSpace;
import net.smartworks.skkupss.model.CustomerSpace;
import net.smartworks.skkupss.model.DefaultSpace;
import net.smartworks.skkupss.model.Login;
import net.smartworks.skkupss.model.ProductService;
import net.smartworks.skkupss.model.ProductServiceCond;
import net.smartworks.skkupss.model.ProductSpace;
import net.smartworks.skkupss.model.SBPService;
import net.smartworks.skkupss.model.ServiceSpace;
import net.smartworks.skkupss.model.TimeSpace;
import net.smartworks.skkupss.model.TouchPoint;
import net.smartworks.skkupss.model.TouchPointSpace;
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
import net.smartworks.util.IDCreator;
import net.smartworks.util.LocalDate;
import net.smartworks.util.SmartUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.util.StringUtils;
import net.smartworks.util.PropertiesLoader;

public class DbManagerImpl implements IDbManager {

	public static final String delimiters = ";";
	public static final String delimiter_special = "$DELIMITER$";
	public static final String delimiter2_special = "\\$DELIMITER\\$";
	
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
	
	private ProductSpace getProductSpace(String[] elements) throws Exception {
		if (elements == null || elements.length!=2)
			return null;
		ProductSpace productSpace = new ProductSpace();
		productSpace.setUnspsc(elements[0]);
		productSpace.setLifecycleSteps(elements[1]);
		return productSpace;
	}
	private CustomerSpace getCustomerSpace(String[] elements) throws Exception {
		if (elements == null || elements.length!=2)
			return null;
		CustomerSpace customerSpace = new CustomerSpace();
		customerSpace.setTypesWithCommaString(elements[0]);
		customerSpace.setActivityTypesWithCommaString(elements[1]);
		return customerSpace;
	}
	private TouchPointSpace getTouchPointSpace(String[] elements) throws Exception {
		if (elements == null)
			return null;
		TouchPointSpace touchPointSpace = new TouchPointSpace();
		TouchPoint[] touchPoints = new TouchPoint[elements.length];
		for(int i=0; i<elements.length; i++)
			touchPoints[i] = TouchPoint.createTouchPoint(elements[i]);
		touchPointSpace.setTouchPoints(touchPoints);
		return touchPointSpace;
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
			if(ps.getProductSpace()!=null)
				productService.setProductSpace(ps.getProductSpace().getUnspsc() + delimiters + ps.getProductSpace().getLifecycleSteps());
			
			if(ps.getTouchPointSpace()!=null && ps.getTouchPointSpace().getTouchPoints()!=null){
				String touchPointString = "";
				for(int j=0; j<ps.getTouchPointSpace().getTouchPoints().length; j++){
					if(ps.getTouchPointSpace().getTouchPoints()[j]==null) continue;
					touchPointString = touchPointString + (j==0?"":delimiter_special) + ps.getTouchPointSpace().getTouchPoints()[j].toString();
				}					
				productService.setTouchPointSpace(touchPointString);
			}
			if(ps.getCustomerSpace()!=null)
				productService.setCustomerSpace(ps.getCustomerSpace().getTypesWithComma() + delimiters + ps.getCustomerSpace().getActivityTypesWithComma());
			if(ps.getActorSpace()!=null)
				productService.setActorSpace((ps.getActorSpace().getDiagramData()==null && ps.getActorSpace().getServitizationProcess()==null)?null:(ps.getActorSpace().getDiagramData() + delimiter_special + ps.getActorSpace().getServitizationProcess()));
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
			productService.setProductSpace(getProductSpace(StringUtils.tokenizeToStringArray(dbPs.getProductSpace(), delimiters)));
			
			productService.setTouchPointSpace(getTouchPointSpace(dbPs.getTouchPointSpace()==null?null:dbPs.getTouchPointSpace().split(delimiter2_special)));
			productService.setCustomerSpace(getCustomerSpace(StringUtils.tokenizeToStringArray(dbPs.getCustomerSpace(), delimiters)));
			productService.setActorSpace(getActorSpace(dbPs.getActorSpace()==null?null:dbPs.getActorSpace().split(delimiter2_special)));
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
		productService.setProductSpace(getProductSpace(StringUtils.tokenizeToStringArray(dbPs.getProductSpace(), delimiters)));
		
		productService.setTouchPointSpace(getTouchPointSpace(dbPs.getTouchPointSpace()==null?null:dbPs.getTouchPointSpace().split(delimiter2_special)));
		productService.setCustomerSpace(getCustomerSpace(StringUtils.tokenizeToStringArray(dbPs.getCustomerSpace(), delimiters)));
		productService.setActorSpace(getActorSpace(dbPs.getActorSpace()==null?null:dbPs.getActorSpace().split(delimiter2_special)));
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
	
	
	
	
	
	
	
	/* 연결되어있는 activity 정보들을 가져온다 */
	@Override
	public Map<String, Object> showConnectedActivity(Map<String, String> param) throws Exception {
		IDbDao dao = DaoFactory.getInstance().getDbDao();
		
		String psId = param.get("psId");
		String itemName = param.get("itemName");
		String title = param.get("title");
		String sbpId = param.get("sbpId");
	
		SBPService serviceSpace = dao.selectSbpMapData(psId);								// service concept data 꺼내온다.	
		
		String svType = "";
		String[] tokens = null;
		
		itemName = itemName.toLowerCase();
		if(itemName.equals("sspp")) {														// 서비스컨셉 종류별 구분.
			svType = serviceSpace.getSspp();
		} else if(itemName.equals("ssp")) {
			svType = serviceSpace.getSsp();
		} else if(itemName.equals("sspc")) {
			svType = serviceSpace.getSspc();
		} else if(itemName.equals("ssc")) {
			svType = serviceSpace.getSsc();
		} else if(itemName.equals("sscc")) {
			svType = serviceSpace.getSscc();
		} else {
			return null;
		}

		String activityInfo = "";
		tokens = StringUtils.tokenizeToStringArray(svType, ";");
		for(int i=0; i<tokens.length; i++) {
			if(tokens[i].contains("||")) {
				String title_old = ServiceSpace.getValueString(tokens[i].toString());		// service concept의 타이틀만 남겨준다. 
				if(title.equals(title_old)) {
					String[] impl = StringUtils.tokenizeToStringArray(tokens[i], "||");
					activityInfo = impl[1];
				} 
			} 
		}
		
		
		List<String> activityId = new ArrayList<String>();
		List<String> activityName = new ArrayList<String>();
		List<String> seq = new ArrayList<String>();
		String sbpName = "";
		String color = "";
		try {
			int indexFirst = activityInfo.indexOf("activityId:[/(start)/,");
			String impl = activityInfo.substring(indexFirst + 22);
			int indexSecond = impl.indexOf("/(end)/");
			impl = activityInfo.substring(indexFirst + 22, indexFirst + 22 + indexSecond);
			String[] implArray = StringUtils.tokenizeToStringArray(impl, ",");
			for(int i=0; i<implArray.length; i++) {
				activityId.add(implArray[i]);
			}
			
			indexFirst = activityInfo.indexOf("activityName:[/(start)/,");
			impl = activityInfo.substring(indexFirst + 24);
			indexSecond = impl.indexOf("/(end)/");
			impl = activityInfo.substring(indexFirst + 24, indexFirst + 24 + indexSecond);
			implArray = StringUtils.tokenizeToStringArray(impl, ",");
			for(int i=0; i<implArray.length; i++) {
				activityName.add(implArray[i]);
			}
			
			indexFirst = activityInfo.indexOf("seq:[/(start)/,");
			impl = activityInfo.substring(indexFirst + 15);
			indexSecond = impl.indexOf("/(end)/");
			impl = activityInfo.substring(indexFirst + 15, indexFirst + 15 + indexSecond);
			implArray = StringUtils.tokenizeToStringArray(impl, ",");
			for(int i=0; i<implArray.length; i++) {
				seq.add(implArray[i]);
			}
			
			indexFirst = activityInfo.indexOf("color:[/(start)/,");
			impl = activityInfo.substring(indexFirst + 17);
			indexSecond = impl.indexOf("/(end)/");
			impl = activityInfo.substring(indexFirst + 17, indexFirst + 17 + indexSecond);
			implArray = StringUtils.tokenizeToStringArray(impl, ",");
			for(int i=0; i<implArray.length; i++) {
				color = implArray[i];
			}
			
			indexFirst = activityInfo.indexOf("sbpName:[/(start)/,");
			impl = activityInfo.substring(indexFirst + 19);
			indexSecond = impl.indexOf("/(end)/");
			impl = activityInfo.substring(indexFirst + 19, indexFirst + 19 + indexSecond);
			implArray = StringUtils.tokenizeToStringArray(impl, ",");
			for(int i=0; i<implArray.length; i++) {
				sbpName = implArray[i];
			}
/*			
			JSONParser jsonParser = new JSONParser();
			
			JSONObject jsonObject = (JSONObject) jsonParser.parse(activityInfo);		// JSON데이터를 넣어 JSON Object 로 만들어 준다
			
			JSONArray InfoArray = (JSONArray) jsonObject.get("Info");					// Info배열 이름안에 있는 데이터 추출 
			
			for(int i=0; i<InfoArray.size(); i=InfoArray.size()){
                JSONObject InfoObject = (JSONObject) InfoArray.get(i);					//배열 안에 있는것도 JSON형식 이기 때문에 JSON Object 로 추출
                activityId = (List<String>) InfoObject.get("activityId");
                activityName = (List<String>) InfoObject.get("activityName");
                seq = (List<String>) InfoObject.get("seq");
                itemName = (String) InfoObject.get("itemName");
                psId = (String) InfoObject.get("psId");
                sbpName = (String) InfoObject.get("sbpName");
                sbpId = (String) InfoObject.get("sbpId");
            }
*/
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		Map<String, Object> extractData = new HashMap<String, Object>();
		extractData.put("activityId", activityId);
		extractData.put("activityName", activityName);
		extractData.put("seq", seq);
		extractData.put("itemName", itemName);
		extractData.put("psId", psId);
		extractData.put("sbpName", sbpName);
		extractData.put("sbpId", sbpId);
		extractData.put("color", color);
		return extractData;
	}
	
	
	
	/* SBP와 연결을 끊는다. (연결된 activity가 있다면 포함해서 모두 삭제) */
	@Override
	public boolean disConnect_SBPService(Map<String, String> param) throws Exception {
		IDbDao dao = DaoFactory.getInstance().getDbDao();
		
		boolean result = false;
		
		String psId = param.get("psId");
		String itemName = param.get("itemName");
		String title = param.get("title");
		
		SBPService serviceSpace = dao.selectSbpMapData(psId);								// service concept data 꺼내온다.	

		String svType = "";
		String[] tokens = null;
		
		itemName = itemName.toLowerCase();
		if(itemName.equals("sspp")) {														// 서비스컨셉 종류별 구분.
			svType = serviceSpace.getSspp();
		} else if(itemName.equals("ssp")) {
			svType = serviceSpace.getSsp();
		} else if(itemName.equals("sspc")) {
			svType = serviceSpace.getSspc();
		} else if(itemName.equals("ssc")) {
			svType = serviceSpace.getSsc();
		} else {
			svType = serviceSpace.getSscc();
		}

		String title_old = "";
		StringBuffer svcNew = new StringBuffer();
		tokens = StringUtils.tokenizeToStringArray(svType, ";");
		for(int i=0; i<tokens.length; i++) {
			if(tokens[i].contains("||")) {
				title_old = ServiceSpace.getValueString(tokens[i].toString());		// service concept의 타이틀만 남겨준다. 
				if(title.equals(title_old)) {
					svcNew.append(title_old);
				} else {
					svcNew.append(tokens[i]);
				}
			} else {
				svcNew.append(tokens[i]);				
			}
			svcNew.append(";");
		}
		
		if(itemName.equals("sspp")) {														// 서비스컨셉 종류별 구분.
			serviceSpace.setSspp(svcNew.toString());
		} else if(itemName.equals("ssp")) {
			serviceSpace.setSsp(svcNew.toString());
		} else if(itemName.equals("sspc")) {
			serviceSpace.setSspc(svcNew.toString());
		} else if(itemName.equals("ssc")) {
			serviceSpace.setSsc(svcNew.toString());
		} else {
			serviceSpace.setSscc(svcNew.toString());
		}
		
		result = dao.disConnect_SBPService(serviceSpace, psId);
		return result;
	}
	
	
	/* SBP Map에서 선택한 activity정보들을 DB에 채운다. */
	/* DB에 넣기전 js에서 json타입으로 만든 데이터를 다시 정돈한다. */
	@Override
	public boolean insertSbpMapData(Map<String, Object> sbpData) throws Exception {
		boolean result_final = false;
		IDbDao dao = DaoFactory.getInstance().getDbDao();

		String sbpDataStr = sbpData.toString();
		sbpDataStr = sbpDataStr.replaceAll("=", ":");		
	
/*		String psId = "";
		String itemName = "";
		String title = "";
		String sbpName = "";
		String sbpId = "";
		List<String> activityId = new ArrayList<String>();
		List<String> activityName = new ArrayList<String>();
		List<String> seq = new ArrayList<String>();
*/
		
		String itemName = (String)sbpData.get("itemName");
		String title = (String)sbpData.get("title");
		String psId = (String)sbpData.get("psId");
		List<String> sbpName = (List<String>)sbpData.get("sbpName");
		String sbpId = (String)sbpData.get("sbpId");
		List<String> activityId = (List<String>) sbpData.get("activityId");
		List<String> activityName = (List<String>)sbpData.get("activityName");
		List<String> seq = (List<String>)sbpData.get("seq");
		List<String> color = (List<String>)sbpData.get("color");
	
/*		try {
			JSONParser jsonParser = new JSONParser();
			
			JSONObject jsonObject = (JSONObject) jsonParser.parse(sbpDataStr);		// JSON데이터를 넣어 JSON Object 로 만들어 준다
			
			JSONArray InfoArray = (JSONArray) jsonObject.get("Info");				// Info배열 이름안에 있는 데이터 추출 
			
			for(int i=0; i<InfoArray.size(); i=InfoArray.size()){
                JSONObject InfoObject = (JSONObject) InfoArray.get(i);				//배열 안에 있는것도 JSON형식 이기 때문에 JSON Object 로 추출
                psId = (String) InfoObject.get("psId");								//JSON name으로 추출
                itemName = (String) InfoObject.get("itemName");
                title = (String) InfoObject.get("title");
                sbpName = (String) InfoObject.get("sbpName");
                sbpId = (String) InfoObject.get("sbpId");
                activityId = (List<String>) InfoObject.get("activityId");
                activityName = (List<String>) InfoObject.get("activityName");
                seq = (List<String>) InfoObject.get("seq");
            }
 
		} catch (ParseException e) {
			e.printStackTrace();
		}
*/
		SBPService serviceSpace = dao.selectSbpMapData(psId);								// service concept data 꺼내온다.	

		String svType = "";																	// service concept type(종류) 
		String[] tokens = null;
		itemName = itemName.toLowerCase();
		if(itemName.equals("sspp")) {														// 서비스컨셉 종류별 구분.
			svType = serviceSpace.getSspp();
			tokens = StringUtils.tokenizeToStringArray(svType, ";");						// service concept하나씩 나눈다.
		} else if(itemName.equals("ssp")) {
			svType = serviceSpace.getSsp();
			tokens = StringUtils.tokenizeToStringArray(svType, ";");
		} else if(itemName.equals("sspc")) {
			svType = serviceSpace.getSspc();
			tokens = StringUtils.tokenizeToStringArray(svType, ";");
		} else if(itemName.equals("ssc")) {
			svType = serviceSpace.getSsc();
			tokens = StringUtils.tokenizeToStringArray(svType, ";");
		} else {
			svType = serviceSpace.getSscc();
			tokens = StringUtils.tokenizeToStringArray(svType, ";");
		}
		
		StringBuffer result_data = new StringBuffer();
		for(int i=0; i<tokens.length; i++) {
			String impl = ServiceSpace.getValueString(tokens[i].toString());
			if(impl.equals(title)) {
				String[] arrayImpl = StringUtils.tokenizeToStringArray(tokens[i], "||");
				result_data.append(arrayImpl[0]).append("||").append(sbpDataStr);
			} else {
				result_data.append(tokens[i]);
			}
			result_data.append(";");
		}
		result_final = dao.updateSbpMapData(result_data.toString(), psId, itemName);		
		return result_final;
	}
	
	
	
	/* 관련된 SBP프로젝트 이름을 가져온다 */
	@Override
	public SBPService getSBPService(String psId) throws Exception{
		IDbDao dao = DaoFactory.getInstance().getDbDao();
		SBPService sbpInfoList = dao.getSBPService(psId);
		return sbpInfoList;
	}
	
	
	/* PSS프로젝트와 SBP프로젝를 연결시켜준다(DB에 insert할 데이터 추가 세팅하는 과정) */
	@Override
	public boolean set_PSS_SBP_Servcie_Connect(Map<String, Object> requestBody) throws Exception{
		
		IDbDao dao = DaoFactory.getInstance().getDbDao();
		
		String id = IDCreator.createId("prj");											// hvmproject 테이블의 id값 생성
		requestBody.put("id", id);
		
		ProductService productService = new ProductService();
		productService = ManagerFactory.getInstance().getServiceManager().getProductService(requestBody.get("psId").toString(), ProductService.SPACE_TYPE_NONE);	// PSS 프로젝트에 대한 정보를 가져온다	

		String psDesc = productService.getDesc();										// PSS 프로젝트에 대한 설명
		requestBody.put("psDesc", psDesc);			
		
		String psPicture = productService.getPicture();									// PSS 프로젝트에 관한 사진정보를 가져온다.
		requestBody.put("picture", psPicture);
		
		User cUser = SmartUtil.getCurrentUser();										// 현재 사용자
		requestBody.put("createdUser", cUser.getId());
		
		requestBody.put("createdDate", new Date());										// 현재 날짜 
				
		boolean result = dao.set_PSS_SBP_Servcie_Connect(requestBody);
		return result;
	}
	
	/* PSS 프로젝트 - BusinessContext 연결 */
	@Override
	public boolean set_PSS_BusinessContext(Map<String, String> requestBody) throws Exception{
		
		IDbDao dao = DaoFactory.getInstance().getDbDao();
				
		boolean result = dao.set_PSS_BusinessContext(requestBody);
		return result;
	}
	
	/* PSS 프로젝트 - BusinessContext 정보 가져온다 */
	@Override
	public BusinessContext get_PSS_BusinessContext(String psId) throws Exception{
		
		IDbDao dao = DaoFactory.getInstance().getDbDao();
				
		BusinessContext businessContext = dao.get_PSS_BusinessContext(psId);
		return businessContext;
	}
}
