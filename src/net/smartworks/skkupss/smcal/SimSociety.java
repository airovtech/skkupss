package net.smartworks.skkupss.smcal;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import edu.cmu.lti.lexical_db.ILexicalDatabase;
import edu.cmu.lti.lexical_db.NictWordNet;
import edu.cmu.lti.ws4j.impl.Lin;
import edu.cmu.lti.ws4j.util.WS4JConfiguration;

public class SimSociety{
	
	private String[] valuesS=null;
	private String[] valuesT=null;
	
	private static final String[] customers = new String[]{"개인", "그룹", "기업", "정부"};
	private static final String[] manufacturers = new String[]{"대기업", "중견기업", "중소기업", "벤쳐기업", "기타"};
	private static final String[] serviceProviders = new String[]{"Inhouse", "외부기업", "외부개인", "기타"};
	private static final String[] relatedOrganizations = new String[]{"제조기업", "서비스기업", "기타"};
	private static final String[] relatedGovernments = new String[]{"중앙정부", "지방정부"};
	private static final String[] relatedFinances = new String[]{"금융", "보험"};
	private static final String[] relatedSocials = new String[]{"NGO", "압력단체", "시민단체"};
	private static final String[] relatedMedias = new String[]{"신문", "방송", "인터넷매체"};
	private static final String[] relatedRndTrainings = new String[]{"대학", "연구소"};
	
	public SimSociety(String[] valuesS, String[] valuesT){
		this.valuesS = valuesS;
		this.valuesT = valuesT;
	}
	
	public String[] getValuesS() {
		return valuesS;
	}
	public void setValuesS(String[] valuesS) {
		this.valuesS = valuesS;
	}
	public String[] getValuesT() {
		return valuesT;
	}
	public void setValuesT(String[] valuesT) {
		this.valuesT = valuesT;
	}
	public String[] getNumbersS(){
		return getNumbers(this.valuesS);
	}
	public String[] getNumbersT(){
		return getNumbers(this.valuesT);
	}

	public String[] getNumbers(String[] values){
		String[] none = new String[]{"0", "0", "0", "0", "0", "0", "0", "0", "0"};
		if(values==null || values.length!=9) return none;
		String numberStr = "", tempStr="";
		for(int i=0; i<customers.length; i++){
			if(customers[i].equals(values[0])){
				numberStr = numberStr + (i+1);
				break;
			}
			if(i==customers.length-1)
				numberStr = numberStr + 0;
			
		}
		for(int i=0; i<manufacturers.length; i++){
			if(manufacturers[i].equals(values[1])){
				numberStr = numberStr + "," + (i+1);
				break;
			}
			if(i==customers.length-1)
				numberStr = numberStr + ",0";
			
		}
		tempStr = "";
		for(int i=0; i<serviceProviders.length; i++){
			if(serviceProviders[i].equals(values[1])){
				tempStr = tempStr + (tempStr.equals("")?"":";") + (i+1);
			}
			
		}
		if(tempStr.equals(""))
			numberStr = numberStr + ",0";
		else
			numberStr = numberStr + "," + tempStr;
		
		tempStr = "";
		for(int i=0; i<relatedOrganizations.length; i++){
			if(relatedOrganizations[i].equals(values[1])){
				tempStr = tempStr + (tempStr.equals("")?"":";") + (i+1);
			}
			
		}
		if(tempStr.equals(""))
			numberStr = numberStr + ",0";
		else
			numberStr = numberStr + "," + tempStr;
			
			
		for(int i=0; i<relatedGovernments.length; i++){
			if(relatedGovernments[i].equals(values[1])){
				numberStr = numberStr + "," + (i+1);
				break;
			}
			if(i==relatedGovernments.length-1)
				numberStr = numberStr + ",0";
			
		}
		for(int i=0; i<relatedFinances.length; i++){
			if(relatedFinances[i].equals(values[1])){
				numberStr = numberStr + "," + (i+1);
				break;
			}
			if(i==relatedFinances.length-1)
				numberStr = numberStr + ",0";
			
		}
		for(int i=0; i<relatedSocials.length; i++){
			if(relatedSocials[i].equals(values[1])){
				numberStr = numberStr + "," + (i+1);
				break;
			}
			if(i==relatedSocials.length-1)
				numberStr = numberStr + ",0";
			
		}
		for(int i=0; i<relatedMedias.length; i++){
			if(relatedMedias[i].equals(values[1])){
				numberStr = numberStr + "," + (i+1);
				break;
			}
			if(i==relatedMedias.length-1)
				numberStr = numberStr + ",0";
			
		}
		for(int i=0; i<relatedRndTrainings.length; i++){
			if(relatedRndTrainings[i].equals(values[1])){
				numberStr = numberStr + "," + (i+1);
				break;
			}
			if(i==relatedRndTrainings.length-1)
				numberStr = numberStr + ",0";
			
		}
		return numberStr.split("\\,");
	}
	public double calculateSimularity(){
		float cnt = 0;
		String[] values_X=this.getNumbersS();
		String[] values_Y=this.getNumbersT();
		
		if(values_X.length != values_Y.length)	return -1;
		
		for(int i=0; i< values_X.length;i++){
			
			//both services have only 1 value
			if(values_X[i].split(";").length==1&&values_Y[i].split(";").length==1){
				if(Integer.valueOf(values_X[i])==Integer.valueOf(values_Y[i]))	cnt++;
			}
			//one of two service has more than 1 values
			else{
				float cnt2 = 0;
				for(int x = 0; x < values_X[i].split(";").length;x++){
					for (int y = 0; y < values_Y[i].split(";").length;y++){
						if(Integer.valueOf(values_X[i].split(";")[x])==Integer.valueOf(values_Y[i].split(";")[y]))	cnt2++;
					}	
				}
				cnt += (values_X[i].split(";").length>values_Y[i].split(";").length)? cnt2/values_X[i].split(";").length: cnt2/values_Y[i].split(";").length;
			}
		}
		
		return (float)cnt / (float)values_X.length;
	}
}
