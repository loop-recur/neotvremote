Views.play_controls = function(win) {
	
	var view = Titanium.UI.createView({
		height:"65dp",
		width:"180dp",
		top:"295dp"
	});
	
	var rewind_button = Titanium.UI.createButton({
		backgroundImage:'images/playcontrols/remote_rewind.png',
		backgroundSelectedImage:'images/playcontrols/remote_rewind_down.png',
		height:"43dp",
		width:"43dp",
		left:"3dp"
	});
	
	rewind_button.addEventListener('touchstart', Controllers.remote.button("reverse"));

	var play_pause_button = Titanium.UI.createButton({
		backgroundImage:'images/playcontrols/remote_play_pause.png',
		backgroundSelectedImage:'images/playcontrols/remote_play_pause.png',
		height:"44dp",
		width:"56dp"
	});
	
	play_pause_button.addEventListener('touchstart', Controllers.remote.button("select"));
	
	var ff_button = Titanium.UI.createButton({
		backgroundImage:'images/playcontrols/remote_ff.png',
		backgroundSelectedImage:'images/playcontrols/remote_ff_down.png',
		height:"43dp",
		width:"43dp",
		right:"3dp"
	});
	
	ff_button.addEventListener("touchstart", Controllers.remote.button("forward"));
	
	view.add(rewind_button);
	view.add(play_pause_button);
	view.add(ff_button);

	win.add(view);
	
};
