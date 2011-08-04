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
		var row = Ti.UI.createTableViewRow();
		
		var title = Ti.UI.createLabel({
			height:20,
			width:190,
			text:r.host
		});
		
		var current = Ti.UI.createLabel({
			right:0,
			top:17,
			height:20,
			width:190,
			text:"*"
		});
		
		row.owner = r;
		row.add(title);
		if(r.current) row.add(current);
		
		return row;
	}
	
	tableView.addEventListener('click', function(e)
	{
		Views.settings.show(win, e.rowData.owner);
	});

	win.add(tableView);	
};