'use strict';

// Setting up route
angular.module('incomes').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to envelope view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('incomes', {
			url: '/income',
			templateUrl: 'modules/incomes/views/income.client.view.html'
		});
	}
]);