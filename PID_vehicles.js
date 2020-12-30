var data;
var vehicles_all;

function setting_range_vehicles(range) {		
		var NW = L.latLng(map.getBounds().getNorthWest());
		var SW = L.latLng(map.getBounds().getSouthWest());
		var range = Math.round((Math.max(NW.distanceTo(map.getBounds().getSouthEast()), SW.distanceTo(map.getBounds().getNorthEast())))/2);
		return range;
}

function get_data_vehicles(range){
	//restrict request for vehicles by extent
	range = setting_range_vehicles(range);
	var link = ('https://api.golemio.cz/v2/vehiclepositions/?latlng='+map.getCenter()['lat']+','+map.getCenter()['lng']+'&range='+range).toString();
	//console.log(link);

	var request = new XMLHttpRequest();

	request.open('GET', link);
	//request.open('GET','Data/PID_poloha_vozidel.json');

	request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	request.setRequestHeader('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJyb2Rza3kuamFuQHNlem5hbS5jeiIsImlkIjozMTEsIm5hbWUiOm51bGwsInN1cm5hbWUiOm51bGwsImlhdCI6MTU5MjY1MjI5NSwiZXhwIjoxMTU5MjY1MjI5NSwiaXNzIjoiZ29sZW1pbyIsImp0aSI6Ijc4NDM5NzFiLTc4MDctNDVhNy04ZjY2LTVmNjE5Nzk1ZmU5ZCJ9.XKzc8UYMiiwRgkk0iootvnBb66wyVUAzupgapKCXxMg');

	request.onreadystatechange = function () {
	  if (this.readyState === 4) {
	    data = JSON.parse(this.responseText);	  
	  }
	};
	request.send();
	
	setTimeout(function(){
		if (data) {
			data = data['features'];
		} else {
			alert("Data o poloze vozidel se nepodařilo nahrát. Aktualizujte stránku!");
		}

		filter_vehicles(data, lf_boolean);
	}, 2000)		
}	

function get_stop_names() {
	var request = new XMLHttpRequest();

	request.open('GET', "Data/PID_GTFS/PID_Stops.json");

	request.onreadystatechange = function () {
		if (this.readyState === 4) {
		    stops_names = JSON.parse(this.responseText);	
		    stops_names = stops_names['stops'];
		    setTimeout(function(){
				return stops_names;
			}, 750)
		  }
		};
	request.send();
}

function show_vehicles(map, extent, vehicles_map) {		
		
	var info;		
	var line;
	var destination;
	var connection_number;
	var type;
	var number;
	var connection;
	var operator;
	var operator_sa;
	var lf;
	var marker;
	var delay;
	var stop_current;
	var stop_current_name;
	var vehicles = [];
	if (vehicles_all) {
		vehicles_all.clearLayers();
	}	

	for (v in vehicles_map) {

		line = vehicles_map[v]['properties']['trip']['gtfs']['route_short_name'];
		destination = vehicles_map[v]['properties']['trip']['gtfs']['trip_headsign'];
		connection_number = vehicles_map[v]['properties']['trip']['cis']['trip_number'];
		stop_current = vehicles_map[v]['properties']['last_position']['last_stop']['id'];
		for (s in stops_names) {
			if (stops_names[s]['stop_id'] == stop_current) {
				stop_current_name = stops_names[s]['stop_name'];
			}
		}				
		delay = Math.round((vehicles_map[v]['properties']['last_position']['delay']['actual'])/60);
		type = vehicles_map[v]['properties']['trip']['vehicle_type']['description_cs'];
		number = vehicles_map[v]['properties']['trip']['vehicle_registration_number'];
		connection = vehicles_map[v]['properties']['trip']['gtfs']['trip_id'];
		operator = vehicles_map[v]['properties']['trip']['agency_name']['real'];
		
		if (operator.includes("ARRIVA SČ")) {
			operator_sa = "ARRIVA Střední Čechy";
		} else if (operator.includes("ARRIVA CITY")) {
			operator_sa = "ARRIVA CITY";	
		} else if (operator.includes("ČSAD SČ")) {
			operator_sa = "ČSAD Střední Čechy";
		} else if (operator.includes("ČSAD Benešov")) {
			operator_sa = "ČSAD Benešov";
		} else if (operator.includes("TRANSDEV SČ")) {
			operator_sa = "TRANSDEV Střední Čechy";
		} else if (operator.includes("OAD")) {
			operator_sa = "OAD Kolín";		
		} else {
			operator_sa = operator;
		}

		lf = vehicles_map[v]['properties']['trip']['wheelchair_accessible'];
		if (lf == true) {
			lf = "ANO";
		} else {
			lf = "NE";
		}			
		position_lat = vehicles_map[v].geometry.coordinates[1];
		position_lng = vehicles_map[v].geometry.coordinates[0];

		var icon;
		if (type == "tramvaj") {
			icon = new L.DivIcon({
	        className: 'my-div-icon',
	        html: '<div style="border: 0.25px solid black; color:white; background-color: red; height:15px; width:25px; font-weight:bold; vertical-align:baseline; text-align:center;">'+line+'</div>'
	   		 })
		} else if (type == "noční tramvaj") {
			icon = new L.DivIcon({
	        className: 'my-div-icon',
	        html: '<div style="border: 0.25px solid black; color:orange; background-color: black; height:15px; width:25px; font-weight:bold; vertical-align:baseline; text-align:center;">'+line+'</div>'
	   		 })
		} else if (type == "trolejbus") {
			icon = new L.DivIcon({
	        className: 'my-div-icon',
	        html: '<div style="border: 0.25px solid black; color:white; background-color: DarkGreen; height:15px; width:25px; font-weight:bold; vertical-align:baseline; text-align:center;">'+line+'</div>'
	   		 })
		} else if (type == "noční autobus") {
			icon = new L.DivIcon({
	        className: 'my-div-icon',
	        html: '<div style="border: 0.25px solid black; color:gold; background-color: black; height:15px; width:25px; font-weight:bold; vertical-align:baseline; text-align:center;">'+line+'</div>'
	   		 })
		} else if (type == "autobus" || type == "náhradní doprava" || type == "smluvní spoj" || type == "spoj pro lidi s hendikepem" || type == "školní spoj") {
			icon = new L.DivIcon({
	        className: 'my-div-icon',
	        html: '<div style="border: 0.25px solid black; color:white; background-color: DodgerBlue; height:15px; width:25px; font-weight:bold; vertical-align:baseline; text-align:center;">'+line+'</div>'
	   		 })
		} else if (type == "regionální autobus") {
			icon = new L.DivIcon({
		        className: 'my-div-icon',
		        html: '<div style="border: 0.25px solid black; color:white; background-color: SeaGreen; height:15px; width:25px; font-weight:bold; vertical-align:baseline; text-align:center;">'+line+'</div>'
		    })
		} else if (type == "noční regionální autobus") {
			icon = new L.DivIcon({
		        className: 'my-div-icon',
		        html: '<div style="border: 0.25px solid black; color:yellow; background-color: black; height:15px; width:25px; font-weight:bold; vertical-align:baseline; text-align:center;">'+line+'</div>'
		    })
		} else if (type == "loď") {
			icon = new L.DivIcon({
		        className: 'my-div-icon',
		        html: '<div style="border: 0.25px solid black; color:white; background-color: #000080; height:15px; width:25px; font-weight:bold; vertical-align:baseline; text-align:center;">'+line+'</div>'
		    })		
		} else if (type == "vlak") {
			icon = new L.DivIcon({
		        className: 'my-div-icon',
		        html: '<div style="border: 0.25px solid black; color:white; background-color: SaddleBrown; height:15px; width:25px; font-weight:bold; vertical-align:baseline; text-align:center;">'+line+'</div>'
		    })			
		} else {
			icon = new L.DivIcon({
		        className: 'my-div-icon',
		        html: '<div style="border: 0.25px solid black; color:white; background-color: darkred; height:15px; width:40px; font-weight:bold; vertical-align:baseline; text-align:center;">'+line+'</div>'
		    })
		}
		info = ("<b>"+line+" > "+destination.toUpperCase()+"</b><br>"+type+"<br><a href='https://seznam-autobusu.cz/seznam?evc="+number+"&operator="+operator_sa+"' target='_blank'>#"
			+number+"</a> spoj: "+connection_number+"<br>Zpoždění: "+delay+" min<br>Aktuální zastávka: "+stop_current_name
			+"<br>dopravce: "+operator+"<br>nízkopodlažní? "+lf).toString();	

		customMarker = L.Marker.extend({
		    	options: {
		    		vehicle_number: number
		    	}
		    });

		var vehicle = new customMarker([position_lat, position_lng], {icon: icon, vehicle_number: number});
		    vehicle.addTo(map)
		    vehicle.bindPopup(info)
			vehicles.push(vehicle);
	}		
	vehicles_all = L.layerGroup(vehicles).addTo(map);	
}	