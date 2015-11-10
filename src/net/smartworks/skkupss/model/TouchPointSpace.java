package net.smartworks.skkupss.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import net.smartworks.factory.ManagerFactory;
import net.smartworks.util.SmartUtil;

public class TouchPointSpace{

	
	private String id;
	private String psId;
	private TouchPoint[] touchPoints;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPsId() {
		return psId;
	}
	public void setPsId(String psId) {
		this.psId = psId;
	}	
	public TouchPoint[] getTouchPoints() {
		return touchPoints;
	}
	public void setTouchPoints(TouchPoint[] touchPoints) {
		this.touchPoints = touchPoints;
	}
	public static TouchPointSpace createTouchPointSpace(List<Map<String, Object>> frmSpaceTouchPoints){
		if(frmSpaceTouchPoints==null) return null;
		
		TouchPoint[] touchPoints = new TouchPoint[frmSpaceTouchPoints.size()];
		for(int i=0; i<frmSpaceTouchPoints.size(); i++){
			Map<String, Object> frmSpaceTouchPoint = frmSpaceTouchPoints.get(i);
			touchPoints[i] = new TouchPoint();
			TouchPoint tp = touchPoints[i];
			tp.setReceiverName((String)frmSpaceTouchPoint.get("txtReceiverName"));
			tp.setReceiverInteraction((String)frmSpaceTouchPoint.get("selReceiverInteractionType"));
			tp.setTouchPointName((String)frmSpaceTouchPoint.get("txtTouchPointName"));
			Map<String, Object> imgTouchPoint = (Map<String, Object>)frmSpaceTouchPoint.get("imgTouchPoint");
			if(imgTouchPoint!=null){
				List<Map<String, String>> files = (ArrayList<Map<String, String>>)imgTouchPoint.get("files");
				if(files!=null && files.size()==1){
					tp.setTouchPointImage(files.get(0).get("fileId"));
				}
			}
			tp.setProviderName((String)frmSpaceTouchPoint.get("txtProviderName"));
			tp.setProviderInteraction((String)frmSpaceTouchPoint.get("selProviderInteractionType"));
			
			Affordance rAffordance = new Affordance();
			rAffordance.setAffordanceName((String)frmSpaceTouchPoint.get("txtRAffordanceName"));
			Map<String, Object> imgRAffordance = (Map<String, Object>)frmSpaceTouchPoint.get("imgRAffordance");
			if(imgRAffordance!=null){
				List<Map<String, String>> files = (ArrayList<Map<String, String>>)imgRAffordance.get("files");
				if(files!=null && files.size()==1){
					rAffordance.setAffordanceImage(files.get(0).get("fileId"));
				}
			}
			tp.setReceiverAffordances(new Affordance[]{rAffordance});
			Affordance pAffordance = new Affordance();
			pAffordance.setAffordanceName((String)frmSpaceTouchPoint.get("txtPAffordanceName"));
			Map<String, Object> imgPAffordance = (Map<String, Object>)frmSpaceTouchPoint.get("imgPAffordance");
			if(imgPAffordance!=null){
				List<Map<String, String>> files = (ArrayList<Map<String, String>>)imgPAffordance.get("files");
				if(files!=null && files.size()==1){
					pAffordance.setAffordanceImage(files.get(0).get("fileId"));
				}
			}			
			tp.setProviderAffordances(new Affordance[]{pAffordance});
		}
		TouchPointSpace touchPointSpace = new TouchPointSpace();
		touchPointSpace.setTouchPoints(touchPoints);		
		return touchPointSpace;
	}
}
