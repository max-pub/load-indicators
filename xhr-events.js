XHRevents = {
	originalSend: XMLHttpRequest.prototype.send,
	onStart: [],
	onFinish: []
}
XMLHttpRequest.prototype.send = function() {
	for (var i = 0; i < XHRevents.onStart.length; i++)
		XHRevents.onStart[i]();
	this.addEventListener('readystatechange', function(a, b, c) {
		if (this.readyState == 4)
			for (var i = 0; i < XHRevents.onFinish.length; i++)
				XHRevents.onFinish[i]();
	}.bind(this));
	XHRevents.originalSend.apply(this, arguments);
}