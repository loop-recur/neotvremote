Views.settings.index = function(win) {
	var view = Ti.UI.createView({
		backgroundColor: "#FFFFFF"
	});
	
	var hosts_row = Ti.UI.createTableViewRow({
		header:"Hosts",
		title:"Manage Hosts",
		id:"hosts"
	});
	
	var feedback_row = Ti.UI.createTableViewRow({
		header:"Sounds & Vibrate",
		title:"Manage Feedback Settings",
		id:"feedback"
	});
	
	var version_row = Ti.UI.createTableViewRow({
		header:"Version",
		title: Version,
		id:""
	});
	
	var inputData = [ 
		hosts_row,
		feedback_row,
		version_row
	];
	
	var tableView = Titanium.UI.createTableView({
		data:inputData,
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED
	});
	
	tableView.addEventListener('click', function(e) {
		var action = e.source.id;
		
		if(action) App.action(win, action + "#index");
	});
	
	view.add(tableView);

	win.add(view);

};