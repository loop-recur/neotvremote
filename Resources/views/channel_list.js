Views.channel_list = function(channels, favorites) {
	var clickFun = favorites ? toggleFav : launchChannel;
	var default_settings = {height: "77dp", width: "90dp", left: "12.5dp", column_separation: "12.5dp", top: "2dp", row_separation: "10dp", rows_built: 0};
	var scrollview = Titanium.UI.createScrollView({
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
		
		if(favorites) addMask(channel_button);
				
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
	
	function getOpacity(channel_button) {
		if(Helpers.Application.isAndroid()) {
			// if (favorites.indexOf(channel_button.value) !== -1) {
			// 				channel_button.borderWidth = 5;
			// 				channel_button.borderColor = "#D3D22E";
			// 				channel_button.borderRadius = 5;
			// 			} else {
			// 				channel_button.borderWidth = 0;
			// 				channel_button.borderColor = "red";
			// 				channel_button.borderRadius = 0;	
			// };
			return (favorites.indexOf(channel_button.value) !== -1) ? 1 : 1;
		} else {
			return (favorites.indexOf(channel_button.value) !== -1) ? 1 : 0.2;			
		};
	}
	
	function launchChannel(e) {
		alert(e.source.value + " clicked!");
	}
	
	function toggleFav(e) {
		var channel = e.source.value;
		var index = Channels.indexOf(channel);
		Favorites.toggleFavorite(index);
		
		if(Helpers.Application.isAndroid()) {
			e.source.borderWidth = (e.source.borderWidth == 5) ? 0 : 5;
			e.source.borderColor = (e.source.borderColor == "#D3D22E") ? "red" : "#D3D22E";
			e.source.borderRadius = (e.source.borderRadius == 5) ? 0 : 5;
		} else {
			e.source.opacity = (e.source.opacity == 1) ? 0.5 : 1;
		}
	}
	
	return scrollview;
};
