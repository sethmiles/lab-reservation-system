angular.module('lrs').controller('AdminController', ['$scope', '$routeParams', '$http', '$location', 'globalService', 'alertService', 'modalService',
  function ($scope, $routeParams, $http, $location, globalService, alertService, modalService) {
    $scope.global = globalService;

    // Get list of models for sidebar
    $http.get('/api').success(function(data) {
      $scope.models = data.data;
    });

    // Display all entries in database
    var getItems = function(model, action) {
      $http.get('/api/' + model).success(function(data) {
        // Skip generating the headers if there is no data
        if(data.data.length != 0) {
          var headers = [];

          // Put ID first, or leave it off if we're creating or editing a model
          if(!action) {
            headers.push('id');
          }

          // Fields we don't want the user to be able to edit or we don't care that they see
          var removeFields = [
            'id', 
            'createdAt', 
            'updatedAt', 
            'gravatarHash',
          ];

          // Get field names out of first item (data[0])
          for(var header in data.data[0]) {
            if($.inArray(header, removeFields) === -1) {
              headers.push(header);
            }
          }
        }

        $scope.currentItem = {};
        $scope.currentModel = model;
        $scope.modelHeaders = headers;
        $scope.modelData = data.data;
      });
    };

    // Set a single item
    var getItem = function(model, id) {
      $http.get('/api/' + model + '/' + id).success(function(data) {
        $scope.currentId = id;
        $scope.currentModel = model;
        $scope.currentItem = data.data;
      });
    };

    // Create a new item
    $scope.newItem = function() {
      $http.post('/api/' + $scope.currentModel + '/', $scope.currentItem).success(function(data) {
        if(data.status === 'success') {
          alertService.add('success', $scope.currentModel + ' created successfully!');
          $location.path('/admin/' + $scope.currentModel + '/edit/' + data.data.id)
        } else if(data.status === 'error') {
          alertService.add('danger', 'ERROR: ' + JSON.stringify(data.message));
        }
      });
    };

    // Update an item
    $scope.updateItem = function() {
      $http.put('/api/' + $scope.currentModel + '/' + $scope.currentId, $scope.currentItem)
        .success(function(data, status, headers, config) {
          if(data.status === 'success') {
            alertService.add('success', $scope.currentModel + ' updated successfully!');
          } else if(data.status === 'error') {
            alertService.add('danger', 'ERROR: ' + JSON.stringify(data.message));
          }
        }
      );
    };

    // Delete an item
    $scope.deleteItem = function(model, item) {
      modalService.openModal('deleteModel', [model, item, $scope.modelData]);
    };

    // Get items for main admin page or fill headers for new page
    if($routeParams.model) {
      getItems($routeParams.model, $routeParams.action);
    }

    // Edit model
    if($routeParams.action === 'edit' && $routeParams.id) {
      getItem($routeParams.model, $routeParams.id);
    }
  }
]);
