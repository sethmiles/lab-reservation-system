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
        console.log(data.data);
        if(data.data.length != 0) {
          var headers = [];

          // Put ID first, or leave it off if we're creating or editing a model
          if(!action) {
            headers.push('id');
          }

          // Get field names out of first item (data[0])
          for(var header in data.data[0]) {
            // Remove fields we don't care about
            if(header != 'id' && header != 'createdAt' && header != 'updatedAt' && header != 'gravatarHash') {
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

    var getItem = function(model, id) {
      $http.get('/api/' + model + '/' + id).success(function(data) {
        $scope.currentId = id;
        $scope.currentModel = model;
        $scope.currentItem = data.data;
      });
    };

    $scope.newModel = function() {
      $http.post('/api/' + $scope.currentModel + '/', $scope.currentItem).success(function(data) {
        if(data.status === 'success') {
          alertService.add('success', $scope.currentModel + ' created successfully!');
          $location.path('/admin/' + $scope.currentModel + '/edit/' + data.data.id)
        } else if(data.status === 'error') {
          alertService.add('danger', 'ERROR: ' + JSON.stringify(data.message));
        }
      });
    };

    $scope.updateModel = function() {
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

    $scope.delete = function(model, item) {
      modalService.openModal('deleteModel');
      var confirmDelete = confirm('This will delete a ' + model + '.');
      if(confirmDelete) {
        $http.delete('/api/' + model + '/' + item.id).success(function(data) {
          $scope.modelData.splice($.inArray(item, $scope.modelData), 1);
        });
      }
    }

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
