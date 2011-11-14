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
		color: "#ffffff"
	});
	
	var cancel = Ti.UI.createButton({
		backgroundImage:'images/empty_button.png',
		height:"40dp",
		width:"80dp",
		title: "Cancel",
		left: "70dp",
		top: "170dp",
		color: "#ffffff"
	});
	
	var progress_bar = Helpers.ui.progressBar({top: "115dp"});
	
	var activity = Helpers.ui.spinner();
	modal.add(label);
	modal.add(activity);
	modal.add(ok);
	modal.add(cancel);
	
	
	var _nextStep = function() { 
		modal.add(progress_bar);
		progress_bar.show();
		label.text = "Downloading channels...";
		ChannelDownload.start(_finish, progress_bar);
		cancel.left = null;
		modal.remove(ok);
		cancel.addEventListener('click', function(){ Ti.App.current_client.abort(); });
	}
	
	function _close() {
		activity.hide();
		progress_bar.hide();
		modal.close();
	}
	
	function restart() {
		var restartModule = require('com.looprecur.restart');
		restartModule.restart();
	}
	
	function _finish(downloaded_images) {
		progress_bar.hide();
		activity.show();
		
		if(Helpers.Application.isAndroid()) {
			label.text = "Restarting...";
			restart();
		} else {
			label.text = "Finishing...";
			Eventer.reloadChannels(channels);
			cb();
		}
	}
	
	Eventer.set("closeModal", _close);
	ok.addEventListener('click', _nextStep);
	cancel.addEventListener('click', _close);
	
	
	if(Helpers.Application.isAndroid()) {
		var options = {fullscreen:true}
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
