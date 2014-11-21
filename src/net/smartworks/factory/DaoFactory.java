/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 4. 9.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.factory;

import net.smartworks.skkupss.dao.IDbDao;
import net.smartworks.skkupss.dao.impl.DbDaoImpl;

public class DaoFactory {

	private static DaoFactory daoFactory;
	private static IDbDao dbDao;
	
	public static DaoFactory getInstance() {
		if (daoFactory != null) {
			return daoFactory;
		} else {
			daoFactory = new DaoFactory();
			return daoFactory;
		}
	}
	public IDbDao getDbDao() throws Exception {
		if (dbDao != null) {
			return dbDao;
		} else {
			dbDao = new DbDaoImpl();
			return dbDao;
		}
	}
}
