var Endless = {
	text:["Endless Mode","just swing","infinity"],
	bg: null,
	exitX: 10000,
	exitY: 250,
	height: function(d){
		return -d / 5000;
	},
	stalagmitesTop: function(d, t){
		if(d < 1000){
			return 0;
		}else if(d < 10000){
			return 0.025;
		}else if(d < 20000){
			return 0.05;
		}else if(d < 40000){
			return 0.1;
		}
		return 0.2;
	},
	stalagmitesBottom: function(d, t){
		if(d < 1000){
			return 0;
		}else if(d < 25000){
			return 0.03;
		}
		return 0.05;
	},
	enemies: [],
	lava: function(d, t){
		return -20 - d / 50000;
	},
	wave: function(d, t){
		return 1 + Math.min(1, d /100000);
	},
	fireballs: function(d,t){
		if(d < 10000){
			return 0;
		}else if (d < 20000){
			return 0.05;
		}else if (d < 40000){
			return 0.01;
		}else if (d < 60000){
			return 0.025;
		}
		return 0.05;
	},
	ads:[]
};