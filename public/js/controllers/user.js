angular.module('lrs').controller('UserController', ['$scope', '$http', '$modal', 'globalService', 'modalService', 
  function($scope, $http, $modal, globalService, modalService) {
    $scope.global = globalService;

    $scope.getEmail = function() {
      var modalInstance = $modal.open({
        templateUrl: 'views/partials/addEmail.html',
        controller: EmailController,
        backdrop: 'static',
        keyboard: false
      });
    };

    var EmailController = function($scope, $modalInstance) {
      $scope.addEmail = function(email) {
        $http.put('api/Users/' + globalService.user.id, {
          email: email
        }).success(function(data, status, headers, config) {
          $modalInstance.close();
        });
      };
    };

    $scope.login = function() {
      $http.post('login', {
        username: this.username, 
        password: this.password
      }).success(function(data, status, headers, config) {
        window.location.reload();
      });
    };

    $scope.logout = function() {
      $http.post('logout').success(function(data, status, headers, config) {
        window.location.reload();
      });
    };

    if($scope.global.user && !$scope.global.user.email) {
      modalService.openModal('addEmail');
    }
  }
]);