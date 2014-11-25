package net.smartworks.skkupss.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import net.smartworks.util.SmartUtil;

public class DefaultSpace{

//	private String id;
//	private String psId;
	private String[] elements;
//	public String getId() {
//		return id;
//	}
//	public void setId(String id) {
//		this.id = id;
//	}
//	public String getPsId() {
//		return psId;
//	}
//	public void setPsId(String psId) {
//		this.psId = psId;
//	}
	public String[] getElements() {
		return elements;
	}
	public void setElements(String[] elements) {
		this.elements = elements;
	}

	public static DefaultSpace createDefaultSpace(Map<String, Object> frmSpaceDefault){
		if(frmSpaceDefault==null) return null;
		
		DefaultSpace defaultSpace = new DefaultSpace();		
		
		defaultSpace.setElements(SmartUtil.getStringArray((Object)frmSpaceDefault.get("txtElementItem")));
		return defaultSpace;
	}
}
