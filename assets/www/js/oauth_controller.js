OAuth2Controller = function() {
	this.request_pin = function(context) {

		var success = function() {
			alert("Agora você receberá um SMS com um código. Digite o código na próxima tela para concluir seu cadastro.");
			document.location.hash = '#/user/confirm_pin';
		}

		var fail = function(error_type) {
			if (error_type == "invalid_phone") {
				alert('Numero de telefone invalido');
			} else if (error_type == "invalid_name") {
				alert('Nome muito curto');
			} else {
				alert('Um erro inesperado ocorreu, contacte o suporte da aplicação');
			}
		}

		oauth2_model.request_pin(this.params, success, fail);
	}

	this.confirm_pin = function(context) {
		var success = function() {
			document.location.hash = '#/';
		}
		var fail = function() {
			alert("Codigo PIN não foi validado");
		}
		oauth2_model.confirm_pin(this.params["pin_code"], success, fail);
	}
}