/*
Sprite.js
Written by Joey Lemberg for Swing Ninja
joeylemberg@gmail.com
yangcanvas.com
copyright Yang Canvas LLC, all rights reserved
May 7, 2014
*/


var Sprite = {
	landed: true,
	x: 200,
	y: 200,
	dx: 0,
	dy: 0,
	r: 0,
	prevPoints: null,
    runLine: null,
    leftRight: 0,
    frontknee: null,
    backknee: null,
    aimvector: null,
    thigh: 0,
    shin: 0,
    arms: 0,
    torso: 0,
    hips: null,
    shoulders: null,
    backfoot: null,
    frontfoot: null,
    hands: null,
    thighThetaNow: null,
    thighThetaFin: null,
    thighSwing: 0,
    kneeThetaNow: null,
    kneeThetaFin: null,
    runDir: 0,
    state: null,
    leftleg: null,
    rightleg: null,
    legFrame: null,
    hipHeight: null,
	elbows: null,
    counter: 0,
	shoulders: [0,0],
	aimvector:[0,0],
	hands:[0,0],

    init: function() {
	this.landed = true;
        this.runLine = [0, 0, 0, 0, 0, 0];
        this.legFrame = 0;
        this.hipHeight = 11;
        state = 'air';
        this.runDir = 1;
        this.thighThetaNow = [0, 0];
        this.thighThetaFin = [0, 0];
        this.thighSwing = .1;
        this.kneeThetaNow = [0, 0];
        this.kneeThetaFin = [0, 0];
        this.leftRight = 1;
        this.aimvector = [0, 0];
        this.arms = 10.2;
        this.thigh = 7;
        this.shin = 4;
        this.torso = 7;
		this.home = window.location;
        this.leftleg = [0, 0];
        this.rightleg = [0, 0];
		this.elbows = [0,0,0,0];
        this.hands = [1, -9];
        this.shoulders = [3, -8];
        this.backfoot = [ - 9, 3];
        this.frontfoot = [7, 5];
        this.backknee = [ - 2, 13];
        this.frontknee = [ - 2, 13];
        this.hips = [0, 0];
    },
	reset: function(){
		this.x = 200;
		this.y = 200;
		this.dx = 0;
		this.dy = 0;
	},
	act: function(){
		
		
		
		switch(Game.state){
			
			case 0:
				break;
			case 1:
			
			
				
			//	if(Sprite.y > 390 || Sprite.x < Level.x){
				
				var lavaClear =  380 + lev.wave*30*Math.sin((Sprite.x + Game.t*3)/200)-lev.lava - Sprite.y;
			/*if(lavaClear < 10){
				Booms.add(Sprite.x,385+lev.wave*30*Math.sin((Sprite.x + Game.t*3)/200)-lev.lava,8,"red");
			}*/
				
			//	if(Level.fireballs.length){
			//		console.log(Math.abs(Level.fireballs[0].x - Sprite.x));
			//	}
				
			for(var i = 0; i < Level.fireballs.length; i++){
				if(Sprite.x > Level.fireballs[i].x - Level.fireballs[i].r && Sprite.x < Level.fireballs[i].x + Level.fireballs[i].r){
					if(Math.sqrt(Math.pow(Level.fireballs[i].x - Sprite.x, 2) + Math.pow(Level.fireballs[i].y - Sprite.y, 2)) < Level.fireballs[i].r + 2){
						lavaClear = -10;
						Booms.add(Level.fireballs[i].x,Level.fireballs[i].y, Level.fireballs[i].r*10,"#aa2a2a");
						break;
					}
				}
			}	
			
			if(Sprite.x < Level.x - 4 && Sprite.dx<-1){
				Sprite.dx *= -1.2;
				Sprite.x = Level.x - 3;
				if(Sound.isOn){
					vibrate(50);
				}
				Booms.add(Level.x,Sprite.y,50,"rgba(0,0,225,0.5)");
			}
			
			if(lavaClear < 0){
					if(Sound.isOn){
						vibrate(500);
					}
					Booms.add(Sprite.x,Sprite.y,100,"#aa2a2a");
					Game.state = 2;
					Grap.state = 0;
				/*	setTimeout(function(){
						Booms.add(Sprite.x-30 + 60*Math.random(),Sprite.y + 20*Math.random(),75,"#aa2a2a");
					}, 100);
					setTimeout(function(){
						Booms.add(Sprite.x-30 + 60*Math.random(),Sprite.y + 20*Math.random(),50,"#aa2a2a");
					}, 200);
					setTimeout(function(){
						Booms.add(Sprite.x-30 + 60*Math.random(),Sprite.y + 20*Math.random(),25,"#aa2a2a");
					}, 300);*/
					
					if(Math.round(Level.x/10) > Game.best){
						Game.best = Math.round(Level.x/10);
						$("#best-score").html("Best: " + Math.round(Level.x/10) + "m");
						tryToStore("highscore", "" + Game.best);
					}
					
					/*$("#game-over").fadeIn(1000, function(){
						Game.state = 3;
						$("#game-over-sub").fadeIn(1000, function(){
							
						});
					});*/
						Game.endRound();
					
					//clearInterval(Game.interval);
				}else{
					//if(stix == undefined){
					//	stix = [];
					//}
						var c = collisionDetection([Sprite.x,Sprite.y-10,Sprite.dx,Sprite.dy],Level.ceil);
						if(c){
							Sprite.dx *= 0.5;
							Sprite.dy *= -0.5;
							
						/*	var v = 0.5 * Math.sqrt(Math.pow(Sprite.dx,2) + Math.pow(Sprite.dy,2));
							var theta = Math.atan2(-Sprite.dy,-Sprite.dx);
							var wallTheta = Math.atan2(c[0][0]-c[0][1], c[0][2]-c[0][3]);// + Math.PI;
							theta += Math.PI - theta*2;
							//if(Math.sin(theta) < 0){
							//	theta += Math.PI;
							//}
							Sprite.dx = Math.cos(theta)*v;
							Sprite.dy = Math.sin(theta)*v;
								if(Sound.isOn){
									vibrate(100);
								}
							if(Booms.list.length < 5){
									var r = 4 * Math.sqrt(Sprite.dx*Sprite.dx + Sprite.dy*Sprite.dy);
									Booms.add(c[1][0],c[1][1],r,"#c4c4c4");
							}*/
						}else{
							c = collisionDetection([Sprite.x,Sprite.y,Sprite.dx,Sprite.dy],Level.spikes);
							if(c){
								Sprite.dx *= -0.5;
									if(Sound.isOn){
										vibrate(100);
									}
								if(Booms.list.length < 5){
									var r = 4 * Math.sqrt(Sprite.dx*Sprite.dx + Sprite.dy*Sprite.dy);
									Booms.add(c[1][0],c[1][1],r,"#c4c4c4");
								}
							//	Sprite.dy *= ;
							}
						}

						if(!Sprite.landed){
							Sprite.dy += Game.g;
							Sprite.y += Sprite.dy;
							Sprite.x += Sprite.dx;

							Sprite.dx *= 0.99;
							Sprite.dy *= 0.99;
						}
						
				}
			break;
			
			case 2:
			break;
			
			
			
		}
		
		
	
		
		//if(Sprite.y < 100){
		//	if(Sprite.dy < 0){
		//		Sprite.dy *= -1;
		//	}
			
		//}
		
		
	},
    draw: function(ctx) {
	
	if(Game.state < 2){
		var wid = this.x;
		var hei = this.y;
		var state = "air";

    	//crosshair
    	/*ctx.beginPath();
    	ctx.strokeStyle = 'red';
    	ctx.lineWidth = 1;
    	
    	ctx.arc(Input.x+wid,Input.y+hei, 4, 0, Math.PI * 2, true);
    	
    	ctx.stroke();*/
    	
    //	ctx.beginPath();
    //	ctx.moveTo(Input.x+wid,Input.y+hei);
    //	ctx.lineTo(Input.x+wid,Input.y+hei+4);
    //	ctx.stroke();
		
		if(state != 'dead_on_impact'){
		
        this.shoulders[1] = -1 * Math.cos(Math.PI / 2 * this.dx * 0.05) * this.torso;
        this.shoulders[0] = Math.sin(Math.PI / 2 * this.dx * 0.05) * this.torso;

		if(Grap.state >0){
			this.aimvector[0] = Grap.x - this.x;
	        this.aimvector[1] = Grap.y - this.y;
		}else{
			this.aimvector = [(this.aimvector[0]*5 + 0.8162341540439273)/6, (this.aimvector[1]*5 -0.5777212180387652)/6];
			//this.aimvector[0] = Input.x - this.shoulders[0];
	        //this.aimvector[1] = Input.y - this.shoulders[1];
		}
		var hypot = Math.sqrt(this.aimvector[0] * this.aimvector[0] + this.aimvector[1] * this.aimvector[1]);
        this.aimvector[0] /= hypot;
        this.aimvector[1] /= hypot;
        elbows = [this.shoulders[0] + this.aimvector[0] * this.arms * .6,
        this.shoulders[1] + this.aimvector[1] * this.arms * .6];
        this.hands[0] = this.shoulders[0] + this.aimvector[0] * this.arms;
        this.hands[1] = this.shoulders[1] + this.aimvector[1] * this.arms;


        if (state == 'air') {
            this.thighThetaFin = [1.1 * Math.PI, -.1 * Math.PI];
            this.kneeThetaFin = [1.3 * Math.PI, 1.7 * Math.PI];
        }

		if(this.dx > 5){
			this.thighThetaFin[0] += .5 * this.dx;
			this.thighThetaFin[1] += .5* this.dx;
			this.kneeThetaFin[0] -= .1* this.dx;
			this.kneeThetaFin[1] -= .1* this.dx;
		}else if(this.dx > 0){
			this.thighThetaFin[0] += .6;
			this.thighThetaFin[1] += .6;
			this.kneeThetaFin[0] -= .8;
			this.kneeThetaFin[1] -= .8;
		}else if(this.dx < 0){
			this.thighThetaFin[0] -= .6;
			this.thighThetaFin[1] -= .6;
			this.kneeThetaFin[0] += .8;
			this.kneeThetaFin[1] += .8;
		}else{
			//if(Game.state == 0){
				this.thighThetaFin[0] += 0.5;
				this.thighThetaFin[1] -= 0.5;
				this.kneeThetaFin[0] += .3;
				this.kneeThetaFin[1] -= .3;
			//}else{
			//	this.thighThetaFin[0] -= .8;
			//	this.thighThetaFin[1] += .8;
			//	this.kneeThetaFin[0] += 1.1;
			//	this.kneeThetaFin[1] -= 1.1;
			//}
			
		}

		if(this.y > 300){
			this.thighThetaFin[0] -= .8;
			this.thighThetaFin[1] += .8;
			this.kneeThetaFin[0] += 1.1;
			this.kneeThetaFin[1] -= 1.1;
		}

        if (state == 'ground') {
            if (Math.abs(speed) < .2) {
                this.thighThetaFin = [Math.PI + 1, -1];
                this.kneeThetaFin = [1.5 * Math.PI, 1.5 * Math.PI];
            } else {
                if (this.thighThetaFin[0] > Math.PI * 2 - .05 || this.thighThetaFin[0] < Math.PI + .05)
                this.thighSwing *= -1;
                this.thighThetaFin[0] -= speed * this.thighSwing;
                this.thighThetaFin[1] += speed * this.thighSwing;
                if (dx > 0) {
                    this.kneeThetaFin[0] = this.thighThetaFin[0] - Math.PI * .5 - (this.thighThetaFin[0] - (Math.PI * 1.5)) * .9;
                    this.kneeThetaFin[1] = this.thighThetaFin[1] - Math.PI * .5 + (this.thighThetaFin[0] - (Math.PI * 1.5)) * .9;
                } else {
                    this.kneeThetaFin[0] = this.thighThetaFin[0] + Math.PI * .5 - (this.thighThetaFin[0] - (Math.PI * 1.5)) * .9;
                    this.kneeThetaFin[1] = this.thighThetaFin[1] + Math.PI * .5 + (this.thighThetaFin[0] - (Math.PI * 1.5)) * .9;
                }
            }
        }

        for (var i = 0; i < 2; i++) {
            this.thighThetaNow[i] = (this.thighThetaFin[i] + this.thighThetaNow[i] * 4) / 5;
            this.kneeThetaNow[i] = (this.kneeThetaFin[i] + this.kneeThetaNow[i] * 4) / 5;
        }

        //var kneeDist = [Math.cos(this.thighThetaNow[i] + Math.PI/2) * this.thigh, Math.sin(this.thighTheta + Math.PI/2) * this.thigh];
        this.backknee[0] = this.hips[0] + Math.cos(this.thighThetaNow[0]) * this.thigh;
        this.backknee[1] = this.hips[1] - Math.sin(this.thighThetaNow[0]) * this.thigh;
        this.frontknee[0] = this.hips[0] + Math.cos(this.thighThetaNow[1]) * this.thigh;
        this.frontknee[1] = this.hips[1] - Math.sin(this.thighThetaNow[1]) * this.thigh;

        //var footDist = [Math.cos(this.kneeTheta + Math.PI/2) * this.shin, Math.sin(this.kneeTheta + Math.PI/2) * this.shin];
        this.backfoot[0] = this.backknee[0] + Math.cos(this.kneeThetaNow[0]) * this.shin;
        this.backfoot[1] = this.backknee[1] - Math.sin(this.kneeThetaNow[0]) * this.shin;
        this.frontfoot[0] = this.frontknee[0] + Math.cos(this.kneeThetaNow[1]) * this.shin;
        this.frontfoot[1] = this.frontknee[1] - Math.sin(this.kneeThetaNow[1]) * this.shin;
			
	
	}
			    ctx.save();
				
				if(Level.exitStatus){
					ctx.beginPath();
					ctx.moveTo(Game.level.exitX*10-25,Game.level.exitY-45);
					ctx.lineTo(Game.level.exitX*10+25,Game.level.exitY-45);
					ctx.lineTo(Game.level.exitX*10+25,Game.level.exitY+45);
					ctx.lineTo(Game.level.exitX*10-25,Game.level.exitY+45);
					ctx.closePath();
					ctx.clip();
				}
				
		        ctx.translate(wid, hei);
		
				if(state == 'dead_on_impact'){
					bloodPuddle();
					ctx.restore();
					ctx.save();
			        ctx.translate(wid, hei);
					this.hands = [-Math.cos(deathAngle)*this.arms, -Math.sin(deathAngle)*this.arms];
					this.frontfoot = [(this.frontfoot[0]*5-Math.sin(deathAngle)*7)/6, (this.frontfoot[0]*5-Math.cos(deathAngle)*7)/6];
					this.backfoot = [(this.backfoot[0]*5+Math.sin(deathAngle)*12)/6, (this.backfoot[1]+Math.cos(deathAngle)*12)/6];
					this.frontknee = [(this.frontknee[0]*5 - Math.sin(deathAngle)*6)/6, (this.frontknee[1]*5-Math.cos(deathAngle)*6)/6];
					this.backknee = [(this.backknee[0]*5 + Math.sin(deathAngle)*6)/6, (this.backknee[1]*5+Math.cos(deathAngle)*6)/6];
					this.shoulders = [this.shoulders[0]*5/6,this.shoulders[1]*5/6 + 1];
				}
				
				

				var plusThis = 2;
				if(this.dx<0)
					plusThis = -2;
						
				//head
		        ctx.beginPath();
				  //  if(gameStatus[0] == 'exiting'){
					//	ctx.rect(-15-(x-gameStatus[1].x), -25-(y-gameStatus[1].y), 30, 50);
					//	ctx.clip();
				//}
				
		//		ctx.lineCap = 'round';
		
				ctx.beginPath();
				ctx.strokeStyle = "black";
		        ctx.fillStyle = "black";
		ctx.lineJoin = "round";
		        ctx.arc(this.shoulders[0], this.shoulders[1] - 2.5, 2.8, 0, Math.PI * 2, true);
		        ctx.fill();
		
		        ctx.arc(this.shoulders[0] - plusThis, this.shoulders[1] - 4.5, 1.6, 0, Math.PI * 2, true);
		        ctx.fill();

		        ctx.arc(this.hips[0] - plusThis/3, this.hips[1] - 2, 1.5, 0, Math.PI * 2, true);
		        ctx.fill();
		


		            //hand
		            ctx.lineWidth = 1.3;
		            ctx.beginPath();
		            ctx.arc(this.hands[0], this.hands[1], 1.8, 0, Math.PI * 2.5, true);
		            ctx.closePath();
		            ctx.fill();

		            ctx.beginPath()
		            ctx.moveTo(this.hands[0] + this.aimvector[0] * 4, this.hands[1] + this.aimvector[1] * 4);
		            ctx.lineTo(this.hands[0], this.hands[1]);
		            if (this.hands[0] < 0)
		            ctx.lineTo(this.hands[0] + this.aimvector[1] * 2, this.hands[1] - this.aimvector[0] * 2);
		            else
		            ctx.lineTo(this.hands[0] - this.aimvector[1] * 2, this.hands[1] + this.aimvector[0] * 2);
		            ctx.stroke();

		            //arms
		            ctx.beginPath();
		            ctx.lineWidth = 1.8;
		
					var bows = [0,0];
					if (this.aimvector[0] < 0){
						bows = [elbows[0] - this.aimvector[1]*2, elbows[1] - this.aimvector[0]*2];
					} else{
						bows = [elbows[0] + this.aimvector[1]*2, elbows[1] + this.aimvector[0]*2];
					}
				
		            ctx.moveTo(this.shoulders[0]/2, this.shoulders[1]/2);
					ctx.bezierCurveTo(this.shoulders[0], this.shoulders[1]-3,bows[0] - this.aimvector[1] * 4, bows[1] - this.aimvector[0] * 4,this.hands[0],this.hands[1]);
					ctx.stroke();
					
		            ctx.moveTo(this.shoulders[0]/2, this.shoulders[1]/2);
					ctx.bezierCurveTo(this.shoulders[0], this.shoulders[1]-3,bows[0] + this.aimvector[1] * 4, bows[1] + this.aimvector[0] * 4,this.hands[0],this.hands[1]);
					ctx.stroke();


        //backthigh
	//	
		ctx.lineJoin = 'round';
       
 	ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(this.hips[0], this.hips[1]-2);
        ctx.lineTo(this.backknee[0], this.backknee[1]);
		ctx.lineTo(this.backfoot[0], this.backfoot[1]);
        ctx.stroke();

        //frontthigh
        //ctx.beginPath();
        ctx.moveTo(this.hips[0], this.hips[1]-2);
        ctx.lineTo(this.frontknee[0], this.frontknee[1]);
		ctx.lineTo(this.frontfoot[0], this.frontfoot[1]);
        ctx.stroke();

//	ctx.lineJoin = 'miter';

        //torso
ctx.beginPath();
		ctx.lineWidth = 1.5;
 		ctx.moveTo(this.frontknee[0], this.frontknee[1]);
        ctx.quadraticCurveTo(this.hips[0], this.hips[1]-4,this.shoulders[0], this.shoulders[1],this.shoulders[0]);
        ctx.stroke();
 		ctx.moveTo(this.backknee[0], this.backknee[1]);
        ctx.quadraticCurveTo(this.hips[0], this.hips[1]-4,this.shoulders[0], this.shoulders[1],this.shoulders[0]);
        ctx.stroke();
		
		
	//	ctx.lineJoin = 'round';
		
	//	if(state == 'air'){
			plusThis *= Math.abs(this.dx)/8;
			if(plusThis > 2)
				plusThis = 2;
			else if(plusThis < -2){
				plusThis = -2;
			}
//		}
		
		ctx.beginPath();
		ctx.lineWidth = 2;
 		ctx.moveTo(this.frontfoot[0], this.frontfoot[1]);
        ctx.bezierCurveTo(this.frontknee[0], this.frontknee[1]-1,this.hips[0], this.hips[1]-4, this.backknee[0], this.backknee[1]-1, this.backfoot[0], this.backfoot[1]-5);
		ctx.lineTo(this.backfoot[0] + plusThis, this.backfoot[1]+2);
		ctx.lineTo(this.backfoot[0], this.backfoot[1]+1);
		
        ctx.bezierCurveTo(this.backknee[0], this.backknee[1]-1,this.hips[0], this.hips[1]-4,this.frontknee[0], this.frontknee[1]-1, this.frontfoot[0], this.frontfoot[1]-5);
		ctx.lineTo(this.frontfoot[0] + plusThis, this.frontfoot[1]+2);
		ctx.lineTo(this.frontfoot[0], this.frontfoot[1]+1);
		
	
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		
	//	ctx.lineJoin = 'miter';
		
			ctx.beginPath();
			ctx.lineWidth = 3;
	 		ctx.moveTo(this.hips[0], this.hips[1]-3);
	        ctx.quadraticCurveTo(this.shoulders[0], this.shoulders[1],this.elbows[0],this.elbows[1]);
			ctx.lineTo(this.shoulders[0], this.shoulders[1]);

			ctx.stroke();

			ctx.beginPath();
			ctx.strokeStyle = 'black';
			ctx.fillStyle = 'black';
	 		ctx.moveTo(this.frontknee[0], this.frontknee[1]);
	        ctx.bezierCurveTo(this.hips[0]-3,this.hips[1]+2,this.hips[0]+3,this.hips[1]+2,this.backknee[0], this.backknee[1]);
			ctx.lineTo(this.hips[0], this.hips[1]-3);
			ctx.lineTo(this.frontknee[0], this.frontknee[1]);

			ctx.fill();

        ctx.lineJoin = 'miter';
		
		

		if(Sprite.landed){
			ctx.beginPath();
			ctx.lineWidth = 5;
			ctx.strokeStyle = "black";
			ctx.moveTo(-15,14);
			ctx.lineTo(15,14);
			ctx.stroke();
		}

		
/*		if(NinjaSprite.runLine[6] == 'lava'){
			clipShape();
			ctx.beginPath();
			ctx.arc(0,0, 100, 0, 2*Math.PI, false);
			ctx.closePath();
			ctx.fillStyle = "rgba(255, 102, 0, " +  quickCount + ")";
			ctx.fill();
			if(quickCount < .99)
			{
				quickCount += .002;
			x-=Math.cos(deathAngle)*.01;
			y-=Math.sin(deathAngle)*.01;
		}
			
		}*/
			
			ctx.restore();	
		//	Grap.draw();
	}

		
		

    }
};