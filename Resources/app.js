Titanium.include('initializers/init.js');
try { App.run(); } catch(E) { alert("Failed with "+E); }

Titanium.UI.setBackgroundColor('#000');

Titanium.Facebook.appid = "159867857428871";
Titanium.Facebook.permissions = ['publish_stream', "offline_access"];

Layouts.application();
setupDb();
Feedback.loadSettings();

App.loadHosts();

ChannelList = Views.channel_list.create(Channels);
Views.channel_list.launchMode(ChannelList.children);

Controllers.favorites.index(function(params, favs) {
	FavoritesList = Views.channel_list.create(Channels, favs);
	Views.channel_list.favoritesMode(FavoritesList.children, favs);
}, {});

setTimeout(Bonjour.discoverNetworks.curry(Hosts.findOrCreate), 400);

Version = "1.0";
Xbmc.version(function(version){ Version = version; });

function setupDb(redo) {
	App.db = LoopRecur.Db(Titanium.Database, Helpers.Application.isAndroid());
	App.db.use("netgear");
	
	if(redo) map(App.db.drop, ['favorites', 'hosts', 'feedback']);
	
	App.db.create("hosts", {name:"string", host:"string", port:"string", username:"string", password:"string", current:"integer"});
	App.db.create("feedback", {sound:"integer", vibrate:"integer"});
	App.db.create("favorites", {channel_id:"integer"});
}
