/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 4. 9.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.factory;

import java.io.InputStream;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class SessionFactory {

	private static SessionFactory sessionFactory;
	public static SessionFactory getInstance() {
		if (sessionFactory != null) {
			return sessionFactory;
		} else {
			sessionFactory = new SessionFactory();
			return sessionFactory;
		}
	}
	public SqlSessionFactory getSqlSessionFactory() throws Exception {
		return getSqlSessionFactory(null);
	}
	public SqlSessionFactory getSqlSessionFactory(String environment) throws Exception {
		String resource = "net/smartworks/conf/mybatis-config.xml";
		InputStream inputStream = Resources.getResourceAsStream(resource);
		
		SqlSessionFactory sqlSessionFactory = null;
		if (environment != null) {
			sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream, environment);
		} else {
			sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
		}
		return sqlSessionFactory;
	}
}
