Views.remote = function(win) {	
	
	var search = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_mag.png',
		height:"40dp",
		width:"40dp",
		top:"1dp",
		left:"5dp"
	});
	
	search.addEventListener('click', function() {
		App.action(win, "searches#index");
	});

	var channel_favorites = Titanium.UI.createButton({
		backgroundImage:'images/channel_view/channel_fav.png',
		backgroundSelectedImage:'images/channel_view/channel_fav_down.png',
		height:"40dp",
		width:"40dp",
		top:"1dp",
		right:"40dp"		
	});
	
	channel_favorites.addEventListener('click', function() {
		Layouts.application.openFavs();
	});
	
	var current_playing_view = Titanium.UI.createView({
		backgroundImage:'images/nowplaying/remote_now_showing_pane.png',
		visible: false,
		top: "235dp",
		height: "66dp",
		width: "270dp",
	});
	
	var playing_image = Titanium.UI.createButton({
		width: "35dp",
		height: "35dp",
		left:"10dp",
		top:"5dp"
	})
	
	var playing_label = Titanium.UI.createLabel({
		text: "nothing",
		width: "175dp",
		height: "25dp",
		top:"8dp",
		left:"52dp",
		color:"#FFFFFF",
		font:{fontFamily:'Helvetica Neue',fontSize:"18dp"},
	});

	var like_button = Titanium.UI.createButton({
		backgroundImage:"images/nowplaying/remote_fblike.png",
		height:"40dp",
		width:"40dp",
		top:"2dp",
		right:"15dp"
	});
	
	like_button.addEventListener('click', Controllers.remote.postToWall.partial(playing_label, playing_image));
	
	current_playing_view.add(playing_image);
	current_playing_view.add(playing_label);
	current_playing_view.add(like_button);
	
	var home_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_home.png',
		backgroundSelectedImage:'images/remote_view/remote_home_down.png',
		height:"40dp",
		width:"40dp",
		top:"1dp",
		right:"5dp"
	});
	
	home_button.addEventListener('click', compose(Xbmc.action('menu'), Controllers.remote.displayPlaying.curry(playing_label, playing_image, current_playing_view, null)));

	var return_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_backbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_backbtn_down.png',
		height:"35dp",
		width:"65dp",
		top:"195dp",
		left:"10dp"
	});
	
	return_button.addEventListener('click', Controllers.remote.button("back"));
	
	var power_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_powerbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_powerbtn_down.png',
		height:"46dp",
		width:"46dp",
		top:"45dp",
		left:"15dp"
	});
	
	power_button.addEventListener('click', function() {
		Helpers.ui.confirm("Shutdown NeoTV?", {
			yes : function() {
				Xbmc.sendKey('shutdown');
			},
			cancel : function() {}
		});
	});

	var keyboard_field = Helpers.ui.keyboard();

	var keyboard_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_keyboardbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_keyboardbtn_down.png',
		height:"35dp",
		width:"65dp",
		top:"195dp",
		right:"10dp"
	});
	
	keyboard_button.addEventListener('click', function(){
		keyboard_field.focus();
	});
	
	if(Helpers.Application.isAndroid()) {
		keyboard_field.addEventListener('return', function() {
			keyboard_field2.focus();
		});
	};
	
	var keyboard_field2 = Titanium.UI.createTextField({  
	  width:0,
	  height:0,
		top:0,
		autocorrect:false,
	  keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	  returnKeyType:Titanium.UI.RETURNKEY_DONE
	});
	
	var arrow_controls = Titanium.UI.createView({
		backgroundImage:'images/remote_view/remote_mainbtns.png',
		top:"35dp",
		width:"188dp",
		height:"188dp"
	});

	var up_clickable = Titanium.UI.createView({
		top:"0dp",
		width:"60dp",
		height:"60dp"
	});
	
	var down_clickable = Titanium.UI.createView({
		bottom:"0dp",
		width:"60dp",
		height:"60dp"
	});
	
	var left_clickable = Titanium.UI.createView({
		left:"0dp",
		height:"60dp",
		width:"60dp"
	});
	
	var right_clickable = Titanium.UI.createView({
		right:"0dp",
		height:"60dp",
		width:"60dp"
	});
	
	var up_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_upbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_upbtn_down.png',
		height:"17dp",
		width:"30dp",
		top:"20dp"
	});
	
	up_clickable.addEventListener('click', Controllers.remote.button("up"));

	var down_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_downbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_downbtn_down.png',
		height:"17dp",
		width:"30dp",
		bottom:"22dp"
	});
	
	down_button.addEventListener('click', Controllers.remote.button("down"));

	var left_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_leftbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_leftbtn_down.png',
		height:"30dp",
		width:"17dp",
		left:"20dp"
	});
	
	left_button.addEventListener('click', Controllers.remote.button("left"));

	var right_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_rightbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_rightbtn_down.png',
		height:"30dp",
		width:"17dp",
		right:"22dp"
	});
	
	right_button.addEventListener('click', Controllers.remote.button("right"));
	
	var ok_button = Titanium.UI.createButton({
		backgroundImage:'images/remote_view/remote_okbtn.png',
		backgroundSelectedImage:'images/remote_view/remote_okbtn_down.png',
		height:"62dp",
		width:"62dp"
	});
	
	ok_button.addEventListener('click', compose(Controllers.remote.button("select"), Xbmc.currentPlaying.curry(Controllers.remote.displayPlaying.partial(playing_label, playing_image, current_playing_view))));

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

	Views.play_controls(win);
	
	win.add(search);
	win.add(channel_favorites);
	win.add(home_button);
	win.add(return_button);
	win.add(keyboard_field2);
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

	win.add(arrow_controls);

	color_buttons.add(blue_button);
	color_buttons.add(red_button);
	color_buttons.add(green_button);
	color_buttons.add(yellow_button);
	win.add(color_buttons);
	win.add(current_playing_view);		
};
