var Channel = function() {
	var baseUrl = "http://looprecur.com/netgear/";
	
	function imagePath(name) {
		return 'images/channels/'+_imageName(name);
	}
				
	function url(name) {
		return baseUrl + _imageName(name);
	}
	
	function _imageName(name) {
		var channel = (name || "").toLowerCase().replace(/\s+/g, "").replace(".", "");
		return 'channel_'+channel+'.png';
	}
	
	return {imagePath : imagePath, url : url}
}();
