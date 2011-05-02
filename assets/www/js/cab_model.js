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
					if (data.response.cab) {
						$("#name").html(data.response.cab.name);
						$("#phone").html(data.response.cab.phone);
						$("#distance").html(data.response.cab.distance);
						$("#map").show();
					}
					else {
						$("#map").hide();
					}
					if (data.response.status == "cab_pendent") {
						$("#status_wait").show();
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

	this.request = function(params, success, fail) {
		console.dir(params);
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

	this.get_history = function(access_token) {
		$.ajax({
			url : Url.Run.history,
			type : "GET",
			data : {
				"access_token" : access_token
			},
			dataType : "jsonp",
			success : function(data) {
				switch (data.meta.code) {
				case 200:
					success();
					break;
				default:
					console.dir(data);
					fail(data.meta.code);
					break;
				}
			}
		});
	}
}