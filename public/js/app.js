angular.module('lrs', ['lrs.services', 'ngRoute', 'ui.bootstrap']);

// Set up services
angular.module('lrs.services', []);

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

    // Admin routes
    $routeProvider.when('/admin', {
      templateUrl: 'views/admin.html',
      controller: 'AdminController'
    });
    $routeProvider.when('/admin/:model/', {
      templateUrl: 'views/admin.html',
      controller: 'AdminController'
    });

    // Users
    $routeProvider.when('/admin/Users/new/', {
      templateUrl: 'views/admin/user.html',
      controller: 'AdminController'
    });
    $routeProvider.when('/admin/Users/edit/:userId', {
      templateUrl: 'views/admin/user.html',
      controller: 'AdminController'
    });

    // Computers
    $routeProvider.when('/admin/Computers/new/', {
      templateUrl: 'views/admin/computer.html',
      controller: 'AdminController'
    });
    $routeProvider.when('/admin/Computers/edit/:computerId', {
      templateUrl: 'views/admin/computer.html',
      controller: 'AdminController'
    });

    // Reservations
    $routeProvider.when('/admin/Reservations/new/', {
      templateUrl: 'views/admin/reservation.html',
      controller: 'AdminController'
    });
    $routeProvider.when('/admin/Reservations/edit/:reservationId', {
      templateUrl: 'views/admin/reservation.html',
      controller: 'AdminController'
    });

    // Why do we need both of these? 1st for New and 2nd for Edit
    $routeProvider.when('/admin/:model/:action/', {
      templateUrl: 'views/partials/model.html',
      controller: 'AdminController'
    });
    $routeProvider.when('/admin/:model/:action/:id', {
      templateUrl: 'views/partials/model.html',
      controller: 'AdminController'
    });

    $locationProvider.html5Mode(true);
  }
]);

