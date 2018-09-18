var mathHelperApp = angular.module('mathHelperApp', ['ngRoute']);

mathHelperApp.config(function($routeProvider){
    
    $routeProvider
    .when('/', {
        templateUrl: '/html/main.html',
        controller: 'mainController'
    })
    .when('/addition', {
        templateUrl: '/html/calculations.html',
        controller: 'additionController'        
    })
    .when('/subtraction', {
        templateUrl: '/html/calculations.html',
        controller: 'subtractionController'                
    })
    .when('/multiplication', {
        templateUrl: '/html/calculations.html',
        controller: 'multiplicationController'                
    })    
});

mathHelperApp.controller('mainController', ['$scope', '$location', function($scope, $location){
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };    
}]);

mathHelperApp.service('resultAggregator', function() {
    this.aggregate = function(num1, num2, answer, verifier, questionizer ) {
        return {
          a : num1,
          b : num2,
          answer : answer,
          result : verifier(num1, num2, answer),
          question : questionizer(num1, num2)
        };
    };
    
    this.myFunc = function (x) {
        return x.toString(16);
    }
});

mathHelperApp.service('randomizer', function(){
    this.getNewRandomNumber = function(limit) {
        var lim = limit ? limit : 20;
        return Math.floor((Math.random() * lim) + 1);
    }
});

mathHelperApp.controller('additionController', ['$scope', '$log', 'resultAggregator', 'randomizer', function($scope, $log, $resultAggregator, $randomizer ) {
        
    var initialize = function() {        
        changeQuestion();
        $scope.answers = [];
        $scope.message = '';
    }

    var resultVerifier = function(a, b, answer){
      return a + b == answer;  
    }
    
    var questionizer = function(a, b) {
        return(a + " + " + b ); 
    }    
    
    
    var changeQuestion = function() {
        $scope.a = $randomizer.getNewRandomNumber(50);
        $scope.b = $randomizer.getNewRandomNumber(50);
        $scope.answer = '';
    };
        
    $scope.operation = "Addition";

    $scope.operationCode = "+";
    
    $scope.checkClicked = function() {    
        $scope.newAnswerObject =  $resultAggregator.aggregate($scope.a, $scope.b, $scope.answer, resultVerifier, questionizer);        
        $scope.answers.push($scope.newAnswerObject);
        changeQuestion();
    };

    initialize();
    
}]);

mathHelperApp.controller('subtractionController', ['$scope', '$log', 'resultAggregator', 'randomizer', function($scope, $log, $resultAggregator, $randomizer ) {
        
    var initialize = function() {        
        changeQuestion();
        $scope.answers = [];
        $scope.message = '';
    }

    var resultVerifier = function(a, b, answer){
      return a - b == answer;  
    }
    
    var questionizer = function(a, b) {
        return(a + " - " + b ); 
    }    
    
    
    var changeQuestion = function() {
        $scope.a = $randomizer.getNewRandomNumber(50);
        $scope.b = $randomizer.getNewRandomNumber($scope.a);
        $scope.answer = '';
    };
        
    $scope.operation = "Subtraction";

    $scope.operationCode = "-";
    
    $scope.checkClicked = function() {    
        $scope.newAnswerObject =  $resultAggregator.aggregate($scope.a, $scope.b, $scope.answer, resultVerifier, questionizer);        
        $scope.answers.push($scope.newAnswerObject);
        changeQuestion();
    };

    initialize();
    
}]);

mathHelperApp.controller('multiplicationController', ['$scope', '$log', 'resultAggregator', 'randomizer', function($scope, $log, $resultAggregator, $randomizer ) {
        
    var initialize = function() {        
        changeQuestion();
        $scope.answers = [];
        $scope.message = '';
    }

    var resultVerifier = function(a, b, answer){
      return a * b == answer;  
    }
    
    var questionizer = function(a, b) {
        return(a + " * " + b ); 
    }    
    
    
    var changeQuestion = function() {
        $scope.a = $randomizer.getNewRandomNumber(5);
        $scope.b = $randomizer.getNewRandomNumber(5);
        $scope.answer = '';
    };
        
    $scope.operation = "Multiplication";

    $scope.operationCode = "*";
    
    $scope.checkClicked = function() {    
        $scope.newAnswerObject =  $resultAggregator.aggregate($scope.a, $scope.b, $scope.answer, resultVerifier, questionizer);        
        $scope.answers.push($scope.newAnswerObject);
        changeQuestion();
    };

    initialize();
    
}]);
