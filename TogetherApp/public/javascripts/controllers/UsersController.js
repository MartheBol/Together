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

                for( var i = $scope.arrUsers.length; i--;){

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
            var  username =  $scope.user.username,
                firstname = $scope.user.firstname,
                lastname = $scope.user.lastname,
                birthdate = $scope.user.birthdate,
                zipcode = $scope.user.zipcode,
                sex = $scope.user.sex,
                biography = $scope.user.biography;


            var url = "/api/users/updateprofile";
            $http.post(url, {
                username : username,
                firstname : firstname,
                lastname: lastname,
                birthdate : birthdate,
                zipcode : zipcode,
                sex : sex,
                biography :biography

            }).success(function (data) {
                $scope.error = data.error;
                $scope.information  = data;

            });



        };

        $scope.getUserByID = function(){

            dbService.getItem('user').then(function(response){
                $scope.userProfile = response;

            });


        };

        var clicksOnBtn = 0;

        $scope.showTableUsers = function(){
            $scope.filter = {showFilter:true};
            clicksOnBtn++;

            if(clicksOnBtn > 1){
                $scope.filter = {showFilter:false};
                clicksOnBtn = 0;
            }
        };

        $scope.hideTableUsers = function(){
            clicksOnBtn = 0;
            $scope.filter = {showFilter:false};
        };

    };

    angular.module("app").controller("UsersController", ["$scope","$routeParams", "$http", "dbService", UsersController]);

})();