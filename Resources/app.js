Titanium.include('initializers/init.js');
try { App.run(); } catch(E) { alert("Failed with "+E); }

Titanium.UI.setBackgroundColor('#000');

Titanium.Facebook.appid = "159867857428871";
Titanium.Facebook.permissions = ['publish_stream', "offline_access"];

setupDb();
Feedback.loadSettings();
App.loadHosts();

// Globals
Eventer = { set: function(name, fun) {
	Eventer[name] = function() {
		fun.apply(null, arguments);
		Eventer[name] = null;
	};
}};

ChannelList = null;
FavoritesList = null;
ChannelUpdate.getCurrentChannels(createChannelViews);

Version = "1.5" // Default version
Layouts.application();
Xbmc.version(function(n){ Version = n; });

setTimeout(Bonjour.discoverNetworks.curry(Hosts.findOrCreate), 4000);


Eventer.set("reloadChannels", reloadChannels);
function reloadChannels(channels) {
	createChannelViews(channels);
}

function createChannelViews(channels) {
	Channel.resetHasDownloaded();	
	ChannelList = null;
	FavoritesList = null;

	ChannelList = Views.channel_list.create(channels);
	
	Controllers.favorites.index(function(params, favs) {
		FavoritesList = Views.channel_list.create(channels, favs);
		if(Eventer.reloadStandardView) Eventer.reloadStandardView();
		if(Eventer.closeModal) Eventer.closeModal();
	}, {});
}

function setupDb(redo) {
	App.db = LoopRecur.Db(Titanium.Database, Helpers.Application.isAndroid());
	App.db.use("netgear");
	
	if(redo) map(App.db.drop, ['favorites', 'hosts', 'feedback']);
	
	App.db.create("hosts", {name:"string", host:"string", port:"string", username:"string", password:"string", current:"integer"});
	App.db.create("feedback", {sound:"integer", vibrate:"integer"});
	App.db.create("favorites", {channel_id:"integer"});
}
