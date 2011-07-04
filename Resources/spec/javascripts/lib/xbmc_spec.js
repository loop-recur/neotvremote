describe("XbmcSpec", function() {	

	it("sends the corresponding key to the http client", function() {
		expect(Xbmc.sendKey('up')).toCallCommand("SendKey(270)");
		expect(Xbmc.sendKey('down')).toCallCommand("SendKey(271)");
	});
	
	it("converts the code to ascii and sends the correct keycode", function() {
	  expect(function(){ Xbmc.keyboard({value: "A"}) }).toCallCommand("SendKey(61761)");
		expect(function(){ Xbmc.keyboard({value: "Ab"}) }).toCallCommand("SendKey(61794)");
	});
	
	it("works with backspace", function() {
		Xbmc.keyboard({value: "A"});
		Xbmc.keyboard({value: "Ab"});
		expect(function(){ Xbmc.keyboard({value: "A"}); }).toCallCommand("SendKey(61448)");
		expect(function(){ Xbmc.keyboard({value: ""}); }).toCallCommand("SendKey(61448)");
		expect(function(){ Xbmc.keyboard({value: ""}); }).toCallCommand("SendKey(61448)"); // send backspace by default to remove previous input
	});
	
});
