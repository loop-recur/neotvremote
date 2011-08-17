describe("Controllers.remoteSpec", function() {	
	
	describe("displayPlaying", function() {
		var current_playing = {}, label = {}, img = {};
		
	  it("toggles current_playing to visible when the playing text is truthy", function() {
			Controllers.remote.displayPlaying(label, img, current_playing, "Netflix");
		  expect(current_playing.visible).toBeTruthy();
		});

		it("toggles current_playing to invisible when the playing text is falsy", function() {
			Controllers.remote.displayPlaying(label, img, current_playing, "");
		  expect(current_playing.visible).toBeFalsy();
		});

		it("sets the image view's channel logo", function() {
			Controllers.remote.displayPlaying(label, img, current_playing, "Netflix");
		  expect(img.backgroundImage).toEqual("images/channels/channel_netflix.png");
		});

		it("sets the label's text to the playing_text", function() {
			Controllers.remote.displayPlaying(label, img, current_playing, "Netflix");
		  expect(label.text).toEqual("Netflix");
		});
	});
	
	describe("postToWall", function() {
	  beforeEach(function() {
			FbGraph = {wallPost : jasmine.createSpy("wallPost")};
	  });
	
		it("posts to wall with text describing the channel and channel's photo", function() {
			Controllers.remote.postToWall({text : "Netflix"});
		  expect(FbGraph.wallPost).toHaveBeenCalledWith("Watching Netflix on my NeoTV Streaming Player.  Now your TV can be a Smart TV. NeoTV streams thousands of movies and TV shows instantly from Netflix, Vudu, YouTube, and more right on your TV.", "http://www.netgear.com/ntv");
		});
	});
	
});
