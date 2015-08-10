package net.smartworks.skkupss.model;

import java.util.TimeZone;

import net.smartworks.util.LocalDate;
import net.smartworks.util.LocaleInfo;
import net.smartworks.util.PropertiesLoader;
import net.smartworks.util.SmartUtil;

public class User{

	public static final int USER_LEVEL_USER = 1;
	public static final int USER_LEVEL_ADMINISTRATOR = 11;

	public static final String NO_PICTURE_PATH = "images/";
	public static final String  NO_USER_PICTURE  = "no_user_picture";

	private String id;
	private String password;
	private String name;
	private int userLevel = USER_LEVEL_USER;
	private String picture;
	private String bigPictureName;
	private String smallPictureName;
	private String company;
	private String mobilePhoneNo;
	private String homePhoneNo;
	private String homeAddress;
	private String locale = LocaleInfo.LOCALE_DEFAULT;
	private String timeZone = LocalDate.TIMEZONE_SEOUL; 
	
	public User(){
		super();
	}
	public User(String id, String name){
		this.id = id;
		this.name = name;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getUserLevel() {
		return userLevel;
	}
	public void setUserLevel(int userLevel) {
		this.userLevel = userLevel;
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
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getMobilePhoneNo() {
		return mobilePhoneNo;
	}
	public void setMobilePhoneNo(String mobilePhoneNo) {
		this.mobilePhoneNo = mobilePhoneNo;
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
	
	public String getLongName(){
		return (SmartUtil.isBlankObject(this.company) ? "" : this.company + " ") +  this.name;
	}
	public int getTimeOffsetInHour(){
		if(timeZone==null) return 0;
		return TimeZone.getTimeZone(timeZone).getRawOffset()/LocalDate.ONE_HOUR;
	}	
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	public String getOrgPicture() {
		if(SmartUtil.isBlankObject(this.getPicture())) {
			return NO_PICTURE_PATH + User.NO_USER_PICTURE + ".jpg";
		}
		return getPath() + this.getPicture();
	}

	public String getMidPicture() {
		if(SmartUtil.isBlankObject(this.getSmallPictureName())) {
			return NO_PICTURE_PATH + User.NO_USER_PICTURE + "_mid.jpg";
		}
		return getPath() + this.getSmallPictureName();
	}

	public String getMinPicture() {
		if(SmartUtil.isBlankObject(this.getSmallPictureName())) {
			return NO_PICTURE_PATH + User.NO_USER_PICTURE + "_min.jpg";
		}
		return getPath() + this.getSmallPictureName();
	}

	public static String getPath() {
		String PSS_PICTURE_URL = PropertiesLoader.loadPropByClassPath("/net/smartworks/conf/config.properties").getProperty("pss.picture.url");
		return PSS_PICTURE_URL; 
	}
	
}
