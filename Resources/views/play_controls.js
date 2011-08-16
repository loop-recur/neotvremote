Views.play_controls = function(win) {
	
	var view = Titanium.UI.createView({
		height:"65dp",
		width:"210dp",
		top:"295dp"
	});
	
	var rewind_button = Titanium.UI.createButton({
		backgroundImage:'images/playcontrols/remote_rewind.png',
		backgroundSelectedImage:'images/playcontrols/remote_rewind_down.png',
		height:"43dp",
		width:"43dp",
		left:"3dp"
	});
	
	rewind_button.addEventListener('click', Xbmc.action("reverse"));

	var play_button = Titanium.UI.createButton({
		backgroundImage:'images/playcontrols/remote_play.png',
		backgroundSelectedImage:'images/playcontrols/remote_play_down.png',
		height:"48dp",
		width:"48dp",
		left:"53dp"
	});
	
	play_button.addEventListener('click', Xbmc.action("play"));
	
	var pause_button = Titanium.UI.createButton({
		backgroundImage:'images/playcontrols/remote_pause.png',
		height:"48dp",
		width:"48dp",
		right:"53dp"
	});
	
	pause_button.addEventListener("click", Xbmc.action("pause"));
	
	var ff_button = Titanium.UI.createButton({
		backgroundImage:'images/playcontrols/remote_ff.png',
		backgroundSelectedImage:'images/playcontrols/remote_ff_down.png',
		height:"43dp",
		width:"43dp",
		right:"3dp"
	});
	
	ff_button.addEventListener("click", Xbmc.action("forward"));
	
	view.add(rewind_button);
	view.add(play_button);
	view.add(pause_button);
	view.add(ff_button);

	win.add(view);
	
};
