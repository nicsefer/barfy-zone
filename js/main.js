var currentVersion,
	audios = [];

$(function () {
	$.getJSON('/package.json', function (data) {
		currentVersion = data.version;
		$('header small').text(currentVersion);

		getContents(function (data) {
			preloadAudios(data.audio);
			setupConnection();
		});
	});
});

setInterval(function () {
	$.getJSON('/package.json', function (data) {
		if (data.version !== currentVersion) {
			window.location.reload();
		}
	});
}, 60 * 5 * 1000);

var getContents = function (cb) {
	$.getJSON('/contents.json', cb);
};

var preloadAudios = function (audios) {
	audios.forEach(function (audio) {
		$('body').append('<audio preload="true"><source  src="/assets/audio/' + audio + '.mp3" type="audio/mpeg"></audio>');
	});
};

var setupConnection = function () {
	var HOST = 'wss://barfy-server.herokuapp.com',
		ws = new WebSocket(HOST);

	ws.onopen = function () {
		ws.send(JSON.stringify({
			type: 'handshake',
			content: audios
		}));
	};

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
};