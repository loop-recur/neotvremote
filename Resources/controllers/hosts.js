Controllers.hosts = function() {
	var name = "hosts";
	
	function index(view, params) {
		App.db.find(name, {}, view);
	}
		
	return {index : index}
}();
