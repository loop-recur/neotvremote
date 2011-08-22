App = {};
App.run = Bootstrap.run;

App.action = function(win, controller_action, args) {
	var params = args || {};
	var names = controller_action.split("#");
	var controller = names[0];
	var action = names[1];
	var view = (Views[controller] && Views[controller][action]) ? Views[controller][action] : {};
	Controllers[controller][action](view.partial(win), params);
};

App.loadHosts = function(url, credentials) {
	if(url) {
		App.base_url = url;
		App.http_client.credentials = ('Basic ' + Titanium.Utils.base64encode(credentials));
	} else {
		Hosts.load(function(url, credentials) {
			App.base_url = url;
			App.http_client.credentials = ('Basic ' + Titanium.Utils.base64encode(credentials));
		});
	}
};

App.setHosts = function(url, credentials) {
	App.base_url = url;
	App.http_client.credentials = ('Basic ' + Titanium.Utils.base64encode(credentials));
}