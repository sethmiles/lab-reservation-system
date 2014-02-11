angular.module('lrs').controller('reserveController', ['$scope', 'Global', 'Restangular', function ($scope, Global, Restangular) {
  
  $scope.global = Global;

  $scope.d3Data = Restangular.all("admin/api/Computers").getList().$object;

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
