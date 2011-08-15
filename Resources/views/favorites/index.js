Views.favorites.index = function(view, favorites) {
	var channel_list = Views.channel_list(favorites);
	
	var edit_button = Titanium.UI.createView({
		backgroundImage:"images/channel_view/channel_edit_button.png",
		// title:"edit",
		height:"33dp",
		width:"65dp",
		top:"-20dp",
		right:"60dp",
		zIndex:999
	});
	
	edit_button.addEventListener('click', function(){
		dealloc();
		App.action(view, "favorites#edit", {favorites : favorites});
	})
	
	function dealloc() {
		view.remove(edit_button);
		view.remove(channel_list);
	}
	
	view.add(edit_button);
	view.add(channel_list);
}