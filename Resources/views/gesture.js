Views.gesture = function(win) {
	
	var touch_x_start = null;
	var touch_y_start = null;
	var touch_x_stop = null;
	var touch_y_stop = null;
	
	var arrows = Titanium.UI.createView({
		height:"265dp",
		width:"265dp",
		top:"35dp"
	});
	
	var up_arrow = Titanium.UI.createView({
		backgroundImage:"images/gestures/gesture_arrow_up.png",
		width:"30dp",
		height:"135dp",
		top:"0dp"
	});
	
	var down_arrow = Titanium.UI.createView({
		backgroundImage:"images/gestures/gesture_arrow_down.png",
		width:"30dp",
		height:"135dp",
		bottom:"0dp"		
	});
	
	var left_arrow = Titanium.UI.createView({
		backgroundImage:"images/gestures/gesture_arrow_left.png",
		height:"30dp",
		width:"135dp",
		left:"0dp"		
	});
	
	var right_arrow = Titanium.UI.createView({
		backgroundImage:"images/gestures/gesture_arrow_right.png",
		height:"30dp",
		width:"135dp",
		right:"0dp"
	});
	
	var return_button = Titanium.UI.createButton({
		backgroundImage:'images/gestures/gesture_back_button.png',
		height:"41dp",
		width:"81dp",
		top:"330dp",
		left:"10dp"
	});
	
	return_button.addEventListener('click', Controllers.remote.button("back"));
	
	
	var home_button = Titanium.UI.createButton({
		backgroundImage:'images/gestures/gesture_home_button.png',
		height:"41dp",
		width:"81dp",
		top:"330dp"
	});
	
	home_button.addEventListener('click', compose(Xbmc.action('menu')));
	
	
	var keyboard_field = Helpers.ui.keyboard();
	
	var keyboard_button = Titanium.UI.createButton({
		backgroundImage:'images/gestures/gesture_keyboard_button.png',
		height:"41dp",
		width:"81dp",
		top:"330dp",
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
	
	arrows.add(up_arrow);
	arrows.add(down_arrow);
	arrows.add(left_arrow);
	arrows.add(right_arrow);
	
	win.add(return_button);
	win.add(home_button);
	win.add(keyboard_field2);
	win.add(keyboard_field);
	win.add(keyboard_button);
	
	win.add(arrows);
	
	function underThreshold(diff) {
		var difference_threshold = 20;
		return Math.abs(diff) < difference_threshold;
	}
	
	function shortSwipe(diff) {
		if(Helpers.Application.isAndroid() && Titanium.Platform.displayCaps.density == "high") {
			var swipe_length = 150;
		} else {
			var swipe_length = 100;
		}
		return Math.abs(diff) < swipe_length;
	}
	
	function diffPositive(diff) {
		return diff > 0;
	}
	
	arrows.addEventListener('doubletap', function () {
		return Controllers.remote.button("select")();
	});
	
	arrows.addEventListener('touchstart', function(e)
	{
		touch_x_start = e.x;
		touch_y_start = e.y;
	});
	
	arrows.addEventListener('touchend', function(e)
	{
		touch_x_stop = e.x;
		touch_y_stop = e.y;
		
		doubleTap();
	});
	
	function doubleTap() {
		if (Math.abs(touch_x_stop - touch_x_start) > 15 || Math.abs(touch_y_stop - touch_y_start) > 15) {
			doGesture();
		}
	}
	
	function doGesture () {
		
		var x_diff = touch_x_stop - touch_x_start;
		var y_diff = touch_y_stop - touch_y_start;
		
		if (underThreshold(y_diff) && !diffPositive(x_diff) && shortSwipe(x_diff)) {
			return Xbmc.action("left")();
		}
		
		if (underThreshold(y_diff) && !diffPositive(x_diff) && !shortSwipe(x_diff)) {
			return Xbmc.action("left")();
		}
		
		if (underThreshold(y_diff) && diffPositive(x_diff) && shortSwipe(x_diff)) {
			return Xbmc.action("right")();
		}		
		
		if (underThreshold(y_diff) && diffPositive(x_diff) && !shortSwipe(x_diff)) {
				alert('long right');
				
				function doThree () {
					Ti.API.info("LONG RIGHT BEFORE");
					Xbmc.action("right")();
					Xbmc.action("right")();
					Xbmc.action("right")();
					Ti.API.info("LONG RIGHT AFTER");
				}
				
				return doThree();
		}
		
		if (underThreshold(x_diff) && !diffPositive(y_diff) && shortSwipe(y_diff)) {
			return Xbmc.action("up")();
		}
		
		if (underThreshold(x_diff) && !diffPositive(y_diff) && !shortSwipe(y_diff)) {
			return Xbmc.action("up")();
		}
		
		if (underThreshold(x_diff) && diffPositive(y_diff) && shortSwipe(y_diff)) {
			return Xbmc.action("down")();
		}
		
		if (underThreshold(x_diff) && diffPositive(y_diff) && !shortSwipe(y_diff)) {
			return Xbmc.action("down")();
		}	
	};
	
};