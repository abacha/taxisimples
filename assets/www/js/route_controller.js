var RouteController = function() {
	this.render = function(params) {
		$("#map").hide();
		$("#header").html("");
		$("#page").removeClass("map-wrap");
	}
}