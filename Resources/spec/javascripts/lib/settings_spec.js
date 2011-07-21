describe("SettingsSpec", function() {
	
	it("writes settings to disk", function() {
		Settings.save({port:8080});
		expect(Mocks.FakeFile.write).toHaveBeenCalledWith('{"port":8080}');
	});
	
	describe("previous file", function() {
		var settings = {host:"192.168.1.3", port:8080, username:"xbmc", password:"x"};
		
		it("returns credentials", function() {
			Settings.save(settings);
			expect(Settings.credentials()).toEqual("xbmc:x");
		});
		
		it("returns default credentials", function() {
			Settings.save({});
			expect(Settings.credentials()).toEqual("xbmc:xbmc");
		});
		
		it("returns full url", function() {
			Settings.save(settings);
			expect(Settings.url()).toEqual("http://192.168.1.3:8080");
		});
		
		it("returns default host in url", function() {
			Settings.save({host:"", port:""});
			expect(Settings.url()).toEqual("http://192.168.1.1:8080");
		});
		
		it("returns default port in url", function() {
			Settings.save({host:"http://123.1.1", port:""});
			expect(Settings.url()).toEqual("http://123.1.1:8080");
		});
	});
	
	
});
