var RouteModel = function() {

	this.get_route = function(params) {
		var myLatlng = new google.maps.LatLng(-9.95934975, -67.79386425);
		var myOptions = {
			zoom : 8,
			center : myLatlng,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};
		var directionsService = new google.maps.DirectionsService();
		var directionsDisplay = new google.maps.DirectionsRenderer();
		var map = new google.maps.Map(document.getElementById("map"), myOptions);
		directionsDisplay.setMap(map);
		var request = {
			origin : params["start_point"],
			destination : params["end_point"],
			travelMode : google.maps.DirectionsTravelMode.DRIVING

		};
		directionsService.route(request, function(result, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(result);
			}
		});
	}
}