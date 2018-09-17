var mathHelperApp = angular.module('mathHelperApp', ['ngRoute']);

mathHelperApp.config(function($routeProvider){
    
    $routeProvider
    .when('/', {
        templateUrl: '/html/main.html',
        controller: 'mainController'
    })
    .when('/addition', {
        templateUrl: '/html/additions.html',
        controller: 'additionController'        
    })
    .when('/subtraction', {
        templateUrl: '/html/subtractions.html',
        controller: 'subtractionController'                
    })
    .when('/multiplication', {
        templateUrl: '/html/multiplications.html',
        controller: 'multiplicationController'                
    })    
});

mathHelperApp.controller('mainController', ['$scope', '$location', function($scope, $location){
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };    
}]);

mathHelperApp.controller('additionController', ['$scope', '$log', function($scope, $log){
    
    // initialize the first question
    $scope.a = Math.floor((Math.random() * 20) + 1);
    $scope.b = Math.floor((Math.random() * 20) + 1);       
    $scope.greeting = "Welcome to Hagibidaba's Addition solver ! Solve the addition problems and win fantastic prizes !";
    //initialize the answers array
    $scope.answers = [];
    
    $scope.checkResults = function(a, b, c) {
        return a + b == c;
    }
    

    $scope.checkClicked = function(){
        var newAnswerObject = {
            a : $scope.a,
            b : $scope.b,
            answer: $scope.answer,
            result : $scope.a + $scope.b == $scope.answer,
            question : function(){
                return(this.a + " + " + this.b );  
            },
            formattedString : function(){
                return(this.a + " + "+ this.b + " = "+ this.answer + " ==> " + this.result);
            }
        };
        
        if(newAnswerObject.result){
            $scope.greeting = "You did well ! Let us see if you can solve the next one !";
        } else {
            $scope.greeting = "That was WRONG ! Try again next time !";
        }
        
        $scope.answers.push(newAnswerObject);        
        $log.info($scope.answers);
        $scope.changeQuestion();
    };
    
    $scope.changeQuestion = function() {
        $scope.a = Math.floor((Math.random() * 100) + 1);
        $scope.b = Math.floor((Math.random() * 100) + 1);       
        $scope.answer = '';
    };
    
    $scope.getQuestion = function(){
      return  this.a + " + " + this.b + " = ";  
    };
    
}]);

mathHelperApp.controller('subtractionController', ['$scope', function($scope){
    
}]);

mathHelperApp.controller('multiplicationController', ['$scope', function($scope){
    
}]);