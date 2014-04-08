angular.module('lrs').controller('CalendarController', ['$scope', '$http', 'globalService', 
    function ($scope, $http, globalService) {
          $scope.global = globalService;
          $('.jumbo').remove();
}]);