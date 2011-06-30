var win = Titanium.UI.currentWindow;

var up_button = Titanium.UI.createButton({
	title:'^',
	// backgroundImage:'',
	// backgroundSelectedImage:'',
	height:20,
	width:20,
	top:20
});

var down_button = Titanium.UI.createButton({
	title:'v',
	// backgroundImage:'',
	// backgroundSelectedImage:'',
	height:20,
	width:20,
	top:80
});

var left_button = Titanium.UI.createButton({
	title:'<',
	// backgroundImage:'',
	// backgroundSelectedImage:'',
	height:20,
	width:20,
	top:50,
	left:100
});

var right_button = Titanium.UI.createButton({
	title:'>',
	// backgroundImage:'',
	// backgroundSelectedImage:'',
	height:20,
	width:20,
	top:50,
	right:100
});

var ok_button = Titanium.UI.createButton({
	title:'ok',
	// backgroundImage:'',
	// backgroundSelectedImage:'',
	height:20,
	width:20,
	top:50
});

win.add(up_button);
win.add(down_button);
win.add(left_button);
win.add(right_button);
win.add(ok_button);