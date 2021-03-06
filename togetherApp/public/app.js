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
                templateUrl: "./views/howTo.html",
                controller: "userController"
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

            })
            .when("/chat",{
                templateUrl: "./views/chat.html"
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


    app.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

    app.service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function(file, uploadUrl){
            var fd = new FormData();
            fd.append('file', file);
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
                .success(function(){
                    console.log("success");
                })
                .error(function(){
                    console.log("error");
                });
        };
    }]);


    app.directive('editableCheckbox', function () {
        return {
            restrict: 'E',
            templateUrl: './views/editablecheckbox.html'
        };
    });


})();