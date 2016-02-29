var app = angular.module('sisuQuantRealtime', ['ui.router']);

app.controller('finance', [
'$scope',
function($scope){
}]);

app.controller('refresh_finance',function($scope,$interval,$http){
  $scope.spyTradePrice = 'Loading...'
  $interval(function(){
    $http.get('/dashboard-realtime').success( function(response) {
      if ($scope.spyTradePrice < response.snapshot.lastTradePriceOnly) {
        $scope.color = 'red'
      } else {
        $scope.color = 'green'
      };

      $scope.spyTradePrice = response.snapshot.lastTradePriceOnly
    });
  },1000);
});

