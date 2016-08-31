/*
Menu.js
Written by Joey Lemberg for Swing Ninja
joeylemberg@gmail.com
yangcanvas.com
copyright Yang Canvas LLC, all rights reserved
May 7, 2014
*/


var Menu = {
	page: "menu",
	main: function(){
		$("#main-menu").hide();
		$("#main-game").show();
		$("#best-score").hide();

				Game.endless = false;
				Game.reset();
		$(".level-button").each(function(){
			if(parseInt($(this).attr("data-index")) > Game.maxLevel){
				$(this).addClass("locked-level");
			}
		});
	},
	play: function(){
		Game.endless = false;
		Game.reset();
		$("#main-menu").hide();
		$("#main-game").show();

		$(".level-button").each(function(){
			if(parseInt($(this).attr("data-index")) > Game.maxLevel){
				$(this).addClass("locked-level");
			}
		});
		//Game.reset();
	},
	endless: function(){
		$("#main-menu").hide();
		$("#best-score").show();
		Game.endless = true;
		Game.reset();

	},
	instructions: function(){
		$("#main-menu").hide();
		$("#instructions-page").show();
	},
	splash: function(){
		$("#splash-img").show();
	},
	hall: function(){
		//navigator.notification.alert("HOF");
	},
	about: function(){
		$("#main-menu").hide();
		$("#about-page").show();
	},
	credits: function(){
		$("#main-menu").hide();
		$("#credits-page").show();
	},
	back: function(){
		$("#main-menu").show();
		$(".menu-page, #swing-again-page").hide();
	},
	swingAgain: function(){
		$("#swing-again-page").hide();
		Game.reset();
	}
};
