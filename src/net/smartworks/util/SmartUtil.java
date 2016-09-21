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

import net.smartworks.factory.ManagerFactory;
import net.smartworks.skkupss.model.Login;
import net.smartworks.skkupss.model.User;
import net.smartworks.skkupss.smcal.SimContext;
import net.smartworks.skkupss.smcal.Graph;
import net.smartworks.skkupss.smcal.Node;

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

	public static ModelAndView returnMnv(HttpServletRequest request, String ajaxPage, String defaultPage) {
		String getHeader = request.getHeader("X-Requested-With");
		if (getHeader != null){
			SecurityContext context = (SecurityContext) request.getSession().getAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY);
			if (SmartUtil.isBlankObject(context))
				return new ModelAndView("home.tiles");
			else
				return new ModelAndView(ajaxPage);
		}else{
			return new ModelAndView(defaultPage);
		}
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
	
	public static String getPathNameOnlyFromDepartment(String fullPathName){
		if(fullPathName==null) return null;
		String[] tokens = fullPathName.split("▶");
		String pathNameOnly = tokens[0];
		for(int i=1; i<tokens.length-1; i++)
			pathNameOnly = pathNameOnly + "▶" + tokens[i];
		return pathNameOnly;
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

	public static Login getCurrentUser(HttpServletRequest request, HttpServletResponse response) throws Exception {

		Login user = new Login();
		SecurityContext context = (SecurityContext) request.getSession().getAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY);
		if(context != null) {
			Authentication auth = context.getAuthentication();
			if(auth != null) {
				if(((Login)auth.getPrincipal()).getId() != null){
					user = (Login)auth.getPrincipal();
				}else{
					response.sendRedirect("logout");
				}
			} else {
				response.sendRedirect("logout");
			}
		}

		return user;
	}
	
	public static User getCurrentUser() {
		SecurityContext securityContext = SecurityContextHolder.getContext();
		Authentication authentication = securityContext.getAuthentication();
		if(authentication != null) {
			Object principal = authentication.getPrincipal();
			if(!principal.equals("anonymousUser")) {
				Login login = (Login)(principal instanceof Login ? principal : null);
				User user = new User();
				if(login != null) {
					user.setId(login.getId());
					user.setName(login.getName());
					user.setPassword(login.getPassword());
					user.setUserLevel(login.getUserLevel());
					user.setBigPictureName(login.getBigPictureName());
					user.setSmallPictureName(login.getSmallPictureName());
					user.setPicture(login.getPicture());
					user.setCompany(login.getCompany());
					if(!SmartUtil.isBlankObject(login.getLocale()))
						user.setLocale(login.getLocale());
					if(!SmartUtil.isBlankObject(login.getTimeZone()))
						user.setTimeZone(login.getTimeZone());
					user.setHomePhoneNo(login.getHomePhoneNo());
					user.setHomeAddress(login.getHomeAddress());
				}
				return user;
			}
		}
		return SmartUtil.getAnonymousUser("", "");
	}

	public static User getAnonymousUser(String companyId, String company){

		User user = new User();
		user.setId("anonymoususer@smartworks.net");
		user.setName("Anonymous User");
		return user;
	}
	
	public static User getUserFromUserId(String userId){
		User user = null;
		try{
			user = ManagerFactory.getInstance().getServiceManager().getUser(userId);
		}catch(Exception e){
			e.printStackTrace();
		}
		return user;
	}
	
	public static void test(){
    	//USER
        Node n1 = new Node("1", Node.TYPE_USER, "고객1");
        Node n2 = new Node("2", Node.TYPE_USER, "고객2");
        
        //PROVIDER
        Node n3 = new Node("3", Node.TYPE_PROVIDER, "콘텐츠제작업체");
        Node n4 = new Node("4", Node.TYPE_PROVIDER, "완구제조업체");
        Node n5 = new Node("5", Node.TYPE_PROVIDER, "도료제조업체");

        //PRODUCT
        Node n6 = new Node("6", Node.TYPE_PRODUCT, "키덜트장난감");
      //PRODUCT
        Node n7 = new Node("7", Node.TYPE_TOUCHPOINT, "kidultPlayRoom");
        
        Graph graph23 = new Graph();
        graph23.addEdge(n3, n4);
        graph23.addEdge(n4, n3);
        graph23.addEdge(n4, n5);
        graph23.addEdge(n4, n6);
        graph23.addEdge(n7, n1);
        graph23.addEdge(n7, n2);
        graph23.addEdge(n1, n7);
        graph23.addEdge(n2, n7);
        graph23.addTwoWayVertex(n1, n2);       
        graph23.addEdge(n4, n7);
        graph23.addEdge(n5, n7);
        graph23.addEdge(n6, n7);
        graph23.addEdge(n7, n3);
        
        ////////////////CASE B - Kidult Toy ////////////////
        //USER
        Node s1 = new Node("8", Node.TYPE_USER, "고객1");
    
        //PROVIDER
        Node s3 = new Node("9", Node.TYPE_PROVIDER, "콘텐츠제작업체");
        Node s4 = new Node("10", Node.TYPE_PROVIDER, "완구제조업체");
        Node s5 = new Node("11", Node.TYPE_PROVIDER, "공구제조업체");

        //PRODUCT
        Node s6 = new Node("12", Node.TYPE_PRODUCT, "키덜트토이");
        //PRODUCT
        Node s7 = new Node("13", Node.TYPE_TOUCHPOINT, "판매점");
    
        Graph graph24 = new Graph();
        graph24.addTwoWayVertex(s3, s4);
        graph24.addEdge(s4, s6);
        graph24.addTwoWayVertex(s1, s5);
        graph24.addEdge(s6, s7);
        graph24.addEdge(s7, s4);
        graph24.addTwoWayVertex(s7, s1);
       ////////////////CASE C  유모차 서비스 개선  ////////////////
        //USER
        Node l1 = new Node("14", Node.TYPE_USER, "엄마아빠");
        Node l2 = new Node("15", Node.TYPE_USER, "아기");

        //PRODUCT
        Node l3 = new Node("16", Node.TYPE_PRODUCT, "유모차");
        //PRODUCT
        Node l4 = new Node("17", Node.TYPE_TOUCHPOINT, "유모차앱");
        Node l5 = new Node("18", Node.TYPE_TOUCHPOINT, "지문인식");
        Node l6 = new Node("19", Node.TYPE_TOUCHPOINT, "유모차제어");
        Node l7 = new Node("20", Node.TYPE_TOUCHPOINT, "아이용패드");
        Node l8 = new Node("21", Node.TYPE_TOUCHPOINT, "유모차브레이크");

        Graph graph25 = new Graph();
        graph25.addEdge(l1, l4);
        graph25.addEdge(l4, l3);
        graph25.addEdge(l5, l3);
        graph25.addEdge(l3, l6);
        graph25.addEdge(l3, l7);
        graph25.addEdge(l3, l8);
        graph25.addEdge(l6, l2);
        graph25.addTwoWayVertex(l7, l2);
        graph25.addEdge(l8, l2);


        
    	SimContext gSim = new SimContext();
    	
    	
   
    	float result1 = gSim.measureSimilarityAB(graph23, graph24 );
    	
    	float result2 = gSim.measureSimilarityAC(graph23, graph24 );
    	float result3 = gSim.measureSimilarityBC(graph23, graph24  );
    	
    	float result = (result1+result2+result3)/3;
        	       
    	System.out.println("Similarity Result : " + result + ", ab : " + result1 + ", ac : " + result2 + ", bc : " + result3);
      

	}
	
}