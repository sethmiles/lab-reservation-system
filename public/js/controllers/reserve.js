angular.module('lrs').controller('ReserveController', ['$scope', 'Global', '$http', function ($scope, Global, $http) {
  $scope.global = Global;


  // Display all entries in database
   
    $http.get('/api/computers').success(function(data) {
      $scope.d3Data = data.data;
    });

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
