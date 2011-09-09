Titanium.include('initializers/init.js');
try { App.run(); } catch(E) { alert("Failed with "+E); }

Titanium.UI.setBackgroundColor('#000');

Titanium.Facebook.appid = "159867857428871";
Titanium.Facebook.permissions = ['publish_stream', "offline_access"];

setTimeout(function(){
	Ti.API.info("=============LAODING CHANNELS=========");
	ChannelList = Views.channel_list.create(Channels);
	Views.channel_list.launchMode(ChannelList.children);
	
	Ti.API.info("=============DONE FIRST!!!!!=========");
}, 0);

Layouts.application();
setupDb();
Feedback.loadSettings();

setTimeout(App.loadHosts, 200);

setTimeout(function(){
	Ti.API.info("=============LAODING Bonjuor=========");
	Bonjour.discoverNetworks(Hosts.findOrCreate);
}, 400);


setTimeout(function(){
	Ti.API.info("=============LAODING Favs=========");
	Controllers.favorites.index(function(params, favs) {
		FavoritesList = Views.channel_list.create(Channels, favs);
		Views.channel_list.favoritesMode(FavoritesList.children, favs);
	}, {});
	
	Ti.API.info("=============DONE SECOND!!!!!=========");
},800);
// 
// setTimeout(function(){
// 
// }, 1200);


function setupDb(redo) {
	App.db = LoopRecur.Db(Titanium.Database, Helpers.Application.isAndroid());
	App.db.use("netgear");
	
	if(redo) map(App.db.drop, ['favorites', 'hosts', 'feedback']);
	
	App.db.create("hosts", {name:"string", host:"string", port:"string", username:"string", password:"string", current:"integer"});
	App.db.create("feedback", {sound:"integer", vibrate:"integer"});
	App.db.create("favorites", {channel_id:"integer"});
}
