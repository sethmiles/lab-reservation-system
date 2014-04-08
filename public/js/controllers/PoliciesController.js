angular.module('lrs').controller('PoliciesController', ['$scope', '$http', 'globalService', 
    function ($scope, $http, globalService) {
          $scope.global = globalService;
          $('.jumbo').remove();
}]);