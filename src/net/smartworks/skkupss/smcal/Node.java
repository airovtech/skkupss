package net.smartworks.skkupss.smcal;

public class Node{
	
	public static final String TYPE_PRODUCT = "product";
	public static final String TYPE_PROVIDER = "provider";
	public static final String TYPE_TOUCHPOINT = "touchPoint";
	public static final String TYPE_USER = "user";
	
	public static final String NODE_TYPE_PRODUCT = "A";
	public static final String NODE_TYPE_PROVIDER = "B";
	public static final String NODE_TYPE_USER = "C";
	public static final String NODE_TYPE_TOUCHPOINT = "D";
	
	private String id = null;
	private String type = null;
	private String name = null;
	
	public Node(String id, String type, String name){
		this.id = id;
		// 2016.09.19 Modified by Y.S.Jung
		// 실제로 실행시에는, type에 'produce', 'provider', 'touchPoint', 'user'값이 들어있음으로 getNodeType()을 호출하여 Node Type을 가져와야 한다.
		// 카이스트에서 테스트시에는, 주석처리하 아래 주석되어있는 this.type = type;을 사용하여야 한다. 
		this.type = Node.getNodeType(type);
//		this.type = type;
		this.name = name;
	}
	
	// 2016.09.21 Modified by Y.S.Jung
	public Node(String id, String type, String name, String typeName, boolean isPrimaryCustomer){
		this.id = id;
		this.name = name;
		this.type = Node.getNodeTypeFromName(typeName, isPrimaryCustomer);
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
	// 2016.09.21 Modified by Y.S.Jung
	public static String getNodeTypeFromName(String typeName, boolean isPrimaryCustomer){
		if(typeName==null) return NODE_TYPE_TOUCHPOINT;
		if(typeName.equals("제공자") || typeName.equals("provider")) return NODE_TYPE_PROVIDER;
		if(typeName.equals("수혜자") || typeName.equals("receiver")){
			if(isPrimaryCustomer)
				return NODE_TYPE_PRODUCT;
			return NODE_TYPE_USER;
		}
		return NODE_TYPE_TOUCHPOINT;
	}
}
