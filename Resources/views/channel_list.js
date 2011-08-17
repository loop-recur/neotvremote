Views.channel_list = function(view, channels, favorites) {
	var clickFun = favorites ? toggleFav : launchChannel;
	var default_settings = {height: "77dp", width: "90dp", left: "12.5dp", column_separation: "12.5dp", top: "2dp", row_separation: "10dp", rows_built: 0};
	var scrollview = view || Titanium.UI.createScrollView({
		height:"365dp",
		width:"320dp",
		contentWidth:"auto",
		contentHeight:'auto',
		showHorizontalScrollIndicator:false,
		showVerticalScrollIndicator:true
	});

	reduce(makeChannel, {settings: default_settings, amount: 0}, channels);
	
	function makeChannel(config, name) {
		var new_settings = getNewSettings(config.settings, config.amount);
		
		var channel_button = Titanium.UI.createView({
			backgroundImage: Channel.imagePath(name),
			height:new_settings.height,
			width:new_settings.width,
			top:new_settings.top,
			left:new_settings.left,
			id:name,
			value:name
		});
		
		if(favorites && !Helpers.Application.isAndroid()) addMask(channel_button);
		if(favorites && Helpers.Application.isAndroid()) addAndroidMask(channel_button);
				
		channel_button.addEventListener('click', clickFun);
		
		scrollview.add(channel_button);
		
		return {settings: new_settings, amount: config.amount+1};
	}
	
	function getNewSettings(settings, amount) {
		var top = settings.top;
		var rows_built = settings.rows_built;
		var left = Helpers.Application.addDp(settings.left, settings.width, settings.column_separation);
		
		if(amount % 3 == 0) {
			rows_built = rows_built + 1;
			top = Helpers.Application.addDp(settings.top, settings.height, settings.row_separation, settings.rows_built);
			left = default_settings.left;
		}
		
		if(amount == 0) top = 0;
		
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
	
	function addMask(channel_button) {
		channel_button.opacity = getOpacity(channel_button);
	}
	
	function addAndroidMask(button) {
		button.borderWidth = 5;
		button.borderRadius = 5;
		button.borderColor = (favorites.indexOf(button.value) !== -1) ? "#D3D22E" : "black";
	}

	function getOpacity(channel_button) {
		return (favorites.indexOf(channel_button.value) !== -1) ? 1 : 0.2;
	}
	
	function launchChannel(e) {
		alert(e.source.value + " clicked!");
	}
	
	function toggleFav(e) {
		var channel = e.source.value;
		var index = Channels.indexOf(channel);
		Favorites.toggleFavorite(index);
		
		if(Helpers.Application.isAndroid()) {
			e.source.borderColor = (e.source.borderColor == "black")  ? "#D3D22E" : "black";
		} else {
			e.source.opacity = (e.source.opacity == 1) ? 0.5 : 1;
		}
	}
	
	return scrollview;
};
