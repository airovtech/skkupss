/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 11. 25.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package test;

import net.smartworks.util.FileUtil;

public class MakeInsertQuery_ProductService {

	public static void main(String[] args) {
		try {
			
			StringBuffer query = new StringBuffer();
			for (int i = 1; i <= 45; i++) {
				query.append("insert into productService(id) values('").append(i).append("');").append(FileUtil.RN);
			}
			System.out.println(query.toString());
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
