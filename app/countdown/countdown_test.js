'use strict';

describe('CountdownCtrl', function() {

  beforeEach(module('myApp.countdown'));
  
  var $controller, $interval, $rootScope;

  beforeEach(inject(function(_$controller_, _$interval_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $interval = _$interval_;
    $rootScope = _$rootScope_;
  }));
  
  describe('$scope.timer', function(){
    var $scope, controller;

    beforeEach(function() {
      $scope =$rootScope.$new();
      controller = $controller('CountdownCtrl', { $scope: $scope, $interval: $interval });
    });
    
    it('should be defined', inject(function($controller) {
      expect($scope.timer).toBeDefined();
    }));
    
    it('should be available in seconds', inject(function($controller) {
      $scope.timer.min = 1;
      $scope.timer.sec = 15;
      
      expect($scope.timer.toSec()).toBe(75);
    }));
    
    it('should decrement 1 of sec when interval flushes 1000ms', inject(function($controller) {
      $scope.timer.sec = 15;
      $scope.start();
      $interval.flush(1000);
      expect($scope.timer.sec).toBe(14);
    }));
    
    it('should decrement 1 of min when interval flushes 60000ms', inject(function($controller) {
      $scope.timer.min = 2;
      $scope.timer.sec = 15;
      
      $scope.start();
      $interval.flush(60000);
      expect($scope.timer.min).toBe(1);
    }));
    
    it('should be 1:59 when interval flushes 1s given countdown iqual to 2:0', inject(function($controller) {
      $scope.timer.min = 2;
      $scope.timer.sec = 0;
      
      $scope.start();
      $interval.flush(1000);
      expect($scope.timer.min).toBe(1);
      expect($scope.timer.sec).toBe(59);
    }));
    
    
  });
});