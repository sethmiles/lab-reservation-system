angular.module('lrs').controller('UserController', ['$scope', '$http', '$modal', 'Global', function ($scope, $http, $modal, Global) {
  $scope.global = Global;

  $scope.getEmail = function() {
    var modalInstance = $modal.open({
      templateUrl: 'views/partials/addEmail.html',
      controller: EmailController,
      backdrop: 'static',
      keyboard: false
    });
  };

  var EmailController = function ($scope, $modalInstance) {
    $scope.addEmail = function(email) {
      $http.put('api/Users/' + Global.user.id, {
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
      window.location.reload()
    });
  };

  $scope.logout = function() {
    $http.post('logout').success(function(data, status, headers, config) {
      window.location.reload()
    });
  };
}]);