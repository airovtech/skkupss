package net.smartworks.common;


public class Cond {
	
	private int pageNo = 0;
	private int pageSize = -1;

	private Order[] orders;
	private String orderQuery;

	public Cond() {
		super();
	}

	public int getPageNo() {
		return pageNo;
	}
	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public Order[] getOrders() {
		return orders;
	}
	public void setOrders(Order[] orders) {
		this.orders = orders;
	}
	public String getOrderQuery() {
		if (this.orders == null){
			return "";
		} else {
			String orderQuery = " ";
			for (int i = 0; i < this.orders.length; i++) {
				Order order = this.orders[i];
				orderQuery = orderQuery + order.getField() + " " + (order.isAsc() ? " ASC" : "DESC");
			}
			return orderQuery;
		}
	}
}
