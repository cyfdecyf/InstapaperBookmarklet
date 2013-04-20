var newtabURL = "chrome://newtab/";
var unreadURL = "http://www.instapaper.com/u";

function openUnread(tab) {
	if (tab.url === newtabURL) {
		chrome.tabs.update(tab.id, {url: unreadURL});
	} else {
		chrome.tabs.create({url: unreadURL});
	}
}

function openOptions() {
	var optionsURL = chrome.extension.getURL("options.html");
	chrome.tabs.create({url: optionsURL});
}

function sendToInstapaperCallback(tabs) {
	var activeTab = tabs[0];
	if (isDoubleClick) {
		openUnread(activeTab);
		return;
	}
	// wait some time to see if this is the 1st click in a double click
	// execute the bookmarklet only if this is not a double click
	setTimeout(function() {
		if (isDoubleClick)
			return;
		if (activeTab.url === newtabURL) {
			openUnread(activeTab);
			return;
		}
		chrome.tabs.executeScript(null, {code: localStorage.bookmarklet});
	}, delayTime);
}

function sendToInstapaper() {
	// get active tab
	chrome.tabs.query({
		active: true,
		windowId: chrome.windows.WINDOW_ID_CURRENT
	},
	sendToInstapaperCallback);
}

var lastTime = new Date();
lastTime.setFullYear(1970, 1, 1);
var isDoubleClick = false;
var delayTime = 200;

chrome.browserAction.onClicked.addListener(function(tab) {
	if (!localStorage.bookmarklet) {
		openOptions();
		return;
	}
	var currentTime = new Date().getTime();
	isDoubleClick = (currentTime - lastTime < delayTime) ? true : false;
	lastTime = currentTime;
	sendToInstapaper();
});

// Open options page upon install/update if bookmarklet not set.
chrome.runtime.onInstalled.addListener(function (details) {
	if (!localStorage.bookmarklet) {
		openOptions();
	}
});
