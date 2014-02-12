angular.module('lrs', ['ngRoute', 'ui.bootstrap', 'restangular']);

//Setting up route
angular.module('lrs').config(['$routeProvider', '$locationProvider', 'RestangularProvider',
  function($routeProvider, $locationProvider, RestangularProvider) {
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

    RestangularProvider.setBaseUrl('localhost:3000');
      // RestangularProvider.setDefaultRequestParams({ apiKey: '4f847ad3e4b08a2eed5f3b54' });
      // RestangularProvider.setRestangularFields({
      //   id: '_id.$oid'
      // });
      
      RestangularProvider.setRequestInterceptor(function(elem, operation, what) {
        
        if (operation === 'put') {
          elem._id = undefined;
          return elem;
        }
        return elem;
      });


    }
]);

