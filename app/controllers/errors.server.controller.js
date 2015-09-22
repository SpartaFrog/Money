'use strict';

/**
 * Get the correct field name message from
 */
 var getCorrectFieldName = function(fieldName){
	if(fieldName === 'username'){
		return 'Nombre de usuario';
	}

	return fieldName;
 };

/**
 * Get unique error field name
 */
var getUniqueErrorMessage = function(err) {
	var output;

	try {
		var fieldName = err.err.substring(err.err.lastIndexOf('.$') + 2, err.err.lastIndexOf('_1'));

		fieldName = getCorrectFieldName(fieldName);

		output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' ya existe';

	} catch (ex) {
		output = 'Unique field already exists';
	}

	return output;
};

/**
 * Get the error message from error object
 */
exports.getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = getUniqueErrorMessage(err);
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Get the error object from error code
 */
exports.getError = function(errCode, errorMessage, errorData) {
	var error = {
		code: 500,
		message: 'Se ha producido un error en el servidor.',
		name: 'Internal Server Error',
		data: errorData || {}
	};

	if (errCode) {
		switch (errCode) {
			case 400:
				error.code = 400;
				error.message = errorMessage || 'Los datos enviados no tienen un formato válido.';
				error.name = 'Bad Request';
				break;
			case 401:
				error.code = 401;
				error.message = 'Inicia sesión para usar este servicio.';
				error.name = 'Unathorized';
				break;
			case 403:
				error.code = 403;
				error.message ='Se ha rechazado su petición por falta de permisos.';
				error.name = 'Forbidden';
				break;
			case 409:
				error.code = 409;
				error.message ='Los datos enviados han producido un conflicto al lanzar el proceso.';
				error.name = 'Conflict';
				break;
		}
	}

	return error;
};
