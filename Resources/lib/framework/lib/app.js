App = {};
App.run = Bootstrap.run;

App.action = function(win, controller_action, args) {
	var params = args || {};
	var names = controller_action.split("#");
	var controller = names[0];
	var action = names[1];
	var view = (Views[controller] && Views[controller][action]) ? Views[controller][action] : {};
	Controllers[controller][action](view, params);
};

App.loadSettings = function() {
	App.base_url = Settings.url();
	Ti.API.info(App.base_url);
	App.http_client.credentials = ('Basic ' + Titanium.Utils.base64encode(Settings.credentials()));
};
