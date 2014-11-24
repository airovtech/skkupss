/*	
 * $Id$
 * created by    : SHIN HYUN SEONG
 * creation-date : 2011. 7. 15.
 * =========================================================
 * Copyright (c) 2011 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.util;

import javax.servlet.http.HttpServletRequest;

import net.smartworks.service.IPssService;

import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.servlet.ModelAndView;

public class ServiceUtil {

	public ServiceUtil() {
		super();
	}

	/**
	 * beanName; getBean
	 * @param beanName
	 * @param request
	 * @return
	 */
	public static Object getBean(String beanName, HttpServletRequest request) {

		WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(request.getSession().getServletContext());

		return (Object) wac.getBean(beanName);
	}

	public static ModelAndView returnMnv(HttpServletRequest request, String ajaxPage, String defaultPage) {
		String getHeader = request.getHeader("X-Requested-With");
 		IPssService pssService = (IPssService)ServiceUtil.getBean("pssServiceImpl", request);
		if (getHeader != null){
			return new ModelAndView(ajaxPage, "pssService", pssService);
		}else{
			return new ModelAndView(defaultPage, "pssService", pssService);
		}
	}

}

