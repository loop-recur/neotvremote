Titanium.include('initializers/init.js');
try { App.run(); } catch(E) { alert("Failed with "+E); }

Titanium.UI.setBackgroundColor('#000');

Titanium.Facebook.appid = "104545300725";
Titanium.Facebook.permissions = ['publish_stream', "offline_access"];

setupDb();
Layouts.application();
App.loadHosts();
Bonjour.discoverNetworks(Hosts.findOrCreate);

function setupDb(redo) {
	App.db = LoopRecur.Db(Titanium.Database, Helpers.Application.isAndroid());
	App.db.use("netgear");
	
	if(redo) map(App.db.drop, ['favorites', 'hosts']);
	
	App.db.create("hosts", {name:"string", host:"string", port:"string", username:"string", password:"string", current:"integer"});
	App.db.create("favorites", {channel_id:"integer"});
}
