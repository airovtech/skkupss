package net.smartworks.skkupss.model;

import net.smartworks.util.IdUtil;

public class Affordance{

	public final static String delimiter_affordance = "$AF$";
	public final static String delimiter2_affordance = "\\$AF\\$";
	
	private String id;
	private String affordanceName;
	private String affordanceImage;
		
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
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
		return this.id+delimiter_affordance+this.affordanceName+delimiter_affordance+this.affordanceImage;
	}
	
	public static Affordance getReceiverAffordanceById(String id, TouchPoint touchPoint){
		if(id==null || touchPoint==null || touchPoint.getReceiverAffordances()==null) return null;
		for(int i=0; i<touchPoint.getReceiverAffordances().length; i++)
			if(id.equals(touchPoint.getReceiverAffordances()[i].getId()))
				return touchPoint.getReceiverAffordances()[i];
		return null;
	}
	
	public static Affordance getProviderAffordanceById(String id, TouchPoint touchPoint){
		if(id==null || touchPoint==null || touchPoint.getProviderAffordances()==null) return null;
		for(int i=0; i<touchPoint.getProviderAffordances().length; i++)
			if(id.equals(touchPoint.getProviderAffordances()[i].getId()))
				return touchPoint.getProviderAffordances()[i];
		return null;
	}

	public static String createNewId(){
		return "AF_" + new IdUtil().generate();
	}
	
}
