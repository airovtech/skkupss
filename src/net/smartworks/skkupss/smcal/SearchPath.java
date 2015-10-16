package net.smartworks.skkupss.smcal;
import java.util.ArrayList;
import java.util.LinkedList;

public class SearchPath {
	
	ArrayList<String> PATHS = new ArrayList<String>();
	ArrayList<Integer> INDEX = new ArrayList<Integer>();

    ArrayList<Node> START = new ArrayList<Node>();
    ArrayList<Node> END = new ArrayList<Node>();
    
    public int num = 0;
    
    SearchPath(Graph graph, String sp, String ep) {
    	
    	ArrayList<Node> NODELIST = graph.nodeList();
    	System.out.println("NODES: "+ NODELIST);
    	
    	for (int i= 0 ; i < NODELIST.size() ; i++) {
    		
    		Node node = NODELIST.get(i);
    		String nodeId = node.getId();
    		if(nodeId==null) continue;
    		
    		if(nodeId.replaceAll("[^A-Za-z]","").contains(sp)) {
    			START.add(node);
    			System.out.println("ADDING "+nodeId+" to START");
    		} else if(nodeId.replaceAll("[^A-Za-z]","").contains(ep)) {
    			END.add(node);
    			System.out.println("ADDING "+nodeId+" to END");
    		}
    			
    	}
    	
    	System.out.println("SEARCHING FOR PATHS");
    	
    	for(int i = 0; i < START.size() ; i++) {
        	for(int j = 0 ; j < END.size() ; j++) {
        		num = j ;
        		System.out.println(START.get(i)+" to "+END.get(j));
        		LinkedList<Node> visited = new LinkedList();
        		visited.add(START.get(i));
        		depthFirst(graph, visited);
        	}
        }
		
	}
   
    public ArrayList<String> returnPath () {
    
    	System.out.println(PATHS);
        return PATHS;
    }
    public ArrayList<Integer> returnIndex () {
    	
    	System.out.println(INDEX);
    	System.out.println();
        return INDEX;
    }
    public int returnSize () {
    	
    	return PATHS.size();
    }
    	
    private void depthFirst(Graph graph, LinkedList<Node> visited) {
        LinkedList<Node> nodes = graph.adjacentNodes(visited.getLast());
        // examine adjacent nodes
        for (Node node : nodes) {
        	String nodeId = node.getId();
            if (visited.contains(nodeId)) {
                continue;
            }
            
            if (node.equals(END.get(num))) {
                visited.add(node);
                printPath(visited); 
                visited.removeLast();
                break;
            }
        }
        
        // in breadth-first, recursion needs to come after visiting adjacent nodes
        for (Node node : nodes) {
        	String nodeId = node.getId();
        	if(nodeId==null) continue;
            if (visited.contains(nodeId) || node.equals(END.get(num))) {
                continue;
            }
            visited.addLast(node);
            depthFirst(graph, visited);
            visited.removeLast();
        }
}

    private void printPath(LinkedList<Node> visited) {
    	String line = "";
    	int curNum = 1;
    	
        for (Node node : visited) {
        	String nodeId = node.getId();
        	if(nodeId==null) continue;
        	line = line+nodeId.replaceAll("[^A-Za-z]","");
        }
        
        // first time
        if (!(PATHS.contains(line))) {
            PATHS.add(line);
            INDEX.add(1);
    	} else {
        	int index = PATHS.indexOf(line);
        	curNum = INDEX.get(index) + 1;
    		INDEX.set(index, curNum);
    	}
       
    }
  
}