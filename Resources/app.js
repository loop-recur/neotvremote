Titanium.UI.setBackgroundColor('#000');

var tabGroup = Titanium.UI.createTabGroup();

var win1 = Titanium.UI.createWindow({  
    backgroundColor:'#fff',
		url:'remote.js',
		navBarHidden: true
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Remote',
    window:win1
});

var win2 = Titanium.UI.createWindow({  
    backgroundColor:'#fff',
		url:'channels.js',
		navBarHidden: true
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Channels',
    window:win2
});

var win3 = Titanium.UI.createWindow({  
    backgroundColor:'#fff',
		url:'settings.js',
		navBarHidden: true
});
var tab3 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Settings',
    window:win3
});

tabGroup.addTab(tab1);  
tabGroup.addTab(tab2); 
tabGroup.addTab(tab3);  

tabGroup.open();
