package net.smartworks.skkupss.model;

import java.util.Map;

import net.smartworks.util.SmartUtil;

public class ServiceSpace{

	public static final int TOTAL_ACT_TYPES = 5;
	public static final String KEY_VALUE_STRING = "%KEY%";
	
	private String id;
	private String psId;
	private String[] sspp;
	private String[] ssp;
	private String[] sspc;
	private String[] ssc;
	private String[] sscc;
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
	public String[] getSspp() {
		return sspp;
	}
	public void setSspp(String[] sspp) {
		this.sspp = sspp;
	}
	public String[] getSsp() {
		return ssp;
	}
	public void setSsp(String[] ssp) {
		this.ssp = ssp;
	}
	public String[] getSspc() {
		return sspc;
	}
	public void setSspc(String[] sspc) {
		this.sspc = sspc;
	}
	public String[] getSsc() {
		return ssc;
	}
	public void setSsc(String[] ssc) {
		this.ssc = ssc;
	}
	public String[] getSscc() {
		return sscc;
	}
	public void setSscc(String[] sscc) {
		this.sscc = sscc;
	}

	public int[] getNumOfActs(){
		int[] numOfActs = new int[TOTAL_ACT_TYPES+1];
		numOfActs[0] = SmartUtil.getNumOfValidStrings(this.sspp);
		numOfActs[1] = SmartUtil.getNumOfValidStrings(this.ssp);
		numOfActs[2] = SmartUtil.getNumOfValidStrings(this.sspc);
		numOfActs[3] = SmartUtil.getNumOfValidStrings(this.ssc);
		numOfActs[4] = SmartUtil.getNumOfValidStrings(this.sscc);
		numOfActs[TOTAL_ACT_TYPES] = 0;
		return numOfActs;
	}
	
	public String[] getValues(){
		int ssppSize = SmartUtil.getNumOfValidStrings(this.sspp);
		int sspSize = SmartUtil.getNumOfValidStrings(this.ssp);
		int sspcSize = SmartUtil.getNumOfValidStrings(this.sspc);
		int sscSize = SmartUtil.getNumOfValidStrings(this.ssc);
		int ssccSize = SmartUtil.getNumOfValidStrings(this.sscc);
		String[] values = new String[ssppSize+sspSize+sspcSize+sscSize+ssccSize+1];
		int count = 0;
		for(int i=0; i<ssppSize; i++)
			values[count++] = getKeyWordFromValue(this.sspp[i]);
		for(int i=0; i<sspSize; i++)
			values[count++] = getKeyWordFromValue(this.ssp[i]);
		for(int i=0; i<sspcSize; i++)
			values[count++] = getKeyWordFromValue(this.sspc[i]);
		for(int i=0; i<sscSize; i++)
			values[count++] = getKeyWordFromValue(this.ssc[i]);
		for(int i=0; i<ssccSize; i++)
			values[count++] = getKeyWordFromValue(this.sscc[i]);
		values[values.length-1] = "0";
		return values;
	}
	
	private static boolean isKeyWord(String word){
		if(SmartUtil.isBlankObject(word)) return false;
		return word.startsWith(KEY_VALUE_STRING);
	}
	
	private String getKeyWordFromValue(String value){
		if(SmartUtil.isBlankObject(value)) return value;
		String[] tokens = value.split(" ");
		String keyWord = tokens[0];
		for(int i=0; i<tokens.length; i++)
			if(isKeyWord(tokens[i]))
				return tokens[i].replaceAll(KEY_VALUE_STRING, "");
		return keyWord;
	}
	
	public static String getValueHtml(String value){
		if(SmartUtil.isBlankObject(value)) return "";
		String[] tokens = value.split(" ");
		boolean found = false;
		for(int i=0; i<tokens.length; i++){
			if(isKeyWord(tokens[i])){
				tokens[i] = "<span style='color:blue;'>" + tokens[i].replaceAll(KEY_VALUE_STRING, "") + "</span>";
				found = true;
				break;
			}
		}
		if(!found){
			tokens[0] = "<span style='color:blue;'>" + tokens[0] + "</span>";
		}
		String htmlString = "";
		for(int i=0; i<tokens.length; i++)
			htmlString = htmlString + tokens[i] + (i==tokens.length-1?"": " ");
		return htmlString;
		
	}
	
	public static String getValueString(String value){
		if(SmartUtil.isBlankObject(value)) return "";
		return value.replaceAll(KEY_VALUE_STRING, "");
	}
	
	public static ServiceSpace createServiceSpace(Map<String, Object> frmSpaceService){
		if(frmSpaceService==null) return null;
		
		ServiceSpace serviceSpace = new ServiceSpace();		
		String[] values = null;
		
		serviceSpace.setSspp(SmartUtil.getStringArray((Object)frmSpaceService.get("txtSsppItem")));
		serviceSpace.setSsp(SmartUtil.getStringArray((Object)frmSpaceService.get("txtSspItem")));
		serviceSpace.setSspc(SmartUtil.getStringArray((Object)frmSpaceService.get("txtSspcItem")));
		serviceSpace.setSsc(SmartUtil.getStringArray((Object)frmSpaceService.get("txtSscItem")));
		serviceSpace.setSscc(SmartUtil.getStringArray((Object)frmSpaceService.get("txtSsccItem")));
		return serviceSpace;
	}
}
