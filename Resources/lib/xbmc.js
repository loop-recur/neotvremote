var Xbmc = function() {
	var lastPlaying;
	
	var codes = {
		"select" : "7",
		"backspace" : "61704",
		"menu" : "18",
		"left" : "1",
		"right" : "2",
		"up" : "3",
		"down" : "4",
		"back" : "10",
		"shutdown" : "277",
		"play" : "63",
		"pause" : "12",
		"skip_forward" : "14",
		"skip_backward" : "15",
		"forward" : "16",
		"reverse" : "17"
	}
	
	function action(key) {
		return _httpCall("Action", _getCode(key));
	}

	function sendKey(key) {
		return _httpCall("SendKey", _getCode(key));
	}
	
	function currentPlaying(fun) {
		var max = 8;
		
		function _getPlaying(tries) {
			var currentPlaying = _httpCall("getCurrentlyPlaying", "");
			
			currentPlaying(function(){
				try{ _setChannel(this.responseText); } catch(e){};
			});
			
			(tries < max) ? setTimeout(_getPlaying.partial(tries+1), 1000) : fun(false);
		}
		
		function _setChannel(text) {
			var channel = text.match(/Filename:(\w+)/)[1];
			if(channel) tries = max;
			fun(channel);
		}
		
		_getPlaying(0);
	}
	
	function _httpCall(cmd, arg) {
		var command = cmd + "("+arg+")";
		
		return function(success) {
			if(!success) success = function(){};
			Ti.API.info(Benchmarker.run(function(){
				App.http_client.get("/xbmcCmds/xbmcHttp", {"command":command}, {success: success, error: function(e){}});
			}));	
		}
	}
	
	function _getCode(key) {
		return (key.length === 1) ? _getAscii(key) : codes[key];
	}
	
	function _getAscii(key) {
		return key.charCodeAt(0) + 61696;
	}
	
	var Keyboard = function() {
		var old_length = 0;
		
		function type(str) {
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

	return {sendKey : sendKey, action : action, keyboard : Keyboard.type, currentPlaying : currentPlaying}
}();
