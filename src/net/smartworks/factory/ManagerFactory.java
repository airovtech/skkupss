/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 4. 9.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.factory;

import net.smartworks.skkupss.manager.IServiceManager;
import net.smartworks.skkupss.manager.impl.ServiceManagerImpl;


public class ManagerFactory {

	private static ManagerFactory managerFactory;
	private static IServiceManager serviceManager;
	
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
}
