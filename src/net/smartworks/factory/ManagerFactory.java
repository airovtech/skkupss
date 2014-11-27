/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 4. 9.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.factory;

import net.smartworks.skkupss.manager.IDbManager;
import net.smartworks.skkupss.manager.IDocFileManager;
import net.smartworks.skkupss.manager.IServiceManager;
import net.smartworks.skkupss.manager.impl.DbManagerImpl;
import net.smartworks.skkupss.manager.impl.DocFileManagerImpl;
import net.smartworks.skkupss.manager.impl.ServiceManagerImpl;


public class ManagerFactory {

	private static ManagerFactory managerFactory;
	private static IServiceManager serviceManager;
	private static IDbManager dbManager;
	private static IDocFileManager docFileManager;
	
	public static ManagerFactory getInstance() {
		if (managerFactory != null) {
			return managerFactory;
		} else {
			managerFactory = new ManagerFactory();
			return managerFactory;
		}
	}
	public IServiceManager getServiceManager() throws Exception {
		if (serviceManager != null) {
			return serviceManager;
		} else {
			serviceManager = new ServiceManagerImpl();
			return serviceManager;
		}
	}
	public IDbManager getDbManager() throws Exception {
		if (dbManager != null) {
			return dbManager;
		} else {
			dbManager = new DbManagerImpl();
			return dbManager;
		}
	}
	public IDocFileManager getDocFileManager() throws Exception {
		if (docFileManager != null) {
			return docFileManager;
		} else {
			docFileManager = new DocFileManagerImpl();
			return docFileManager;
		}
	}
}
