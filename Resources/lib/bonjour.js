var Bonjour = function() {
	
	function discoverNetworks(callback) {
		Helpers.Application.isAndroid() ? _discoverAndroid(callback) : _discoverIphone(callback);
	}

	function _discoverAndroid(callback) {
		var jmdns = require('com.looprecur.jmdns');

		jmdns.discover(function(name, port, host) {
			callback({name : _fixName(name), port : port, host : host});
		});
	}

	function _discoverIphone(callback) {
		var serviceBrowser = Titanium.Network.createBonjourBrowser({serviceType:'_xbmc-web._tcp', domain:'local.'});
		serviceBrowser.addEventListener('updatedServices', _addServices);
		serviceBrowser.search();

		function _addServices(e) {
			map(_addService, e['services']);
		}

		function _addService(service) {
			service.addEventListener('updatedHosts', function(e) {
				callback({name : _fixName(service.name), port : e.port, host : e.host})
			});
			service.resolve();
		}
	}
	
	function _fixName(n) {
		return n.replace(/\.?XBMC.*/i, "");
	}
	
	return { discoverNetworks : discoverNetworks}
}();
