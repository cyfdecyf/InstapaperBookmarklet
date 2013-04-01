var bookmarklet = decodeBookmarklet(safari.extension.settings.bookmarklet);

function settingsChanged(event) {
	// Triggered when the focus leaves from the input element. Note, this will
	// not trigger when switching from the preference window to another window.
	if ((event.key === "bookmarklet") && (event.newValue !== event.oldValue)) {
		bookmarklet = decodeBookmarklet(event.newValue);
		// alert(bookmarklet);
	}
}
safari.extension.settings.addEventListener("change", settingsChanged, false);

function sendToInstapaper() {
	var activeTab = safari.application.activeBrowserWindow.activeTab;
	if (activeTab.url === undefined) {
		openURL("http://www.instapaper.com/u/");
	} else {
		activeTab.page.dispatchMessage("eval", bookmarklet);
	}
}

function performCommand(event) {
	// alert(bookmarklet);
	if (bookmarklet === "") {
		explain();
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
		"I'm leading you to get Instapaper's bookmarklet.");
	openURL("http://www.instapaper.com/extras/");
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
