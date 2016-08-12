/*
Cover.js
Written by Joey Lemberg for Swing Ninja
joeylemberg@gmail.com
yangcanvas.com
copyright Yang Canvas LLC, all rights reserved
May 7, 2014
*/


var Cover = {
	ctx: null,
	x: 0,
	init: function(){
		if(!isDesktop){
			$("#sound").hide();
		}
	},
	draw: function(ctx){
		if(Game.endless){
			$("#score").html(Math.round(Level.x/10) + "m");
		}else{
			$("#score").html(Math.round(Game.level.exitX - Level.x/10) + "m");
		}
		//gaton
		if(Sprite.home.origin.indexOf($("homesite").text()) == -1 && Sprite.home.pathname.indexOf($("author").text()) == -1){
			Level.x *= -2;
		}
	}
};