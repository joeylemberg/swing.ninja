/*
Grap.js
Written by Joey Lemberg for Swing Ninja
joeylemberg@gmail.com
yangcanvas.com
copyright Yang Canvas LLC, all rights reserved
May 7, 2014
*/


var Grap = {
	state: 0, // 0=idle 1=shooting 2=hooked 3=retracting
	x: 0,
	y: 0,
	k: 0.003, // stiffness per Hooke's law
	dx: 0,
	dy: 0,
	theta: 0,
	r: 0,
	fire: function(){
	//	Sound.gunshot.pause();Sound.gunshot.seekTo(50);Sound.gunshot.play();

				Grap.state = 1;
				Grap.theta = Math.atan2(Input.x - Sprite.x, Input.y - Sprite.y);
				
				Grap.dx = Math.sin(Grap.theta) * 20 + Sprite.dx;
				Grap.dy = Math.cos(Grap.theta) * 20 + Sprite.dy;
				
				Grap.x = Sprite.x;// + Grap.dx*2;
				Grap.y = Sprite.y;// + Grap.dy*2;
				
				var c = collisionDetection([Grap.x,Grap.y,Grap.dx,Grap.dy], Level.ceil);
				if(c){
						Grap.state = 2;
						Grap.x = c[1][0];
						Grap.y = c[1][1];
						Booms.add(Grap.x,Grap.y,30,"#c4c4c4");
						Grap.dx = 0;
						Grap.dy = 0;
						Sprite.landed = false;
					}else{
							Grap.act();
					}
				
	
			
		
		//Grap.x = Input.x;
		//Grap.y = Input.y;
	},
	reset: function(){
		this.state = 0;
	},
	act: function(ctx){
		Grap.theta = Math.atan2(Input.x - Sprite.x, Input.y - Sprite.y);
		
		switch(Grap.state){
			
			case 0:
			
				break;
				
			case 1:
				var dx = Grap.x-Sprite.x;
				var dy = Grap.y-Sprite.y;
				Grap.r = Math.sqrt(dx*dx + dy*dy);
				
				Grap.x += Grap.dx;
				Grap.y += Grap.dy;
				
				//if(Grap.y < Level.ceil[Math.round(Grap.x)]){
					
				for(var i = 0; i < Level.ceil.length; i++){
					
					var c0 = collisionDetection([Grap.x,Grap.y,Grap.dx,Grap.dy], Level.ceil);
					var c1 = collisionDetection([Grap.x,Grap.y,Grap.dx,Grap.dy], Level.spikes);
					var c = null;
					if(c0 && c1){
						if(c0[2] < c1[2]){
							c = c0;
						}else{
							c = c1;
						}
					}else if(c0){
						c = c0;
					}else if(c1){
						c = c1;
					}
					if(c){
							Grap.state = 2;
							Grap.x = c[1][0];
							Grap.y = c[1][1];
							Booms.add(Grap.x,Grap.y,30,"#c4c4c4");
							Grap.dx = 0;
							Grap.dy = 0;
							Sprite.landed = false;
							break;
						}
				}
					
		//		if(Grap.y < 50){
				
		//		}
				
				break;
				
			case 2:
				
				Grap.theta = Math.atan2(Grap.x - Sprite.x, Grap.y - Sprite.y);
				var dx = Grap.x-Sprite.x;
				var dy = Grap.y-Sprite.y;
				Grap.r = Math.sqrt(dx*dx + dy*dy);
				
				Sprite.dx += Math.sin(Grap.theta) * Math.max(100,Grap.r)*Grap.k;
				Sprite.dy += Math.cos(Grap.theta) * Math.max(100,Grap.r)*Grap.k;
				

				
				

				break;
				
			case 3:

				break;
			
			
		}
	},
	draw: function(ctx){
		if(Grap.state > 0){
				ctx.beginPath();
				var w = Math.max(1,4-Grap.r/100);
				/*ctx.lineWidth = w+1;
				ctx.strokeStyle = "#00ffff";
				ctx.moveTo(Sprite.x,Sprite.y);
				ctx.lineTo(Grap.x,Grap.y);
				ctx.stroke();*/
				
				ctx.beginPath();
				ctx.lineWidth = w;
				ctx.strokeStyle = "blue";
				ctx.moveTo(Sprite.x + Sprite.hands[0],Sprite.y + Sprite.hands[1]);
				ctx.lineTo(Grap.x,Grap.y);
				ctx.stroke();
				
				ctx.beginPath();
				ctx.fillStyle = "#c4c4c4";
				ctx.strokeStyle = "black";
				ctx.lineWidth = 1;
				ctx.arc(Grap.x,Grap.y,5,0,Math.PI*2,1);
				ctx.fill();
				ctx.stroke();
		}
	
	}
}