package net.smartworks.skkupss.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import net.smartworks.util.SmartUtil;

public class ServiceSpace{

	public static final int TOTAL_ACT_TYPES = 5;
	
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
