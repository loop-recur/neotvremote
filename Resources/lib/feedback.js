var Feedback = function() {
	var settings;
	
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
		if(!Helpers.Application.isAndroid()) Titanium.Media.playClick();
	}
	
	return {buttonPress: compose(_vibrate, _click), loadSettings: loadSettings}
}();
