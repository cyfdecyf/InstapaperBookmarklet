function save() {
	var bookmarklet = document.getElementById("bookmarklet");
	localStorage.bookmarklet = bookmarklet.value;

	// Update status to let user know options were saved.
	var status = document.getElementById("status");
	status.innerHTML = "Bookmarklet Saved.";
	setTimeout(function() {
		status.innerHTML = "";
	}, 750);
}
function restore() {
	var bookmarklet = document.getElementById("bookmarklet");
	if (localStorage.bookmarklet) {
		bookmarklet.value = localStorage.bookmarklet;
	}
}
document.querySelector('#save').addEventListener('click', save);
document.addEventListener('DOMContentLoaded', restore);
