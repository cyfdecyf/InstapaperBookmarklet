var newtabURL = "chrome://newtab/";
var unreadURL = "http://www.instapaper.com/u";

function callOnActiveTab(callback) {
	chrome.tabs.query({
		active: true,
		windowId: chrome.windows.WINDOW_ID_CURRENT
	},
	function (tabs) {
		var activeTab = tabs[0];
		callback(activeTab);
	});
}

// If active tab has not page opened, open url in active tab.
// Othersize, open in new tab.
function openURL(url) {
	callOnActiveTab(function (tab) {
		if (tab.url === newtabURL) {
			chrome.tabs.update(tab.id, {"url": url});
		} else {
			chrome.tabs.create({"url": url});
		}
	});
}

function openOptions() {
	var optionsURL = chrome.extension.getURL("options.html");
	chrome.tabs.create({url: optionsURL});
}

function sendToInstapaper() {
	callOnActiveTab(function (tab) {
		// Wait some time to see if this is the 1st click in a double click.
		// Execute the bookmarklet only if this is not a double click.
		setTimeout(function() {
			if (isDoubleClick) {
				return;
			}
			if (tab.url === newtabURL) {
				openURL(unreadURL);
				return;
			}
			chrome.tabs.executeScript(tab.id, {code: localStorage.bookmarklet});
		}, delayTime);
	});
}

var lastTime = new Date(1970, 1, 1);
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
	if (isDoubleClick) {
		openURL(unreadURL);
		return;
	}
	sendToInstapaper();
});

// Open options page upon install/update if bookmarklet not set.
chrome.runtime.onInstalled.addListener(function (details) {
	if (!localStorage.bookmarklet) {
		openOptions();
	}
});
