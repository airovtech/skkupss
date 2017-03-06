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

import javax.servlet.http.HttpServletRequest;

import net.smartworks.skkupss.model.InstanceList;
import net.smartworks.skkupss.model.ProductService;
import net.smartworks.skkupss.model.RequestParams;
import net.smartworks.skkupss.model.SBPService;
import net.smartworks.skkupss.model.SimilarityMatrix;
import net.smartworks.skkupss.model.SimilaritySpaceType;
import net.smartworks.skkupss.model.User;

public interface IServiceManager {

	public InstanceList getProductInstanceList(RequestParams params) throws Exception;
	
	public String setProductService(String userId, ProductService productService, int spaceType) throws Exception;
	
	public void removeProductService(String psId) throws Exception;
	
	public ProductService getProductService(String psId, int spaceType) throws Exception;
	
	public RequestParams setInstanceListParams(Map<String, Object> requestBody, HttpServletRequest request) throws Exception;

	public SimilarityMatrix[][] caculatePsSimilarities(String[] psIds, String[] psNames, SimilaritySpaceType[] simSpaceTypes) throws Exception;
	
	public String getProductServicePicture(String userId, String psId) throws Exception;
	
	public InstanceList getUserInstanceList(RequestParams params) throws Exception;
	
	public String setUser(String userId, User user) throws Exception;
	
	public void removeUser(String userId) throws Exception;
	
	public User getUser(String userId) throws Exception;
	
	
	
	
	public Map<String, Object> showConnectedActivity(Map<String, String> param) throws Exception;		// 연결된 activity정보를 가져온다. 
	
	public boolean disConnect_SBPService(Map<String, String> param) throws Exception;		// SBP와 연결을 끊는다. 
	
	public boolean insertSbpMapData(Map<String, Object> sbpData) throws Exception;			// SBP Map에서 선택한 activity정보들을 DB에 채운다.
	
	public SBPService getSBPService(String psId) throws Exception; 							// 연결된 SBP Project 정보를 가져온다.
	
	public boolean set_PSS_SBP_Servcie_Connect(Map<String, Object> requestBody) throws Exception; 	// PSS 프로젝트와 SBP프로젝트를 연결시켜준다. 
}
