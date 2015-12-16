/**
 * Created by Marthe on 15/12/15.
 */
(function(){
    "use strict";

    var loginController = function ($scope, $http, $location) {
        $scope.login = function() {
            $http
                .post('/login', {
                    username: this.username,
                    password: this.password
                })
                .success(function(data) {
                    console.log(data);
                    $scope.error = data.error;
                    $location.path(data.redirect);
                });
        };

        $scope.register = function() {
            console.log("REGISTER");
            $http.post('/register', {
                username : this.username,
                password : this.password
            }).success(function (data) {
                $scope.error = data.error;
                $location.path(data.redirect);
            });
        };
    };

    angular.module("app").controller("loginController", ["$scope", "$http", "$location", loginController]);
})();