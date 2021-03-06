Views.favorites.index = function(view, params, favorites) {
	
	var win = params.win; 
	var channel_list = Views.channel_list.create(favorites);
		
	setTimeout(function() {
		Views.channel_list.launchMode(channel_list.children, true);
	},100);
	
	view.add(channel_list);
	
	var edit_button = Titanium.UI.createView({
		backgroundImage:"images/channel_view/channel_edit_button.png",
		backgroundSelectedImage:"images/channel_view/channel_edit_button_down.png",
		height:"33dp",
		width:"61dp",
		top:"3dp",
		right:"80dp"
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
	
	win.add(edit_button);
}