describe("XbmcSpec", function() {	

	it("sends the corresponding key to the http client", function() {
		expect(Xbmc.action('up')).toCallCommand("Action(3)");
		expect(Xbmc.action('down')).toCallCommand("Action(4)");
		expect(Xbmc.action('left')).toCallCommand("Action(1)");
		expect(Xbmc.action('right')).toCallCommand("Action(2)");
	});
	
	it("converts the code to ascii and sends the correct keycode", function() {
	  expect(function(){ Xbmc.keyboard("A") }).toCallCommand("SendKey(61761)");
		expect(function(){ Xbmc.keyboard("b") }).toCallCommand("SendKey(61794)");
	});
	
	it("works with backspace", function() {
		expect(function(){ Xbmc.keyboard(""); }).toCallCommand("SendKey(61704)");
	});
	
	it("checks currently playing", function() {
		expect(function(){ Xbmc.currentPlaying(function(){}); }).toCallCommand("getCurrentlyPlaying()");
	});
	
	it("runs fun when playing changed", function() {
		App.http_client.get = function(a,b,callbacks){ callbacks.responseText = "blah Filename:Netflix blah"; callbacks.success(); }
		fun = jasmine.createSpy("my fun");
		Xbmc.currentPlaying(fun);
		expect(fun).toHaveBeenCalledWith("Netflix");
	});
	
});
