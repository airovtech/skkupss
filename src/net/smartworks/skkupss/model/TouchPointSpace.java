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
	public static TouchPointSpace createTouchPointSpace(String psId, List<Map<String, Object>> frmSpaceTouchPoints){
		if(frmSpaceTouchPoints==null) return null;
		
		TouchPointSpace oldTouchPointSpace = null;
		if(!SmartUtil.isBlankObject(psId)){
			try{
				ProductService productService = ManagerFactory.getInstance().getDbManager().getProductService("", psId);
				if(productService!=null){
					oldTouchPointSpace = productService.getTouchPointSpace();
				}
			}catch(Exception e){}
		}
		
		TouchPoint[] touchPoints = new TouchPoint[frmSpaceTouchPoints.size()];
		for(int i=0; i<frmSpaceTouchPoints.size(); i++){
			Map<String, Object> frmSpaceTouchPoint = frmSpaceTouchPoints.get(i);
			TouchPoint oldTouchPoint = TouchPoint.getTouchPointById((String)frmSpaceTouchPoint.get("touchPointId"), oldTouchPointSpace);
			touchPoints[i] = new TouchPoint();
			touchPoints[i].setId(oldTouchPoint==null?TouchPoint.createNewId():oldTouchPoint.getId());
			TouchPoint tp = touchPoints[i];
			tp.setReceiverName((String)frmSpaceTouchPoint.get("txtReceiverName"));
			tp.setReceiverInteraction((String)frmSpaceTouchPoint.get("selReceiverInteractionType"));
			tp.setTouchPointName((String)frmSpaceTouchPoint.get("txtTouchPointName"));
			Map<String, Object> imgTouchPoint = (Map<String, Object>)frmSpaceTouchPoint.get("imgTouchPoint");
			if(imgTouchPoint!=null){
				List<Map<String, String>> files = (ArrayList<Map<String, String>>)imgTouchPoint.get("files");
				if(files!=null && files.size()==1){
					tp.setTouchPointImage(files.get(0).get("fileId"));
				}else if(oldTouchPoint!=null){
					tp.setTouchPointImage(oldTouchPoint.getTouchPointImage());
				}
			}
			tp.setProviderName((String)frmSpaceTouchPoint.get("txtProviderName"));
			tp.setProviderInteraction((String)frmSpaceTouchPoint.get("selProviderInteractionType"));
			
			List<String> txtRAffordanceNames = (List<String>)frmSpaceTouchPoint.get("txtRAffordanceNames");
			List<String> txtRAffordanceIds = (List<String>)frmSpaceTouchPoint.get("txtRAffordanceIds");
			List<Map<String, Object>> imgRAffordances = (List<Map<String, Object>>)frmSpaceTouchPoint.get("imgRAffordances");
			if(!SmartUtil.isBlankObject(txtRAffordanceNames) && !SmartUtil.isBlankObject(txtRAffordanceIds)){
				Affordance[] rAffordances = new Affordance[txtRAffordanceNames.size()];
				for(int j=0; j<txtRAffordanceNames.size(); j++){
					Affordance oldAffordance = Affordance.getReceiverAffordanceById(txtRAffordanceIds.get(j), oldTouchPoint);
					Affordance affordance = new Affordance();
					affordance.setId(oldAffordance==null?Affordance.createNewId():oldAffordance.getId());
					affordance.setAffordanceName(txtRAffordanceNames.get(j));
					if(SmartUtil.isBlankObject(affordance.getAffordanceName()) || imgRAffordances==null) continue;
					Map<String, Object> imgRAffordance = imgRAffordances.get(j);
					if(imgRAffordance!=null){
						List<Map<String, String>> files = (ArrayList<Map<String, String>>)imgRAffordance.get("files");
						if(files!=null && files.size()>=1){
							affordance.setAffordanceImage(files.get(files.size()-1).get("fileId"));
						}else if(oldAffordance!=null){
							affordance.setAffordanceImage(oldAffordance.getAffordanceImage());							
						}
					}
					rAffordances[j] = affordance;
				}
				tp.setReceiverAffordances(rAffordances);
			}

			List<String> txtPAffordanceNames = (List<String>)frmSpaceTouchPoint.get("txtPAffordanceNames");
			List<String> txtPAffordanceIds = (List<String>)frmSpaceTouchPoint.get("txtPAffordanceIds");
			List<Map<String, Object>> imgPAffordances = (List<Map<String, Object>>)frmSpaceTouchPoint.get("imgPAffordances");
			if(!SmartUtil.isBlankObject(txtPAffordanceNames) && !SmartUtil.isBlankObject(txtPAffordanceIds)){
				Affordance[] pAffordances = new Affordance[txtPAffordanceNames.size()];
				for(int j=0; j<txtPAffordanceNames.size(); j++){
					Affordance oldAffordance = Affordance.getProviderAffordanceById(txtPAffordanceIds.get(i), oldTouchPoint);
					Affordance affordance = new Affordance();
					affordance.setId(oldAffordance==null?Affordance.createNewId():oldAffordance.getId());
					affordance.setAffordanceName(txtPAffordanceNames.get(j));
					if(SmartUtil.isBlankObject(affordance.getAffordanceName()) || imgPAffordances == null) continue;
					Map<String, Object> imgPAffordance = imgPAffordances.get(j);
					if(imgPAffordance!=null){
						List<Map<String, String>> files = (ArrayList<Map<String, String>>)imgPAffordance.get("files");
						if(files!=null && files.size()>=1){
							affordance.setAffordanceImage(files.get(files.size()-1).get("fileId"));
						}else if(oldAffordance!=null){
							affordance.setAffordanceImage(oldAffordance.getAffordanceImage());							
						}
					}
					pAffordances[j] = affordance;
				}
				tp.setProviderAffordances(pAffordances);
			}
		}
		TouchPointSpace touchPointSpace = new TouchPointSpace();
		touchPointSpace.setTouchPoints(touchPoints);		
		return touchPointSpace;
	}
}
