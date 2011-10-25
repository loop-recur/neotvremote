var ChannelUpdate = (function() {
	var updating = false;
	
	_setGlobalChannels = function(channels) {
		Channels = channels;
	}
	
	_getCacheFile = function() {
		return Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'channel_cache');
	}
	
	_cache = function(channels) {
		var file = _getCacheFile();
		file.write(JSON.stringify(channels));
	}
	
	_loadCache = function() {		
		var data = _getCacheFile().read();
		var channels = JSON.parse(data.toString());
		if(channels) _setGlobalChannels(channels);
		return channels;
	}
	
	getCurrentChannels = function(cb) {
		var channels = null;
		try{ channels = _loadCache(); } catch(e) { log(e); }
		if(!channels) channels = Channels;
		cb(channels);
	}
		
	_shouldUpdateChannels = function(channels) {
		if(Channels.join("") == channels.join("")) return false;
		var allImages = ChannelDownload.getChannelImages();
		var allNames = map(Channel.imageName, channels);
		var _missingImage = function(n) { return allImages.indexOf(n) < 0; }
		var missing = filter(_missingImage, allNames);
		
		return missing.length > 0;
	}
	
	function start() {
		if(updating) return;
		updating = true;
		getChannelsAndUpdate(function(){ updating = false; });
	}
	
	function getChannelsAndUpdate(cb) {
		Xbmc.getAllChannels(function(channels) {
			if(!channels) return;
			_cache(channels);
			if(_shouldUpdateChannels(channels)) {
				_setGlobalChannels(channels);
				Views.updateWizard(channels, cb);
			}			  
		});
	}
	
	return {start: start, getCurrentChannels: getCurrentChannels}
})();
