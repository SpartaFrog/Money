'use strict';

angular.module('seed').directive('populationSelector', ['Geo',
	function(geo) {
		return {
			templateUrl: 'modules/seed/views/population-selector.client.view.html',
			restrict: 'E',
			scope: {
				id: '@',
				selectedCounty: '=county',
				selectedPopulation: '=population',
				countyLabel: '@',
				populationLabel: '@'
    		},
			link: function postLink(scope, element, attrs) {

				scope.countyId = 'county__' + scope.id;
				scope.populationId = 'population__' + scope.id;
				scope.counties = geo.getCounties();

				element.on('change', function(){
					console.log(scope.county);
				});

				element.on('$destroy', function() {
			      	
			    });
			},
			controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
    			

    			
    		}]	
		};
	}
]);