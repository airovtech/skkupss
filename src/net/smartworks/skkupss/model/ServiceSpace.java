package net.smartworks.skkupss.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import net.smartworks.util.SmartUtil;

public class ServiceSpace{

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
