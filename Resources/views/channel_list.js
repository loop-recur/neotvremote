Views.channel_list = function(win) {
	
	var scrollview = Titanium.UI.createScrollView({
		top:40,
		height:365,
		width:320,
		contentWidth:320,
		contentHeight:'auto',
		showHorizontalScrollIndicator:false,
		showVerticalScrollIndicator:true
	});
	
	var listing = [
		"channel_acm"
		,"channel_amazonvod"
		,"channel_appchannel"
		,"channel_atom"
		,"channel_bliptv"
		,"channel_blockbuster"
		,"channel_bonjovi"
		,"channel_break"
		,"channel_cbs"
		,"channel_cinemanow"
		,"channel_collegehumor"
		,"channel_crunchyroll"
		,"channel_delicioustv"
		,"channel_economist"
		,"channel_engadget"
		,"channel_etsy"
		,"channel_exercizetv"
		,"channel_fashiontv"
		,"channel_filmfresh"
		,"channel_flingo"
		,"channel_foratv"
		,"channel_fordmodels"
		,"channel_fox"
		,"channel_funlittlemovies"
		,"channel_funnyordie"
		,"channel_gbtv"
		,"channel_gt"
		,"channel_gtchannel"
		,"channel_howcast"
		,"channel_huluplus"
		,"channel_indiefilmnation"
		,"channel_insidegolfmagazine"
		,"channel_justinbeiber"
		,"channel_kanyewest"
		,"channel_killers"
		,"channel_kirotv"
		,"channel_koldcast"
		,"channel_ktvu"
		,"channel_labogoteque"
		,"channel_livesockets"
		,"channel_localonlinenews"
		,"channel_macysmakeover"
		,"channel_makingof"
		,"channel_mariah"
		,"channel_napster"
		,"channel_nasa360"
		,"channel_nationallampoon"
		,"channel_netflix"
		,"channel_nextnewnetworks"
		,"channel_noisevox"
		,"channel_nylontv"
		,"channel_oreillymake"
		,"channel_pandora"
		,"channel_pbs"
		,"channel_picassa"
		,"channel_pongalo"
		,"channel_revision3"
		,"channel_rihanna"
		,"channel_rocketboom"
		,"channel_sears"
		,"channel_showtime"
		,"channel_singingfool"
		,"channel_skullcandy"
		,"channel_splash"
		,"channel_take180"
		,"channel_ted"
		,"channel_terra"
		,"channel_teton"
		,"channel_tmz"
		,"channel_tvguide"
		,"channel_unconcert_fixme"
		,"channel_vimeo"
		,"channel_volcast"
		,"channel_vudu_apps"
		,"channel_vudu_HD"
		,"channel_wb"
		,"channel_whitehouse"
		,"channel_wpt"
		,"channel_youtube"
	];
	
	listing.reverse();
	
	var height = 77;
	var top = 2;
	var row_separation = 10;
	
	var width = 90;
	var left = 12.5;
	var column_separation = 12.5;
	
	var rows_built = 0;
	var column_counter = 0;
	
	function incrementColumn() {
		column_counter += 1;
		if (column_counter == 4) { 
			column_counter = 0;
			rows_built += 1;
		};
	};
	
	function makeChannel(name) {
		var name = Titanium.UI.createButton({
			backgroundImage:'images/channels/' + name + '.png',
			height:height,
			width:width,
			top:top + rows_built*height + rows_built*row_separation,
			left:left + column_counter*width + column_counter*column_separation,
			id:name,
			value:name
		});
		
		name.addEventListener('click', function() {
			alert(name.value + " clicked!");
		});
		
		return name;
	}
	
	for (var i = listing.length - 1; i >= 0; i--){
		scrollview.add(makeChannel(listing[i]));
		incrementColumn();
	};
	
	win.add(scrollview);
	
};