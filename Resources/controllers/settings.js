Controllers.settings = function() {
	
	function index(view, params) {
		view();
	}
		
	return {index : index}
}();