package net.smartworks.skkupss.smcal;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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


		/////////////////////////////////////////////////////////////

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

		int[] comp_num = new int[8];
		float sum_comp_num = 0;
		float SIM_ST01 = 0;

		for (int i = 0; i < 8; i++) {
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

		for (int j = 0; j < 8; j++) {
		  sum_comp_num = sum_comp_num + comp_num[j];
		}

		SIM_ST01 = (sum_comp_num)/8;

		/////////////////////////////////////////////////////////////
		//STEP 02
		/////////////////////////////////////////////////////////////

		float[] prop_ctg_A = new float[8];
		float[] prop_ctg_B = new float[8];
		float[] comp_prop = new float[8];
		float sum_comp_prop = 0;
		float SIM_ST02 = 0;

		float at = tot_numofvalues_A;
		float bt = tot_numofvalues_B;

		for(int i = 0; i < 8; i++) {
		    prop_ctg_A[i] = (numofvalues_A[i])/(at);
		    prop_ctg_B[i] = (numofvalues_B[i])/(bt);
		    comp_prop[i] = prop_ctg_A[i] - prop_ctg_B[i];
		}

		for(int j = 0; j < 8; j++) {
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
		double[] sum_ST03 = new double[]{0, 0, 0, 0, 0, 0, 0, 0, 0};
		double[] nor_sum_ST03 = new double[]{0, 0, 0, 0, 0, 0, 0, 0, 0};

		int numAB_A = 0;
		int numAB_B = 0;
		int numBA_B = 0;
		int numBA_A = 0;
		
		
		//System.out.println(tot_numofacts_A);
		
		
		for(int i = 0; i < 8; i++){
			List<String> listC_AB = new ArrayList<String>();
			List<String> listNotC_AB = new ArrayList<String>();
			
			//Extracting common elements from LIST A
			for(int j = numAB_A; j < (numAB_A + numofvalues_A[i]); j++){
				for(int k = numAB_B; k < (numAB_B + numofvalues_B[i]); k++){
					if (values_A[j].equals(values_B[k])) {
						listC_AB.add(values_A[j]);
						break;
					} else {
						listNotC_AB.add(values_A[j]);
					}
				}
			}
			
			//Extracting not-common elements from LIST A
			Set<String> set_listNotC_AB = new HashSet<String>(listNotC_AB);
			List<String> new_listNotC_AB = new ArrayList<String>(set_listNotC_AB);
			List<String> dummy_listNotC_AB = new ArrayList<String>(set_listNotC_AB);
			
			System.out.println(listC_AB);
			System.out.println(new_listNotC_AB);
			//int control_value01_ = new_listNotC_AB.size();
			
			for(int a = 0; a < dummy_listNotC_AB.size(); a++){
			//for(String string_a : new_listNotC_AB){
				for(String string_b : listC_AB){
					System.out.println(dummy_listNotC_AB.get(a));
					System.out.println(string_b);
					if(dummy_listNotC_AB.get(a).equals(string_b)){
					//if(string_a.equals(string_b)){
						new_listNotC_AB.remove(dummy_listNotC_AB.get(a));
					}
				}
			}
			
			
			System.out.println(new_listNotC_AB);
			
			
			List<String> listC_BA = new ArrayList<String>();
			List<String> listNotC_BA = new ArrayList<String>();
			
			//Extracting common elements from LIST B
			for(int j = numBA_B; j < (numBA_B + numofvalues_B[i]); j++){
				for(int k = numBA_A; k < (numBA_A + numofvalues_A[i]); k++){
					if (values_B[j].equals(values_A[k])) {
						listC_BA.add(values_B[j]);
						break;
					} else {
						listNotC_BA.add(values_B[j]);
					}
				}
			}
			
			//Extracting not-common elements from LIST B
			Set<String> set_listNotC_BA = new HashSet<String>(listNotC_BA);
			List<String> new_listNotC_BA = new ArrayList<String>(set_listNotC_BA);
			List<String> dummy_listNotC_BA = new ArrayList<String>(set_listNotC_BA);
			
			for(int a = 0; a < dummy_listNotC_BA.size(); a++){
				for(String string_b : listC_BA){
					//System.out.println(new_listNotC_BA.get(a));
					
					if(dummy_listNotC_BA.get(a).matches(string_b)){
						new_listNotC_BA.remove(dummy_listNotC_BA.get(a));
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
				for(int z = numAB_A; z < (numAB_A + numofvalues_A[i]); z++){
					for(int w = numAB_B; w < (numAB_B + numofvalues_B[i]); w++){
						double distance = compute(values_A[z], values_B[w]);
						s03_dif_part_AB = s03_dif_part_AB + distance;
					}
				}
				for(int z = numBA_B; z < (numBA_B + numofvalues_B[i]); z++){
					for(int w = numBA_A; w < (numBA_A + numofvalues_A[i]); w++){
						double distance = compute(values_B[z], values_A[w]);
						s03_dif_part_BA = s03_dif_part_BA + distance;
					}
				}
				sum_dif_part = s03_dif_part_AB + s03_dif_part_BA;
				sum_part_ = sum_dif_part + sum_com_part;
				System.out.println("condition1 = " + sum_part_);
				
			} else {
				if(new_listNotC_AB.size() * new_listNotC_BA.size() != 0){
					
					for(int x = 0; x < new_listNotC_AB.size(); x++){
						for(String target_string : listC_AB){
							double distance = compute(new_listNotC_AB.get(x), target_string);
							System.out.println(distance + new_listNotC_AB.get(x) + target_string);
							s03_dif_part_AB = s03_dif_part_AB + distance;
						}
					}
					sum_dif_part = sum_dif_part + ((s03_dif_part_AB)/(new_listNotC_AB.size()*listC_AB.size()));
					
					for(int y = 0; y < new_listNotC_BA.size(); y++){
						for(String target_string : listC_AB){
							double distance = compute(new_listNotC_BA.get(y), target_string);
							//System.out.println(distance);
							s03_dif_part_BA = s03_dif_part_BA + distance;
						}
					}
					//System.out.println(new_listNotC_BA.size()*listC_AB.size());
					sum_dif_part = sum_dif_part + ((s03_dif_part_BA)/(new_listNotC_BA.size()*listC_AB.size()));
					sum_part_ = sum_dif_part + sum_com_part;
					System.out.println("condition2 = " + sum_part_);
					
				} else {
					if((new_listNotC_AB.size() == 0) && (new_listNotC_BA.size() == 0)){
						sum_dif_part = 0;
						//System.out.println("aegawegawfawefawegawegawegaweg");
						sum_part_ = sum_dif_part + sum_com_part;
						System.out.println("condition3 = " + sum_part_);
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
							System.out.println("condition4 = " + sum_part_);
						} else {
							for(int x = 0; x < new_listNotC_AB.size(); x++){
								for(String target_string : listC_AB){
									double distance = compute(new_listNotC_AB.get(x), target_string);
									s03_dif_part_AB = s03_dif_part_AB + distance;
								}
							}
							sum_dif_part = sum_dif_part + ((s03_dif_part_AB)/(new_listNotC_AB.size()*listC_AB.size()));
							sum_part_ = sum_dif_part + sum_com_part;
							System.out.println("condition5 = " + sum_part_);
						}
					}
				}
			}
			
			sum_ST03[i] = sum_part_;
			
			//System.out.println(sum_com_part);
			//System.out.println(sum_dif_part);
			//System.out.println(sum_part_);
			
					
			numAB_A = numAB_A + numofvalues_A[i];
			numAB_B = numAB_B + numofvalues_B[i];
			numBA_B = numBA_B + numofvalues_B[i];
			numBA_A = numBA_A + numofvalues_A[i];
			//System.out.println(listC_AB);
			//System.out.println(new_listNotC_AB);
			//System.out.println(listC_BA);
			//System.out.println(new_listNotC_BA);
			//System.out.println(numofcommons_AB[1]);
			//System.out.println(numofcommons_BA[1]);
		}
		
		double SUM_ST03 = 0;
		double[] sumofvalues = new double[8];
		double[] sub_ = new double[8];
		
		for(int i = 0; i < 8; i++){
			//System.out.println(sum_ST03[i]);
			sumofvalues[i] = numofvalues_A[i] + numofvalues_B[i];
			System.out.println(sumofvalues[i]);
			System.out.println(sum_ST03[i]);
			sub_[i] = sum_ST03[i]/sumofvalues[i];
			System.out.println(sub_[i]);
			if((sum_ST03[i] == sumofvalues[i]) || (sub_[i] > 1.0)){
				nor_sum_ST03[i] = 1;
				//System.out.println(numofvalues_A[i] + numofvalues_B[i]);
				System.out.println(nor_sum_ST03[i]);
			} else {
				nor_sum_ST03[i] = (sum_ST03[i])/(sumofvalues[i]);
				//System.out.println(sum_ST03[i]);
				//System.out.println(nor_sum_ST03[i]);
			}
			SUM_ST03 = SUM_ST03 + nor_sum_ST03[i];
		}
		
		SIM_STRe03 = SUM_ST03/8;
		
		
		/////////////////////////////////////////////////////////////
		//SIM CAL RESULT REPORT
		/////////////////////////////////////////////////////////////

		double SIM = (SIM_ST01 + SIM_ST02 + SIM_STRe03)/3;
		
		System.out.println(SIM_ST01);
		System.out.println(SIM_ST02);
		System.out.println(SIM_STRe03);
		System.out.println(SIM);
		
		return SIM;
	}
}
