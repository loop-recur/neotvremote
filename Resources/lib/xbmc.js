var Xbmc = function() {
	
	var Keyboard = function() {
		var old_length = 0;
		
		function type(e) {
			var str = e.value;
			var new_length = str ? str.length : 0;
			var val = (old_length > new_length) ? 'backspace' : lastChar(str);
			sendKey(val)();
			old_length = new_length;
		}
		
		function lastChar(str) {
			return str ? str[str.length-1] : 'backspace';
		}
		
		return {type : type}
	}();

	function sendKey(key) {
		var code = (key.length === 1) ? getAscii(key) : codes[key];
		
		return function() {
			App.http_client.get("/xbmcCmds/xbmcHttp", {"command":"SendKey("+code+")"}, {success: function(){}});
		}
	}
	
	function getAscii(key) {
		return key.charCodeAt(0) + 61696;
	}

	var codes = {
		"ok" : "61453",
		"backspace" : "61448",
		"menu" : "247",
		"up" : "270",
		"down" : "271",
		"left" : "272",
		"right" : "273",
		"return" : "275",
		"shutdown" : "277"
	}

	return {sendKey : sendKey, keyboard : Keyboard.type}
}();
