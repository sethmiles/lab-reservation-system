angular.module('lrs.system').controller('LRSController', ['$scope', 'Global', function ($scope, Global) {
  $scope.global = Global;

  $scope.test = function() {
    alert('I work.');
  };
}]);