angular.module('lrs', ['ngRoute', 'ui.bootstrap', 'restangular']);

//Setting up route
angular.module('lrs').config(['$routeProvider', '$locationProvider', 'RestangularProvider',
  function($routeProvider, $locationProvider, RestangularProvider) {
    
    $routeProvider
        .when('/', {
          templateUrl: 'views/index.html',
        })
        .when('/reserve', {
          templateUrl: 'views/reserve.html',
          controller: 'reserveController'
        })
        .when('/calendar', {
          templateUrl: 'views/calendar.html',
        })
        .when('/policies', {
          templateUrl: 'views/policies.html',
        });

    $locationProvider.html5Mode(true);

    RestangularProvider.setBaseUrl('https://api.mongolab.com/api/1/databases/angularjs/collections');
      RestangularProvider.setDefaultRequestParams({ apiKey: '4f847ad3e4b08a2eed5f3b54' });
      RestangularProvider.setRestangularFields({
        id: '_id.$oid'
      });
      
      RestangularProvider.setRequestInterceptor(function(elem, operation, what) {
        
        if (operation === 'put') {
          elem._id = undefined;
          return elem;
        }
        return elem;
      });


    }
]);

