var Feedback = function() {
	var settings;
	var click_sound = Ti.Media.createSound({url:"sounds/click.mp3", preload: true});
	
	function loadSettings() {
		Controllers.feedback.index(function(s) {
			settings = s;
		});
	}
	
	function buttonPress() {
		if(settings.sound == "true") _click();
		if(settings.vibrate == "true") _vibrate();
	}
	
	function _click() {
		_playClick();
	}
	
	function _vibrate() {
		Ti.Media.vibrate();
	}
	
	function _playClick() {
		Helpers.Application.isAndroid() ? click_sound.play() : Titanium.Media.playClick();
	}
	
	return {buttonPress: buttonPress, loadSettings: loadSettings}
}();
