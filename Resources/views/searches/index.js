Views.searches.index = function(win) {
	var view = Ti.UI.createView({
		fullscreen : true,
		backgroundImage:'images/channel_view/channel_bg.png'
	});
	
	var result_view = makeView(Channels);

	var search = Titanium.UI.createSearchBar({
		barColor:'black',
		showCancel:true,
		hintText:'Enter a channel...',
		height:40,
		top:0
	});
	
	search.addEventListener('cancel', function(e)
	{ 
		win.remove(view);
	});
	
	search.addEventListener('return', function(e)
	{
		search.blur();
	});
	
	search.addEventListener('change', function(e) {
		var val = e.value.toLowerCase();
		updateChannels(val);
	});
	
	view.add(search);
	view.add(result_view);
	
	win.add(view);
	
	
	function updateChannels(val) {
		view.remove(result_view);
		result_view = makeView(foundChannels(val));
		view.add(result_view);
	}
	
	function foundChannels(val, channels) {
		var isMatch = function(x) { return (x.indexOf(val) != -1); };
		return select(isMatch, Channels);
	};
	
	function makeView(channels) {
		return Views.channel_list(channels);
	}
};
