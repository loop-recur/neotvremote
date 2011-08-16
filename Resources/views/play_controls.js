Views.play_controls = function(win) {
	
	var view = Titanium.UI.createView({
		height:"65dp",
		width:"180dp",
		top:"305dp"
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
		height:"63dp",
		width:"63dp"
	});
	
	play_button.addEventListener('click', Xbmc.action("play"));
	
	var pause_button = Titanium.UI.createButton({
		backgroundImage:'images/playcontrols/remote_pause.png',
		backgroundSelectedImage:'images/playcontrols/remote_pause_down.png',
		height:"63dp",
		width:"63dp"
	});
	
	pause_button.addEventListener("click", Xbmc.action("pause"));
	
	var stop_button = Titanium.UI.createButton({
		backgroundImage:'images/playcontrols/remote_stop.png',
		backgroundSelectedImage:'images/playcontrols/remote_stop_down.png',
		height:"63dp",
		width:"63dp"
	});
	
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
	view.add(ff_button);

	win.add(view);
	
};
