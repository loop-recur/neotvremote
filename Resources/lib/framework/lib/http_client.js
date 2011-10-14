LoopRecur.HttpClient = function() {
		
	function post(url, params_or_call_backs, call_backs) {
		var fixed_args = fixArgs(params_or_call_backs, call_backs);
		call_backs = fixed_args[0];
		params = fixed_args[1];
		prepare("POST", url, call_backs).send({data : params});
	}
	
	function get(url, params_or_call_backs, call_backs) {
		if(App.base_url == ":8080") return;
		var fixed_args = fixArgs(params_or_call_backs, call_backs);
		call_backs = fixed_args[0];
		params = fixed_args[1];
		url = url+queryString(params);
		prepare("GET", url, call_backs).send();
	}
	
	function destroy(url, params_or_call_backs, call_backs) {
		var fixed_args = fixArgs(params_or_call_backs, call_backs);
		call_backs = fixed_args[0];
		params = fixed_args[1];
		url = url+queryString(params);
		prepare("DELETE", url, call_backs).send();
	}
	
// private

	function fixArgs(params_or_call_backs, call_backs) {
		params = params_or_call_backs;
		if(params_or_call_backs.success) {
			call_backs = params_or_call_backs;
			params = {};
		}
		if(priv_obj.auth_token) {
			params.auth_token = priv_obj.auth_token;
		}
		return [call_backs, params];
	}

	function prepare(method, url, call_backs) {
		var progress_bar = call_backs.progress_bar;
		client = Ti.App.current_client = Titanium.Network.createHTTPClient();
		client.onload = call_backs.success;
		client.onerror = call_backs.error;
		if(progress_bar) client.ondatastream = function(e){ progress_bar.value = e.progress; };
		client.setTimeout(3000);
		client.open(method, App.base_url+url);
		try{ setHeaders(client); }catch(e){};
		return client;
	}

	function queryString(params) {
		var keys = [];
		for (var key in params) { keys.push([key, params[key]]); };
		var qstring = reduce("y += x[0] + '=' + x[1] + '&'".lambda(), "", keys);
		if (qstring !== "") qstring = '?'+qstring;
		return qstring;
	}
	
	function setHeaders(client) {
		if(priv_obj.credentials){
			client.setRequestHeader('Authorization', priv_obj.credentials);
		} else {
			client.setRequestHeader('Authorization', "not logged in"); //hack to get it to send json correctly
		}
		// client.setRequestHeader("content-type", "application/json");
	}
	
	var priv_obj = {post: post, get: get, destroy : destroy};
	return priv_obj;
};
