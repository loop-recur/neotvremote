Views.favorites.edit = function(view, favorites) {
	var channel_list = Views.channel_list(Channels, favorites);
	
	var edit_button = Titanium.UI.createView({
		backgroundImage:"images/channel_view/channel_done_button.png",
		// title:"done",
		height:"33dp",
		width:"65dp",
		top:"-20dp",
		right:"60dp",
		zIndex:999
	});
	
	edit_button.addEventListener('click', function(){
		dealloc();
		App.action(view, "favorites#index");
	})
	
	function dealloc() {
		view.remove(edit_button);
		view.remove(channel_list);
	}
	
	view.add(edit_button);
	view.add(channel_list);
}