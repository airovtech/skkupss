package net.smartworks.skkupss.smcal;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import edu.cmu.lti.lexical_db.ILexicalDatabase;
import edu.cmu.lti.lexical_db.NictWordNet;
import edu.cmu.lti.ws4j.impl.Lin;
import edu.cmu.lti.ws4j.util.WS4JConfiguration;

public class SimTime{
	    
	private String valuesS=null;
	private String valuesT=null;
	
	public SimTime(String valuesS, String valuesT){
		this.valuesS = valuesS;
		this.valuesT = valuesT;
	}
	
	public String getValuesS() {
		return valuesS;
	}
	public void setValuesS(String valuesS) {
		this.valuesS = valuesS;
	}
	public String getValuesT() {
		return valuesT;
	}
	public void setValuesT(String valuesT) {
		this.valuesT = valuesT;
	}
	
	public double calculateSimularity(){
		String code1 = this.valuesS;
		String code2 = this.valuesT;
		
		int code1Value = Integer.parseInt(code1);
		int code2Value = Integer.parseInt(code2);

        double sim = 0 ;

        sim = (3-Math.abs(code1Value-code2Value))/3;
        
        return sim;    
	}
}
