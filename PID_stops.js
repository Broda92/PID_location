var stops;
var stops_map = [];

//map.on('zoomend',stops_zoom);// ZABLOKOVÁNO!

function stops_zoom(zoom){
	var zoom = map.getZoom();
	console.log(zoom);
	if (stops_map) {
		console.log(stops_map);
	}
	
	if (zoom >= 15 && stops_map.length == 0) {
		stops = get_data_stops(zoom);
		setTimeout(function(){
			show_stops(stops);
		}, 1000);
		
	}
	if (zoom < 15) {
		stops_map = [];
	}
}

function get_data_stops(zoom){
	var request2 = new XMLHttpRequest();
	request2.open('GET','Data/PID_GTFS/PID_Stops.json');
	request2.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

	request2.onreadystatechange = function () {
	  if (this.readyState === 4) {
	    stops = JSON.parse(this.responseText);
	    stops = stops['stops'];
	    console.log(stops.length);
	  }
	};
	request2.send();// - ZABLOKOVÁNO!
	
	setTimeout(function(){	
		return stops;	
	}, 1000);
}

function show_stops(stops) {
	var stops_showed = [];
	var extent_north = extent.getNorthEast()['lat'];
	var extent_south = extent.getSouthWest()['lat'];
	var extent_west = extent.getSouthWest()['lng'];
	var extent_east = extent.getNorthEast()['lng'];	

	var position_lat;
	var position_lng;
	
	for	(i=0; i<stops.length; i++) {
		position_lat = stops[i]["stop_lat"];
		position_lng = stops[i]["stop_lon"];

		if ((position_lat < extent_north) && (position_lat > extent_south) && (position_lng > extent_west) && (position_lng < extent_east)) {			
			stops_showed.push(stops[i]);
		}
	}

	var name;		
	var zone;
	var stop_lf;	
	var stops_map = [];

	console.log(stops_showed.length);

	var icon2 = L.icon({
	    iconUrl: 'Data/Stop.png',

	    iconSize:     [15, 15], // size of the icon
	    iconAnchor:   [7, 0] // point of the icon which will correspond to marker's location
	});

	for (v=0; v<stops_showed.length; v++) {	
		name = stops_showed[v]['stop_name'];
		zone = stops_showed[v]['zone_id'];
		if (stops_showed[v]['wheelchair_boarding'] == 1) {
			stop_lf = "ANO";
		} else {
			stop_lf = "NE";
		}
				
		position_lat = stops_showed[v]["stop_lat"];
		position_lng = stops_showed[v]["stop_lon"];

		var stop = new L.marker([position_lat, position_lng], {icon: icon2}).addTo(map)
		    .bindPopup("<b>"+name+"</b><br>tarifní pásmo <b>"+zone+"</b><br>bezbariérová? <b>"+stop_lf+"</b>");	
	}	
	var stops_map = L.layerGroup([stop]);

}