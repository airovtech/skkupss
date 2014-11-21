package net.smartworks.common;


public class Order {

	private String field;
	private boolean isAsc = true;

	public Order() {
		super();
	}
	public Order(String columnName, boolean isAsc) {
		super();
		this.field = columnName;
		this.isAsc = isAsc;
	}

	public String getField() {
		return field;
	}
	public void setField(String field) {
		this.field = field;
	}
	public boolean isAsc() {
		return isAsc;
	}
	public void setAsc(boolean isAsc) {
		this.isAsc = isAsc;
	}
}