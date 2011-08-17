Controllers.remote = function() {
	
	function button(name) {
		return compose(Xbmc.action(name), Feedback.buttonPress);
	}
	
	function displayPlaying(label_view, image_view, current_playing_view, playing_text) {
		current_playing_view.visible = playing_text ? true : false;
		label_view.text = playing_text;
		image_view.backgroundImage = Channel.imagePath(playing_text);
	}
	
	function postToWall(label, image_view) {
		FbGraph.wallPost(_wallPostText(label.text), "http://www.netgear.com/ntv");
	}
	
	function _wallPostText(channel) {
		return "Watching "+channel+" on my NeoTV Streaming Player.  Now your TV can be a Smart TV. NeoTV streams thousands of movies and TV shows instantly from Netflix, Vudu, YouTube, and more right on your TV.";
	}
		
	return {displayPlaying : displayPlaying, postToWall : postToWall, button : button}
}();
