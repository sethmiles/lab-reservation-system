angular.module('lrs').controller('reserveController', ['$scope', 'Global', function ($scope, Global) {
  $scope.global = Global;

  $scope.d3Data = labjson

  $scope.d3OnClick = function(item) {
        $scope.stationData = item;
        $scope.$apply();
        $scope.stationData.events = [
            {start:800, end: 900},
            {start: 1400, end: 1600}
        ];
  };

  $scope.today = new Date();

}]);
