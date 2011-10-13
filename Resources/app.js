Titanium.include('initializers/init.js');
try { App.run(); } catch(E) { alert("Failed with "+E); }

Titanium.UI.setBackgroundColor('#000');

Titanium.Facebook.appid = "159867857428871";
Titanium.Facebook.permissions = ['publish_stream', "offline_access"];

Ti.App.addEventListener('channelUpdateFinish', reloadChannels);
setupDb();
Feedback.loadSettings();
App.loadHosts();

// Globals
ChannelList = null;
FavoritesList = null;
createChannelViews(Channels); // Default channels

Version = "1.0" // Default version
Layouts.application();

Xbmc.version(function(n){ Version = n; });

Bonjour.discoverNetworks(Hosts.findOrCreate);

function reloadChannels(e) {
	createChannelViews(e.channels, e.cb);
}

function createChannelViews(channels, cb) {
	ChannelList = null;
	FavoritesList = null;
	
	ChannelList = Views.channel_list.create(channels);
	Views.channel_list.launchMode(ChannelList.children);
	
	Controllers.favorites.index(function(params, favs) {
		FavoritesList = Views.channel_list.create(channels, favs);
		Views.channel_list.favoritesMode(FavoritesList.children, favs);
		if(cb) try{ cb(); }catch(e){};
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
