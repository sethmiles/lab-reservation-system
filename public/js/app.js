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

    // Admin routes
    $routeProvider.when('/admin', {
      templateUrl: 'views/admin.html',
      controller: 'AdminController'
    });
    $routeProvider.when('/admin/:model/', {
      templateUrl: 'views/admin.html',
      controller: 'AdminController'
    });
    $routeProvider.when('/admin/new/:newModel/', {
      templateUrl: 'views/partials/newModel.html',
      controller: 'AdminController'
    });
    $routeProvider.when('/admin/edit/:editModel/:id', {
      templateUrl: 'views/partials/editModel.html',
      controller: 'AdminController'
    });

    $locationProvider.html5Mode(true);
  }
]);

