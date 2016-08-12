
var Ads = {
	showing: false, 
	init: function(){
		
		document.addEventListener('onBannerReceive',function(data){
		    AdMob.showBanner();
			setTimeout(function(){
				Ads.hideBanner();
			}, 40000);
		});

		setTimeout(function(){
			Ads.showBanner();
		}, 5000);
		
	},
	showBanner: function(){
		AdMob.createBanner({
		    adId: "ca-app-pub-3730669071531597/1314373469",
		    position: AdMob.AD_POSITION.FULL_BANNER,
		    autoShow: false,
			overlap: true
		});
		
	},
	hideBanner: function(){
		AdMob.removeBanner();
		setTimeout(function(){
			Ads.showBanner();
		}, 10000);
	}
}
