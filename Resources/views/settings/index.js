Views.settings.index = function(win, settings) {	
	var newRow = Ti.UI.createTableViewRow({
		height:80,
		width:320
	});
	
	var title = Ti.UI.createLabel({
		left:100,
		top:17,
		height:20,
		width:190,
		text:"Add New"
	});
	
	newRow.owner = {};
	newRow.add(title);
		
	function createTableViewRow(r) {
		var row = Ti.UI.createTableViewRow({
			height:80,
			width:320
		});
		
		var title = Ti.UI.createLabel({
			left:100,
			top:17,
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
	
	var rows = map(createTableViewRow, settings);
	rows.unshift(newRow);
	
	var tableview = Titanium.UI.createTableView({ 
		data:rows
	 });

	tableview.addEventListener('click', function(e) {
		Views.settings.show(win, e.rowData.owner);
	});
	
	win.add(tableview);	
};
