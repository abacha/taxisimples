Configuration = {
	access_token : false,
	client_id : "2769ca0ac1bb65476d629505354b825341e3d084172bfb3a942748c2974d9791",
	client_secret : "ef17c2460488184901d82f3e72a21ff04da4838a8beb0284628cf27692cf6464",
	server : "http://app.taxisimples.com.br"
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
	},

	cities : Configuration.server + '/cidades.json'

}

var oauth2_controller = new OAuth2Controller();
var price_controller = new PriceController();
var cab_controller = new CabController();
var route_controller = new RouteController();

var oauth2_model = new OAuth2Model();
var price_model = new PriceModel();
var cab_model = new CabModel();

var app = $.sammy("#page", function() {
	this.get('#/', function() {
		if (Configuration.access_token) {
			document.location.hash = '#/run/route';
		} else {
			this.partial('view/personal_info.html');
		}
	});

	this.post('#/user/confirm_pin', oauth2_controller.confirm_pin);
	this.post('#/user/authorize', oauth2_controller.request_pin);
	this.get('#/run/route', function() {
		if (!Configuration.access_token) {
			document.location.hash = "#";
		} else {
			this.partial('view/route.html');
			route_controller.render(this.params);
		}
	});
	this.get('#/run/history', function() {
		if (!Configuration.access_token) {
			document.location.hash = "#";
		} else {
			this.partial('view/history.html');
			cab_controller.get_history();
		}
	});

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
	document.addEventListener("deviceready", function() {
		Configuration.access_token = window.localStorage.getItem("access_token");
		app.run("#/")
	}, false);
}