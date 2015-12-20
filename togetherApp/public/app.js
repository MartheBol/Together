/**
 * Created by Marthe on 10/12/15.
 */

(function(){
    var app = angular.module("app", ["ngRoute"]);
    app.config(function($routeProvider){
        $routeProvider
            .when("/",{
                templateUrl: "./views/home.html"
            })
            .when("/signup",{
                templateUrl: "views/signup.html"
            })
            .when("/home",{
                templateUrl: "./views/home.html"
            })
            .when("/matches",{
                templateUrl: "./views/matches.html"
            })
            .when("/howto",{
                templateUrl: "./views/howTo.html"
            })
            .when("/activities",{
                templateUrl: "./views/activities.html"
            })
            .when("/admin",{
                templateUrl: "./views/admin.html"
            })
            .when("/searchprofiles",{
                templateUrl: "./views/searchProfiles.html"
            });

    });
})();