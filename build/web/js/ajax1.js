function loadDoc() {
	var addressName = document.getElementById("address").value;
	var city = document.getElementById("city").value;
	var country = document.getElementById("country").value;
	var address = addressName + " " + city + " " + country;

	const data = null;
	const xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === this.DONE) {
			const obj = JSON.parse(xhr.responseText);
			markers.clearMarkers();
			if (Object.keys(obj).length === 0) {
				document.getElementById("addrCheck").innerHTML = "Address not found";
			} else {
				exist(obj);
			}
		}
	});

	xhr.open("GET", "https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q=" + address + "&acceptlanguage=en&polygon_threshold=0.0");
	xhr.setRequestHeader("x-rapidapi-host", "forward-reverse-geocoding.p.rapidapi.com");
	xhr.setRequestHeader("x-rapidapi-key", "2262984b78msh1631f7878cd6956p1d722bjsn98e6b1f09130");
	xhr.send(data);
}

//Orismos Marker
map = new OpenLayers.Map("Map");
var mapnik = new OpenLayers.Layer.OSM();
map.addLayer(mapnik);

//Orismos Thesis
function setPosition(lat, lon) {
	var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
	var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
	var position = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);
	return position;
}

//Orismos Handler

function handler(position, message) {
	var popup = new OpenLayers.Popup.FramedCloud("Popup",
		position, null,
		message, null,
		true // <-- true if we want a close (X) button, false otherwise
	);
	map.addPopup(popup);

}

//Markers	
var markers = new OpenLayers.Layer.Markers("Markers");
map.addLayer(markers);

//Pmap on crete
var position = setPosition(35.3053121, 25.0722869);
var mar = new OpenLayers.Marker(position);
//markers.addMarker(mar);	

function exist(obj) {
	if (obj[0].display_name.includes("Crete")) {
		var position = setPosition(obj[0].lat, obj[0].lon);
		var mar = new OpenLayers.Marker(position);
		markers.addMarker(mar);
		mar.events.register('mousedown', mar, function (evt) {
			handler(position, 'Your address');
		}
		);
		//Orismos zoom	
		const zoom = 10;
		map.setCenter(position, zoom);

	} else {
		document.getElementById("addrCheck").innerHTML = "Service available only in Crete";
	}
}


//Orismos zoom	
const zoom = 10;
map.setCenter(position, zoom);