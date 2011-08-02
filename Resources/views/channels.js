Views.channels = function(win) {
	
	var home_button = Titanium.UI.createButton({
		backgroundImage:'images/channel_view/channel_home.png',
		backgroundSelectedImage:'images/channel_view/channel_home_down.png',
		height:19,
		width:20,
		top:5,
		right:5
	});
	
	var keyboard_button = Titanium.UI.createButton({
		backgroundImage:'images/channel_view/channel_keyboard.png',
		backgroundSelectedImage:'images/channel_view/channel_keyboard_down.png',
		height:25,
		width:45,
		top:5,
		left:10
	});
	
	var channel_favorites = Titanium.UI.createButton({
		backgroundImage:'images/channel_view/channel_fav.png',
		backgroundSelectedImage:'images/channel_view/channel_fav_down.png',
		height:20,
		width:20,
		top:5,
		right:30		
	});
	
	channel_favorites.addEventListener('click', function() {		
		
	});
	
	Views.channel_list(win, Channels);
	
	win.add(home_button);
	win.add(keyboard_button);
	win.add(channel_favorites);
	
};
