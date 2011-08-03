Views.channel_list = function(win, channels) {
	var default_settings = {height: 77, width: 90, left: 12.5, column_separation: 12.5, top: 2, row_separation: 10, rows_built: 0};
		
	var scrollview = Titanium.UI.createScrollView({
		top:40,
		height:365,
		width:320,
		contentWidth:"auto",
		contentHeight:'auto',
		showHorizontalScrollIndicator:false,
		showVerticalScrollIndicator:true
	});

	reduce(makeChannel, {settings: default_settings, amount: 0}, channels);
	
	function makeChannel(config, name) {
		var new_settings = getNewSettings(config.settings, config.amount);
		
		var channel_button = Titanium.UI.createButton({
			backgroundImage: Channel.imagePath(name),
			height:new_settings.height,
			width:new_settings.width,
			top:new_settings.top,
			left:new_settings.left,
			id:name,
			value:name
		});
				
		channel_button.addEventListener('click', function() {
			alert(channel_button.value + " clicked!");
		});
		
		scrollview.add(channel_button);
		
		return {settings: new_settings, amount: config.amount+1};
	}
	
	function getNewSettings(settings, amount) {
		var top = settings.top;
		var rows_built = settings.rows_built;
		var left = settings.left+settings.width+settings.column_separation;
		
		if(amount % 3 == 0) {
			rows_built = rows_built + 1;
			top = settings.top + settings.rows_built+settings.height + settings.row_separation;
			left = default_settings.left;
		}
		
		return {
			height: settings.height,
			width: settings.width,
			left: left,
			column_separation: settings.column_separation,
			top: top,
			row_separation: settings.row_separation,
			rows_built: settings.rows_built
		};
	}
		
	win.add(scrollview);
	
	return scrollview;
};
