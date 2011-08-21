describe("HostsSpec", function() {
	beforeEach(function() {
	  App.db = Mocks.db;
		App.loadHosts = jasmine.createSpy();
	});
	
	it("writes hosts to the db", function() {
		Hosts.save({port:8080});
		expect(Mocks.db.save).toHaveBeenCalledWith('hosts', {"port":8080, current: 1});
	});
	
	it("writes hosts to the db if none exist", function() {
		Mocks.db.find = jasmine.createSpy().andCallFake(function(a,b,c){ c([]); });
		Hosts.findOrCreate({host: "192.168.1.8", port:8081});
		expect(Mocks.db.find).toHaveBeenCalledWith('hosts', {host: "http://192.168.1.8", port:8081}, jasmine.any(Function));
		expect(Mocks.db.save).toHaveBeenCalledWith('hosts', {username: "xbmc", password: "xbmc", host: "http://192.168.1.8", port:8081, current: 1});
	});
	
	it("doesn't write hosts to the db if previous exists", function() {
		Mocks.db.find = jasmine.createSpy().andCallFake(function(a,b,c){ c(["something"]); });
		Hosts.findOrCreate({host: "192.168.1.8", port:8081});
		expect(Mocks.db.find).toHaveBeenCalledWith('hosts', {host: "http://192.168.1.8", port:8081}, jasmine.any(Function));
		expect(Mocks.db.save).toHaveBeenCalledWith('hosts', {username: "xbmc", password: "xbmc", host: "http://192.168.1.8", port:8081, current: 1});
	});
	
	describe("previous hosts", function() {
		var hosts = [{host:"http://192.168.1.3", port:8080, username:"xbmc", password:"x"},
										{host:"http://192.168.2.7", port:9090, username:"abc", password:"def"}];
										
		beforeEach(function() {
		  App.db.find = jasmine.createSpy().andCallFake(function(name,options,fun){
				var current = select('.current', hosts);
				return options['current'] ? fun(current) : fun(hosts);
			});
		});		
		
		it("sets the hosts to current", function() {
		  Hosts.setCurrent(hosts[0]);
			expect(App.db.save).toHaveBeenCalledWith('hosts', hosts[0]);
			expect(hosts[0].current).toBeTruthy();
		});
		
		it("sets all the other hosts to not current", function() {
		  Hosts.setCurrent(hosts[0]);
			expect(App.db.save).toHaveBeenCalledWith('hosts', hosts[1]);
			expect(hosts[1].current).toEqual(0);
		});

		it("fixes the url", function() {
			var hosts = {host:"192.168.1.1"};
		  Hosts.save(hosts);
			expect(hosts.host).toEqual("http://192.168.1.1");
		});
		
		it("doesn't fix the url when there's an http", function() {
			var hosts = {host:"http://192.168.1.1"};
		  Hosts.save(hosts);
			expect(hosts.host).toEqual("http://192.168.1.1");
		});

		it("finds the first hosts when none are current", function() {
		  Hosts.load(function(url, credentials) {
				expect(url).toEqual("http://192.168.1.3:8080");
				expect(credentials).toEqual("xbmc:x");
			});
		});
		
		it("finds the current hosts when there is one", function() {
			Hosts.setCurrent(hosts[1]);
		  Hosts.load(function(url, credentials) {
				expect(App.db.find).toHaveBeenCalledWith("hosts", {current : 1}, jasmine.any(Function))
				expect(url).toEqual("http://192.168.2.7:9090");
				expect(credentials).toEqual("abc:def");
			});
		});
	});	
});
