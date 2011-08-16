Controllers.favorites = function() {
	var name = "favorites";
	
	function index(view, params) {
		App.db.find(name, {}, compose(view.partial(params), _makeFavs));
	}
	
	function edit(view, params) {
		view(params, params.favorites);
	}
	
	function _makeFavs(xs) {
		return map(function(x){ return Channels[x.channel_id] }, xs);
	}
		
	return {index : index, edit : edit}
}();
