angular.module('lrs', ['ngRoute']);

//Setting up route
angular.module('lrs').config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'views/index.html'
    }).
    when('/calendar', {
      templateUrl: 'views/calendar.html'
    }).
    when('/policies', {
      templateUrl: 'views/policies.html'
    }).
    otherwise({
      redirectTo: '/'
    });

    // Get rid of # in URL (doesn't work for IE, but who cares?)
    $locationProvider.html5Mode(true);
  }
]);

