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

    	for (int i= 0 ; i < NODELIST.size() ; i++) {
    		
    		String node = NODELIST.get(i).getType();
    		if(node.contains(sp)) {
    			START.add(NODELIST.get(i));
    			System.out.println("ADDING "+node+" to START");
    		} else if(node.contains(ep)) {
    			END.add(NODELIST.get(i));
    			System.out.println("ADDING "+node+" to END");
    		}	
    	}
    	
    	System.out.println("SEARCHING FOR PATHS");
    
   
    	for(int i = 0; i < START.size() ; i++) {
        	for(int j = 0 ; j < END.size() ; j++) {
        		num = j ;
        		System.out.println(START.get(i).getType()+ START.get(i).getId()+" to "+END.get(j).getType()+END.get(j).getId());
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
            if (visited.contains(node)) {
                continue;
            }
            String s1 = node.getType()+node.getId();
            if (s1.equals(END.get(num).getType()+END.get(num).getId())) {
                visited.add(node);
                printPath(visited); 
                visited.removeLast();
                break;
            }
        }
        
        // in breadth-first, recursion needs to come after visiting adjacent nodes
        for (Node node : nodes) {
        	String s1 = node.getType()+node.getId();
            if (visited.contains(node) || s1.equals(END.get(num).getType()+END.get(num).getId())) {
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
        	line = line+node.getType();
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