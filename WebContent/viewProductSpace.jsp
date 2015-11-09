<%@page import="net.smartworks.util.SmartMessage"%>
<%@page import="net.smartworks.skkupss.model.db.Db_UnspscName"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.HashMap"%>
<%@page import="net.smartworks.factory.DaoFactory"%>
<%@page import="net.smartworks.skkupss.model.ProductSpace"%>
<%@page import="net.smartworks.skkupss.model.ActorSpace"%>
<%@page import="net.smartworks.skkupss.model.User"%>
<%@page import="net.smartworks.skkupss.model.ContextSpace"%>
<%@page import="net.smartworks.skkupss.model.DefaultSpace"%>
<%@page import="net.smartworks.factory.ManagerFactory"%>
<%@page import="net.smartworks.skkupss.model.ProductService"%>
<%@page import="net.smartworks.skkupss.model.ValueSpace"%>
<%@page import="net.smartworks.util.CommonUtil"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.ServiceSpace"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<%

	User cUser = SmartUtil.getCurrentUser();

	ProductSpace productSpace = (ProductSpace)request.getAttribute("productSpace");
	String psId = request.getParameter("psId");
	if(!SmartUtil.isBlankObject(psId)){

		ProductService productService = null;
		try{
			productService = ManagerFactory.getInstance().getServiceManager().getProductService(psId, ProductService.SPACE_TYPE_PRODUCT);
		}catch(Exception e){}
		if(!SmartUtil.isBlankObject(productService)) productSpace = productService.getProductSpace();
		
	}
	String isEditModeStr = request.getParameter("isEditMode");
	boolean isEditMode = SmartUtil.isBlankObject(isEditModeStr) || !isEditModeStr.equalsIgnoreCase("true") ? false : true;
	if(SmartUtil.isBlankObject(productSpace)) productSpace = new ProductSpace();;

	String unspsc = productSpace.getUnspsc();
	String lifecycleSteps = productSpace.getLifecycleSteps();
	
	Db_UnspscName[] codeLevel1s, codeLevel2s, codeLevel3s, codeLevel4s;
	Map<String, String> params = new HashMap<String, String>();
	codeLevel1s = codeLevel2s = codeLevel3s = codeLevel4s = new Db_UnspscName[]{new Db_UnspscName("00", SmartMessage.getString("common.title.none"))};
	if(isEditMode || !SmartUtil.isBlankObject(unspsc))
		codeLevel1s = DaoFactory.getInstance().getDbDao().getUnspscNames(1, params);
	if(!SmartUtil.isBlankObject(unspsc)){
		params.put("level1", ProductSpace.getUnspscNameCode(unspsc, ProductSpace.UNSPSC_CODE_LEVEL1));
		codeLevel2s = DaoFactory.getInstance().getDbDao().getUnspscNames(2, params);
		params.put("level2", ProductSpace.getUnspscNameCode(unspsc, ProductSpace.UNSPSC_CODE_LEVEL2));
		codeLevel3s = DaoFactory.getInstance().getDbDao().getUnspscNames(3, params);
		params.put("level3", ProductSpace.getUnspscNameCode(unspsc, ProductSpace.UNSPSC_CODE_LEVEL3));
		codeLevel4s = DaoFactory.getInstance().getDbDao().getUnspscNames(4, params);
	}
	
	
%>
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />
 	 
<!-- 컨텐츠 레이아웃-->
<div class="js_space_tab js_product_space" spaceType="<%=ProductService.SPACE_TYPE_PRODUCT%>">
	<!-- 스마트폼에서 해당 업무화면을 그려주는 곳 -->
	<div class="form_layout">
		<table>
			<tbody>
				<tr>
					<td class="form_col">
						<div class="form_label" style="width:12%"><span>UNSPSC</span></div>
						<div class="form_value" style="width:88%">
							<select class="js_select_unspsc_code" <%if(!isEditMode){ %>disabled<%} %> name="selUnspscCode1">
								<option value="00"><fmt:message key="common.title.none"/></option>
								<%
								for(int i=0; codeLevel1s!=null && i<codeLevel1s.length; i++){
									Db_UnspscName code = codeLevel1s[i];
									if(code.getId().equals("00")) continue;
									String codeId = ProductSpace.getUnspscNameCode(code.getId(), ProductSpace.UNSPSC_CODE_LEVEL1);
								%>
									<option value="<%=codeId%>" <%if(codeId.equals(ProductSpace.getUnspscNameCode(unspsc, ProductSpace.UNSPSC_CODE_LEVEL1))){ %>selected<%} %>><%=code.getName() %></option>
								<%
								}%>
							</select>
							<select  class="js_select_unspsc_code" <%if(!isEditMode){ %>disabled<%} %> name="selUnspscCode2">
								<option value="00"><fmt:message key="common.title.none"/></option>
								<%
								for(int i=0; codeLevel2s!=null && i<codeLevel2s.length; i++){
									Db_UnspscName code = codeLevel2s[i];
									if(code.getId().equals("00")) continue;
									String codeId = ProductSpace.getUnspscNameCode(code.getId(), ProductSpace.UNSPSC_CODE_LEVEL2);
								%>
									<option value="<%=codeId%>" <%if(codeId.equals(ProductSpace.getUnspscNameCode(unspsc, ProductSpace.UNSPSC_CODE_LEVEL2))){ %>selected<%} %>><%=code.getName() %></option>
								<%
								}%>
							</select>
							<select  class="js_select_unspsc_code" <%if(!isEditMode){ %>disabled<%} %> name="selUnspscCode3">
								<option value="00"><fmt:message key="common.title.none"/></option>
								<%
								for(int i=0; codeLevel3s!=null && i<codeLevel3s.length; i++){
									Db_UnspscName code = codeLevel3s[i];
									if(code.getId().equals("00")) continue;
									String codeId = ProductSpace.getUnspscNameCode(code.getId(), ProductSpace.UNSPSC_CODE_LEVEL3);
								%>
									<option value="<%=codeId%>" <%if(codeId.equals(ProductSpace.getUnspscNameCode(unspsc, ProductSpace.UNSPSC_CODE_LEVEL3))){ %>selected<%} %>><%=code.getName() %></option>
								<%
								}%>
							</select>
							<select  class="js_select_unspsc_code" <%if(!isEditMode){ %>disabled<%} %> name="selUnspscCode4">
								<option value="00"><fmt:message key="common.title.none"/></option>
								<%
								for(int i=0; codeLevel4s!=null && i<codeLevel4s.length; i++){
									Db_UnspscName code = codeLevel4s[i];
									if(code.getId().equals("00")) continue;
									String codeId = ProductSpace.getUnspscNameCode(code.getId(), ProductSpace.UNSPSC_CODE_LEVEL4);
								%>
									<option value="<%=codeId%>" <%if(codeId.equals(ProductSpace.getUnspscNameCode(unspsc, ProductSpace.UNSPSC_CODE_LEVEL4))){ %>selected<%} %>><%=code.getName() %></option>
								<%
								}%>
							</select>
						</div>
					</td>
				</tr>
			</tbody>
		</table>	
	</div>
	<div class="js_lifecycle_steps_target" psId="<%=psId%>"></div>
	
</div>
<!-- 컨텐츠 레이아웃//-->
<script type="text/javascript">
$(function() {

	if(isEmpty(LD$CONTROLLERS)){
		LifecycleDiagram.draw({
			mode : <%if(isEditMode){%>LD$MODE_EDIT<%}else{%>LD$MODE_VIEW<%}%>,
			target : $('.js_lifecycle_steps_target[psId="' + '<%=psId%>' + '"]'),
			jsonDataString : '<%=lifecycleSteps%>'
		});
	}else{
		LifecycleDiagram.draw({
			mode : <%if(isEditMode){%>LD$MODE_EDIT<%}else{%>LD$MODE_VIEW<%}%>,
			target : $('.js_lifecycle_steps_target[psId="' + '<%=psId%>' + '"]'),
			jsonDataString : '<%=lifecycleSteps%>',
			reload : true 
		});
	}
});
</script>
