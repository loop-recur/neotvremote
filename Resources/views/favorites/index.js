Views.favorites.index = function(view, params, favorites) {
	
	var win = params.win; 
	
	var channel_list = Views.channel_list(favorites);
	
	var edit_button = Titanium.UI.createView({
		backgroundImage:"images/channel_view/channel_edit_button.png",
		height:"21dp",
		width:"43dp",
		top:"5dp",
		right:"60dp"
	});

	edit_button.addEventListener('click', function() {
		dealloc();
		App.action(view, "favorites#edit", {favorites : favorites, win : win});
	});
	
	Ti.App.addEventListener("hideIndex", dealloc);
	
	function dealloc() {
		win.remove(edit_button);
		view.remove(channel_list);
	}
	
	view.add(channel_list);
	win.add(edit_button);
}