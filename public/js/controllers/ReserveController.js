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

  $scope.d3OnClick = function(item) {
    $scope.stationData = item;
    $scope.today = new Date();
    $scope.reservations = [];
    $scope.reservationDate = new Date();
    getReservations();
    $scope.$apply();
  };

  $scope.nullifyStationData = function () {
    $scope.stationData = null;
  }

  $scope.createReservation = function () {

        if($('.calendar-container').hasClass('invalid')){
            alert('This reservation cannot be made.');
            return;
        }

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
            ComputerId: $scope.stationData.id,
            start_time: startTime.format('YYYY-MM-DD HH:mm:ss'),
            end_time: endTime.format('YYYY-MM-DD HH:mm:ss'),
            UserId: $scope.global.user.id
        }

        // Put something like this in a modal
        // var message = data.userName + ", your reservation is for " + data.computerName +
        //                 ' on ' + startTime.format('dddd, MMMM Do YYYY') + ' from ' +
        //                 startTime.format('h:mm a') + ' to ' + endTime.format('h:mm a') + '.';

        // console.log(message);

        // If it's confirmed, create the reservation in the db
      $http.post('/api/Reservations/', data).success(function(response) {
            // $scope.reservations.push(response);
            getReservations();
      });


  }

  function parseItems (items, className) {
    var events = [];
    for(var i = 0; i < items.length; i++){
        events.push({
            className: className ? className : '',
            start_time: items[i].start.dateTime,
            end_time: items[i].end.dateTime,
            title: items[i].summary
        });
    }
    $scope.reservations = _.union(events, $scope.reservations);
  }

  function getReservations () {
    // Clear out reservations
    $scope.reservations = [];
    $http.get('/getReservations/' + $scope.stationData.id + '/' + $scope.reservationDate).success(function(data) {
        _.each(data, function (item) {
            item.className = 'user-event';
        });
        $scope.reservations = _.union(data, $scope.reservations);
    });

    var min = encodeURIComponent(moment($scope.reservationDate).startOf('day').toISOString());
    var max = encodeURIComponent(moment($scope.reservationDate).startOf('day').add('days',1).toISOString());
    var labCalendarId = encodeURIComponent('4sftdt354kbu5kaufj4kv15njg@group.calendar.google.com');
    var priorityAccessCalendarId = encodeURIComponent('fesegnp0e5691tfma741g9mbbg@group.calendar.google.com');
    var key = 'AIzaSyC4pwU1-EVfmvCgOqYi4OWtfa4vgSkD7YI'

    // Get IS Lab Schedule Events
    $http.get('https://www.googleapis.com/calendar/v3/calendars/' + labCalendarId + '/events?timeMax=' + max + '&timeMin=' + min + '&key=' + key).success(function (data){
        parseItems(data.items, 'islab-event');
    });

    // Get Priority Access Events
    $http.get('https://www.googleapis.com/calendar/v3/calendars/' + priorityAccessCalendarId + '/events?timeMax=' + max + '&timeMin=' + min + '&key=' + key).success(function (data){
        parseItems(data.items, "priority-access");
    });

  }

  // Watch for date click event
  $scope.$watch(function() {
    return $scope.$$childHead.reservationDate
  }, function(reservationDate) {
    if(reservationDate) {
        $scope.reservationDate = reservationDate;
        if($scope.stationData){
            getReservations();    
        }
    }
  });
}]);



// https://www.googleapis.com/calendar/v3/calendars/4sftdt354kbu5kaufj4kv15njg%40group.calendar.google.com/events?timeMax=2014-02-26T06%3A59%3A59.999Z&timeMin=2014-02-25T07%3A00%3A00.000Z?key=AIzaSyC4pwU1-EVfmvCgOqYi4OWtfa4vgSkD7YI
// https://www.googleapis.com/calendar/v3/calendars/4sftdt354kbu5kaufj4kv15njg%40group.calendar.google.com/events?timeMax=2014-02-26T06%3A59%3A59.999Z&timeMin=2014-02-25T07%3A00%3A00.000Z&key={YOUR_API_KEY}
