Helpers.ui = {};

Helpers.ui.keyboard = function() {	
	var keyboard_field = Titanium.UI.createTextField({  
	  width:0,
	  height:0,
		top:00,
		autocorrect:false,
	  keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	  returnKeyType:Titanium.UI.RETURNKEY_DONE
	});
	
	if(Helpers.Application.isAndroid()) { keyboard_field.softKeyboardOnFocus = Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS }

	keyboard_field.addEventListener('change', function(e) {
		Xbmc.keyboard(e.value);
	});
	
	return keyboard_field;
}

Helpers.ui.addNav = function(win, title, fun) {
	if(Helpers.Application.isAndroid()) return;
	
	var nav_button = Titanium.UI.createButton({
		title:title
	});
	
	nav_button.addEventListener('click', function() {
		win.leftNavButton = null;
		fun(win);
	});
	
	win.leftNavButton = nav_button;
	
	return nav_button;
}

Helpers.ui.alert = function(title) {
	var alert = Titanium.UI.createAlertDialog({ 
		title:title,
		buttonNames: ['Ok']
	});

	alert.addEventListener('click', function(e) { 
		alert.hide();
	});
	
	alert.show();
};


Helpers.ui.connecting = function() {
	var running;
	Ti.App.addEventListener('connecting', startConnecting);
	
	var images = [];
	for (var i=1;i<7;i++) { images.push('images/connecting/remote_connecting' + ((i<7)?'0'+i:i)+'.png');}

	var position_top = "14dp";
	var position_left = "10dp";
	
	var imageView = Titanium.UI.createImageView({
		images:images,
		duration:100, // in milliseconds, the time before next frame is shown
		repeatCount:0,  // 0 means animation repeats indefinitely, use > 1 to control repeat count
		width:"85dp",
		height:"15dp",
		top:position_top,
		left:position_left,
		canScale:true
	});
	
	var connected = Titanium.UI.createView({
		backgroundImage:"images/connecting/remote_connected.png",
		width:"85dp",
		height:"15dp",
		top: position_top,
		left: position_left,
		visible:false
	});
	
	function startConnecting() {
		if(running) return;
		if(Helpers.Application.hasWifi) {
			connected.visible = false;
			imageView.visible = true;
			imageView.start();
			Xbmc.ping(finishConnecting);
		} else {
			finishConnecting();
			connected.visible = false;
		}
		running = true;
	}
	
	function finishConnecting() {
		connected.visible = true;
		imageView.visible = false;
		imageView.stop();
		running = false;
	}
	
	return function(win) {
		win.add(imageView);
		win.add(connected);
	}
}(); //to start listener
