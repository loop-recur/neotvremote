var Settings = function() {
	var defaults = {username: "xbmc", password: "xbmc", port:8080, host: "http://192.168.1.1"};
	
	function findOrCreate(new_settings) {
		var saveSettings = compose(save, _mergeDefaults.curry(new_settings));
		var _saveWhen = compose(when.flip().partial(saveSettings), '.length < 1'.lambda());
		var _findOrSave = App.db.find.partial('settings').flip().partial(_saveWhen);
		compose(_findOrSave, _validate)(new_settings);
	}
	
	function save(new_settings) {
		var settings = _validate(new_settings);
		App.db.save('settings', settings);
	}
	
	function destroy(id) {
		App.db.destroy('settings', {id : id});
	}
	
	function setCurrent(settings) {
		var _setCurrent = function(s) { s.current = 0 ; App.db.save('settings', s); }
		App.db.find('settings', {}, map.partial(_setCurrent));
		settings.current = 1;
		App.db.save('settings', settings);
	}
	
	function load(fun) {
		App.db.find('settings', {current : 1}, _setSetting.partial(fun, _firstSetting.curry(fun)));
	}
	
	function _mergeDefaults(new_settings) {
		return {username: "xbmc", password: "xbmc", port : new_settings.port, host : new_settings.host}
	}
	
	function _firstSetting(fun) {
		App.db.find('settings', {}, _setSetting.partial(fun, fun.curry(_url(defaults), _credentials(defaults))));
	}
	
	function _setSetting(fun, elsfun, all_current_settings) {
		if(all_current_settings.length > 0) {
			var settings = all_current_settings[0];
			fun(_url(settings), _credentials(settings));
		} else {
			elsfun();
		}
	}
	
	function _credentials(settings) {
		return [settings.username, settings.password].join(":");
	}
	
	function _url(settings) {
		return [settings.host, settings.port].join(":");
	}
	
	function _validate(new_settings) {
		var host = new_settings.host;
		if(host && !host.match(/^http/i)) new_settings.host = "http://"+host;
		return new_settings;
	}
	
	return {findOrCreate : findOrCreate, save: save, destroy: destroy, setCurrent: setCurrent, load: load}
}();
