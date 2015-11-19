package net.smartworks.skkupss.smcal;

import java.util.ArrayList;
import java.util.List;

import edu.cmu.lti.lexical_db.ILexicalDatabase;
import edu.cmu.lti.lexical_db.NictWordNet;
import edu.cmu.lti.ws4j.impl.Lin;
import edu.cmu.lti.ws4j.util.WS4JConfiguration;
import net.smartworks.skkupss.model.Affordance;
import net.smartworks.skkupss.model.TouchPoint;
import net.smartworks.skkupss.model.TouchPointSpace;
import net.smartworks.util.SmartUtil;

public class SimTouchPoint{
	
	private TouchPointSpace valuesS=null;
	private TouchPointSpace valuesT=null;
	
	public SimTouchPoint(TouchPointSpace valuesS, TouchPointSpace valuesT){
		this.valuesS = valuesS;
		this.valuesT = valuesT;
	}
	
	public TouchPointSpace getValuesS() {
		return valuesS;
	}

	public void setValuesS(TouchPointSpace valuesS) {
		this.valuesS = valuesS;
	}

	public TouchPointSpace getValuesT() {
		return valuesT;
	}

	public void setValuesT(TouchPointSpace valuesT) {
		this.valuesT = valuesT;
	}

	public String[] getWordsS(){
		return getWords(this.valuesS);
	}
	
	public String[] getWordsT(){
		return getWords(this.valuesT);
	}
	
	public String[] getWords(TouchPointSpace touchPointSpace){
		String[] none = new String[]{};
		
		List<String> wordList = new ArrayList<String>();
		if(touchPointSpace==null || SmartUtil.isBlankObject(touchPointSpace.getTouchPoints())) return none;
		
		for(int i=0; i<touchPointSpace.getTouchPoints().length; i++){
			TouchPoint tp = touchPointSpace.getTouchPoints()[i];
//			wordList.add(tp.getReceiverName());
//			wordList.add(tp.getReceiverInteraction());
//			wordList.add(tp.getTouchPointName());
//			wordList.add(tp.getProviderName());
//			wordList.add(tp.getProviderInteraction());
			if(!SmartUtil.isBlankObject(tp.getReceiverAffordances())){
				for(int j=0; j<tp.getReceiverAffordances().length; j++){
					Affordance af = tp.getReceiverAffordances()[j];
					wordList.add(af.getAffordanceName());					
				}
			}
			if(!SmartUtil.isBlankObject(tp.getProviderAffordances())){
				for(int j=0; j<tp.getProviderAffordances().length; j++){
					Affordance af = tp.getProviderAffordances()[j];
					wordList.add(af.getAffordanceName());					
				}
			}
		}
		return wordList.toArray(new String[wordList.size()]);
	}
	
	private static ILexicalDatabase db = new NictWordNet();
		/*
		//available options of metrics
		private static RelatednessCalculator[] rss = { new HirstStOnge(db),
		new LeacockChodorow(db), new Lesk(db), new WuPalmer(db),
		new Resnik(db), new JiangConrath(db), new Lin(db), new Path(db) };
		*/
		private static double compute(String word1, String word2) {
		WS4JConfiguration.getInstance().setMFS(true);
		double s = new Lin(db).calcRelatednessOfWords(word1, word2);
		return s;
	}
	
	public double calculateSimularity(){

		String[] words1 = this.getWordsS();
		String[] words2 = this.getWordsT();
		
		ArrayList<String> wordsA = new ArrayList<String>();
		ArrayList<String> wordsB = new ArrayList<String>();
		
		if(words1==null && words2==null) return 1;
		if(words1==null || words2==null) return 0;
		if(words1.length == words2.length){
			boolean diffFound = false;
			for(int i=0; i<words1.length; i++){
				if(!words1[i].equals(words2[i])){
					diffFound = true;
					break;
				}
			}
			if(!diffFound) return 1;
		}
		
		double sum=0;
		double result=0;
		int count = 0;
		double isum =0;
		double idistance =0;
		
		////////
		if(words1.length >= words2.length) {
			for(int i=0; i<words1.length; i++){
				wordsA.add(words1[i]);	
			}
			for(int i=0; i<words2.length; i++){
				wordsB.add(words2[i]);	
			}
			
		
		} else {
			
			for(int i=0; i<words2.length; i++){
				wordsA.add(words2[i]);	
			}
			for(int i=0; i<words1.length; i++){
				wordsB.add(words1[i]);	
			}
		}
		////////
		System.out.println("A: " +wordsA);
		System.out.println("B: " +wordsB);
	 
		for(int i=0; i<wordsA.size(); i++){			
			for(int j=0; j<wordsB.size(); j++){
			
				double distance = 0;
				
				
				if(wordsB.contains(wordsA.get(i))) {
					distance =1;
					sum = sum+distance;
					System.out.println(wordsA.get(i) +" -  " +  wordsA.get(i)  + " = " + distance);
					//System.out.println("current sum -  "+sum);
					
					break;
				}else {
					idistance = compute(wordsA.get(i), wordsB.get(j));
					isum = isum+idistance;
					count++;
					System.out.println(wordsA.get(i) +" -  " +  wordsB.get(j) + " = " + idistance);
				
				
				}
			
			
			}
		
		}
		if(count!=0)
			sum = sum+ (isum/count);
		double length = wordsA.size();
		result= sum/length;
		System.out.println("sum = " + sum+ " total number = "+length);
		
		System.out.println("result = " + result);
		
		return result;

	}
}
