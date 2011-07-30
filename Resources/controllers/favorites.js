Controllers.favorites = function() {
	var name = "favorites";
	
	function index(view, params) {
		App.db.find(name, {}, view);
	}
		
	return {index : index}
}();
