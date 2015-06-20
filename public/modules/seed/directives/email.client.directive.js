'use strict';

angular.module('seed').directive('email', [
	function() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, element, attrs, ctrl) {

				var EMAIL_REGEXP = /.+\@.+\..+/;

				var validate = function(viewValue) {
                    if(!viewValue){
                      ctrl.$setValidity('email', false);
                    }

                    ctrl.$setValidity('email', ctrl.$isEmpty(viewValue) || EMAIL_REGEXP.test(viewValue));
                    return viewValue;
                };

                ctrl.$parsers.unshift(validate); // When change the model
                ctrl.$formatters.push(validate); // When change the DOM
			}
		};
	}
]);