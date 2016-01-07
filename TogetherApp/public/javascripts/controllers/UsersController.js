/**
 * Created by iman on 20/12/15.
 */
(function(){

    "use strict";

    var UsersController = function($scope, $routeParams, $http, dbService) {

        $scope.getUsers = function(){

            dbService.getCollection('users').then(function(response){

                //console.log(response);
                $scope.arrUsers = response.userlist;

                for( var i = 0; i<$scope.arrUsers.length; i++){

                    if($scope.arrUsers[i].deleted === false){
                        $scope.deleted = false;
                    }

                    else{
                        $scope.deleted = true;
                    }



                }


            });

        };

        $scope.getDetailUser = function(){

            dbService.getDetailsUser('users', $routeParams.username).then(function(response){
                $scope.userDetails = response.correctuser;
            });
        };

        $scope.deleteUser = function(username){
            dbService.deleteUser('users', username).then(function(response){
                $scope.infodeletedUser = response;
                $scope.getUsers();
            });
        };

        $scope.updateUser = function(){
            /*dbService.updateUser('users').then(function(response){
                $scope.updateuser = response;
                console.log(response);
                console.log("gelukt");

            })*/

            var  username =  this.username,
                password = this.password,
                birthdate = this.birthdate,
                zipcode = this.zipcode,
                sex = this.sex,
                biography = this.biography;

            var url = "api/users/updateprofile";
            $http.post(url, {
                username : username,
                password : password,
                birthdate : birthdate,
                zipcode : zipcode,
                sex : sex,
                biography :biography

            }).success(function (data) {
                $scope.error = data.error;

            });

            console.log(username, password, birthdate, zipcode, sex, biography);




        };

        $scope.getUserByID = function(){

            dbService.getItem('user').then(function(response){
                console.log(response);
                $scope.userProfile = response;

            });


        };


    };

    angular.module("app").controller("UsersController", ["$scope","$routeParams", "$http", "dbService", UsersController]);

})();