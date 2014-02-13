angular.module('lrs').controller('ReserveController', ['$scope', 'Global', '$http', function ($scope, Global, $http) {
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

  $scope.getReservations = function(day) {
    console.log(day);
    $http.get('/api/getReservation/').success(function(data) {
      alert(JSON.stringify(data));
    });
  };

}]);
