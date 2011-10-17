var ChannelDownload = (function(){	
	var base_url = "http://looprecur.com";
	
	function start(cb, progress_bar) {
		Ti.API.info("\n\n\n========STARTING CHANNEL DOWNLOAD=======\n\n\n");
		Helpers.Application.isAndroid() ? _getAndroid(cb, progress_bar) : _getIphone(cb, progress_bar);
	}
	
	function getChannelImages() {
		var dir = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'images', 'channels');
		var dirItems = dir.getDirectoryListing();
		var results = [];
		
		Ti.API.info("\n\n\n========GETTING ALL: =======\n\n\n");
		for ( var i=0; i<dirItems.length; i++ ) { results.push(dirItems[i].toString()); }
		return results;
	}
	
	function _getDownloadedChannels(file_proxy) {
		var dirItems = file_proxy.getDirectoryListing();
		var result = [];
		
		Ti.API.info("\n\n\n========DOWNLOADED: "+dirItems.length+" items=======\n\n\n");
		for ( var i=0; i<dirItems.length; i++ ) {
			result.push(file_proxy.nativePath + Ti.Filesystem.separator + dirItems[i].toString());
		}
		return result;
	}
	
	function _getAndroid(cb, progress_bar) {
		var zipfile = require("com.websiteburo.androzip");
		var url = (Ti.Platform.displayCaps.density == "medium") ? "/android_med.zip" : "/android_high.zip"
		
		var _writeZip = function() {
			var zipPath = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'channels.zip');	  
			var extractPath = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "channels");
			
			if(extractPath.exists()) extractPath.deleteDirectory();
			
			extractPath.createDirectory();
			
		  zipPath.write(this.responseData);
			zipfile.extract(zipPath.nativePath, extractPath.nativePath);
			cb(_getDownloadedChannels(extractPath));
		}
		
		var oldUrl = App.base_url;
		App.base_url = base_url;
		Ti.API.info("\n\n\n========FROM "+App.base_url+url+"=======\n\n\n");
		App.http_client.get(url, {success: _writeZip, error: function(e){Ti.API.info(e)}, progress_bar: progress_bar});
		App.base_url = oldUrl;
	}
	
	function _getIphone(cb, progress_bar) {
		var zipfile = require("zipfile");
		var url = "/channels.zip";
		
		var _writeZip = function() {
			var f = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'channels.zip');
		  f.write(this.responseData);

			var dataDir = Ti.Filesystem.resourcesDirectory.slice(0,Ti.Filesystem.resourcesDirectory.length - 1).replace('file://localhost','').replace(/%20/g,'\\ ');
			var extract_path = Ti.Filesystem.getFile(dataDir+"/images/channels");
			zipfile.extract(dataDir+"/channels.zip", dataDir+"/images/channels");
			cb(_getDownloadedChannels(extract_path));
		}
		
		var oldUrl = App.base_url;
		App.base_url = base_url;
		Ti.API.info("\n\n\n========FROM "+App.base_url+url+"=======\n\n\n");
		App.http_client.get(url, {success: _writeZip, error: function(e){Ti.API.info(e)}, progress_bar: progress_bar});
		App.base_url = oldUrl;
	}
	
	
	return {start: start, getChannelImages : getChannelImages}
})();
