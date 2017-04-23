package net.smartworks.common;

import org.springframework.util.StringUtils;

import net.smartworks.skkupss.model.SBPService;

public class DataConvert {
	
	private int indexFirst, indexLast;
	private String data = "", impl = "";

	/* 모두보기를 위해 color,acitivty만을 추출하여 PSSD로 보낼 데이터를 만든다. */
	public String convertForPSSD(SBPService sbpInfo) {
		String[] seqArray, color;
		StringBuffer seqArrayWithColor = new StringBuffer();
		
		data = sbpInfo.getSspp();
		indexFirst = data.indexOf("seq:[/(start)/,");
		if(indexFirst != -1) {
			do{
				indexFirst = data.indexOf("seq:[/(start)/,");
				impl = data.substring(indexFirst + 15);
				indexLast = impl.indexOf("/(end)/");
				impl = data.substring(indexFirst + 15, indexFirst + 15 + indexLast);
				seqArray = StringUtils.tokenizeToStringArray(impl, ",");
				
				indexFirst = data.indexOf("color:[/(start)/,");
				impl = data.substring(indexFirst + 17);
				indexLast = impl.indexOf("/(end)/");
				impl = data.substring(indexFirst + 19, indexFirst + 17 + indexLast);
				color = StringUtils.tokenizeToStringArray(impl, ",");
				
				for(int i=0; i<seqArray.length; i++) {
					if(i==0) {
						seqArrayWithColor.append("/(start)/,").append(color[0] + ",").append(seqArray[i] + ",");
					} else {
						seqArrayWithColor.append(seqArray[i] + ",");
					}
				}
				seqArrayWithColor.append("/(end)/");
				
				data = data.substring(indexFirst + 17 + indexLast);
			} while(data.indexOf("seq:[/(start)/,") != -1);
		}
			
		
		data = sbpInfo.getSspc();
		indexFirst = data.indexOf("seq:[/(start)/,");
		if(indexFirst != -1) {
			do{
				indexFirst = data.indexOf("seq:[/(start)/,");
				impl = data.substring(indexFirst + 15);
				indexLast = impl.indexOf("/(end)/");
				impl = data.substring(indexFirst + 15, indexFirst + 15 + indexLast);
				seqArray = StringUtils.tokenizeToStringArray(impl, ",");
				
				indexFirst = data.indexOf("color:[/(start)/,");
				impl = data.substring(indexFirst + 17);
				indexLast = impl.indexOf("/(end)/");
				impl = data.substring(indexFirst + 19, indexFirst + 17 + indexLast);
				color = StringUtils.tokenizeToStringArray(impl, ",");
				
				for(int i=0; i<seqArray.length; i++) {
					if(i==0) {
						seqArrayWithColor.append("/(start)/,").append(color[0] + ",").append(seqArray[i] + ",");
					} else {
						seqArrayWithColor.append(seqArray[i] + ",");
					}
				}
				seqArrayWithColor.append("/(end)/");
				
				data = data.substring(indexFirst + 17 + indexLast);
			} while(data.indexOf("seq:[/(start)/,") != -1);
		}
		
		data = sbpInfo.getSsp();
		indexFirst = data.indexOf("seq:[/(start)/,");
		if(indexFirst != -1) {
			do{
				indexFirst = data.indexOf("seq:[/(start)/,");
				impl = data.substring(indexFirst + 15);
				indexLast = impl.indexOf("/(end)/");
				impl = data.substring(indexFirst + 15, indexFirst + 15 + indexLast);
				seqArray = StringUtils.tokenizeToStringArray(impl, ",");
				
				indexFirst = data.indexOf("color:[/(start)/,");
				impl = data.substring(indexFirst + 17);
				indexLast = impl.indexOf("/(end)/");
				impl = data.substring(indexFirst + 19, indexFirst + 17 + indexLast);
				color = StringUtils.tokenizeToStringArray(impl, ",");
				
				for(int i=0; i<seqArray.length; i++) {
					if(i==0) {
						seqArrayWithColor.append("/(start)/,").append(color[0] + ",").append(seqArray[i] + ",");
					} else {
						seqArrayWithColor.append(seqArray[i] + ",");
					}
				}
				seqArrayWithColor.append("/(end)/");
				
				data = data.substring(indexFirst + 17 + indexLast);
			} while(data.indexOf("seq:[/(start)/,") != -1);
		}
		
		data = sbpInfo.getSsc();
		indexFirst = data.indexOf("seq:[/(start)/,");
		if(indexFirst != -1) {
			do{
				indexFirst = data.indexOf("seq:[/(start)/,");
				impl = data.substring(indexFirst + 15);
				indexLast = impl.indexOf("/(end)/");
				impl = data.substring(indexFirst + 15, indexFirst + 15 + indexLast);
				seqArray = StringUtils.tokenizeToStringArray(impl, ",");
				
				indexFirst = data.indexOf("color:[/(start)/,");
				impl = data.substring(indexFirst + 17);
				indexLast = impl.indexOf("/(end)/");
				impl = data.substring(indexFirst + 19, indexFirst + 17 + indexLast);
				color = StringUtils.tokenizeToStringArray(impl, ",");
				
				for(int i=0; i<seqArray.length; i++) {
					if(i==0) {
						seqArrayWithColor.append("/(start)/,").append(color[0] + ",").append(seqArray[i] + ",");
					} else {
						seqArrayWithColor.append(seqArray[i] + ",");
					}
				}
				seqArrayWithColor.append("/(end)/");
				
				data = data.substring(indexFirst + 17 + indexLast);
			} while(data.indexOf("seq:[/(start)/,") != -1);
		}
		
		data = sbpInfo.getSscc();
		indexFirst = data.indexOf("seq:[/(start)/,");
		if(indexFirst != -1) {
			do{
				indexFirst = data.indexOf("seq:[/(start)/,");
				impl = data.substring(indexFirst + 15);
				indexLast = impl.indexOf("/(end)/");
				impl = data.substring(indexFirst + 15, indexFirst + 15 + indexLast);
				seqArray = StringUtils.tokenizeToStringArray(impl, ",");
				
				indexFirst = data.indexOf("color:[/(start)/,");
				impl = data.substring(indexFirst + 17);
				indexLast = impl.indexOf("/(end)/");
				impl = data.substring(indexFirst + 19, indexFirst + 17 + indexLast);
				color = StringUtils.tokenizeToStringArray(impl, ",");
				
				for(int i=0; i<seqArray.length; i++) {
					if(i==0) {
						seqArrayWithColor.append("/(start)/,").append(color[0] + ",").append(seqArray[i] + ",");
					} else {
						seqArrayWithColor.append(seqArray[i] + ",");
					}
				}
				seqArrayWithColor.append("/(end)/");
				
				data = data.substring(indexFirst + 17 + indexLast);
			} while(data.indexOf("seq:[/(start)/,") != -1);
		}
		
		return seqArrayWithColor.toString();
	}
	
	/* 모두보기시, 서비스컨셉명/색깔/서비스컨셉종류 로 나타내주기 위하나 데이터 생성 */
	public String convertForPSS(SBPService sbpInfo) {
		StringBuffer serviceConceptWithColor = new StringBuffer();
		String[] color;
		
		data = sbpInfo.getSspp();
		indexFirst = data.indexOf("||{");
		if(indexFirst != -1) {
			do {
				indexFirst = data.indexOf("itemName:");
				impl = data.substring(indexFirst);
				indexLast = impl.indexOf(",");
				impl = data.substring(indexFirst + 9, indexFirst + indexLast);
				serviceConceptWithColor.append(impl).append("/");
				
				indexFirst = data.indexOf("title:");
				impl = data.substring(indexFirst);
				indexLast = impl.indexOf(",");
				impl = data.substring(indexFirst + 6, indexFirst + indexLast);
				serviceConceptWithColor.append(impl);
				
				indexFirst = data.indexOf("color:[/(start)/,");
				impl = data.substring(indexFirst + 17);
				indexLast = impl.indexOf("/(end)/");
				impl = data.substring(indexFirst + 19, indexFirst + 17 + indexLast);
				color = StringUtils.tokenizeToStringArray(impl, ",");
				serviceConceptWithColor.append("/").append(color[0]);
				data = data.substring(indexFirst + indexLast + 26);
				
				serviceConceptWithColor.append(",");
			} while(data.indexOf("||{") != -1);
		}
		
		data = sbpInfo.getSspc();
		indexFirst = data.indexOf("||{");
		if(indexFirst != -1) {
			do {
				indexFirst = data.indexOf("itemName:");
				impl = data.substring(indexFirst);
				indexLast = impl.indexOf(",");
				impl = data.substring(indexFirst + 9, indexFirst + indexLast);
				serviceConceptWithColor.append(impl).append("/");
				
				indexFirst = data.indexOf("title:");
				impl = data.substring(indexFirst);
				indexLast = impl.indexOf(",");
				impl = data.substring(indexFirst + 6, indexFirst + indexLast);
				serviceConceptWithColor.append(impl);

				indexFirst = data.indexOf("color:[/(start)/,");
				impl = data.substring(indexFirst + 17);
				indexLast = impl.indexOf("/(end)/");
				impl = data.substring(indexFirst + 19, indexFirst + 17 + indexLast);
				color = StringUtils.tokenizeToStringArray(impl, ",");
				serviceConceptWithColor.append("/").append(color[0]);
				data = data.substring(indexFirst + indexLast + 26);
				
				serviceConceptWithColor.append(",");
			} while(data.indexOf("||{") != -1);
		}
		
		data = sbpInfo.getSsp();
		indexFirst = data.indexOf("||{");
		if(indexFirst != -1) {
			do {
				indexFirst = data.indexOf("itemName:");
				impl = data.substring(indexFirst);
				indexLast = impl.indexOf(",");
				impl = data.substring(indexFirst + 9, indexFirst + indexLast);
				serviceConceptWithColor.append(impl).append("/");
				
				indexFirst = data.indexOf("title:");
				impl = data.substring(indexFirst);
				indexLast = impl.indexOf(",");
				impl = data.substring(indexFirst + 6, indexFirst + indexLast);
				serviceConceptWithColor.append(impl);

				indexFirst = data.indexOf("color:[/(start)/,");
				impl = data.substring(indexFirst + 17);
				indexLast = impl.indexOf("/(end)/");
				impl = data.substring(indexFirst + 19, indexFirst + 17 + indexLast);
				color = StringUtils.tokenizeToStringArray(impl, ",");
				serviceConceptWithColor.append("/").append(color[0]);
				data = data.substring(indexFirst + indexLast + 26);
				
				serviceConceptWithColor.append(",");
			} while(data.indexOf("||{") != -1);
		}
		
		data = sbpInfo.getSscc();
		indexFirst = data.indexOf("||{");
		if(indexFirst != -1) {
			do {
				indexFirst = data.indexOf("itemName:");
				impl = data.substring(indexFirst);
				indexLast = impl.indexOf(",");
				impl = data.substring(indexFirst + 9, indexFirst + indexLast);
				serviceConceptWithColor.append(impl).append("/");
				
				indexFirst = data.indexOf("title:");
				impl = data.substring(indexFirst);
				indexLast = impl.indexOf(",");
				impl = data.substring(indexFirst + 6, indexFirst + indexLast);
				serviceConceptWithColor.append(impl);

				indexFirst = data.indexOf("color:[/(start)/,");
				impl = data.substring(indexFirst + 17);
				indexLast = impl.indexOf("/(end)/");
				impl = data.substring(indexFirst + 19, indexFirst + 17 + indexLast);
				color = StringUtils.tokenizeToStringArray(impl, ",");
				serviceConceptWithColor.append("/").append(color[0]);
				data = data.substring(indexFirst + indexLast + 26);
				
				serviceConceptWithColor.append(",");
			} while(data.indexOf("||{") != -1);
		}
		
		data = sbpInfo.getSsc();
		indexFirst = data.indexOf("||{");
		if(indexFirst != -1) {
			do {
				indexFirst = data.indexOf("itemName:");
				impl = data.substring(indexFirst);
				indexLast = impl.indexOf(",");
				impl = data.substring(indexFirst + 9, indexFirst + indexLast);
				serviceConceptWithColor.append(impl).append("/");
				
				indexFirst = data.indexOf("title:");
				impl = data.substring(indexFirst);
				indexLast = impl.indexOf(",");
				impl = data.substring(indexFirst + 6, indexFirst + indexLast);
				serviceConceptWithColor.append(impl);

				indexFirst = data.indexOf("color:[/(start)/,");
				impl = data.substring(indexFirst + 17);
				indexLast = impl.indexOf("/(end)/");
				impl = data.substring(indexFirst + 19, indexFirst + 17 + indexLast);
				color = StringUtils.tokenizeToStringArray(impl, ",");
				serviceConceptWithColor.append("/").append(color[0]);
				data = data.substring(indexFirst + indexLast + 26);
				
				serviceConceptWithColor.append(",");
			} while(data.indexOf("||{") != -1);
		}
		serviceConceptWithColor.delete(serviceConceptWithColor.length()-1, serviceConceptWithColor.length());
		return serviceConceptWithColor.toString();
	}
	
	public int getSbpId(SBPService sbpInfo) {
		int sbpId;
		if(sbpInfo.getSspp().contains("||{")) {
			data = sbpInfo.getSspp();
		} else if(sbpInfo.getSspc().contains("||{")) {
			data = sbpInfo.getSspc();
		} else if(sbpInfo.getSsp().contains("||{")) {
			data = sbpInfo.getSsp();
		} else if(sbpInfo.getSscc().contains("||{")) {
			data = sbpInfo.getSscc();
		} else if(sbpInfo.getSsc().contains("||{")) {
			data = sbpInfo.getSsc();
		}  else {
			sbpId = -1;
		}
		indexFirst = data.indexOf("sbpId:");
		impl = data.substring(indexFirst);
		indexLast = impl.indexOf(",");
		sbpId = Integer.parseInt(data.substring(indexFirst + 6, indexFirst + indexLast));
		
		return sbpId;
	}
	
	public String getSbpName(SBPService sbpInfo) {
		String sbpName;
		if(sbpInfo.getSspp().contains("||{")) {
			data = sbpInfo.getSspp();
		} else if(sbpInfo.getSspc().contains("||{")) {
			data = sbpInfo.getSspc();
		} else if(sbpInfo.getSsp().contains("||{")) {
			data = sbpInfo.getSsp();
		} else if(sbpInfo.getSscc().contains("||{")) {
			data = sbpInfo.getSscc();
		} else if(sbpInfo.getSsc().contains("||{")) {
			data = sbpInfo.getSsc();
		} else {
			sbpName = null;
		}
		indexFirst = data.indexOf("sbpName:[/(start)/,");
		impl = data.substring(indexFirst + 19);
		indexLast = impl.indexOf("/(end)/");
		sbpName = data.substring(indexFirst + 20, indexFirst + 17 + indexLast);
		
		return sbpName;
	}

}
