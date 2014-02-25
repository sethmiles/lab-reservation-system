angular.module('lrs.services').factory('alertService', function($rootScope, $timeout) {
  var alertService = {};

  // create an array of alerts available globally
  $rootScope.alerts = [];

  alertService.closeAlert = function(index) {
    $rootScope.alerts.splice(index, 1);
  };

  alertService.add = function(type, msg) {
    var alert = {'type': type, 'msg': msg};
    $rootScope.alerts.push(alert);
    
    // Close alerts after 3 seconds
    $timeout(function() {
      alertService.closeAlert($rootScope.alerts.indexOf(alert));
    }, 3000);
  };

  return alertService;
});
