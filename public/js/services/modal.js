angular.module('lrs.services').factory('modalService', ['$rootScope', '$http', '$modal', function($rootScope, $http, $modal) {
  var modalService = {};

  $rootScope.modalInstance = {};

  // template: string referencing template name in 'views/modals'
  // data: array of objects needed by the controller
  modalService.openModal = function(template, data) {
    $rootScope.modalInstance = $modal.open({
      templateUrl: 'views/modals/' + template + '.html',
      controller: ModalInstanceController,
      backdrop: 'static',
      keyboard: false
    });
    $rootScope.modalData = data;
  };

  modalService.closeModal = function() {
    $rootScope.modalInstance.close();
  };

  return modalService;
}]);

// All the methods for various modals are put here
var ModalInstanceController = function ($scope, $http, $modalInstance) {

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.deleteItem = function() {
    $http.delete('/api/' + $scope.modalData[0] + '/' + $scope.modalData[1].id).success(function(data) {
      $scope.modalData[2].splice($.inArray($scope.modalData[1], $scope.modalData[2]), 1);
      $modalInstance.close();
    });
  };

  $scope.addEmail = function(email) {
    var gravatarHash = CryptoJS.MD5(email).toString(CryptoJS.enc.Base64);
    $http.put('api/Users/' + $scope.modalData[0], {
      email: email,
      gravatarHash: gravatarHash
    }).success(function(data, status, headers, config) {
      $modalInstance.close();
      window.location.reload();
    });
  };
};