function get_data_stops_name(){
	$.getJSON("Data/PID_GTFS/PID_Export_JSON.json", function(stops) {	 	
		stops = stops;
	 	stops = stops['stops'];
		show_stops(stops);	
	});
}	