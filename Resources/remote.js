var win = Titanium.UI.currentWindow;

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

var down_button = Titanium.UI.createButton({
	title:'v',
	// backgroundImage:'',
	// backgroundSelectedImage:'',
	height:20,
	width:20,
	bottom:5
});

var left_button = Titanium.UI.createButton({
	title:'<',
	// backgroundImage:'',
	// backgroundSelectedImage:'',
	height:20,
	width:20,
	left:5
});

var right_button = Titanium.UI.createButton({
	title:'>',
	// backgroundImage:'',
	// backgroundSelectedImage:'',
	height:20,
	width:20,
	right:5
});

var ok_button = Titanium.UI.createButton({
	title:'ok',
	// backgroundImage:'',
	// backgroundSelectedImage:'',
	height:40,
	width:40
});


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