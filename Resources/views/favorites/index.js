Views.favorites.index = function(view, favorites) {
	var channel_list = Views.channel_list(favorites);
	
	var edit_button = Titanium.UI.createButton({
		title: "Edit",
		height:"25dp",
		width:"45dp",
		top:"5dp",
		right:"60dp"
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