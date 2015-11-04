package net.smartworks.skkupss.smcal;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import edu.cmu.lti.lexical_db.ILexicalDatabase;
import edu.cmu.lti.lexical_db.NictWordNet;
import edu.cmu.lti.ws4j.impl.Lin;
import edu.cmu.lti.ws4j.util.WS4JConfiguration;

public class SimCustomer{
	
    //positive e^ad
    public static double[] valueEp = new double [7];
    //negative e^-ad
    public static double[] valueEn = new double [7];
    
	private String valuesS=null;
	private String valuesT=null;
	
	public SimCustomer(String valuesS, String valuesT){
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

        double sim = 0 ;
        int depth = 0;
        
        if(!code1.equals(code2)) {
       	 
       	 
       	 //check the depth
       	 if(code1.regionMatches(0, code2, 0, 6)) {
       		 depth = 4;
       	 } else if (code1.regionMatches(0, code2, 0, 4)) {
       		 depth = 3;
       	 } else if (code1.regionMatches(0, code2, 0, 2)) {
       		 depth = 2;
       	 } else {
       		 if(IsSameSeg(code1, code2)){
       			 depth = 1;
       		 } else {
       		 depth = 0;
       		 }
       	 }

       	 sim = (valueEp[depth] - valueEn[depth])/(valueEp[depth] + valueEn[depth]);
            
        } else {
            //code1 and code2 are the same; return 1
            return 1;
        }

        return sim;    
	}

    public static boolean IsSameSeg (String code1, String code2) {
   	boolean result = true;
   	
   	int segCode1 = Integer.parseInt(code1.substring(0,2));
   	int segCode2 = Integer.parseInt(code2.substring(0,2));
   	
   	//two codes are in the same segment group // return true;
   	if ((segCode1 >= 01) && (segCode1 <= 15) && (segCode2 >= 01) && (segCode2 <= 15)){
 	      return true;
 	    } else if ((segCode1 >= 20) && (segCode1 <= 27) && (segCode2 >= 20) && (segCode2 <= 27)){
 	    	return true;
 	      } else if ((segCode1 >= 30) && (segCode1 <= 41) && (segCode2 >= 30) && (segCode2 <= 41)){
 	          return true;
 	        } else if ((segCode1 >= 42) && (segCode1 <= 60) && (segCode2 >= 42) && (segCode2 <= 60)){
 	            return true;
 	          } else {
 	        	  //two codes are not in the same segment group // return false;
 	        	  return false;
 	          }
   	 
    }
    public static void initialize () {
        
        //index as depth
        valueEp[0] = 1;
        valueEp[1] = 1.49182469764;
        valueEp[2] = 2.22554092849;
        valueEp[3] = 3.32011692274;
        valueEp[4] = 4.9530324244;
        valueEp[5] = 7.38905609893;
        valueEp[6] = 11.0231763806; 
        
        valueEn[0] = 1;
        valueEn[1] = 0.67032004603;
        valueEn[2] = 0.44932896411;
        valueEn[3] = 0.30119421191;
        valueEn[4] = 0.20189651799;
        valueEn[5] = 0.13533528323;
        valueEn[6] = 0.09071795328;  
    }

}
