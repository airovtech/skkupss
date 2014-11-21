package net.smartworks.util;

public class OSValidator {

	public static String getImageDirectory() {
		if(isWindows())
			return SmartConfUtil.getInstance().getWindowsImageDirectory();
		else if(isMac())
			return SmartConfUtil.getInstance().getMacImageDirectory();
		else if(isUnix())
			return SmartConfUtil.getInstance().getUnixImageDirectory();
		else if(isSolaris())
			return SmartConfUtil.getInstance().getSolarisImageDirectory();
		return "";
	}

	public static String getSmartWorksDirectory() {
		return SmartConfUtil.getInstance().getSmartServerDirectory();
	}

	public static boolean isWindows() {
		 
		String os = System.getProperty("os.name").toLowerCase();
		// windows
		return (os.indexOf("win") >= 0);
 
	}
 
	public static boolean isMac() {
 
		String os = System.getProperty("os.name").toLowerCase();
		// Mac
		return (os.indexOf("mac") >= 0);
 
	}
 
	public static boolean isUnix() {
 
		String os = System.getProperty("os.name").toLowerCase();
		// linux or unix
		return (os.indexOf("nix") >= 0 || os.indexOf("nux") >= 0);
 
	}
 
	public static boolean isSolaris() {
 
		String os = System.getProperty("os.name").toLowerCase();
		// Solaris
		return (os.indexOf("sunos") >= 0);
 
	}

}