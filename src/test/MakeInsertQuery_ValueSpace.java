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

public class MakeInsertQuery_ValueSpace {

	public static void main(String[] args) {
		try {
			String content = FileUtil.readString("src/test/value_total.csv");
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
				String[] value = null;
				for (int k = 0; k < values.length; k++) {
					if (k == 0) {
						psId = StringUtils.tokenizeToStringArray(values[k], ",")[0];
					} else if (k == 1) {
						key = StringUtils.tokenizeToStringArray(values[k], ",");
					} else if (k == 2) {
						value = StringUtils.tokenizeToStringArray(values[k], ",");
					}
				}

				query.append("insert into valueSpace(id, psId, function, extrinsicSocial, activeEmotional, reactiveEmotional, intrinsicSocial, epistemic)");
				query.append(" values ('value").append(psId).append("','").append(psId).append("'");

				int arrayIndex = 0;
				for (int k = 0; k < key.length-1; k++) {
					int arraySize = Integer.parseInt(key[k]);
					if (arraySize == 0) {
						query.append(", null");
					} else {
						query.append(", '");
						boolean isFirst = true;
						for (int l = 0; l < arraySize; l++) {
							if (isFirst) {
								query.append(value[arrayIndex]);
								isFirst = false;
							} else {
								query.append(";").append(value[arrayIndex]);
							}
							arrayIndex += 1;
						}
						query.append("'");
					}
				}
				query.append(");").append(FileUtil.RN);
			}
			System.out.println(query.toString());
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
