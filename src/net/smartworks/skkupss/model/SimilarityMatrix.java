package net.smartworks.skkupss.model;

public class SimilarityMatrix{

	private int spaceType;
	private String sourcePsId;
	private String targetPsId;
	private float similarity;
	
	public int getSpaceType() {
		return spaceType;
	}
	public void setSpaceType(int spaceType) {
		this.spaceType = spaceType;
	}
	public String getSourcePsId() {
		return sourcePsId;
	}
	public void setSourcePsId(String sourcePsId) {
		this.sourcePsId = sourcePsId;
	}
	public String getTargetPsId() {
		return targetPsId;
	}
	public void setTargetPsId(String targetPsId) {
		this.targetPsId = targetPsId;
	}
	public float getSimilarity() {
		return similarity;
	}
	public void setSimilarity(float similarity) {
		this.similarity = similarity;
	}
	
}
