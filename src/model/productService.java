package model;

import java.util.Date;

public class productService{

	private String id;
	private String name;
	private String picture;
	private String desc;
	private valueSpace value;
	private serviceSpace Service;
	private bizModelSpace bizModel;
	private defaultSpace productService;
	private defaultSpace product;
	private defaultSpace touchPoint;
	private defaultSpace customer;
	private defaultSpace actor;
	private defaultSpace society;
	private defaultSpace context;
	private defaultSpace time;
	private defaultSpace environment;
	private String lastModifiedUser;
	private Date lastModifiedDate;
	private String createdUser;
	private Date createdDate;
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
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public valueSpace getValue() {
		return value;
	}
	public void setValue(valueSpace value) {
		this.value = value;
	}
	public serviceSpace getService() {
		return Service;
	}
	public void setService(serviceSpace service) {
		Service = service;
	}
	public bizModelSpace getBizModel() {
		return bizModel;
	}
	public void setBizModel(bizModelSpace bizModel) {
		this.bizModel = bizModel;
	}
	public defaultSpace getProductService() {
		return productService;
	}
	public void setProductService(defaultSpace productService) {
		this.productService = productService;
	}
	public defaultSpace getProduct() {
		return product;
	}
	public void setProduct(defaultSpace product) {
		this.product = product;
	}
	public defaultSpace getTouchPoint() {
		return touchPoint;
	}
	public void setTouchPoint(defaultSpace touchPoint) {
		this.touchPoint = touchPoint;
	}
	public defaultSpace getCustomer() {
		return customer;
	}
	public void setCustomer(defaultSpace customer) {
		this.customer = customer;
	}
	public defaultSpace getActor() {
		return actor;
	}
	public void setActor(defaultSpace actor) {
		this.actor = actor;
	}
	public defaultSpace getSociety() {
		return society;
	}
	public void setSociety(defaultSpace society) {
		this.society = society;
	}
	public defaultSpace getContext() {
		return context;
	}
	public void setContext(defaultSpace context) {
		this.context = context;
	}
	public defaultSpace getTime() {
		return time;
	}
	public void setTime(defaultSpace time) {
		this.time = time;
	}
	public defaultSpace getEnvironment() {
		return environment;
	}
	public void setEnvironment(defaultSpace environment) {
		this.environment = environment;
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

}
