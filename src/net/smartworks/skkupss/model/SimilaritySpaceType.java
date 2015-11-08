/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 11. 20.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.skkupss.model;

import net.smartworks.util.SmartUtil;

public class SimilaritySpaceType {

	private String spaceType;
	private float similarityWeight=1;
	private String name;
	
	public String getSpaceType() {
		return spaceType;
	}
	public void setSpaceType(String spaceType) {
		this.spaceType = spaceType;
	}
	public float getSimilarityWeight() {
		return similarityWeight;
	}
	public void setSimilarityWeight(float similarityWeight) {
		this.similarityWeight = similarityWeight;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public SimilaritySpaceType(String spaceType){
		super();
		this.spaceType = spaceType;
	}
	
	public SimilaritySpaceType(String spaceType, float similarityWeight){
		super();
		this.spaceType = spaceType;
		this.similarityWeight = similarityWeight;		
	}
	
	public SimilaritySpaceType(String spaceType, float similarityWeight, String name){
		super();
		this.spaceType = spaceType;
		this.similarityWeight = similarityWeight;	
		this.name = name;
	}
	
	public static String getSpaceTypeNames(SimilaritySpaceType[] spaceTypes){
		if(SmartUtil.isBlankObject(spaceTypes)) return null;
		if(spaceTypes.length==1) return spaceTypes[0].getSpaceType();

		String spaceTypeNames = null;
		for(int i=0; i<spaceTypes.length; i++){
			if(spaceTypes[i].getSpaceType().equals(ProductService.PSS_SPACE_VALUE)){
				spaceTypeNames = "value";
				break;
			}
		}
		for(int i=0; i<spaceTypes.length; i++){
			if(spaceTypes[i].getSpaceType().equals(ProductService.PSS_SPACE_SERVICE)){
				spaceTypeNames = (spaceTypeNames==null)?"service":spaceTypeNames+"Service";
				break;
			}
		}
		for(int i=0; i<spaceTypes.length; i++){
			if(spaceTypes[i].getSpaceType().equals(ProductService.PSS_SPACE_BIZ_MODEL)){
				spaceTypeNames = (spaceTypeNames==null)?"bizModel":spaceTypeNames+"BizModel";
				break;
			}
		}

		if(spaceTypeNames!=null) spaceTypeNames = spaceTypeNames+"Space";
		return spaceTypeNames;
	}
}
