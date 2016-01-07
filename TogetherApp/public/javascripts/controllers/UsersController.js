/**
 * Created by iman on 20/12/15.
 */
(function(){

    "use strict";

    var UsersController = function($scope, $routeParams, dbService) {

        $scope.getUsers = function(){

            dbService.getCollection('users').then(function(response){

                //console.log(response);
                $scope.arrUsers = response.userlist;

                for( var i = 0; i<$scope.arrUsers.length; i++){

                    if($scope.arrUsers[i].deleted === false){
                        $scope.deleted = false
                    }

                    else{
                        $scope.deleted = true
                    }



                }


            });

        };

        $scope.getDetailUser = function(){

            dbService.getDetailsUser('users', $routeParams.username).then(function(response){
                $scope.arrDetails = response.correctuser;
            });
        };

        $scope.deleteUser = function(username){
            dbService.deleteUser('users', username).then(function(response){
                $scope.infodeletedUser = response;
            })
        };

        $scope.getUserByID = function(){

            dbService.getItem('user').then(function(response){
                console.log(response);
                $scope.userProfile = response;

            });

        };


    };

    angular.module("app").controller("UsersController", ["$scope", "$routeParams", "dbService", UsersController]);

})();