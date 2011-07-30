Views.searches.index = function(win) {
	var view = Ti.UI.createView({fullscreen : true, backgroundColor: "#fff"});
	var result_view = makeView(Channels);
	
	var search_field = Ti.UI.createTextField({
		backgroundColor:'gray',
		hintText:"Enter a channel...",
		top:10,
		height:35,
		width:250,
		keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
		returnKeyType:Titanium.UI.RETURNKEY_DONE
	});
	
	search_field.addEventListener('change', function(e) {
		var val = e.value.toLowerCase();
		updateChannels(val);
	});
	
	view.add(search_field);
	win.add(view);
	
	
	function updateChannels(val) {
		view.remove(result_view);
		result_view = makeView(foundChannels(val));
	}
	
	function foundChannels(val, channels) {
		var isMatch = function(x) { return (x.indexOf(val) != -1); };
		return Functional.select(isMatch, Channels);
	};
	
	function makeView(channels) {
		return Views.channel_list(view, channels);
	}
};
