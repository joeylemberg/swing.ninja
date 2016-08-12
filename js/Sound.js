/*
Sound.js
Written by Joey Lemberg for Swing Ninja
joeylemberg@gmail.com
yangcanvas.com
copyright Yang Canvas LLC, all rights reserved
May 7, 2014
*/


var Sound = {
	music: null,
	gunshot: null,
	isOn: true,
	active: false,
	init: function() {
		//http://opengameart.org/content/a-journey-awaits
		if(isApp){
			Sound.music = new Media("/android_asset/www/A_Journey_Awaits.mp3", null, function(e) {
				setTimeout(Sound.init, 1000);
			});
		}
		window.charm = "-";
	},
	act: function() {
			Sound.music.getCurrentPosition(function(e) {
				if (e < 0 && Game.isActive) {
					Sound.music.seekTo(0);
					Sound.music.play();
				}
			});
	}
};
