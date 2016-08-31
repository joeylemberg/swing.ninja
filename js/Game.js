/*
Game.js
Written by Joey Lemberg for Swing Ninja
joeylemberg@gmail.com
yangcanvas.com
copyright Yang Canvas LLC, all rights reserved
May 7, 2014
*/


var Game = {
	state: 0,
	canvas: null,
	ctx: null,
	g: 0.2,
	t: 0,
	interval: null,
	best: 0,
	isActive: true,
	levelNumber: 0,
	maxLevel: 0,
	level: null,
	w: 800,
	h: 480,
	init: function(){

		$("#splash-img").bind("click touchstart", function(){
			$("#splash-img").hide();
		});
		setTimeout(function(){
			$("#splash-img").hide();
		}, 2500);
		Sprite.init();
		Game.canvas = $("#sprites")[0];
		//Ads.init();
		Game.ctx = Game.canvas.getContext("2d");
		Game.ctx.scale(Game.w / 800,Game.h / 480);
		//Game.resize();
		//Game.ctx.translate(0,-50);
		Game.state = 0;
		Game.level = MainGame[Game.levelNumber];
		Level.newLevel();

		Game.maxLevel = window.localStorage.getItem("maxLevel");
		if(!Game.maxLevel){
			Game.maxLevel = 0;
		}else{
			Game.maxLevel = parseInt(Game.maxLevel);
		}

		Game.resize();
		$(window).resize(Game.resize);

		$(function () {
		    $("body").on(mousedown, ".level-button", function (e) {
				if(!$(this).hasClass("locked-level")){
					$(".menu-page").hide();
					Game.levelNumber = parseInt($(this).attr("data-index"));
					Game.level = MainGame[Game.levelNumber];
					Game.reset();
				}

		    });
		});



		if(isMobile){
			$("#sound").hide();
		}



		/* document.addEventListener("backbutton", function(e){
			 Game.isActive = false;
			 Sound.music.pause();
			 e.preventDefault();
		 	navigator.app.exitApp();
		 }, false);*/

		Game.best = window.localStorage.getItem("highscore");
		if(!Game.best){
			Game.best = 0;
		}
		$("#best-score").html("Best: " + Game.best + "m");

		Game.totalRounds = window.localStorage.getItem("totalRounds");
		if(!Game.totalRounds){
			Game.totalRounds = 0;
		}

	/*	document.addEventListener("menubutton", function(){
			Sound.music.pause();
			clearInterval(Game.interval);
		}, false);

		document.addEventListener("backbutton", function(){
			Sound.music.pause();
			clearInterval(Game.interval);
		}, false);*/

		//var theLoop = setTimeout(function(){

		//})
	//	Game.looper();
	},
	dt: 0,
	bufferTime: 0,
	lastTime: 0,
	looper: function(){
		/*setTimeout(function(){
			Game.dt = Date.now()-Game.lastTime;
			if(Game.dt > 90){
				Game.dt = 0;
			}
			Game.bufferTime += Game.dt - 20;
			Game.lastTime = Date.now();
			$("#dt").html(Game.dt);
			Game.loop();
			Game.looper();
		}, 20);*/
			Game.loop();
			requestAnimationFrame(Game.looper);

	},
	reset: function(){
		//gaton
		$("#game-over, #game-over-sub").hide();
		Game.can = $("body").children().first();
		Sprite.landed = true;
		Menu.page = "game";
		Game.state = 0;
		//gatita
		Game.splash = Game.can.next();
		Game.ctx.beginPath();
		Level.exitStatus = 0;
		//Game.ctx.fillStyle = "white";
		//Game.ctx.fillRect(0,0,800,480);
		Game.gaton();
		Sprite.reset();
		Grap.reset();
		Level.reset();
		Game.t = 0;
		if(Game.endless){
			Game.level = Endless;
		}else{
			Game.level = MainGame[Game.levelNumber];
		}

		//document.location = "game.html"
	},
	loop: function(){
	/*	while(Game.bufferTime > 20){
			Game.bufferTime -= 20;
			Game.t++;
			Game.moveThings();
		}*/
		Game.t++;
		Level.setLev();
		Game.moveThings();
		//Game.drawThings();
		if(Sound.music && isApp){
			Sound.act();
		}
		if(isWeb && mousedown == "mousedown"){
			if(document.getElementById('audio').ended){
				document.getElementById('audio').play();
			}
		}
	},
	gaton: function(){
		/*if(Game.splash.attr("src").charAt(11) != "-"){
			$(Sound.gatita).remove();
		}*/
	},
	moveThings: function(){

		Sprite.act();

		Grap.act();
		Level.act();
		Booms.act();
	},
	drawThings: function(){

		Game.ctx.clearRect(0,0,800,480);

		Game.ctx.save();
		if(Sprite.dx > 0 && Sprite.x > Level.max){
			Level.x = Sprite.x-200;
			Level.max = Sprite.x;
		}

		Game.ctx.translate(-Level.x,0);

			Booms.draw(Game.ctx);
		Level.draw(Game.ctx);
		Sprite.draw(Game.ctx);
		Grap.draw(Game.ctx);


		Cover.draw(Game.ctx);

		Game.ctx.restore();


	},
	endRound: function(){
		Game.rounds = Math.round(Game.rounds + 1);
		setTimeout(function(){
				$("#swing-again-page").fadeIn();
		}, 100);

	},
	rounds: 0,
	totalRounds: 0,
	resize: function(){
		//$(Game.resize();
		var pxRatio = window.devicePixelRatio || 1;
		//Sprite.init();
		Game.w = Math.round($("body").width() * pxRatio);
		Game.h = Math.round($("body").height() * pxRatio);
		$(Game.canvas).attr("width", Game.w);
		$(Game.canvas).attr("height", Game.h);
		Game.ctx.scale(Game.w/800, Game.h/480);
		// = $("#sprites")[0];
		//Ads.init();
	//	Game.ctx = Game.canvas.getContext("2d");
	//	Game.ctx.translate(0,-50);)
	}
}

var tryToStore = function(k, v){
	try{
		window.localStorage.setItem(k,v);
	}catch(e){
		console.log(e);
	}
}
