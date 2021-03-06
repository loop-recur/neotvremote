Views.hosts.index = function(win, hosts) {	
	
	var view = Ti.UI.createView({fullscreen : true, backgroundColor: "#FFFFFF"});
	
	if(!Helpers.Application.isAndroid()) {Helpers.ui.addNav(win, "Back", Views.settings.index);};
		
	var autoRow = Ti.UI.createTableViewRow({
		title:"Auto Pair",
		owner:"auto",
		header:"Devices"
	});

	var newRow = Ti.UI.createTableViewRow({
		title:"Add a new device",
		owner:{name: "New Device"},
		header:""
	});
	
	var tableView = Titanium.UI.createTableView({
		data:[],
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED
	});
	
	makeRows(hosts);
	
	function makeRows(rows) {
		var rows = map(createTableViewRow, rows);
		rows.push(autoRow);
		rows.push(newRow);
		tableView.setData(rows);		
	}
		
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
		App.db.find("hosts", {}, function(rows) {
			foundHost(rows) ? Helpers.ui.alert("No hosts detected") : makeRows(rows);
		});
	}
	
	function foundHost(rows) {
		var getIds = compose(reduce.partial('+',0), map.partial("x.id"));
		return getIds(rows) == getIds(hosts);
	}
	
	tableView.addEventListener('click', function(e) {
		var owner = e.rowData.owner;
		(owner == "auto") ? startAutoPair() : Views.hosts.show(win, tableView, owner);
	});

	view.add(tableView)
	
	win.add(view);	
};