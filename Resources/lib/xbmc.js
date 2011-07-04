var Xbmc = function() {

	function sendKey(key) {
		var code = codes[key];
		return function() {
			App.http_client.get("/xbmcCmds/xbmcHttp", {"command":"SendKey("+code+")"}, {success: function(){}});
		}
	}

	var codes = {
		"up" : "270",
		"down" : "271",
		"left" : "272",
		"right" : "273",
		"return" : "275",
		"ok" : "276",
		"shutdown" : "277"
	}

	return {sendKey : sendKey}
}();
