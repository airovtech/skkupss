/*	
 * $Id$
 * created by    : maninsoft
 * creation-date : 2011. 11. 2.
 * =========================================================
 * Copyright (c) 2011 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.util;

public class IDGenerator {

	/**
	 * instanceLock
	 */
	private static int[] instanceLock = new int[0];
	/**
	 * ???�???��????��?? sequence
	 */
	private static int seq4Instance = 0;
	/**
	 * FIXME Integer.MAX_VALUE�? ?????? ?????? 0??��?? ?????? ??? ??? Id�? 겹�?? ???�???? ??????.
	 *  
	 * @return
	 */
	public static String getInstanceId() {
		
		synchronized(instanceLock) {
			if(seq4Instance++ >= Integer.MAX_VALUE)
				seq4Instance = 0;
				
			return (System.currentTimeMillis() + seq4Instance) + "";
		}
	}

}