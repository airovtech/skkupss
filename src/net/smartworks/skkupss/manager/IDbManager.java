/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 11. 20.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.skkupss.manager;

import java.util.List;
import java.util.Map;

import net.smartworks.skkupss.model.BusinessContext;
import net.smartworks.skkupss.model.ProductService;
import net.smartworks.skkupss.model.ProductServiceCond;
import net.smartworks.skkupss.model.SBPService;
import net.smartworks.skkupss.model.User;
import net.smartworks.skkupss.model.UserCond;

public interface IDbManager {

	public int getProductServiceWithSelectedSpaceSize(String userId, String spaceType, ProductServiceCond cond) throws Exception;
	public ProductService[] getProductServiceWithSelectedSpace(String userId, String spaceType, ProductServiceCond cond) throws Exception;

	public ProductService[] getProductServiceWithSelectedSpace(String userId, String spaceType, String[] psIds) throws Exception;
	
	public ProductService getProductService(String userId, String id) throws Exception;
	public String setProductService(String userId, ProductService productService) throws Exception;
	public void removeProductService(String userId, String id) throws Exception;
	
	public String getProductServicePicture(String user, String psId) throws Exception;

	public String setUser(String userId, User user) throws Exception;
	public void removeUser(String userId, String id) throws Exception;	
	public User getUser(String userId, String id) throws Exception;
	public int getUserSize(String userId, UserCond cond) throws Exception;
	public User[] getUsers(String userId, UserCond cond) throws Exception;
	
	
	
	public Map<String, Object> showConnectedActivity(Map<String, String> param) throws Exception;	// 연결된 activity정보를 가져온다.
	public boolean disConnect_SBPService(Map<String, String> param) throws Exception;				// SBP와 연결을 끊는다.
	public boolean insertSbpMapData(Map<String, Object> sbpData) throws Exception;					// SBP Map에서 선택한 activity정보들을 DB에 채운다.
	public SBPService getSBPService(String psId) throws Exception;									// 연결된 SBP Project 정보를 가져온다.
	public boolean set_PSS_SBP_Servcie_Connect(Map<String, Object> requestBody) throws Exception;	// PSS프로젝트와 SBP프로젝트를 연결시켜준다 
	public boolean set_PSS_BusinessContext(Map<String, String> requestBody) throws Exception;
	public BusinessContext get_PSS_BusinessContext(String psId) throws Exception;
}
