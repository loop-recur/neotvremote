Controllers.remote = function() {
	Ti.App.addEventListener("remoteButtonPressed", function(e) {
		compose(Xbmc.action(e.name), Feedback.buttonPress)();
	});
	
	function button(name) {
		return function() {
			Ti.App.fireEvent('remoteButtonPressed', {name : name});
		}
	}
	
	function displayPlaying(label_view, image_view, current_playing_view, playing_text) {
		current_playing_view.visible = playing_text ? true : false;
		label_view.text = playing_text;
		image_view.backgroundImage = Channel.imagePath(playing_text);
	}
	
	function postToWall(label, image_view) {
		FbGraph.wallPost(_wallPostText(label.text), Channel.url(label.text));
	}
	
	function _wallPostText(channel) {
		return "I'm watching "+channel+" on my Netgear NeoTv.";
	}
		
	return {displayPlaying : displayPlaying, postToWall : postToWall, button : button}
}();
