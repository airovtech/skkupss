/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 11. 20.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.skkupss.model.db;

import java.util.Date;

public class Db_ProductService {
	
	private String id;
	private String name;
	private String picture;
	private String description;
	private String productServiceSpace;
	private String productSpace;
	private String touchPointSpace;
	private String customerSpace;
	private String actorSpace;
	private String societySpace;
	private String contextSpace;
	private String timeSpace;
	private String environmentSpace;
	private String lastModifiedUser;
	private Date lastModifiedDate;
	private String createdUser;
	private Date createdDate;
	
	private Db_ValueSpace valueSpace;
	private Db_ServiceSpace serviceSpace;
	private Db_BizModelSpace bizModelSpace;

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
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getProductServiceSpace() {
		return productServiceSpace;
	}
	public void setProductServiceSpace(String productServiceSpace) {
		this.productServiceSpace = productServiceSpace;
	}
	public String getProductSpace() {
		return productSpace;
	}
	public void setProductSpace(String productSpace) {
		this.productSpace = productSpace;
	}
	public String getTouchPointSpace() {
		return touchPointSpace;
	}
	public void setTouchPointSpace(String touchPointSpace) {
		this.touchPointSpace = touchPointSpace;
	}
	public String getCustomerSpace() {
		return customerSpace;
	}
	public void setCustomerSpace(String customerSpace) {
		this.customerSpace = customerSpace;
	}
	public String getActorSpace() {
		return actorSpace;
	}
	public void setActorSpace(String actorSpace) {
		this.actorSpace = actorSpace;
	}
	public String getSocietySpace() {
		return societySpace;
	}
	public void setSocietySpace(String societySpace) {
		this.societySpace = societySpace;
	}
	public String getContextSpace() {
		return contextSpace;
	}
	public void setContextSpace(String contextSpace) {
		this.contextSpace = contextSpace;
	}
	public String getTimeSpace() {
		return timeSpace;
	}
	public void setTimeSpace(String timeSpace) {
		this.timeSpace = timeSpace;
	}
	public String getEnvironmentSpace() {
		return environmentSpace;
	}
	public void setEnvironmentSpace(String environmentSpace) {
		this.environmentSpace = environmentSpace;
	}
	public String getLastModifiedUser() {
		return lastModifiedUser;
	}
	public void setLastModifiedUser(String lastModifiedUser) {
		this.lastModifiedUser = lastModifiedUser;
	}
	public Date getLastModifiedDate() {
		return lastModifiedDate;
	}
	public void setLastModifiedDate(Date lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}
	public String getCreatedUser() {
		return createdUser;
	}
	public void setCreatedUser(String createdUser) {
		this.createdUser = createdUser;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public Db_ValueSpace getValueSpace() {
		return valueSpace;
	}
	public void setValueSpace(Db_ValueSpace valueSpace) {
		this.valueSpace = valueSpace;
	}
	public Db_ServiceSpace getServiceSpace() {
		return serviceSpace;
	}
	public void setServiceSpace(Db_ServiceSpace serviceSpace) {
		this.serviceSpace = serviceSpace;
	}
	public Db_BizModelSpace getBizModelSpace() {
		return bizModelSpace;
	}
	public void setBizModelSpace(Db_BizModelSpace bizModelSpace) {
		this.bizModelSpace = bizModelSpace;
	}
	
}


