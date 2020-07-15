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
	//pro každé vozidlo vygenerovat řádek tabulky a do každého sloupce vložit atribut
	//seřazení = nové vygenerování tabulky podle parametru/atributu
	console.log(vehicles_map);
}