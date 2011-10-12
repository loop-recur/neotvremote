Views.updateWizard = function(channels, cb) {
	var modal = Ti.UI.createWindow({
		title:'Channel Update',
		backgroundColor: "white",
		height: "300dp"
	});
	
	var label = Ti.UI.createLabel({
		text: 'The channels on your device are out of date.  Please update your tv and then click to start the update.',
		font:{fontFamily:'Helvetica Neue',fontSize:"16dp",fontWeight:'bold'},
		top: "10dp",
		height: "150dp"
	});
	
	var ok = Ti.UI.createButton({
		title: "Ok",
		width: "70dp",
		height: "50dp",
		left: "180dp",
		top: "170dp"
	});
	
	var cancel = Ti.UI.createButton({
		title: "Cancel",
		width: "70dp",
		height: "50dp",
		left: "70dp",
		top: "170dp"
	});
	
	var activity = Helpers.ui.spinner({left: "260dp", top: "170dp"});
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
		var options = {modal:true, modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,navBarHidden:true}
	}
	
	modal.open(options);
}
