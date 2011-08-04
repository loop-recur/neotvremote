Views.channels = function(win) {
	var view = Titanium.UI.createView({top: 30});
	
	var home_button = Titanium.UI.createButton({
		backgroundImage:'images/channel_view/channel_home.png',
		backgroundSelectedImage:'images/channel_view/channel_home_down.png',
		height:19,
		width:20,
		top:5,
		right:5
	});
	
	var keyboard_field = Helpers.ui.keyboard();
	
	var keyboard_button = Titanium.UI.createButton({
		backgroundImage:'images/channel_view/channel_keyboard.png',
		backgroundSelectedImage:'images/channel_view/channel_keyboard_down.png',
		height:25,
		width:45,
		top:5,
		left:10
	});	
	
	keyboard_button.addEventListener('click', function(){
		keyboard_field.focus();
	});
	
	var channel_favorites = Titanium.UI.createButton({
		backgroundImage:'images/channel_view/channel_fav.png',
		backgroundSelectedImage:'images/channel_view/channel_fav_down.png',
		height:20,
		width:20,
		top:5,
		right:30		
	});
	
	var channel_list = Views.channel_list(Channels);

	var editing = false;
	channel_favorites.addEventListener('click', function(){
		if(!editing) {
			editing = true
			view.remove(channel_list);
			App.action(view, "favorites#index");
		} else {
			editing = false;
			map(function(v){ view.remove(v); }, view.children);
			view.add(channel_list);
		}
	})
	
	view.add(channel_list);
	
	win.add(home_button);
	win.add(keyboard_field);
	win.add(keyboard_button);
	win.add(channel_favorites);
	win.add(view);
};
