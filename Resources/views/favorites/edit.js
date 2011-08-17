Views.favorites.edit = function(view, params, favorites) {

	var win = params.win;
	
	var channel_list = Titanium.UI.createScrollView({
		top: "4dp",
		height:"365dp",
		width:"320dp",
		contentWidth:"auto",
		contentHeight:'auto',
		showHorizontalScrollIndicator:false,
		showVerticalScrollIndicator:true
	});
	
	view.add(channel_list);
	
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
		view.remove(channel_list);
	}
		
	win.add(edit_button);
	Views.channel_list(channel_list, Channels, favorites);
}