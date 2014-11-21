package net.smartworks.skkupss.model;

public class RequestParams {

	public static final int PAGING_ACTION_NEXT10 = 1;
	public static final int PAGING_ACTION_NEXTEND = 2;
	public static final int PAGING_ACTION_PREV10 = 3;
	public static final int PAGING_ACTION_PREVEND = 4;
	public static final int DEFAULT_PAGE_SIZE = 20;
	
	private int pageSize=DEFAULT_PAGE_SIZE;
	private int currentPage=1;
	private int pagingAction;

	//ProductService�� name, lastModifiedUser, lastModifiedDate�� ������ 
	private SortingField sortingField;
	
	//ProductService�� name, desc, lastModifiedUser �ʵ�鸸 like �˻�
	private String searchKey;
	
	//PSS_SPACE_VALUE, PSS_SPACE_SERVICE, PSS_SPACE_BIZ_MODEL 3������ �ϳ��� �׻� ���޵Ǹ�,
	//������ SPACE���� ������ �ش�.
	private String spaceType=ProductService.PSS_SPACE_VALUE; 	
	
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	public int getPagingAction() {
		return pagingAction;
	}
	public void setPagingAction(int pagingAction) {
		this.pagingAction = pagingAction;
	}
	public SortingField getSortingField() {
		return sortingField;
	}
	public void setSortingField(SortingField sortingField) {
		this.sortingField = sortingField;
	}
	public String getSearchKey() {
		return searchKey;
	}
	public void setSearchKey(String searchKey) {
		this.searchKey = searchKey;
	}
	public String getSpaceType() {
		return spaceType;
	}
	public void setSpaceType(String spaceType) {
		this.spaceType = spaceType;
	}
	public RequestParams() {
		super();
	}
}
