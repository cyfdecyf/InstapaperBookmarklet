function sendToInstapaper() {
	var instapaper_url = "http://www.instapaper.com/u";
	var newtab_url = "chrome://newtab/";

	chrome.tabs.query({
		active: true, windowId:
		chrome.windows.WINDOW_ID_CURRENT
	},
	function(tabs) {
		active_tab = tabs[0];
		if (active_tab.url === newtab_url) {
			chrome.tabs.update(null, {url: instapaper_url});
		} else {
			chrome.tabs.executeScript(null, {code: localStorage.bookmarklet});
		}
	});
}

function openOptions() {
	var options_url = chrome.extension.getURL("options.html");
	chrome.tabs.create({url: options_url});
}

chrome.browserAction.onClicked.addListener(function(tab) {
	if (localStorage.bookmarklet) {
		sendToInstapaper();
	} else {
		openOptions();
	}
});

// Open options page upon install/update if bookmarklet not set.
chrome.runtime.onInstalled.addListener(function (details) {
	if (!localStorage.bookmarklet) {
		openOptions();
	}
});
