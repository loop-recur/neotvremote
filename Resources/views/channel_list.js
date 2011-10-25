Views.channel_list = function() {
	var mode;
	 
	function create(channels) {
		var default_settings = {height: "77dp", width: "90dp", left: "12.5dp", column_separation: "12.5dp", top: "2dp", row_separation: "10dp", rows_built: 0}
		
		var scrollview = Titanium.UI.createScrollView({
			top: "10dp",
			height:"365dp",
			width:"320dp",
			contentWidth:"auto",
			contentHeight:'auto',
			showHorizontalScrollIndicator:false,
			showVerticalScrollIndicator:true
		});
		
		channels = select(function(c){return Ti.Filesystem.getFile(Channel.imagePath(c)).exists(); }, channels);
		reduce(_makeChannel, {settings: default_settings, amount: 0}, channels);

		function _makeChannel(config, name) {
			var new_settings = _getNewSettings(config.settings, config.amount);
			
			var channel_button = Titanium.UI.createImageView({
				image: Channel.imagePath(name),
				height:new_settings.height,
				width:new_settings.width,
				top:new_settings.top,
				left:new_settings.left,
				id:name,
				value:name
			});
						
			scrollview.add(channel_button);

			return {settings: new_settings, amount: config.amount+1};
		}

		function _getNewSettings(settings, amount) {
			var top = settings.top;
			var rows_built = settings.rows_built;
			var left = Helpers.Application.addDp(settings.left, settings.width, settings.column_separation);

			if(amount % 3 == 0) {
				rows_built = rows_built + 1;
				top = Helpers.Application.addDp(settings.top, settings.height, settings.row_separation, settings.rows_built);
				left = default_settings.left;
			}

			if(amount == 0) top = 0;

			return {
				height: settings.height,
				width: settings.width,
				left: left,
				column_separation: settings.column_separation,
				top: top,
				row_separation: settings.row_separation,
				rows_built: settings.rows_built
			};
		}
			
		return scrollview;
	}
	
	function launchMode(buttons, force) {
		if(mode === "launch" && !force) return;
		
		if(mode === "favorites") {
			_removeListeners();
			_removeMasks();
		}
		_addListeners();
		mode = "launch";
		
		function _removeMasks() {
			map(_removeOpacity, buttons);

			function _removeOpacity(button) {
				button.opacity = 1;
			}

			function _removeBorder(button) {
				button.borderWidth = 0;
				button.borderRadius = 0;
			}
		}
		
		function _addListeners() {
			map(function(b){ b.addEventListener('click', _launchChannel); }, buttons);
		}
		
		function _removeListeners() {
			map(function(b){ b.removeEventListener('click', _toggleFav); }, buttons);
		}
	}
	
	function favoritesMode(buttons, favorites) {
		if(mode === "favorites") return;
		if(mode === "launch") _removeListeners();
		_addMasks();
		_addListeners();
		mode = "favorites";
		
		function _addMasks() {
			map(_addOpacity, buttons);

			function _addOpacity(button) {
				button.opacity = _inFavorites(button.value) ? 1 : 0.2;
			}
			
			function _colorBorder(button) {
				button.borderWidth = 5;
				button.borderRadius = 5;
				button.borderColor = _inFavorites(button.value) ? "#D3D22E" : "black";
			}

			function _inFavorites(name) {
				return (favorites.indexOf(name) !== -1);
			}
		}
		
		function _addListeners() {
			map(function(b){ b.addEventListener('click', _toggleFav); }, buttons);
		}
		
		function _removeListeners() {
			map(function(b){ b.removeEventListener('click', _launchChannel); }, buttons);
		}
	}
	
	function _launchChannel(e) {
		Xbmc.launch(e.source.value)();
		Ti.App.fireEvent('showPlaying', {});
	}
	
	function _toggleFav(e) {
		var channel = e.source.value;
		var index = Channels.indexOf(channel);
		Favorites.toggleFavorite(index);

		e.source.opacity = (e.source.opacity == 1) ? 0.5 : 1;
	}
	
	return {create: create, launchMode: launchMode, favoritesMode: favoritesMode}
}();
