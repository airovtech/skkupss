package net.smartworks.skkupss.smcal;
import java.util.ArrayList;
import java.util.LinkedList;

public class SearchPath {
	
	ArrayList<String> PATHS = new ArrayList<String>();
	ArrayList<Integer> INDEX = new ArrayList<Integer>();

    ArrayList<Node> START = new ArrayList<Node>();
    ArrayList<Node> END = new ArrayList<Node>();
    
    public int num = 0;
    
    
    // 2016.09.19 Added by Y.S. Jung 
    //
    // Actor Space가 아닌 Context Space만을 위한 Search Path
    //
    public SearchPath(Graph graph, String sp, String ep) {
    	
    	ArrayList<Node> NODELIST = graph.nodeList();
    	//////////////
    	System.out.print("NODES: ");
    	for(int i =0 ; i <NODELIST.size() ; i++) {
    		if(NODELIST.get(i)==null) continue;
    		System.out.print(NODELIST.get(i).getType()+NODELIST.get(i).getId()+" ");
    	}
    	System.out.println();
    	//////////////
    	for (int i= 0 ; i < NODELIST.size() ; i++) {
    		
    		Node node = NODELIST.get(i);
    		
    		if(node==null) continue;
    		
    		if(node.getType().equals(sp)) {
    			START.add(node);
    			System.out.println("ADDING "+node.getType()+node.getId()+" to START");
    		} 
    		
    		if(node.getType().equals(ep)) {
    			END.add(node);
    			System.out.println("ADDING "+node.getType()+node.getId()+" to END");
    		}
    			
    	}
    	
    	System.out.println("SEARCHING FOR PATHS");
    	
    	for(int i = 0; i < START.size() ; i++) {
        	for(int j = 0 ; j < END.size() ; j++) {
        		if(START.get(i)==null || END.get(j)==null) continue;
        		num = j ;
        		System.out.println(START.get(i).getType()+START.get(i).getId()+" to "+END.get(j).getType()+END.get(j).getId());
        		LinkedList<Node> visited = new LinkedList();
        		visited.add(START.get(i));
        		depthFirst(graph, visited);
        	}
        }
		
	}
    
    //
    // Actor Space만을 위한 Search Path
    //
    SearchPath(GraphActor graph, String sp, String ep) {
    	
    	ArrayList<Node> NODELIST = graph.nodeList();
    	//////////////
    	System.out.print("NODES: ");
    	for(int i =0 ; i <NODELIST.size() ; i++) {
    		// Null 처리를 위하여 추가됨
       		if(NODELIST.get(i)==null) continue;
    		System.out.print(NODELIST.get(i).getType()+NODELIST.get(i).getId()+" ");
    	}
    	System.out.println();
    	if(sp == Node.NODE_TYPE_PRODUCT || sp == Node.NODE_TYPE_TOUCHPOINT || sp == Node.NODE_TYPE_PROVIDER ||
				sp == Node.NODE_TYPE_USER) {
    	//////////////
	    	for (int i= 0 ; i < NODELIST.size() ; i++) {
	    		
	    		Node node = NODELIST.get(i);
	    		
	    		// Null 처리를 위하여 추가됨 by Y.S.Jung
	    		if(node==null) continue;  		
	    		
	    		if(node.getType().equals(sp)) {
	    			START.add(node);
	    			System.out.println("ADDING "+node.getType()+node.getId()+" to START");
	    		} 
	    		
	    		if(node.getId().equals(ep)) {
	    			END.add(node);
	    			System.out.println("ADDING "+node.getType()+node.getId()+" to END");
	    		}
	    		
	    			
	    	}
    	} else {
    		for (int i= 0 ; i < NODELIST.size() ; i++) {
        		
        		Node node = NODELIST.get(i);

	    		// Null 처리를 위하여 추가됨 by Y.S.Jung
	    		if(node==null) continue;  		
        		
        		if(node.getId().equals(sp)) {
        			START.add(node);
        			System.out.println("ADDING "+node.getType()+node.getId()+" to START");
        		} 
        		
        		if(node.getType().equals(ep)) {
        			END.add(node);
        			System.out.println("ADDING "+node.getType()+node.getId()+" to END");
        		}
        		
        			
        	}
    	}
    	
    	System.out.println("SEARCHING FOR PATHS");
    	
    	for(int i = 0; i < START.size() ; i++) {
        	for(int j = 0 ; j < END.size() ; j++) {
	    		// Null 처리를 위하여 추가됨 by Y.S.Jung
        		if(START.get(i)==null || END.get(j)==null) continue;
        		num = j ;
        		System.out.println(START.get(i).getType()+START.get(i).getId()+" to "+END.get(j).getType()+END.get(j).getId());
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
    
    
    // 2016.09.19 Modified by Y.S. Jung
    //
    // depthFirst(GraphActor graph, LinkedList<Node> visited) --> depthFirst(Graph graph, LinkedList<Node> visited) 수정.
    // GraphActor를 Graph로 변경하여 Graph 및 GraphActor둘 다 받아들일수 있도록 변경
    //
    private void depthFirst(Graph graph, LinkedList<Node> visited) {
        LinkedList<Node> nodes = graph.adjacentNodes(visited.getLast());
        // examine adjacent nodes
        for (Node node : nodes) {
            if (visited.contains(node)) {
                continue;
            }
            
            if (node.getId().equals(END.get(num).getId())) {
                visited.add(node);
                printPath(visited); 
                visited.removeLast();
                break;
            }
        }
        
        // in breadth-first, recursion needs to come after visiting adjacent nodes
        for (Node node : nodes) {
             if (visited.contains(node) || node.getId().equals(END.get(num).getId())) {
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