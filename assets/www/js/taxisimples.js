Configuration = {
	access_token : false,
	client_id : "d845ddf93f3229b0574031dc3bc25611eec5998dce3d432a9cdc7efcd96cc3e9",
	client_secret : "e2beae8e4c13755b051546f6c3443066af78760e97c83a9f4daf00cbfacbd95a",
	server : "http://taxisimplessandbox.heroku.com"
}

Url = {
	Oauth2 : {
		authenticate : Configuration.server + "/oauth2/authorize",
		callback_authenticate : document.location + "#/user/authorize_return",
		access_token : Configuration.server + "/oauth2/access_token",
		callback_access_token : document.location + "#/user/receive_access_token"
	},
	Run : {
		price : Configuration.server + "/v2/price",
		history : Configuration.server + "/v2/self"

	},
	Cab : {
		request : Configuration.server + "/v2/cabrequest",
		info : Configuration.server + "/v2/cabrequest/"
	}

}

var oauth2_controller = new OAuth2Controller();
var price_controller = new PriceController();
var cab_controller = new CabController();

var oauth2_model = new OAuth2Model();
var price_model = new PriceModel();
var cab_model = new CabModel();

var app = $.sammy("#page", function() {
	this.get('#/', function() {
		if (Configuration.access_token) {
			this.partial('view/route.html');
		} else {
			this.partial('view/personal_info.html');
		}
	});

	this.post('#/user/confirm_pin', oauth2_controller.confirm_pin);
	this.post('#/user/authorize', oauth2_controller.request_pin);
	this.get('#/run/route', function() {
		this.partial('view/route.html');
		$("#map").hide();
		$("#header").html("");
		$("#page").removeClass("map-wrap");
	});
	this.get('#/run/history', cab_controller.get_history);

	this.post('#/run/price', function() {
		this.partial('view/map.html');
		price_controller.get_price(this.params);
	});
	
	this.post("#/run/request", function() {
		this.partial('view/run_status.html');
		cab_controller.request(this.params);
	});

	this.get("#/user/confirm_pin", function(context) {
		context.partial("view/confirm_pin.html");
	});

});

var initializer = function() {
	// document.addEventListener("deviceready", function() {
	Configuration.access_token = window.localStorage.getItem("access_token");
	app.run("#/")
	// }, false);
}