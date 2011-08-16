Controllers.favorites = function() {
	var name = "favorites";
	
	function index(view, params) {
		App.db.find(name, {}, compose(view.partial(params), _makeFavs));
	}
	
	function edit(view, params) {
		view(params, params.favorites);
	}
	
	function _makeFavs(favorites) {
		return map(function(x){ return Channels[x.channel_id] }, favorites);
	}
		
	return {index : index, edit : edit}
}();
