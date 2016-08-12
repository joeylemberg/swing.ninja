/*
Booms.js
Written by Joey Lemberg for Swing Ninja
joeylemberg@gmail.com
yangcanvas.com
copyright Yang Canvas LLC, all rights reserved
May 7, 2014
*/

var Booms = {
	list: [],
	add: function(x,y,r,color){
		Booms.list.push({
			x:x,
			y:y,
			r:r,
			t:0,
			c:color
		});
	},
	draw: function(ctx){
		var b;
		for(var i = 0; i < Booms.list.length; i++){
			b = Booms.list[i];
			ctx.beginPath();
			ctx.globalAlpha = (100-b.t)/100;
			ctx.arc(b.x,b.y,b.r*b.t/100,0,Math.PI*2,1);
			ctx.fillStyle = b.c;
			ctx.closePath();
			ctx.fill();
		}
		ctx.globalAlpha = 1;
	},
	act: function(){
		for(var i = 0; i < Booms.list.length; i++){
			if(Booms.list[i].t > 99){
				Booms.list.splice(i,1);
			}else{
				Booms.list[i].t+=5;
			}
		}
	}
	
};
