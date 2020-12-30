function vehicles_amounts(vehicles_map) {
	var trams_map = [];
	var tbuses_map = [];
	var buses_map = [];
	var busreg_map = [];
	var trains_map = [];
	var boats_map = [];
	var others_map = [];
	for (i in vehicles_map) {
		if (vehicles_map[i]['properties']['trip']['vehicle_type'] != null) {
			if ((vehicles_map[i]['properties']['trip']['vehicle_type']['description_cs'] == "tramvaj") ||
				(vehicles_map[i]['properties']['trip']['vehicle_type']['description_cs'] == "noční tramvaj")) {
				trams_map.push(vehicles_map[i]);
			} else if (vehicles_map[i]['properties']['trip']['vehicle_type']['description_cs'] == "trolejbus") {
				buses_map.push(vehicles_map[i]);
			} else if ((vehicles_map[i]['properties']['trip']['vehicle_type']['description_cs'] == "autobus") ||
				(vehicles_map[i]['properties']['trip']['vehicle_type']['description_cs'] == "noční autobus")) {
				buses_map.push(vehicles_map[i]);
			} else if ((vehicles_map[i]['properties']['trip']['vehicle_type']['description_cs'] == "regionální autobus") ||
				(vehicles_map[i]['properties']['trip']['vehicle_type']['description_cs'] == "noční regionální autobus")) {
				busreg_map.push(vehicles_map[i]);
			} else if (vehicles_map[i]['properties']['trip']['vehicle_type']['description_cs'] == "vlak") {
				trains_map.push(vehicles_map[i]);
			} else if (vehicles_map[i]['properties']['trip']['vehicle_type']['description_cs'] == "loď") {
				boats_map.push(vehicles_map[i]);
			} else {
				others_map.push(vehicles_map[i]);
			}
		} else {
			vehicles_map.splice(i);
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
	$("#"+id+"").html(vehicle_type_array.length);
}

function vehicles_map_list(vehicles_map_list) {
	var table = document.getElementById("list_table");
	var row;
	var cell1;
	var cell2;
	var cell3;
	var cell4;
	var cell5;

	$("#list_table").find("tr:not(:first)").remove();

	if (vehicles_map_list.length == 0) {
		row = table.insertRow(1);
		cell1 = row.insertCell(0);
		$(cell1).html("Není zobrazeno žádné vozidlo!");
		$(cell1).attr("colspan", "5");
		$(cell1).attr("class", "list_table_no_vehicles");
	}

	for (v = 0; v < vehicles_map_list.length; v++) {
		row = table.insertRow(1);
		cell1 = row.insertCell(0);
		cell2 = row.insertCell(1);
		cell3 = row.insertCell(2);
		cell4 = row.insertCell(3);
		cell5 = row.insertCell(4);
		$(cell1).html(vehicles_map_list[v]['properties']['trip']['vehicle_registration_number']);
		$(cell3).html(vehicles_map_list[v]['properties']['trip']['gtfs']['route_short_name']);
		$(cell4).html(vehicles_map_list[v]['properties']['trip']['gtfs']['trip_headsign']);
		$(cell5).html(Math.round((vehicles_map_list[v]['properties']['last_position']['delay']['actual'])/60)+" min");
		if (vehicles_map_list[v]['properties']['trip']['wheelchair_accessible'] == true) {
				vehicle_lf = "ANO";
			} else {
				vehicle_lf = "NE";
			}
		$(cell2).html(vehicle_lf);

		switch (vehicles_map_list[v]['properties']['trip']['vehicle_type']['description_cs']) {
				case 'tramvaj':
					table_type = 'tram';
					break;
				case 'noční tramvaj':
					table_type = 'nighttram';
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
				case 'noční regionální autobus':
					table_type = 'nightbusreg';
					break;
				case 'noční autobus':
					table_type = 'nightbus';
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

		$(cell1).attr("class", "list_table_number");
		$(cell2).attr("class", "list_table_lf");
		$(cell3).attr("class", table_type+"_table_line");
		$(cell4).attr("class", "list_table_destination");
		$(cell5).attr("class","list_table_delay");
	}
}

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("list_table");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}