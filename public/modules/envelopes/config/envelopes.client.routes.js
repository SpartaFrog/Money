'use strict';

// Setting up route
angular.module('envelopes').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to envelope view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('envelopes', {
			url: '/',
			templateUrl: 'modules/envelopes/views/envelope-manager.client.view.html'
		});
	}
]);