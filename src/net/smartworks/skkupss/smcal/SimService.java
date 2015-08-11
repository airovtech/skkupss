package net.smartworks.skkupss.smcal;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import edu.cmu.lti.lexical_db.ILexicalDatabase;
import edu.cmu.lti.lexical_db.NictWordNet;
import edu.cmu.lti.ws4j.impl.Lin;
import edu.cmu.lti.ws4j.util.WS4JConfiguration;

public class SimService{
	
	private int[] numOfActsS=null;
	private String[] valuesS=null;
	private int[] numOfActsT=null;
	private String[] valuesT=null;
	
	public SimService(int[] numOfActsS, String[] valuesS, int[] numOfActsT, String[] valuesT){
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
	    for (int i = 0; i < 6; i++) {
	        tot_numofacts_A = tot_numofacts_A + numofacts_A[i];
	    }
	    
	    int tot_numofacts_B = 0;
	    for (int i = 0; i < 6; i++) {
	        tot_numofacts_B = tot_numofacts_B + numofacts_B[i];
	    }
	    
		//System.out.println(tot_numofacts_A);
		//System.out.println(tot_numofacts_B);
	    
		/////////////////////////////////////////////////////////////
		
		
		String[] keyacts_A = new String[tot_numofacts_A];
		//List<String> keyacts_A = new ArrayList<String>();
		
		for(int i = 0; i < tot_numofacts_A; i++) {
			String new_word = "";
			char[] char_act = input_keyacts_A[i].toCharArray();
			for(int j = 0; j < char_act.length; j++) {
				if((char_act[j] >= 65) && (char_act[j] <= 90)) {
					char_act[j] += 32;
				}
				new_word = String.valueOf(new_word) + String.valueOf(char_act[j]);
			}
			//keyacts_A.add(new_word);
			keyacts_A[i] = new_word;
		}
		
		
		//System.out.println(keyacts_A[0]);
		
		String[] keyacts_B = new String[tot_numofacts_B];
		//List<String> keyacts_B = new ArrayList<String>();
		
		for(int i = 0; i < tot_numofacts_B; i++) {
			String new_word = "";
			char[] char_act = input_keyacts_B[i].toCharArray();
			for(int j = 0; j < char_act.length; j++) {
				if((char_act[j] >= 65) && (char_act[j] <= 90)) {
					char_act[j] += 32;
				}
				new_word = String.valueOf(new_word) + String.valueOf(char_act[j]);
			}
			//keyacts_B.add(new_word);
			keyacts_B[i] = new_word;
		}
		
		
		//System.out.println(keyacts_B[0]);

	    /////////////////////////////////////////////////////////////
	    //STEP 01
	    /////////////////////////////////////////////////////////////		
		
		
	    float[] prop_A = new float[6];
	    float[] prop_B = new float[6];
	    float[] comp_prop = new float[6];
	    float sum_comp_prop = 0;
	    float SIM_ST01 = 0;
	    
	    float ta = tot_numofacts_A;
	    float tb = tot_numofacts_B;
	    
	    for (int i = 0; i < 6; i++) {
	    	prop_A[i] = numofacts_A[i]/ta;
	    	prop_B[i] = numofacts_B[i]/tb;
	    	comp_prop[i] = prop_A[i] - prop_B[i];
	    	//comp_prop[i] = numofacts_A[i] - numofacts_B[i];
	    }
	    
	    for (int j = 0; j < 6; j++) {
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
	    
	    for (int i = 0; i < 6; i++) {
	      score_A = score_A + (numofacts_A[i])*(i + 1);
	      score_B = score_B + (numofacts_B[i])*(i + 1);
	    }
	    	    
	    SIM_ST02 = 1 - (Math.abs(score_A - score_B))/(score_A + score_B);
	    //System.out.print(SIM_ST02);

	    /////////////////////////////////////////////////////////////
	    //STEP 03 (Semantic Comparison)
	    /////////////////////////////////////////////////////////////
	    
		/////////////////////////////////////////////////////////////
		
		
		double SIM_ST03 = 0;
		double[] sum_ST03 = new double[]{0, 0, 0, 0, 0, 0, 0};
		double[] nor_sum_ST03 = new double[]{0, 0, 0, 0, 0, 0, 0};

		int numAB_A = 0;
		int numAB_B = 0;
		int numBA_B = 0;
		int numBA_A = 0;
		
		
		//System.out.println(tot_numofacts_A);
		
		
		for(int i = 0; i < 6; i++){
			List<String> listC_AB = new ArrayList<String>();
			List<String> listNotC_AB = new ArrayList<String>();
			
			//Extracting common elements from LIST A
			for(int j = numAB_A; j < (numAB_A + numofacts_A[i]); j++){
				for(int k = numAB_B; k < (numAB_B + numofacts_B[i]); k++){
					if (keyacts_A[j].equals(keyacts_B[k])) {
						listC_AB.add(keyacts_A[j]);
						break;
					} else {
						listNotC_AB.add(keyacts_A[j]);
					}
				}
			}
			
			//Extracting not-common elements from LIST A
			Set<String> set_listNotC_AB = new HashSet<String>(listNotC_AB);
			List<String> new_listNotC_AB = new ArrayList<String>(set_listNotC_AB);
			
			for(int a = 0; a < new_listNotC_AB.size(); a++){
				for(String string_b : listC_AB){
					//System.out.println(new_listNotC_AB.get(a));
					
					if(new_listNotC_AB.get(a).matches(string_b)){
						new_listNotC_AB.remove(new_listNotC_AB.get(a));
						break;
					}
				}
			}
			
			System.out.println(listC_AB);
			
			
			List<String> listC_BA = new ArrayList<String>();
			List<String> listNotC_BA = new ArrayList<String>();
			
			//Extracting common elements from LIST B
			for(int j = numBA_B; j < (numBA_B + numofacts_B[i]); j++){
				for(int k = numBA_A; k < (numBA_A + numofacts_A[i]); k++){
					if (keyacts_B[j].equals(keyacts_A[k])) {
						listC_BA.add(keyacts_B[j]);
						break;
					} else {
						listNotC_BA.add(keyacts_B[j]);
					}
				}
			}
			
			//Extracting not-common elements from LIST B
			Set<String> set_listNotC_BA = new HashSet<String>(listNotC_BA);
			List<String> new_listNotC_BA = new ArrayList<String>(set_listNotC_BA);
			
			for(int a = 0; a < new_listNotC_BA.size(); a++){
				for(String string_b : listC_BA){
					//System.out.println(new_listNotC_BA.get(a));
					
					if(new_listNotC_BA.get(a).matches(string_b)){
						new_listNotC_BA.remove(new_listNotC_BA.get(a));
						break;
					}
				}
			}
			
			System.out.println(listC_BA);
			
			//System.out.println(listC_AB);
			//System.out.println(listC_BA);
			//System.out.println(new_listNotC_BA);
			//System.out.println(new_listNotC_AB);
			
			//Calculate sim value
			
			double sum_com_part = listC_AB.size() + listC_BA.size();
			double s03_dif_part_AB = 0;
			double s03_dif_part_BA = 0;
			double sum_dif_part = 0;
			double sum_part_ = 0;
			
			if(sum_com_part == 0){
				for(int z = numAB_A; z < (numAB_A + numofacts_A[i]); z++){
					for(int w = numAB_B; w < (numAB_B + numofacts_B[i]); w++){
						double distance = compute(keyacts_A[z], keyacts_B[w]);
						s03_dif_part_AB = s03_dif_part_AB + distance;
					}
				}
				for(int z = numBA_B; z < (numBA_B + numofacts_B[i]); z++){
					for(int w = numBA_A; w < (numBA_A + numofacts_A[i]); w++){
						double distance = compute(keyacts_B[z], keyacts_A[w]);
						s03_dif_part_BA = s03_dif_part_BA + distance;
					}
				}
				sum_dif_part = s03_dif_part_AB + s03_dif_part_BA;
				sum_part_ = sum_dif_part + sum_com_part;
				
			} else {
				if(new_listNotC_AB.size() * new_listNotC_BA.size() != 0){
					
					for(int x = 0; x < new_listNotC_AB.size(); x++){
						for(String target_string : listC_AB){
							double distance = compute(new_listNotC_AB.get(x), target_string);
							s03_dif_part_AB = s03_dif_part_AB + distance;
						}
					}
					sum_dif_part = sum_dif_part + ((s03_dif_part_AB)/(new_listNotC_AB.size()*listC_AB.size()));
					
					for(int y = 0; y < new_listNotC_BA.size(); y++){
						for(String target_string : listC_AB){
							double distance = compute(new_listNotC_BA.get(y), target_string);
							s03_dif_part_BA = s03_dif_part_BA + distance;
						}
					}
					//System.out.println(new_listNotC_BA.size()*listC_AB.size());
					sum_dif_part = sum_dif_part + ((s03_dif_part_BA)/(new_listNotC_BA.size()*listC_AB.size()));
					sum_part_ = sum_dif_part + sum_com_part;
					
				} else {
					if((new_listNotC_AB.size() == 0) && (new_listNotC_BA.size() == 0)){
						sum_dif_part = 0;
						//System.out.println("aegawegawfawefawegawegawegaweg");
						sum_part_ = sum_dif_part + sum_com_part;
					} else {
						if(new_listNotC_AB.size() == 0){
							for(int y = 0; y < new_listNotC_BA.size(); y++){
								for(String target_string : listC_AB){
									double distance = compute(new_listNotC_BA.get(y), target_string);
									s03_dif_part_BA = s03_dif_part_BA + distance;
								}
							}
							//System.out.println(new_listNotC_BA.size()*listC_AB.size());
							sum_dif_part = sum_dif_part + ((s03_dif_part_BA)/(new_listNotC_BA.size()*listC_AB.size()));
							sum_part_ = sum_dif_part + sum_com_part;
						} else {
							for(int x = 0; x < new_listNotC_AB.size(); x++){
								for(String target_string : listC_AB){
									double distance = compute(new_listNotC_AB.get(x), target_string);
									s03_dif_part_AB = s03_dif_part_AB + distance;
								}
							}
							sum_dif_part = sum_dif_part + ((s03_dif_part_AB)/(new_listNotC_AB.size()*listC_AB.size()));
							sum_part_ = sum_dif_part + sum_com_part;
						}
					}
				}
			}
			
			sum_ST03[i] = sum_part_;
			
			//System.out.println(sum_com_part);
			//System.out.println(sum_dif_part);
			//System.out.println(sum_part_);
			
					
			numAB_A = numAB_A + numofacts_A[i];
			numAB_B = numAB_B + numofacts_B[i];
			numBA_B = numBA_B + numofacts_B[i];
			numBA_A = numBA_A + numofacts_A[i];
			//System.out.println(listC_AB);
			//System.out.println(new_listNotC_AB);
			//System.out.println(listC_BA);
			//System.out.println(new_listNotC_BA);
			//System.out.println(numofcommons_AB[1]);
			//System.out.println(numofcommons_BA[1]);
		}
		
		double SUM_ST03 = 0;
		
		for(int i = 0; i < 6; i++){
			//System.out.println(sum_ST03[i]);
			if((sum_ST03[i] == numofacts_A[i] + numofacts_B[i]) || (sum_ST03[i] >= numofacts_A[i] + numofacts_B[i])){
				nor_sum_ST03[i] = 1;
			} else {
				nor_sum_ST03[i] = (sum_ST03[i])/(numofacts_A[i] + numofacts_B[i]);
			}
			SUM_ST03 = SUM_ST03 + nor_sum_ST03[i];
		}
		
		SIM_ST03 = SUM_ST03/6;
		
		//System.out.println("result = " + SIM_ST03);
		//System.out.println(tot_numofacts_A);
		//System.out.println(tot_numofacts_B);
	    
	    /////////////////////////////////////////////////////////////
	    //SIM CAL RESULT REPORT
	    /////////////////////////////////////////////////////////////
	    
	    double SIM = (SIM_ST01 + SIM_ST02 + SIM_ST03)/3;
	    
//	    System.out.println(SIM_ST01);
//	    System.out.println(SIM_ST02);
//	    System.out.println(SIM_ST03);
//	    System.out.println(SIM);
	    
		return SIM;
	}
}
