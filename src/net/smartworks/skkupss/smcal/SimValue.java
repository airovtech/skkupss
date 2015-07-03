package net.smartworks.skkupss.smcal;

import edu.cmu.lti.lexical_db.ILexicalDatabase;
import edu.cmu.lti.lexical_db.NictWordNet;
import edu.cmu.lti.ws4j.impl.Lin;
import edu.cmu.lti.ws4j.util.WS4JConfiguration;

public class SimValue{
	
	private int[] numOfValuesS=null;
	private String[] valuesS=null;
	private int[] numOfValuesT=null;
	private String[] valuesT=null;
	
	public SimValue(int[] numOfValuesS, String[] valuesS, int[] numOfValuesT, String[] valuesT){
		this.numOfValuesS = numOfValuesS;
		this.valuesS = valuesS;
		this.numOfValuesT = numOfValuesT;
		this.valuesT = valuesT;
	}
	
	public int[] getNumOfValuesS() {
		return numOfValuesS;
	}
	public void setNumOfValuesS(int[] numOfValuesS) {
		this.numOfValuesS = numOfValuesS;
	}
	public String[] getValuesS() {
		return valuesS;
	}
	public void setValuesS(String[] valuesS) {
		this.valuesS = valuesS;
	}
	public int[] getNumOfValuesT() {
		return numOfValuesT;
	}
	public void setNumOfValuesT(int[] numOfValuesT) {
		this.numOfValuesT = numOfValuesT;
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
		int[] numofvalues_A = this.numOfValuesS;
		String[] input_values_A = this.valuesS;
		int[] numofvalues_B = this.numOfValuesT;
		String[] input_values_B = this.valuesT;


		int tot_numofvalues_A = input_values_A.length - 1;
		int tot_numofvalues_B = input_values_B.length - 1;
		
		/////////////////////////////////////////////////////////////
		
		String[] values_A = new String[tot_numofvalues_A];
		
		for(int i = 0; i < tot_numofvalues_A; i++) {
			String new_word = "";
			char[] char_value = input_values_A[i].toCharArray();
			for(int j = 0; j < char_value.length; j++) {
				if((char_value[j] >= 65) && (char_value[j] <= 90)) {
					char_value[j] += 32;
				}
				new_word = String.valueOf(new_word) + String.valueOf(char_value[j]);
			}
			values_A[i] = new_word;
		}
		
		String[] values_B = new String[tot_numofvalues_B];
		
		for(int i = 0; i < tot_numofvalues_B; i++) {
			String new_word = "";
			char[] char_value = input_values_B[i].toCharArray();
			for(int j = 0; j < char_value.length; j++) {
				if((char_value[j] >= 65) && (char_value[j] <= 90)) {
					char_value[j] += 32;
				}
				new_word = String.valueOf(new_word) + String.valueOf(char_value[j]);
			}
			values_B[i] = new_word;
		}

		/////////////////////////////////////////////////////////////
		//STEP 01
		/////////////////////////////////////////////////////////////

		int[] comp_num = new int[6];
		float sum_comp_num = 0;
		float SIM_ST01 = 0;

		for (int i = 0; i < 6; i++) {
		  if (numofvalues_A[i] * numofvalues_B[i] == 0){
		    if ((numofvalues_A[i] == 0) && (numofvalues_B[i] == 0)){
		      comp_num[i] = 1;
		    } else {
		      comp_num[i] = 0;
		    }
		  } else {
		    comp_num[i] = 1;
		  }
		}

		for (int j = 0; j < 6; j++) {
		  sum_comp_num = sum_comp_num + comp_num[j];
		}

		SIM_ST01 = (sum_comp_num)/6;

		/////////////////////////////////////////////////////////////
		//STEP 02
		/////////////////////////////////////////////////////////////

		float[] prop_ctg_A = new float[6];
		float[] prop_ctg_B = new float[6];
		float[] comp_prop = new float[6];
		float sum_comp_prop = 0;
		float SIM_ST02 = 0;

		float at = tot_numofvalues_A;
		float bt = tot_numofvalues_B;

		for(int i = 0; i < 6; i++) {
		    prop_ctg_A[i] = (numofvalues_A[i])/(at);
		    prop_ctg_B[i] = (numofvalues_B[i])/(bt);
		    comp_prop[i] = prop_ctg_A[i] - prop_ctg_B[i];
		}

		for(int j = 0; j < 6; j++) {
		  sum_comp_prop = sum_comp_prop + Math.abs(comp_prop[j]);
		}

		SIM_ST02 = 1- (sum_comp_prop/2);
		//System.out.print(SIM_ST02);

		/////////////////////////////////////////////////////////////
		//STEP 03
		/////////////////////////////////////////////////////////////
		/*
		float SIM_ST03 = 0;

		int[] comm_A = new int[tot_numofvalues_A];
		int[] comm_B = new int[tot_numofvalues_B];

		for (int i = 0; i < tot_numofvalues_A; i++) {
		  for (int j = 0; j < tot_numofvalues_B; j++) {
		    if (values_A[i].equals(values_B[j]) == true) {
		      comm_B[j] = 1;
		    }
		  }
		}

		for (int i = 0; i < tot_numofvalues_B; i++) {
		  for (int j = 0; j < tot_numofvalues_A; j++) {
		    if (values_B[i].equals(values_A[j]) == true) {
		      comm_A[j] = 1;
		    }
		  }
		}

		float sum_comm_A = 0;
		float sum_comm_B = 0;

		for (int i = 0; i < tot_numofvalues_A; i++) {
		  sum_comm_A = sum_comm_A + comm_A[i];
		}

		for (int i = 0; i < tot_numofvalues_B; i++) {
		  sum_comm_B = sum_comm_B + comm_B[i];
		}

		float sum_comm = sum_comm_A + sum_comm_B;

		SIM_ST03 = (sum_comm)/(tot_numofvalues_A + tot_numofvalues_B);
		*/
		
		/////////////////////////////////////////////////////////////
		//STEP Re03 (Semantic Comparison)
		/////////////////////////////////////////////////////////////
		
		double SIM_STRe03 = 0;
		
		double sumAB = 0;
		double sumBA = 0;
		int kAB = 0;
		int kBA = 0;
		
		for(int i = 0; i < tot_numofvalues_A; i++){
			for(int j = 0; j < tot_numofvalues_B; j++){
				double distance = 0;
				if(values_A[i] == values_B[j]) {
					distance = 1;
					kAB = kAB + 1;
				} else {
					distance = compute(values_A[i], values_B[j]);
					if(distance > 1) {
						distance = 1;
						kAB = kAB + 1;
					}
				}
				sumAB = sumAB + distance;
				//System.out.println(values_A[i] +" -  " +  values_B[j] + " = " + distance);
			}
		}
		
		for(int i = 0; i < tot_numofvalues_B; i++){
			for(int j = 0; j < tot_numofvalues_A; j++){
				double distance = 0;
				if(values_B[i] == values_A[j]) {
					distance = 1;
					kBA = kBA + 1;
				} else {
					distance = compute(values_B[i], values_A[j]);
					if(distance > 1) {
						distance = 1;
						kBA = kBA + 1;
					}
				}
				sumBA = sumBA + distance;
				//System.out.println(values_B[i] +" -  " +  values_A[j] + " = " + distance);
			}
		}
		
		if((kAB == kBA) && (kAB + kBA == tot_numofvalues_A + tot_numofvalues_B)){
			SIM_STRe03 = 1;
		} else {
			double length = 2 * tot_numofvalues_A * tot_numofvalues_B;
			SIM_STRe03 = (sumAB + sumBA) / length;
		}
		
		//System.out.println("result = " + SIM_ST03);
		//System.out.println(kAB);
		//System.out.println(tot_numofvalues_A);
		//System.out.println(tot_numofvalues_B);	
		
		
		/////////////////////////////////////////////////////////////
		//SIM CAL RESULT REPORT
		/////////////////////////////////////////////////////////////

		double SIM = (SIM_ST01 + SIM_ST02 + SIM_STRe03)/3;

//		System.out.print(SIM);
		
		return SIM;
	}
}
