package net.smartworks.skkupss.model;

public class SimilarityMatrix{

	private int spaceType;
	private String sourcePsId;
	private String sourcePsName;
	private String targetPsId;
	private String targetPsName;
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
	public String getSourcePsName() {
		return sourcePsName;
	}
	public void setSourcePsName(String sourcePsName) {
		this.sourcePsName = sourcePsName;
	}
	public String getTargetPsName() {
		return targetPsName;
	}
	public void setTargetPsName(String targetPsName) {
		this.targetPsName = targetPsName;
	}
	public float getSimilarity() {
		return similarity;
	}
	public void setSimilarity(float similarity) {
		this.similarity = similarity;
	}
	
}
