/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 11. 20.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.skkupss.manager.impl;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.smartworks.skkupss.manager.IDocFileManager;
import net.smartworks.util.IDCreator;
import net.smartworks.util.PropertiesLoader;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class DocFileManagerImpl implements IDocFileManager {

	private void writeAjaxFile(HttpServletRequest request, HttpServletResponse response, String fileId, String filePath, long fileSize) throws Exception {

        InputStream is = null;
        FileOutputStream fos = null;

        try {
            is = request.getInputStream();
            fos = new FileOutputStream(new File(filePath));
            IOUtils.copy(is, fos);
            response.setStatus(HttpServletResponse.SC_OK);
            response.setHeader("Content-Type", "text/html");
            
            String encodingFilePath = StringUtils.replace(filePath, "\\", "[R_S]");
            
    		String PSS_PICTURE_URL = PropertiesLoader.loadPropByClassPath("/net/smartworks/conf/config.properties").getProperty("pss.picture.url");
            
            response.getWriter().print("{success: \"" + true + "\", fileId: \"" + fileId + "\", fullPathName: \"" + PSS_PICTURE_URL +  fileId + "\", fileSize: \"" + fileSize +"\", localFilePath: \"" + encodingFilePath + "\"}");
        } catch (FileNotFoundException ex) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().print("{success: false}");
            throw ex;
        } catch (IOException ex) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().print("{success: false}");
            throw ex;
        } finally {
            try {
                fos.close();
                is.close();
            } catch (IOException ignored) {
                throw ignored;
            }
        }

        response.getWriter().flush();
        response.getWriter().close();
    }

	
	@Override
	public void ajaxUploadFile(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void uploadTempFile(HttpServletRequest request, HttpServletResponse response) throws Exception {
		//this.setFileDirectory(System.getenv("SMARTWORKS_FILE_DIRECTORY") == null ? System.getProperty("user.home") : System.getenv("SMARTWORKS_FILE_DIRECTORY"));

		String fileId = IDCreator.createId("PS");

		String PSS_SERVER_DIR = PropertiesLoader.loadPropByClassPath("/net/smartworks/conf/config.properties").getProperty("pss.server.dir");
		
		File repository = new File(PSS_SERVER_DIR + "/webapps/product-images");
		String filePath = "";
		String extension = "";
		String fileName = "";
		long fileSize = 0;
		try {
			fileName = URLDecoder.decode(request.getHeader("X-File-Name"), "UTF-8");
			fileSize = Long.parseLong(request.getHeader("Content-Length"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		if(repository != null && !repository.exists())
			repository.mkdirs();
		
		if (fileName.indexOf(File.separator) > 1)
			fileName = fileName.substring(fileName.lastIndexOf(File.separator) + 1);
		extension = fileName.lastIndexOf(".") > -1 ? fileName.substring(fileName.lastIndexOf(".") + 1) : null;
		filePath = repository.getAbsolutePath() + File.separator + (String) fileId;

		if (extension != null) {
			filePath = filePath + "." + extension;
		}

		this.writeAjaxFile(request, response, fileId + "." + extension, filePath, fileSize);
		
	}

	@Override
	public void deleteFile(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// TODO Auto-generated method stub
		
	}


}
