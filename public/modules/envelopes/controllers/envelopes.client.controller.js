'use strict';


angular.module('envelopes').controller('EnvelopesController', ['$scope', 'Authentication', 'ModalService',
	function($scope, Authentication, ModalService) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.pageDate = new Date();

		$scope.envelopes = [
			{id: 0, name: 'Ahorro', balance:230.34, amount: 230.34, package: 'Ahorro', type: 'Savings'},
			{id: 1, name: 'Alquiler', balance: 20, amount: 500, package: 'Hogar', type: 'Continuous'},
			{id: 2, name: 'Facturas Agua', balance: 68.2, amount: 300, package: 'Hogar', type: 'Continuous'},
			{id: 3, name: 'Linea Móvil', balance: 3, amount: 20, package:'Tecnología', type: 'Continuous'},
			{id: 4, name: 'Móvil Nuevo', balance: 362.56,amount: 649, package: 'Tecnología', type: 'Objective'},
			{id: 5, name: 'Gasolina', balance: 39.23, amount: 90, package: 'Transporte', type: 'Continuous'},
			{id: 6, name: 'Viaje a Londres', balance: 501, amount: 600, package: 'Viajes', type: 'Objective'}
		];


		$scope.incomes = [];
		$scope.expenses = [];

		$scope.templates = [
			{name:'addIncome', bodyContentUrl: '/modules/incomes/views/income.client.view.html', headerText:'Nuevo Ingreso', actionButtonText: 'Añadir' },
			{name:'addExpense', bodyContentUrl: '/modules/envelopes/views/expense.client.view.html', headerText:'Nuevo Gasto', actionButtonText: 'Añadir' },
			{name:'moveMoney', bodyContentUrl: '/modules/envelopes/views/move-money.client.view.html', headerText:'Mover dinero a', actionButtonText: 'Mover' }
		];

		$scope.getTemplate = function (templateNameParameter){
			var templateName = templateNameParameter || '';

			var template = {};
			$scope.templates.forEach(function(value){
				if(value.name === templateName){
					template = value;
				}
			});

			return template;
		};


		$scope.getEnvelope = function (envelopeId){
			var envelope = null;
			$scope.envelopes.forEach(function(value){
				if(value.id === envelopeId){
					envelope = value;
				}
			});

			return envelope;
		};

		$scope.addIncome = function (){
			var template = $scope.getTemplate('addIncome');

			template.model = {
				date: new Date()
			};

			ModalService.showModal({}, template).then(function (result) {
				var amount = $scope.envelopes[0].amount + result.amount;
				$scope.envelopes[0].amount = amount;
				$scope.envelopes[0].balance = amount;

				$scope.incomes.push(result);
	        });
		};

		$scope.addExpense = function (){
			var template = $scope.getTemplate('addExpense');

			template.envelopes = [];
			$scope.envelopes.forEach(function (value, index){
				if(value.type === 'Savings' || value.type === 'Continuous'){
					template.envelopes.push(value);
				}
			});

			template.model = {
				date: new Date(),
				envelopeTo: template.envelopes[0],
			};

			ModalService.showModal({}, template).then(function (result) {
				var envelopeTo = $scope.getEnvelope(result.envelopeTo.id);

				if(!envelopeTo) { return; }

				envelopeTo.balance = Number(envelopeTo.balance - result.amount).toFixed(2);

				$scope.expenses.push(result);
	        });
		};

		$scope.moveMoney = function (envelopeId){
			var template = $scope.getTemplate('moveMoney');

			template.envelopes = [];
			$scope.envelopes.forEach(function (value, index){
				if(value.id !== envelopeId){
					template.envelopes.push(value);
				}
			});

			template.model = {
				envelopeTo: template.envelopes[0],
			};

			template.validate = function(result){
				var envelopeTo = $scope.getEnvelope(result.envelopeTo.id);
				var envelopeFrom = $scope.getEnvelope(envelopeId);

				if(!envelopeFrom || !envelopeTo){
					return { isValid: false };
				}

				if(Number(envelopeFrom.balance - result.amount).toFixed(2) < 0){
					return {
						isValid: false,
						errorMessage: 'No tienes tanto dinero en este sobre'
					};
				}

				return { isValid: true };
			};

			ModalService.showModal({}, template).then(function (result) {

				var envelopeTo = $scope.getEnvelope(result.envelopeTo.id);
				var envelopeFrom = $scope.getEnvelope(envelopeId);

				if(!envelopeFrom || !envelopeTo){
					return;
				}

				envelopeFrom.balance = Number(envelopeFrom.balance - result.amount).toFixed(2);

				if(envelopeFrom.type === 'Savings' || envelopeFrom.type === 'Continuous'){
					envelopeFrom.amount = Number(envelopeFrom.amount - result.amount).toFixed(2);
				}


				envelopeTo.balance = Number(envelopeTo.balance) + Number(result.amount);

				if(envelopeTo.type === 'Savings' || envelopeTo.type === 'Continuous'){
					envelopeTo.amount = Number(envelopeTo.amount) + Number(result.amount);
				}
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

	}
]);