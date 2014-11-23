/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 11. 23.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.smartworks.util.ServiceUtil;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PssController {
	
	@RequestMapping("/test")
	public ModelAndView noticeMessageBox(HttpServletRequest request, HttpServletResponse response) throws Exception {
		return ServiceUtil.returnMnv(request, "jsp/test.jsp", "jsp/test.jsp");
	}

}
