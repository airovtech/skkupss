package net.smartworks.skkupss.model;

/* PSS와 연결된 SBP정보들을 담을 model */
public class SBPService {

	private String pssPrjid;				// psId
	private String pssPrjName;		
	private String pssPrjPicture;
	private String pssPrjDescription;
	private String sbpPrjName;
	private int sbpId;
	private String sbpName;
//	private boolean connect;				// SBP와 연결되있다는걸 간단히 증명하기위한 DB에없는 model 변수 추가 
	private String id;			// servicespace테이블의 primary key (필요한 data인지 미확인. 일단 가지고 있어본다)
	private String sspp;
	private String ssp;
	private String sspc;
	private String ssc;
	private String sscc;
	

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getSspp() {
		return sspp;
	}
	public void setSspp(String sspp) {
		this.sspp = sspp;
	}
	public String getSsp() {
		return ssp;
	}
	public void setSsp(String ssp) {
		this.ssp = ssp;
	}
	public String getSspc() {
		return sspc;
	}
	public void setSspc(String sspc) {
		this.sspc = sspc;
	}
	public String getSsc() {
		return ssc;
	}
	public void setSsc(String ssc) {
		this.ssc = ssc;
	}
	public String getSscc() {
		return sscc;
	}
	public void setSscc(String sscc) {
		this.sscc = sscc;
	}
	public String getPssPrjid() {
		return pssPrjid;
	}
	public void setPssPrjid(String pssPrjid) {
		this.pssPrjid = pssPrjid;
	}
	public String getPssPrjName() {
		return pssPrjName;
	}
	public void setPssPrjName(String pssPrjName) {
		this.pssPrjName = pssPrjName;
	}
	public String getPssPrjPicture() {
		return pssPrjPicture;
	}
	public void setPssPrjPicture(String pssPrjPicture) {
		this.pssPrjPicture = pssPrjPicture;
	}
	public String getPssPrjDescription() {
		return pssPrjDescription;
	}
	public void setPssPrjDescription(String pssPrjDescription) {
		this.pssPrjDescription = pssPrjDescription;
	}
	public String getSbpPrjName() {
		return sbpPrjName;
	}
	public void setSbpPrjName(String sbpPrjName) {
		this.sbpPrjName = sbpPrjName;
	}
	public int getSbpId() {
		return sbpId;
	}
	public void setSbpId(int sbpId) {
		this.sbpId = sbpId;
	}
	public String getSbpName() {
		return sbpName;
	}
	public void setSbpName(String sbpName) {
		this.sbpName = sbpName;
	}

	
}