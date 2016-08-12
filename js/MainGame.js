var MainGame = [
{
	text:["Level 0","Swinging 101","100m"],
	bg: null,
	exitX: 100,
	exitY: 250,
	height: function(d){		
		return 0;
	},
	stalagmitesTop: function(){
		return 0.02;
	},
	stalagmitesBottom: function(){
		return 0.01;
	},
	enemies: [],
	lava: function(d, t){
		return 0;
	},
	wave: function(){
		return 0.75;
	},
	fireballs: function(d,t){
		return 0;
	},
	ads:[]
},
{
	text:["Level 1","Swinging 101","100m"],
	bg: null,
	exitX: 250,
	exitY: 250,
	height: function(d){		
		return 5;
	},
	stalagmitesTop: function(){
		return 0.01;
	},
	stalagmitesBottom: function(){
		return 0.01;
	},
	enemies: [],
	lava: function(d, t){
		return -10;
	},
	wave: function(){
		return 0.75;
	},
	fireballs: function(d,t){
		return 0;
	},
	ads:[]
},
{
	text:["Level 2","Middle Distance Swinging","500m"],
	bg: null,
	exitX: 500,
	exitY: 200,
	height: function(d){		
		return 15;
	},
	stalagmitesTop: function(){
		return 0.02;
	},
	stalagmitesBottom: function(){
		return 0.02;
	},
	enemies: [],
	lava: function(d, t){
		return -10;
	},
	wave: function(){
		return 1.5;
	},
	fireballs: function(d,t){
		return 0;
	},
	ads:[]
},
{
	text:["Level 3","Need for Speed","500m"],
	bg: null,
	exitX: 500,
	exitY: 200,
	height: function(d){		
		return 15-d/160;
	},
	stalagmitesTop: function(){
		return 0.00;
	},
	stalagmitesBottom: function(){
		return 0.02;
	},
	enemies: [],
	lava: function(d, t){
		return -30+t*t*2.5;
	},
	wave: function(d,t){
		return 1;
	},
	fireballs: function(d,t){
		return 0;
	},
	ads:[]
},
{
	text:["Level 4","Volcanic Activity","150m"],
	bg: null,
	exitX: 150,
	exitY: 200,
	height: function(d){		
		return 10+d/12;
	},
	stalagmitesTop: function(){
		return 0.01;
	},
	stalagmitesBottom: function(){
		return 0.01;
	},
	enemies: [],
	lava: function(d, t){
		return -20+t;
	},
	wave: function(){
		return 1.25;
	},
	fireballs: function(d,t){
		return 0.35;
	},
	ads:[]
},
{
	text:["Level 5","Mixed Bag","500m"],
	bg: null,
	exitX: 500,
	exitY: 300,
	height: function(d){
		if(d > 3000){
			return 20 + (d-3000)/40;
		}		
		return -15+d/200+Math.sin(d/10)*10;
	},
	stalagmitesTop: function(d,t){
		if(d < 2000){
			return 0.2;
		}else{
			return 0;
		}
	},
	stalagmitesBottom: function(d,t){
		if(d < 2000){
			return 0.2;
		}else{
			return 0;
		}
		
	},
	enemies: [],
	lava: function(d,t){
		if(d > 3300){
			return 5 + (d-3300)/50;
		}
		return 5;
	},
	wave: function(){
		return 2.25;
	},
	fireballs: function(d,t){
		if(d > 2100 && d < 3300){
			return 0.5;
		}
	},
	ads:[]
},
{
	text:["Level 6","Do The Wave","600m"],
	bg: "#cdeff2",
	exitX: 600,
	exitY: 300,
	height: function(d){
		return 15;
		if(d < 500){
			return 25;
		}		
		return 50+80*Math.sin((d+25)/80);
	},
	stalagmitesTop: function(d){
		if(d > 100){
			return 0;
		}
		return 0;
	},
	stalagmitesBottom: function(d){
		if(d > 100){
			return 0;
		}
		return 0;
	},
	enemies: [],
	lava: function(d,t){
		return 55;// + t/3;
	},
	wave: function(d,t){
		return Math.min(3, (t*2-1)/5);
	},
	fireballs: function(d,t){
		return 0;
	},
	ads:[]
},
{
	text:["Level 7","1km"],
	bg: "#cdeff2",
	exitX: 1000,
	exitY: 300,
	height: function(d){	1
		return 0;
	},
	stalagmitesTop: function(d){
		if(d < 200){
			return 0;
		}
		return 0.05;
	},
	stalagmitesBottom: function(d){
		return 0.05;
	},
	enemies: [],
	lava: function(d,t){
		return 25;// + t/3;
	},
	wave: function(d,t){
		return 1;//return Math.min(3, (t*2-1)/5);
	},
	fireballs: function(d,t){
		return 0;
	},
	ads:[]
},
{
	text:["Level 8","Suicide Squeeze","200m"],
	bg: "#9fff91",
	exitX: 200,
	exitY: 300,
	height: function(d){	1
		return 20+d/300;//+10*Math.sin((d+25)/80);
	},
	stalagmitesTop: function(d){
		if(d > 100){
			return 0;
		}
		return 0.02;
	},
	stalagmitesBottom: function(d){
		return 0.02;
	},
	enemies: [],
	lava: function(d,t){
		return 15 + t;// + t/3;
	},
	wave: function(d,t){
		return 1;//return Math.min(3, (t*2-1)/5);
	},
	fireballs: function(d,t){
		if(d>960){
			return 2;
		}
		return 0.2;
	},
	ads:[]
},
{
	text:["Level 8","Wobblies","750m"],
	bg: null,
	exitX: 750,
	exitY: 300,
	height: function(d){
		
		return Math.max(5,30 + Math.sin(d/300)*d/100);
	},
	stalagmitesTop: function(d){
		return 0;
	},
	stalagmitesBottom: function(d){
		return 0;
	},
	enemies: [],
	lava: function(d,t){
		return 30;
	},
	wave: function(d,t){
		return Math.cos(t*4)+ Math.sin(d/300);
		
	},
	fireballs: function(d,t){
		return 0;
	},
	ads:[]
},
{
	text:["Level 9","2km"],
	bg: "#cdeff2",
	exitX: 2000,
	exitY: 300,
	height: function(d){	1
		return 0;
	},
	stalagmitesTop: function(d){
		if(d < 200){
			return 0;
		}
		return 0.05;
	},
	stalagmitesBottom: function(d){
		return 0.05;
	},
	enemies: [],
	lava: function(d,t){
		return 25;// + t/3;
	},
	wave: function(d,t){
		return 1;//return Math.min(3, (t*2-1)/5);
	},
	fireballs: function(d,t){
		if(d> 10000){
			return 0.05;
		}
		return 0;
	},
	ads:[]
},
{
	text:["Level 10","Temple of Doom","1km"],
	bg: "#888888",
	exitX: 1000,
	exitY: 300,
	height: function(d){		
		return 0;
	},
	stalagmitesTop: function(d){
		if(d < 5000){
			return 2;
		}
		return 0;
	},
	stalagmitesBottom: function(d){
		if(d > 100){
			return 0;
		}
		return 0;
	},
	enemies: [],
	lava: function(d,t){
		return Math.max(10, t*25 - 250); 
	},
	wave: function(d,t){
		return 0.1*t/2;
	},
	fireballs: function(d,t){
		return 0;
	},
	ads:[]
},
{
	text:["Limbo","50km"],
	bg: "#cdeff2",
	exitX: 2000,
	exitY: 300,
	height: function(d){
		if(d%1000 > 900){
			return 160;
		}else if(d%1000 > 800){
			return 100;
		}else{
			return 10;
		}
	},
	stalagmitesTop: function(d){
		if(d < 200){
			return 0;
		}
		return 0.05;
	},
	stalagmitesBottom: function(d){
		return 0.05;
	},
	enemies: [],
	lava: function(d,t){
		return 25;// + t/3;
	},
	wave: function(d,t){
		return 1;//return Math.min(3, (t*2-1)/5);
	},
	fireballs: function(d,t){
		if(d> 10000){
			return 0.05;
		}
		return 0;
	},
	ads:[]
},
{
	text:["Level 11","10km"],
	bg: "#cdeff2",
	exitX: 10000,
	exitY: 300,
	height: function(d){	1
		return -20;
	},
	stalagmitesTop: function(d){
		if(d < 200){
			return 0;
		}
		return 0.05;
	},
	stalagmitesBottom: function(d){
		return 0.05;
	},
	enemies: [],
	lava: function(d,t){
		return 25;// + t/3;
	},
	wave: function(d,t){
		return 1;//return Math.min(3, (t*2-1)/5);
	},
	fireballs: function(d,t){
		if(d> 10000){
			return 0.05;
		}
		return 0;
	},
	ads:[]
}];

var lev = {};