angular.module("arduinowebsocket-web").config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"view/home.html"
    });

    $routeProvider.when("/testews",{
        templateUrl:"view/testews.html",
        controller:"testewsController"
    });
}]);