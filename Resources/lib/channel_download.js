var ChannelDownload = (function(){	
	var base_url = "http://looprecur.com";
	
	function start(cb, progress_bar) {
		Helpers.Application.isAndroid() ? _getAndroid(cb, progress_bar) : _getIphone(cb, progress_bar);
	}
	
	function getChannelImages() {
		var dir = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'images', 'channels');
		var dirItems = dir.getDirectoryListing();
		var results = [];
		
		for ( var i=0; i<dirItems.length; i++ ) { results.push(dirItems[i].toString()); }
		return results;
	}
	
	function _getDownloadedChannels(file_proxy) {
		var dirItems = file_proxy.getDirectoryListing();
		var result = [];
		
		for ( var i=0; i<dirItems.length; i++ ) {
			result.push(file_proxy.nativePath + Ti.Filesystem.separator + dirItems[i].toString());
		}
		
		return result;
	}
	
	function _getAndroid(cb, progress_bar) {
		var zipfile = require("com.websiteburo.androzip");
		var name = (Ti.Platform.displayCaps.density == "medium") ? "android_med" : "android_high";
		var url = "/"+name+".zip";
		
		var _writeZip = function() {
			var zipPath = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'channels.zip');	  
			var extractPath = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "channels");
			var finalPath = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, name);
			
			if(!extractPath.exists()) extractPath.createDirectory();
						
		  zipPath.write(this.responseData);
			zipfile.extract(zipPath.nativePath, extractPath.nativePath);
			cb(_getDownloadedChannels(extractPath));
		}
		
		var oldUrl = App.base_url;
		App.base_url = base_url;
		App.http_client.get(url, {success: _writeZip, error: function(e){Ti.API.info(e)}, progress_bar: progress_bar});
		App.base_url = oldUrl;
	}
	
	function _getIphone(cb, progress_bar) {
		var zipfile = require("zipfile");
		var url = "/iphone.zip";
		
		var _writeZip = function() {
			var zipPath = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'channels.zip');
			var appDirPath = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory);
			var extractPath = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "channels");
			var fixedAppDirPath = appDirPath.nativePath.slice(0,appDirPath.nativePath.length - 1).replace('file://localhost','').replace(/%20/g,' ');
			
			if(!extractPath.exists()) extractPath.createDirectory();

		  zipPath.write(this.responseData);

			zipfile.extract(fixedAppDirPath+"/channels.zip", fixedAppDirPath+"/channels");
			cb(_getDownloadedChannels(extractPath));
		}
		
		var oldUrl = App.base_url;
		App.base_url = base_url;
		App.http_client.get(url, {success: _writeZip, error: function(e){Ti.API.info(e)}, progress_bar: progress_bar});
		App.base_url = oldUrl;
	}
	
	
	return {start: start, getChannelImages : getChannelImages}
})();
