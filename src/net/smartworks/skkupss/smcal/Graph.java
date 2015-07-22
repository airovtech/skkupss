package net.smartworks.skkupss.smcal;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.Map;
import java.util.Set;

public class Graph {
    private Map<Node, LinkedHashSet<Node>> map = new HashMap();
    public ArrayList<Node> NODES = new ArrayList<Node>();
    

    public void addEdge(Node node1, Node node2) {
        LinkedHashSet<Node> adjacent = map.get(node1);
        if(adjacent==null) {
            adjacent = new LinkedHashSet();
            map.put(node1, adjacent);
        }
        adjacent.add(node2); 
        
        addNodes(node1, node2);
    }
    public void addNode(String id, String type, String name) {
    	Node node1 = new Node(id, type, name);
    	
    	if(!(NODES.contains(node1))) {
    	NODES.add(node1);
    	}
    	
    }
    public void addNodes(Node node1, Node node2) {
    	
    	//STORE ALL NODES IN NODES LIST
        if (!(NODES.contains(node1))) {
            NODES.add(node1);
            System.out.println("Adding: "+ node1.getId() + " " + node1.getType());} 
        
       
        
        if (!(NODES.contains(node2))) {
            NODES.add(node2);
            System.out.println("Adding: "+ node2.getId() + " " + node2.getType());} 
        
        
    	
    }


    public void addTwoWayVertex(Node node1, Node node2) {
        addEdge(node1, node2);
        addEdge(node2, node1);
    }
    
    public ArrayList<Node> nodeList () {
    	return NODES;	
    }

    public boolean isConnected(Node node1, Node node2) {
        Set adjacent = map.get(node1);
        if(adjacent==null) {
            return false;
        }
        return adjacent.contains(node2);
    }

    public LinkedList<Node> adjacentNodes(Node last) {
        LinkedHashSet<Node> adjacent = map.get(last);
        if(adjacent==null) {
            return new LinkedList();
        }
        return new LinkedList<Node>(adjacent);
    }
}