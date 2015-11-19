package net.smartworks.skkupss.smcal;

import net.smartworks.skkupss.model.TimeSpace;

public class SimTime{
	    
	private TimeSpace timeS=null;
	private TimeSpace timeT=null;
	
	public SimTime(TimeSpace timeS, TimeSpace timeT){
		this.timeS = timeS;
		this.timeT = timeT;
	}
		
	public TimeSpace getTimeS() {
		return timeS;
	}
	public void setTimeS(TimeSpace timeS) {
		this.timeS = timeS;
	}
	public TimeSpace getTimeT() {
		return timeT;
	}
	public void setTimeT(TimeSpace timeT) {
		this.timeT = timeT;
	}

	public String[] getNumbersS(){
		return getNumbers(this.timeS);
	}
	public String[] getNumbersT(){
		return getNumbers(this.timeT);
	}
	
	private String[] getNumbers(TimeSpace timeSpace){
		String[] none = new String[]{"0"};
		if(timeSpace==null) return none;
		
		String numberStr = "";
		for(int i=0; i<4; i++){
			if(timeSpace.isTrueValue(i)){
				numberStr = numberStr + (numberStr.equals("")?"":",") + (i+1);
			}
		}
		if(numberStr.equals("")) return none;
		return numberStr.split("\\,");
	}
	public double calculateSimularity(){
		float result = 0;
		String[] occX = this.getNumbersS();
		String[] occY = this.getNumbersT();
		
		if(occX==null && occY==null) return 1;
		if(occX==null || occY==null) return 0;
		if(occX.length == occY.length){
			boolean diffFound = false;
			for(int i=0; i<occX.length; i++){
				if(!occX[i].equals(occY[i])){
					diffFound = true;
					break;
				}
			}
			if(!diffFound) return 1;
		}

		if(occX.length*occY.length==1){
			//both has only 1 occurrence
			result = (3-Math.abs(Float.valueOf(occX[0])-Float.valueOf(occY[0])))/3;
		}else{
			//at least one service has more than 2 occurrences
			//summarize all value of distance and divide to all available number of matchings
			for(int i = 0 ; i < occX.length; i++){
				for(int j = 0 ; j < occY.length; j++){
					result += (3-Math.abs(Float.valueOf(occX[i])-Float.valueOf(occY[j])));
				}
			}
			result /= occX.length*occY.length*3;
		}
		
//		if(occX.equals(occY))	result = 1;
		
		return result;		
	}
}
