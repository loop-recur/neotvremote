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
		Ti.API.info("Loading with url!");
		App.base_url = url;
		App.http_client.credentials = ('Basic ' + Titanium.Utils.base64encode(credentials));
		Ti.App.fireEvent('connecting');
	} else {
		Ti.API.info("Loading without url!");
		Hosts.load(function(url, credentials) {
			App.base_url = url;
			App.http_client.credentials = ('Basic ' + Titanium.Utils.base64encode(credentials));
			Ti.App.fireEvent('connecting');
		});
	}
};

App.setHosts = function(url, credentials) {
	Ti.API.info("Setting!");
	App.base_url = url;
	App.http_client.credentials = ('Basic ' + Titanium.Utils.base64encode(credentials));
	setTimeout(function(){
		Ti.App.fireEvent('connecting');
	}, 1500);
}
