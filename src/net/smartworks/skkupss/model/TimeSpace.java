package net.smartworks.skkupss.model;

import java.util.Map;

import net.smartworks.util.SmartUtil;

public class TimeSpace{

	private final byte VALUE_FALSE = '0';
	private final byte VALUE_TRUE = '1';
	private final String DEFAULT_VALUES = "0000";
	
	private String id;
	private String psId;
	private String valueString = DEFAULT_VALUES;
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

	public String getValueString() {
		return valueString;
	}
	public void setValueString(String valueString) {
		this.valueString = valueString;
	}
	public boolean isDiscreteTransaction() {
		return isTrueValue(0);
	}
	
	public void setDiscreteTransaction(boolean discreteTransaction) {
		setValue(0, discreteTransaction);
	}
	public boolean isAvailableAtCertainTimes() {
		return isTrueValue(1);
	}
	public void setAvailableAtCertainTimes(boolean availableAtCertainTimes) {
		setValue(1, availableAtCertainTimes);
	}
	public boolean isAvailableWhenNeeded() {
		return isTrueValue(2);
	}
	public void setAvailableWhenNeeded(boolean availableWhenNeeded) {
		setValue(2, availableWhenNeeded);
	}
	public boolean isContinuousDelivery() {
		return isTrueValue(3);
	}
	public void setContinuousDelivery(boolean continuousDelivery) {
		setValue(3, continuousDelivery);
	}
	
	public boolean isTrueValue(int index) {
		if(valueString==null || valueString.length()!=4) return false;
		byte[] valueBytes = valueString.getBytes();
		return valueBytes[index] == VALUE_TRUE;
	}
	public void setValue(int index, boolean value) {
		if(valueString==null || valueString.length()!=4) valueString = DEFAULT_VALUES;
		byte[] valueBytes = valueString.getBytes();
		valueBytes[index] = (value?VALUE_TRUE:VALUE_FALSE);
		valueString = new String(valueBytes);
	}
	
	public static TimeSpace createTimeSpace(Map<String, Object> frmSpaceTime){
		if(frmSpaceTime==null) return null;
		
		TimeSpace timeSpace = new TimeSpace();		
		
		timeSpace.setDiscreteTransaction("on".equals((String)frmSpaceTime.get("rdoDiscreteTransaction")));
		timeSpace.setAvailableAtCertainTimes("on".equals((String)frmSpaceTime.get("rdoAvailableAtCertainTimes")));
		timeSpace.setAvailableWhenNeeded("on".equals((String)frmSpaceTime.get("rdoAvailableWhenNeeded")));
		timeSpace.setContinuousDelivery("on".equals((String)frmSpaceTime.get("rdoContinuousDelivery")));
		return timeSpace;
	}
}
