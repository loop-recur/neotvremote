describe("ChannelSpec", function() {	
	
	it("doesn't blow up on undefined", function() {
	  expect(Channel.imagePath(undefined)).toEqual('images/channels/channel_.png');
	});
	
	it("returns the image path", function() {
	  expect(Channel.imagePath("Net  fli.X")).toEqual('images/channels/channel_netflix.png');
	});

});
