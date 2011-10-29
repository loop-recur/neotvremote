Views.favorites.edit = function(view, params, favorites) {
	var win = params.win;
	
	var done_button = Titanium.UI.createView({
		backgroundImage:"images/channel_view/channel_done_button.png",
		backgroundSelectedImage:"images/channel_view/channel_done_button_down.png",
		height:"33dp",
		width:"61dp",
		top:"3dp",
		right:"80dp"
	});

	done_button.addEventListener('click', function(){
		dealloc();
		App.action(view, "favorites#index", {win : win});
	});
	
	Eventer.set("hideFavEdit", dealloc);
	
	function dealloc() {
		win.remove(done_button);
		view.remove(FavoritesList);
	}
	
	win.add(done_button);
	view.add(FavoritesList);
}
