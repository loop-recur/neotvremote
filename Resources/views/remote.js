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
		height:20,
		width:80,
		top:5,
		right:70
	});

	var facebook_like = Titanium.UI.createButton({
		title:'Like',
		backgroundImage:'images/remote_view/',
		backgroundSelectedImage:'images/remote_view/',
		height:20,
		width:60,
		top:5,
		right:170
	});
	
	var current_playing_view = Titanium.UI.createView({
		visible: false,
		top: 240,
		height: 50,
		width: 100,
		backgroundColor: "#fff"
	});
	
	var playing_image = Titanium.UI.createButton({
		width: 50,
		height: 50,
		left:0
	})
	
	var playing_label = Titanium.UI.createLabel({
		text: "nothing",
		width: 100,
		height: 100,
		color: "#000"
	});
	
	var like_button = Titanium.UI.createButton({
		title: "LIKE",
		height:19,
		width:40,
		top:5,
		right:5
	});
	
	like_button.addEventListener('click', Controllers.remote.postToWall.partial(playing_label, playing_image));
	
	current_playing_view.add(playing_image);
	current_playing_view.add(playing_label);
	current_playing_view.add(like_button);
	
	var home_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_home.png',
		backgroundSelectedImage:'images/remote_view/remote_home_down.png',
		height:19,
		width:20,
		top:5,
		right:5
	});
	
	home_button.addEventListener('click', compose(Xbmc.action('menu'), Controllers.remote.displayPlaying.curry(playing_label, playing_image, current_playing_view, null)));

	var return_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_backbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_backbtn_down.png',
		height:35,
		width:65,
		top:210,
		left:10
	});
	
	return_button.addEventListener('click', Xbmc.action('back'));
	
	var power_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_powerbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_powerbtn_down.png',
		height:46,
		width:46,
		top:45,
		left:15
	});
	
	power_button.addEventListener('click', Xbmc.sendKey('shutdown'));

	var keyboard_field = Helpers.ui.keyboard();
	
	var keyboard_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_keyboardbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_keyboardbtn_down.png',
		height:35,
		width:65,
		top:210,
		right:10
	});
	
	keyboard_button.addEventListener('click', function(){
		keyboard_field.focus();
	});
	
	var interface_button = Titanium.UI.createButton({
		title:'Gesture',
		height:35,
		width:75,
		top:40,
		right:10
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
		top:35,
		width:188,
		height:188,
		visible:false
	});

	gesture_controls.addEventListener('swipe', function(e)
	{
		alert(e.direction);
	});
	
	// ARROW CONTROL SECTION
	
	var arrow_controls = Titanium.UI.createView({
		backgroundImage:'images/remote_view/remote_mainbtns.png',
		top:35,
		width:188,
		height:188
	});

	var up_clickable = Titanium.UI.createView({
		top:22,
		width:60,
		height:37
	});
	
	var down_clickable = Titanium.UI.createView({
		bottom:22,
		width:60,
		height:37
	});
	
	var left_clickable = Titanium.UI.createView({
		left:24,
		height:60,
		width:37
	});
	
	var right_clickable = Titanium.UI.createView({
		right:24,
		height:60,
		width:37
	});
	
	var up_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_upbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_upbtn_down.png',
		height:17,
		width:30,
		top:0
	});
	
	up_clickable.addEventListener('click', Xbmc.action('up'));

	var down_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_downbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_downbtn_down.png',
		height:17,
		width:30,
		bottom:0
	});
	
	down_button.addEventListener('click', Xbmc.action('down'));

	var left_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_leftbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_leftbtn_down.png',
		height:30,
		width:17,
		left:0
	});
	
	left_button.addEventListener('click', Xbmc.action('left'));

	var right_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_rightbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_rightbtn_down.png',
		height:30,
		width:17,
		right:0
	});
	
	right_button.addEventListener('click', Xbmc.action('right'));
	
	var ok_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_okbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_okbtn_down.png',
		height:62,
		width:62
	});
	
	ok_button.addEventListener('click', compose(Xbmc.action('select'), Xbmc.currentPlaying.curry(Controllers.remote.displayPlaying.partial(playing_label, playing_image, current_playing_view))));

	var color_buttons = Titanium.UI.createView({
		bottom:0,
		height:60
	});

	var red_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_redbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_redbtn_down.png',
		height:38,
		width:38,
		left:33,
		bottom:14
	});

	var blue_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_bluebtn.png',
		backgroundSelectedImage:'images/remote_view/remote_bluebtn_down.png',
		height:38,
		width:38,
		left:105,
		bottom:2
	});

	var green_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_greenbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_greenbtn_down.png',
		height:38,
		width:38,
		right:105,
		bottom:2
	});

	var yellow_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_yellowbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_yellowbtn_down.png',
		height:38,
		width:38,
		right:33,
		bottom:14
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
