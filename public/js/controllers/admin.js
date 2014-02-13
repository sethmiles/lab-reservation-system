angular.module('lrs').controller('AdminController', ['$scope', '$routeParams', '$http', 'Global', function ($scope, $routeParams, $http, Global) {
  $scope.global = Global;


  // Get list of models
  $http.get('/api').success(function (data) {
    $scope.models = data.data;
  });

  // Display all entries in database
  $scope.manageModel = function(model) {
    $http.get('/api/' + model).success(function(data) {
      $scope.modelTitle = model;

      var headers = [];

      // Put ID first
      headers.push('id');

      for(var header in data.data[0]) {
        // Remove createdAt
        if(header != 'id' && header != 'createdAt' && header != 'updatedAt') {
          headers.push(header);
        }
      }

      $scope.currentModel = model;
      $scope.modelHeaders = headers;
      $scope.modelData = data.data;
    });
  };

  // Run manageModel if we come from an 'admin/:model' URL
  if($routeParams.model) {
    $scope.manageModel($routeParams.model);
  }

  $scope.delete = function(model, item) {
    $http.delete('/api/' + model + '/' + item.id).success(function(data) {
      $scope.modelData.splice($.inArray(item, $scope.modelData), 1);
    });
  }
}]);
