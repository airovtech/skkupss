package net.smartworks.skkupss.smcal;

public class SimService{
	
	private int[] numOfActsS=null;
	private int[] numOfActsT=null;
	
	public SimService(int[] numOfActsS, int[] numOfActsT){
		this.numOfActsS = numOfActsS;
		this.numOfActsT = numOfActsT;
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


	public float calculateSimularity(){
		int[] numofacts_A = numOfActsS;
		int[] numofacts_B = numOfActsT;

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
	    //SIM CAL RESULT REPORT
	    /////////////////////////////////////////////////////////////
	    
	    float SIM = (SIM_ST01 + SIM_ST02)/2;

//	    System.out.print(SIM);
	    
		return SIM;
	}
}
