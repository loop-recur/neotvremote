Views.channels = function(win, favs) {
	var editing;
	var view = Titanium.UI.createView({top: "30dp"});
	
	var search = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_mag.png',
		height:"40dp",
		width:"40dp",
		top:"1dp",
		left:"1dp"
	});
	
	search.addEventListener('click', function() {
		App.action(win, "searches#index");
	});
	
	var home_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_home.png',
		backgroundSelectedImage:'images/remote_view/remote_home_down.png',
		height:"40dp",
		width:"40dp",
		top:"1dp",
		right:"5dp"
	});
	
	home_button.addEventListener('click', Xbmc.action('menu'));
	
	var channel_favorites = Titanium.UI.createButton({
		backgroundImage:'images/channel_view/channel_fav.png',
		backgroundSelectedImage:'images/channel_view/channel_fav_down.png',
		height:"40dp",
		width:"40dp",
		top:"1dp",
		right:"40dp"		
	});
	
	view.add(ChannelList);

	channel_favorites.addEventListener('click', toggleFavoriteMode);
	
	win.add(search);
	win.add(home_button);
	win.add(channel_favorites);
	win.add(view);
	
	win.addEventListener("favs", toggleFavoriteMode);
	if(favs) toggleFavoriteMode();
	
	function toggleFavoriteMode() {
		if(editing) {
			Ti.App.fireEvent("hideEdit");
			Ti.App.fireEvent("hideIndex");
			editing = false;
			win.remove(view);
			view = Titanium.UI.createView({top: "30dp"});
			win.add(view);
			view.add(ChannelList);
			channel_favorites.backgroundImage = 'images/channel_view/channel_fav.png';
		} else {
			editing = true
			view.remove(ChannelList);
			channel_favorites.backgroundImage = 'images/channel_view/channel_fav_on.png';
			App.action(view,"favorites#index", {win : win});
		}
	}
};
