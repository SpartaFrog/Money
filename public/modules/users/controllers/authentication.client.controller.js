'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication', 'Geo',
	function($scope, $http, $location, Authentication, geo) {
		$scope.authentication = Authentication;

		$scope.counties = geo.getCounties();
		$scope.populations = [];

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// DateTimePicker
		$scope.disabled = function(date, mode) {
			var currentDay  = new Date();
	    	return ( mode === 'day' && date.getTime() > currentDay.getTime());
		};

		$scope.open = function($event) {
		    $event.preventDefault();
		    $event.stopPropagation();

		    $scope.opened = true;
		};

		$scope.dateOptions = {
		    startingDay: 1,
			showWeeks: false
		};

		// County
		$scope.validateCounty = function(){

			var county = null;
			$scope.counties.forEach(function(countyValue){
				if(countyValue.literal.trim().toLowerCase() === $scope.credentials.county.trim().toLowerCase()){
					county = countyValue;
				}
			});

			if(county === null){
				$scope.credentials.county = '';
				$scope.credentials.population = '';
				$scope.populations = [];
				return;
			}

			if(county.code === $scope.countyCode){
				return;
			}

			$scope.credentials.population = '';
			$scope.populations = geo.getPopulations(county.code);
			$scope.countyCode = county.code;
		};

		$scope.validatePopulation = function(){
			var population = null;
			$scope.populations.forEach(function(populationValue){
				if(populationValue.literal.trim().toLowerCase() === $scope.credentials.population.trim().toLowerCase()){
					population = populationValue;
				}
			});

			if(population === null){
				$scope.credentials.population = '';
			}
		};
	}
]);