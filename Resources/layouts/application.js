Layouts.application = function() {
	var favs = false
	, tabGroup = Titanium.UI.createTabGroup();

	var win1 = Titanium.UI.createWindow({  
	    backgroundImage:'images/remote_view/remote_bg.png',
			navBarHidden: true
	});
	win1.addEventListener('open', Views.remote.partial(win1));
	win1.orientationModes=[Titanium.UI.PORTRAIT];
	
	var tab1 = Titanium.UI.createTab({  
	    icon:'images/remote_view/tab_icon_remote_inactive.png',
	    title:'Remote',
	    window:win1
	});
	
	
	var win2 = Titanium.UI.createWindow({  
	    backgroundImage:'images/gestures/gesture_bg.png',
			navBarHidden: true
	});
	win2.addEventListener('open', Views.gesture.partial(win2));
	win2.orientationModes=[Titanium.UI.PORTRAIT];
	
	var tab2 = Titanium.UI.createTab({  
	    icon:'images/gestures/gesture.png',
	    title:'Gestures',
	    window:win2
	});
	

	var win3 = Titanium.UI.createWindow({  
	    backgroundImage:'images/channel_view/channel_bg.png',
			navBarHidden: true
	});
	win3.addEventListener('open', function(){ Views.channels(win3, favs); });
	win3.orientationModes=[Titanium.UI.PORTRAIT];
		
	var tab3 = Titanium.UI.createTab({  
	    icon:'images/channel_view/tab_icon_channels_inactive.png',
	    title:'Channels',
	    window:win3
	});
	
	Layouts.application.openFavs = function () {
		tabGroup.setActiveTab(2);
		favs = true;
		win3.fireEvent("favs");
	};
	
	
	var firstTime = true;
	Layouts.application.setChannelBlurEvent = function(fun) {
		var run = false;
		
		if(firstTime) {
			var newFun = function() {
				if(!run) fun();
				run = true;
			}
			win3.addEventListener("blur", newFun);
		} else {
			run = false;
		}
	};

	var win4 = Titanium.UI.createWindow({  
	    backgroundColor:'#fff',
			navBarHidden:false,
			title:"Settings"
	});
	
	win4.addEventListener('open', function(){
		App.action(win4, "settings#index");
	});
	
	win4.orientationModes=[Titanium.UI.PORTRAIT];
	
	win4.addEventListener('android:back', function(e) {
		var children = win4.children;
		if(children.length == 1) return;
		win4.remove(children[children.length-1]);
	});
	
	var tab4 = Titanium.UI.createTab({
	    icon:'images/settings/settings_gears.png',
	    title:'Settings',
	    window:win4
	});

	tabGroup.addTab(tab1);
	tabGroup.addTab(tab2);
	tabGroup.addTab(tab3);
	tabGroup.addTab(tab4);

	tabGroup.open();	
	
	Layouts.application.setChannelView = function(){ tabGroup.setActiveTab(2); }
};
