Views.settings.index = function(win) {
	var view = Ti.UI.createView({fullscreen : true, backgroundColor: "#ffffff"});
	
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
	
	var inputData = [ 
		hosts_row,
		feedback_row
	];
	
	var tableView = Titanium.UI.createTableView({
		data:inputData,
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED
	});
	
	tableView.addEventListener('click', function(e) {
		var action = e.source.id;
		
		App.action(win, action + "#index");
		
	});
	
	view.add(tableView);

	win.add(view);

};