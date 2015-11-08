/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 11. 20.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.skkupss.manager;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.smartworks.skkupss.model.InstanceList;
import net.smartworks.skkupss.model.ProductService;
import net.smartworks.skkupss.model.RequestParams;
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
}
