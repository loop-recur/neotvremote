var ChannelDownload = (function(){	
	
	function start() {
		Helpers.Application.isAndroid() ? _getAndroid() : _getIphone();
	}
	
	function _getAndroid() {   
		var zipfile = require("com.websiteburo.androzip");
		
		var _writeZip = function() {
			Ti.API.info("WRITING FILE");
			var zipPath = Ti.Filesystem.resourcesDirectory + Ti.Filesystem.separator + "android_channels.zip";
			var dirFullPath = Ti.Filesystem.resourcesDirectory + Ti.Filesystem.separator + 'images';
			var dir = Titanium.Filesystem.getFile(dirFullPath);
			
			var f = Ti.Filesystem.getFile(zipPath);
		  f.write(this.responseData);
			Ti.API.info("FINISHING WRITING");
			Ti.API.info(f.nativePath);

			Ti.API.info("Full path:");
			Ti.API.info(dirFullPath);
			Ti.API.info("RESOURCES");
			Ti.API.info(Ti.Filesystem.resourcesDirectory);
			zipfile.extract(dataDir+"/android_channels.zip", dirFullPath);	
			Ti.API.info("DONE!");
		}
		
		App.base_url = "http://looprecur.com";
		App.http_client.get("/android_channels.zip", {success: _writeZip, error: function(e){Ti.API.info(e)}});
	}
	
	function _getIphone() {
		var zipfile = require("zipfile");

		var _writeZip = function() {
			var f = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'channels.zip');
		  f.write(this.responseData);

			var dataDir = Ti.Filesystem.resourcesDirectory.slice(0,Ti.Filesystem.resourcesDirectory.length - 1).replace('file://localhost','').replace(/%20/g,'\\ ');
			zipfile.extract(dataDir+"/channels.zip", dataDir+"/images/channels");		
		}
		
		App.base_url = "http://looprecur.com";
		App.http_client.get("/channels.zip", {success: _writeZip, error: function(e){Ti.API.info(e)}});
	}
	
	
	return {start: start}
})();
