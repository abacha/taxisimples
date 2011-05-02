var PriceModel = function() {

	this.get_price = function(params, success, fail) {
		var data = {
			access_token : Configuration.access_token,
			start_point : "str:" + params["start_point"],
			end_point : "str:" + params["end_point"]
		}
		$.ajax({
			url : Url.Run.price,
			type : "GET",
			data : data,
			dataType : "jsonp",
			success : function(data) {
				switch (data.meta.code) {
				case 200:
					$("#normal_price").html("R$ " + (data.response.normal_price / 100));
					$("#special_price").html("R$ " + (data.response.normal_price / 100));
					$("#distance").html(data.response.distance + " km");
					$("#page").addClass("map-wrap");
					$("#start_point").val(params["start_point"]);
					$("#end_point").val(params["end_point"]);
					$("#header").html(
							'<a href="#/run/route" class="btn-back"><img src="img/btn-back.png" alt="Voltar" /></a>'
							+ '<a href="#" onclick="$(\'#route_form\').submit()" class="btn-call"><img src="img/btn-call.png" alt="Chamar" /></a>');
					var route_model = new RouteModel();
					route_model.get_route(params);
					$("#map").show();
					break;
				default:
					fail(data.meta.error_enum);
					break;

				}
			}
		});
	}
}