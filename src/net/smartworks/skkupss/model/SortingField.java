package net.smartworks.skkupss.model;

public class SortingField {
	
	private String fieldId = "createdDate";
	private boolean isAscending = false;
	
	public String getFieldId() {
		return fieldId;
	}

	public void setFieldId(String fieldId) {
		this.fieldId = fieldId;
	}

	public boolean isAscending() {
		return isAscending;
	}

	public void setAscending(boolean isAscending) {
		this.isAscending = isAscending;
	}

	public SortingField(){
		super();
	}
	public SortingField(String fieldId, boolean isAscending){
		this.fieldId = fieldId;
		this.setAscending(isAscending);
	}

}
