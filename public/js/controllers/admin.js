angular.module('lrs').controller('AdminController', ['$scope', '$http', 'Global', function ($scope, $http, Global) {
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

      for(var header in data.data[0]) {
        headers.push(header);
      }

      $scope.currentModel = model;
      $scope.modelHeaders = headers;
      $scope.modelData = data.data;
    });
  };

  $scope.edit = function(model, item) {
    console.log('edit');
  };

  $scope.delete = function(model, item) {
    $http.delete('/api/' + model + '/' + item.id).success(function(data) {
      $scope.modelData.splice($.inArray(item, $scope.modelData), 1);
    });
  }
}]);
