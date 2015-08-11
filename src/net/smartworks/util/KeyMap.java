package net.smartworks.util;

public class KeyMap {

	private String id;
	private String key;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public KeyMap(String id, String key){
		super();
		this.id = id;
		this.key = key;
	}
	
	public static String getKeyById(KeyMap[] keyMaps, String id){
		if(keyMaps==null || id==null) return null;
		for(int i=0; i<keyMaps.length; i++)
			if(id.equals(keyMaps[i].getId()))
				return keyMaps[i].getKey();
		
		return null;
	}
}
