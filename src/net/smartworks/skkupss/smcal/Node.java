package net.smartworks.skkupss.smcal;

public class Node{
	
	private static final String TYPE_PRODUCT = "product";
	private static final String TYPE_PROVIDER = "provider";
	private static final String TYPE_TOUCHPOINT = "touchPoint";
	private static final String TYPE_USER = "user";
	
	public static final String NODE_TYPE_PRODUCT = "A";
	public static final String NODE_TYPE_PROVIDER = "B";
	public static final String NODE_TYPE_USER = "C";
	public static final String NODE_TYPE_TOUCHPOINT = "D";
	
	private String id = null;
	private String type = null;
	private String name = null;
	
	public Node(String id, String type, String name){
		this.id = id;
		this.type = Node.getNodeType(type);
		this.name = name;
	}
	
	public Node(String id, String type, String name, String typeName){
		this.id = id;
		this.name = name;
		this.type = Node.getNodeTypeFromName(typeName);
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

	public static String getNodeType(String type){
		if(type==null) return null;
		if(type.equals(TYPE_PRODUCT)) return NODE_TYPE_PRODUCT;
		if(type.equals(TYPE_PROVIDER)) return NODE_TYPE_PROVIDER;
		if(type.equals(TYPE_TOUCHPOINT)) return NODE_TYPE_TOUCHPOINT;
		if(type.equals(TYPE_USER)) return NODE_TYPE_USER;
		return null;
	}
	public static String getNodeTypeFromName(String typeName){
		if(typeName==null) return NODE_TYPE_PRODUCT;
		if(typeName.equals("제공자")) return NODE_TYPE_PROVIDER;
		if(typeName.equals("수혜자")) return NODE_TYPE_USER;
		return NODE_TYPE_PRODUCT;
	}
}
