var zones;

var zones_colors = ["darkred","red","orangered","darkorange","Orange","gold","yellow","YellowGreen","OliveDrab","Green","DarkGreen"];

function get_data_zones(){
	var request3 = new XMLHttpRequest();
	request3.open('GET','Data/DOP_PID_TarifPasma_p_WGS84.geojson');
	request3.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

	request3.onreadystatechange = function () {
	  if (this.readyState === 4) {
	    zones = JSON.parse(this.responseText);
	  }
	};
	request3.send();

	setTimeout(function(){
		var prague = zones['features'][0];
		var zones_from_prague = zones['features'].reverse();
		zones_from_prague.pop();
		zones_from_prague.splice(0, 0, prague);		

		for (p in zones['features']) {
			show_zones(p, zones);	
		}
	}, 1000);
}

function show_zones(p, zones) {
	if (zones['features'][p]['geometry']['type'] == "MultiPolygon") {
		for (m in zones['features'][p]['geometry']['coordinates']) {
			for (c in zones['features'][p]['geometry']['coordinates'][m][0]) {
			zone_coord_reverse(zones['features'][p]['geometry']['coordinates'][m][0][c]);
			};
		}		
	} else {
		for (d in zones['features'][p]['geometry']['coordinates']){
			for (c in zones['features'][p]['geometry']['coordinates'][d]) {
				zone_coord_reverse(zones['features'][p]['geometry']['coordinates'][d][c]);
			};
		}		
	}

	var latlngs = [
		  [
		    zones['features'][p]['geometry']['coordinates']
		  ]
		];

	var polygon = L.polygon(latlngs, {color: zones_colors[p], weight: 0.3}).addTo(map)
		.bindPopup("<b>Tarifní pásmo "+zones['features'][p]['properties']['POPIS']+"</b>");
}

function zone_coord_reverse(vertex_coord) {
		vertex_coord = vertex_coord.reverse();
}