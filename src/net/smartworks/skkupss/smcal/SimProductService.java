package net.smartworks.skkupss.smcal;


public class SimProductService{
	
	private String[] valuesS=null;
	private String[] valuesT=null;
	
	public SimProductService(String[] valuesS, String[] valuesT){
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
	
	public String[] getNubmersS(){
		return getNumbers(this.valuesS);
	}
	public String[] getNubmersT(){
		return getNumbers(this.valuesT);
	}
	
	public static String[] getNumbers(String[] values){
		String[] numbers = new String[]{"0", "0"};
		if(values==null || values.length!=6) return numbers;
		for(int i=0; i<3; i++){
			if("selected".equals(values[i])){
				numbers[0] = "" + (i+1);
			}
		}
		if("selected".equals(values[3])){
			numbers[1] = "1";
		}else if("selected".equals(values[5])){
			numbers[1] = "2";
		}else if("selected".equals(values[4])){
			numbers[1] = "3";
		}
		return numbers;
	}
	public double calculateSimularity(){

		float result = 0;
		
		String[] values_X=this.getNubmersS();
		String[] values_Y=this.getNubmersT();
		
		//Oriented
		result += (Integer.valueOf(values_X[0])==Integer.valueOf(values_Y[0]))? 0.5:0;

		
		//Focused
		result += (2-Math.abs(Float.valueOf(values_X[1])-Float.valueOf(values_Y[1])))/4;

		
		return result;
	}
}
