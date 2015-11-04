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
	
	String[] codeLevel1s, codeLevel2s, codeLevel3s, codeLevel4s;
	Map<String, String> params = new HashMap<String, String>();
	codeLevel1s = codeLevel2s = codeLevel3s = codeLevel4s = new String[]{"00"};
	codeLevel1s = DaoFactory.getInstance().getDbDao().getUnspscCodes(1, params);
	if(!SmartUtil.isBlankObject(unspsc)){
		params.put("level1", productSpace.getUnspscCode(ProductSpace.UNSPSC_CODE_LEVEL1));
		codeLevel2s = DaoFactory.getInstance().getDbDao().getUnspscCodes(2, params);
		params.put("level2", productSpace.getUnspscCode(ProductSpace.UNSPSC_CODE_LEVEL2));
		codeLevel3s = DaoFactory.getInstance().getDbDao().getUnspscCodes(3, params);
		params.put("level3", productSpace.getUnspscCode(ProductSpace.UNSPSC_CODE_LEVEL3));
		codeLevel4s = DaoFactory.getInstance().getDbDao().getUnspscCodes(4, params);
/* 	}else if(!SmartUtil.isBlankObject(codeLevel1s)){
		params.put("level1", codeLevel1s[0]);
		codeLevel2s = DaoFactory.getInstance().getDbDao().getUnspscCodes(2, params);		
 */	}
	
	
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
								<%
								for(int i=0; i<codeLevel1s.length; i++){
									String code = codeLevel1s[i];
								%>
								<option value="<%=code%>" <%if(code.equals(productSpace.getUnspscCode(ProductSpace.UNSPSC_CODE_LEVEL1))){ %>selected<%} %>><%=code %></option>
								<%
								}%>
							</select>
							<select  class="js_select_unspsc_code" <%if(!isEditMode){ %>disabled<%} %> name="selUnspscCode2">
								<%
								for(int i=0; i<codeLevel2s.length; i++){
									String code = codeLevel2s[i];
								%>
								<option value="<%=code%>" <%if(code.equals(productSpace.getUnspscCode(ProductSpace.UNSPSC_CODE_LEVEL2))){ %>selected<%} %>><%=code %></option>
								<%
								}%>
							</select>
							<select  class="js_select_unspsc_code" <%if(!isEditMode){ %>disabled<%} %> name="selUnspscCode3">
								<%
								for(int i=0; i<codeLevel3s.length; i++){
									String code = codeLevel3s[i];
								%>
								<option value="<%=code%>" <%if(code.equals(productSpace.getUnspscCode(ProductSpace.UNSPSC_CODE_LEVEL3))){ %>selected<%} %>><%=code %></option>
								<%
								}%>
							</select>
							<select  class="js_select_unspsc_code" <%if(!isEditMode){ %>disabled<%} %> name="selUnspscCode4">
								<%
								for(int i=0; i<codeLevel4s.length; i++){
									String code = codeLevel4s[i];
								%>
								<option value="<%=code%>" <%if(code.equals(productSpace.getUnspscCode(ProductSpace.UNSPSC_CODE_LEVEL4))){ %>selected<%} %>><%=code %></option>
								<%
								}%>
							</select>
							<span class="js_unspsc_name"></span>
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

	var unspscCode="";
	var productSpace = $('.js_product_space:first');
	productSpace.find('.js_select_unspsc_code').each(function() {
		unspscCode = unspscCode + $(this).find('option:selected').attr('value');
	});		
	productSpace.find('.js_unspsc_name').html(smartMessage.get(unspscCode));
	
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
