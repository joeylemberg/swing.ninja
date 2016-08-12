var util = {
	init: function(){
		$("#right-ad-code, #left-ad-code").html(util.gaCode);
	},
	paypalHtml: '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----"><input id="paypal-clicker" type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"><img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"></form>',
	gaCode: '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><!-- Swing Again --> <ins class="adsbygoogle" style="display:inline-block;width:300px;height:600px" data-ad-client="ca-pub-3730669071531597" data-ad-slot="8912875460"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>'
};

var vibrate = function(){};

if(!isWeb){
	vibrate = function(t){
		navigator.notification.vibrate(t);
	}
}

$(document).ready(function(){

	function whenReady(){

		if(isDesktop){
			Game.w = window.innerWidth;
			Game.h = window.innerHeight;
		}else{
			var side1 = window.innerWidth;
			var side2 = window.innerHeight;

			Game.w = Math.max(side1,side2);
			Game.h = Math.min(side1,side2);
		}

		$("body").prepend('<canvas id="sprites" width="' + Game.w + '" height="' + Game.h + '"></canvas>');


		if(isDesktop && isWeb){
			$("body").append('<audio id="audio"><source src="A_Journey_Awaits.mp3" type="audio/mp3" /></audio>');
			$(document).ready(function(){
				if(window.localStorage.getItem("soundon") === "true"){
					document.getElementById('audio').play();
				}else{
					$("#sound img").attr("src", "img/nosound.png");
				}

			});
		}

		Input.init();
		Game.init();
		API.init();

		$(".menu-button, .swing-again-button, .menu-item").each(function(){

			if(isWeb){

				this.addEventListener(mouseup, function(){
					Menu[$(this).attr("data-action")]();
					$(this).removeClass("pressing");
				}, false);

				this.addEventListener(mousedown, function(){
					$(this).addClass("pressing");
				}, false);

			}else{

				this.addEventListener('touchend', function(){
					Menu[$(this).attr("data-action")]();
					$(this).removeClass("pressing");
				}, false);

				this.addEventListener('touchstart', function(){
					$(this).addClass("pressing");
				}, false);

			}


		});

	}

	if(isWeb){
		//clearInterval(Game.interval);
		//Game.interval = setInterval(Game.loop, 20);
		whenReady();
		Sound.init();
		//clearInterval(Game.interval);
		//Game.interval = setInterval(Game.loop, 20);
		if(typeof requestAnimationFrame == "function"){
			//Game.looper();
			Game.interval = setInterval(Game.loop, 16);
			var drawIt = function(){
				Game.drawThings();
				requestAnimationFrame(drawIt);
			}
			drawIt();
		}else{
			Game.interval = setInterval(Game.loop, 16);
			Game.interval = setInterval(Game.drawThings, 32);
		}

	}else{
		document.addEventListener("deviceready", function(){
			whenReady();
			if(isApp){
				$("swing-ad-box").hide();
			}
			if(typeof requestAnimationFrame == "function"){
				Game.looper();
			}else{
				clearInterval(Game.interval);
				Game.interval = setInterval(Game.loop, 20);
			}
			Sound.init();
			//setTimeout(function(){
			//	$("#main-menu").fadeIn();
			//}, 50);
		}, false);

		document.addEventListener("pause", function(){
			Sound.music.pause();
			Game.isActive = false;
			clearInterval(Game.interval);
			navigator.app.exitApp();
			//$("#in-game-splash").show();
			//document.location = "index.html";
			//Game.isActive = false;
		}, false);
	}

});

function selectText(element) {
    var doc = document;
    var text = doc.getElementById(element);

    if (doc.body.createTextRange) { // ms
        var range = doc.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) { // moz, opera, webkit
        var selection = window.getSelection();
        var range = doc.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
