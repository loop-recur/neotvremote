var Hosts = function() {
	var defaults = {name: "Default", username: "xbmc", password: "xbmc", port:8080, host: ""};
	
	function findOrCreate(new_host, cb) {
		if(!cb) cb = function(){};
		App.db.find('hosts', _validate(new_host), function(xs){
			when((xs.length < 1), compose(cb, save, _mergeDefaults.curry(new_host)));
		});
	}
	
	function save(new_host) {
		var host = _validate(new_host);
		setCurrent(host);
		return host;
	}
	
	function destroy(id) {
		App.db.destroy('hosts', {id : id});
		_firstSetting(function(){});
	}
	
	function setCurrent(hosts) {
		var _setCurrent = function(s) { s.current = 0 ; App.db.save('hosts', s); }
		App.db.find('hosts', {}, map.partial(_setCurrent));
		hosts.current = 1;
		App.db.save('hosts', hosts);
		App.setHosts(_url(hosts), _credentials(hosts));
	}
	
	function load(fun) {
		App.db.find('hosts', {current : 1}, _setSetting.partial(fun, _firstSetting.curry(fun)));
	}
	
	function _mergeDefaults(new_hosts) {
		return {username: "xbmc", password: "xbmc", port : new_hosts.port, host : new_hosts.host, name: new_hosts.name}
	}
	
	function _firstSetting(fun) {
		App.db.find('hosts', {}, _setSetting.partial(fun, fun.curry(_url(defaults), _credentials(defaults))));
	}
	
	function _setSetting(fun, elsfun, all_current_hosts) {
		if(all_current_hosts.length > 0) {
			var hosts = all_current_hosts[0];
			setCurrent(hosts);
			fun(_url(hosts), _credentials(hosts));
		} else {
			elsfun();
		}
	}
	
	function _credentials(hosts) {
		return [hosts.username, hosts.password].join(":");
	}
	
	function _url(hosts) {
		return [hosts.host, hosts.port].join(":");
	}
	
	function _validate(new_hosts) {
		var host = new_hosts.host;
		if(host && !host.match(/^http/i)) new_hosts.host = "http://"+host;
		return new_hosts;
	}
	
	return {findOrCreate : findOrCreate, save: save, destroy: destroy, setCurrent: setCurrent, load: load}
}();
