Views.hosts.show = function(win, table, hosts) {
	var view = Ti.UI.createView({fullscreen : true, backgroundColor: "#fff"});
	
	if(!Helpers.Application.isAndroid()) {Helpers.ui.addNav(win, "Cancel", Views.settings.index);};
	
	var name_row = Ti.UI.createTableViewRow({
		header:"Device Hosts"
	});
	var name = Titanium.UI.createTextField({
		color:'#336699',
		id:"name",
		value:(hosts.name || "New Device"),
		left:"107dp",
		width:"180dp",
		height:"35dp",
		hintText:'Enter name...',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_NEXT,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
	});
	var name_label = Titanium.UI.createLabel({
		text:"Name:",
		font:{fontFamily:'Helvetica Neue',fontSize:"16dp",fontWeight:'bold'},
		left:"10dp", 
		width:"90dp"
	});
	name_row.add(name_label);
	name_row.add(name);

	var ip_row = Ti.UI.createTableViewRow({
		header:"Device Hosts"
	});
	var ip = Titanium.UI.createTextField({
		color:'#336699',
		id:"host",
		value:(hosts.host || null),
		left:"107dp",
		width:"180dp",
		height:"35dp",
		hintText:'Enter ip...',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_NEXT,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
	});
	var ip_label = Titanium.UI.createLabel({
		text:"IP Address:",
		font:{fontFamily:'Helvetica Neue',fontSize:"16dp",fontWeight:'bold'},
		left:"10dp", 
		width:"90dp"
	});
	ip_row.add(ip_label);
	ip_row.add(ip);

	
	var port_row = Ti.UI.createTableViewRow();
	var port = Ti.UI.createTextField({
		id: "port",
		hintText:"Enter port...",
		value: (hosts.port || null),
		left:"107dp",
		width:"180dp",
		height:"35dp",
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_NEXT,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
	});
	var port_label = Titanium.UI.createLabel({
		text:"Port:",
		font:{fontFamily:'Helvetica Neue',fontSize:"16dp",fontWeight:'bold'},
		left:"10dp", 
		width:"90dp"
	});
	port_row.add(port_label);
	port_row.add(port);

	var username_row = Ti.UI.createTableViewRow();
	var username = Titanium.UI.createTextField({  
		id: "username",
		value: (hosts.username || null),
		left:"107dp",
		width:"180dp",
		height:"35dp",
	  hintText:'username',  
	  keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	  returnKeyType:Titanium.UI.RETURNKEY_NEXT,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
	});
	var username_label = Titanium.UI.createLabel({
		text:"Username:",
		font:{fontFamily:'Helvetica Neue',fontSize:"16dp",fontWeight:'bold'},
		left:"10dp", 
		width:"90dp"
	});
	username_row.add(username_label);
	username_row.add(username);

	var password_row = Ti.UI.createTableViewRow();
	var password = Titanium.UI.createTextField({ 
		id: "password",
		value: (hosts.password || null),
		left:"107dp",
		width:"180dp",
		height:"35dp",
	  hintText:'Password',
	  keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	  returnKeyType:Titanium.UI.RETURNKEY_DONE,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
	});
	var password_label = Titanium.UI.createLabel({
		text:"Password:",
		font:{fontFamily:'Helvetica Neue',fontSize:"16dp",fontWeight:'bold'},
		left:"10dp", 
		width:"90dp"
	});
	password_row.add(password_label);
	password_row.add(password);
	
 	var inputData = [ 
		name_row,
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
	
	tableView.addEventListener('click', function(e) {
		if(e.source.action) e.source.action();
	});
	
	view.add(tableView);

	map(addChangeListener, [name, ip, port, username, password]);

	win.add(view);
	
	function addChangeListener(field) {
		field.addEventListener('change', function(){
			hosts[field.id] = field.value;
		});
	}
	
	function close() {
		App.loadHosts();
		table.data = [];
		App.action(win, "hosts#index");
		win.remove(view);
	}
	
	function save(){
		Hosts.save(hosts);
		close();
	}
	
	function destroy() {
		Hosts.destroy(hosts.id);
		close();
	}
	
	function setCurrent() {
		Hosts.setCurrent(hosts);
		close();
	}
};
