Views.remote = function(win) {
	
	var search = Titanium.UI.createButton({
		title:'Search',
		backgroundImage:'images/remote_view/',
		backgroundSelectedImage:'images/remote_view/',
		height:20,
		width:70,
		top:5,
		left:5
	});
	
	search.addEventListener('click', function() {
		App.action(win, "searches#index");
	});

	var favorites = Titanium.UI.createButton({
		title:'Favorites',
		backgroundImage:'images/remote_view/',
		backgroundSelectedImage:'images/remote_view/',
		height:"20dp",
		width:"80dp",
		top:"5dp",
		right:"70dp"
	});

	var facebook_like = Titanium.UI.createButton({
		title:'Like',
		backgroundImage:'images/remote_view/',
		backgroundSelectedImage:'images/remote_view/',
		height:"20dp",
		width:"60dp",
		top:"5dp",
		right:"170dp"
	});
	
	var current_playing_view = Titanium.UI.createView({
		visible: false,
		top: "240dp",
		height: "50dp",
		width: "100dp",
		backgroundColor: "#fff"
	});
	
	var playing_image = Titanium.UI.createButton({
		width: "50dp",
		height: "50dp",
		left:"0dp"
	})
	
	var playing_label = Titanium.UI.createLabel({
		text: "nothing",
		width: "100dp",
		height: "100dp",
		color: "#000"
	});
	
	var like_button = Titanium.UI.createButton({
		title: "LIKE",
		height:"19dp",
		width:"40dp",
		top:"5dp",
		right:"5dp"
	});
	
	like_button.addEventListener('click', Controllers.remote.postToWall.partial(playing_label, playing_image));
	
	current_playing_view.add(playing_image);
	current_playing_view.add(playing_label);
	current_playing_view.add(like_button);
	
	var home_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_home.png',
		backgroundSelectedImage:'images/remote_view/remote_home_down.png',
		height:"19dp",
		width:"20dp",
		top:"5dp",
		right:"5dp"
	});
	
	home_button.addEventListener('click', compose(Xbmc.action('menu'), Controllers.remote.displayPlaying.curry(playing_label, playing_image, current_playing_view, null)));

	var return_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_backbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_backbtn_down.png',
		height:"35dp",
		width:"65dp",
		top:"210dp",
		left:"10dp"
	});
	
	return_button.addEventListener('click', Xbmc.action('back'));
	
	var power_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_powerbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_powerbtn_down.png',
		height:"46dp",
		width:"46dp",
		top:"45dp",
		left:"15dp"
	});
	
	power_button.addEventListener('click', Xbmc.sendKey('shutdown'));

	var keyboard_field = Helpers.ui.keyboard();
	
	var keyboard_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_keyboardbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_keyboardbtn_down.png',
		height:"35dp",
		width:"65dp",
		top:"210dp",
		right:"10dp"
	});
	
	keyboard_button.addEventListener('click', function(){
		keyboard_field.focus();
	});
	
	var interface_button = Titanium.UI.createButton({
		title:'Gesture',
		height:"35dp",
		width:"75dp",
		top:"40dp",
		right:"10dp"
	});
	
	interface_button.addEventListener('click', function(){
		if(gesture_controls.visible == false) {
			arrow_controls.visible = false;
			gesture_controls.visible = true;
			interface_button.title = "Gesture";
		} else {
			arrow_controls.visible = true;
			gesture_controls.visible = false;
			interface_button.title = "Arrow";
		}
	});
	
	// GESTURES SECTION
	
	var gesture_controls = Titanium.UI.createView({
		backgroundImage:'images/remote_view/remote_mainbtns.png',
		top:"35dp",
		width:"188dp",
		height:"188dp",
		visible:false
	});

	gesture_controls.addEventListener('swipe', function(e)
	{
		alert(e.direction);
	});
	
	// ARROW CONTROL SECTION
	
	var arrow_controls = Titanium.UI.createView({
		backgroundImage:'images/remote_view/remote_mainbtns.png',
		top:"35dp",
		width:"188dp",
		height:"188dp"
	});

	var up_clickable = Titanium.UI.createView({
		top:"22dp",
		width:"60dp",
		height:"37dp"
	});
	
	var down_clickable = Titanium.UI.createView({
		bottom:"22dp",
		width:"60dp",
		height:"37dp"
	});
	
	var left_clickable = Titanium.UI.createView({
		left:"24dp",
		height:"60dp",
		width:"37dp"
	});
	
	var right_clickable = Titanium.UI.createView({
		right:"24dp",
		height:"60dp",
		width:"37dp"
	});
	
	var up_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_upbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_upbtn_down.png',
		height:"17dp",
		width:"30dp",
		top:"0dp"
	});
	
	up_clickable.addEventListener('click', compose(Xbmc.action('up'), Feedback.buttonPress));

	var down_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_downbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_downbtn_down.png',
		height:"17dp",
		width:"30dp",
		bottom:"0dp"
	});
	
	down_button.addEventListener('click', compose(Xbmc.action('down'), Feedback.buttonPress));

	var left_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_leftbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_leftbtn_down.png',
		height:"30dp",
		width:"17dp",
		left:"0dp"
	});
	
	left_button.addEventListener('click', compose(Xbmc.action('left'), Feedback.buttonPress));

	var right_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_rightbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_rightbtn_down.png',
		height:"30dp",
		width:"17dp",
		right:"0dp"
	});
	
	right_button.addEventListener('click', compose(Xbmc.action('right'), Feedback.buttonPress));
	
	var ok_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_okbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_okbtn_down.png',
		height:"62dp",
		width:"62dp"
	});
	
	ok_button.addEventListener('click', compose(Xbmc.action('select'), Xbmc.currentPlaying.curry(Controllers.remote.displayPlaying.partial(playing_label, playing_image, current_playing_view))));

	var color_buttons = Titanium.UI.createView({
		bottom:"0dp",
		height:"60dp"
	});

	var red_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_redbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_redbtn_down.png',
		height:"38dp",
		width:"38dp",
		left:"33dp",
		bottom:"14dp"
	});

	var blue_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_bluebtn.png',
		backgroundSelectedImage:'images/remote_view/remote_bluebtn_down.png',
		height:"38dp",
		width:"38dp",
		left:"105dp",
		bottom:"2dp"
	});

	var green_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_greenbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_greenbtn_down.png',
		height:"38dp",
		width:"38dp",
		right:"105dp",
		bottom:"2dp"
	});

	var yellow_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_yellowbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_yellowbtn_down.png',
		height:"38dp",
		width:"38dp",
		right:"33dp",
		bottom:"14dp"
	});

	win.add(search);
	win.add(favorites);
	win.add(facebook_like);
	win.add(home_button);
	win.add(return_button);
	win.add(keyboard_field);
	win.add(keyboard_button);
	win.add(power_button);


	up_clickable.add(up_button);
	down_clickable.add(down_button);
	left_clickable.add(left_button);
	right_clickable.add(right_button);
	
	arrow_controls.add(ok_button);
	arrow_controls.add(up_clickable);
	arrow_controls.add(down_clickable);
	arrow_controls.add(left_clickable);
	arrow_controls.add(right_clickable);

	win.add(gesture_controls);
	win.add(interface_button);
	
	win.add(arrow_controls);

	color_buttons.add(blue_button);
	color_buttons.add(red_button);
	color_buttons.add(green_button);
	color_buttons.add(yellow_button);
	win.add(color_buttons);
	win.add(current_playing_view);		
};
