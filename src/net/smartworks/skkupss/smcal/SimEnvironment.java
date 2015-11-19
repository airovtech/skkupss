package net.smartworks.skkupss.smcal;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import edu.cmu.lti.lexical_db.ILexicalDatabase;
import edu.cmu.lti.lexical_db.NictWordNet;
import edu.cmu.lti.ws4j.impl.Lin;
import edu.cmu.lti.ws4j.util.WS4JConfiguration;

public class SimEnvironment{
	
	private String[] valuesS=null;
	private String[] valuesT=null;
	
	private static final String[] regions = new String[]{"국내", "아시아", "미주", "유럽", "아프리카", "호주"};
	private static final String[] environments = new String[]{"오프라인,", ",온라인", "오프라인,온라인"};
	
	public SimEnvironment(String[] valuesS, String[] valuesT){
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
	private static String[] getNumbers(String[] values){
		String[] numbers = new String[]{"0", "0"};
		if(values==null || values.length!=2) return numbers;
		for(int i=0; i<regions.length; i++){
			if(regions[i].equals(values[0])){
				numbers[0] = "" + (i+1);
			}
		}
		for(int i=0; i<environments.length; i++){
			if(environments[i].equals(values[1])){
				numbers[1] = "" + (i+1);
			}
		}
			
		return numbers;
	}
	
	public double calculateSimularity(){

		float cnt = 0;
		
		String[] values_X=this.getNumbersS();
		String[] values_Y=this.getNumbersT();

		if(values_X==null && values_Y==null) return 1;
		if(values_X==null || values_Y==null) return 0;
		if(values_X.length == values_Y.length){
			boolean found = false;
			for(int i=0; i<values_X.length; i++){
				if(!values_X[i].equals(values_Y[i])){
					found = true;
					break;
				}
			}
			if(!found) return 1;
		}
		
		//location
		if(Integer.valueOf(values_X[0])==1 && Integer.valueOf(values_Y[0])==1){
			//both are domestic
			cnt ++;
		}else if(Integer.valueOf(values_X[0])==1 || Integer.valueOf(values_Y[0])==1){
			//one is only domestic
			
		}else{
			//both are abroad
			
			//same
			if(Integer.valueOf(values_X[0])==Integer.valueOf(values_Y[0]))	cnt++;
			//different
			else	cnt+=0.5;
		}
		
		//on-offline
		if(Integer.valueOf(values_X[1])==Integer.valueOf(values_Y[1]))	cnt++;
		
		
		return (float) (cnt / 2.0);
	}
}
