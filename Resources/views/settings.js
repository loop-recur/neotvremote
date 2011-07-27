Views.settings = function(win) {
	var settings = {};
	
	var ip = Ti.UI.createTextField({
		backgroundColor:'gray',
		hintText:"Enter ip...",
		top:55,
		height:35,
		width:100,
		keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
		returnKeyType:Titanium.UI.RETURNKEY_NEXT
	});
	
	var port = Ti.UI.createTextField({
		backgroundColor:'gray',
		hintText:"Enter port...",
		top:10,
		height:35,
		width:100,
		keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
		returnKeyType:Titanium.UI.RETURNKEY_NEXT
	});

	var username = Titanium.UI.createTextField({  
		backgroundColor:'gray',
	  top:100,
	  width:250,  
	  height:35, 
	  hintText:'username',  
	  keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	  returnKeyType:Titanium.UI.RETURNKEY_NEXT
	});

	var password = Titanium.UI.createTextField({  	
		backgroundColor:'gray',
	  top:140,  
	  width:250,  
	  height:35,
	  hintText:'Password',  
	  // passwordMask:true,
	  keyboardType:Titanium.UI.DEFAULT,  
	  returnKeyType:Titanium.UI.RETURNKEY_GO
	});
	
	var save_button = Titanium.UI.createButton({
		backgroundColor:'gray',
	  top:160,
	  width:40,
	  height:35,
		title: "Save"
	});
	
	save_button.addEventListener("click", save);


	win.add(port);
	win.add(ip);
	win.add(username);
	win.add(password);
	win.add(save_button);
	
	function save(){
		var settings = {host: ip.value, port: port.value, username: username.value, password: password.value}
		Settings.save(settings);
		App.loadSettings();
	}
};
