'use strict';

angular.module('myApp.countdown', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/countdown', {
    templateUrl: 'countdown/countdown.html',
    controller: 'CountdownCtrl'
  });
}])

.controller('CountdownCtrl', function($scope, $interval) {
  $scope.timer = {min:0, sec:0};
  
  $scope.timer.toSec = function() {
    return (this.min * 60) + this.sec;
  }
  
  $scope.default = angular.copy($scope.timer);
  
  $scope.baseTime = undefined;
  
  var interval = undefined;

  $scope.isAlerting = function() {
    return angular.isDefined(interval) && $scope.timer.min == 0 && $scope.timer.sec == 0;
  }
  
  function getProgress() {
    var progress = parseInt(($scope.timer.toSec() * 100) / $scope.baseTime );
    return isNaN(progress) ? 0 : progress;
  }
  
  function resetProgress() {
    
    
  }
  
  $scope.$watchCollection("timer", function(){
    if (!angular.isDefined(interval)) {
      $scope.default = angular.copy($scope.timer);
    }
    
    if (!angular.isDefined($scope.baseTime)) {
      $scope.baseTime = $scope.default.toSec();
    }
    
    if (getProgress() > 100 || getProgress() <= 0 ) {
      $scope.baseTime =  $scope.timer.toSec();
    }
    
    $scope.progress = getProgress() || 0; 
  });
  
  $scope.isPlaying = function() {
    return angular.isDefined(interval);
  }

  $scope.start = function() {
    if(!$scope.isPlaying()) {
      interval = $interval(function(){
        if($scope.timer.sec > 0 ) {
          $scope.timer.sec -= 1;
        } else {
          if($scope.timer.min > 0) {
            $scope.timer.sec = 59;
            $scope.timer.min -= 1;
          }
        }
      }, 1000);
    }
    
  }

  $scope.stop = function() {
    if ($scope.isPlaying()) {
      $interval.cancel(interval);
      interval = undefined;
    }
  };

  $scope.reset = function() {
    $scope.stop();
    $scope.timer = angular.copy($scope.default)

  };
  
  
  $scope.plusOne = function() {
    $scope.timer.min += 1; 
  };

  //Manager Pair
  $scope.people = undefined;
  $scope.pair = undefined;
  var copilot = 1;

  $scope.setPair = function(){
    if($scope.pair != undefined){
      var newDriver = $scope.pair[1];
      $scope.pair = [newDriver,$scope.people[copilot]]
    }
    else{
      $scope.pair = [$scope.people[0],$scope.people[1]] 
    }
    //no people
    copilot++;
    if(copilot == $scope.people.length){
     copilot = 0;
    }
  }

});
