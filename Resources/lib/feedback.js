var Feedback = function() {
	var soundFun = Helpers.Application.isAndroid() ? androidSound : iOSSound;
	
	function androidSound() {
		Titanium.Media.createSound({url:url,preload:true,allowBackground:true});
	}
	
	// shouldn't need this
	function iOSSound() {
		Titanium.Media.playClick();
	}

	return {buttonPress: soundFun}
}();
