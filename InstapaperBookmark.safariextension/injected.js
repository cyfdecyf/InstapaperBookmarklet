function handleMessage(event) {
	if (event.name === 'eval') {
		// alert(event.message);
		eval(event.message);
	}
}
safari.self.addEventListener("message", handleMessage, false);
