package net.smartworks.skkupss.smcal;
public class Node{
	
	public static final String NODE_TYPE_PRODUCT = "product";
	public static final String NODE_TYPE_PRIVIDER = "provider";
	public static final String NODE_TYPE_TOUCHPOINT = "touchPoint";
	public static final String NODE_TYPE_USER = "user";
	
	private String id = null;
	private String type = null;
	private String name = null;
	
	public Node(String id, String type, String name){
		this.id = id;
		this.type = type;
		this.name = name;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
