Views.channel_favorites = function(win) {

	// write your awesome function here to display the favorites in the database.
	
	function getFavorites() {
		return [
			"channel_acm"
			,"channel_amazonvod"
			,"channel_appchannel"
			,"channel_atom"
			,"channel_bliptv"
		].reverse();
	};
	
	var scrollview = Titanium.UI.createScrollView({
		top:40,
		height:365,
		width:320,
		contentWidth:"auto",
		contentHeight:'auto',
		showHorizontalScrollIndicator:false,
		showVerticalScrollIndicator:true
	});
	
	var favorites = getFavorites();
	
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
			backgroundImage:'images/channels/' + name + '.png',
			height:height,
			width:width,
			top:top + rows_built*height + rows_built*row_separation,
			left:left + column_counter*width + column_counter*column_separation,
			id:name,
			value:name,
			favorite:false
		});
		
		name.addEventListener('click', function() {
			alert(name.value + " clicked!");
			name.enabled = true;
		});
		
		return name;
	}
	
	for (var i = favorites.length - 1; i >= 0; i--){
		scrollview.add(makeChannel(favorites[i]));
		incrementColumn();
	};
	
	Views.channel_favorites.hideList = function() {
		scrollview.visible = false;
		edit_favorites.visible = false;
	};
	
	var edit_favorites = Titanium.UI.createLabel({
		text:'Edit',
		color:'white',
		height:'auto',
		width:50,
		top:7,
		right:50,
		visible:true,
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:14
		},
		textAlign:'center'
		});
	
	edit_favorites.addEventListener('click', function() {
		
	});
	
	win.add(edit_favorites); 
	win.add(scrollview);
	
};