function vehicles_amounts(vehicles_map) {
	var trams_map = [];
	var tbuses_map = [];
	var buses_map = [];
	var busreg_map = [];
	var trains_map = [];
	var boats_map = [];
	var others_map = [];
	for (i in vehicles_map) {
		if (vehicles_map[i]['properties']['trip']['vehicle_type']['description_cs'] == "tramvaj") {
			trams_map.push(vehicles_map[i]);
		} else if (vehicles_map[i]['properties']['trip']['vehicle_type']['description_cs'] == "trolejbus") {
			buses_map.push(vehicles_map[i]);
		} else if (vehicles_map[i]['properties']['trip']['vehicle_type']['description_cs'] == "autobus") {
			buses_map.push(vehicles_map[i]);
		} else if (vehicles_map[i]['properties']['trip']['vehicle_type']['description_cs'] == "regionální autobus") {
			busreg_map.push(vehicles_map[i]);
		} else if (vehicles_map[i]['properties']['trip']['vehicle_type']['description_cs'] == "vlak") {
			trains_map.push(vehicles_map[i]);
		} else if (vehicles_map[i]['properties']['trip']['vehicle_type']['description_cs'] == "loď") {
			boats_map.push(vehicles_map[i]);
		} else {
			others_map.push(vehicles_map[i]);
		}
	}	
	vehicles_amounts_show(trams_map, "tram_amount");
	vehicles_amounts_show(tbuses_map, "tbus_amount");
	vehicles_amounts_show(buses_map, "bus_amount");
	vehicles_amounts_show(busreg_map, "busreg_amount");
	vehicles_amounts_show(trains_map, "train_amount");
	vehicles_amounts_show(boats_map, "boat_amount");
	vehicles_amounts_show(others_map, "other_amount");	
}

function vehicles_amounts_show(vehicle_type_array, id) {
	document.getElementById(id).innerHTML = vehicle_type_array.length;
}

function vehicles_map_list(vehicles_map) {
	if (document.getElementById("list_table").hasChildNodes()) {
		document.getElementById("list_table").innerHTML = "";
	}
	if (vehicles_map.length == 0) {
		var no_vehicles_row = document.createElement("tr");
		var no_vehicles_column = document.createElement("td");
		var no_vehicles_text = document.createTextNode("Nejsou zobrazena žádná vozidla");
		no_vehicles_column.appendChild(no_vehicles_text);
		no_vehicles_column.setAttribute("class","list_table_no_vehicles");
		no_vehicles_row.appendChild(no_vehicles_column);
		document.getElementById("list_table").appendChild(no_vehicles_row);
	} else {
		var table_vehicles_row = document.createElement("tr");
		var table_vehicles_column_number = document.createElement("td");
		var table_vehicles_column_lf = document.createElement("td");
		var table_vehicles_column_line = document.createElement("td");
		var table_vehicles_column_destination = document.createElement("td");
		var table_vehicles_column_delay = document.createElement("td");

		var table_vehicles_column_number_headline = document.createTextNode("#");
		var table_vehicles_column_lf_headline = document.createTextNode("NP");
		var table_vehicles_column_line_headline = document.createTextNode("linka");
		var table_vehicles_column_destination_headline = document.createTextNode("směr");
		var table_vehicles_column_delay_headline = document.createTextNode("zp.");

		table_vehicles_column_number.appendChild(table_vehicles_column_number_headline);
		table_vehicles_column_lf.appendChild(table_vehicles_column_lf_headline);
		table_vehicles_column_line.appendChild(table_vehicles_column_line_headline);
		table_vehicles_column_destination.appendChild(table_vehicles_column_destination_headline);
		table_vehicles_column_delay.appendChild(table_vehicles_column_delay_headline);

		table_vehicles_row.appendChild(table_vehicles_column_number);
		table_vehicles_row.appendChild(table_vehicles_column_lf);
		table_vehicles_row.appendChild(table_vehicles_column_line);
		table_vehicles_row.appendChild(table_vehicles_column_destination);
		table_vehicles_row.appendChild(table_vehicles_column_delay);
		table_vehicles_row.setAttribute("class","table_headline");

		document.getElementById("list_table").appendChild(table_vehicles_row);
		
		for (v in vehicles_map) {
			table_vehicles_row = document.createElement("tr");
			table_vehicles_column_number = document.createElement("td");
			table_vehicles_column_lf = document.createElement("td");
			table_vehicles_column_line = document.createElement("td");
			table_vehicles_column_destination = document.createElement("td");
			table_vehicles_column_delay = document.createElement("td");

			table_vehicles_text_number = document.createTextNode(vehicles_map[v]['properties']['trip']['vehicle_registration_number']);			
			table_vehicles_text_line = document.createTextNode(vehicles_map[v]['properties']['trip']['gtfs']['route_short_name']);
			table_vehicles_text_destination = document.createTextNode(vehicles_map[v]['properties']['trip']['gtfs']['trip_headsign']);
			table_vehicles_text_delay = document.createTextNode(Math.round((vehicles_map[v]['properties']['last_position']['delay']['actual'])/60)+" min");
			var vehicle_lf;
			if (vehicles_map[v]['properties']['trip']['wheelchair_accessible'] == true) {
				vehicle_lf = "ANO";
			} else {
				vehicle_lf = "NE";
			}
			table_vehicles_text_lf = document.createTextNode(vehicle_lf);

			table_vehicles_column_number.appendChild(table_vehicles_text_number);
			table_vehicles_column_lf.appendChild(table_vehicles_text_lf);
			table_vehicles_column_line.appendChild(table_vehicles_text_line);
			table_vehicles_column_destination.appendChild(table_vehicles_text_destination);
			table_vehicles_column_delay.appendChild(table_vehicles_text_delay);

			table_vehicles_column_number.setAttribute("class","list_table_number");
			table_vehicles_column_lf.setAttribute("class","list_table_lf");

			switch (vehicles_map[v]['properties']['trip']['vehicle_type']['description_cs']) {
				case 'tramvaj':
					table_type = 'tram';
					break;
				case 'trolejbus':
					table_type = 'tbus';
					break;
				case 'autobus':
				case 'náhradní doprava':
				case 'smluvní spoj':
				case 'spoj pro lidi s hendikepem':
				case 'školní spoj':
					table_type = 'bus';
					break;
				case 'regionální autobus':
					table_type = 'busreg';
					break;
				case 'vlak':
					table_type = 'train';
					break;
				case 'loď':
					table_type = 'boat';
					break;
				default:
					table_type = 'other';
					break;
			}

			table_vehicles_column_line.setAttribute("class", table_type+"_table_line");
			table_vehicles_column_destination.setAttribute("class","list_table_destination");
			table_vehicles_column_delay.setAttribute("class","list_table_delay");

			table_vehicles_row.appendChild(table_vehicles_column_number);
			table_vehicles_row.appendChild(table_vehicles_column_lf);
			table_vehicles_row.appendChild(table_vehicles_column_line);
			table_vehicles_row.appendChild(table_vehicles_column_destination);
			table_vehicles_row.appendChild(table_vehicles_column_delay);
			document.getElementById("list_table").appendChild(table_vehicles_row);
		}
	}	
}