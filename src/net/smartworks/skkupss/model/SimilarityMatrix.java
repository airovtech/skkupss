package net.smartworks.skkupss.model;

public class SimilarityMatrix{

	private int spaceType;
	private String sourcePsId;
	private String sourcePsName;
	private String targetPsId;
	private String targetPsName;
	private double similarity;
	
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
	public double getSimilarity() {
		return similarity;
	}
	public void setSimilarity(double similarity) {
		this.similarity = similarity;
	}
	
}
