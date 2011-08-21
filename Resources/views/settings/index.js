Views.settings.index = function(win) {
	var view = Ti.UI.createView({fullscreen : true, backgroundColor: "#fff"});
	
	var hosts_row = Ti.UI.createTableViewRow({
		header:"Hosts",
		title:"Manage Hosts",
		id:"hosts"
	});
	
	var sound_row = Ti.UI.createTableViewRow({
		header:"Sounds & Vibrate",
		title:"Manage Feedback Settings",
		id:"sounds"
	});
	
	var inputData = [ 
		hosts_row,
		sound_row
	];
	
	var tableView = Titanium.UI.createTableView({
		data:inputData,
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED
	});
	
	tableView.addEventListener('click', function(e) {
		if(e.source.id == "hosts"){
			Views.hosts.index.partial(win);
		}
	});
	
	view.add(tableView);

	win.add(view);

};