angular.module('lrs').controller('ReserveController', ['$scope', '$http', 'globalService', function ($scope, $http, globalService) {
  $scope.global = globalService;

  // Display all entries in database
  function getComputerData () {   
    $http.get('/api/Computers').success(function(data) {
      $scope.d3Data = data.data;     
    });
    setTimeout(getComputerData, 5000);
  }

  getComputerData();

  $scope.d3OnClick = function(item) {
    $scope.stationData = item;
    $scope.$apply();
  };

  $scope.today = new Date();

  // Watch for date click event
  $scope.$watch(function() {
    return $scope.reservationDate;
  }, function(reservationDate) {
    if(reservationDate) {
      $http.get('/getReservations/' + $scope.stationData.id + '/' + reservationDate).success(function(data) {
        $scope.reservations = data;
      });
    }
  });
}]);
