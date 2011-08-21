Views.feedback.index = function(win) {
	var view = Ti.UI.createView({fullscreen : true, backgroundColor: "red"});

	Helpers.ui.addNav(win, "Back", Views.settings.index);

	win.add(view);

};