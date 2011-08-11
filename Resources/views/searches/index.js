Views.searches.index = function(win) {
	var view = Ti.UI.createView({
		fullscreen : true,
		backgroundImage:'images/channel_view/channel_bg.png'
	});
	
	var results = Ti.UI.createView({
		top:"40dp"
	});
	
	var result_view = makeView(Channels);

	var search = Titanium.UI.createSearchBar({
		barColor:'black',
		showCancel:true,
		hintText:'Enter a channel...',
		height:"40dp",
		top:"0dp"
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
	view.add(results);
	
	results.add(result_view);
	search.focus();
	
	win.add(view);
	
	
	function updateChannels(val) {
		results.remove(result_view);
		result_view = makeView(foundChannels(val));
		results.add(result_view);
	}
	
	function foundChannels(val, channels) {
		var isMatch = function(x) { return (x.indexOf(val) != -1); };
		return select(isMatch, Channels);
	};
	
	function makeView(channels) {
		return Views.channel_list(channels);
	}
};
