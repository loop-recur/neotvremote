Helpers.ui = {};

Helpers.ui.keyboard = function() {	
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
	
	return keyboard_field;
}