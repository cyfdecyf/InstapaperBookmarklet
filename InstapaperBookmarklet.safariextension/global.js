var bookmarklet = decodeBookmarklet(safari.extension.settings.bookmarklet);
var unreadURL = "http://www.instapaper.com/u/";
var extrasURL = "http://www.instapaper.com/extras/";

function settingsChanged(event) {
	// Triggered when the focus leaves from the input element. Note, this will
	// not trigger when switching from the preference window to another window.
	if ((event.key === "bookmarklet") &&
		(event.newValue !== undefined) && (event.newValue !== event.oldValue)) {
		bookmarklet = decodeBookmarklet(event.newValue);
		// alert(bookmarklet);
	}
}
safari.extension.settings.addEventListener("change", settingsChanged, false);

function sendToInstapaper() {
	var activeTab = safari.application.activeBrowserWindow.activeTab;
	// wait some time to see if this is the 1st click in a double click
	// execute the bookmarklet only if this is not a double click
	setTimeout(function() {
		if (isDoubleClick)
			return;
		// NOTE: file:// URL is also undefined here
		if (activeTab.url === undefined) {
			openURL(unreadURL);
			return;
		}
		activeTab.page.dispatchMessage("eval", bookmarklet);
	}, delayTime);
}

var lastTime = new Date(1970, 1, 1);
var isDoubleClick = false;
var delayTime = 200;

function performCommand(event) {
	// alert(bookmarklet);
	// alert(typeof bookmarklet);
	// It's weird that Safari will set undefined bookmarklet as string "undefined".
	if (bookmarklet === undefined || bookmarklet === "undefined" || bookmarklet === "") {
		explain();
		return;
	}
	var currentTime = new Date().getTime();
	isDoubleClick = (currentTime - lastTime < delayTime) ? true : false;
	lastTime = currentTime;
	if (isDoubleClick) {
		openURL(unreadURL);
		return;
	}
    if (event.command === "send-to-instapaper") {
		sendToInstapaper();
    }
}
safari.application.addEventListener("command", performCommand, false);

// utility functions

function decodeBookmarklet(bl) {
	return decodeURI(bl);
}

function explain() {
	alert("Please set your Instapaper bookmarklet first in extension settings. " +
		"I will open Instapaper's bookmarklet page for you.");
	openURL(extrasURL);
}

// If active tab has no url, open url in active tab; otherwise, open in new tab.
function openURL(url) {
	var activeTab = safari.application.activeBrowserWindow.activeTab;
	if (activeTab.url === undefined) {
		activeTab.url = url;
	} else {
		safari.application.activeBrowserWindow.openTab().url = url;
	}
}
