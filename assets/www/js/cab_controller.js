CabController = function() {
	
	this.request = function(params) {
		var success = function() { }
		var fail = function(error_type) {
			if (error_type == "cab_unavailable") {
				alert('Taxi indisponivel');
			} else if (error_type == "invalid_address") {
				alert('Endereço incorreto');
			} else {
				alert('Um erro inesperado ocorreu, contacte o suporte da aplicação');
			}
		}
		cab_model.request(params, success, fail);
	}

	this.get_history = function(context) {
		var fail = function(error_type) {
			alert('Um erro inesperado ocorreu, contacte o suporte da aplicação');
		}
		cab_model.get_history(Configuration.access_token, fail);
	}

	this.get_info = function(id) {
		cab_model.get_info(Url.Cab.info + id);
	}
	
}