package net.smartworks.skkupss.model;

public class InstanceList {
	
	private Object[] instanceDatas;
	private SortingField sortedField;
	private int pageSize;
	private int	totalPages;
	private int currentPage;
	private int totalSize;
	
	public Object[] getInstanceDatas() {
		return instanceDatas;
	}
	public void setInstanceDatas(Object[] instanceDatas) {
		this.instanceDatas = instanceDatas;
	}
	public SortingField getSortedField() {
		return sortedField;
	}
	public void setSortedField(SortingField sortedField) {
		this.sortedField = sortedField;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getTotalPages() {
		return totalPages;
	}
	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}
	public int getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	public int getTotalSize() {
		return totalSize;
	}
	public void setTotalSize(int totalSize) {
		this.totalSize = totalSize;
	}
	public InstanceList(){
		super();
	}
}
