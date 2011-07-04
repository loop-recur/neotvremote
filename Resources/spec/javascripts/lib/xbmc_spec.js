describe("XbmcSpec", function() {	

	it("sends the corresponding key to the http client", function() {
		expect(Xbmc.sendKey('up')).toCallCommand("SendKey(270)");
	});

});
