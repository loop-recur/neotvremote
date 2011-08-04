Views.settings.show = function(win, settings) {
	var view = Ti.UI.createView({fullscreen : true, backgroundColor: "#fff"});

	var ip_row = Ti.UI.createTableViewRow({
		header:"Device Settings"
	});
	var ip = Titanium.UI.createTextField({
		color:'#336699',
		id:"host",
		value:(settings.host || null),
		left:107,
		width:180,
		height:35,
		hintText:'Enter ip...',
		keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
		returnKeyType:Titanium.UI.RETURNKEY_NEXT,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
	});
	var ip_label = Titanium.UI.createLabel({
		text:"IP Address:",
		font:{fontFamily:'Helvetica Neue',fontSize:16,fontWeight:'bold'},
		left:10, 
		width:90
	});
	ip_row.add(ip_label);
	ip_row.add(ip);

	
	var port_row = Ti.UI.createTableViewRow();
	var port = Ti.UI.createTextField({
		id: "port",
		hintText:"Enter port...",
		value: (settings.port || null),
		left:107,
		width:180,
		height:35,
		keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
		returnKeyType:Titanium.UI.RETURNKEY_NEXT,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
	});
	var port_label = Titanium.UI.createLabel({
		text:"Port:",
		font:{fontFamily:'Helvetica Neue',fontSize:16,fontWeight:'bold'},
		left:10, 
		width:90
	});
	port_row.add(port_label);
	port_row.add(port);

	var username_row = Ti.UI.createTableViewRow();
	var username = Titanium.UI.createTextField({  
		id: "username",
		value: (settings.username || null),
		left:107,
		width:180,
		height:35,
	  hintText:'username',  
	  keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	  returnKeyType:Titanium.UI.RETURNKEY_NEXT,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
	});
	var username_label = Titanium.UI.createLabel({
		text:"Username:",
		font:{fontFamily:'Helvetica Neue',fontSize:16,fontWeight:'bold'},
		left:10, 
		width:90
	});
	username_row.add(username_label);
	username_row.add(username);

	var password_row = Ti.UI.createTableViewRow();
	var password = Titanium.UI.createTextField({ 
		id: "password",
		value: (settings.password || null),
		left:107,
		width:180,
		height:35,
	  hintText:'Password',
	  keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	  returnKeyType:Titanium.UI.RETURNKEY_DONE,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
	});
	var password_label = Titanium.UI.createLabel({
		text:"Password:",
		font:{fontFamily:'Helvetica Neue',fontSize:16,fontWeight:'bold'},
		left:10, 
		width:90
	});
	password_row.add(password_label);
	password_row.add(password);
	
 	var inputData = [ 
		ip_row,
		port_row,
		username_row,
		password_row,
		{title:'Save', action : save, header:''},
		{title:'Delete' , action : destroy},
		{title:'Close', action : close },
		{title:'Use this host', action : setCurrent}
	];
	
	var tableView = Titanium.UI.createTableView({
		data:inputData,
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED
	});
	
	tableView.addEventListener('click', function(e)
	{
		e.source.action();
	});
	
	view.add(tableView);

	map(addChangeListener, [ip, port, username, password]);

	win.add(view);
	
	function addChangeListener(field) {
		field.addEventListener('change', function(){
			settings[field.id] = field.value;
		});
	}
	
	function close() {
		App.loadSettings();
		// table.data = [];
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
