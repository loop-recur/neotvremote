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
	
	var up_arrow_mask = Titanium.UI.createView({
		backgroundImage:"images/gestures/gesture_arrow_up_down.png",
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
	
	var down_arrow_mask = Titanium.UI.createView({
		backgroundImage:"images/gestures/gesture_arrow_down_down.png",
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
	
	var left_arrow_mask = Titanium.UI.createView({
		backgroundImage:"images/gestures/gesture_arrow_left_down.png",
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
	
	var right_arrow_mask = Titanium.UI.createView({
		backgroundImage:"images/gestures/gesture_arrow_right_down.png",
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
	
	home_button.addEventListener('click', Controllers.remote.button("menu"));
	
	
	var keyboard_field = Helpers.ui.keyboard();
	
	var keyboard_button = Titanium.UI.createButton({
		backgroundImage:'images/gestures/gesture_keyboard_button.png',
		height:"41dp",
		width:"81dp",
		top:"330dp",
		right:"10dp"
	});
	
	keyboard_button.addEventListener('click', function(){
		Feedback.buttonPress();
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
	
	
	if(Helpers.Application.isAndroid()) {
		var gestures = require('com.looprecur.gestures');

		var proxy = gestures.createGesturesView({
			onScroll: function(coordinates){ moveFromCoordinates(coordinates); },
			onFling: function(coordinates){ moveExtra(coordinates); },
			onDown: function(){  },
			onDoubleTap: function(){Controllers.remote.button("select")();},
			onSingleTap: function(){  },
			width: '265dp',
			height: '265dp',
			top: '35dp'
		});
		win.add(proxy);	
		
		function moveFromCoordinates(coordinates) {
			if(coordinates.x > 0 && coordinates.x > coordinates.y && coordinates.y > -10) {
				move("left");
			} else if(coordinates.x < 0 && coordinates.x < coordinates.y && coordinates.x < -8) {
				move("right");
			} else if(coordinates.y > 0 && coordinates.y > coordinates.x) {
				move("up");
			} else if(coordinates.y < 0 && coordinates.y < coordinates.x) {
				move("down");
			}
		}
		
		function moveExtra(coordinates) {
			overThreshold = some('x >= 345 || x <= -345', [coordinates.x, coordinates.y]);
			if(direction && overThreshold) nTimes(3, Xbmc.action(direction));
		}
		
		var direction = null;
		var moving = false;
		var masks = {"up":up_arrow_mask, "down":down_arrow_mask, "left":left_arrow_mask, "right":right_arrow_mask};
		function move(dir) {
			if(moving) return;
			moving = true;
			Feedback.buttonPress();
			setTimeout(Xbmc.action(dir), 0);
			animateGesture(masks[dir]);
			setTimeout(function(){moving = false}, 700);
			direction = dir;
		}
	}
	
	function underThreshold(diff) {
		var difference_threshold = 20;
		return Math.abs(diff) < difference_threshold;
	}
	
	function shortSwipe(diff) {
		if(Helpers.Application.isAndroid() && Titanium.Platform.displayCaps.density == "high") {
			var swipe_length = 210;
		} else {
			var swipe_length = 150;
		}
		return Math.abs(diff) < swipe_length;
	}
	
	function diffPositive(diff) {
		return diff > 0;
	}

	
	if(!Helpers.Application.isAndroid()) {

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
		
		arrows.addEventListener('doubletap', function () {
			animateGesture(up_arrow_mask);
			animateGesture(down_arrow_mask);
			animateGesture(left_arrow_mask);
			animateGesture(right_arrow_mask);

			return Controllers.remote.button("select")();
		});
	}
	
	function doubleTap() {
		if (Math.abs(touch_x_stop - touch_x_start) > 15 || Math.abs(touch_y_stop - touch_y_start) > 15) {
			doGesture();
		}
	}
	
	function animateGesture(arrow_mask) {
		arrows.add(arrow_mask);
		arrow_mask.animate({opacity:0,duration:1000}, function() {
			arrows.remove(arrow_mask);
			arrow_mask.opacity = 1;
		});	
	}
	
	function doGesture () {
		Feedback.buttonPress();
		
		var x_diff = touch_x_stop - touch_x_start;
		var y_diff = touch_y_stop - touch_y_start;
		
		if (underThreshold(y_diff) && !diffPositive(x_diff) && shortSwipe(x_diff)) {
			animateGesture(left_arrow_mask);
			setTimeout(Xbmc.action("left"), 0);
		}
		
		if (underThreshold(y_diff) && !diffPositive(x_diff) && !shortSwipe(x_diff)) {
			animateGesture(left_arrow_mask);
			nTimes(3, Xbmc.action("left"));
		}
		
		if (underThreshold(y_diff) && diffPositive(x_diff) && shortSwipe(x_diff)) {
			animateGesture(right_arrow_mask);
			setTimeout(Xbmc.action("right"), 0);
		}		
		
		if (underThreshold(y_diff) && diffPositive(x_diff) && !shortSwipe(x_diff)) {
			animateGesture(right_arrow_mask);
			nTimes(3, Xbmc.action("right"));
		}
		
		if (underThreshold(x_diff) && !diffPositive(y_diff) && shortSwipe(y_diff)) {
			animateGesture(up_arrow_mask);
			setTimeout(Xbmc.action("up"), 0);
		}
		
		if (underThreshold(x_diff) && !diffPositive(y_diff) && !shortSwipe(y_diff)) {
			animateGesture(up_arrow_mask);
			nTimes(3, Xbmc.action("up"));
		}
		
		if (underThreshold(x_diff) && diffPositive(y_diff) && shortSwipe(y_diff)) {
			animateGesture(down_arrow_mask);
			setTimeout(Xbmc.action("down"), 0);
		}
		
		if (underThreshold(x_diff) && diffPositive(y_diff) && !shortSwipe(y_diff)) {
      animateGesture(down_arrow_mask);
			nTimes(3, Xbmc.action("down"));
		}
	};
	
};