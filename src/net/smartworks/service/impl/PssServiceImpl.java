
package net.smartworks.service.impl;
import net.smartworks.service.IPssService;
import net.smartworks.skkupss.manager.IServiceManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PssServiceImpl implements IPssService {

	IServiceManager serviceManager;

	@Autowired
	public void setServiceManager(IServiceManager serviceManager) {
		this.serviceManager = serviceManager;
	}
	@Override
	public String getTest() throws Exception {
		return "this data from PssSerivceImpl!";
	}
}
