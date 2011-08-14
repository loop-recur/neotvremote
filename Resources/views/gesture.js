Views.gesture = function(win) {
	
	var touch_x_start = null;
	var touch_y_start = null;
	var touch_x_stop = null;
	var touch_y_stop = null;
	
	function underThreshold(diff) {
		var difference_threshold = 20;
		return Math.abs(diff) < difference_threshold;
	}
	
	function shortSwipe(diff) {
		var swipe_length = 100;
		return Math.abs(diff) < swipe_length;
	}
	
	function diffPositive(diff) {
		return diff > 0;
	}

	win.addEventListener('doubletap', Controllers.remote.button("select"));

	win.addEventListener('touchstart', function(e)
	{
		touch_x_start = e.x;
		touch_y_start = e.y;
	});

	win.addEventListener('touchend', function(e)
	{
		touch_x_stop = e.x;
		touch_y_stop = e.y;
		
		doGesture();
	});

	function doGesture () {
		
		var x_diff = touch_x_stop - touch_x_start;
		var y_diff = touch_y_stop - touch_y_start;
		
		if (underThreshold(y_diff) && !diffPositive(x_diff) && shortSwipe(x_diff)) {
			return Controllers.remote.button("left")();
		}
		
		if (underThreshold(y_diff) && !diffPositive(x_diff) && !shortSwipe(x_diff)) {
			return Controllers.remote.button("left")();
		}
		
		if (underThreshold(y_diff) && diffPositive(x_diff) && shortSwipe(x_diff)) {
			return Controllers.remote.button("right")();
		}		
		
		if (underThreshold(y_diff) && diffPositive(x_diff) && !shortSwipe(x_diff)) {
			return Controllers.remote.button("right")();
		}
		
		if (underThreshold(x_diff) && !diffPositive(y_diff) && shortSwipe(y_diff)) {
			return Controllers.remote.button("up")();
		}
		
		if (underThreshold(x_diff) && !diffPositive(y_diff) && !shortSwipe(y_diff)) {
			return Controllers.remote.button("up")();
		}
		
		if (underThreshold(x_diff) && diffPositive(y_diff) && shortSwipe(y_diff)) {
			return Controllers.remote.button("down")();
		}
		
		if (underThreshold(x_diff) && diffPositive(y_diff) && !shortSwipe(y_diff)) {
			return Controllers.remote.button("down")();
		}	
	};
	
};