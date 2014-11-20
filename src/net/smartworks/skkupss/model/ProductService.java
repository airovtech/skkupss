package net.smartworks.skkupss.model;

import java.util.Date;

public class ProductService{

	private String id;
	private String name;
	private String picture;
	private String desc;
	private ValueSpace value;
	private ServiceSpace Service;
	private BizModelSpace bizModel;
	private DefaultSpace productService;
	private DefaultSpace product;
	private DefaultSpace touchPoint;
	private DefaultSpace customer;
	private DefaultSpace actor;
	private DefaultSpace society;
	private DefaultSpace context;
	private DefaultSpace time;
	private DefaultSpace environment;
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
	public ValueSpace getValue() {
		return value;
	}
	public void setValue(ValueSpace value) {
		this.value = value;
	}
	public ServiceSpace getService() {
		return Service;
	}
	public void setService(ServiceSpace service) {
		Service = service;
	}
	public BizModelSpace getBizModel() {
		return bizModel;
	}
	public void setBizModel(BizModelSpace bizModel) {
		this.bizModel = bizModel;
	}
	public DefaultSpace getProductService() {
		return productService;
	}
	public void setProductService(DefaultSpace productService) {
		this.productService = productService;
	}
	public DefaultSpace getProduct() {
		return product;
	}
	public void setProduct(DefaultSpace product) {
		this.product = product;
	}
	public DefaultSpace getTouchPoint() {
		return touchPoint;
	}
	public void setTouchPoint(DefaultSpace touchPoint) {
		this.touchPoint = touchPoint;
	}
	public DefaultSpace getCustomer() {
		return customer;
	}
	public void setCustomer(DefaultSpace customer) {
		this.customer = customer;
	}
	public DefaultSpace getActor() {
		return actor;
	}
	public void setActor(DefaultSpace actor) {
		this.actor = actor;
	}
	public DefaultSpace getSociety() {
		return society;
	}
	public void setSociety(DefaultSpace society) {
		this.society = society;
	}
	public DefaultSpace getContext() {
		return context;
	}
	public void setContext(DefaultSpace context) {
		this.context = context;
	}
	public DefaultSpace getTime() {
		return time;
	}
	public void setTime(DefaultSpace time) {
		this.time = time;
	}
	public DefaultSpace getEnvironment() {
		return environment;
	}
	public void setEnvironment(DefaultSpace environment) {
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
