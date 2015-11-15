package net.smartworks.skkupss.model;

import net.smartworks.util.IdUtil;
import net.smartworks.util.SmartUtil;

public class TouchPoint{

	private final static String delimiter_touch_point = "$TP$";
	private final static String delimiter2_touch_point = "\\$TP\\$";
	
	private String id;
	private String receiverName;
	private String receiverInteraction;
	private Affordance[] receiverAffordances;
	private String touchPointImage;
	private String touchPointName;
	private String providerName;
	private String providerInteraction;
	private Affordance[] providerAffordances;

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
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
		String stringValue = this.id+delimiter_touch_point
							+this.receiverName+delimiter_touch_point
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
		if(SmartUtil.isBlankObject(valueStrings) || (valueStrings.length > 9 || valueStrings.length < 7)) return null;
		TouchPoint touchPoint = new TouchPoint();
		touchPoint.setId(valueStrings[0]);
		touchPoint.setReceiverName(valueStrings[1]);
		touchPoint.setReceiverInteraction(valueStrings[2]);
		touchPoint.setTouchPointImage(valueStrings[3]);
		touchPoint.setTouchPointName(valueStrings[4]);
		touchPoint.setProviderName(valueStrings[5]);
		touchPoint.setProviderInteraction(valueStrings[6]);
		if(valueStrings.length == 9){
			touchPoint.setReceiverAffordances(TouchPoint.createAffordances(valueStrings[7]));
			touchPoint.setProviderAffordances(TouchPoint.createAffordances(valueStrings[8]));
		}
		return touchPoint;
	}

	public static Affordance[] createAffordances(String stringValue){
		if(stringValue==null) return null;
		String[] valueStrings = stringValue.split(Affordance.delimiter2_affordance);
		if(valueStrings.length % 3 != 0) return null;
		Affordance[] affordances = new Affordance[valueStrings.length / 3];
		for(int i=0, j=0; i<valueStrings.length; i++,j++){
			affordances[j] = new Affordance();
			affordances[j].setId(valueStrings[i++]);
			affordances[j].setAffordanceName(valueStrings[i++]);
			affordances[j].setAffordanceImage(valueStrings[i]);
		}
		return affordances;
	}
	
	public static TouchPoint getTouchPointById(String id, TouchPointSpace touchPointSpace){
		if(id==null || touchPointSpace==null || touchPointSpace.getTouchPoints()==null) return null;
		for(int i=0; i<touchPointSpace.getTouchPoints().length; i++)
			if(id.equals(touchPointSpace.getTouchPoints()[i].getId()))
				return touchPointSpace.getTouchPoints()[i];
		return null;
	}
	
	public static String createNewId(){
		return "TP_" + new IdUtil().generate();
	}
}
