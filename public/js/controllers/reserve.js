angular.module('lrs').controller('ReserveController', ['$scope', 'Global', 'Restangular', function ($scope, Global, Restangular) {
  $scope.global = Global;


  // Display all entries in database
  $scope.d3Data = function(model) {
    $http.get('/api/computers').success(function(data) {
      // $scope.modelTitle = model;

      // var headers = [];

      // for(var header in data.data[0]) {
      //   headers.push(header);
      // }

      // $scope.currentModel = model;
      // $scope.modelHeaders = headers;
      // $scope.modelData = data.data;
    });
  };

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
