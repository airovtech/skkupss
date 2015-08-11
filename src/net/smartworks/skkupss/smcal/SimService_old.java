package net.smartworks.skkupss.smcal;

import edu.cmu.lti.lexical_db.ILexicalDatabase;
import edu.cmu.lti.lexical_db.NictWordNet;
import edu.cmu.lti.ws4j.impl.Lin;
import edu.cmu.lti.ws4j.util.WS4JConfiguration;

public class SimService_old{
	
	private int[] numOfActsS=null;
	private String[] valuesS=null;
	private int[] numOfActsT=null;
	private String[] valuesT=null;
	
	public SimService_old(int[] numOfActsS, String[] valuesS, int[] numOfActsT, String[] valuesT){
		this.numOfActsS = numOfActsS;
		this.valuesS = valuesS;
		this.numOfActsT = numOfActsT;
		this.valuesT = valuesT;
	}		
	public int[] getNumOfActsS() {
		return numOfActsS;
	}
	public void setNumOfActsS(int[] numOfActsS) {
		this.numOfActsS = numOfActsS;
	}
	public int[] getNumOfActsT() {
		return numOfActsT;
	}
	public void setNumOfActsT(int[] numOfActsT) {
		this.numOfActsT = numOfActsT;
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

	private static ILexicalDatabase db = new NictWordNet();

	private static double compute(String word1, String word2) {
		WS4JConfiguration.getInstance().setMFS(true);
		double s = new Lin(db).calcRelatednessOfWords(word1, word2);
		return s;
	}
	
	public double calculateSimularity(){
		int[] numofacts_A = numOfActsS;
		int[] numofacts_B = numOfActsT;
		String[] input_keyacts_A = valuesS;
		String[] input_keyacts_B = valuesT;

		/////////////////////////////////////////////////////////////
		
		int tot_numofacts_A = 0;
	    for (int i = 0; i < 5; i++) {
	        tot_numofacts_A = tot_numofacts_A + numofacts_A[i];
	    }
	    
	    int tot_numofacts_B = 0;
	    for (int i = 0; i < 5; i++) {
	        tot_numofacts_B = tot_numofacts_B + numofacts_B[i];
	    }
		
		/////////////////////////////////////////////////////////////
		
		String[] keyacts_A = new String[tot_numofacts_A];
		
		for(int i = 0; i < tot_numofacts_A; i++) {
			String new_word = "";
			char[] char_act = input_keyacts_A[i].toCharArray();
			for(int j = 0; j < char_act.length; j++) {
				if((char_act[j] >= 65) && (char_act[j] <= 90)) {
					char_act[j] += 32;
				}
				new_word = String.valueOf(new_word) + String.valueOf(char_act[j]);
			}
			keyacts_A[i] = new_word;
		}
		
		String[] keyacts_B = new String[tot_numofacts_B];
		
		for(int i = 0; i < tot_numofacts_B; i++) {
			String new_word = "";
			char[] char_act = input_keyacts_B[i].toCharArray();
			for(int j = 0; j < char_act.length; j++) {
				if((char_act[j] >= 65) && (char_act[j] <= 90)) {
					char_act[j] += 32;
				}
				new_word = String.valueOf(new_word) + String.valueOf(char_act[j]);
			}
			keyacts_B[i] = new_word;
		}

	    /////////////////////////////////////////////////////////////
	    //STEP 01
	    /////////////////////////////////////////////////////////////		
		
		
	    float[] prop_A = new float[5];
	    float[] prop_B = new float[5];
	    float[] comp_prop = new float[5];
	    float sum_comp_prop = 0;
	    float SIM_ST01 = 0;
	    
	    float ta = tot_numofacts_A;
	    float tb = tot_numofacts_B;
	    
	    for (int i = 0; i < 5; i++) {
	    	prop_A[i] = numofacts_A[i]/ta;
	    	prop_B[i] = numofacts_B[i]/tb;
	    	comp_prop[i] = prop_A[i] - prop_B[i];
	    	//comp_prop[i] = numofacts_A[i] - numofacts_B[i];
	    }
	    
	    for (int j = 0; j < 5; j++) {
	      sum_comp_prop = sum_comp_prop + Math.abs(comp_prop[j]);
	    }
	    
	    SIM_ST01 = 1 - (sum_comp_prop/2);

	    //System.out.print(SIM_ST01);
	    	    
	    /////////////////////////////////////////////////////////////
	    //STEP 02
	    /////////////////////////////////////////////////////////////
	    
	    float SIM_ST02 = 0;
	    
	    float score_A = 0;
	    float score_B = 0;
	    
	    for (int i = 0; i < 5; i++) {
	      score_A = score_A + (numofacts_A[i])*(i + 1);
	      score_B = score_B + (numofacts_B[i])*(i + 1);
	    }
	    	    
	    SIM_ST02 = 1 - (Math.abs(score_A - score_B))/(score_A + score_B);
	    //System.out.print(SIM_ST02);

	    /////////////////////////////////////////////////////////////
	    //STEP 03 (Semantic Comparison)
	    /////////////////////////////////////////////////////////////
	    
		double SIM_ST03 = 0;
		
		double sumAB = 0;
		double sumBA = 0;
		int kAB = 0;
		int kBA = 0;
		
		for(int i = 0; i < tot_numofacts_A; i++){
			for(int j = 0; j < tot_numofacts_B; j++){
				double distance = 0;
				if(keyacts_A[i] == keyacts_B[j]) {
					distance = 1;
					kAB = kAB + 1;
				} else {
					distance = compute(keyacts_A[i], keyacts_B[j]);
					if(distance > 1) {
						distance = 1;
						kAB = kAB + 1;
					}
				}
				sumAB = sumAB + distance;
				System.out.println(keyacts_A[i] +" -  " +  keyacts_B[j] + " = " + distance);
			}
		}
		
		for(int i = 0; i < tot_numofacts_B; i++){
			for(int j = 0; j < tot_numofacts_A; j++){
				double distance = 0;
				if(keyacts_B[i] == keyacts_A[j]) {
					distance = 1;
					kBA = kBA + 1;
				} else {
					distance = compute(keyacts_B[i], keyacts_A[j]);
					if(distance > 1) {
						distance = 1;
						kBA = kBA + 1;
					}
				}
				sumBA = sumBA + distance;
				//System.out.println(keyacts_B[i] +" -  " +  keyacts_A[j] + " = " + distance);
			}
		}
		
		if((kAB == kBA) && (kAB + kBA == tot_numofacts_A + tot_numofacts_B)){
			SIM_ST03 = 1;
		} else {
			double length = 2 * tot_numofacts_A * tot_numofacts_B;
			SIM_ST03 = (sumAB + sumBA) / length;
		}
		
		//System.out.println("result = " + SIM_ST03);
		//System.out.println(kAB);
		//System.out.println(tot_numofacts_A);
		//System.out.println(tot_numofacts_B);
	    
	    /////////////////////////////////////////////////////////////
	    //SIM CAL RESULT REPORT
	    /////////////////////////////////////////////////////////////
	    
	    double SIM = (SIM_ST01 + SIM_ST02 + SIM_ST03)/3;

//	    System.out.print(SIM);
	    
		return SIM;
	}
}
