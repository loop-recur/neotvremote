var Feedback = function() {
	var settings;
	var click_sound = Ti.Media.createSound({url:"sounds/click.mp3", preload: true});
	
	function loadSettings() {
		Controllers.feedback.index(function(s) {
			settings = s;
		});
	}
	
	function _click() {
		if(settings.sound) _playClick();
	}
	
	function _vibrate() {
		if(settings.vibrate) Ti.Media.vibrate();
	}
	
	function _playClick() {
		Helpers.Application.isAndroid() ? click_sound.play() : Titanium.Media.playClick();
	}
	
	return {buttonPress: compose(_vibrate, _click), loadSettings: loadSettings}
}();
