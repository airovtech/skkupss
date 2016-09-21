package net.smartworks.skkupss.smcal;

import java.util.ArrayList;
import java.util.Arrays;

import edu.cmu.lti.lexical_db.ILexicalDatabase;
import edu.cmu.lti.lexical_db.NictWordNet;
import edu.cmu.lti.ws4j.impl.Lin;
import edu.cmu.lti.ws4j.util.WS4JConfiguration;


public class SimEdge {
	
	public static final String[] TYPES = {	"AA", "AB", "AC", "AD", 
												"BA", "BB", "BC", "BD",
												"CA", "CB", "CC", "CD", 
												"DA", "DB", "DC", "DD"	};
										
	
	ArrayList<ArrayList<Integer>> indexbyEdgeType1 = new ArrayList<ArrayList<Integer>>();
	ArrayList<ArrayList<String>> attrbyEdgeType1 = new ArrayList<ArrayList<String>>();
	ArrayList<ArrayList<Integer>> indexbyEdgeType2 = new ArrayList<ArrayList<Integer>>();
	ArrayList<ArrayList<String>> attrbyEdgeType2 = new ArrayList<ArrayList<String>>();
	
	private static ILexicalDatabase db = new NictWordNet();
	
	public SimEdge(){
		for(int i = 0; i < TYPES.length; i++){
			indexbyEdgeType1.add(new ArrayList<Integer>());
			attrbyEdgeType1.add(new ArrayList<String>());
			indexbyEdgeType2.add(new ArrayList<Integer>());
			attrbyEdgeType2.add(new ArrayList<String>());
		}
	}

	private static double computeDistance(String word1, String word2) {
		WS4JConfiguration.getInstance().setMFS(true);
		double s = new Lin(db).calcRelatednessOfWords(toLowercase(word1), toLowercase(word2));
		return s;
	}
	private static String toLowercase(String value){
		String new_word = "";
		char[] char_value = value.toCharArray();
		for (int j = 0; j < char_value.length; j++) {
			if ((char_value[j] >= 65) && (char_value[j] <= 90)) {
				char_value[j] += 32;
			}
			new_word = String.valueOf(new_word) + String.valueOf(char_value[j]);
		}
		return new_word.split(" ")[0];
	}
	private static String[] toLowercase(String[] values, int num){
		String[] converted = new String[num];
		for (int i = 0; i < num; i++) {
			String new_word = "";
			char[] char_value = values[i].toCharArray();
			for (int j = 0; j < char_value.length; j++) {
				if ((char_value[j] >= 65) && (char_value[j] <= 90)) {
					char_value[j] += 32;
				}
				new_word = String.valueOf(new_word) + String.valueOf(char_value[j]);
			}
			converted[i] = new_word.split(" ")[0];
		}
		return converted;
	}

	
	
	public void initialize (GraphActor graph1, GraphActor graph2) {
		
		// store edge index by their type
		ArrayList<Edge> edges1 = graph1.getEDGES();
		for(int i = 0; i < edges1.size(); i++){
			int index = Arrays.asList(TYPES).indexOf(edges1.get(i).getType());
			indexbyEdgeType1.get(index).add(i);
			attrbyEdgeType1.get(index).add(edges1.get(i).getName());
		}
		ArrayList<Edge> edges2 = graph2.getEDGES();
		for(int i = 0; i < edges2.size(); i++){
			int index = Arrays.asList(TYPES).indexOf(edges2.get(i).getType());
			indexbyEdgeType2.get(index).add(i);
			attrbyEdgeType2.get(index).add(edges2.get(i).getName());
		}
		
	}
	
	public float compute(ArrayList<String> arrayA, ArrayList<String> arrayB) {
		
		float sim=0;
		float max=0;
		float cost=0;
		double minCost=0;
		double maxSim=0;
		String maxWord="";
		
		ArrayList<String> pathA = new ArrayList<String>();
		ArrayList<String> pathB = new ArrayList<String>();
		
		if(arrayA.size() >= arrayB.size()) {
			pathA = arrayA;
			pathB = arrayB;
		} else {
			pathA = arrayB;
			pathB = arrayA;
		}
		
		 System.out.println(pathA);
		 System.out.println(pathB);
		if(pathA.size() == 0 && pathB.size() == 0) {
	    	 System.out.println("Both empty");
	    	 cost = 0; 
	    	 sim = 1;
	     } else if (pathA.size() == 0 || pathB.size() == 0 ) {
	    	 System.out.println("One empty");
	    	 cost = 0; 
	    	 sim = 0;
	     } else {
	    	 for (int i = 0; i < pathB.size(); i++) {
	    		 
	    		 maxSim =  0;
	    		 String node1 = pathB.get(i);
	    		 System.out.println("Comparing: "+ node1);
	    		 node1 = node1.split(" ")[0];
	    		 
	    		 for (int j = 0; j <pathA.size(); j++){
	    			 String node2 = pathA.get(j);
	    			 node2 = node2.split(" ")[0];
	    			 double curSim = 0;
	    			 
	    			 if(node1.equals(node2)) {
	    				 System.out.print("Found perfect match"); 
	    				 
	    				 curSim = 1;
	    				 maxWord = node2;
	    				 
	    			 } else{
		    			 curSim = computeDistance(node1, node2);
		    			 curSim = Math.round(curSim * 100.0) / 100.0;
	    			 }

	    			 if(j==0){
	    				 maxSim = curSim;
	    			 }
	    			 if (maxSim < curSim) {
	    				 maxSim = curSim;
	    				 maxWord = node2;
	    			 }
	    		 }
	    		 System.out.println("MAX SIM between "+node1 +" and "+ maxWord +  " : " + maxSim); 
	    		 sim += maxSim;
	    			 
	    		 }
	    	 sim = sim/pathB.size();
	     }
		System.out.println("--Avg sim: " + sim);
		return sim;
	}
	
	public float measureSimilarity(GraphActor graph1, GraphActor graph2){
		initialize(graph1, graph2);
		
		//p_user similarity
		float[] results = new float[TYPES.length];
		int count = 0;
		for(int i = 0; i < results.length; i++){
			if( (attrbyEdgeType1.get(i).size() * attrbyEdgeType1.get(i).size()) == 0){
				results[i] = 0;
			}else{
				results[i] = compute(attrbyEdgeType1.get(i), attrbyEdgeType2.get(i));
				count++;
			}
		}
		
		float sum = 0;
		for( float i : results) {
		    sum += i;
		}
   	    System.out.println("avg sim: " + sum/count);
	
		return sum/count;
	}
}
	
	
