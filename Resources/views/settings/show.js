Views.settings.show = function(win, table, settings) {
	var view = Ti.UI.createView({fullscreen : true, backgroundColor: "#fff"});

	var ip = Ti.UI.createTextField({
		id: "host",
		backgroundColor:'gray',
		hintText:"Enter ip...",
		value: (settings.host || null),
		top:10,
		height:35,
		width:250,
		keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
		returnKeyType:Titanium.UI.RETURNKEY_NEXT
	});
	
	var port = Ti.UI.createTextField({
		id: "port",
		backgroundColor:'gray',
		hintText:"Enter port...",
		value: (settings.port || null),
		top:55,
		height:35,
		width:250,
		keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
		returnKeyType:Titanium.UI.RETURNKEY_NEXT
	});

	var username = Titanium.UI.createTextField({  
		id: "username",
		backgroundColor:'gray',
		value: (settings.username || null),
	  top:100,
	  width:250,
	  height:35, 
	  hintText:'username',  
	  keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	  returnKeyType:Titanium.UI.RETURNKEY_NEXT
	});

	var password = Titanium.UI.createTextField({ 
		id: "password",
		backgroundColor:'gray',
		value: (settings.password || null),
	  top:140,  
	  width:250,  
	  height:35,
	  hintText:'Password',
	  keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	  returnKeyType:Titanium.UI.RETURNKEY_DONE
	});
	
	var save_button = Titanium.UI.createButton({
		backgroundColor:'gray',
	  top:200,
	  width:100,
	  height:35,
		title: "Save"
	});
	
	var delete_button = Titanium.UI.createButton({
		backgroundColor:'gray',
	  top:240,
	  width:100,
	  height:35,
		title: "Delete"
	});
	
	var close_button = Titanium.UI.createButton({
		backgroundColor:'gray',
	  top:290,
	  width:100,
	  height:35,
		title: "Close"
	});
	
	var use_button = Titanium.UI.createButton({
		backgroundColor:'gray',
	  top:330,
	  width:100,
	  height:35,
		title: "Use this host"
	});
	
	save_button.addEventListener("click", save);
	close_button.addEventListener("click", close);
	delete_button.addEventListener("click", destroy);
	use_button.addEventListener("click", setCurrent);
	
	map(addChangeListener, [ip, port, username, password]);

	view.add(port);
	view.add(ip);
	view.add(username);
	view.add(password);
	view.add(save_button);
	view.add(close_button);
	view.add(use_button);
	view.add(delete_button);
	
	win.add(view);
	
	function addChangeListener(field) {
		field.addEventListener('change', function(){
			settings[field.id] = field.value;
		});
	}
	
	function close() {
		App.loadSettings();
		table.data = [];
		App.action(win, "settings#index");
		win.remove(view);
	}
	
	function save(){
		Settings.save(settings);
		close();
	}
	
	function destroy() {
		Settings.destroy(settings.id);
		close();
	}
	
	function setCurrent() {
		Settings.setCurrent(settings);
		close();
	}
};
