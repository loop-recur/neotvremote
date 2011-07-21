var Settings = function() {
	var settings;
	
	function save(new_settings) {
		settings = _validate(new_settings);
		var settings_file = _getFile();
		settings_file.write(JSON.stringify(settings));
	}
	
	function credentials() {
		var settings = _getSettings();
		return [settings.username, settings.password].join(":");
	}
	
	function url() {
		var settings = _getSettings();
		return settings ? [settings.host, settings.port].join(":") : "http://192.168.1.3:8080";
	}
	
	function _validate(new_settings) {
		var host = new_settings.host;
		if(host && !host.match(/^http/i)) new_settings.host = "http://"+host;
		return new_settings;
	}
	
	function _load() {
		var settings_file = _getFile();
		
		if(settings_file.exists()) {
			console.log(settings_file);
			return JSON.parse(settings_file.read().toString());
		}
	}
	
	function _getFile() {
		return Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'settings');
	}
	
	function _getSettings() {
		return _setDefaults(settings || _load());
	}
	
	function _setDefaults(settings) {
		var defaults = {username: "xbmc", password: "xbmc", port:8080, host: "http://192.168.1.1"};
		return _copyObject(defaults, (settings || {}));
	}
	
	function _copyObject(ob1, ob2) {
		for (var attr in ob1) {
    	if (ob1.hasOwnProperty(attr) && !ob2[attr]) ob2[attr] = ob1[attr];
    }
		return ob2;
	}
	
	return {save : save, credentials: credentials, url: url}
}();
