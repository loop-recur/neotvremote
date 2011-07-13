Titanium.include('initializers/init.js');
try { App.run(); } catch(E) { alert("Failed with "+E); }

Titanium.UI.setBackgroundColor('#000');
App.http_client.credentials = ('Basic ' + Titanium.Utils.base64encode("xbmc"+":x"));
Layouts.application();
