var Feedback = function() {
	// var soundFun = Helpers.Application.isAndroid() ? androidSound : iOSSound;
	
	// function androidSound() {
	// 	Titanium.Media.createSound({url:'app://path/to/file.mp3',preload:true,allowBackground:true});
	// }
	
	function iOSSound() {
		Titanium.Media.playClick();
	}

	return {buttonPress: iOSSound}
}();
