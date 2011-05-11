var OAuth2Model = function() {

	this.request_pin = function(params, success, fail) {
		url = Url.Oauth2.authenticate;
		if (params["client_phone"].length == 10)
			params["client_phone"] = "55" + params["client_phone"];
		params = {
			client_id : Configuration.client_id,
			response_type : "code",
			passenger_phone : params["client_phone"],
			passenger_name : params["client_name"]
		}
		$.ajax({
			url : url,
			type : "GET",
			data : params,
			dataType : "jsonp",
			success : function(data) {
				switch (data.meta.code) {
				case 401:
					success();
					break;
				case 400:
					fail(data.meta.error_enum);
					break;
				default:
					fail();
					break;
				}
			}
		});
	}

	this.confirm_pin = function(pin, success, fail) {
		params = {
			client_id : Configuration.client_id,
			client_secret : Configuration.client_secret,
			grant_type : 'authorization_code',
			code : pin
		}
		$.ajax({
			url : Url.Oauth2.access_token,
			type : "GET",
			data : params,
			dataType : "jsonp",
			success : function(data) {
				if (data.meta.code == 200) {
					Configuration.access_token = data.response.access_token;
					window.localStorage.setItem("access_token", Configuration.access_token);
					success();
				} else {
					fail();
				}
			}
		});
	}
}