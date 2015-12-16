/**
 * Created by Marthe on 16/12/15.
 */
(function () {
    "use strict";

    var userController = function ( $scope, $http, $location) {
        $http.get('/user').success(function(data) {
            $scope.user = data;

        });

        /*$scope.logout = function() {
            $http.get('/logout').success(function (data) {
                $location.path(data.redirect);
            });
        };*/
    };


    angular.module("app").controller("userController", ["$scope", "$http", "$location", userController]);
})();