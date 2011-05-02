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
		cab_model.get_history(Configuration.access_token);
	}

	this.get_info = function(context) {
		alert(1);
		cab_model.get_info(Configuration.access_token, id);
		alert(2);
	}
	
}