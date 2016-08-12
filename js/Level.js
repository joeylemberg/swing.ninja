/*
Level.js
Written by Joey Lemberg for Swing Ninja
joeylemberg@gmail.com
yangcanvas.com
copyright Yang Canvas LLC, all rights reserved
May 7, 2014
*/


var Level = {
	x: 0,
	max:0,
	ceil: [],
	floor: [],
	h: 300,
	dh: 0,
	ddh: 0,
	lastCeil: null,
	lastFloor: null,
	nextCeil: null,
	nextFloor: null,
	spikes: [],
	enemies: [],
	items: [],
	newLevel: function(){
		Level.spikes = [];
		Level.ceil = [];
		Level.items = [];
		Level.fireballs = [];
		Level.lastCeil = [-10,100];
		for(var i = 0; i < 3; i++){
			Level.nextCeil = [i*20,100 + Math.pow(Math.random(),2)*25 + Game.level.height(i*20)];
			Level.ceil.push([Level.lastCeil[0], Level.lastCeil[1], Level.nextCeil[0],  Level.nextCeil[1]]);
			Level.lastCeil = Level.nextCeil;
		}


	/*	Game.ctx.beginPath();
			Game.ctx.fillStyle = "red";
			Game.ctx.fillRect(0,400,800,100);

			Game.ctx.beginPath();
				Game.ctx.fillStyle = "black";
				Game.ctx.fillRect(0,0,800,50);*/

	//	Level.ceil = [50];
	//	Level.floor = [350];
//		while(Level.ceil.length < 800){
	//		Level.ceil.push(Level.ceil[Level.ceil.length-1] - 2 + Math.random()*4);
//		}
//		while(Level.floor.length < 800){
	//		Level.floor.push(Level.floor[Level.floor.length-1] - 2 + Math.random()*4);
//		}
		//	Level.lastCeil
		//	Level.makeCeil();
		 /*|| Level.floor[Level.floor.length-1][0] < 500){
			LevelmakeLevel()
		}*/
	},
	reset: function(){
		this.newLevel();
		this.x = 0;
		this.max = 0;
		this.exitSpike = 0;
		this.exitShowing = 0;
		/*if(Game.level.bg){
			$("#sprites").css("background-color",Game.level.bg);
		}else{
			$("#sprites").css("background-color","");
		}*/
	},
	makeCeil: function(){
		var lastCeil = Level.ceil[Level.ceil.length-1];
	},
	makeLevel: function(){
		// [end_x, end_y, material]
		// material: 0=rock, 1=spikes, 2=lava
		//var lastCeil = [0,100,0];
		//var lastFloor = [0,300,0];



	},
	exitShowing: 0,
	act: function(){

		while(Level.ceil[0][2] < Level.x){
			Level.ceil.shift();
		}

		Level.dh += Level.ddh;
		Level.ddh = Level.ddh - 0.5 + Math.random();

		if(Level.dh > 30){
			Level.dh = 30;
			if(Level.ddh > 0){
				Level.ddh *= -1;
			}
		}

		if(Level.dh < -30){
			Level.dh = -30;
			if(Level.ddh < 0){
				Level.ddh *= -0.5;
			}
		}

		while(Level.ceil[Level.ceil.length-1][0] < Level.x + 850){
			//Level.nextCeil = [Level.ceil[Level.ceil.length-1][2] + 10, 75 + Math.pow(Math.random(),2)*50 + Level.x/100];
		//	if(Level.x < 30000){
				Level.nextCeil = [Level.ceil[Level.ceil.length-1][2] + 20, 75 + 20*Math.random() + Level.dh + Math.max(Level.x,1000)/400 + lev.height];
		//	}else{
		//		Level.nextCeil = [Level.ceil[Level.ceil.length-1][2] + 20, 75 + 20*Math.random() + Level.dh + 3000/400 + (30000-Level.x)/1000];
		//	}

			Level.ceil.push([Level.lastCeil[0], Level.lastCeil[1], Level.nextCeil[0],  Level.nextCeil[1]]);
			Level.lastCeil = Level.nextCeil;
			if(Math.random() < lev.stalagmitesBottom){
				var spikeStart = 	[Level.ceil[Level.ceil.length-1][2] + 10, 480, Level.ceil[Level.ceil.length-1][2] + 20 + 20*Math.random(), 400 - 120*Math.random()];
				Level.spikes.push(spikeStart);
				Level.spikes.push([spikeStart[2], spikeStart[3], spikeStart[2] + 10 + 10*Math.random(), 480]);
			}

			if(Math.random() < lev.stalagmitesTop){
				var spikeStart = 	[Level.ceil[Level.ceil.length-1][2] + 10, 0, Level.ceil[Level.ceil.length-1][2] + 20 + 20*Math.random(), Level.ceil[Level.ceil.length-1][3] + 100*Math.random()];
				Level.spikes.push(spikeStart);
				Level.spikes.push([spikeStart[2], spikeStart[3], spikeStart[2] + 10 + 10*Math.random(), 0]);
			}

			if((!Level.fireballs.length || Level.fireballs[Level.fireballs.length-1].x != Level.x + 800) && Math.random() < 0.2 * lev.fireballs){

					Level.fireballs.push({
						x: Level.x + 800 + 100 * Math.random(),
						y: 400,
						dy: -4 - Math.random()*4,
						r: 8 + 8 * Math.random()
					});

			}
		}

		if(Level.spikes.length > 1 && Level.spikes[1][2] < Level.x){
			Level.spikes.shift();
			Level.spikes.shift();
		}

		while(Level.fireballs.length && Level.fireballs[0].x + Level.fireballs[0].r < Level.x){
			Level.fireballs.shift();
		}

		for(var i = 0; i < Level.fireballs.length; i++){
			Level.fireballs[i].y += Level.fireballs[i].dy;
			//Level.fireballs[i].x += Level.fireballs[i].dx;
			if(Level.fireballs[i].y > 700){
				Level.fireballs[i].y = 700;
				Level.fireballs[i].dy *= -1;
			}else{
				Level.fireballs[i].dy += 0.2;
			}
		}

		if(!Level.exitSpike && Level.ceil[Level.ceil.length-1][2] > Game.level.exitX*10){
			var spikeStart = 	[Level.ceil[Level.ceil.length-1][2] + 510, 480, Level.ceil[Level.ceil.length-1][2] + 550, 0];
			Level.spikes.push(spikeStart);
			Level.spikes.push([spikeStart[2], 0, spikeStart[2] + 25, 480]);
			Level.exitSpike = 1;
		}

		if(Level.x + 800 > Game.level.exitX && !Level.exitShowing){
			Level.exitShowing = 1;
		}
		if(Level.exitShowing){
			Game.level.exitY = Sprite.y;
		}

	},

	setLev: function(){
		lev.height = Game.level.height(Level.x);
		lev.stalagmitesTop = Game.level.stalagmitesTop(Level.x,Game.t/60);
		lev.stalagmitesBottom = Game.level.stalagmitesBottom(Level.x,Game.t/60);
		lev.lava = Game.level.lava(Level.x,Game.t/60);
		lev.wave = Game.level.wave(Level.x,Game.t/60);
		lev.fireballs = Game.level.fireballs(Level.x,Game.t/60);
	},
	exitSpike: 0,

	draw: function(ctx){

		if(Level.exitShowing){
			ctx.beginPath();
			ctx.fillStyle = "#c5c5c5";

			ctx.fillRect(Game.level.exitX*10-25,Game.level.exitY-45,50,90);
			ctx.fillStyle="red";
			ctx.font="bold 18px tahoma";
			ctx.fillText("EXIT", Game.level.exitX*10-22,Game.level.exitY-49);
		}


		ctx.beginPath();
		ctx.fillStyle = "#111111";
		ctx.fillRect(0,0,800,50);

		ctx.beginPath();
		ctx.lineJoin = "round";
		ctx.fillStyle = "#111111";
		ctx.moveTo(Level.ceil[0][0],Level.ceil[0][1]);
		for(var i = 0; i < Level.ceil.length; i++){
			ctx.lineTo(Level.ceil[i][2],Level.ceil[i][3]);
		}
		ctx.lineTo(Level.x + 800,0);
		ctx.lineTo(Level.x,0);
		ctx.closePath();
		ctx.fill();



		for(var i = 0; i < Level.spikes.length; i+=2){
			ctx.beginPath();
			ctx.moveTo(Level.spikes[i][0],Level.spikes[i][1]);
			ctx.lineTo(Level.spikes[i][2],Level.spikes[i][3]);
			ctx.lineTo(Level.spikes[i+1][2],Level.spikes[i+1][3]);
			ctx.closePath();
			ctx.fill();
		}

		ctx.beginPath();
		ctx.fillStyle = "red";
	//	ctx.fillRect(Level.x,400,800,100);
		//ctx.fillStyle = "red";
		//ctx.moveTo()

		ctx.moveTo(Level.x,400 + 10*Math.sin(Level.x/100));
		for(var i = 0; i < 41; i++){
			ctx.lineTo(Level.x + 20*i, 385 + lev.wave*30*Math.sin((Level.x+20*i + Game.t*3)/200) - lev.lava);
		}
		ctx.lineTo(Level.x + 800,480);
		ctx.lineTo(Level.x,480);
		ctx.closePath();
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = "red";

		for(var i = 0; i < Level.fireballs.length; i++){
			ctx.beginPath();
			ctx.arc(Level.fireballs[i].x, Level.fireballs[i].y, Level.fireballs[i].r, 0, Math.PI*2, 1);
			ctx.fill();
		}



		if(Math.abs(Sprite.x - Game.level.exitX*10) < 20 && Math.abs(Sprite.y - Game.level.exitY) < 40){
			if(!Level.exitStatus){
				Level.exitStatus = 1;
			}
		}else if(Level.exitStatus && (Math.abs(Sprite.x - Game.level.exitX*10) > 30 || Math.abs(Sprite.y - Game.level.exitY) > 55)){
			Level.exitStatus = 2;
			Level.exitStatus = 0;
		//	if(Game.state == 8){
				Game.state = 0;
				Game.levelNumber++;
				//window.location = "quick splash"
				if(Game.levelNumber > Game.maxLevel){
					Game.maxLevel++;
					tryToStore("maxLevel", Game.maxLevel);
					$("#level-button-" + Game.levelNumber).removeClass("locked-level");
				}
				Sprite.x = 0;
		//	}
			Grap.state = 0;
			setTimeout(function(){
				Game.reset();
			}, 1000);

		}



		/*if(Level.x == 0){
			$("#level-text").show();
			$("#level-text").html("Welcome ninja!  Amuse me by attempting to escape using nothing but that grappling gun.");
			$("#level-text").css({
				"top":"30%",
				"left":"10%"
			});
		}else{
			$("#level-text").hide();
		}*/

	/*	for(var i = 0; i < Level.items.length; i++){
			ctx.beginPath();
			ctx.fillStyle = "blue";
			ctx.arc(Level.items[i].x,Level.items[i].y, 5, 0, Math.PI*2, 1);
			ctx.fill();
		}*/
	/*	ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.moveTo(0,Level.floor[0]);
		for(var i = 1; i < 800; i++){
			ctx.lineTo(i,Level.floor[i]);
		}
		ctx.lineTo(800,480);
		ctx.lineTo(0,480);
		ctx.closePath();
		ctx.fill();*/
	},
	exitStatus: 0
};
