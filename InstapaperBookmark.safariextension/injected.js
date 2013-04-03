// Avoid iframes to execute script.
if (window.top === window) {
	handleMessage = function (event) {
		if (event.name === 'eval') {
			// alert(event.message);
			eval(event.message);
		}
	};
	safari.self.addEventListener("message", handleMessage, false);
}
