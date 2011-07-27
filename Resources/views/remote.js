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

	var home_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_home.png',
		backgroundSelectedImage:'images/remote_view/remote_home_down.png',
		height:19,
		width:20,
		top:5,
		right:5
	});
	
	home_button.addEventListener('click', Xbmc.action('menu'));

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
	
	var keyboard_field = Titanium.UI.createTextField({  
    width:0,
    height:0,
		top:0,
		autocorrect:false,
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    returnKeyType:Titanium.UI.RETURNKEY_DONE
	});
	if(Helpers.Application.isAndroid()) { keyboard_field.softKeyboardOnFocus = Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS }
	
	keyboard_field.addEventListener('change', function(e) {
		Xbmc.keyboard(e.value);
	});
	
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

	var arrow_controls = Titanium.UI.createView({
		backgroundImage:'images/remote_view/remote_mainbtns.png',
		top:35,
		width:188,
		height:188
	});

	var up_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_upbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_upbtn_down.png',
		height:17,
		width:30,
		top:22
	});
	
	up_button.addEventListener('click', Xbmc.action('up'));

	var down_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_downbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_downbtn_down.png',
		height:17,
		width:30,
		bottom:22
	});

	down_button.addEventListener('click', Xbmc.action('down'));

	var left_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_leftbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_leftbtn_down.png',
		height:30,
		width:17,
		left:24
	});
	
	left_button.addEventListener('click', Xbmc.action('left'));

	var right_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_rightbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_rightbtn_down.png',
		height:30,
		width:17,
		right:24
	});
	
	right_button.addEventListener('click', Xbmc.action('right'));

	var ok_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_okbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_okbtn_down.png',
		height:62,
		width:62
	});
	
	ok_button.addEventListener('click', Xbmc.action('select'));

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


	arrow_controls.add(up_button);
	arrow_controls.add(down_button);
	arrow_controls.add(left_button);
	arrow_controls.add(right_button);
	arrow_controls.add(ok_button);
	win.add(arrow_controls);

	color_buttons.add(blue_button);
	color_buttons.add(red_button);
	color_buttons.add(green_button);
	color_buttons.add(yellow_button);
	win.add(color_buttons);
};
