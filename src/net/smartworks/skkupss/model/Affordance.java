package net.smartworks.skkupss.model;

public class Affordance{

	public final static String delimiter_affordance = "$AF$";
	public final static String delimiter2_affordance = "\\$AF\\$";
	
	private String affordanceName;
	private String affordanceImage;
	public String getAffordanceName() {
		return affordanceName;
	}
	public void setAffordanceName(String affordanceName) {
		this.affordanceName = affordanceName;
	}
	public String getAffordanceImage() {
		return affordanceImage;
	}
	public void setAffordanceImage(String affordanceImage) {
		this.affordanceImage = affordanceImage;
	}
	
	public String toString(){
		return this.affordanceName+delimiter_affordance+this.affordanceImage;
	}
}
