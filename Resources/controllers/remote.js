Controllers.remote = function() {
	
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
		
	return {displayPlaying : displayPlaying, postToWall : postToWall}
}();
