angular.module('lrs').controller('IndexController', ['$scope', '$location', 'globalService', 'alertService', 
  function ($scope, $location, globalService, alertService) {
    $scope.global = globalService;

    $scope.closeAlert = alertService.closeAlert; 
  }
]);
