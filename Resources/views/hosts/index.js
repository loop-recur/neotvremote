Views.hosts.index = function(win, hosts) {	
	
	if(!Helpers.Application.isAndroid()) {Helpers.ui.addNav(win, "Back", Views.settings.index);};
		
	var autoRow = Ti.UI.createTableViewRow({
		title:"Auto Pair",
		owner:"auto",
		header:""
	});

	var newRow = Ti.UI.createTableViewRow({
		title:"Add a new device",
		owner:{},
		header:""
	});
		
	var rows = map(createTableViewRow, hosts);
	
	// rows.push(autoRow);
	rows.push(newRow);
	
	var tableView = Titanium.UI.createTableView({
		data:rows,
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED
	});
		
	function createTableViewRow(r) {
		var row = Ti.UI.createTableViewRow({
			hasDetail:true
		});
		
		var title = Ti.UI.createLabel({
			height:"20dp",
			left:"10dp",
			width:"190dp",
			text:r.name
		});

		row.owner = r;
		row.add(title);
		if(r.current) {
			row.hasCheck = true;
			row.hasDetail = false;
		};
		
		return row;
	}
	
	function stopChecking() {
		autoRow.title = "Auto Pair";
	}
	
	tableView.addEventListener('click', function(e) {
		var owner = e.rowData.owner;
		if(owner == "auto") {
			autoRow.title = "Checking...";
			Bonjour.discoverNetworks(compose(stopChecking, Hosts.findOrCreate));
		} else {
			Views.hosts.show(win, tableView, owner);
		}
	});

	win.add(tableView);	
};