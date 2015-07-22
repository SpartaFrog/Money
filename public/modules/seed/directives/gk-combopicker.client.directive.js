'use strict';

angular.module('seed').directive('gkCombopicker',[
	function() {

		return {
			templateUrl: 'modules/seed/views/gk-combopicker.client.view.html',
			restrict: 'E',
			scope: {
				values:'=?',
				placeholder:'@',
				label:'@',
				id:'@',
				textfield:'@',
				valuefield: '@'
    		},
    		link: function(scope, el, attr) {
				scope.focusValue = true;

				scope.$watch('focusValue', function(currentValue, previousValue) {
					el[0].focus();
					console.log(angular.element(el.find('input')[0]));
					el.find('input')[0].focus();
	                // if (currentValue === true && !previousValue) {
	                //     // $element[0].focus();
	                // } else if (currentValue === false && previousValue) {
	                //     // $element[0].blur();
	                // }
	            });
    			el.find('button').on('click', function(){
    				scope.focusValue = !scope.focusValue;
    				console.log(scope.id);
    				document.getElementById('gk-combopicker-button').focus();
    			});
				
		    },
    		controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
    			$scope.focus = true;
    			$scope.isVisible = false;

    			$scope.buttonClicked = function(){
    				$scope.focus = true;
    				$scope.isVisible = true;

    			};
    		}]	
		};
	}
]);