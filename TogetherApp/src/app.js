/**
 * Created by Marthe on 1/12/15.
 */
(function () {
    "use strict";

    var app = angular.module("app", ["ngRoute"]);
    app.config(function ($routeProvider) {
        //als de pagina eindige op all dan {} uitvoeren
        $routeProvider
            .when("/search", {
                templateUrl: "ImagesOverview/search.html"
            })
            .when("/details/:id", {
                templateUrl: "ImagesDetails/details.html"
            })
            .when("/home", {
                templateUrl: "home/home.html"
            })
            .when("/howto", {
                templateUrl: "howTo/howTo.html"
            })
            .when("/register", {
                templateUrl: "profile/register.html"
            })

            .otherwise({
                redirectTo: "/home"
            });
    });

})();