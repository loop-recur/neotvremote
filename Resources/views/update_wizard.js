Views.updateWizard = function(channels, cb) {
	var modal = Ti.UI.createWindow({
		title:'Channel Update',
		backgroundImage:'images/gestures/gesture_bg.png',
	});
	
	var label = Ti.UI.createLabel({
		text: 'The channels on your device are out of date.  Please update your NeoTV and then click "OK" to start the update.',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:"16dp",
			fontWeight:'bold'},
		shadowColor:'#4C4C4C',
		shadowOffset:{x:1,y:1},
		color:"white",
		top: "10dp",
		textAlign:"center",
		width:"80%",
		height: "150dp"
	});
	
	var ok = Ti.UI.createButton({
		backgroundImage:'images/empty_button.png',
		height:"40dp",
		width:"80dp",
		left: "180dp",
		top: "170dp",
		title:"Ok",
	});
	
	var cancel = Ti.UI.createButton({
		backgroundImage:'images/empty_button.png',
		height:"40dp",
		width:"80dp",
		title: "Cancel",
		left: "70dp",
		top: "170dp"
	});
	
	var activity = Helpers.ui.spinner({});
	modal.add(label);
	modal.add(activity);
	modal.add(ok);
	modal.add(cancel);
	
	
	var nextStep = function() { 
		modal.remove(ok);
		modal.remove(cancel);
		label.text = "Downloading channels...";
		activity.show();
		ChannelDownload.start(finish);
	}
	
	ok.addEventListener('click', nextStep);
	cancel.addEventListener('click', function(){ modal.close() });
	
	function finish(downloaded_images) {
		label.text = "Finishing...";
		activity.hide();
		Ti.App.fireEvent('channelUpdateFinish', {channels: channels, cb: function(){ Ti.App.fireEvent("reloadChannels"); modal.close(); }});
		cb();
	}
	
	if(Helpers.Application.isAndroid()) {
		var options = {}
	} else {
		var options = {
			modal:true, 
			modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE,
			modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_CURRENT_CONTEXT,
			navBarHidden:true,
		}
	}
	
	modal.open(options);
}
