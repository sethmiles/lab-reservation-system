angular.module('lrs.system').controller('UserController', ['$scope', '$http', 'Global', function ($scope, $http, Global) {
  $scope.global = Global;

  $scope.login = function() {
    $http.post('login', { 
      username: this.username, 
      password: this.password
    }).success(function(data, status, headers, config) {
      alert(data);
    });
  };

  $scope.logout = function() {
    $http.post('logout').success(function(data, status, headers, config) {
      alert('logged out');
    });
  };
}]);