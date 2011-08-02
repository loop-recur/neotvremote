var Favorites = function() {
	
	function toggleFavorite(id) {
		_findFavorite(id, function(favorites){
			(favorites.length > 1) ? _destroy(id) : _save(id);
		})
	}
	
	function _save(id) {
		App.db.save('favorites', {channel_id : id});		
	}
	
	function _destroy(id) {
		App.db.destroy('favorites', {channel_id : id});
	}
	
	function _findFavorite(id, fun) {
		App.db.find('favorites', {channel_id : id}, fun);
	}

	return {toggleFavorite: toggleFavorite}
}();
