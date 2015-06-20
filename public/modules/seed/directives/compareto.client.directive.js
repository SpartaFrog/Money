'use strict';

angular.module('seed').directive('compareTo', [
    function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {  

                var comparisonModel = '';

                var validate = function(viewValue) {
                    if(!viewValue || !comparisonModel){
                      // It's valid because we have nothing to compare against
                      ctrl.$setValidity('compareTo', true);
                    }

                    // It's valid if model is lower than the model we're comparing against
                    ctrl.$setValidity('compareTo', comparisonModel === viewValue);
                    return viewValue;
                };

                ctrl.$parsers.unshift(validate); // When change the model
                ctrl.$formatters.push(validate); // When change the DOM

                // Update the comparison Model.
                attrs.$observe('compareTo', function(modelValue){
                    comparisonModel = modelValue;
                    return validate(ctrl.$viewValue);
                });
            }
        };
    }
]);
