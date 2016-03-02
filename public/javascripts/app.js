var app = angular.module('sisuQuantRealtime', ['ui.router']);

app.controller('finance', [
'$scope', '$http',
function($scope, $http){
  $http.get('/dashboard-realtime').success( function(response) {
    $scope.spyTradePrice = response.spySnapshot.lastTradePriceOnly
    $scope.clTradePrice = response.clSnapshot.lastTradePriceOnly
    $scope.spyYearlyPerformance = response.spyYearlyPerformance
  });
}]);

app.controller('refresh_finance',function($scope,$interval,$http){
  $interval(function(){
    $http.get('/dashboard-realtime').success( function(response) {
      if ($scope.spyTradePrice > response.spySnapshot.lastTradePriceOnly) {
        $scope.spyColor = 'green'
      } else {
        $scope.spyColor = 'red'
      };

      if ($scope.clTradePrice > response.clSnapshot.lastTradePriceOnly) {
        $scope.clColor = 'green'
      } else {
        $scope.clColor = 'red'
      };

      if ($scope.spyYearlyPerformance > response.spyYearlyPerformance) {
        $scope.spyYearlyColor = 'green'
      } else {
        $scope.spyYearlyColor = 'red'
      };

      $scope.spyTradePrice = response.spySnapshot.lastTradePriceOnly
      $scope.clTradePrice = response.clSnapshot.lastTradePriceOnly
      $scope.spyYearlyPerformance = response.spyYearlyPerformance
    });
  }, 30000);
});

