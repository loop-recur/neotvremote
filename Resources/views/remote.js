Views.remote = function(win) {
	var search = Titanium.UI.createButton({
		title:'Search',
		// backgroundImage:'',
		// backgroundSelectedImage:'',
		height:20,
		width:70,
		top:5,
		left:5
	});

	var favorites = Titanium.UI.createButton({
		title:'Favorites',
		// backgroundImage:'',
		// backgroundSelectedImage:'',
		height:20,
		width:80,
		top:5,
		right:70
	});

	var facebook_like = Titanium.UI.createButton({
		title:'Like',
		// backgroundImage:'',
		// backgroundSelectedImage:'',
		height:20,
		width:60,
		top:5,
		right:5
	});

	var home_button = Titanium.UI.createButton({
		title:'home',
		// backgroundImage:'',
		// backgroundSelectedImage:'',
		height:20,
		width:60,
		top:30,
		right:5
	});

	var return_button = Titanium.UI.createButton({
		title:'return',
		// backgroundImage:'',
		// backgroundSelectedImage:'',
		height:20,
		width:60,
		top:55,
		right:5
	});
	
	return_button.addEventListener('click', Xbmc.sendKey('return'));
	
	var keyboard_field = Titanium.UI.createTextField({  
	    width:0,
	    height:0,
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	    returnKeyType:Titanium.UI.RETURNKEY_DONE
	});
	
	keyboard_field.addEventListener('change', Xbmc.keyboard);
	
	var keyboard_button = Titanium.UI.createButton({
		title:'keyboard',
		height:20,
		width:80,
		top:80,
		right:5
	});
	
	keyboard_button.addEventListener('click', function(){
		keyboard_field.focus();
	});

	var arrow_controls = Titanium.UI.createView({
		top:40,
		width:100,
		height:100,
		backgroundColor:'gray'
	});

	var up_button = Titanium.UI.createButton({
		title:'^',
		// backgroundImage:'',
		// backgroundSelectedImage:'',
		height:20,
		width:20,
		top:5
	});
	
	up_button.addEventListener('click', Xbmc.sendKey('up'));

	var down_button = Titanium.UI.createButton({
		title:'v',
		// backgroundImage:'',
		// backgroundSelectedImage:'',
		height:20,
		width:20,
		bottom:5
	});

	down_button.addEventListener('click', Xbmc.sendKey('down'));

	var left_button = Titanium.UI.createButton({
		title:'<',
		// backgroundImage:'',
		// backgroundSelectedImage:'',
		height:20,
		width:20,
		left:5
	});
	
	left_button.addEventListener('click', Xbmc.sendKey('left'));

	var right_button = Titanium.UI.createButton({
		title:'>',
		// backgroundImage:'',
		// backgroundSelectedImage:'',
		height:20,
		width:20,
		right:5
	});
	
	right_button.addEventListener('click', Xbmc.sendKey('right'));

	var ok_button = Titanium.UI.createButton({
		title:'ok',
		// backgroundImage:'',
		// backgroundSelectedImage:'',
		height:40,
		width:40
	});
	
	ok_button.addEventListener('click', Xbmc.sendKey('ok'));

	var color_buttons = Titanium.UI.createView({
		top:350,
		height:30, 
		backgroundColor:'gray'
	});

	var red_button = Titanium.UI.createButton({
		backgroundColor:'red',
		// backgroundImage:'',
		// backgroundSelectedImage:'',
		height:20,
		width:20,
		left:48
	});

	var blue_button = Titanium.UI.createButton({
		backgroundColor:'blue',
		// backgroundImage:'',
		// backgroundSelectedImage:'',
		height:20,
		width:20,
		left:116
	});

	var green_button = Titanium.UI.createButton({
		backgroundColor:'green',
		// backgroundImage:'',
		// backgroundSelectedImage:'',
		height:20,
		width:20,
		right:116
	});


	var yellow_button = Titanium.UI.createButton({
		backgroundColor:'yellow',
		// backgroundImage:'',
		// backgroundSelectedImage:'',
		height:20,
		width:20,
		right:48
	});

	win.add(search);
	win.add(favorites);
	win.add(facebook_like);
	win.add(home_button);
	win.add(return_button);
	win.add(keyboard_field);
	win.add(keyboard_button);


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
