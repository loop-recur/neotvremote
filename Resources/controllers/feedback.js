Controllers.feedback = function() {
	var name = "feedback";
	
	function index(view, params) {		
		App.db.find(name, {}, compose(view, init));
	}
	
	function init(feedbacks) {
		return (feedbacks[0] || {vibrate:0.0, sound:1.0});
	}
	
	function save(feedback) {
		App.db.save(name, feedback);
		Feedback.loadSettings(feedback);
	}
		
	return {index : index, save : save}
}();