package net.smartworks.skkupss.model;

import java.util.Map;

import net.smartworks.util.SmartUtil;

public class DefaultSpace{

	private String[] elements;
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
	
	public static DefaultSpace createDefaultSpaceWithDelimeter(String frmSpaceDefault, String delimiter){
		if(frmSpaceDefault==null) return null;
		
		DefaultSpace defaultSpace = new DefaultSpace();		
		
		defaultSpace.setElements(frmSpaceDefault.split(delimiter));
		return defaultSpace;
	}
	
	public static DefaultSpace createSocietySpace(Map<String, Object> frmSpaceDefault){
		if(frmSpaceDefault==null) return null;
		
		DefaultSpace defaultSpace = new DefaultSpace();		
		
		String[] values = new String[]{null, null, null, null, null, null, null, null, null};
		values[0] = (String)frmSpaceDefault.get("selSocietyCustomer");
		values[1] = (String)frmSpaceDefault.get("selSocietyManufacturer");
		String sp1 = ("on".equals((String)frmSpaceDefault.get("chkServiceProvider1")))?"Inhouse":"";
		String sp2 = ("on".equals((String)frmSpaceDefault.get("chkServiceProvider2")))?"외부기업":"";
		String sp3 = ("on".equals((String)frmSpaceDefault.get("chkServiceProvider3")))?"외부개인":"";
		String sp4 = ("on".equals((String)frmSpaceDefault.get("chkServiceProvider4")))?"기타":"";
		values[2] = sp1 + "," + sp2 + "," + sp3 + "," + sp4;
		String rc1 = ("on".equals((String)frmSpaceDefault.get("chkRelatedCompany1")))?"제조기업":null;
		String rc2 = ("on".equals((String)frmSpaceDefault.get("chkRelatedCompany2")))?"서비스기업":null;
		String rc3 = ("on".equals((String)frmSpaceDefault.get("chkRelatedCompany3")))?"기타":null;
		values[3] = rc1 + "," + rc2 + "," + rc3;
		values[4] = (String)frmSpaceDefault.get("selSocietyRelatedGovernment");
		values[5] = (String)frmSpaceDefault.get("selSocietyRelatedFinance");
		values[6] = (String)frmSpaceDefault.get("selSocietyRelatedSocialOrg");
		values[7] = (String)frmSpaceDefault.get("selSocietyRelatedMedia");
		values[8] = (String)frmSpaceDefault.get("selSocietyRelatedRNTOrg");
		defaultSpace.setElements(values);
		return defaultSpace;
	}
	public static DefaultSpace createEnvironmentSpace(Map<String, Object> frmSpaceDefault){
		if(frmSpaceDefault==null) return null;
		
		DefaultSpace defaultSpace = new DefaultSpace();		
		
		String[] values = new String[]{null, null};
		values[0] = (String)frmSpaceDefault.get("selEnvironmentRegion");
		String env1 = ("on".equals((String)frmSpaceDefault.get("chkEnvironment1")))?"오프라인":"";
		String env2 = ("on".equals((String)frmSpaceDefault.get("chkEnvironment2")))?"온라인":"";
		values[1] = env1 + "," + env2;
		defaultSpace.setElements(values);
		return defaultSpace;
	}
}
