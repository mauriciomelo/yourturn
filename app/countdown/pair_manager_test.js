'use strict';

describe("ManagerPair",function(){
    var $scope, controller;
    var $controller, $interval, $rootScope;
    
    beforeEach(module('myApp.countdown'));
    
    beforeEach(inject(function(_$controller_, _$interval_, _$rootScope_) {
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $controller = _$controller_;
      $interval = _$interval_;
      $rootScope = _$rootScope_;
      $scope =$rootScope.$new();
      controller = $controller('CountdownCtrl', { $scope: $scope, $interval: $interval });
      $scope.people = ["Jessica", "Mauricio","Renata"];
    }));

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
