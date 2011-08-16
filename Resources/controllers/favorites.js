Controllers.favorites = function() {
	var name = "favorites";
	
	function index(view, params) {
<<<<<<< HEAD
		App.db.find("favorites", {}, compose(view, _makeFavs));
=======
		App.db.find(name, {}, compose(view.partial(params), _makeFavs));
>>>>>>> 3eba643ec22b66e1aa7f7925e28fc58e7df056c7
	}
	
	function edit(view, params) {
		view(params, params.favorites);
	}
	
	function _makeFavs(favorites) {
		return map(function(x){ return Channels[x.channel_id] }, favorites);
	}
		
	return {index : index, edit : edit}
}();
