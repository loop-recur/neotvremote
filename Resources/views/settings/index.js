Views.settings.index = function(win, settings) {	

	var newRow = Ti.UI.createTableViewRow({
		title:"Add a new device",
		owner:{},
		header:""
	});
	
	var rows = map(createTableViewRow, settings);
	
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
			height:20,
			left:10,
			width:190,
			text:r.host
		});

		row.owner = r;
		row.add(title);
		if(r.current) {
			row.hasCheck = true;
			row.hasDetail = false;
		};
		
		return row;
	}
	
	tableView.addEventListener('click', function(e)
	{
		Views.settings.show(win, tableView, e.rowData.owner);
	});

	win.add(tableView);	
};