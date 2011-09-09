Views.hosts.show = function(win, table, hosts) {
	var view = Ti.UI.createView({fullscreen : true, backgroundColor: "#fff"});
	
	Helpers.ui.addNav(win, "Cancel", Views.settings.index);
	
	var name_row = Ti.UI.createTableViewRow({
		header:"Device Hosts"
	});
	var name = Titanium.UI.createTextField({
		color:'#336699',
		id:"name",
		value:(hosts.name),
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

 	var inputData = [ 
		name_row,
		ip_row,
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

	map(addChangeListener, [name, ip]);

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
		Hosts.save(hosts);
		close();
	}
};
