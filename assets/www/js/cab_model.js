var CabModel = function() {

	var get_info = function(url) {
		$.ajax({
			url : url,
			type : "GET",
			data : {
				"access_token" : Configuration.access_token
			},
			dataType : "jsonp",
			success : function(data) {
				switch (data.meta.code) {
				case 200:
					$("#header").html('<a href="#/run/history" class="btn-back"><img src="img/btn-back.png" alt="Voltar" /></a>');
					$(".status").hide();
					$("#run_id").val(data.response.id);
					if (data.response.cab) {
						if (!$("#map").is(":visible")) {
							$("#map").show();
							$("#map").addClass('map-2');
						}
						$("#distance").html(data.response.cab.distance + " km");
						$("#normal_price").html("R$ " + data.response.normal_price);
						$("#special_price").html("R$ " + data.response.special_price);
						$("#status_ok").show();
						$("#cab").html(data.response.cab.name + " - " + data.response.cab.phone.substr(2).replace(/(\d{2})/, "($1) "));

						var params = new Array();
						params["start_point"] = data.response.cab.position.lat + "," + data.response.cab.position.lat;
						params["end_point"] = data.response.origin.lat + "," + data.response.origin.lng;
						var route_model = new RouteModel();
						route_model.get_route(params);
					} else {
						$("#map").hide();
					}
					if (data.response.status == "cab_pendent") {
						$("#status_wait").show();
					}
					if (data.response.status == "cab_unavaliable") {
						$("#status_error").show();
					}
					if (data.response.status == "canceled") {
						$("#status_cancel").show();
					}
					$("#page").addClass("map-wrap map-taxi");
					break;
				default:
					fail(data.meta.code);
					break;
				}
			}
		});
	}

	this.get_info = function(params) {
		get_info(params);
	}

	this.request = function(params, success, fail) {
		var data = {
			access_token : Configuration.access_token,
			start_point : "str:" + params["start_point"],
			end_point : "str:" + params["end_point"]
		}
		$.ajax({
			url : Url.Cab.request,
			type : "GET",
			data : data,
			dataType : "jsonp",
			success : function(data) {
				switch (data.meta.code) {
				case 200:
					success();
					get_info(Url.Cab.info + data.response.id);
					break;
				default:
					console.dir(data);
					fail(data.meta.code);
					break;
				}
			}
		});
	}

	this.get_history = function(access_token, fail) {
		$.ajax({
			url : Url.Run.history,
			type : "GET",
			data : {
				"access_token" : access_token
			},
			dataType : "jsonp",
			success : function(data) {
				status = {
					"cab_confirmed" : "Confirmado",
					"cab_unavaliable" : "Indisponível",
					"cab_canceled" : "Cancelado"
				}
				switch (data.meta.code) {
				case 200:
					$.each(data.response.lasts_cab_requests, function(k, value) {
						get_address(value.dest.lat + "," + value.dest.lng, function(address) {
							var destination = address[1].long_name + ", " + address[0].long_name;
							var city = address[3].long_name;
							var tr = ".tr_" + k;
							$(".super").clone().removeClass("super").addClass("tr_" + k).appendTo("#history");
							if (k % 2 == 0) {
								$(tr).addClass("zebra");
							}
							$(tr + " .date").html(value.date.replace(/(\d{4})-(\d{2})-(\d{2})T([0-9:]{5}).*/, "$3/$2/$1 às $4"));
							$(tr + " .status").addClass(value.status).html(status[value.status]);
							$(tr + " .dest").html(destination);
							//$(tr + " .btn").attr("href", $(tr + " a").attr("href") + "&destination=" + destination); 
							$(tr + " .btn").click(function() {
								alert(destination);
							});
						});
					});
					$(".super").remove();
					break;
				default:
					fail(data.meta.code);
					break;
				}
			}
		});
	}

	var get_address = function(latlng, success) {
		$.ajax({
			url : "http://maps.googleapis.com/maps/api/geocode/json?sensor=false",
			type : "GET",
			data : { "latlng" : latlng } ,
			dataType : "json",
			success : function(data) {
				if (data.status == "OK") {
					if (data.results[0]) {
						success(data.results[0].address_components);
					}
				}
			}
		});
	}
}