var poison = {
	urls: ["http://swing.ninja", "https://swing.ninja"],
	l: "",
	run: function(){
		var isGood = false;
		this.l = window.location.origin;
		for(var i = 0; i < this.urls.length; i++){
			//console.log(this.l.indexOf(this.urls[i]));
			//console.log(this.l);
			//console.log(this.urls[i]);
			if(this.l.indexOf(this.urls[i]) != -1){
				isGood = true;
			}
		}
		if(!isGood){
			window.location = this.urls[0];
		}
	}
};