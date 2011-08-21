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
	
	win.leftNavButton = nav_button;
	
	nav_button.addEventListener('click', function() {
		fun(win);
		win.leftNavButton = null;
	});
	
	return nav_button;
}
