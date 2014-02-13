angular.module('lrs', ['ngRoute', 'ui.bootstrap']);

//Setting up route
angular.module('lrs').config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
          templateUrl: 'views/index.html',
        });
        $routeProvider.when('/reserve', {
          templateUrl: 'views/reserve.html',
          controller: 'ReserveController'
        });
        $routeProvider.when('/calendar', {
          templateUrl: 'views/calendar.html',
        });
        $routeProvider.when('/policies', {
          templateUrl: 'views/policies.html',
        });
        $routeProvider.when('/admin', {
          templateUrl: 'views/admin.html',
          controller: 'AdminController'
        });

        $locationProvider.html5Mode(true);



    }
]);

