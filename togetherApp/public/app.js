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
            })
            .when("/myprofile",{
                templateUrl: "./views/myProfile.html"
            })
            .when("/userdetails/:username",{
                templateUrl: "./views/detailsUser.html",
                controller: 'UsersController'
            })
            .when("/detailsuser",{
                templateUrl: "./views/detailsUser.html"
            })
            .when("/activitydetails/:activityName", {
                templateUrl: "./views/detailsActivity.html",
                controller: "ActivitiesController"

            });


    });

    app.run(function ($rootScope) {
        $rootScope.user = {};
    });

    app.directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });

    app.directive('editableCheckbox', function () {
        return {
            restrict: 'E',
            templateUrl: './views/editablecheckbox.html'
        };
    });


})();