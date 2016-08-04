package net.smartworks.skkupss.model;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import net.smartworks.skkupss.smcal.Graph;
import net.smartworks.skkupss.smcal.Node;
import net.smartworks.util.SmartUtil;

public class ContextSpace{

	public static final int TOTAL_VALUE_TYPES = 8;
	
	private String id;
	private String psId;
	private String contextData;

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
	public String getContextData() {
		return contextData;
	}
	public void setContextData(String contextData) {
		this.contextData = contextData;
	}
	
	public static ContextSpace createContextSpace(String contextData){
		if(contextData==null) return null;
		
		ContextSpace contextSpace = new ContextSpace();		
		contextSpace.setContextData(contextData);		
		return contextSpace;
	}
	
	public Graph getSimGraph(){
		Graph graph =  new Graph();
		JSONObject contextObject = null;
		try{
			contextObject =  new JSONObject(contextData);
		}catch(Exception e){}
		if(SmartUtil.isBlankObject(contextObject)) return graph;
		try{
			JSONArray nodeArray = contextObject.getJSONArray("nodes");
			JSONArray edgeLineArray = contextObject.getJSONArray("edgeLines");
			if(SmartUtil.isBlankObject(nodeArray) || SmartUtil.isBlankObject(edgeLineArray)) return graph;
			
			Node[] nodes = new Node[nodeArray.length()];
			Map nodeIds = new HashMap();
			for(int i=0; i<nodeArray.length(); i++){
				JSONObject jsonObj  = nodeArray.getJSONObject(i);
				String id=null, type=null, name=null;
				try{
					id = jsonObj.getString("id");
				}catch(Exception e){}
				try{
					type = jsonObj.getString("type");
				}catch(Exception e){}
				try{
					name = jsonObj.getString("name");
				}catch(Exception e){}
				nodes[i] = new Node(id, type, name);	
				nodeIds.put(nodes[i].getId(), nodes[i]);
			}
			for(int i=0; i<edgeLineArray.length(); i++){
				JSONObject jsonObj  = edgeLineArray.getJSONObject(i);
				String fromNodeId=null, toNodeId=null;
				int direction=0;
				try{
					fromNodeId = jsonObj.getString("fromNodeId");
				}catch(Exception e){}
				try{
					toNodeId = jsonObj.getString("toNodeId");
				}catch(Exception e){}
				try{
					direction = jsonObj.getInt("direction");
				}catch(Exception e){}
				if(fromNodeId!=null && toNodeId!=null){
					graph.addEdge((Node)nodeIds.get(fromNodeId), (Node)nodeIds.get(toNodeId));
					if(direction!=1)
						graph.addEdge((Node)nodeIds.get(toNodeId), (Node)nodeIds.get(fromNodeId));
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return graph;
	}
}
