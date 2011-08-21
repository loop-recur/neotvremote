Views.feedback.index = function(win) {
	var view = Ti.UI.createView({fullscreen : true, backgroundColor: "red"});

	Helpers.ui.addNav(win, "Back", Views.settings.index);
	
	var vibrate_row = Ti.UI.createTableViewRow({
		header:"Feedback"
	});
	
	var vibrate_switch = Ti.UI.createSwitch({
		value:true,
		right:10
	});
	
	vibrate_switch.addEventListener('change', function() {
		alert('boom');
	});

	var vibrate_label = Titanium.UI.createLabel({
		text:"Vibration",
		font:{fontFamily:'Helvetica Neue',fontSize:"16dp",fontWeight:'bold'},
		left:"10dp", 
		width:"90dp"
	});
	vibrate_row.add(vibrate_switch);
	vibrate_row.add(vibrate_label);


	var sound_row = Ti.UI.createTableViewRow();
	
	var sound_switch = Ti.UI.createSwitch({
		value:true,
		right:10
	});
	
	sound_switch.addEventListener('change', function() {
		alert('boom');
	});

	var sound_label = Titanium.UI.createLabel({
		text:"Sound",
		font:{fontFamily:'Helvetica Neue',fontSize:"16dp",fontWeight:'bold'},
		left:"10dp", 
		width:"90dp"
	});
	sound_row.add(sound_switch);
	sound_row.add(sound_label);
	

 	var inputData = [ 
		vibrate_row,
		sound_row
	];
	
	var tableView = Titanium.UI.createTableView({
		data:inputData,
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED
	});
	
	view.add(tableView);
	
	win.add(view);

};