
var OSM_color = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }),
	OSM_BW = L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' });

var baseMaps = {
"OpenStreetMap černobílá": OSM_BW,
"OpenStreetMap barevná": OSM_color
};

var map = L.map('map', {
	center: [50.0877258, 14.4211267],
	zoom: 9,
	layers: [OSM_BW]
})

L.control.scale().addTo(map);
L.control.layers(baseMaps).addTo(map);

var extent = map.getBounds();
var markersLayer = new L.LayerGroup();
var coordCenterLat;
var coordCenterLng;

coordCenterLat = map.getCenter()['lat'];
coordCenterLng = map.getCenter()['lng'];

var limit = 0;
var stops_names;

setTimeout(function(){
	stops_names = get_stop_names();
	get_data_vehicles();	
	var interval = setInterval(function(){				
		limit++;
		if (limit < 10) {
			get_data_vehicles();
		} else {
			alert('Dosažen limit '+limit+' opakování dotazu!');
			stopInterval(interval);
		}
	}, 10000);
	get_data_zones();
}, 500)

function stopInterval(interval) {
	clearInterval(interval);
}

	
	

	

