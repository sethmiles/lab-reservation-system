angular.module('lrs').controller('ReserveController', ['$scope', '$http', 'Global', function ($scope, $http, Global) {
  $scope.global = Global;

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
    $scope.stationData.events = [
      {start:800, end: 900},
      {start: 1400, end: 1600}
    ];
  };

  $scope.today = new Date();

  // Watch for date click event
  $scope.$watch(function() {
    return $scope.reservationDate;
  }, function(reservationDate) {
    if(reservationDate) {
      $http.get('/getReservations/' + $scope.stationData.id + '/' + reservationDate).success(function(data) {
        console.log(data);
      });
    }
  });

}]);
