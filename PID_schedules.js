
function get_data_stops_name(){

	var request = new XMLHttpRequest();
		request.open('GET','Data/PID_GTFS/PID_Export_JSON.json');
		request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

		request.onreadystatechange = function () {
			if (this.readyState === 4) {
			    var stops_names = JSON.parse(this.responseText);
			    stops_names = stops_names['List1'];
				console.log(stops_names);
				return stops_names;
			}		    
		};
		request.send();// - ZABLOKOVÁNO!
}	