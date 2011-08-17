var Feedback = function() {
	var soundFun = Helpers.Application.isAndroid() ? function(){} : iOSSound;
	
	function iOSSound() {
		Titanium.Media.playClick();
	}

	return {buttonPress: soundFun}
}();
