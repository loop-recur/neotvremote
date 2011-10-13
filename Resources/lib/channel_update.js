var ChannelUpdate = (function() {
	var updating = false;
		
	_shouldUpdateChannels = function(channels) {
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
			Channels = channels;
			if(_shouldUpdateChannels(channels)) Views.updateWizard(channels, cb);
		});
	}
	
	return {start: start}
})();
