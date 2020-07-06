var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr}),
	streets  = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});

var baseMaps = {
"základní mapa (odstíny šedi)": grayscale,
"komunikace": streets
};

var map = L.map('map', {
	center: [50.0877258, 14.4211267],
	zoom: 9,
	layers: [grayscale, streets]
})

L.control.scale().addTo(map);
L.control.layers(baseMaps).addTo(map);

//user's location
map.locate({setView: true, maxZoom: 16});
function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("Zde se nacházíte").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}
function onLocationError(e) {
    alert(e.message);
}
map.on('locationerror', onLocationError);
map.on('locationfound', onLocationFound);


var extent = map.getBounds();
var markersLayer = new L.LayerGroup();
var coordCenterLat;
var coordCenterLng;

coordCenterLat = map.getCenter()['lat'];
coordCenterLng = map.getCenter()['lng'];

var limit = 0;

setTimeout(function(){
	get_data_vehicles();
	get_data_zones();
	}, 500)

	
	

	

