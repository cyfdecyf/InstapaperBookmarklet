**InstapaperBookmarklet** is a Chrome and Safari extension to run Instapaper's [read later bookmarklet](http://www.instapaper.com/extras).

If you like to **hide bookmarks bar while want quick access to Instapaper bookmarklet**, this extension is designed for you.

### Why not use other extensions?

In my experience, the bookmarklet works better than other send to Instapaper extensions. (e.g. handles article title better, works on Google Reader.)

### Feature

Add a button in the toolbar,

- Single click: run Instapaper bookmarklet on current page
  - If current page has no URL, open Instapaper [unread page](http://www.instapaper.com/u)
- Double click: open Instapaper unread page in new tab

### Setup

**Chrome**: install from [Chrome Web Store](https://chrome.google.com/webstore/detail/instapaperbookmarklet/pdonlgemdelmcociimallnipoijcfkac), follow the instructions in the options page.

**Safari**:

1. [Download](http://chenyufei.info/p/InstapaperBookmarklet/InstapaperBookmarklet.safariextz) and install
2. Open Instapaper [extras page](http://www.instapaper.com/extras) (make sure you <strong>have logged in</strong>)
3. Right click on the bookmarklet and **copy link address**
4. Paste link address into InstapaperBookmarklet's settings (location: Safari ->Preferences -> Extensions)

### Note

The extension needs to inject the bookmarklet into your open page to execute, that's why it asks for the permission to access your data on all websites.

For Safari: immediately after installation, the button will only work on new open page.

### Credit

I originally developed the Safari extension. The Chrome extension is developed after I switched to Chrome.

The idea of double click to open unread page and the implementation trick comes from Jamie, who provides a [similar extension](https://chrome.google.com/webstore/detail/instapaper/acgdjjilmhiofacmdnmmlndeokamkkcl) for Chrome. But it's not updated since Sept. 2010 and does not work for me. So I created this new one, using Chrome's new event page which should save resource usage.
