try{
// 채팅서버의 연결할 url, faye Context, etc...
var serverUrl = "http://localhost:8011";
var swContext = "/faye";
var currentUserId = currentUser.userId;

// 채팅사용자 상태정보 
var userStatus = {
	ONLINE : "online",
	OFFLINE : "offline",
	LEAVED : "leaved"
};

// smartTalk를 이용하여 보내고 받을 메시지들의 Subject 정보들...
var swSubject = {
	SMARTWORKS : "/smartworks",
	COMPANYID : "/" + currentUser.companyId,
	USERID : "/" + currentUser.userId.replace(/\./g, '_'),
	BROADCASTING : "/broadcasting",
	FAYESERVER : "/fayeServer",
	ONLINE : "/online",
	OFFLINE : "/offline",
	CHATREQUEST : "/chatRequest",
	ALL : "/*"
};

// smartTalk를 이용하여 전달하고 받을 메시지의 type 정보들...
var msgType = {
	SYSTEM_RESTART : "RESTART", 	// 시스템 재시동 브로드캐스팀 메시지 
	BROADCASTING : "BCAST", 		// 전체알림을 위한 브로드캐스팀 메시지 
	NOTICE_COUNT : "NCOUNT", 		// 개인적으로 새로운 알림 갯수를 전달하는 메시지 
	CHAT_REQUEST : "CHATREQ", 		// 채팅을 요청하는 메시지 
	JOIN_CHAT : "JOINCHAT", 		// faye서버에서 채팅에 참여하라고 전달하는 메시지 
	JOINED_IN_CHAT : "JOINEDCHAT",	// 채팅참여 요청을 받은 채팅사용자가 채팅에 참여했다는 메시지 
	LEAVE_CHAT : "LEAVECHAT",		// 채팅참여자가 채팅에서 떠났다는 메시지
	CHAT_MESSAGE : "CHATTING",		// 채팅 메시지..
	WRITING_CHAT_MESSAGE : "WRITING",// 채팅 메시지를 쓰고 있다는 메시지...
	CHATTERS_INVITED : "CHTSINVITED",// 채팅 참여자들을 초청했다는 메시지..
	AVAILABLE_CHATTERS : "ACHATTERS",// 채팅 가능한 사용자들을 알려주는 메시지 
	EVENT_ALARM : "EVENTALARM"// 일정 미리알림 메시지 
};

var smartMsgClient = null;

var chatHistory = {

	chatInfos : new Array(),
	
	restore : function(){
		try{
			var chatInfos = $.jStorage.get(currentUserId);
			if(chatInfos) chatHistory.chatInfos = chatInfos;
			var index = $.jStorage.index();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye restore]', null, error);
		}			
	},
	
	updateChatList : function(chatList){
		try{
			if(!chatList) return;
			var newChatInfos = new Array();
			for(var i=0; i<chatList.length; i++){
				var thisChat = chatList[i];
				var newChat = {sender: currentUserId, chatId : thisChat.chatId, chatterInfos : new Array()};
				for(var j=0; j<thisChat.users.length; j++){
					var thisUser = thisChat.users[j];
					newChat.chatterInfos.push({userId : thisUser.userId, longName : thisUser.longName, minPicture : thisUser.minPicture});
				}
				newChatInfos.push(newChat);
			}
			chatHistory.chatInfos = newChatInfos;
			$.jStorage.set(currentUserId, chatHistory.chatInfos);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye updateChatList]', null, error);
		}			
	},

	existInHistory : function(chatId){
		try{
			for(var i=0; i<chatHistory.chatInfos.length; i++)
				if(chatHistory.chatInfos[i].chatId === chatId)
					return true;
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye existInHistory]', null, error);
		}			
		return false;
	},

	getHistories : function(chatId){
		try{
			var histories = null;
			if(chatHistory.existInHistory(chatId)){
				histories = $.jStorage.get(currentUserId + chatId);
				if(!histories) histories = new Array();
			}
			return histories;
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye getHistories]', null, error);
		}			
	},
		
	setHistory : function(chatId, history){
		try{
			var histories = chatHistory.getHistories(chatId);
			if(histories){
				histories.push(history);
				$.jStorage.set(currentUserId+chatId, histories);
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye setHistory]', null, error);
		}			
	},
		
	removeHistories : function(chatId){
		try{
			$.jStorage.deleteKey(currentUserId+chatId);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye removeHistories]', null, error);
		}			
	},
		
	flushHistory : function(){
		try{
			chatHistory.chatInfos = null;
			var chatInfos = $.jStorage(currentUserId);
			if(chatInfos)
				for(var i=0; i<chatInfos.length; i++)
					$.jStorage.deleteKey(currentUserId+chatInfos[i].chatId);
			$.jStorage.deleteKey(currentUserId);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye flushHistory]', null, error);
		}			
	}		
};

var chatManager = {
	//
	// chatList[] : {
	//		chatId,
	//		subscription,
	//		users[] : {
	//			userId,
	//			longName,
	//			minPicture,
	//			status,
	//			onlineSub,
	//			offlineSub,
	//			}
	//		}
	//
	chatList : new Array(),
	updateHistory : function(){
		try{
		chatHistory.updateChatList(chatManager.chatList);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye updateHistory]', null, error);
		}			
	},
	
	chatById : function(chatId) {
		try{
			for ( var i = 0; i < chatManager.chatList.length; i++)
				if (chatManager.chatList[i].chatId === chatId)
					return chatManager.chatList[i];
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye chatById]', null, error);
		}			
		return null;
	},
	removeChat : function(chatId){
		try{
			for(var i=0; i<chatManager.chatList.length; i++){
				if(chatManager.chatList[i].chatId === chatId){
					chatManager.chatList.splice(i,1);
					break;
				}
			}
			chatManager.updateHistory();
			
			chatHistory.removeHistories(chatId);
			return chatManager.chatList;
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye removeChat]', null, error);
		}			
	},	
	removeChatter : function(chatId, chatter){
		try{
			var chat = chatManager.chatById(chatId);
			if(!chat) return;
			var users = chat.users;
			for(var i=0; i<users.length; i++){
				if(users[i].userId === chatter){
					users.splice(i,1);
					break;
				}
			}
			chatManager.updateHistory();
			return users;
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye removeChatter]', null, error);
		}			
	},	
	updateChatStatus : function(userId, status) {
		try{
			var chatListFound = new Array();
			for ( var i = 0; i < chatManager.chatList.length; i++) {
				for ( var j = 0; j < chatManager.chatList[i].users.length; j++) {
					if (chatManager.chatList[i].users[j].userId === userId && chatManager.chatList[i].users[j].status !== status) {
						chatManager.chatList[i].users[j].status = status;
						chatListFound.push(chatManager.chatList[i]);
						continue;
					}
				}
			}
			chatManager.updateHistory();
			return chatListFound;
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye updateChatStatus]', null, error);
		}			
	},
	chatterInfosOnline : function(chatId) {
		try{
			var chat = chatManager.chatById(chatId);
			var chatterInfos = new Array();
			if(!chat) return chatterInfos;
			for ( var i = 0; i < chat.users.length; i++)
				if (chat.users[i].status === userStatus.ONLINE)
					chatterInfos.push({userId : chat.users[i].userId, longName : chat.users[i].longName, status : chat.users[i].status});				
			return chatterInfos;
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye chatterInfosOnline]', null, error);
		}			
	},
	chatterInfos : function(chatId) {
		try{
			var chat = chatManager.chatById(chatId);
			var chatterInfos = new Array();
			if(!chat) return chatterInfos;
			for ( var i = 0; i < chat.users.length; i++)
				chatterInfos.push({userId : chat.users[i].userId, longName : chat.users[i].longName, status : chat.users[i].status});				
			return chatterInfos;
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye chatterInfos]', null, error);
		}			
	},
	chatterInfo : function(chatId, userId) {
		try{
			var chat = chatManager.chatById(chatId);
			if(!chat) return null;
			for ( var i = 0; i < chat.users.length; i++)
				if(chat.users[i].userId === userId)
					return {userId : chat.users[i].userId, longName : chat.users[i].longName, status : chat.users[i].status};
			return null;
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye chatterInfo]', null, error);
		}			
	},
	chatters : function(userId){
		try{
			var chatters = new Array();
			for(var i=0; i<chatManager.chatList.length; i++){
				users = chatManager.chatList[i].users;
				for(var j=0; j<users.length; j++){
					if(users[j].userId === userId)
						chatters.push(users[j]);
				}
			}
			return chatters;
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye chatters]', null, error);
		}			
	},
	
	onlineSub : function(userId){
		try{
			chatters = chatManager.chatters(userId);
			for(var i=0; i<chatters.length; i++){
				if(chatters[i].onlineSub != null) return chatters[i].onlineSub;
			}
			return null;
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye onlineSub]', null, error);
		}			
	},
	
	offlineSub : function(userId){
		try{
			chatters = chatManager.chatters(userId);
			for(var i=0; i<chatters.length; i++){
				if(chatters[i].offlineSub != null) return chatters[i].offlineSub;
			}
			return null;
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye offlineSub]', null, error);
		}			
	},
	
	isSameChat : function(chatterInfos){
		try{
			for(var i=0; i<chatManager.chatList.length; i++){
				var users = chatManager.chatList[i].users;
				if(users.length == chatterInfos.length){
					for(var j=0; j<users.length; j++){
						for(var k=0; k<chatterInfos.length; k++){
							if(users[j].userId === chatterInfos[k].userId)
								break;
						}
						if(k==chatterInfos.length) break;
					}
					if(j==users.length) return true;
				}
			}
			return false;
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye isSameChat]', null, error);
		}			
	},
	
};

var smartTalk = {
	myChannel : function(subject) {
		return swSubject.SMARTWORKS + swSubject.COMPANYID + subject;
	},
	
	restoreChatting : function(chatInfo, histories){
		try{
			smartTalk.startSubOnChatId(chatInfo);
			startChattingWindow(chatInfo);
			var waitForChattingBox = function(){
				//console.log("retries");
				var target = $("#"+chatInfo.chatId);
				if(!isEmpty(target)){
					//console.log('found');
					if(!isEmpty(histories)){
						for(var i=0; i<histories.length; i++){
							receivedMessageOnChatId(histories[i]);			
						}
					}
				}else if(1){
					setTimeout(function(){
						try{
							waitForChattingBox();
						}catch(error){
							smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye restoreChatting setTimeout]', null, error);
						}			
					}, 2000);
				}else{
					//console.log('retries timeout');
				}
			};
			setTimeout(function(){
				try{
					waitForChattingBox();
				}catch(error){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye restoreChatting setTimeout]', null, error);
				}			
			}, 1000);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye restoreChatting]', null, error);
		}			
	},
	
	restoreHistories : function(){
		try{
			chatHistory.restore();
			var chatInfos =	chatHistory.chatInfos;
			if(chatInfos){
				for(var i=0; i<chatInfos.length; i++){
					smartTalk.restoreChatting(chatInfos[i], $.jStorage.get(currentUserId + chatInfos[i].chatId));
				}
			}		
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye restoreHistories]', null, error);
		}			
	},

	restoreHistory : function(chatId){
		try{
			chatHistory.restore();
			var chatInfos =	chatHistory.chatInfos;
			if(chatInfos){
				for(var i=0; i<chatInfos.length; i++){
					if(chatId == chatInfos[i].chatId)
						smartTalk.restoreChatting(chatInfos[i], $.jStorage.get(currentUserId + chatInfos[i].chatId));
				}
			}		
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye restoreHistories]', null, error);
		}			
	},

	init : function() {
		try{
			var fayeContext = serverUrl + swContext;
			var reconnect = function() {
				//console.log("creating Client!!");
				smartMsgClient = new Faye.Client(fayeContext, {
					timeout : 5
				});
				smartTalk.startBcastSub();
				smartTalk.startSubOnMe();
	
				smartMsgClient.bind('transport:down', function() {console.log("connection down!!"); return;});
				smartMsgClient.bind('transport:up', function() {console.log("connection up!!");});
				
				smartTalk.restoreHistories();
				
			};
			reconnect();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye init]', null, error);
		}			
	},

	clearHistory : function(){
		try{
			chatHistory.flushHistory();
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye clearHistory]', null, error);
		}			
	},
	
	subscribe : function(channel, callback) {
		try{
			if (isEmpty(smartMsgClient))
				return;
			var subscription = smartMsgClient.subscribe(channel, callback);
			return subscription;
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye subscribe]', null, error);
		}			
	},

	publish : function(channel, message) {
		try{
			if (isEmpty(smartMsgClient))
				return;
			smartMsgClient.publish(channel, message);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye publish]', null, error);
		}			
	},

	startBcastSub : function() {
		try{
			smartTalk.subscribe(smartTalk.myChannel(swSubject.BROADCASTING), function(message) {
				if (message.msgType === msgType.SYSTEM_RESTART && !isEmpty(message.body)){
					smartPop.systemNotice(message.body, message.msgType);
				}else if (message.msgType === msgType.BROADCASTING && !isEmpty(message.body)){
					smartPop.systemNotice(message.body);
				}else if (message.msgType === msgType.AVAILABLE_CHATTERS && !isEmpty(message.body)){
					if(!isEmpty($('.js_chatter_list_page'))){
						updateAvailableChatters(message.body);
					}
					if(!isEmpty($('.js_system_management_page'))){
						updateLoginUsers(message.body);
					}
				}
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye startBcastSub]', null, error);
		}			
	},

	startSubOnAll : function() {
		try{
			smartTalk.subscribe(smartTalk.myChannel("/**"), function(message) {
				console.log("SubOnAll Message = ", message);
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye startSubOnAll]', null, error);
		}			
	},

	// 현재 사용자 계정으로 Subscribe를 하여, 현재사용자에게만 오는 메시지를 받아서 처리한다.
	startSubOnMe : function() {
		try{
			smartTalk.subscribe(smartTalk.myChannel(swSubject.USERID), function(message) {
				try{
					// 서버에서 받은 메시지가 NOTICE_COUNT이면, 
					// header.jsp에 있는 updateNoticeCount()를 호출하여 알림 숫자들을 업데이트하게 한다.
					if (message.msgType === msgType.NOTICE_COUNT){
						updateNoticeCount(message.body);
						
					// 받은 메시지가 채팅메시지이면 채팅처리를 위해 smartTalk.startSubOnChatId()를 호출한다.
					} else if (message.msgType === msgType.JOIN_CHAT){
						smartTalk.startSubOnChatId(message);
						startChattingWindow(message);
					} else if (message.msgType === msgType.EVENT_ALARM){
						smartPop.eventAlarm(message.body);
					}
				}catch(error){
					smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye startSubOnMe subscribe]', null, error);
				}			
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye startSubOnMe]', null, error);
		}			
	},

	// 현재 시스템을 사용하고있는 모든 사용자에게 동시에 전달하는 메시지를 보낸다.
	publishBcast : function(message, messageType) {
		try{
			if(isEmpty(messageType)) messageType = msgType.BROADCASTING;
			smartTalk.publish(smartTalk.myChannel(swSubject.BROADCASTING), {
				msgType : messageType,
				sender : currentUserId,
				body : message
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye publishBcast]', null, error);
		}			
	},

	publishNoticeCount : function(message) {
		try{
			smartTalk.publish(smartTalk.myChannel(swSubject.USERID), {
				msgType : msgType.NOTICE_COUNT,
				sender : currentUserId,
				body : message
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye publishNoticeCount]', null, error);
		}			
	},

	chattingRequest : function(chatterInfos, chatId) {
		try{
			if(chatManager.isSameChat(chatterInfos)) return;
			if((chatterInfos.length == 2) && (chatterInfos[0].userId === chatterInfos[1].userId)) return;
			smartTalk.publish(swSubject.SMARTWORKS + swSubject.CHATREQUEST + swSubject.FAYESERVER, {
				msgType : msgType.CHAT_REQUEST,
				sender : currentUserId,
				companyId : currentUser.companyId,
				chatId : chatId,
				chatterInfos : chatterInfos
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye chattingRequest]', null, error);
		}			
	},

	dataOnChatId : function(message){
		try{
			var type = message.msgType;
			var chatId = message.chatId;
			var sender = message.sender;
			var chatList = chatManager.updateChatStatus(sender, userStatus.ONLINE);
			for ( var i = 0; i < chatList.length; i++) {
				var chatId = chatList[i].chatId;
				var chatterInfo = chatManager.chatterInfo(chatId, sender);
				if(chatterInfo != null) updateChatterStatus(chatId, chatterInfo, userStatus.ONLINE);
			}
	
			if (type === msgType.JOINED_IN_CHAT) {
	//			if(sender !== currentUser.userId){
	//				var chatterInfo = chatManager.chatterInfo(chatId, sender);
	//				updateChattingBoxTitle(chatId, chatterList);
	//				updateChatterStatus(chatId, chatterInfo, userStatus.ONLINE);
	//			}
			} else if (type === msgType.LEAVE_CHAT) {
				if(sender !== currentUser.userId){
					var chatterInfo = chatManager.chatterInfo(chatId, sender);
					var chatterList = chatManager.removeChatter(chatId, sender);
					updateChatterStatus(chatId, chatterInfo, userStatus.LEAVED);
					updateChattingBoxTitle(chatId, chatterList);
				}
			} else if (type === msgType.WRITING_CHAT_MESSAGE) {
	
			} else if (type === msgType.CHAT_MESSAGE) {
					message['sendDate'] = (new Date());
					receivedMessageOnChatId(message);
					chatHistory.setHistory(chatId, message);
			} else if( type === msgType.CHATTERS_INVITED){
				setTimeout(function(){
					smartTalk.publishWritingStatus(chatId);
				}, 500);
				if(sender !== currentUser.userId){
					var chatterInfos = message.chatterInfos;
					var users = chatManager.chatById(chatId).users;
					for ( var i = 0; i < chatterInfos.length; i++) {
						var chatterInfo = chatterInfos[i];
						if(chatManager.chatterInfo(chatId, chatterInfo.userId)!=null) continue;
						var userInfo = {
								userId : chatterInfo.userId,
								longName : chatterInfo.longName,
								status : userStatus.OFFLINE,
								onlineSub : null,
								offlineSub : null
							};
						users.push(userInfo);
						userInfo.onlineSub = chatManager.onlineSub(chatterInfo.userId);
						if(!userInfo.onlineSub)
							userInfo.onlineSub = smartTalk.subscribe(smartTalk.myChannel("/"
								+ chatterInfo.userId.replace(/\./g, '_')
								+ swSubject.ONLINE), smartTalk.subOnChatterOnline);
						userInfo.offlineSub = chatManager.offlineSub(chatterInfo.userId);
						if(!userInfo.offlineSub)	
							userInfo.offlineSub = smartTalk.subscribe(smartTalk.myChannel("/"
								+ chatterInfo.userId.replace(/\./g, '_')
								+ swSubject.OFFLINE), smartTalk.subOnChatterOffline);
						updateChatterStatus(chatId, chatterInfo, userStatus.OFFLINE);
					}
					updateChattingBoxTitle(chatId, chatterInfos);
				}
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye dataOnChatId]', null, error);
		}			
	},
	
	subOnChatterOnline : function(userId){
		try{
			var chatList = chatManager.updateChatStatus(userId, userStatus.ONLINE);
			for ( var i = 0; i < chatList.length; i++) {
				var chatId = chatList[i].chatId;
				smartTalk.sendJoinChat(chatId, userId,
						chatManager.chatterInfos(chatId));
				var chatterInfo = chatManager.chatterInfo(chatId, userId);
				if(chatterInfo != null){
					updateChatterStatus(chatId, chatterInfo, userStatus.ONLINE);
					smartTalk.publishJoinedChat(chatId);
				}
			}
			//console.log("ONLINE : " + userId);		
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye subOnChatterOnline]', null, error);
		}			
	},
	
	subOnChatterOffline : function(userId){
		try{
			var chatList = chatManager.updateChatStatus(userId, userStatus.OFFLINE);
			for ( var i = 0; i < chatList.length; i++) {
				var chatId = chatList[i].chatId;
				var chatterInfo = chatManager.chatterInfo(chatId, userId);
				if(chatterInfo != null) updateChatterStatus(chatId, chatterInfo, userStatus.OFFLINE);
			}
			//console.log("OFFLINE : " + userId);		
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye subOnChatterOffline]', null, error);
		}			
	},
	
	startSubOnChatId : function(message) {
		try{
			var chat = chatManager.chatById(message.chatId);
			if(chat != null) return;
			
			var users = new Array();
			for(var i=0; i<message.chatterInfos.length; i++){
				var chatterInfo = message.chatterInfos[i];
				users.push({userId: chatterInfo.userId, longName : chatterInfo.longName, 
								minPicture : chatterInfo.minPicture, status : userStatus.OFFLINE, onlineSub : null, offlineSub : null});
			}
			chat = { chatId : message.chatId, subscription : null, users : users};
			chatManager.chatList.push(chat);
	
			chat.subscription = smartTalk.subscribe(smartTalk.myChannel("/" + message.chatId), smartTalk.dataOnChatId); 
			for ( var i = 0; i < users.length; i++) {
				var chatterInfo = users[i];
				if (chatterInfo.userId === currentUser.userId){
					chatterInfo.status = userStatus.ONLINE;
				}else{
					//console.log('chatterInfo=', chatterInfo, ', userId=', chatterInfo.userId);
					chatterInfo.onlineSub = chatManager.onlineSub(chatterInfo.userId);
					if(!chatterInfo.onlineSub)
						chatterInfo.onlineSub = smartTalk.subscribe(smartTalk.myChannel("/"
							+ chatterInfo.userId.replace(/\./g, '_')
							+ swSubject.ONLINE), smartTalk.subOnChatterOnline);
					chatterInfo.offlineSub = chatManager.offlineSub(chatterInfo.userId);
					if(!chatterInfo.offlineSub)	
						chatterInfo.offlineSub = smartTalk.subscribe(smartTalk.myChannel("/"
							+ chatterInfo.userId.replace(/\./g, '_')
							+ swSubject.OFFLINE), smartTalk.subOnChatterOffline);
				}
			}
			smartTalk.publishJoinedChat(message.chatId);
			//console.log(chatManager.chatList);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye startSubOnChatId]', null, error);
		}			
	},

	restartSubOnChatId : function(message) {
		try{
			var chat = chatManager.chatById(message.chatId);
			var senderInfo = message.senderInfo;
			if(chat != null || senderInfo==null) return;
			
			var users = new Array();
			users.push({userId: senderInfo.userId, longName : senderInfo.longName, 
								minPicture : senderInfo.minPicture, status : userStatus.ONLINE, onlineSub : null, offlineSub : null});

			chat = { chatId : message.chatId, subscription : null, users : users};
			chatManager.chatList.push(chat);
	
			chat.subscription = smartTalk.subscribe(smartTalk.myChannel("/" + message.chatId), smartTalk.dataOnChatId); 
			for ( var i = 0; i < users.length; i++) {
				var chatterInfo = users[i];
				if (chatterInfo.userId === currentUser.userId){
					chatterInfo.status = userStatus.ONLINE;
				}else{
					//console.log('chatterInfo=', chatterInfo, ', userId=', chatterInfo.userId);
					chatterInfo.onlineSub = chatManager.onlineSub(chatterInfo.userId);
					if(!chatterInfo.onlineSub)
						chatterInfo.onlineSub = smartTalk.subscribe(smartTalk.myChannel("/"
							+ chatterInfo.userId.replace(/\./g, '_')
							+ swSubject.ONLINE), smartTalk.subOnChatterOnline);
					chatterInfo.offlineSub = chatManager.offlineSub(chatterInfo.userId);
					if(!chatterInfo.offlineSub)	
						chatterInfo.offlineSub = smartTalk.subscribe(smartTalk.myChannel("/"
							+ chatterInfo.userId.replace(/\./g, '_')
							+ swSubject.OFFLINE), smartTalk.subOnChatterOffline);
				}
			}
			smartTalk.publishJoinedChat(message.chatId);
			//console.log(chatManager.chatList);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye restartSubOnChatId]', null, error);
		}			
	},

	stopSubOnChatId : function(chatId) {
		try{
			var chat = chatManager.chatById(chatId);
			var users = chat.users;
			for(var i=0; i<users.length; i++){
				var user = users[i];
				if(user.userId !== currentUserId){
					if(user.onlineSub)
						user.onlineSub.cancel();
					if(user.offlineSub)
						user.offlineSub.cancel();
					user.onlineSub = null;
					user.offlineSub = null;
				}
			}
			smartTalk.publishLeavingChat(chatId);
			if(chat.subscription)
				chat.subscription.cancel();
			chat.subscription = null;
			chatManager.removeChat(chatId);
			//console.log(chatManager.chatList);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye stopSybOnChatId]', null, error);
		}			
	},

	publishChatMessage : function(chatId, message) {
		try{
			var nickNameBase = ($('.js_chatter_list_page').attr('nickNameBase') === 'true');
			smartTalk.publish(smartTalk.myChannel("/" + chatId), {
				msgType : msgType.CHAT_MESSAGE,
				senderInfo : {
					userId : currentUserId,
					minPicture : currentUser.minPicture,
					longName : nickNameBase ? currentUser.nickName : currentUser.longName
				},
				chatId : chatId,
				chatMessage : message
			});
			smartTalk.storeAsyncMessage(chatId, message);
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye publishChatMessage]', null, error);
		}			
	},
	
	storeAsyncMessage : function(chatId, message){
		try{
			var chat = chatManager.chatById(chatId);
			if(isEmpty(chat)) return;
			var users = chat.users;
			var paramsJson = {};
			var chatters = new Array();
			if(!isEmpty(users)){
				for(var i=0; i<users.length; i++){
					if(users[i].userId === currentUser.userId)
						continue;
					chatters.push(users[i].userId);
				}
			}
			var senderInfo = {};
			senderInfo['userId'] = currentUser.userId;
			senderInfo['longName'] = currentUser.longName;
			senderInfo['nickName'] = currentUser.nickName;
			senderInfo['minPicture'] = currentUser.minPicture;
			
			paramsJson['senderId'] = currentUser.userId;
			paramsJson['chatId'] = chatId;
			paramsJson['senderInfo'] = senderInfo;
			paramsJson['sendDate'] = (new Date());
			paramsJson['chatters'] = chatters;
			paramsJson['message'] = message;
			for(var i=0; i<users.length; i++){
				var user = users[i];
				if(user.status != userStatus.OFFLINE) continue;
	
				var receivers = new Array();
				receivers.push(user.userId);
				paramsJson['receivers'] = receivers;
				console.log(JSON.stringify(paramsJson));
				$.ajax({
					url : "create_async_message.sw",
					contentType : 'application/json',
					type : 'POST',
					data : JSON.stringify(paramsJson),
					success : function(data, status, jqXHR) {
					},
					error : function(){
						console.log('ERROR at Async Messag Stored for userId=', user.userId);			
					}
				});
			}
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye storeAsynchMessage]', null, error);
		}			
	},

	publishWritingStatus : function(chatId) {
		try{
			smartTalk.publish(smartTalk.myChannel("/"
					+ chatId), {
				msgType : msgType.WRITING_CHAT_MESSAGE,
				chatId : chatId,
				sender : currentUserId
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye publishWritingStatus]', null, error);
		}			
	},

	publishJoinedChat : function(chatId) {
		setTimeout(function(){
			try{
				smartTalk.publish(smartTalk.myChannel("/"
						+ chatId), {
					msgType : msgType.JOINED_IN_CHAT,
					chatId : chatId,
					sender : currentUserId
				});
			}catch(error){
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye publishJoinedChat]', null, error);
			}			
		}, 500);
	},

	publishChattersInvited : function(chatId, chatterInfos) {
		try{
			smartTalk.publish(smartTalk.myChannel("/"
					+ chatId), {
				msgType : msgType.CHATTERS_INVITED,
				chatId : chatId,
				sender : currentUserId,
				chatterInfos : chatterInfos
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye publishChattesInvited]', null, error);
		}			
	},

	publishLeavingChat : function(chatId) {
		try{
			smartTalk.publish(smartTalk.myChannel("/"
					+ chatId), {
				msgType : msgType.LEAVE_CHAT,
				chatId : chatId,
				sender : currentUserId
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye publishLeavingChat]', null, error);
		}			
	},

	sendJoinChat : function(chatId, user, chatterInfos) {
		try{
			smartTalk.publish(smartTalk.myChannel("/"
					+ user.replace(/\./g, '_')), {
				msgType : msgType.JOIN_CHAT,
				sender : currentUserId,
				chatId : chatId,
				chatterInfos : chatterInfos
			});
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye sendJoinChat]', null, error);
		}			
	},

	addJoinChatters : function(chatId, chatterInfos) {
		try{
			var users = chatManager.chatById(chatId).users;
			var newChatterInfos = new Array();
			for ( var i = 0; i < chatterInfos.length; i++) {
				if(chatManager.chatterInfo(chatId, chatterInfos[i].userId)!=null) continue;
				var chatterInfo = chatterInfos[i];
				newChatterInfos.push(chatterInfo);
				var userInfo = {
						userId : chatterInfo.userId,
						longName : chatterInfo.longName,
						status : userStatus.OFFLINE,
						onlineSub : null,
						offlineSub : null
					};
				users.push(userInfo);
				userInfo.onlineSub = chatManager.onlineSub(chatterInfo.userId);
				if(!userInfo.onlineSub)
					userInfo.onlineSub = smartTalk.subscribe(smartTalk.myChannel("/"
						+ chatterInfo.userId.replace(/\./g, '_')
						+ swSubject.ONLINE), smartTalk.subOnChatterOnline);
				userInfo.offlineSub = chatManager.offlineSub(chatterInfo.userId);
				if(!userInfo.offlineSub)	
					userInfo.offlineSub = smartTalk.subscribe(smartTalk.myChannel("/"
						+ chatterInfo.userId.replace(/\./g, '_')
						+ swSubject.OFFLINE), smartTalk.subOnChatterOffline);
				updateChatterStatus(chatId, chatterInfo, userStatus.OFFLINE);
			}
			var userInfos = new Array();
			for(var i=0; i<users.length; i++){
				userInfos.push({ userId : users[i].userId, longName : users[i].longName, minPicture : users[i].minPicture});
			}
			
			smartTalk.publishChattersInvited(chatId, userInfos);
			
			for(var i=0; i<newChatterInfos.length; i++){
				if(newChatterInfos[i].userId != currentUser.userId)
					smartTalk.sendJoinChat(chatId, newChatterInfos[i].userId, userInfos);
			}
			
			updateChattingBoxTitle(chatId, users);		
		}catch(error){
			smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye addJoinChatters]', null, error);
		}			
	}

};
//모든 화면이 브라우저에 로드되면, smartTalk를 초기화하여 채팅, 알림, 전체알림기능들을 사용할 수 있게 한다.
$(document).ready(function(){
//	$.ajax({
//		url : 'get_server_ip_address.sw',
//		success : function(data, status, jqXHR) {
//			try{
//				serverUrl = "http://" + data + ":8011";
//			 	smartTalk.init();
//			 	console.log('Message Server = ' + serverUrl + " is initialized successfully !!!");
//			}catch(error){
//				smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye get_server_ip_address]', null, error);
//			}			
//		}
//	});
	try{
		serverUrl = "http://" + getServerDomain() + ":8011";
	 	smartTalk.init();
	 	console.log('Message Server = ' + serverUrl + " is initialized successfully !!!");
	}catch(error){
		smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye $(document).ready]', null, error);
	}			
	
	
});
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[sw-faye script]', null, error);
}
