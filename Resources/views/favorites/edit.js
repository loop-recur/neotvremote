Views.favorites.edit = function(view, favorites) {
	var channel_list = Views.channel_list(Channels, favorites);
	
	var edit_button = Titanium.UI.createButton({
		title: "Stop Editting",
		height:25,
		width:105,
		top:5,
		right:30
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