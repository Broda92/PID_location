var routes;

function get_data_route(line){
	var request4 = new XMLHttpRequest();
	request4.open('GET','Data/DOP_PID_TRASY_L.json');
	request4.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

	request4.onreadystatechange = function () {
	  if (this.readyState === 4) {
	    routes = JSON.parse(this.responseText);
	    console.log(routes);
	  }
	};
	request4.send();
	
	setTimeout(function(){
		var route_vehicle = [];
		if (routes) {
			for (l in routes['features']) {		
			if (routes['features'][l]['properties']['L_BUS'] && routes['features'][l]['properties']['L_BUS'].includes(line.toString()) ||
				routes['features'][l]['properties']['L_BUS_N'] && routes['features'][l]['properties']['L_BUS_N'].includes(line.toString()) ||
				routes['features'][l]['properties']['L_LAN'] && routes['features'][l]['properties']['L_LAN'].includes(line.toString()) ||
				routes['features'][l]['properties']['L_LAN_N'] && routes['features'][l]['properties']['L_LAN_N'].includes(line.toString()) ||
				routes['features'][l]['properties']['L_LOD'] && routes['features'][l]['properties']['L_LOD'].includes(line.toString()) ||
				routes['features'][l]['properties']['L_LOD_N'] && routes['features'][l]['properties']['L_LOD_N'].includes(line.toString()) ||
				routes['features'][l]['properties']['L_METRO'] && routes['features'][l]['properties']['L_METRO'].includes(line.toString()) ||
				routes['features'][l]['properties']['L_METRO_N'] && routes['features'][l]['properties']['L_METRO_N'].includes(line.toString()) ||
				routes['features'][l]['properties']['L_TRAM'] && routes['features'][l]['properties']['L_TRAM'].includes(line.toString()) ||
				routes['features'][l]['properties']['L_TRAM_N'] && routes['features'][l]['properties']['L_TRAM_N'].includes(line.toString()) ||
				routes['features'][l]['properties']['L_VLAK'] && routes['features'][l]['properties']['L_VLAK'].includes(line.toString()) ||
				routes['features'][l]['properties']['L_VLAK_N'] && routes['features'][l]['properties']['L_VLAK_N'].includes(line.toString()) 
				) {
				console.log(line);
				route_vehicle.push(routes['features'][l]['geometry']['coordinates']);
				}
			}
			show_routes(route_vehicle);
		}
		
	}, 5000);
}

function show_routes(route_vehicle) {
	var route_vehicle_rev = [];
	for (i in route_vehicle) {
		for (c in route_vehicle[i]) {
			pasmo_coord_reverse(route_vehicle[i][c])
			route_vehicle_rev.push(route_vehicle[i][c]);
		}
	}
	var latlngs = [
	  [[route_vehicle_rev]]
	];
	var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
}