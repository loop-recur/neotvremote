Views.favorites.edit = function(view, params, favorites) {
	var win = params.win;
	
	var edit_button = Titanium.UI.createView({
		backgroundImage:"images/channel_view/channel_done_button.png",
		backgroundSelectedImage:"images/channel_view/channel_done_button_down.png",
		height:"33dp",
		width:"61dp",
		top:"3dp",
		right:"80dp"
	});

	edit_button.addEventListener('click', function(){
		dealloc();
		App.action(view, "favorites#index", {win : win});
	});
	
	Ti.App.addEventListener("hideEdit", dealloc);
	
	function dealloc() {
		win.remove(edit_button);
		if(FavoritesList) view.remove(FavoritesList);
		FavoritesList = null;
	}
	
	win.add(edit_button);
	
	if(!FavoritesList) {
		Controllers.favorites.index(function(params, favs) {
			FavoritesList = Views.channel_list.create(Channels, favs);
			Views.channel_list.favoritesMode(FavoritesList.children, favs);
			view.add(FavoritesList);
		}, {});	
	} else {
		view.add(FavoritesList);
	}
}
