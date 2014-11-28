/*	
 * $Id$
 * created by    : SHIN HYUN SEONG
 * creation-date : 2011. 7. 15.
 * =========================================================
 * Copyright (c) 2011 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.util;

import java.lang.reflect.Array;
import java.net.URLEncoder;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.axis.utils.StringUtils;
import org.cometd.bayeux.client.ClientSession;
import org.cometd.client.BayeuxClient;
import org.cometd.client.transport.ClientTransport;
import org.cometd.client.transport.LongPollingTransport;
import org.eclipse.jetty.client.HttpClient;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.servlet.ModelAndView;

public class SmartUtil {

	public SmartUtil() {
		super();
	}

	public static int getNumOfValidStrings(String[] strings){
		int count = 0;
		for(int i=0; !SmartUtil.isBlankObject(strings) && i<strings.length; i++){
			if(!SmartUtil.isBlankObject(strings[i])) 
				count++;
		}
		return count;
	}

	public static void appendValidStringsToList(String[] strings, List<String> stringList){
		for(int i=0; !SmartUtil.isBlankObject(strings) && i<strings.length; i++){
			if(!SmartUtil.isBlankObject(strings[i])) 
				stringList.add(strings[i]);
		}
	}	

	public static String[] getStringArray(Object object){
		if(object==null) return null;
		
		if(object instanceof String)
			return new String[]{(String)object};
		
		String[] values = null;
		if(object instanceof ArrayList){
			List<String> stringList = (ArrayList<String>)object;
			values = new String[stringList.size()];
			stringList.toArray(values);
		}
		return values;
	}

	public static String getUserId(){
		return "cdiuser@skku.edu";
	}
	public static String combineStrings(String first, String second){
		if(SmartUtil.isBlankObject(first)) return second;
		if(SmartUtil.isBlankObject(second)) return first;
		String combined = first;
		String[] firstTokens = first.split(", ");
		String[] secondTokens = second.split(", ");
		if(!SmartUtil.isBlankObject(firstTokens) && !SmartUtil.isBlankObject(secondTokens)){
			for(int i=0; i<secondTokens.length; i++){
				boolean found = false;
				for(int j=0; j<firstTokens.length; j++){
					if(firstTokens[j].equals(secondTokens[i])){
						found = true;
						break;
					}
				}
				if(!found){
					combined = combined + ", " + secondTokens[i]; 
				}
			}
		}
		return combined;
	}

	 public static String escape(String src) {   
		 int i;   
		 char j;   
		 StringBuffer tmp = new StringBuffer();   
		 tmp.ensureCapacity(src.length() * 6);   
		 for (i = 0; i < src.length(); i++) {   
			 j = src.charAt(i);   
			 if (Character.isDigit(j) || Character.isLowerCase(j) || Character.isUpperCase(j))   
				 tmp.append(j);   
			 else if (j < 256) {   
				 tmp.append("%");   
				 if (j < 16)   
					 tmp.append("0");   
				 tmp.append(Integer.toString(j, 16));   
			 } else {   
				 tmp.append("%u");   
				 tmp.append(Integer.toString(j, 16));   
			 }   
		 }   
		 return tmp.toString();   
	 }  

	 public static String unescape(String src) {   
		 StringBuffer tmp = new StringBuffer();   
		 tmp.ensureCapacity(src.length());   
		 int lastPos = 0, pos = 0;   
		 char ch;   
		 while (lastPos < src.length()) {   
			 pos = src.indexOf("%", lastPos);   
			 if (pos == lastPos) {   
				 if (src.charAt(pos + 1) == 'u') {   
					 ch = (char) Integer.parseInt(src.substring(pos + 2, pos + 6), 16);   
					 tmp.append(ch);   
					 lastPos = pos + 6;   
				 } else {   
					 ch = (char) Integer.parseInt(src.substring(pos + 1, pos + 3), 16);   
					 tmp.append(ch);   
					 lastPos = pos + 3;   
				 }   
			 } else {   
				 if (pos == -1) {   
					 tmp.append(src.substring(lastPos));   
					 lastPos = src.length();   
				 } else {   
					 tmp.append(src.substring(lastPos, pos));   
					 lastPos = pos;   
				 }   
			 }   
		 }   
		 return tmp.toString();   
	 }    

	 public static String getBriefTitle(String title){
		 if(SmartUtil.isBlankObject(title)) return "";
		 return getBriefTitle(title, 40);
	 }
	 public static String getBriefTitle(String title, int length){
		 if(SmartUtil.isBlankObject(title)) return "";
		 if(length<0) return title;
		 
		 byte[] titleBytes = title.getBytes();
		 if(titleBytes.length<=length) return title;
		 length = titleBytes[length]>=0 ? length : titleBytes[length-1]>=0 ? length-1 : titleBytes[length-2]>=0 ? length-2 : length-2;
		 return new String(titleBytes,0, length) + "...";
 	 }
	 
	 public static String encodeFileName(HttpServletRequest request, String fileName){
		 if(request==null || fileName==null) return null;
		 
		 try{
	       	 String browser = request.getHeader("User-Agent");
//	       	 if(browser.contains("MSIE") || browser.contains("Trident") || browser.contains("Chrome")){        		
	       	 if(browser.contains("MSIE") || browser.contains("Trident")){        		
	    		 return URLEncoder.encode(fileName,"UTF-8").replaceAll("\\+", "%20");
	    	 } else {        		
	       		 return new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
	    	 }
		 }catch(Exception e){
			 return fileName;
		 }
	 }
	 
	public static String getFilesDetailInfo(List<Map<String, String>> files, String workId, String taskInstId, String recordId){
		String html = "<ul>";
		if(SmartUtil.isBlankObject(files)) return html;
		for(int i=0; i<files.size(); i++){
			Map<String, String> file = (Map<String, String>)files.get(i);
			String fileId = file.get("fileId");
			String fileName = file.get("fileName");
			String fileType = file.get("fileType");
			String fileSize = file.get("fileSize");
			long size = (SmartUtil.isBlankObject(fileSize)) ? 0 : Long.parseLong(fileSize);
			html = html + "<li><span class='vm " + SmartUtil.getFileIconClass(fileType) + "'></span><a href='download_file.sw?fileId=" + fileId + 
					"&fileName=" + fileName + "&workId=" + workId + "&taskInstId=" + taskInstId + "&recordId=" + recordId + "' class='linkline qq-upload-file js_stop_propagation'>" + fileName + "</a><span class='qq-upload-size'>" + SmartUtil.getBytesAsString(size) + "</span></li>";
		}
		return html = html + "</ul>";
	}

	private static final String[] Q = new String[]{"B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"};
	public static String getBytesAsString(long bytes){
	    for (int i = 6; i > 0; i--)
	    {
	        double step = Math.pow(1024, i);
	        if (bytes > step) return String.format("%3.1f%s", bytes / step, Q[i]);
	    }
	    return Long.toString(bytes) + Q[0];
	}

	public static String getDepartNameFromFullpath(String departFullpathName){
		if(SmartUtil.isBlankObject(departFullpathName)) return "";
		String[] tokens = departFullpathName.split("���");
		return tokens[tokens.length-1];
	}
	
	public static final  String[] FILE_EXT_TYPES = new String[]{"asf", "avi", "bmp", "doc", "docx", "exe", "gif", "hwp", "jpg", "mid", "mp3",
		"mpeg", "mpg", "pdf", "pds", "ppt", "pptx", "rar", "txt", "wav", "wma", "wmv", "word", "xls", "xlsx", "zip"};
	
	public static String getFileIconClass(String fileType){
		String iconClassPrefix = "icon_file_";
		for(int i=0; i<FILE_EXT_TYPES.length; i++) {
			if(FILE_EXT_TYPES[i].equalsIgnoreCase(fileType)){
				return iconClassPrefix + FILE_EXT_TYPES[i];
			}
		}
		return iconClassPrefix + "none";
		
	}
	
	public static String getFileExtension(String filename){
		String extension = "none";
		if(SmartUtil.isBlankObject(filename)) return extension;
		int pos = filename.lastIndexOf('.');
		
		if(pos != -1) {
			String extTemp = filename.substring( pos + 1, filename.length()).toLowerCase();
			for(int i=0; i<FILE_EXT_TYPES.length; i++) {
				if(FILE_EXT_TYPES[i].equals(extTemp))
					extension = extTemp;
			}
		}
		return extension;
		
	}
	
	public static boolean isMailFileName(byte[] bytes){
		if(bytes.length<37) return false;
		byte[] tempBytes = new byte[37];
		for(int i=0; i<37; i++)
			tempBytes[i] = bytes[i];
		String fileName = new String(tempBytes);
		if(fileName.startsWith("mail_")) return true;
		return false;
	}
	
	public static String smartEncode(String value){
		if(SmartUtil.isBlankObject(value)) return value;
		value = value.replaceAll("\"", "&quot;");
		value = value.replaceAll("\'", "&squo;");
		value = value.replaceAll("<", "&lt;");
		value = value.replaceAll(">", "&gt;");
		value = value.replaceAll("\r\n", "<br>");
		return value;
	}
	
	public static String smartDecode(String value){
		if(SmartUtil.isBlankObject(value)) return value;
		value = value.replaceAll("&quot;", "\"");
		value = value.replaceAll("&squo;", "\'");
		value = value.replaceAll("&lt;", "<");
		value = value.replaceAll("&gt;", ">");
		return value;
	}
	
	public static boolean isBlankObject(Object obj){
		if(obj==null) return true;
		if(obj.equals("null")) return true;
		if(obj.getClass().equals(String.class)) return StringUtils.isEmpty((String)obj);
		if(obj.getClass().isArray()) return (obj==null || Array.getLength(obj)==0) ? true : false;
		return false;
	}

	public static boolean isEmpty(String str){
		return (str == null || str.length()==0) ? true : false;
	}
	
	final static String TILES_POSTFIX = ".sw"; 
	public static boolean isTilesLocation(String str){
		if(SmartUtil.isBlankObject(str) || str.length() <= 3) return false;
		if(TILES_POSTFIX.equals(str.substring(str.length()-TILES_POSTFIX.length(), str.length())) )return true;
		return false;
	}
	
	public static boolean isEmailAddress(String str){
		
		if(SmartUtil.isBlankObject(str)) return false;
		
//		  Pattern pattern = Pattern.compile("^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
		return Pattern.matches("^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[_A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$", str);
	}
	
	public static String printNumber(long number){
		return String.format("%,d", number);
	}

	public static String printFloatNumber(String number){
		if(SmartUtil.isBlankObject(number)) return "";
		NumberFormat nf = NumberFormat.getNumberInstance();
		return nf.format(Float.parseFloat(number))	;	
	}
	
	public static String getPortNumberFromUrl(String url){
		try{
			return url.split("/")[2].split(":")[1];
		}catch(Exception e){}
		return null;
	}
}