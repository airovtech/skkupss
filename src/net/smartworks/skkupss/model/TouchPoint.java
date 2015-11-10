package net.smartworks.skkupss.model;

import org.springframework.util.StringUtils;

import net.smartworks.util.SmartUtil;

public class TouchPoint{

	private final static String delimiter_touch_point = "$TP$";
	private final static String delimiter2_touch_point = "\\$TP\\$";
	
	private String receiverName;
	private String receiverInteraction;
	private Affordance[] receiverAffordances;
	private String touchPointImage;
	private String touchPointName;
	private String providerName;
	private String providerInteraction;
	private Affordance[] providerAffordances;

	public String getReceiverName() {
		return receiverName;
	}
	public void setReceiverName(String receiverName) {
		this.receiverName = receiverName;
	}
	public String getReceiverInteraction() {
		return receiverInteraction;
	}
	public void setReceiverInteraction(String receiverInteraction) {
		this.receiverInteraction = receiverInteraction;
	}
	public Affordance[] getReceiverAffordances() {
		return receiverAffordances;
	}
	public void setReceiverAffordances(Affordance[] receiverAffordances) {
		this.receiverAffordances = receiverAffordances;
	}
	public String getTouchPointImage() {
		return touchPointImage;
	}
	public void setTouchPointImage(String touchPointImage) {
		this.touchPointImage = touchPointImage;
	}
	public String getTouchPointName() {
		return touchPointName;
	}
	public void setTouchPointName(String touchPointName) {
		this.touchPointName = touchPointName;
	}
	public String getProviderName() {
		return providerName;
	}
	public void setProviderName(String providerName) {
		this.providerName = providerName;
	}
	public String getProviderInteraction() {
		return providerInteraction;
	}
	public void setProviderInteraction(String providerInteraction) {
		this.providerInteraction = providerInteraction;
	}
	public Affordance[] getProviderAffordances() {
		return providerAffordances;
	}
	public void setProviderAffordances(Affordance[] providerAffordances) {
		this.providerAffordances = providerAffordances;
	}
	public String toString(){
		String stringValue = this.receiverName+delimiter_touch_point
							+this.receiverInteraction+delimiter_touch_point
							+this.touchPointImage+delimiter_touch_point
							+this.touchPointName+delimiter_touch_point
							+this.providerName+delimiter_touch_point
							+this.providerInteraction+delimiter_touch_point;
		if(!SmartUtil.isBlankObject(this.receiverAffordances)){
			for(int i=0; i<this.receiverAffordances.length; i++){
				if(this.receiverAffordances[i]==null) continue;
				stringValue = stringValue+(i==0?"":Affordance.delimiter_affordance)+this.receiverAffordances[i].toString();
			}
		}
		stringValue = stringValue +delimiter_touch_point;
		if(!SmartUtil.isBlankObject(this.providerAffordances)){
			for(int i=0; i<this.providerAffordances.length; i++){
				if(this.providerAffordances[i]==null) continue;
				stringValue = stringValue+(i==0?"":Affordance.delimiter_affordance)+this.providerAffordances[i].toString();
			}
		}
		return stringValue;		
	}
	public static TouchPoint createTouchPoint(String stringValue){
		if(stringValue==null) return null;
		String[] valueStrings = stringValue.split(TouchPoint.delimiter2_touch_point);
		if(SmartUtil.isBlankObject(valueStrings) || valueStrings.length != 8) return null;
		TouchPoint touchPoint = new TouchPoint();
		touchPoint.setReceiverName(valueStrings[0]);
		touchPoint.setReceiverInteraction(valueStrings[1]);
		touchPoint.setTouchPointImage(valueStrings[2]);
		touchPoint.setTouchPointName(valueStrings[3]);
		touchPoint.setProviderName(valueStrings[4]);
		touchPoint.setProviderInteraction(valueStrings[5]);
		touchPoint.setReceiverAffordances(TouchPoint.createAffordances(valueStrings[6]));
		touchPoint.setProviderAffordances(TouchPoint.createAffordances(valueStrings[7]));
		return touchPoint;
	}

	public static Affordance[] createAffordances(String stringValue){
		if(stringValue==null) return null;
		String[] valueStrings = stringValue.split(Affordance.delimiter2_affordance);
		Affordance[] affordances = new Affordance[valueStrings.length / 2];
		for(int i=0, j=0; i<valueStrings.length; i++,j++){
			affordances[j] = new Affordance();
			affordances[j].setAffordanceName(valueStrings[i++]);
			affordances[j].setAffordanceImage(valueStrings[i]);
		}
		return affordances;
	}
}
