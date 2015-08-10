/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 11. 20.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.skkupss.manager;

import net.smartworks.skkupss.model.ProductService;
import net.smartworks.skkupss.model.ProductServiceCond;
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
}
