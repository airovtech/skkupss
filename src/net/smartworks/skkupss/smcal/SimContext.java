package net.smartworks.skkupss.smcal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;


public class SimContext {
	
	
    public static int num = 0;
    float cost = 0;
	float max = 0;
	
	ArrayList<String> pathA = new ArrayList<String>();
	ArrayList<String> pathB = new ArrayList<String>();
	ArrayList<Integer> indexA = new ArrayList<Integer>();
	ArrayList<Integer> indexB = new ArrayList<Integer>();
	
	
	 public float measureSimilarity(Graph graph1, Graph graph2) {
		 
		 // MEASURE SIMILARITY BY COMPARING ALL THE PATHS FROM A TO B OF GRAPH1 AND GRAPH2
		 // AND COMPARING ALL THE PATHS FROM B TO A OF GRAPH1 AND GRAPH2
		 // FINAL SIMILARITY RESULTS FROM MEAN VALUE OF A TO B SIMILARITY AND B TO A SIMILARITY

		 //FROM A TO B
		 float result1 = Similarity(graph1, graph2, "A", "B");
		 
		 // CLEAR ARRAYLIST FOR LATER CALCUATION
		 pathA.clear();
		 pathB.clear();
		 indexA.clear();
		 indexB.clear();
		 
		 //FROM B TO A
		 float result2 = Similarity(graph1, graph2, "B", "A");		 
		 
		 //MEAN VALUE OF SIM1 AND SIM2
		 return (result1 + result2)/2 ;
		 
		 
	       
	    }
	 
	 public float Similarity(Graph graph1, Graph graph2, String sp, String ep) {
		 // A to B
		 SearchPath path1 = new SearchPath(graph1, sp, ep);
		 SearchPath path2 = new SearchPath(graph2, sp, ep);
		 
		 if(path1.returnSize() >= path2.returnSize()) {
			 //PATH1 >= PATH2
			 pathA = path1.returnPath(); 
			 indexA = path1.returnIndex();
			 
			 pathB = path2.returnPath();
			 indexB = path2.returnIndex();
		 
		 } else {
			//PATH1 < PATH2
			 pathA = path2.returnPath(); 
			 indexA = path2.returnIndex();
			 
			 pathB = path1.returnPath();
			 indexB = path1.returnIndex();	 
		 }
		 
		 float result = Compute();
		 
		 System.out.println(sp + " to " + ep + " Similarity: " + result);
		 System.out.println();
		 
		 return result;	 
	 }
	 
	
	 public float Compute () {

		 float sim = 0;
		 float minCost = 0;
		 float curCost = 0;
		 float curMax = 0;
	        
	        	     
	        for (int i = 0; i < pathA.size(); i++) {
	        	
	        	String node1 = pathA.get(i);
	        	
	        	System.out.println("Comparing: "+ node1);
	        	
	        	for (int j = 0; j < pathB.size(); j++) {
	        		
	        		String node2 = pathB.get(j);

	        		// NED (NUMBER EDIT DISTANCE)
	        		// WEIGHT = 0.02
	        		if(pathB.contains(node1)) {

	        			int index_A = pathA.indexOf(node1);
	        			int index_B = pathB.indexOf(node1);
	        			
	        			int count_A = indexA.get(index_A);
	        			int count_B = indexB.get(index_B);
	        			
	        			if(count_A == count_B) {
	        	        	minCost = 0;
	        	        	curMax = node1.length();
	        	        	
	        	        	System.out.println("Found the perfect match");
	            			break;
	            			
	        			} else {
	        				minCost = Math.abs(count_A - count_B);
	        				minCost = (float) (0.02*minCost);
	        				curMax = node1.length();
	        				
	        				System.out.println("NED: "+ minCost+ " "+curMax);
	            			break;
	        			}
	        			
	        		}
	        		// SED (STRING EDIT DISTANCE)
	        		// WEIGHT = 1
	        		else {
		        		
	
	        			curCost = Levenshtein(node1, node2);
	        			System.out.println(node1 + " and " + node2 + " = " + curCost);

	        			
	        			if(j == 0) minCost = curCost;
	        			
	        			if(minCost >= curCost) {
	        				minCost = curCost;
	        				curMax = Math.max(node1.length(), node2.length());
	        			}
	        		}  	
	        			
	        	}
	        	
	        	cost = cost + minCost;
	        	max = max + curMax;
	        
	        	System.out.println("Found the minumum SED: "+minCost+" , "+ curMax);
	        	System.out.println("____________________________________");
	        }
	        
	        ///
	        
	        if(max!=0){
	            sim = 1 - (cost/max);
	        } else{
	        	//when there is no match
	        	sim = 0;
	        }
	        
	        System.out.println("cost: " + cost + " max: " + max);
	        System.out.println("sim: " + sim);
	        
	        return sim;
	        
	 }
	 
	  static public int Levenshtein (String s0, String s1) {                          
	        int len0 = s0.length() + 1;                                                     
	        int len1 = s1.length() + 1;                                                     
	                                                                                        
	        // the array of distances                                                       
	        int[] cost = new int[len0];                                                     
	        int[] newcost = new int[len0];                                                  
	                                                                                        
	        // initial cost of skipping prefix in String s0                                 
	        for (int i = 0; i < len0; i++) cost[i] = i;                                     
	                                                                                        
	        // dynamically computing the array of distances                                  
	                                                                                        
	        // transformation cost for each letter in s1                                    
	        for (int j = 1; j < len1; j++) {                                                
	            // initial cost of skipping prefix in String s1                             
	            newcost[0] = j;                                                             
	                                                                                        
	            // transformation cost for each letter in s0                                
	            for(int i = 1; i < len0; i++) {                                             
	                // matching current letters in both strings                             
	                int match = (s0.charAt(i - 1) == s1.charAt(j - 1)) ? 0 : 1;             
	                                                                                        
	                // computing cost for each transformation                               
	                int cost_replace = cost[i - 1] + match;                                 
	                int cost_insert  = cost[i] + 1;                                         
	                int cost_delete  = newcost[i - 1] + 1;                                  
	                                                                                        
	                // keep minimum cost                                                    
	                newcost[i] = Math.min(Math.min(cost_insert, cost_delete), cost_replace);
	            }                                                                           
	                                                                                        
	            // swap cost/newcost arrays                                                 
	            int[] swap = cost; cost = newcost; newcost = swap;                          
	        }                                                                               
	                                                                                        
	        // the distance is the cost for transforming all letters in both strings        
	        return cost[len0 - 1];                                                          
	    }

}
