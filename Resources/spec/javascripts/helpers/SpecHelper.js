beforeEach(function() {
	App = {};
	var fake_client = { get: jasmine.createSpy("get") };
	App.http_client = fake_client;
	
	
	this.addMatchers({
    toCallCommand: function(command) {
			this.actual();
			expect(fake_client.get).toHaveBeenCalledWith("/xbmcCmds/xbmcHttp", {"command":command}, {success: jasmine.any(Function)});
			return true;
   	}
	});
});
