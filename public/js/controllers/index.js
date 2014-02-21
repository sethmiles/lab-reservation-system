angular.module('lrs').controller('IndexController', ['$scope', 'Global', 'alertService', function ($scope, Global, alertService) {
  $scope.global = Global;

  $scope.closeAlert = alertService.closeAlert; 
}]);