/*	
 * $Id$
 * created by    : maninsoft
 * creation-date : 2011. 11. 2.
 * =========================================================
 * Copyright (c) 2011 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.util;

public class IDCreator {

	public static String createId(String prefix) {
		return prefix + "_" + UUID.randomUUID().toStringWithoutDash();
	}
	public static String createShortId(String prefix) {
		return prefix + "_" + IDGenerator.getInstanceId();
	}
}
