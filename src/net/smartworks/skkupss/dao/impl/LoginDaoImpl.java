/*
 * $Id: LoginDaoImpl.java,v 1.1 2009/12/16 05:43:00 kmyu Exp $
 * created by    : jiwoongLee
 * creation-date : Apr 5, 2008
 * =========================================================
 * Copyright (c) 2008 ManInSoft, Inc. All rights reserved.
 */
package net.smartworks.skkupss.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;

import javax.sql.DataSource;

import net.smartworks.skkupss.dao.LoginDao;
import net.smartworks.skkupss.model.Login;
import net.smartworks.util.CommonUtil;
import net.smartworks.util.LocalDate;
import net.smartworks.util.LocaleInfo;
import net.smartworks.util.SmartUtil;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.jdbc.object.MappingSqlQuery;
import org.springframework.orm.ObjectRetrievalFailureException;

/**
 * @spring.bean id= "loginDao"
 * @spring.property name="dataSource" ref="dataSource"
 */
public class LoginDaoImpl extends JdbcDaoSupport implements LoginDao {

	private static String RETRIEVE_USER = 
			 " select id, passwd, name, authId, picture, company, mobileNo, homePhoneNo, homeAddress, locale, timeZone, creator, createdTime, modifier, modifiedTime " +
			 " from orguser" +
			 " where orguser.id = ?";
	protected SelectQuery00 selectQuery00;
	
	/*
	 * (non-Javadoc)
	 * @see org.springframework.dao.support.DaoSupport#initDao()
	 */
	protected void initDao() throws Exception {
		super.initDao();
		this.selectQuery00 = new SelectQuery00(getDataSource());
	}

	/*
	 * (non-Javadoc)
	 * @see com.maninsoft.smart.portal.webapp.common.dao.LoginDao#isExistUserId(java.lang.String)
	 */
	public boolean isExistUserId(String userId) throws DataAccessException {
		return false;
	}

	/*
	 * (non-Javadoc)
	 * @see com.maninsoft.smart.portal.webapp.common.dao.LoginDao#retrieve(java.lang.String)
	 */
	public Login retrieve(String userName) throws DataAccessException {
		return this.retrieveUserId(userName);
	}

	/*
	 * (non-Javadoc)
	 * @see com.maninsoft.smart.portal.webapp.common.dao.LoginDao#retrieveUserId(java.lang.String)
	 */
	public Login retrieveUserId(String userId) throws DataAccessException, ObjectRetrievalFailureException {
		
		Login login = (Login) selectQuery00.findObject(userId);
				
		if(login == null){
			throw new ObjectRetrievalFailureException("tried Login Id: "+userId+" ", login);
		}
		return login; 
	}

	protected class SelectQuery00 extends MappingSqlQuery {
		protected SelectQuery00(DataSource ds) {
			super(ds, RETRIEVE_USER);
			declareParameter(new SqlParameter(Types.VARCHAR));
			compile();
		}
		protected Object mapRow(ResultSet rs, int rowNum) throws SQLException {

			Login login = new Login();
			login.setId(rs.getString("id"));
			login.setPassword(rs.getString("passwd"));
			login.setName(rs.getString("name"));
			login.setAuthId(rs.getString("authId"));
			String picture = CommonUtil.toNotNull(rs.getString("picture"));
			login.setPicture(picture);
			if(!picture.equals("")) {
				if(SmartUtil.isBlankObject(picture)) return null;			
				String[] tokens = picture.split("\\.");
				if(tokens.length==2){
					login.setBigPictureName(tokens[0] + "_thumb." + tokens[1]);
					login.setSmallPictureName(tokens[0] + "_thumb." + tokens[1]);
				}else{
					login.setBigPictureName(picture);					
				}
			} else {
				login.setBigPictureName(null);
				login.setSmallPictureName(null);
			}
			login.setCompany(rs.getString("company"));
			login.setMobileNo(rs.getString("mobileNo"));
			login.setHomePhoneNo(rs.getString("homePhoneNo"));
			login.setHomeAddress(rs.getString("homeAddress"));
			login.setLocale(rs.getString("locale"));

			String locale = CommonUtil.toNotNull(login.getLocale());
			if(locale.equals(""))
				locale = LocaleInfo.LOCALE_DEFAULT;
			login.setLocale(locale);

			String timeZone = CommonUtil.toNotNull(rs.getString("timeZone"));
			if(timeZone.equals(""))
				timeZone = LocalDate.TIMEZONE_SEOUL;
			login.setTimeZone(timeZone);
			
			return login;
		}
	}

}
