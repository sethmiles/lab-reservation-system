<<<<<<< HEAD
angular.module('lrs', ['ngRoute', 'lrs.system', 'ui.bootstrap']);
angular.module('lrs.system', []);
=======
angular.module('lrs', ['ngRoute']);
>>>>>>> a88d228dce0a5e20523886818b443b0e8380959b

//Setting up route
angular.module('lrs').config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/index.html',
    });
    $routeProvider.when('/reserve', {
      templateUrl: 'views/reserve.html',
      controller: 'reserveController'
    });
    $routeProvider.when('/calendar', {
      templateUrl: 'views/calendar.html',
    });
    $routeProvider.when('/policies', {
      templateUrl: 'views/policies.html',
    });

    $locationProvider.html5Mode(true);
  }
]);

