
package net.smartworks.service.impl;
import net.smartworks.service.IDocFileService;
import net.smartworks.skkupss.manager.IDocFileManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DocFileServiceImpl implements IDocFileService {

	IDocFileManager docFileManager;

	@Autowired
	public void setDocFileManager(IDocFileManager docFileManager) {
		this.docFileManager = docFileManager;
	}
	@Override
	public String getTest() throws Exception {
		return "this data from PssSerivceImpl!";
	}
}
