/*
Input.js
Written by Joey Lemberg for Swing Ninja
joeylemberg@gmail.com
yangcanvas.com
copyright Yang Canvas LLC, all rights reserved
May 7, 2014
*/


var Input = {
	x: 0,
	y: 0,
	init: function(){
	//	$(document).mousedown(Input.onTap);
	//	$(document).mouseup(Input.onRelease);
	if(isWeb){
		document.addEventListener(mousedown, Input.onTap, false);
		document.addEventListener(mouseup, Input.onRelease, false);
	}else{
		document.addEventListener('touchstart', Input.onTap, false);
		document.addEventListener('touchend', Input.onRelease, false);
	}


	if(isWeb){

		Sound.gatita = "canvas";

		document.getElementById("sound").addEventListener(mousedown, function(){
			if(Sound.isOn){
				Sound.isOn = false;
				$("#sound>img").attr("src", "img/nosound.png");

				tryToStore("soundon",false);
				document.getElementById('audio').pause();
			}else{
				Sound.isOn = true;
				$("#sound>img").attr("src", "img/sound.png");

				tryToStore("soundon",true);
				document.getElementById('audio').play();
			}
		}, false);
	}else{
		document.getElementById("sound").addEventListener('touchstart', function(){
			if(Sound.isOn){
				Sound.isOn = false;
				$("#sound>img").attr("src", "img/nosound.png");

				tryToStore("soundon",false);
				Sound.music.pause();
			}else{
				Sound.isOn = true;
				$("#sound>img").attr("src", "img/sound.png");

				tryToStore("soundon",true);
				Sound.music.play();
			}
		}, false);
	}


	},
	onTap: function(e){


		//alert(e.type + "  isWeb:" + isWeb + "  mousedown:" + mousedown);

		e.preventDefault();

		if(Menu.page == "game"){
			//	Input.x = (e.offsetX || e.pageX - $(e.target).position().left);// + Sprite.x - 100;
			//	Input.y = (e.offsetY || e.pageY - $(e.target).position().top);


				if(isWeb && mousedown == "mousedown"){
					Input.x = e.pageX;// - $(e.target).position().left);// + Sprite.x - 100;
					Input.y = e.pageY;//(e.offsetY || e.pageY - $(e.target).position().top);
				}else{
					Input.x = e.targetTouches[0].pageX;// - $(e.target).position().left);// + Sprite.x - 100;
					Input.y = e.targetTouches[0].pageY;//(e.offsetY || e.pageY - $(e.target).position().top);
				}

				Input.x *= 800/window.innerWidth;

				Input.x += Level.x;

			//
				Input.y *= 480/window.innerHeight;

				if(Game.state == 0){
					Game.state = 1;
				}

				if(Game.state == 1){
					Grap.fire();
				}else if(Game.state == 3){
					Game.reset();
				}
		}



	},
	onRelease: function(e){
		e.preventDefault();
		Grap.state = 0;
		if(Menu.page == "menu"){
			$(".menu-button").removeClass("pressing");
		}
		/*setTimeout(function(){
			Grap.state = 0;
		},30);*/
	}


}
