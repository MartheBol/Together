/**
 * Created by iman on 20/12/15.
 */
(function(){

    "use strict";

    var UsersController = function($scope, dbService) {

        $scope.getUsers = function(){

            dbService.getCollection('users').then(function(response){

                console.log(response);
                $scope.arrUsers = response.userlist;

            });

        };

        $scope.getUserByID = function(){

            console.log("test");

        };
    };

    angular.module("app").controller("UsersController", ["$scope", "dbService", UsersController]);

})();