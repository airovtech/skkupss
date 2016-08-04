package net.smartworks.skkupss.smcal;

import java.util.ArrayList;


public class SimContext_old {
	
	
    public static int num = 0;
    float cost = 0;
	float max = 0;
	
	float cost2 = 0;
	float max2 = 0;
	
	float cost3 = 0;
	float max3 = 0;
	
	ArrayList<String> pathA = new ArrayList<String>();
	ArrayList<String> pathB = new ArrayList<String>();
	ArrayList<Integer> indexA = new ArrayList<Integer>();
	ArrayList<Integer> indexB = new ArrayList<Integer>();
	
	
	 public float measureSimilarityAB(Graph graph1, Graph graph2) {
		 
		 // MEASURE SIMILARITY BY COMPARING ALL THE PATHS FROM A TO B OF GRAPH1 AND GRAPH2
		 // AND COMPARING ALL THE PATHS FROM B TO A OF GRAPH1 AND GRAPH2
		 // FINAL SIMILARITY RESULTS FROM MEAN VALUE OF A TO B SIMILARITY AND B TO A SIMILARITY

		 //Between User and Provider
		 float result1 = Similarity(graph1, graph2, Node.NODE_TYPE_PRODUCT, Node.NODE_TYPE_PROVIDER);
		
		 
		 // CLEAR ARRAYLIST FOR LATER CALCUATION
		 pathA.clear();
		 pathB.clear();
		 indexA.clear();
		 indexB.clear();
		 
		 //FROM B TO A
		 float result2 = Similarity(graph1, graph2, Node.NODE_TYPE_PROVIDER, Node.NODE_TYPE_PRODUCT);
		 
		 
		 // CLEAR ARRAYLIST FOR LATER CALCUATION
		 pathA.clear();
		 pathB.clear();
		 indexA.clear();
		 indexB.clear();
		 
		
		 
		// if(result1 == 0 && result2 != 0) {
		//	 return result2;
		// } else if (result2 == 0 && result1 != 0) {
		//	 return result1;
		//	 } 
		 //else {
			//MEAN VALUE OF SIM1 AND SIM2
			 return (result1 + result2)/2 ;
		// }
		

	       
	    }
	 public float measureSimilarityBC(Graph graph1, Graph graph2) {
		 
		 // MEASURE SIMILARITY BY COMPARING ALL THE PATHS FROM A TO B OF GRAPH1 AND GRAPH2
		 // AND COMPARING ALL THE PATHS FROM B TO A OF GRAPH1 AND GRAPH2
		 // FINAL SIMILARITY RESULTS FROM MEAN VALUE OF A TO B SIMILARITY AND B TO A SIMILARITY

		 //Between User and Provider
		 float result1 = Similarity(graph1, graph2, Node.NODE_TYPE_PROVIDER, Node.NODE_TYPE_USER);
		 
		 // CLEAR ARRAYLIST FOR LATER CALCUATION
		 pathA.clear();
		 pathB.clear();
		 indexA.clear();
		 indexB.clear();
		 
		 //FROM B TO A
		 float result2 = Similarity(graph1, graph2, Node.NODE_TYPE_USER, Node.NODE_TYPE_PROVIDER);
		 
		 // CLEAR ARRAYLIST FOR LATER CALCUATION
		 pathA.clear();
		 pathB.clear();
		 indexA.clear();
		 indexB.clear();
		 
		 
	
			 return (result1 + result2)/2 ;
		
		

	       
	 }
	 
	 public float measureSimilarityAC(Graph graph1, Graph graph2) {
		 
		 // MEASURE SIMILARITY BY COMPARING ALL THE PATHS FROM A TO B OF GRAPH1 AND GRAPH2
		 // AND COMPARING ALL THE PATHS FROM B TO A OF GRAPH1 AND GRAPH2
		 // FINAL SIMILARITY RESULTS FROM MEAN VALUE OF A TO B SIMILARITY AND B TO A SIMILARITY

		 //Between User and Provider
		 float result1 = Similarity(graph1, graph2, Node.NODE_TYPE_PRODUCT, Node.NODE_TYPE_USER);
		 
		 // CLEAR ARRAYLIST FOR LATER CALCUATION
		 pathA.clear();
		 pathB.clear();
		 indexA.clear();
		 indexB.clear();
		 
		 //FROM B TO A
		 float result2 = Similarity(graph1, graph2, Node.NODE_TYPE_USER, Node.NODE_TYPE_PRODUCT);
		 
		 // CLEAR ARRAYLIST FOR LATER CALCUATION
		 pathA.clear();
		 pathB.clear();
		 indexA.clear();
		 indexB.clear();
		 
		 
		
			 return (result1 + result2)/2 ;
	
		

	       
	    }
	 public float Similarity(Graph graph1, Graph graph2, String sp, String ep) {
		 // A to B
		 SearchPath path1 = new SearchPath(graph1, sp, ep);
		 SearchPath path2 = new SearchPath(graph2, sp, ep);
		 //System.out.println("here");
		 //System.out.println(path1);
		 //System.out.println(path2);

		 
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
	 //pathA가 무조건 큼 
	
	 public float Compute () {

		 float sim = 0;
		 float minCost = 0;
		 float curCost = 0;
		 float curMax = 0;
		 float curSim = 0;
		 
		 float sim2 = 0;
		 float minCost2 = 0;
		 float curCost2 = 0;
		 float curMax2 = 0;
		 float curSim2 = 0;
		 
	
	     if(pathA.size() == 0 && pathB.size() == 0) {
	    	 System.out.println("Both empty");
	    	 cost = 0; max =0;
	    	 sim = 1;
	     } else if (pathA.size() == 0 || pathB.size() == 0 ) {
	    	 System.out.println("One empty");
	    	 cost = 0; max =0;

	    	 sim = 0;
	     } else {
	         //SIZE SAME	    
	    	 //A and B size same
	    	 if(pathA.size() == pathB.size()) {
	         /* *****PHASE 1 BEGIN ***** */
	    		 
	    		 //not same A and B size
	        for (int i = 0; i < pathA.size(); i++) {
	        	
	        	String node1 = pathA.get(i);
	        	
	        	System.out.println("Comparing1: "+ node1);
	        	
	        	for (int j = 0; j < pathB.size(); j++) {
	        		
	        		String node2 = pathB.get(j);

	        		// NED (NUMBER EDIT DISTANCE)
	        		// WEIGHT = 0.02
	        		//perfect match
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
	        		//different 
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
	        //end of for loop 1	
	        	cost = cost + minCost;
	        	max = max + curMax;
	        	//find arrayA (i) highest similarity 
	        	if(curMax != 0) {
	        		curSim = 1 - (minCost/curMax);
	        	} else {
	        		curSim = 0;
	        	}
	        	sim = sim + curSim;
	        	    
	        	System.out.println("Found the minumum SED: "+minCost+" , "+ curMax+" Current sim = "+curSim);
	        	System.out.println("Accumulated Sim: "+sim+" , "+ i);
	        	System.out.println("____________________________________");
	        	   	
	        }// end of for loop 2
///
	        sim = sim/pathA.size();
	        System.out.println("Intermediate Sim: "+sim);
	        /* *****PHASE 1 END ***** */
	        
	        /* *****PHASE 2 BEGIN ***** */
   		 
   		 //not same A and B size
       for (int i = 0; i < pathB.size(); i++) {
       	
       	String node1 = pathB.get(i);
       	
       	System.out.println("Comparing2: "+ node1);
       	
       	for (int j = 0; j < pathA.size(); j++) {
       		
       		String node2 = pathA.get(j);

       		// NED (NUMBER EDIT DISTANCE)
       		// WEIGHT = 0.02
       		//perfect match
       		if(pathA.contains(node1)) {

       			int index_A = pathB.indexOf(node1);
       			int index_B = pathA.indexOf(node1);
       			
       			int count_A = indexB.get(index_A);
       			int count_B = indexA.get(index_B);
       			
       			if(count_A == count_B) {
       	        	minCost2 = 0;
       	        	curMax2 = node1.length();
       	        	
       	        	System.out.println("Found the perfect match");
           			break;
           			
       			} else {
       				minCost2 = Math.abs(count_A - count_B);
       				minCost2 = (float) (0.02*minCost2);
       				curMax2 = node1.length();
       				
       				System.out.println("NED: "+ minCost2+ " "+curMax2);
           			break;
       			}
       			
       		}
       		//different 
       		// SED (STRING EDIT DISTANCE)
       		// WEIGHT = 1
       		else {
	        		

       			curCost2 = Levenshtein(node1, node2);
       			System.out.println(node1 + " and " + node2 + " = " + curCost2);

       			
       			if(j == 0) minCost2 = curCost2;
       			
       			if(minCost2 >= curCost2) {
       				minCost2 = curCost2;
       				curMax2 = Math.max(node1.length(), node2.length());
       			}
       		}  	
       			
       	}
       //end of for loop 1	
       	cost = cost + minCost2;
       	max = max + curMax2;
       	//find arrayA (i) highest similarity 
       	if(curMax2 != 0) {
       		curSim2 = 1 - (minCost2/curMax2);
       	} else {
       		curSim2 = 0;
       	}
       	sim2 = sim2 + curSim2;
       	    
       	System.out.println("Found the minumum SED: "+minCost2+" , "+ curMax2+" Current sim = "+curSim2);
       	System.out.println("Accumulated Sim: "+sim2+" , "+ i);
       	System.out.println("____________________________________");
       	   	
       }// end of for loop 2
///
       sim2 = sim2/pathA.size();
       System.out.println("Intermediate Sim: "+sim2);
       /* *****PHASE 2 END ***** */
       
       sim = (sim + sim2)/2;
       
	        
	    		 
	    		 	 
	    	 } else {
	    		 
	    	// SIZE DIFFERENT 
	        //not same A and B size
	        for (int i = 0; i < pathA.size(); i++) {
	        	
	        	String node1 = pathA.get(i);
	        	
	        	System.out.println("Comparing3: "+ node1);
	        	
	        	for (int j = 0; j < pathB.size(); j++) {
	        		
	        		String node2 = pathB.get(j);

	        		// NED (NUMBER EDIT DISTANCE)
	        		// WEIGHT = 0.02
	        		//perfect match
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
	        		//different 
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
	        //end of for loop 1	
	        	cost = cost + minCost;
	        	max = max + curMax;
	        	//find arrayA (i) highest similarity 
	        	if(curMax != 0) {
	        		curSim = 1 - (minCost/curMax);
	        	} else {
	        		curSim = 0;
	        	}
	        	sim = sim + curSim;
	        	    
	        	System.out.println("Found the minumum SED: "+minCost+" , "+ curMax+" Current sim = "+curSim);
	        	System.out.println("Accumulated Sim: "+sim+" , "+ i);
	        	System.out.println("____________________________________");
	        	   	
	        }// end of for loop 2
///
	        sim = sim/pathA.size();
	        /*
	        if(max!=0){
	            sim = 1 - (cost/max);
	        } else{	
	        	//when there is no match
	        	sim = 0;
	        	
	        }
	        */
	        
	        	 		
	        }
	        //sim = ??
	    	 System.out.println("cost: " + cost + " max: " + max);
		     System.out.println("Similarity: " + sim+ ", number of times: "+pathA.size());
	        
	     }
	        
	        
	        
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
