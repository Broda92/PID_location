var stops;

//map.on('zoomend',stops_zoom);// ZABLOKOVÁNO!

function stops_zoom(zoom){
	var zoom = map.getZoom();
	console.log(zoom);
	if (zoom >= 15/* && stops_map.length == 0*/) {
		get_data_stops(zoom);
	} /*else {
		stops_map.clearLayers();
	}*/
}

function get_data_stops(zoom){
		var request2 = new XMLHttpRequest();
		request2.open('GET','Data/DOP_PID_stops_B.json');
		request2.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

		request2.onreadystatechange = function () {
		  if (this.readyState === 4) {
		    stops = JSON.parse(this.responseText);
		    //console.log(stops['features'].length);
		  }
		};
		request2.send();// - ZABLOKOVÁNO!
		
		//if (map.getZoom() == '15') {
			setTimeout(function(){
			//console.log(stops);
			show_stops(stops);		
			}, 5000);
		//}
}

function show_stops() {
	var stops_showed = [];
	var extent_north = extent.getNorthEast()['lat'];
	var extent_south = extent.getSouthWest()['lat'];
	var extent_west = extent.getSouthWest()['lng'];
	var extent_east = extent.getNorthEast()['lng'];	

	var position_lat = stops['features'][0].geometry.coordinates[1];
	var position_lng = stops['features'][0].geometry.coordinates[0];
	
	for	(i=0; i<stops['features'].length; i++) {
		position_lat = stops['features'][i].geometry.coordinates[1];
		position_lng = stops['features'][i].geometry.coordinates[0];

		if ((position_lat < extent_north) && (position_lat > extent_south) && (position_lng > extent_west) && (position_lng < extent_east)) {			
			stops_showed.push(stops['features'][i]);
		}
	}

	var name;		
	var zone;	
	var stops_map = [];

	//console.log(stops_showed[0]);

	var icon2 = L.icon({
	    iconUrl: 'Data/Stop.png',

	    iconSize:     [15, 15], // size of the icon
	    iconAnchor:   [7, 0] // point of the icon which will correspond to marker's location
	});

	for (v=0; v<stops_showed.length; v++) {	
		name = stops_showed[v]['properties']['ZAST_NAZEV'];
		zone = stops_showed[v]['properties']['ZAST_PASMO'];
				
		position_lat = stops_showed[v].geometry.coordinates[1];
		position_lng = stops_showed[v].geometry.coordinates[0];

		var stop = new L.marker([position_lat, position_lng], {icon: icon2}).addTo(map)
		    .bindPopup("<b>"+name+"</b><br>tarifní pásmo "+zone);	
	}	
	var stops_map = L.layerGroup(stop).addTo(map);

}