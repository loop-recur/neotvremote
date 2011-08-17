Views.favorites.edit = function(view, params, favorites) {

	var win = params.win;

	var channel_list = Views.channel_list(Channels, favorites);
	
	var edit_button = Titanium.UI.createView({
		backgroundImage:"images/channel_view/channel_done_button.png",
		backgroundSelectedImage:"images/channel_view/channel_done_button_down.png",
		// title:"done",
		height:"33dp",
		width:"61dp",
		top:"3dp",
		right:"80dp"
	});

	edit_button.addEventListener('click', function(){
		dealloc();
		App.action(view, "favorites#index", {win : win});
	})
	
	function dealloc() {
		win.remove(edit_button);
		view.remove(channel_list);
	}
		
	view.add(channel_list);
	win.add(edit_button);
}