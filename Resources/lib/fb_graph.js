var FbGraph = function() {

	function wallPost(options) {
		_authenticated(function() {
			Titanium.Facebook.requestWithGraphPath('me/feed', options, 'POST', function(e) {});
		});
	}
	
	function _authenticated(fun) {
		var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'facebook.config');

		Titanium.Facebook.loggedIn ? fun() : Titanium.Facebook.authorize();

		var run = false;
		Titanium.Facebook.addEventListener('login', function(e) {
			if(!run) {
				run = true;
				file.write(JSON.stringify(e.data));
				fun();
			}
		});
	}
	
	return {wallPost : wallPost}
}();
