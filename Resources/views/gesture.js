Views.gesture = function(win) {
	
	var touch_x_start = null;
	var touch_y_start = null;
	var touch_x_stop = null;
	var touch_y_stop = null;
	
	var difference_threshold = 40;

	win.addEventListener('doubletap', function(e)
	{
		alert("double!");
	});

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
		
		if (y_diff < difference_threshold && x_diff > difference_threshold) {
			alert("i went right");
		}

		if (y_diff < difference_threshold && Math.abs(x_diff) > difference_threshold && x_diff < 0) {
			alert("i went left");
		}
		
		if (x_diff < difference_threshold && y_diff > difference_threshold) {
			alert("i went down");
		}

		if (x_diff < difference_threshold && Math.abs(y_diff) > difference_threshold && y_diff < 0) {
			alert("i went up");
		}
	};

};