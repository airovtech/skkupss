/*	
 * $Id: SmartConfUtil.java,v 1.1 2011/10/20 04:06:06 ysjung Exp $
 * created by    : SHIN HYUN SEONG
 * creation-date : 2011. 10. 15.
 * =========================================================
 * Copyright (c) 2011 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.util;

public class SmartConfUtil {

	private static SmartConfUtil util;

	private String imageServer;
	private String smartServer;
	private String messagingServer;
	
	private String windowsImageDirectory;
	private String macImageDirectory;
	private String unixImageDirectory;
	private String solarisImageDirectory;

	private String smartServerDirectory;
	private String imageServerDirectory;

	//DB Connection Information
	private String id;
	private String driverClassName;
	private String url;
	private String username;
	private String password;

	public String getImageServer() {
		return imageServer;
	}
	public void setImageServer(String imageServer) {
		this.imageServer = imageServer;
	}
	public String getSmartServer() {
		return smartServer;
	}
	public void setSmartServer(String smartServer) {
		this.smartServer = smartServer;
	}
	public String getMessagingServer() {
		return messagingServer;
	}
	public void setMessagingServer(String messagingServer) {
		this.messagingServer = messagingServer;
	}
	public String getWindowsImageDirectory() {
		return windowsImageDirectory;
	}
	public void setWindowsImageDirectory(String windowsImageDirectory) {
		this.windowsImageDirectory = windowsImageDirectory;
	}
	public String getMacImageDirectory() {
		return macImageDirectory;
	}
	public void setMacImageDirectory(String macImageDirectory) {
		this.macImageDirectory = macImageDirectory;
	}
	public String getUnixImageDirectory() {
		return unixImageDirectory;
	}
	public void setUnixImageDirectory(String unixImageDirectory) {
		this.unixImageDirectory = unixImageDirectory;
	}
	public String getSolarisImageDirectory() {
		return solarisImageDirectory;
	}
	public void setSolarisImageDirectory(String solarisImageDirectory) {
		this.solarisImageDirectory = solarisImageDirectory;
	}
	public String getSmartServerDirectory() {
		return smartServerDirectory;
	}
	public void setSmartServerDirectory(String smartServerDirectory) {
		this.smartServerDirectory = smartServerDirectory;
	}
	public String getImageServerDirectory() {
		return imageServerDirectory;
	}
	public void setImageServerDirectory(String imageServerDirectory) {
		this.imageServerDirectory = imageServerDirectory;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getDriverClassName() {
		return driverClassName;
	}
	public void setDriverClassName(String driverClassName) {
		this.driverClassName = driverClassName;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
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
	public static SmartConfUtil getInstance() {
		if(util == null)
			util = new SmartConfUtil();
		return util;
	}
	public static synchronized SmartConfUtil createInstance() {
		if(util == null)
			util = new SmartConfUtil();
		return util;
	}

}