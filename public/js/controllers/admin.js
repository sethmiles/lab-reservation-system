angular.module('lrs').controller('AdminController', ['$scope', '$routeParams', '$http', 'Global', function ($scope, $routeParams, $http, Global) {
  $scope.global = Global;

  // Get list of models
  $http.get('/api').success(function(data) {
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

  $scope.newModel = function() {
    $http.post('/api/' + $scope.currentModel + '/', $scope.currentItem).success(function(data) {
      window.location.reload();
    });
  }

  $scope.editModel = function(model, id) {
    $http.get('/api/' + model + '/' + id).success(function(data) {
      $scope.currentId = id;
      $scope.currentModel = model;
      $scope.currentItem = data.data;
    });
  };

  $scope.updateModel = function() {
    console.log($scope.editModelForm);
    $http.put('/api/' + $scope.currentModel + '/' + $scope.currentId, $scope.currentItem)
      .success(function(data, status, headers, config) {
        console.log(data.status);
        $scope.global.alerts.push({msg: data.status, type: 'success'});
    });
  };

  $scope.delete = function(model, item) {
    var confirmDelete = confirm('This will delete a ' + model + '.');
    if(confirmDelete) {
      $http.delete('/api/' + model + '/' + item.id).success(function(data) {
        $scope.modelData.splice($.inArray(item, $scope.modelData), 1);
      });
    }
  }

  // Run manageModel if we come from an 'admin/:model' URL
  if($routeParams.model) {
    $scope.manageModel($routeParams.model);
  }

  if($routeParams.newModel) {
    $scope.currentModel = $routeParams.newModel;
    $scope.currentItem = {};

    $http.get('/api/' + $scope.currentModel).success(function(data) {
      var headers = [];

      for(var header in data.data[0]) {
        // Remove createdAt
        if(header != 'id' && header != 'createdAt' && header != 'updatedAt') {
          headers.push(header);
        }
      }

      $scope.modelHeaders = headers;
      $scope.modelData = data.data;
    });
  }

  // Edit model
  if($routeParams.editModel && $routeParams.id) {
    $scope.editModel($routeParams.editModel, $routeParams.id);
  }

}]);
