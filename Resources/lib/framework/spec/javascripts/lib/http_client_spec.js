describe("HttpClient", function() {
	var http_client, call_backs;

  beforeEach(function() {
		http_client = LoopRecur.HttpClient(Mocks.HttpClient);
		App.base_url = "http://myurl.com";
		call_backs = {success: function(){}, error: function(){} };
  });

	it("uses credentials if it has them", function() {
		http_client.credentials = "encodedCredentials";
		http_client.get("http://myurl.com", call_backs);
		expect(Mocks.HttpClient.setRequestHeader).toHaveBeenCalledWith('Authorization', 'encodedCredentials');
	});
	
	it("doesn't use credentials if it doesn't have them", function() {
		http_client.get("http://myurl.com", call_backs);
		expect(Mocks.HttpClient.setRequestHeader).toHaveBeenCalledWith('Authorization', 'not logged in');
	});
	
	describe("Reguardless", function() {
		
		it("calls the callback.error on failure", function(){
			spyOn(call_backs, "error");
			Mocks.HttpClient.send = jasmine.createSpy().andCallFake(function(){ Mocks.HttpClient.onerror(); });
			http_client.post("/test", {test:"yup"}, call_backs);
			expect(call_backs.error).toHaveBeenCalled();
		});
		
		it("calls the callback.success on success", function(){
			spyOn(call_backs, "success");
			Mocks.HttpClient.send = jasmine.createSpy().andCallFake(function(){ Mocks.HttpClient.onload(); });
			http_client.get("/test", {test:"yup"}, call_backs);
			expect(call_backs.success).toHaveBeenCalled();
		});
	});

	describe("POST", function(){
		it("posts to the server", function() {
			http_client.post("/test", {test:"yup"}, call_backs);
			expect(Mocks.HttpClient.open).toHaveBeenCalledWith("POST", "http://myurl.com/test");
			expect(Mocks.HttpClient.send).toHaveBeenCalledWith({ data: {test:"yup"}});
		});
		
		it("posts to the server w/o params", function() {
			http_client.post("/test", call_backs);
			expect(Mocks.HttpClient.open).toHaveBeenCalledWith("POST", "http://myurl.com/test");
			expect(Mocks.HttpClient.send).toHaveBeenCalledWith({ data : {}});
		});
	});
	
	describe("GET", function(){
		it("gets to the server", function() {
			http_client.get("/whatever", {test:"yup", barf:"gross"}, call_backs);
			expect(Mocks.HttpClient.open).toHaveBeenCalledWith("GET", "http://myurl.com/whatever?test=yup&barf=gross&");
		});
		
		it("gets to the server w/o params", function() {
			http_client.get("/test", call_backs);
			expect(Mocks.HttpClient.open).toHaveBeenCalledWith("GET", "http://myurl.com/test");
		});
	});
});
