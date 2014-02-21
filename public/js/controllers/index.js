angular.module('lrs').controller('IndexController', ['$scope', 'globalService', 'alertService', function ($scope, globalService, alertService) {
  $scope.global = globalService;

  $scope.closeAlert = alertService.closeAlert; 
}]);