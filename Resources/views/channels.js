Views.channels = function(win) {
	var view = Titanium.UI.createView({top: "30dp"});
	
	var home_button = Titanium.UI.createButton({
		backgroundImage:'images/channel_view/channel_home.png',
		backgroundSelectedImage:'images/channel_view/channel_home_down.png',
		height:"19dp",
		width:"20dp",
		top:"5dp",
		right:"5dp"
	});
	
	var keyboard_field = Helpers.ui.keyboard();
	
	var keyboard_button = Titanium.UI.createButton({
		backgroundImage:'images/channel_view/channel_keyboard.png',
		backgroundSelectedImage:'images/channel_view/channel_keyboard_down.png',
		height:"25dp",
		width:"45dp",
		top:"5dp",
		left:"10dp"
	});	
	
	keyboard_button.addEventListener('click', function(){
		keyboard_field.focus();
	});
	
	var channel_favorites = Titanium.UI.createButton({
		backgroundImage:'images/channel_view/channel_fav.png',
		backgroundSelectedImage:'images/channel_view/channel_fav_down.png',
		height:"20dp",
		width:"20dp",
		top:"5dp",
		right:"30dp"		
	});
	
	var channel_list = Views.channel_list(Channels);

	var editing = false;
	
	channel_favorites.addEventListener('click', function(){
		if(!editing) {
			editing = true
			view.remove(channel_list);
			channel_favorites.backgroundImage = 'images/channel_view/channel_fav_on.png';
			App.action(view,"favorites#index", {win : win});
		} else {
			editing = false;
			map(function(v){ view.remove(v); }, view.children);
			view.add(channel_list);
			channel_favorites.backgroundImage = 'images/channel_view/channel_fav.png';
		}
	})
	
	view.add(channel_list);
	
	win.add(home_button);
	win.add(keyboard_field);
	win.add(keyboard_button);
	win.add(channel_favorites);
	win.add(view);
};
