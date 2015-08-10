/*
 * $Id: Login.java,v 1.1 2009/12/16 05:42:52 kmyu Exp $
 * created by    : CHO DAE HYON
 * creation-date : 2007. 1. 6.
 * =========================================================
 * Copyright (c) 2007 Miracom, Inc. All rights reserved.
 */
package net.smartworks.skkupss.model;

import java.util.Collection;

import net.smartworks.util.LocalDate;
import net.smartworks.util.SmartUtil;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class Login implements UserDetails {

	private static final String AUTH_ID_ADMINISTRATOR = "ADMINISTRATOR";
	private static final String AUTH_ID_USER = "USER";
	
	private static final long serialVersionUID = 109756771178872916L;
	private String id;
	private String password;
	private String name;
	private String username;
	private String authId;
	private String picture;
	private String company;
	private String mobileNo;
	private String homePhoneNo;
	private String homeAddress;
	private String locale;
	private String timeZone;
	private String bigPictureName;
	private String smallPictureName;
	
	private Collection<GrantedAuthority> authorities; // ê¶????

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getAuthId() {
		return authId;
	}
	public void setAuthId(String authId) {
		this.authId = authId;
	}
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getMobileNo() {
		return mobileNo;
	}
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
	public String getLocale() {
		return locale;
	}
	public void setLocale(String locale) {
		this.locale = locale;
	}
	public String getTimeZone() {
		return timeZone;
	}
	public void setTimeZone(String timeZone) {
		this.timeZone = timeZone;
	}
	public String getBigPictureName() {
		return bigPictureName;
	}
	public void setBigPictureName(String bigPictureName) {
		this.bigPictureName = bigPictureName;
	}
	public String getSmallPictureName() {
		return smallPictureName;
	}
	public void setSmallPictureName(String smallPictureName) {
		this.smallPictureName = smallPictureName;
	}
	public Collection<GrantedAuthority> getAuthorities() {
		return authorities;
	}
	public void setAuthorities(Collection<GrantedAuthority> authorities) {
		this.authorities = authorities;
	}
	public String getHomePhoneNo() {
		return homePhoneNo;
	}
	public void setHomePhoneNo(String homePhoneNo) {
		this.homePhoneNo = homePhoneNo;
	}
	public String getHomeAddress() {
		return homeAddress;
	}
	public void setHomeAddress(String homeAddress) {
		this.homeAddress = homeAddress;
	}
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	@Override
	public boolean isEnabled() {
		return true;
	}
	
	public int getUserLevel(){
		return Login.getUserLevel(this.authId);
	}
	
	public static int getUserLevel(String authId){
		if(SmartUtil.isBlankObject(authId)) return User.USER_LEVEL_USER;
		if(authId.equals(AUTH_ID_ADMINISTRATOR)) return User.USER_LEVEL_ADMINISTRATOR;
		if(authId.equals(AUTH_ID_USER)) return User.USER_LEVEL_USER;
		return User.USER_LEVEL_USER;
	}
	public static String getAuthId(int userLevel){
		switch(userLevel){
		case User.USER_LEVEL_USER:
			return AUTH_ID_USER;
		case User.USER_LEVEL_ADMINISTRATOR:
			return AUTH_ID_ADMINISTRATOR;
		}
		return AUTH_ID_USER;
	}
}