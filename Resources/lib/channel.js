var Channel = function() {
	var downloaded_path = _getDownloadedPath();
	var has_downloaded = downloaded_path.exists();
	log(has_downloaded);
	
	function resetHasDownloaded() {
		has_downloaded = downloaded_path.exists();
	}
	
	function imagePath(name) {
		var base_path = has_downloaded ? downloaded_path.nativePath+"/" : 'images/channels/';
		return base_path+imageName(name);
	}
	
	function imageName(name) {
		var channel = (name || "").toLowerCase().replace(" ", "").replace(" ", "").replace("-", "").replace(".", "");
		return 'channel_'+channel+'.png';
	}
	
	function _getDownloadedPath() {
		if(Helpers.Application.isAndroid()) {
			var name = (Ti.Platform.displayCaps.density == "medium") ? "android_med" : "android_high";
			return Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, name);
		} else {
			return Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "channels");
		}
		
	}
	
	return { imagePath : imagePath, imageName : imageName, resetHasDownloaded: resetHasDownloaded }
}();
