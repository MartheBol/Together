/**
 * Created by Marthe on 10/12/15.
 */

(function(){
    var app = angular.module("app", ["ngRoute"]);
    app.config(function($routeProvider){
        $routeProvider
            .when("/",{
                templateUrl: "./partials/home.html"
            })
            .when("/signup",{
                templateUrl: "partials/signup.html"
            })
            .when("/home",{
                templateUrl: "./partials/home.html"
            })
            .when("/matches",{
                templateUrl: "./partials/matches.html"
            })
            .when("/howto",{
                templateUrl: "./partials/howTo.html"
            })

    })
})();