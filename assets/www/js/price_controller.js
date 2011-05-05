PriceController = function() {

	this.get_price = function(params) {
		var success = function(response) {			
			alert(response);
		}
		var fail = function(error_type) {
			if (error_type == "cab_unavailable") {
				alert('Taxi indisponivel');
			} else if (error_type == "invalid_address") {
				alert('Endereço incorreto');
			} else {
				alert('Um erro inesperado ocorreu, contacte o suporte da aplicação');
			}
			document.location.hash = '#/run/route';
		}
		price_model.get_price(params, success, fail);		
	}
}