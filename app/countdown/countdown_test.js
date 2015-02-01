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
    
    it('should be playing when started', inject(function($controller) {
      $scope.start();
      expect($scope.isPlaying()).toBe(true);
    }));
    
    it('should not be playing when stoped', inject(function($controller) {
      $scope.start();
      $scope.stop();
      expect($scope.isPlaying()).toBe(false);
    }));
    
    
  });

  describe("Manager Pair functionality",function(){
    var $scope, controller;

    beforeEach(function() {
      $scope =$rootScope.$new();
      controller = $controller('CountdownCtrl', { $scope: $scope, $interval: $interval });
      $scope.people = ["Jessica", "Mauricio","Renata"];
    });

    it("should get a list of people for dojo with size 3", inject(function($controller)  {
      expect($scope.people.length).toBe(3);
    }));

    it("should in the beginning set the pair with two first people of the list",inject(function($controller)  {
        $scope.setPair(["Jessica","Mauricio"]);
        expect($scope.pair).toEqual(["Jessica","Mauricio"]);
    }));

    it("should not set a pair equal to previous pair",inject(function($controller) {
        $scope.setPair();
        $scope.setPair();
        expect($scope.pair).not.toEqual(["Jessica","Mauricio"]);
    }));

    it("should to change the driver and keep the co-pilot for the next pair",inject(function($controller) {
      $scope.setPair();
      $scope.setPair();
      expect($scope.pair).toEqual(["Mauricio","Renata"]);
    }));

    it("should not try make a pair if the list is over", inject(function($controller) {
      $scope.setPair();
      $scope.setPair();
      $scope.setPair();
      expect($scope.pair).toEqual(["Renata","Jessica"]);
    }));

    it("should make a turn pair correctly with 5 people",inject(function($controller) {

    }));

  });

});