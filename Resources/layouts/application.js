Layouts.application = function() {
	var tabGroup = Titanium.UI.createTabGroup();

	var win1 = Titanium.UI.createWindow({  
	    backgroundImage:'images/remote_view/remote_bg.png',
			navBarHidden: true
	});
	win1.addEventListener('open', Views.remote.partial(win1));
	
	var tab1 = Titanium.UI.createTab({  
	    icon:'images/remote_view/tab_icon_remote_active.png',
	    title:'Remote',
	    window:win1
	});

	var win2 = Titanium.UI.createWindow({  
	    backgroundColor:'#fff',
			navBarHidden: true
	});
	win2.addEventListener('open', Views.channels.partial(win2));
	
	var tab2 = Titanium.UI.createTab({  
	    icon:'KS_nav_ui.png',
	    title:'Channels',
	    window:win2
	});

	var win3 = Titanium.UI.createWindow({  
	    backgroundColor:'#fff',
			navBarHidden: true
	});
	win3.addEventListener('open', Views.settings.partial(win3));
	
	var tab3 = Titanium.UI.createTab({
	    icon:'KS_nav_ui.png',
	    title:'Settings',
	    window:win3
	});

	tabGroup.addTab(tab1);  
	tabGroup.addTab(tab2); 
	tabGroup.addTab(tab3);  

	tabGroup.open();
};
