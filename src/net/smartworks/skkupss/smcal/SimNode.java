package net.smartworks.skkupss.smcal;

import java.util.ArrayList;

import edu.cmu.lti.lexical_db.ILexicalDatabase;
import edu.cmu.lti.lexical_db.NictWordNet;
import edu.cmu.lti.ws4j.impl.Lin;
import edu.cmu.lti.ws4j.util.WS4JConfiguration;

// USER = �닔�삙�옄 C
// PROVIDER = �젣怨듭옄 B
// PRODUCT = Primary customer (猷⑦듃�끂�뱶) A
// TOUCH-POINT = �옣�냼 D
public class SimNode {
	
	ArrayList<String> p_userA = new ArrayList<String>();
	ArrayList<String> p_userB = new ArrayList<String>();
	ArrayList<String> r_userA = new ArrayList<String>();
	ArrayList<String> r_userB = new ArrayList<String>();
	ArrayList<String> providerA = new ArrayList<String>();
	ArrayList<String> providerB = new ArrayList<String>();
	ArrayList<String> objectA = new ArrayList<String>();
	ArrayList<String> objectB = new ArrayList<String>();
	
	private static ILexicalDatabase db = new NictWordNet();
	
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
	
	public void initialize (Graph graph1, Graph graph2) {
		
	
		ArrayList<Node> NODELISTA = new ArrayList<Node>();
		ArrayList<Node> NODELISTB = new ArrayList<Node>();
		//NodeList A is always bigger
				if(graph1.nodeList().size() >= graph2.nodeList().size()) {
					NODELISTA = graph1.nodeList();
					NODELISTB = graph2.nodeList();
				} else {
					NODELISTA = graph2.nodeList();
					NODELISTB = graph1.nodeList();
				}
			
				
				System.out.println("CREATING NODE ATTRIBUTE ARRAYS A");
				for (int i= 0 ; i < NODELISTA.size() ; i++) {
		    		
		    		Node node = NODELISTA.get(i);	
		    		
		    		if(node.getType().equals("A")) {
		    			p_userA.add(node.getName());
		    			System.out.println("ADDING "+node.getType()+node.getName()+" to Primary Customer");
		    		} else if(node.getType().equals("B")) {
		    			providerA.add(node.getName());
		    			System.out.println("ADDING "+node.getType()+node.getName()+" to Provider");
		    		} else if(node.getType().equals("C")) {
		    			r_userA.add(node.getName());
		    			System.out.println("ADDING "+node.getType()+node.getName()+" to Regular Customer");
		    		} else if (node.getType().equals("D")) {
		    			objectA.add(node.getName());
		    			System.out.println("ADDING "+node.getType()+node.getName()+" to Physical touchpoint");
		    		} 
		    			
		    	}
				
				System.out.println("CREATING NODE ATTRIBUTE ARRAYS B");
				for (int i= 0 ; i < NODELISTB.size() ; i++) {
		    		
		    		Node node = NODELISTB.get(i);	
		    		
		    		if(node.getType().equals("A")) {
		    			p_userB.add(node.getName());
		    			System.out.println("ADDING "+node.getType()+node.getName()+" to Primary Customer");
		    		} else if(node.getType().equals("B")) {
		    			providerB.add(node.getName());
		    			System.out.println("ADDING "+node.getType()+node.getName()+" to Provider");
		    		} else if(node.getType().equals("C")) {
		    			r_userB.add(node.getName());
		    			System.out.println("ADDING "+node.getType()+node.getName()+" to Regular Customer");
		    		} else if (node.getType().equals("D")) {
		    			objectB.add(node.getName());
		    			System.out.println("ADDING "+node.getType()+node.getName()+" to Physical touchpoint");
		    		} 
		    			
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
	
	
	public float measureSimilarity(Graph graph1, Graph graph2){
		
		
		
		initialize(graph1, graph2);
		
		//p_user similarity
		float result_puser = compute(p_userA, p_userB);
		float result_ruser = compute(r_userA, r_userB);
		float result_provider = compute(providerA, providerB);
		float result_object = compute(objectA, objectB);
		
   	    
   	    System.out.println("Primary customer: " + result_puser);
   	 System.out.println("Regular customer: " + result_ruser);
   	System.out.println("Provider: " + result_provider);
   	System.out.println("Object " + result_object);
   	System.out.println("avg sim: " + (result_puser+result_ruser+result_provider+result_object)/4);

	
		
		return (result_puser+result_ruser+result_provider+result_object)/4;
	}
		
		
		
		
	

}
