var app = angular.module('sisuQuantRealtime', ['ui.router']);

app.controller('finance', [
'$scope',
function($scope){
}]);

app.controller('refresh_finance',function($scope,$interval,$http){
  $scope.spyTradePrice = 'Loading...'
  $interval(function(){
    $http.get('/dashboard-realtime').success( function(response) {
      $scope.spyTradePrice = response.snapshot.lastTradePriceOnly
    });
  },1000);
});

