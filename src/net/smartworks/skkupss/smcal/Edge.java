package net.smartworks.skkupss.smcal;

import net.smartworks.skkupss.smcal.Node;

public class Edge {
	private String id = null;
	private String n1_id = null;
	private String n2_id = null;
	private Node n1, n2;
	
	private String name = null;
	
	public Edge (Node n1, Node n2, String name){
		this.n1_id = n1.getId();
		this.n2_id = n2.getId();
		
		this.setN1(n1);
		this.n2 = n2;
		
		this.name = name;
		
	}
	public String getName() {
		return name;
	}
	public Node getN1() {
		return n1;
	}
	public void setN1(Node n1) {
		this.n1 = n1;
	}
	public Node getN2() {
		return n2;
	}
	public void setN2(Node n2) {
		this.n2 = n2;
	}

}
