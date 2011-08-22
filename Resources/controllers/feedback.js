Controllers.feedback = function() {
	var name = "feedback";
	
	function index(view, params) {
		view();
	}
		
	return {index : index}
}();