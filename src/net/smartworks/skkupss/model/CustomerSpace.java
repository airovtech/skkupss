package net.smartworks.skkupss.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;

import net.smartworks.util.SmartUtil;

public class CustomerSpace{

	public final static int CUSTOMER_TYPE_LEVEL1 		= 0;
	public final static int CUSTOMER_TYPE_LEVEL2 		= 1;
	public final static int CUSTOMER_TYPE_LEVEL3 		= 2;
	public final static int CUSTOMER_TYPE_LEVEL4 		= 3;
		
	
	private String id;
	private String psId;
	private String[] types;
	private String[] activityTypes;

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPsId() {
		return psId;
	}
	public void setPsId(String psId) {
		this.psId = psId;
	}
		
	public String[] getTypes() {
		return types;
	}
	public String getTypesWithComma() {
		if(SmartUtil.isBlankObject(types)) return "";
		String result = "";
		for(int i=0; i<types.length; i++)
			result = result + (result.equals("")?"":",") + types[i];
		return result;
	}
	public void setTypes(String[] types) {
		this.types = types;
	}
	public void setTypesWithCommaString(String types) {
		if(types==null) return;
		this.types = types.split(",");
	}
	public String[] getActivityTypes() {
		return activityTypes;
	}
	public String getActivityTypesWithComma() {
		if(SmartUtil.isBlankObject(activityTypes)) return "";
		String result = "";
		for(int i=0; i<activityTypes.length; i++)
			result = result + (result.equals("")?"":",") + activityTypes[i];
		return result;
	}
	public void setActivityTypes(String[] activityTypes) {
		this.activityTypes = activityTypes;
	}

	public void setActivityTypesWithCommaString(String activityTypes) {
		if(activityTypes==null) return;
		this.activityTypes = activityTypes.split(",");
	}

	public static String getCustomerTypeCode(String customerType, int level){
		if(customerType==null || customerType.length()!=8) return null;
		switch(level){
		case CUSTOMER_TYPE_LEVEL1:
			return customerType.substring(0, 2);
		case CUSTOMER_TYPE_LEVEL2:
			return customerType.substring(2, 4);
		case CUSTOMER_TYPE_LEVEL3:
			return customerType.substring(4, 6);
		case CUSTOMER_TYPE_LEVEL4:
			return customerType.substring(6, 8);
		}
		return null;
	}
	public static String setUnspscCode(String customerType, int level, String value){
		if(customerType==null || customerType.length()!=8 || value==null || value.length()!=2) return null;
		switch(level){
		case CUSTOMER_TYPE_LEVEL1:
			return value + customerType.substring(2,8);
		case CUSTOMER_TYPE_LEVEL2:
			return customerType.substring(0,2) + value + customerType.substring(4,8);
		case CUSTOMER_TYPE_LEVEL3:
			return customerType.substring(0,4) + value + customerType.substring(6,8);
		case CUSTOMER_TYPE_LEVEL4:
			return customerType.substring(0,6) + value;
		}
		return null;
	}
	public static CustomerSpace createCustomerSpace(Map<String, Object> spaceTab){
		if(SmartUtil.isBlankObject(spaceTab)) return null;
		
		CustomerSpace customerSpace = new CustomerSpace();
		List<String> typeList = (ArrayList<String>)spaceTab.get("types");
		if(typeList!=null){
			String[] types = new String[typeList.size()];
			customerSpace.setTypes(typeList.toArray(types));
		}

		List<String> activityTypeList = (ArrayList<String>)spaceTab.get("activityTypes");
		if(activityTypeList!=null){
			String[] activityTypes = new String[activityTypeList.size()];
			customerSpace.setActivityTypes(activityTypeList.toArray(activityTypes));
		}
		return customerSpace;
	}	
}
