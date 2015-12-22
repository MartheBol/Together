/**
 * Created by iman on 20/12/15.
 */
(function(){

    "use strict";

    var UsersController = function($scope, dbService) {

        $scope.getUsers = function(){

            dbService.getCollection('users').then(function(response){

                //console.log(response);
                $scope.arrUsers = response.userlist;

            });

        };

        $scope.getDetailUser = function(){
            dbService.getDetailsUser('users', req.correctuser.username).then(function(response){
                $scope.arrDetails = response.correctuser;

            });
        };

        $scope.getUserByID = function(){

            dbService.getItem('user').then(function(response){

                console.log(response);
                $scope.userProfile = response;

            });

        };
    };

    angular.module("app").controller("UsersController", ["$scope", "dbService", UsersController]);

})();