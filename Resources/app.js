Titanium.include('initializers/init.js');
try { App.run(); } catch(E) { alert("Failed with "+E); }

Titanium.UI.setBackgroundColor('#000');

setupDb();
App.loadSettings();
Layouts.application();

function setupDb(redo) {
	App.db = LoopRecur.Db(Titanium.Database);
	App.db.use("netgear");
	
	if(redo) Functional.map(App.db.drop, ['settings', 'likes', 'favorites']);
	
	App.db.create("settings", {host:"string", port:"string", username:"string", password:"string", current:"integer"});
	App.db.create("likes", {channel_id:"integer"});
	App.db.create("favorites", {channel_id:"integer"});
}