PriceController = function() {

	this.get_price = function(params) {
		var success = function(response) {			
			alert(response);
		}
		var fail = function(error_type) {
			alert("Ocorreu um erro na solicitação" + error_type);
			document.location.hash = '#/run/route';
		}
		price_model.get_price(params, success, fail);		
	}
}