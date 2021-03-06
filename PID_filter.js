var lf_i = 0;
var lf_boolean = false;

var type_filter = ["tram","tbus","bus","busreg","train","boat","other"];

var line_i = 0;
var line_boolean = false;

var lines_all = [];
var line;
var line_filter = [];

function filter_vehicles(data, lf_boolean) {
	var vehicles_map = [];
	var vehicles_lf = [];
	var vehicles_type = [];
	var vehicles_line = [];
	vehicles_amounts(data);

	vehicles_lf = filter_lf(data, vehicles_map, lf_boolean);	
	if (line_boolean == true) {
		lines_all = lines_list_on(data, lines_all);
		vehicles_line = filter_line(vehicles_lf, vehicles_line, line_filter);
		vehicles_map = vehicles_line;
	} else {
		type_map = filter_type(type_filter);
		vehicles_type = filter_type2(vehicles_lf, vehicles_type, type_map);
		lines_list_off();
		vehicles_map = vehicles_type;
	}
	filter(data, vehicles_map);
}

function filter_lf_button() {
	if (lf_i % 2 == 0) {
		lf_boolean = true;
		$("#lf_button").css({"background-color":"red", "color":"white"});
	} else {
		lf_boolean = false;
		$("#lf_button").css({"background-color":"WhiteSmoke", "color":"black"});
	}
	lf_i++;
}

function filter_lf(data, vehicles_lf, lf_boolean) {	
		if (lf_boolean == true) {
			for (i in data) {
				if (data[i]['properties']['trip']['wheelchair_accessible'] == true) {
					vehicles_lf.push(data[i]);
				}
			}
		} else {
			for (i in data) {
				vehicles_lf.push(data[i]);
			}
		}
	return vehicles_lf;	
}

function filter_type_button(type) {
	line_filter = [];
	line_boolean = false;
	$("#line_button").css({"background-color":"WhiteSmoke", "color":"black"});
	if (type_filter.includes(type)) {		
		for (i in type_filter) {
			if (type ==  type_filter[i]) {
				type_filter.splice(i, 1);
				$("#"+type+"_button").css({"background-color":"WhiteSmoke", "color":"black"});
			}
		}
	} else {
		type_filter.push(type);
		$("#"+type+"_button").css({"background-color":"red", "color":"white"});
	}
	return type_filter;
}

function filter_type(type_filter) {
	var type_map = [];
	if (type_filter.includes('tram')) {
		type_map.push("tramvaj", "noční tramvaj");
	}
	if (type_filter.includes('tbus')) {
		type_map.push("trolejbus", "noční trolejbus");
	}
	if (type_filter.includes('bus')) {
		type_map.push("autobus", "noční autobus");
	}
	if (type_filter.includes('busreg')) {
		type_map.push("regionální autobus","noční regionální autobus");
	}
	if (type_filter.includes('train')) {
		type_map.push("vlak");
	}
	if (type_filter.includes('boat')) {
		type_map.push("loď");
	}
	if (type_filter.includes('other')) {
		type_map.push("náhradní doprava","ostatní","spoj pro lidi s hendikepem","smluvní spoj", null);
	}
	return type_map;
}

function filter_type2(vehicles_lf, vehicles_type, type_map) {
	for (i in vehicles_lf) {
		if ((vehicles_lf[i]['properties']['trip']['vehicle_type']) &&
			type_map.includes(vehicles_lf[i]['properties']['trip']['vehicle_type']['description_cs'])) {
				vehicles_type.push(vehicles_lf[i]);
			}
	}
	return vehicles_type;
}

function filter_line_button() {
	if (line_i % 2 == 0) {
		line_boolean = true;
		type_filter = [];
		$("#line_button").css({"background-color":"red", "color":"white"});
	} else {
		line_boolean = false;
		$("#line_button").css({"background-color":"WhiteSmoke", "color":"black"});
	}
	line_i++;
}

function lines_list_on(data, lines_all) {
	for (i in data) {
		if ((lines_all.includes(data[i]['properties']['trip']['gtfs']['route_short_name'])) == false) {
			lines_all.push((data[i]['properties']['trip']['gtfs']['route_short_name']).toString());			
		}
	}
	lines_all.sort();

	$(".filter_checkbox").css({"background-color":"WhiteSmoke", "color":"black"});

	if (document.getElementById("line_list").hasChildNodes() == false) {
		for (l in lines_all) {
			(lines_all[l]).toString;
			var line_button = document.createElement("div");
			$(line_button).attr("id","L_"+lines_all[l]);
			$(line_button).attr("class","filter_line_button");
			$(line_button).attr("onclick","filter_line_button_list('"+lines_all[l]+"')");
			var line_text = document.createTextNode(lines_all[l]);
			$(line_button).append(line_text);
			$("#line_list").append(line_button);
		};
	}	
	return lines_all;
}

function lines_list_off() {

	if (document.getElementById("line_list").hasChildNodes()) {
		$("#line_list").html("");
	}	
}

function filter_line_button_list(line) {	
	if (line_filter.includes(line.toString())) {
		for (i in line_filter) {
			if (line.toString() == line_filter[i]) {
				line_filter.splice(i, 1);
				$("#L_"+line).css({"background-color":"WhiteSmoke", "color":"black"});
			}
		}
	} else {
		line_filter.push((line).toString());
		$("#L_"+line).css({"background-color":"red", "color":"white"});
	}
	return line_filter;
}

function filter_line(data, vehicles_line, line_map) {
	for (i in data) {
		if (line_filter.includes(data[i]['properties']['trip']['gtfs']['route_short_name'])) {
				vehicles_line.push(data[i]);
			}
	}
	return vehicles_line;
}

function filter(data, vehicles_map) {
	console.log("Vybráno vozidel: "+vehicles_map.length);
	show_vehicles(map, extent, vehicles_map);
	vehicles_map_list(vehicles_map);
}

var input = document.getElementById("search_text");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("search_button").click();
  }
});

function find_vehicle() {
	for (v in vehicles_all.getLayers()) {
		if (vehicles_all.getLayers()[v]['options']['vehicle_number'] == $("#search_text").val()) {
			vehicles_all.getLayers()[v].openPopup();
		}
	}
}

function zoom_all_vehicles(vehicles_all) {
	if ((vehicles_all.getLayers()).length > 0) {
		var v_map = new L.featureGroup(vehicles_all.getLayers());
		map.fitBounds(v_map.getBounds());
	}	
}