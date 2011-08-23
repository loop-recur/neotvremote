Controllers.feedback = function() {
	var name = "feedback";
	
	function index(view, params) {		
		App.db.find(name, {}, compose(view, init));
	}
	
	function init(feedbacks) {
		return (feedbacks[0] || {vibrate:1, sound:1});
	}
	
	function save(feedback) {
		compose(Feedback.loadSettings, App.db.save.partial(name))(feedback);
	}
		
	return {index : index, save : save}
}();