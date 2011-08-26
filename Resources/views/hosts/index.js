Views.hosts.index = function(win, hosts) {	
	if(!Helpers.Application.isAndroid()) {Helpers.ui.addNav(win, "Back", Views.settings.index);};
		
	var autoRow = Ti.UI.createTableViewRow({
		title:"Auto Pair",
		owner:"auto",
		header:""
	});

	var newRow = Ti.UI.createTableViewRow({
		title:"Add a new device",
		owner:{name: "New Device"},
		header:""
	});
		
	var rows = map(createTableViewRow, hosts);
	
	rows.push(autoRow);
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
	
	function startAutoPair() {
		autoPair();
		setTimeout(stopChecking, 3000);
	}
	
	function autoPair() {
		autoRow.title = "Checking...";
		Bonjour.discoverNetworks(Hosts.findOrCreate.flip().partial(stopChecking));
	}
	
	function stopChecking(host) {
		autoRow.title = "Auto Pair";
		if(host) {
			rows.unshift(createTableViewRow(host));
			tableView.setData(rows);
		}
	}
	
	tableView.addEventListener('click', function(e) {
		var owner = e.rowData.owner;
		(owner == "auto") ? startAutoPair() : Views.hosts.show(win, tableView, owner);
	});

	win.add(tableView);	
};