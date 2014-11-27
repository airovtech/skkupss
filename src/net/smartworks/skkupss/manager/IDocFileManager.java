/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 11. 20.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.skkupss.manager;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public interface IDocFileManager {

	public abstract void ajaxUploadFile(HttpServletRequest request, HttpServletResponse response) throws Exception;

	public abstract void uploadTempFile(HttpServletRequest request, HttpServletResponse response) throws Exception;

	public abstract void deleteFile(HttpServletRequest request, HttpServletResponse response) throws Exception;
	
}
