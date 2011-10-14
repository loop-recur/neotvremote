var Channel = function() {
	var downloaded_path = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "channels");
	var has_downloaded = downloaded_path.exists();
	
	function imagePath(name) {
		var base_path = has_downloaded ? downloaded_path.nativePath+"/channels/" : 'images/channels/';
		return base_path+imageName(name);
	}
	
	function imageName(name) {
		var channel = (name || "").toLowerCase().replace(" ", "").replace(" ", "").replace("-", "").replace(".", "");
		return 'channel_'+channel+'.png';
	}
	
	return {imagePath : imagePath, imageName : imageName}
}();
