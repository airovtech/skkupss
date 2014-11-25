package net.smartworks.skkupss.smcal;

public class SimBizModel{
	
	private int[] numOfStrategiesS=null;
	private String[] strategiesS=null;
	private int[] numOfStrategiesT=null;
	private String[] strategiesT=null;
	
	public SimBizModel(int[] numOfStrategiesS, String[] strategiesS, int[] numOfStrategiesT, String[] strategiesT){
		this.numOfStrategiesS = numOfStrategiesS;
		this.strategiesS = strategiesS;
		this.numOfStrategiesT = numOfStrategiesT;
		this.strategiesT = strategiesT;
	}


	public int[] getNumOfStrategiesS() {
		return numOfStrategiesS;
	}


	public void setNumOfStrategiesS(int[] numOfStrategiesS) {
		this.numOfStrategiesS = numOfStrategiesS;
	}


	public String[] getStrategiesS() {
		return strategiesS;
	}


	public void setStrategiesS(String[] strategiesS) {
		this.strategiesS = strategiesS;
	}


	public int[] getNumOfStrategiesT() {
		return numOfStrategiesT;
	}


	public void setNumOfStrategiesT(int[] numOfStrategiesT) {
		this.numOfStrategiesT = numOfStrategiesT;
	}


	public String[] getStrategiesT() {
		return strategiesT;
	}


	public void setStrategiesT(String[] strategiesT) {
		this.strategiesT = strategiesT;
	}


	public float calculateSimularity(){
		int[] numofst_A = this.numOfStrategiesS;
		String[] input_st_A = this.strategiesS;
		int[] numofst_B = this.numOfStrategiesT;
		String[] input_st_B = this.strategiesT;
		
		/////////////////////////////////////////////////////////////

		int tot_numofst_A = input_st_A.length - 1;
		int tot_numofst_B = input_st_B.length - 1;
		
		/////////////////////////////////////////////////////////////
		
		String[] st_A = new String[tot_numofst_A];
		
		for(int i = 0; i < tot_numofst_A; i++) {
			String new_word = "";
			char[] char_value = input_st_A[i].toCharArray();
			for(int j = 0; j < char_value.length; j++) {
				if((char_value[j] >= 65) && (char_value[j] <= 90)) {
					char_value[j] += 32;
				}
				new_word = String.valueOf(new_word) + String.valueOf(char_value[j]);
			}
			st_A[i] = new_word;
		}
		
		String[] st_B = new String[tot_numofst_B];
		
		for(int i = 0; i < tot_numofst_B; i++) {
			String new_word = "";
			char[] char_value = input_st_B[i].toCharArray();
			for(int j = 0; j < char_value.length; j++) {
				if((char_value[j] >= 65) && (char_value[j] <= 90)) {
					char_value[j] += 32;
				}
				new_word = String.valueOf(new_word) + String.valueOf(char_value[j]);
			}
			st_B[i] = new_word;
		}
		
		/////////////////////////////////////////////////////////////
		//STEP 01
		/////////////////////////////////////////////////////////////
		
		int[] comp_num = new int[8];
		float sum_comp_num = 0;
		float SIM_ST01 = 0;
		
		for (int i = 0; i < 8; i++) {
			if (numofst_A[i] * numofst_B[i] == 0){
				if ((numofst_A[i] == 0) && (numofst_B[i] ==0)){
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
		//STEP 03
		/////////////////////////////////////////////////////////////
		
		float SIM_ST02 = 0;
		
		int[] comm_A = new int[tot_numofst_A];
		int[] comm_B = new int[tot_numofst_B];
		
		for (int i = 0; i < tot_numofst_A; i++) {
			for (int j = 0; j < tot_numofst_B; j++) {
				if (st_A[i].equals(st_B[j]) == true) {
					comm_B[j] = 1;
				}
			}
		}
		
		for (int i = 0; i < tot_numofst_B; i++) {
			for (int j = 0; j < tot_numofst_A; j++) {
				if (st_B[i].equals(st_A[j]) == true) {
					comm_A[j] = 1;
				}
			}
		}
		
		float sum_comm_A = 0;
		float sum_comm_B = 0;
		
		for (int i = 0; i < tot_numofst_A; i++) {
			sum_comm_A = sum_comm_A + comm_A[i];
		}
		
		for (int i = 0; i < tot_numofst_B; i++) {
			sum_comm_B = sum_comm_B + comm_B[i];
		}
		
		float sum_comm = sum_comm_A + sum_comm_B;
		
		SIM_ST02 = (sum_comm)/(tot_numofst_A + tot_numofst_B);
				
		/////////////////////////////////////////////////////////////
		//SIM CAL RESULT REPORT
		/////////////////////////////////////////////////////////////
		
		float SIM = (SIM_ST01 + SIM_ST02)/2;
		
//		System.out.print(SIM);
		
		return SIM;
	}	
}
