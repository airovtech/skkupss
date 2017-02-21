package net.smartworks.skkupss.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.util.StringUtils;

import net.smartworks.util.SmartUtil;

public class ServiceSpace{

	public static final int TOTAL_ACT_TYPES = 5;
	public static final String KEY_VALUE_STRING = "%KEY%";
	
	private String id;
	private String psId;
	private String[] sspp;
	private String[] ssp;
	private String[] sspc;
	private String[] ssc;
	private String[] sscc;
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
	public String[] getSspp() {
		return sspp;
	}
	public void setSspp(String[] sspp) {
		this.sspp = sspp;
	}
	public String[] getSsp() {
		return ssp;
	}
	public void setSsp(String[] ssp) {
		this.ssp = ssp;
	}
	public String[] getSspc() {
		return sspc;
	}
	public void setSspc(String[] sspc) {
		this.sspc = sspc;
	}
	public String[] getSsc() {
		return ssc;
	}
	public void setSsc(String[] ssc) {
		this.ssc = ssc;
	}
	public String[] getSscc() {
		return sscc;
	}
	public void setSscc(String[] sscc) {
		this.sscc = sscc;
	}

	public int[] getNumOfActs(){
		int[] numOfActs = new int[TOTAL_ACT_TYPES+1];
		numOfActs[0] = SmartUtil.getNumOfValidStrings(this.sspp);
		numOfActs[1] = SmartUtil.getNumOfValidStrings(this.ssp);
		numOfActs[2] = SmartUtil.getNumOfValidStrings(this.sspc);
		numOfActs[3] = SmartUtil.getNumOfValidStrings(this.ssc);
		numOfActs[4] = SmartUtil.getNumOfValidStrings(this.sscc);
		numOfActs[TOTAL_ACT_TYPES] = 0;
		return numOfActs;
	}
	
	public String[] getValues(){
		int ssppSize = SmartUtil.getNumOfValidStrings(this.sspp);
		int sspSize = SmartUtil.getNumOfValidStrings(this.ssp);
		int sspcSize = SmartUtil.getNumOfValidStrings(this.sspc);
		int sscSize = SmartUtil.getNumOfValidStrings(this.ssc);
		int ssccSize = SmartUtil.getNumOfValidStrings(this.sscc);
		String[] values = new String[ssppSize+sspSize+sspcSize+sscSize+ssccSize+1];
		int count = 0;
		for(int i=0; i<ssppSize; i++)
			values[count++] = getKeyWordFromValue(this.sspp[i]);
		for(int i=0; i<sspSize; i++)
			values[count++] = getKeyWordFromValue(this.ssp[i]);
		for(int i=0; i<sspcSize; i++)
			values[count++] = getKeyWordFromValue(this.sspc[i]);
		for(int i=0; i<sscSize; i++)
			values[count++] = getKeyWordFromValue(this.ssc[i]);
		for(int i=0; i<ssccSize; i++)
			values[count++] = getKeyWordFromValue(this.sscc[i]);
		values[values.length-1] = "0";
		return values;
	}
	
	private static boolean isKeyWord(String word){
		if(SmartUtil.isBlankObject(word)) return false;
		return word.startsWith(KEY_VALUE_STRING);
	}
	
	private String getKeyWordFromValue(String value){
		if(SmartUtil.isBlankObject(value)) return value;
		String[] tokens = value.split(" ");
		String keyWord = tokens[0];
		for(int i=0; i<tokens.length; i++)
			if(isKeyWord(tokens[i]))
				return tokens[i].replaceAll(KEY_VALUE_STRING, "");
		return keyWord;
	}
	
	public static String getValueHtml(String value, String sbpPrjName, String SvcName, boolean isEditMode, String psId, int num, String sbpName){				// 코드추가 : 프로젝트 이름 추가로 받아온다. (sbpPrjName) 
		if(SmartUtil.isBlankObject(value)) return "";
		
		String sbpId = getValueSbpId(value);										// sbp activity와 연결되어있는 경우에 sbpId 추출 
		
		if(value.contains("||")) {													// || 뒤에 값들은 service concept 이름을 뿌려주는데 필요하지 않으므로 지워준다. 
			String[] tokens = StringUtils.tokenizeToStringArray(value, "||");		
			value = tokens[0];
		}
		
		String title = getValueString(value);										// key(파란색글씨) 에도 title 속성을 설정하기 위함. (Map에서 Activity선택하여 연결할때  service concept에서 key(파란색글씨)를 클릭 하고 들어올경우 title을 이용해 DB에서 찾아 update해줘야 하기 때문이다.
		
		String[] tokens = value.split(" ");
		boolean found = false;
		for(int i=0; i<tokens.length; i++){
			if(isKeyWord(tokens[i])){
				if(isEditMode) {
					tokens[i] = "<span class='" + SvcName + "' svcNameNum='" + SvcName + num +"' sbpPrjName='" + sbpPrjName + "' sbpName='" + sbpName +"' psId='" + psId +"' sbpId='" + sbpId + "' title='" + title +"' editMode='true' style='color:blue;'>" + tokens[i].replaceAll(KEY_VALUE_STRING, "") + "</span>";
				} else {
					tokens[i] = "<span class='" + SvcName + "' svcNameNum='" + SvcName + num +"' sbpPrjName='" + sbpPrjName + "' sbpName='" + sbpName +"' psId='" + psId +"' sbpId='" + sbpId + "' title='" + title +"' editMode='false' style='color:blue;'>" + tokens[i].replaceAll(KEY_VALUE_STRING, "") + "</span>";
				}
				found = true;
				break;
			}
		}
		if(!found){
			if(isEditMode) {
				tokens[0] = "<span class='" + SvcName + "' svcNameNum='" + SvcName + num +"' sbpPrjName='" + sbpPrjName + "' sbpName='" + sbpName +"' psId='" + psId +"' sbpId='" + sbpId + "' title='" + title +"' editMode='true' style='color:blue;'>" + tokens[0] + "</span>";
			} else {
				tokens[0] = "<span class='" + SvcName + "' svcNameNum='" + SvcName + num +"' sbpPrjName='" + sbpPrjName + "' sbpName='" + sbpName +"' psId='" + psId +"' sbpId='" + sbpId + "' title='" + title + "' editMode='false' style='color:blue;'>" + tokens[0] + "</span>";
			}
		}
		String htmlString = "";
		for(int i=0; i<tokens.length; i++)
			htmlString = htmlString + tokens[i] + (i==tokens.length-1?"": " ");
		return htmlString;
		
	}
	
	public static String getValueString(String value){
		if(SmartUtil.isBlankObject(value)) return "";
		
		String[] tokens = StringUtils.tokenizeToStringArray(value, "||");			// ||뒤에 오는 데이터들은 지워준다. (title에 사용할것이기 때문)
		value = tokens[0];
		
		return value.replaceAll(KEY_VALUE_STRING, "");								// %KEY%도 지워준다.
	}
	
	public static ServiceSpace createServiceSpace(Map<String, Object> frmSpaceService){
		if(frmSpaceService==null) return null;
		
		ServiceSpace serviceSpace = new ServiceSpace();		
		String[] values = null;
		
		serviceSpace.setSspp(SmartUtil.getStringArray((Object)frmSpaceService.get("txtSsppItem")));
		serviceSpace.setSsp(SmartUtil.getStringArray((Object)frmSpaceService.get("txtSspItem")));
		serviceSpace.setSspc(SmartUtil.getStringArray((Object)frmSpaceService.get("txtSspcItem")));
		serviceSpace.setSsc(SmartUtil.getStringArray((Object)frmSpaceService.get("txtSscItem")));
		serviceSpace.setSscc(SmartUtil.getStringArray((Object)frmSpaceService.get("txtSsccItem")));
		return serviceSpace;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/* 각 service concept에 연결되어있는 sbpId를 추출해준다.  */
	public static String getValueSbpId(String value){
		if(SmartUtil.isBlankObject(value)) return "";

/*      참고 (value값 예제) 
 		{"Info" : 
 			[
 				{"sbpId" : "1667", "sbpname" : "전과정 상세 TO-BE", "activityId" : "UA_s40871", "activityName" : "어울릴지 생각하기", "activityNum" : "126964"},
				{"sbpId" : "1667", "sbpname" : "전과정 상세 TO-BE", "activityId" : "UA_s40972", "activityName" : "신발 평가하기", "activityNum" : "126965"}
			]
		};
*/
		if(value.contains("||")) {
			String[] tokens = StringUtils.tokenizeToStringArray(value, "||");			// ||뒤에 오는 데이터들만 남겨준다
			value = tokens[1];
		
			try {
				JSONParser jsonParser = new JSONParser();
				
				JSONObject jsonObject = (JSONObject) jsonParser.parse(value);			//JSON데이터를 넣어 JSON Object 로 만들어 준다
				
				JSONArray InfoArray = (JSONArray) jsonObject.get("Info");				// Info배열 이름안에 있는 데이터 추출 
				
				for(int i=0; i<InfoArray.size(); i++){
	                JSONObject InfoObject = (JSONObject) InfoArray.get(i);				//배열 안에 있는것도 JSON형식 이기 때문에 JSON Object 로 추출
	               
	                value = (String) InfoObject.get("sbpId");	 						//JSON name으로 추출 (sbp Map을 띄어줄 키워드 sbpId를 추출한다)
	                
	            }
	 
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		
		try{																			// sbpId가 없을경우 value에는 service concept 데이터가 들어있을테니, 예외처리 해준다. 
			Integer.parseInt(value);
		} catch(NumberFormatException e) {
			e.toString();
			value = "";
		}
		return value;
	}
	
	
	
	public static List<String> ValueSbpInfo(SBPService sbpInfo){
		if((sbpInfo.getSbpPrjName() == null) || (sbpInfo.getSspp() == null && sbpInfo.getSsp() == null && sbpInfo.getSspc() == null 
				&& sbpInfo.getSsc() == null && sbpInfo.getSscc() == null)) {						// SBP프로젝트와 연결되어있지 않은경우 || 연결은 되어 있지만 Service Concept이 없는 경우 
			List<String> empty = new ArrayList<String>();
			return empty;
		}

		String sspp = sbpInfo.getSspp();
		String ssp = sbpInfo.getSsp();
		String sspc = sbpInfo.getSspc();
		String ssc = sbpInfo.getSsc();
		String sscc = sbpInfo.getSscc();
		List<String> data = new ArrayList<String>();
		
		if(sspp.contains("||")) {
			String[] tokens = StringUtils.tokenizeToStringArray(sspp, ";");							// service concept들을 나눠준다. 

			for(int i=0; i<tokens.length; i++) {													// 모든 service concept 한개씩 "||"가 있는지 검사한다. (있으면 SBP Map activity와 연결되어있는 데이터가 있다는 의미) 
				if(tokens[i].contains("||")) {
					String[] detail_Tokens = StringUtils.tokenizeToStringArray(tokens[i], "||");
					String value = detail_Tokens[1];												// 연결된 SBP activity 데이터 정보만 추출
					try {
						JSONParser jsonParser = new JSONParser();
						
						JSONObject jsonObject = (JSONObject) jsonParser.parse(value);		
						
						JSONArray InfoArray = (JSONArray) jsonObject.get("Info");				
						
						for(int j=0; j<InfoArray.size(); j=InfoArray.size()){
			                JSONObject InfoObject = (JSONObject) InfoArray.get(j);					// index당 1개의 {} 안의 데이터 추출				
			                
		                	if(!(data.contains(InfoObject.get("sbpId")))) {
			                	data.add((String) InfoObject.get("sbpId"));
		                	} 
		                	if(!(data.contains(InfoObject.get("sbpName")))) {
				                data.add((String) InfoObject.get("sbpName"));
		                	}

			            }
			 
					} catch (ParseException e) {
						e.printStackTrace();
					}
				}
			}			
		} 
		
		if(ssp.contains("||")) {
			String[] tokens = StringUtils.tokenizeToStringArray(ssp, ";");							// service concept들을 나눠준다. 

			for(int i=0; i<tokens.length; i++) {													// 모든 service concept 한개씩 "||"가 있는지 검사한다. (있으면 SBP Map activity와 연결되어있는 데이터가 있다는 의미) 
				if(tokens[i].contains("||")) {
					String[] detail_Tokens = StringUtils.tokenizeToStringArray(tokens[i], "||");
					String value = detail_Tokens[1];												// 연결된 SBP activity 데이터 정보만 추출
					try {
						JSONParser jsonParser = new JSONParser();
						
						JSONObject jsonObject = (JSONObject) jsonParser.parse(value);		
						
						JSONArray InfoArray = (JSONArray) jsonObject.get("Info");				
						
						for(int j=0; j<InfoArray.size(); j=InfoArray.size()){
			                JSONObject InfoObject = (JSONObject) InfoArray.get(j);					// index당 1개의 {} 안의 데이터 추출				
			                
		                	if(!(data.contains(InfoObject.get("sbpId")))) {
			                	data.add((String) InfoObject.get("sbpId"));
		                	} 
		                	if(!(data.contains(InfoObject.get("sbpName")))) {
				                data.add((String) InfoObject.get("sbpName"));
		                	}
			            }
			 
					} catch (ParseException e) {
						e.printStackTrace();
					}
				}
			}
		}
		
		if(sspc.contains("||")) {
			String[] tokens = StringUtils.tokenizeToStringArray(sspc, ";");							// service concept들을 나눠준다. 

			for(int i=0; i<tokens.length; i++) {													// 모든 service concept 한개씩 "||"가 있는지 검사한다. (있으면 SBP Map activity와 연결되어있는 데이터가 있다는 의미) 
				if(tokens[i].contains("||")) {
					String[] detail_Tokens = StringUtils.tokenizeToStringArray(tokens[i], "||");
					String value = detail_Tokens[1];												// 연결된 SBP activity 데이터 정보만 추출
					try {
						JSONParser jsonParser = new JSONParser();
						
						JSONObject jsonObject = (JSONObject) jsonParser.parse(value);		
						
						JSONArray InfoArray = (JSONArray) jsonObject.get("Info");				
						
						for(int j=0; j<InfoArray.size(); j=InfoArray.size()){
			                JSONObject InfoObject = (JSONObject) InfoArray.get(j);					// index당 1개의 {} 안의 데이터 추출				
			                
		                	if(!(data.contains(InfoObject.get("sbpId")))) {
			                	data.add((String) InfoObject.get("sbpId"));
		                	} 
		                	if(!(data.contains(InfoObject.get("sbpName")))) {
				                data.add((String) InfoObject.get("sbpName"));
		                	}

			            }
			 
					} catch (ParseException e) {
						e.printStackTrace();
					}
				}
			}
		}
		
		if(ssc.contains("||")) {
			String[] tokens = StringUtils.tokenizeToStringArray(ssc, ";");							// service concept들을 나눠준다. 

			for(int i=0; i<tokens.length; i++) {													// 모든 service concept 한개씩 "||"가 있는지 검사한다. (있으면 SBP Map activity와 연결되어있는 데이터가 있다는 의미) 
				if(tokens[i].contains("||")) {
					String[] detail_Tokens = StringUtils.tokenizeToStringArray(tokens[i], "||");
					String value = detail_Tokens[1];												// 연결된 SBP activity 데이터 정보만 추출
					try {
						JSONParser jsonParser = new JSONParser();
						
						JSONObject jsonObject = (JSONObject) jsonParser.parse(value);		
						
						JSONArray InfoArray = (JSONArray) jsonObject.get("Info");				
						
						for(int j=0; j<InfoArray.size(); j=InfoArray.size()){
			                JSONObject InfoObject = (JSONObject) InfoArray.get(j);					// index당 1개의 {} 안의 데이터 추출				
			                
		                	if(!(data.contains(InfoObject.get("sbpId")))) {
			                	data.add((String) InfoObject.get("sbpId"));
		                	} 
		                	if(!(data.contains(InfoObject.get("sbpName")))) {
				                data.add((String) InfoObject.get("sbpName"));
		                	}

			            }
			 
					} catch (ParseException e) {
						e.printStackTrace();
					}
				}
			}
		}
		
		if(sscc.contains("||")) {
			String[] tokens = StringUtils.tokenizeToStringArray(sscc, ";");							// service concept들을 나눠준다. 

			for(int i=0; i<tokens.length; i++) {													// 모든 service concept 한개씩 "||"가 있는지 검사한다. (있으면 SBP Map activity와 연결되어있는 데이터가 있다는 의미) 
				if(tokens[i].contains("||")) {
					String[] detail_Tokens = StringUtils.tokenizeToStringArray(tokens[i], "||");
					String value = detail_Tokens[1];												// 연결된 SBP activity 데이터 정보만 추출
					try {
						JSONParser jsonParser = new JSONParser();
						
						JSONObject jsonObject = (JSONObject) jsonParser.parse(value);		
						
						JSONArray InfoArray = (JSONArray) jsonObject.get("Info");				
						
						for(int j=0; j<InfoArray.size(); j=InfoArray.size()){
			                JSONObject InfoObject = (JSONObject) InfoArray.get(j);					// index당 1개의 {} 안의 데이터 추출				
			                
		                	if(!(data.contains(InfoObject.get("sbpId")))) {
			                	data.add((String) InfoObject.get("sbpId"));
		                	} 
		                	if(!(data.contains(InfoObject.get("sbpName")))) {
				                data.add((String) InfoObject.get("sbpName"));
		                	}

			            }
			 
					} catch (ParseException e) {
						e.printStackTrace();
					}
				}
			}
		}
		
		if((data.size() % 2) != 0) {
			List<String> empty = new ArrayList<String>();
			return empty;
		}
		return data;
	}
	
	
	
	
	/* 각 service concept 별로 연결된 sbp name 을 return 해준다. */
	public static String ValueSbpInfoEach(String values){
		if((values == null) || (values.equals(""))) {
			return "";
		}

		String data = "";
		
		if(values.contains("||")) {
			String[] tokens = StringUtils.tokenizeToStringArray(values, ";");							// service concept들을 나눠준다. 

			for(int i=0; i<tokens.length; i++) {													// 모든 service concept 한개씩 "||"가 있는지 검사한다. (있으면 SBP Map activity와 연결되어있는 데이터가 있다는 의미) 
				if(tokens[i].contains("||")) {
					String[] detail_Tokens = StringUtils.tokenizeToStringArray(tokens[i], "||");
					String value = detail_Tokens[1];												// 연결된 SBP activity 데이터 정보만 추출
					try {
						JSONParser jsonParser = new JSONParser();
						
						JSONObject jsonObject = (JSONObject) jsonParser.parse(value);		
						
						JSONArray InfoArray = (JSONArray) jsonObject.get("Info");				
						
						for(int j=0; j<InfoArray.size(); j=InfoArray.size()){
			                JSONObject InfoObject = (JSONObject) InfoArray.get(j);					// index당 1개의 {} 안의 데이터 추출				
			                
		                	if(!(data.contains((String) InfoObject.get("sbpName")))) {
				                data = ((String) InfoObject.get("sbpName"));
		                	}

			            }
			 
					} catch (ParseException e) {
						e.printStackTrace();
					}
				}
			}			
		} 
		return data;
	}
	
	
	
	
	
	
	
	
	
	
}
