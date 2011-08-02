var Feedback = function() {

	// var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'cricket.wav');
	// var sound = Titanium.Media.createSound({sound:file});
	
	function buttonPress() {
		Titanium.Media.vibrate();
		// sound.play();
	}

	return {buttonPress: buttonPress}
}();
