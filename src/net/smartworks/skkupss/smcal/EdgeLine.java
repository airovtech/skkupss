package net.smartworks.skkupss.smcal;

public class EdgeLine{
	
	private String id = null;
	private String label = null;
	private Node fromNode = null;
	private Node toNode = null;
	
	public EdgeLine(String id, String label, Node fromNode, Node toNode){
		this.id = id;
		this.label = label;
		this.fromNode = fromNode;
		this.toNode = toNode;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public Node getFromNode() {
		return fromNode;
	}
	public void setFromNode(Node fromNode) {
		this.fromNode = fromNode;
	}
	public Node getToNode() {
		return toNode;
	}
	public void setToNode(Node toNode) {
		this.toNode = toNode;
	}
}
