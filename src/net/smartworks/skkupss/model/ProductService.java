package net.smartworks.skkupss.model;

import java.util.Date;

public class ProductService{
	
	public static final String PSS_SPACE_VALUE = "valueSpace";
	public static final String PSS_SPACE_SERVICE = "serviceSpace";
	public static final String PSS_SPACE_BIZ_MODEL = "bizModelSpace";
	public static final String PSS_SPACE_PRODUCT_SERVICE = "productServiceSpace";
	public static final String PSS_SPACE_PRODUCT = "productSpace";
	public static final String PSS_SPACE_TOUCH_POINT = "touchPointSpace";
	public static final String PSS_SPACE_CUSTOMER = "customerSpace";
	public static final String PSS_SPACE_ACTOR = "actorSpace";
	public static final String PSS_SPACE_SOCIETY = "societySpace";
	public static final String PSS_SPACE_CONTEXT = "contextSpace";
	public static final String PSS_SPACE_TIME = "timeSpace";
	public static final String PSS_SPACE_ENVIRONMENT = "environmentSpace";
	
	public static final String PSS_SPACE_VALUE_SERVICE = "valueServiceSpace";
	public static final String PSS_SPACE_VALUE_BIZ_MODEL = "valueBizModelSpace";
	public static final String PSS_SPACE_SERVICE_BIZ_MODEL = "serviceBizModelSpace";
	public static final String PSS_SPACE_VALUE_SERVICE_BIZ_MODEL = "valueServiceBizModelSpace";
		
	public static final String FIELD_ID 				= "id";	
	public static final String FIELD_NAME 				= "name";
	public static final String FIELD_PICTURE 			= "picture";
	public static final String FIELD_DESC 				= "desc";
	public static final String FIELD_LAST_MODIFIED_USER = "lastModifiedUser";
	public static final String FIELD_LAST_MODIFIED_DATE = "lastModifiedDate";
	public static final String FIELD_CREATED_USER 		= "createdUser";
	public static final String FIELD_CREATED_DATE 		= "createdDate";

	public static final int SPACE_TYPE_NONE = -1;
	public static final int SPACE_TYPE_ALL = 0;
	public static final int SPACE_TYPE_VALUE = 1;
	public static final int SPACE_TYPE_PRODUCT_SERVICE = 2;
	public static final int SPACE_TYPE_PRODUCT = 3;	
	public static final int SPACE_TYPE_SERVICE = 4;
	public static final int SPACE_TYPE_TOUCH_POINT = 5;
	public static final int SPACE_TYPE_CUSTOMER = 6;
	public static final int SPACE_TYPE_BIZ_MODEL = 7;
	public static final int SPACE_TYPE_ACTOR = 8;
	public static final int SPACE_TYPE_SOCIETY = 9;
	public static final int SPACE_TYPE_CONTEXT = 10;
	public static final int SPACE_TYPE_TIME = 11;
	public static final int SPACE_TYPE_ENVIRONMENT = 12;
	
	public static final int SPACE_TYPE_VALUE_SERVICE = 914;
	public static final int SPACE_TYPE_VALUE_BIZ_MODEL = 917;
	public static final int SPACE_TYPE_SERVICE_BIZ_MODEL = 947;
	public static final int SPACE_TYPE_VALUE_SERVICE_BIZ_MODEL = 9147;
	
	private int spaceType=SPACE_TYPE_ALL;
	private String id;
	private String name;
	private String picture;
	private String desc;
	private ValueSpace valueSpace;
	private ServiceSpace serviceSpace;
	private BizModelSpace bizModelSpace;
	private DefaultSpace productServiceSpace;
	private DefaultSpace productSpace;
	private DefaultSpace touchPointSpace;
	private DefaultSpace customerSpace;
	private DefaultSpace actorSpace;
	private DefaultSpace societySpace;
	private DefaultSpace contextSpace;
	private DefaultSpace timeSpace;
	private DefaultSpace environmentSpace;
	private String lastModifiedUser;
	private Date lastModifiedDate;
	private String createdUser;
	private Date createdDate;
	
	
	public int getSpaceType() {
		return spaceType;
	}
	public void setSpaceType(int spaceType) {
		this.spaceType = spaceType;
	}
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
	public ValueSpace getValueSpace() {
		return valueSpace;
	}
	public void setValueSpace(ValueSpace valueSpace) {
		this.valueSpace = valueSpace;
	}
	public ServiceSpace getServiceSpace() {
		return serviceSpace;
	}
	public void setServiceSpace(ServiceSpace serviceSpace) {
		this.serviceSpace = serviceSpace;
	}
	public BizModelSpace getBizModelSpace() {
		return bizModelSpace;
	}
	public void setBizModelSpace(BizModelSpace bizModelSpace) {
		this.bizModelSpace = bizModelSpace;
	}
	public DefaultSpace getProductServiceSpace() {
		return productServiceSpace;
	}
	public void setProductServiceSpace(DefaultSpace productServiceSpace) {
		this.productServiceSpace = productServiceSpace;
	}
	public DefaultSpace getProductSpace() {
		return productSpace;
	}
	public void setProductSpace(DefaultSpace productSpace) {
		this.productSpace = productSpace;
	}
	public DefaultSpace getTouchPointSpace() {
		return touchPointSpace;
	}
	public void setTouchPointSpace(DefaultSpace touchPointSpace) {
		this.touchPointSpace = touchPointSpace;
	}
	public DefaultSpace getCustomerSpace() {
		return customerSpace;
	}
	public void setCustomerSpace(DefaultSpace customerSpace) {
		this.customerSpace = customerSpace;
	}
	public DefaultSpace getActorSpace() {
		return actorSpace;
	}
	public void setActorSpace(DefaultSpace actorSpace) {
		this.actorSpace = actorSpace;
	}
	public DefaultSpace getSocietySpace() {
		return societySpace;
	}
	public void setSocietySpace(DefaultSpace societySpace) {
		this.societySpace = societySpace;
	}
	public DefaultSpace getContextSpace() {
		return contextSpace;
	}
	public void setContextSpace(DefaultSpace contextSpace) {
		this.contextSpace = contextSpace;
	}
	public DefaultSpace getTimeSpace() {
		return timeSpace;
	}
	public void setTimeSpace(DefaultSpace timeSpace) {
		this.timeSpace = timeSpace;
	}
	public DefaultSpace getEnvironmentSpace() {
		return environmentSpace;
	}
	public void setEnvironmentSpace(DefaultSpace environmentSpace) {
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

	public static int getSpaceType(String spaceName){
		if(spaceName==null) return SPACE_TYPE_NONE;
		
		if(spaceName.equals(PSS_SPACE_VALUE)) return SPACE_TYPE_VALUE;
		if(spaceName.equals(PSS_SPACE_SERVICE)) return SPACE_TYPE_SERVICE;
		if(spaceName.equals(PSS_SPACE_BIZ_MODEL)) return SPACE_TYPE_BIZ_MODEL;
		if(spaceName.equals(PSS_SPACE_PRODUCT_SERVICE)) return SPACE_TYPE_PRODUCT_SERVICE;
		if(spaceName.equals(PSS_SPACE_PRODUCT)) return SPACE_TYPE_PRODUCT;
		if(spaceName.equals(PSS_SPACE_TOUCH_POINT)) return SPACE_TYPE_TOUCH_POINT;
		if(spaceName.equals(PSS_SPACE_CUSTOMER)) return SPACE_TYPE_CUSTOMER;
		if(spaceName.equals(PSS_SPACE_ACTOR)) return SPACE_TYPE_ACTOR;
		if(spaceName.equals(PSS_SPACE_SOCIETY)) return SPACE_TYPE_SOCIETY;
		if(spaceName.equals(PSS_SPACE_TIME)) return SPACE_TYPE_TIME;
		if(spaceName.equals(PSS_SPACE_ENVIRONMENT)) return SPACE_TYPE_ENVIRONMENT;
		if(spaceName.equals(PSS_SPACE_VALUE_SERVICE)) return SPACE_TYPE_VALUE_SERVICE;
		if(spaceName.equals(PSS_SPACE_VALUE_BIZ_MODEL)) return SPACE_TYPE_VALUE_BIZ_MODEL;
		if(spaceName.equals(PSS_SPACE_SERVICE_BIZ_MODEL)) return SPACE_TYPE_SERVICE_BIZ_MODEL;
		if(spaceName.equals(PSS_SPACE_VALUE_SERVICE_BIZ_MODEL)) return SPACE_TYPE_VALUE_SERVICE_BIZ_MODEL;

		return SPACE_TYPE_NONE;
	}
}
