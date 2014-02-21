angular.module('lrs.services').factory('modalService', ['$rootScope', '$modal', function($rootScope, $modal) {
  var modalService = {};

  $rootScope.modalInstance = {};

  modalService.openModal = function(template) {
    $rootScope.modalInstance = $modal.open({
      templateUrl: 'views/modals/' + template + '.html',
      controller: ModalInstanceController,
      backdrop: 'static',
      keyboard: false
    });
  };

  modalService.closeModal = function() {
    $rootScope.modalInstance.close();
  };

  return modalService;
}]);

var ModalInstanceController = function ($scope, $modalInstance) {

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};