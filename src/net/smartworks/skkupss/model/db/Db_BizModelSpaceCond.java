/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 11. 20.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.skkupss.model.db;

import net.smartworks.common.Cond;

public class Db_BizModelSpaceCond extends Cond {

	private String id;
	private String psId;
	private String customerSegments;
	private String customerSegmentsLike;
	private String customerSegmentsUser;
	private String customerSegmentsUserLike;
	private String CustomerRelationships;
	private String CustomerRelationshipsLike;
	private String CustomerRelationshipsUser;
	private String CustomerRelationshipsUserLike;
	private String channels;
	private String channelsLike;
	private String channelsUser;
	private String channelsUserLike;
	private String keyActivities;
	private String keyActivitiesLike;
	private String keyActivitiesUser;
	private String keyActivitiesUserLike;
	private String keyResources;
	private String keyResourcesLike;
	private String keyResourcesUser;
	private String keyResourcesUserLike;
	private String keyPartners;
	private String keyPartnersLike;
	private String keyPartnersUser;
	private String keyPartnersUserLike;
	private String costStructure;
	private String costStructureLike;
	private String costStructureUser;
	private String costStructureUserLIke;
	private String revenueStreams;
	private String revenueStreamsLike;
	private String revenueStreamsUser;
	private String revenueStreamsUserLIke;
	private String valuePropositionsUser;
	private String valuePropositionsUserLIke;

	
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
	public String getCustomerSegments() {
		return customerSegments;
	}
	public void setCustomerSegments(String customerSegments) {
		this.customerSegments = customerSegments;
	}
	public String getCustomerSegmentsLike() {
		return customerSegmentsLike;
	}
	public void setCustomerSegmentsLike(String customerSegmentsLike) {
		this.customerSegmentsLike = customerSegmentsLike;
	}
	public String getCustomerSegmentsUser() {
		return customerSegmentsUser;
	}
	public void setCustomerSegmentsUser(String customerSegmentsUser) {
		this.customerSegmentsUser = customerSegmentsUser;
	}
	public String getCustomerSegmentsUserLike() {
		return customerSegmentsUserLike;
	}
	public void setCustomerSegmentsUserLike(String customerSegmentsUserLike) {
		this.customerSegmentsUserLike = customerSegmentsUserLike;
	}
	public String getCustomerRelationships() {
		return CustomerRelationships;
	}
	public void setCustomerRelationships(String customerRelationships) {
		CustomerRelationships = customerRelationships;
	}
	public String getCustomerRelationshipsLike() {
		return CustomerRelationshipsLike;
	}
	public void setCustomerRelationshipsLike(String customerRelationshipsLike) {
		CustomerRelationshipsLike = customerRelationshipsLike;
	}
	public String getCustomerRelationshipsUser() {
		return CustomerRelationshipsUser;
	}
	public void setCustomerRelationshipsUser(String customerRelationshipsUser) {
		CustomerRelationshipsUser = customerRelationshipsUser;
	}
	public String getCustomerRelationshipsUserLike() {
		return CustomerRelationshipsUserLike;
	}
	public void setCustomerRelationshipsUserLike(
			String customerRelationshipsUserLike) {
		CustomerRelationshipsUserLike = customerRelationshipsUserLike;
	}
	public String getChannels() {
		return channels;
	}
	public void setChannels(String channels) {
		this.channels = channels;
	}
	public String getChannelsLike() {
		return channelsLike;
	}
	public void setChannelsLike(String channelsLike) {
		this.channelsLike = channelsLike;
	}
	public String getChannelsUser() {
		return channelsUser;
	}
	public void setChannelsUser(String channelsUser) {
		this.channelsUser = channelsUser;
	}
	public String getChannelsUserLike() {
		return channelsUserLike;
	}
	public void setChannelsUserLike(String channelsUserLike) {
		this.channelsUserLike = channelsUserLike;
	}
	public String getKeyActivities() {
		return keyActivities;
	}
	public void setKeyActivities(String keyActivities) {
		this.keyActivities = keyActivities;
	}
	public String getKeyActivitiesLike() {
		return keyActivitiesLike;
	}
	public void setKeyActivitiesLike(String keyActivitiesLike) {
		this.keyActivitiesLike = keyActivitiesLike;
	}
	public String getKeyActivitiesUser() {
		return keyActivitiesUser;
	}
	public void setKeyActivitiesUser(String keyActivitiesUser) {
		this.keyActivitiesUser = keyActivitiesUser;
	}
	public String getKeyActivitiesUserLike() {
		return keyActivitiesUserLike;
	}
	public void setKeyActivitiesUserLike(String keyActivitiesUserLike) {
		this.keyActivitiesUserLike = keyActivitiesUserLike;
	}
	public String getKeyResources() {
		return keyResources;
	}
	public void setKeyResources(String keyResources) {
		this.keyResources = keyResources;
	}
	public String getKeyResourcesLike() {
		return keyResourcesLike;
	}
	public void setKeyResourcesLike(String keyResourcesLike) {
		this.keyResourcesLike = keyResourcesLike;
	}
	public String getKeyResourcesUser() {
		return keyResourcesUser;
	}
	public void setKeyResourcesUser(String keyResourcesUser) {
		this.keyResourcesUser = keyResourcesUser;
	}
	public String getKeyResourcesUserLike() {
		return keyResourcesUserLike;
	}
	public void setKeyResourcesUserLike(String keyResourcesUserLike) {
		this.keyResourcesUserLike = keyResourcesUserLike;
	}
	public String getKeyPartners() {
		return keyPartners;
	}
	public void setKeyPartners(String keyPartners) {
		this.keyPartners = keyPartners;
	}
	public String getKeyPartnersLike() {
		return keyPartnersLike;
	}
	public void setKeyPartnersLike(String keyPartnersLike) {
		this.keyPartnersLike = keyPartnersLike;
	}
	public String getKeyPartnersUser() {
		return keyPartnersUser;
	}
	public void setKeyPartnersUser(String keyPartnersUser) {
		this.keyPartnersUser = keyPartnersUser;
	}
	public String getKeyPartnersUserLike() {
		return keyPartnersUserLike;
	}
	public void setKeyPartnersUserLike(String keyPartnersUserLike) {
		this.keyPartnersUserLike = keyPartnersUserLike;
	}
	public String getCostStructure() {
		return costStructure;
	}
	public void setCostStructure(String costStructure) {
		this.costStructure = costStructure;
	}
	public String getCostStructureLike() {
		return costStructureLike;
	}
	public void setCostStructureLike(String costStructureLike) {
		this.costStructureLike = costStructureLike;
	}
	public String getCostStructureUser() {
		return costStructureUser;
	}
	public void setCostStructureUser(String costStructureUser) {
		this.costStructureUser = costStructureUser;
	}
	public String getCostStructureUserLIke() {
		return costStructureUserLIke;
	}
	public void setCostStructureUserLIke(String costStructureUserLIke) {
		this.costStructureUserLIke = costStructureUserLIke;
	}
	public String getRevenueStreams() {
		return revenueStreams;
	}
	public void setRevenueStreams(String revenueStreams) {
		this.revenueStreams = revenueStreams;
	}
	public String getRevenueStreamsLike() {
		return revenueStreamsLike;
	}
	public void setRevenueStreamsLike(String revenueStreamsLike) {
		this.revenueStreamsLike = revenueStreamsLike;
	}
	public String getRevenueStreamsUser() {
		return revenueStreamsUser;
	}
	public void setRevenueStreamsUser(String revenueStreamsUser) {
		this.revenueStreamsUser = revenueStreamsUser;
	}
	public String getRevenueStreamsUserLIke() {
		return revenueStreamsUserLIke;
	}
	public void setRevenueStreamsUserLIke(String revenueStreamsUserLIke) {
		this.revenueStreamsUserLIke = revenueStreamsUserLIke;
	}
	public String getValuePropositionsUser() {
		return valuePropositionsUser;
	}
	public void setValuePropositionsUser(String valuePropositionsUser) {
		this.valuePropositionsUser = valuePropositionsUser;
	}
	public String getValuePropositionsUserLIke() {
		return valuePropositionsUserLIke;
	}
	public void setValuePropositionsUserLIke(String valuePropositionsUserLIke) {
		this.valuePropositionsUserLIke = valuePropositionsUserLIke;
	}
}
