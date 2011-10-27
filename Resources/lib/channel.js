var Channel = function() {
	var downloaded_path = _getDownloadedPath();
	var has_downloaded = downloaded_path.exists();
	
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
		return Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "channels");
	}
	
	return { imagePath : imagePath, imageName : imageName, resetHasDownloaded: resetHasDownloaded }
}();
