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
                firstname: this.firstname,
                lastname : this.lastname,
                //email : this.email,*/
                username : this.username,
                password : this.password,
                zipcode: this.zipcode,
                birthdate : this.birthdate,
                sex : this.sex,
                biography : this.biography

            }).success(function (data) {
                $scope.error = data.error;
                $location.path(data.redirect);
            });

        };
    };

    angular.module("app").controller("loginController", ["$scope", "$http", "$location", loginController]);
})();