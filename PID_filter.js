function filter_vehicles(data) {
	var vehicles_map = [];

	for (i in data['features']) {
					
		var lines_map = [];
		//line filter
		if (lines_map.includes(data['features'][i]['properties']['trip']['gtfs']['route_short_name'])) {
			vehicles_map.push(data['features'][i]);
		}

		var number_map = [];
		//number filter
		if (number_map.includes(data['features'][i]['properties']['trip']['vehicle_registration_number'])) {
			vehicles_map.push(data['features'][i]);
		}

		//lowfloor filter
		/*var lf_map = true;
		if (data['features'][i]['properties']['trip']['wheelchair_accessible'] == true) {
			vehicles_map.push(data['features'][i]);
		}*/

		//show all vehicles
		if (lines_map.length == 0 && number_map.length == 0) {
			//show everything
			//vehicles_map.push(data['features'][i]);

			//means of transport filter
			var type_map = ["loď","náhradní doprava","ostatní","spoj pro lidi s hendikepem","autobus","regionální autobus","smluvní spoj"];
			if (type_map.includes(data['features'][i]['properties']['trip']['vehicle_type']['description_cs'])) {
				vehicles_map.push(data['features'][i]);
			}
		}
	}

	console.log("Vybráno vozidel: "+vehicles_map.length);

	//list_vehicles(vehicles_map);
	show_vehicles(map, extent, vehicles_map);
}

//	filter by attributes (LF, type, line, number) + ordering the table