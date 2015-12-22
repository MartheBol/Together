/**
 * Created by Marthe on 16/12/15.
 */
(function () {
    "use strict";

    var userController = function ( $scope, $http, $location) {
        $http.get('/user').success(function(data) {
            $scope.user = data;

            if(data.username == 'admin'){
                $scope.auth = {isAuth: true, isAdmin : true};
            }
            else if(data.username != 'admin' && data.username !== undefined){
                $scope.auth = {isAuth: true, isAdmin : false};
            }
            else if(data.username === undefined){
                $scope.auth = {isAuth: false, isAdmin : false};

            }


        });



        /*$scope.logout = function() {
            $http.get('/logout').success(function (data) {
                $location.path(data.redirect);
            });
        };*/
    };


    angular.module("app").controller("userController", ["$scope", "$http", "$location", userController]);
})();