angular.module('lrs').controller('reserveController', ['$scope', 'Global', function ($scope, Global) {
  $scope.global = Global;

  $scope.d3Data = labjson

  $scope.d3OnClick = function(item) {
      
  };

  $scope.today = new Date();

  $scope.stationInFocus = [
    {start: 30, end: 200, user: 'lanesawyer'},
    {start: 550, end: 900, user: 'howards4'}
  ];
}]);
