angular.module('lrs').controller('UserController', ['$scope', '$http', '$modal', 'globalService', 'modalService', 
  function($scope, $http, $modal, globalService, modalService) {
    $scope.global = globalService;

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
        window.location.assign('/');
      });
    };

    // Get an email from the user if it's missing
    if($scope.global.user && !$scope.global.user.email) {
      modalService.openModal('addEmail', [globalService.user.id]);
    }
  }
]);