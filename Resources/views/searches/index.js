Views.searches.index = function(win) {
	var updateFun = Helpers.Application.isAndroid() ? updateDelayed : updateChannels;
	var view = Ti.UI.createView({
		fullscreen : true,
		backgroundImage:'images/channel_view/channel_bg.png'
	});
	
	var results = Ti.UI.createView({
		top:"40dp"
	});
	
	var result_view = makeView([]);

	var search = Titanium.UI.createSearchBar({
		barColor:'black',
		showCancel:true,
		hintText:'Enter a channel...',
		height:"40dp",
		top:"0dp"
	});
	
	search.addEventListener('cancel', function(e) { 
		win.remove(view);
	});
	
	search.addEventListener('return', function(e) {
		search.blur();
	});
	
	search.addEventListener('change', function(e) {
		updateFun(e.value.toLowerCase());
	});
	
	view.add(search);
	view.add(results);
	
	results.add(result_view);
	search.focus();
	
	win.add(view);
	
	function updateDelayed(val) {
		var _updateIfDifferent = function(v){ if(search.value == v) updateChannels(v); };
		setTimeout(_updateIfDifferent.partial(val), 100);
	}
		
	function updateChannels(val) {
		var new_view = makeView(foundChannels(val));
		results.add(new_view);
		results.remove(result_view);
		result_view = new_view;
	}
	
	function foundChannels(val, channels) {
		if(!val) return [];
		var isMatch = function(x) { return (x.toLowerCase().indexOf(val) != -1); };
		return compose(take.partial(9), select.partial(isMatch))(Channels);
	};
	
	function makeView(channels) {
		return Views.channel_list.create(channels);
	}
};
