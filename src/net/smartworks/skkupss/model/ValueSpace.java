package net.smartworks.skkupss.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import net.smartworks.util.SmartUtil;

public class ValueSpace{

	private String id;
	private String psId;
	private String[] economical;
	private String[] ecological;
	private String[] function;
	private String[] extrinsicSocial;
	private String[] activeEmotional;
	private String[] reactiveEmotional;
	private String[] intrinsicSocial;
	private String[] epistemic;

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
	public String[] getEconomical() {
		return economical;
	}
	public void setEconomical(String[] economical) {
		this.economical = economical;
	}
	public String[] getEcological() {
		return ecological;
	}
	public void setEcological(String[] ecological) {
		this.ecological = ecological;
	}
	public String[] getFunction() {
		return function;
	}
	public void setFunction(String[] function) {
		this.function = function;
	}
	public String[] getExtrinsicSocial() {
		return extrinsicSocial;
	}
	public void setExtrinsicSocial(String[] extrinsicSocial) {
		this.extrinsicSocial = extrinsicSocial;
	}
	public String[] getActiveEmotional() {
		return activeEmotional;
	}
	public void setActiveEmotional(String[] activeEmotional) {
		this.activeEmotional = activeEmotional;
	}
	public String[] getReactiveEmotional() {
		return reactiveEmotional;
	}
	public void setReactiveEmotional(String[] reactiveEmotional) {
		this.reactiveEmotional = reactiveEmotional;
	}
	public String[] getIntrinsicSocial() {
		return intrinsicSocial;
	}
	public void setIntrinsicSocial(String[] intrinsicSocial) {
		this.intrinsicSocial = intrinsicSocial;
	}
	public String[] getEpistemic() {
		return epistemic;
	}
	public void setEpistemic(String[] epistemic) {
		this.epistemic = epistemic;
	}
	
	public static ValueSpace createValueSpace(Map<String, Object> frmSpaceValue){
		if(frmSpaceValue==null) return null;
		
		ValueSpace valueSpace = new ValueSpace();		
		valueSpace.setEconomical(SmartUtil.getStringArray((Object)frmSpaceValue.get("txtEconomicalItem")));		
		valueSpace.setEcological(SmartUtil.getStringArray((Object)frmSpaceValue.get("txtEcologicalItem")));
		valueSpace.setFunction(SmartUtil.getStringArray((Object)frmSpaceValue.get("txtFunctionItem")));
		valueSpace.setExtrinsicSocial(SmartUtil.getStringArray((Object)frmSpaceValue.get("txtExtrinsicSocialItem")));
		valueSpace.setActiveEmotional(SmartUtil.getStringArray((Object)frmSpaceValue.get("txtActiveEmotionalItem")));
		valueSpace.setReactiveEmotional(SmartUtil.getStringArray((Object)frmSpaceValue.get("txtReactiveEmotionalItem")));
		valueSpace.setIntrinsicSocial(SmartUtil.getStringArray((Object)frmSpaceValue.get("txtIntrinsicSocialItem")));
		valueSpace.setEpistemic(SmartUtil.getStringArray((Object)frmSpaceValue.get("txtEpistemicItem")));
		return valueSpace;
	}
}
