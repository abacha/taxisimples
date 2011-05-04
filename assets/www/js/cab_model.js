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
					}
					else {
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
				status = { "cab_confirmed":"Confirmado", "cab_unavaliable":"Indisponível", "cab_canceled":"Cancelado" }
				switch (data.meta.code) {
				case 200:
					$.each(data.response.lasts_cab_requests, function(k, value) {
						$("#history").append(((k % 2 == 0) ? "<tr>":"<tr class=\"zebra\">") +
							"<td class=\"center\">"+value.date.replace("T", " ")+"</td>" +
							"<td>"+value.dest.lat + "," + value.dest.lng +"</td>" +
							"<td class=\"center\"><strong class=\""+ value.status +"\">" + status[value.status] + "</strong></td>"+
							"<td class=\"center\"><a href=\"\" class=\"btn btn-small\">Chamar</a></td></tr>");
					});
					break;
				default:
					fail(data.meta.code);
					break;
				}
			}
		});
	}
}