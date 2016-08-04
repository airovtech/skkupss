package net.smartworks.skkupss.smcal;

import java.util.ArrayList;
import java.util.Arrays;

import edu.cmu.lti.lexical_db.ILexicalDatabase;
import edu.cmu.lti.lexical_db.NictWordNet;
import edu.cmu.lti.ws4j.impl.Lin;
import edu.cmu.lti.ws4j.util.WS4JConfiguration;
import net.smartworks.skkupss.smcal.Node;

public class SemanticSim {
	//	General processing part
	
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
	
//	For calculate semantic distance in actor space
	public float measureSimilarity(GraphActor g1, GraphActor g2){
		ArrayList<Edge> edges_small = new ArrayList<Edge>();
		ArrayList<Edge> edges_big = new ArrayList<Edge>();
		ArrayList<Node> nodes_small = new ArrayList<Node>();
		ArrayList<Node> nodes_big = new ArrayList<Node>();
		
		// find smaller edge graph and assign
		if(g1.EDGES.size() <= g2.EDGES.size()){
			edges_small = g1.EDGES;
			nodes_small = g1.NODES;
			edges_big = g2.EDGES;
			nodes_big = g2.NODES;
		}else{
			edges_small = g2.EDGES;
			nodes_small = g1.NODES;
			edges_big = g1.EDGES;
			nodes_big = g2.NODES;
		}
		
		
		// calculate each nodes' semantic distance of all edges
		int m = edges_small.size();
		int n = edges_big.size();
		
		if(m==0 || n==0) return 0;
		double[] edge_matching_sim = new double[m*n];
		
		for(int i = 0; i < m; i++){
			for(int j = 0; j < n; j++){
				double result = 0;
				double tmp1=0;
				double tmp2=0;
				
				if(edges_small.get(i).getN1().getType().equals(edges_big.get(j).getN1().getType()) && edges_small.get(i).getN2().getType().equals(edges_big.get(j).getN2().getType()) ){
					tmp1 = computeDistance(edges_small.get(i).getN1().getName(), edges_big.get(j).getN1().getName());
					tmp2 = computeDistance(edges_small.get(i).getN2().getName(), edges_big.get(j).getN2().getName());
					
					result = (tmp1+tmp2)/2;
				}else{
					result = -1;
				}
//				double tmp1 = computeDistance(edges_small.get(i).getN1().getName(), edges_big.get(j).getN1().getName());
//				double tmp2 = computeDistance(edges_small.get(i).getN2().getName(), edges_big.get(j).getN2().getName());
//				
//				result = (tmp1+tmp2)/2;
				
				edge_matching_sim[j*m+i] = Math.min(1, result);
				
				System.out.println(edges_small.get(i).getN1().getName()+"|"+ edges_big.get(j).getN1().getName()+": "+String.valueOf(tmp1));
				System.out.println(edges_small.get(i).getN2().getName()+"|"+ edges_big.get(j).getN2().getName()+": "+String.valueOf(tmp2));
				System.out.println(edge_matching_sim[j*m+i]);
				System.out.println("=====================");
			}
		}
		
		
		// match edge by the edge_matching_sim
		int[] chosen_edge = new int[m];
		Arrays.fill(chosen_edge, -1);
		
		boolean flag = true;
		while(flag){
			
			double[] matching_sim_sorted = edge_matching_sim.clone();
			Arrays.sort(matching_sim_sorted);
//			System.out.println(Arrays.toString(matching_sim_sorted));
			
			int max_i = -1;
			for(int i=0; i<m*n; i++){
				if(edge_matching_sim[i] == matching_sim_sorted[m*n-1]){
					max_i = i;
					break;
				}
			}
//			int max_i = Arrays.asList(edge_matching_sim).indexOf(matching_sim_sorted[m*n-1]);
			
			int chosen_i = max_i%m;
			int chosen_j = max_i/m;
//			System.out.println(max_i);
//			System.out.println(chosen_i);
			
			chosen_edge[chosen_i] = chosen_j;
			for(int i = 0; i < m; i++){
				edge_matching_sim[chosen_j*m+i] = -1;
			}
			for(int j = 0; j < n; j++){
				edge_matching_sim[j*m+chosen_i] = -1;
			}
			
			boolean flag2 = true;
			int fin = -1;
			for(int i = 0; i < m*n && flag; i++)
			{
			  if (edge_matching_sim[i] != fin) flag2 = false;
			}
			flag = !flag2;
		}
		
		
		// calculate semantic distance of each matched edge
		System.out.println(Arrays.toString(chosen_edge));
		double result = 0;
		for(int i = 0; i < m; i++){
			if(chosen_edge[i]!=-1){
				double tmp1 = computeDistance(edges_small.get(i).getN1().getName(), edges_big.get(chosen_edge[i]).getN1().getName());
				double tmp2 = computeDistance(edges_small.get(i).getN2().getName(), edges_big.get(chosen_edge[i]).getN2().getName());
				
				result += Math.min(1, (tmp1+tmp2)/2);
				
				System.out.println(edges_small.get(i).getN1().getName()+"|"+ edges_big.get(chosen_edge[i]).getN1().getName()+": "+String.valueOf(tmp1));
				System.out.println(edges_small.get(i).getN2().getName()+"|"+ edges_big.get(chosen_edge[i]).getN2().getName()+": "+String.valueOf(tmp2));
				System.out.println(Math.min(1, (tmp1+tmp2)/2));
				System.out.println("=====================");
			}
		}
		
		return (float)result/m;
		
	}
}
