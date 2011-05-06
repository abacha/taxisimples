PriceController = function() {

	this.get_price = function(params) {
		var success = function(response) {			
		}
		var fail = function(error_type) {
			document.location.hash = '#/run/route';
			if (error_type == "cab_unavailable") {
				alert('Taxi indisponivel');
			} else if (error_type == "invalid_address") {
				alert('Endereço incorreto');
			} else {
				alert('Um erro inesperado ocorreu! Tente novamente dentro de alguns minutos.');
			}
		}
		price_model.get_price(params, success, fail);		
	}
}