describe("SettingsSpec", function() {
	beforeEach(function() {
	  App.db = Mocks.db;
	});
	
	it("writes settings to the db", function() {
		Settings.save({port:8080});
		expect(Mocks.db.save).toHaveBeenCalledWith('settings', {"port":8080, current: 1});
	});
	
	it("writes settings to the db if none exist", function() {
		Mocks.db.find = jasmine.createSpy().andCallFake(function(a,b,c){ c([]); });
		Settings.findOrCreate({host: "192.168.1.8", port:8081});
		expect(Mocks.db.find).toHaveBeenCalledWith('settings', {host: "http://192.168.1.8", port:8081}, jasmine.any(Function));
		expect(Mocks.db.save).toHaveBeenCalledWith('settings', {username: "xbmc", password: "xbmc", host: "http://192.168.1.8", port:8081, current: 1});
	});
	
	it("doesn't write settings to the db if previous exists", function() {
		Mocks.db.find = jasmine.createSpy().andCallFake(function(a,b,c){ c(["something"]); });
		Settings.findOrCreate({host: "192.168.1.8", port:8081});
		expect(Mocks.db.find).toHaveBeenCalledWith('settings', {host: "http://192.168.1.8", port:8081}, jasmine.any(Function));
		expect(Mocks.db.save).toHaveBeenCalledWith('settings', {username: "xbmc", password: "xbmc", host: "http://192.168.1.8", port:8081, current: 1});
	});
	
	describe("previous settings", function() {
		var settings = [{host:"http://192.168.1.3", port:8080, username:"xbmc", password:"x"},
										{host:"http://192.168.2.7", port:9090, username:"abc", password:"def"}];
										
		beforeEach(function() {
		  App.db.find = jasmine.createSpy().andCallFake(function(name,options,fun){
				var current = select('.current', settings);
				return options['current'] ? fun(current) : fun(settings);
			});
		});		
		
		it("sets the settings to current", function() {
		  Settings.setCurrent(settings[0]);
			expect(App.db.save).toHaveBeenCalledWith('settings', settings[0]);
			expect(settings[0].current).toBeTruthy();
		});
		
		it("sets all the other settings to not current", function() {
		  Settings.setCurrent(settings[0]);
			expect(App.db.save).toHaveBeenCalledWith('settings', settings[1]);
			expect(settings[1].current).toEqual(0);
		});

		it("fixes the url", function() {
			var settings = {host:"192.168.1.1"};
		  Settings.save(settings);
			expect(settings.host).toEqual("http://192.168.1.1");
		});
		
		it("doesn't fix the url when there's an http", function() {
			var settings = {host:"http://192.168.1.1"};
		  Settings.save(settings);
			expect(settings.host).toEqual("http://192.168.1.1");
		});

		it("finds the first settings when none are current", function() {
		  Settings.load(function(url, credentials) {
				expect(url).toEqual("http://192.168.1.3:8080");
				expect(credentials).toEqual("xbmc:x");
			});
		});
		
		it("finds the current settings when there is one", function() {
			Settings.setCurrent(settings[1]);
		  Settings.load(function(url, credentials) {
				expect(App.db.find).toHaveBeenCalledWith("settings", {current : 1}, jasmine.any(Function))
				expect(url).toEqual("http://192.168.2.7:9090");
				expect(credentials).toEqual("abc:def");
			});
		});
	});	
});
