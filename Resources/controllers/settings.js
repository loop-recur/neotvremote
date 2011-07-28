Controllers.settings = function() {
	var name = "settings";
	
	function index(view, params) {
		App.db.find(name, {}, view);
	}
		
	return {index : index}
}();
