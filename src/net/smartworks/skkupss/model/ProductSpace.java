package net.smartworks.skkupss.model;

import java.util.Map;

import org.json.JSONObject;

import net.smartworks.util.SmartUtil;

public class ProductSpace{

	public final static int UNSPSC_CODE_LEVEL1 		= 0;
	public final static int UNSPSC_CODE_LEVEL2 		= 1;
	public final static int UNSPSC_CODE_LEVEL3 		= 2;
	public final static int UNSPSC_CODE_LEVEL4 		= 3;
	
	public final static int STEP_INSTALLATION 		= 0;
	public final static int STEP_USE 				= 1;
	public final static int STEP_SUPPLEMENT 		= 2;
	public final static int STEP_MAINTENANCE_SUPPORT= 3;
	public final static int STEP_UPGRADE	 		= 4;
	public final static int STEP_STORAGE 			= 5;
	public final static int STEP_RECYCLE 			= 6;
	public final static int STEP_DISPOSAL 			= 7;
	public final static int STEP_DESIGN 			= 8;
	public final static int STEP_PRODUCTION 		= 9;
	public final static int STEP_SALE 				= 10;
	public final static int STEP_DELIVERY 			= 11;
	
	public final static int[] UNSPSC_CODES = {25, 26, 27, 30, 32, 39, 40, 42, 47, 48, 49, 52, 53, 54, 56, 60, 72, 73, 76, 78, 80, 81, 85, 91};
	public final static int[][] test = {{0, 10, 16},
										{0, 10, 16}};
	
	
	private String id;
	private String psId;
	private String unspsc;
	private String lifecycleSteps;
	
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
	
	public String getUnspsc() {
		return unspsc;
	}
	public void setUnspsc(String unspsc) {
		this.unspsc = unspsc;
	}
	public String getLifecycleSteps() {
		return lifecycleSteps;
	}
	public void setLifecycleSteps(String lifecycleSteps) {
		this.lifecycleSteps = lifecycleSteps;
	}
	
	public void setStepChecked(int step, boolean checked){
		if(lifecycleSteps==null || lifecycleSteps.length()!=12 || step<0 || step>11) return;
		byte[] lifecycleStepsInByte = lifecycleSteps.getBytes();
		lifecycleStepsInByte[step] = checked ? (byte)49:(byte)48;
	}
	public boolean isStepChecked(int step){
		if(lifecycleSteps==null || lifecycleSteps.length()!=12 || step<0 || step>11) return false;
		byte[] lifecycleStepsInByte = lifecycleSteps.getBytes();
		return (lifecycleStepsInByte[step] == '1');
		
	}
	public String getUnspscCode(int level){
		if(unspsc==null || unspsc.length()!=8) return null;
		switch(level){
		case UNSPSC_CODE_LEVEL1:
			return unspsc.substring(0, 2);
		case UNSPSC_CODE_LEVEL2:
			return unspsc.substring(2, 4);
		case UNSPSC_CODE_LEVEL3:
			return unspsc.substring(4, 6);
		case UNSPSC_CODE_LEVEL4:
			return unspsc.substring(6, 8);
		}
		return null;
	}
	public void setUnspscCode(int level, String value){
		if(unspsc==null || unspsc.length()!=8 || value==null || value.length()!=2) return;
		switch(level){
		case UNSPSC_CODE_LEVEL1:
			unspsc = value + unspsc.substring(2,8);
			break;
		case UNSPSC_CODE_LEVEL2:
			unspsc = unspsc.substring(0,2) + value + unspsc.substring(4,8);
			break;
		case UNSPSC_CODE_LEVEL3:
			unspsc = unspsc.substring(0,4) + value + unspsc.substring(6,8);
			break;
		case UNSPSC_CODE_LEVEL4:
			unspsc = unspsc.substring(0,6) + value;
			break;
		}
	}
	public static String getUnspscNameCode(String unspscName, int level){
		if(unspscName==null || unspscName.length()!=8) return null;
		switch(level){
		case UNSPSC_CODE_LEVEL1:
			return unspscName.substring(0, 2);
		case UNSPSC_CODE_LEVEL2:
			return unspscName.substring(2, 4);
		case UNSPSC_CODE_LEVEL3:
			return unspscName.substring(4, 6);
		case UNSPSC_CODE_LEVEL4:
			return unspscName.substring(6, 8);
		}
		return null;
	}
	public static ProductSpace createProductSpace(Map<String, String> spaceTab){
		if(SmartUtil.isBlankObject(spaceTab)) return null;
		
		ProductSpace productSpace = new ProductSpace();
		productSpace.setUnspsc((String)spaceTab.get("unspscCode"));
		productSpace.setLifecycleSteps((String)spaceTab.get("lifecycleSteps"));
		return productSpace;
	}
	
	public static int getUnspscCode0FromUnspscName(String unspscName){
		if(unspscName==null || unspscName.length()!=8) return 0;
		return ProductSpace.getUnspscCode0FromCodeLevel1(unspscName.substring(0, 2));
	}
	
	public static int getUnspscCode0FromCodeLevel1(String codeLevel1){
		int code1 = 0;
		try{
			code1 = Integer.parseInt(codeLevel1);
		}catch(Exception e){}
		
		if(code1>=10 && code1<=15) return 1;
		if(code1>=20 && code1<=27) return 2;
		if(code1>=30 && code1<=41) return 3;
		if(code1>=42 && code1<=60) return 4;
		if(code1>=70 && code1<=94) return 5;
		return 0;
		
	}
}
