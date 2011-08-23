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

Helpers.ui.confirm = function(title, callbacks) {
	if (!callbacks.cancel) callbacks.cancel = function() {};
	var alert = Titanium.UI.createAlertDialog({ 
		title:title, 
		message: "Are you sure?", 
		buttonNames: ['Yes', 'Cancel'], 
		cancel:1 
	});
	
	alert.addEventListener('click', function(e) { 
		if (e.cancel === e.index || e.cancel === true) {return;}
		(e.index === 0) ? callbacks.yes() : callbacks.cancel();
	});
		
	alert.show();
};

Helpers.ui.addNav = function(win, title, fun) {
	
	var nav_button = Titanium.UI.createButton({
		title:title,
	});
	
	nav_button.addEventListener('click', function() {
		// win.hideNavBar();
		fun(win);
	});
	
	win.leftNavButton = nav_button;
	// win.showNavBar();
	
	return nav_button;
}

Helpers.ui.connecting = function(win) {
	
	var images = [];
	for (var i=1;i<4;i++) { images.push('images/connecting/remote_connecting' + ((i<4)?'0'+i:i)+'.png');}

	var position_top = "45dp";
	var position_right = "20dp";
	
	var imageView = Titanium.UI.createImageView({
		images:images,
		duration:400, // in milliseconds, the time before next frame is shown
		repeatCount:0,  // 0 means animation repeats indefinitely, use > 1 to control repeat count
		width:"81dp", 
		height:"14dp",
		top:position_top,
		right:position_right
	});
	
	var connected = Titanium.UI.createView({
		backgroundImage:"images/connecting/remote_connected.png",
		width:"81dp",
		height:"14dp",
		top: position_top,
		right: position_right,
		visible:false
	});
	
	imageView.start();
	
	win.add(imageView);
	win.add(connected);

}
