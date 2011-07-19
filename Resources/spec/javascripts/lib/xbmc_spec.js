describe("XbmcSpec", function() {	
	// var Xbmc = require('Xbmc');

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
		expect(function(){ Xbmc.keyboard(""); }).toCallCommand("SendKey(61448)");
	});
	
});
