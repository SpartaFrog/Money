'use strict';

angular.module('seed').service('ModalService', ['$modal',
	function($modal){

		var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: '/modules/seed/views/sparta-modal.client.view.html'
        };

        var modalOptions = {
            closeButtonText: 'Cerrar',
            actionButtonText: 'Continuar',
            headerText: 'Confirmación',
            bodyContentUrl: '',
            validate: function() { return {isValid:true}; }
        };

        this.showModal = function (customModalDefaults, customModalOptions) {
            if (!customModalDefaults) customModalDefaults = {};
            customModalDefaults.backdrop = 'static';
            return this.show(customModalDefaults, customModalOptions);
        };

        this.show = function (customModalDefaults, customModalOptions) {
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};

            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

            //Map modal.html $scope custom properties to defaults defined in service
            angular.extend(tempModalOptions, modalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = function ($scope, $modalInstance) {
                    $scope.modalOptions = tempModalOptions;
                    $scope.modalOptions.ok = function (result) {
                        var validationResult = $scope.modalOptions.validate(result);

                        if(validationResult.isValid === true){
                            $modalInstance.close(result);
                        }else{
                            $scope.modalOptions.errorMessage = validationResult.errorMessage;
                        }
                    };
                    $scope.modalOptions.close = function (result) {
                        $modalInstance.dismiss('cancel');
                    };
                };
            }

            return $modal.open(tempModalDefaults).result;
        };
	}
]);