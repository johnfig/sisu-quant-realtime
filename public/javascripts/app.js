var app = angular.module('sisuQuantRealtime', ['ui.router']);

app.controller('finance', [
'$scope',
function($scope){
}]);

app.controller('refresh_finance',function($scope,$interval,$http){
  $scope.spyTradePrice = 'Loading...'
  $scope.clTradePrice = 'Loading...'
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
  },10000);
});

