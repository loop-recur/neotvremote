Controllers.remote = function() {
	
	function button(name) {
		return function(){
			Feedback.buttonPress();
			setTimeout(Xbmc.action(name),0);
		}
	}
	
	function displayPlaying(label_view, image_view, current_playing_view, playing_text) {
		current_playing_view.visible = playing_text ? true : false;
		label_view.text = playing_text;
		image_view.backgroundImage = Channel.imagePath(playing_text);
	}
	
	function postToWall(label, image_view, callback) {
		FbGraph.wallPost({
			message:_wallPostText(label.text),
			link: "http://www.youtube.com/watch?v=pABgqZ--QN0"
		}, callback);
	}
	
	function _wallPostText(channel) {
		if(channel) {
			return "Playing "+channel+" on my NeoTV Streaming Player.";
		} else {
			return "Playing movies, photos, music on my NeoTV Streaming Player.";
		}
	}
		
	return {displayPlaying : displayPlaying, postToWall : postToWall, button : button}
}();
