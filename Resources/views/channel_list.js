Views.channel_list = function(win, channels) {
	
	channels.reverse(); //hack
	
	var scrollview = Titanium.UI.createScrollView({
		top:40,
		height:365,
		width:320,
		contentWidth:"auto",
		contentHeight:'auto',
		showHorizontalScrollIndicator:false,
		showVerticalScrollIndicator:true
	});
	
	var height = 77;
	var top = 2;
	var row_separation = 10;
	
	var width = 90;
	var left = 12.5;
	var column_separation = 12.5;
	
	var rows_built = 0;
	var column_counter = 0;
	
	function incrementColumn() {
		column_counter += 1;
		if (column_counter == 3) { 
			column_counter = 0;
			rows_built += 1;
		};
	};
	
	function makeChannel(name) {
		var name = Titanium.UI.createButton({
			backgroundImage: Channel.imagePath(name),
			height:height,
			width:width,
			top:top + rows_built*height + rows_built*row_separation,
			left:left + column_counter*width + column_counter*column_separation,
			id:name,
			value:name
		});
		
		name.addEventListener('click', function() {
			alert(name.value + " clicked!");
		});
		
		return name;
	}
	
	for (var i = channels.length - 1; i >= 0; i--){
		scrollview.add(makeChannel(channels[i]));
		incrementColumn();
	};
	
	win.add(scrollview);
	
	return scrollview;
};
