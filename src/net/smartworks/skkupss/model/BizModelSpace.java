package net.smartworks.skkupss.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import net.smartworks.util.SmartUtil;

public class BizModelSpace{

	
	private String id;
	private String psId;
	private String[] customerSegments;
	private String[] customerSegmentsUser;
	private String[] customerRelationships;
	private String[] customerRelationshipsUser;
	private String[] channels;
	private String[] channelsUser;
	private String[] keyActivities;
	private String[] keyActivitiesUser;
	private String[] keyResources;
	private String[] keyResourcesUser;
	private String[] keyPartners;
	private String[] keyPartnersUser;
	private String[] valuePropositionsUser;
	private String[] costStructure;
	private String[] costStructureUser;
	private String[] revenueStreams;
	private String[] revenueStreamsUser;
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
	public String[] getCustomerSegments() {
		return customerSegments;
	}
	public void setCustomerSegments(String[] customerSegments) {
		this.customerSegments = customerSegments;
	}
	public String[] getCustomerSegmentsUser() {
		return customerSegmentsUser;
	}
	public void setCustomerSegmentsUser(String[] customerSegmentsUser) {
		this.customerSegmentsUser = customerSegmentsUser;
	}
	public String[] getCustomerRelationships() {
		return customerRelationships;
	}
	public void setCustomerRelationships(String[] customerRelationships) {
		this.customerRelationships = customerRelationships;
	}
	public String[] getCustomerRelationshipsUser() {
		return customerRelationshipsUser;
	}
	public void setCustomerRelationshipsUser(String[] customerRelationshipsUser) {
		this.customerRelationshipsUser = customerRelationshipsUser;
	}
	public String[] getChannels() {
		return channels;
	}
	public void setChannels(String[] channels) {
		this.channels = channels;
	}
	public String[] getChannelsUser() {
		return channelsUser;
	}
	public void setChannelsUser(String[] channelsUser) {
		this.channelsUser = channelsUser;
	}
	public String[] getKeyActivities() {
		return keyActivities;
	}
	public void setKeyActivities(String[] keyActivities) {
		this.keyActivities = keyActivities;
	}
	public String[] getKeyActivitiesUser() {
		return keyActivitiesUser;
	}
	public void setKeyActivitiesUser(String[] keyActivitiesUser) {
		this.keyActivitiesUser = keyActivitiesUser;
	}
	public String[] getKeyResources() {
		return keyResources;
	}
	public void setKeyResources(String[] keyResources) {
		this.keyResources = keyResources;
	}
	public String[] getKeyResourcesUser() {
		return keyResourcesUser;
	}
	public void setKeyResourcesUser(String[] keyResourcesUser) {
		this.keyResourcesUser = keyResourcesUser;
	}
	public String[] getKeyPartners() {
		return keyPartners;
	}
	public void setKeyPartners(String[] keyPartners) {
		this.keyPartners = keyPartners;
	}
	public String[] getKeyPartnersUser() {
		return keyPartnersUser;
	}
	public void setKeyPartnersUser(String[] keyPartnersUser) {
		this.keyPartnersUser = keyPartnersUser;
	}
	public String[] getValuePropositionsUser() {
		return valuePropositionsUser;
	}
	public void setValuePropositionsUser(String[] valuePropositionsUser) {
		this.valuePropositionsUser = valuePropositionsUser;
	}
	public String[] getCostStructure() {
		return costStructure;
	}
	public void setCostStructure(String[] costStructure) {
		this.costStructure = costStructure;
	}
	public String[] getCostStructureUser() {
		return costStructureUser;
	}
	public void setCostStructureUser(String[] costStructureUser) {
		this.costStructureUser = costStructureUser;
	}
	public String[] getRevenueStreams() {
		return revenueStreams;
	}
	public void setRevenueStreams(String[] revenueStreams) {
		this.revenueStreams = revenueStreams;
	}
	public String[] getRevenueStreamsUser() {
		return revenueStreamsUser;
	}
	public void setRevenueStreamsUser(String[] revenueStreamsUser) {
		this.revenueStreamsUser = revenueStreamsUser;
	}
	
	public static BizModelSpace createBizModelSpace(Map<String, Object> frmSpaceBizModel){
		if(frmSpaceBizModel==null) return null;
		
		BizModelSpace bizModelSpace = new BizModelSpace();		
		
		bizModelSpace.setCustomerSegments(SmartUtil.getStringArray((Object)frmSpaceBizModel.get("txtCustomerSegmentsItem")));
		bizModelSpace.setCustomerSegmentsUser(SmartUtil.getStringArray((Object)frmSpaceBizModel.get("txtCustomerSegmentsUserItem")));
		bizModelSpace.setCustomerRelationships(SmartUtil.getStringArray((Object)frmSpaceBizModel.get("txtCustomerRelationshipsItem")));
		bizModelSpace.setCustomerRelationshipsUser(SmartUtil.getStringArray((Object)frmSpaceBizModel.get("txtCustomerRelationshipsUserItem")));
		bizModelSpace.setChannels(SmartUtil.getStringArray((Object)frmSpaceBizModel.get("txtChannelsItem")));
		bizModelSpace.setChannelsUser(SmartUtil.getStringArray((Object)frmSpaceBizModel.get("txtChannelsUserItem")));
		bizModelSpace.setKeyActivities(SmartUtil.getStringArray((Object)frmSpaceBizModel.get("txtKeyActivitiesItem")));
		bizModelSpace.setKeyActivitiesUser(SmartUtil.getStringArray((Object)frmSpaceBizModel.get("txtKeyActivitiesUserItem")));
		bizModelSpace.setKeyResources(SmartUtil.getStringArray((Object)frmSpaceBizModel.get("txtKeyResourcesItem")));
		bizModelSpace.setKeyPartners(SmartUtil.getStringArray((Object)frmSpaceBizModel.get("txtKeyPartnersItem")));
		bizModelSpace.setKeyPartnersUser(SmartUtil.getStringArray((Object)frmSpaceBizModel.get("txtKeyPartnersUserItem")));
		bizModelSpace.setValuePropositionsUser(SmartUtil.getStringArray((Object)frmSpaceBizModel.get("txtValuePropositionsUserItem")));
		bizModelSpace.setCostStructure(SmartUtil.getStringArray((Object)frmSpaceBizModel.get("txtCostStructureItem")));
		bizModelSpace.setCostStructureUser(SmartUtil.getStringArray((Object)frmSpaceBizModel.get("txtCostStructureUserItem")));
		bizModelSpace.setRevenueStreams(SmartUtil.getStringArray((Object)frmSpaceBizModel.get("txtRevenueStreamsItem")));
		bizModelSpace.setRevenueStreamsUser(SmartUtil.getStringArray((Object)frmSpaceBizModel.get("txtRevenueStreamsUserItem")));
		return bizModelSpace;
	}
}
