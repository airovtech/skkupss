/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 11. 25.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package test;

import net.smartworks.util.FileUtil;

import org.springframework.util.StringUtils;

public class MakeInsertQuery_ServiceSpace {

	public static void main(String[] args) {
		try {
			String content = FileUtil.readString("src/test/service_total.csv");
			String[] rows = StringUtils.tokenizeToStringArray(content, FileUtil.RN);

			String[] unitRows = new String[45];
			StringBuffer buff = new StringBuffer();
			
			int j = 0;
			for (int i = 0; i < rows.length; i+=3) {
				unitRows[j] = buff.append(rows[i]).append(FileUtil.RN).append(rows[i+1]).append(FileUtil.RN).append(rows[i+2]).toString();
				buff.delete(0, buff.length());
				j++;
			}
			StringBuffer query = new StringBuffer();
			for (int i = 0; i < unitRows.length; i++) {
				String[] values = StringUtils.tokenizeToStringArray(unitRows[i], FileUtil.RN);
				
				String psId = null;
				String[] key = null;
				for (int k = 0; k < values.length; k++) {
					if (k == 0) {
						psId = StringUtils.tokenizeToStringArray(values[k], ",")[0];
					} else if (k == 1) {
						key = StringUtils.tokenizeToStringArray(values[k], ",");
					}
				}

				query.append("insert into serviceSpace(id, psId, sspp, ssp, sspc, ssc, sscc)");
				query.append(" values ('service").append(psId).append("','").append(psId).append("'");

				for (int k = 0; k < key.length-1; k++) {
					String value = key[k];
					query.append(", '").append(value).append("'");
				}
				query.append(");").append(FileUtil.RN);
				
			}
			System.out.println(query.toString());
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
