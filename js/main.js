var currentVersion;

$(function () {
	$.getJSON('/package.json', function (data) {
		currentVersion = data.version;
		$('h1 small').text(currentVersion);
		setupConnection();
	});
});

function setupConnection () {
	var HOST = 'wss://barfy-server.herokuapp.com',
		ws = new WebSocket(HOST);

	ws.onmessage = function (event) {
		var data = JSON.parse(event.data),
			action = data.action,
			value = data.value,
			element = $('audio#' + value);

		if (action === 'stop') {
			$('audio').each(function(i, v) {
				v.pause();
				v.currentTime = 0;
			})
		}

		if (action === 'announce') {
			$('audio#chime-in')[0].play();
			setTimeout(function () {
				responsiveVoice.speak(value, 'Spanish Latin American Female');
			}, 1900);
		};

		if(element.length) {
			element[0].play();
		}
	};

	ws.onclose = function (event) {
		setupConnection();
	}
}

setInterval(function () {
	$.getJSON('/package.json', function (data) {
		if (data.version !== currentVersion) {
			window.location.reload();
		}
	});
}, 60 * 5 * 1000);