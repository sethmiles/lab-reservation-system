angular.module('lrs').controller('ReserveController', ['$scope', '$http', 'globalService', function ($scope, $http, globalService) {
  $scope.global = globalService;

  // Display all entries in database
  function getComputerData () {   
    $http.get('/api/Computers').success(function(data) {
      $scope.d3Data = data.data;     
    });
    setTimeout(getComputerData, 10000);
  }
  getComputerData();

  $scope.reservationDate = new Date();

  $scope.d3OnClick = function(item) {
    $scope.stationData = item;
    $scope.reservations = [];
    getReservations();
    $scope.$apply();
  };

  $scope.createReservation = function () {
        console.log('creating reservation');
        if(!$scope.stationData.reservation){
            alert('You have not selected a time frame');
            return;
        }

        function convertTime (time) {
            if(time > 999){
                return {
                    hours: time.toString().substring(0,2),
                    minutes: time.toString().substring(2,4)
                }
            } else {
                return {
                    hours: time.toString().substring(0,1),
                    minutes: time.toString().substring(1,3)
                }
            }
        }

        var startTime = moment($scope.reservationDate).startOf('day').add(convertTime($scope.stationData.reservation.start));
        var endTime = moment($scope.reservationDate).startOf('day').add(convertTime($scope.stationData.reservation.end));

        var data = {
            computerId: $scope.stationData,
            computerName: $scope.stationData.name,
            startTime: startTime,
            endTime: endTime,
            userId: $scope.global.user.id,
            userName: $scope.global.user.name
        }

        // Put something like this in a modal
        var message = data.userName + ", your reservation is for " + data.computerName +
                        ' on ' + startTime.format('dddd, MMMM Do YYYY') + ' from ' +
                        startTime.format('h:mm a') + ' to ' + endTime.format('h:mm a') + '.';

        console.log(message);

  }

  $scope.today = new Date();

  function getReservations () {
    $http.get('/getReservations/' + $scope.stationData.id + '/' + $scope.reservationDate).success(function(data) {
        $scope.reservations = data;
    });
  }

  // Watch for date click event
  $scope.$watch(function() {
    return $scope.reservationDate;
  }, function(reservationDate) {
    if(reservationDate) {
        $scope.reservationDate = reservationDate;
        if($scope.stationData){
            getReservations();    
        }
    }
  });
}]);
