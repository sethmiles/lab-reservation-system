angular.module('lrs').controller('UserController', ['$scope', '$http', '$modal', 'globalService', 
  function($scope, $http, $modal, globalService) {
    $scope.global = globalService;
    $('.jumbo').remove();

    $scope.login = function() {
      $http.post('login', {
        username: this.username, 
        password: this.password
      }).success(function(data, status, headers, config) {
        window.location.reload();
      });
    };

    $scope.logout = function() {
      $http.post('logout').success(function(data, status, headers, config) {
        window.location.assign('/');
      });
    };

    // Get an email from the user if it's missing
    if($scope.global.user && !$scope.global.user.email) {
      var emailModal = $modal.open({
        templateUrl: 'views/modals/addEmail.html',
        controller: function($scope) {
          $scope.cancel = function() {
            emailModal.dismiss('cancel');
          };

          $scope.addEmail = function(email) {
            var gravatarHash = CryptoJS.MD5(email).toString(CryptoJS.enc.Base64);
            
            $http.put('api/Users/' + globalService.user.id, {
              email: email,
              gravatarHash: gravatarHash
            });

            $http.post('sendWelcomeEmail', {
              name: globalService.user.name,
              email: email
            });

            emailModal.close();
            window.location.reload();
          };
        },
        backdrop: 'static',
        keyboard: false
      });
    }
  }
]);