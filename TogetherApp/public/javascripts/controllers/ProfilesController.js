/**
 * Created by iman on 20/12/15.
 */


(function(){

    "use strict";

    var ProfilesController = function($scope, $rootScope, $routeParams, dbService) {

        var clicksOnBtn = 0;

        $scope.showDiv = function(){
            $scope.filter = {showFilter:true};
            clicksOnBtn++;

            if(clicksOnBtn > 1){
                $scope.filter = {showFilter:false};
                clicksOnBtn = 0;
            }
        };

        $scope.hideDiv = function(){
            clicksOnBtn = 0;
            $scope.filter = {showFilter:false};
        };

        $scope.showProfiles = function(){

            var username = "";
            if($rootScope.user.username !== undefined){
                username = $rootScope.user.username;
            }

            dbService.getCollection('users').then(function(response){

                var arrProfiles = response.userlist;
                for(var i = 0; i < arrProfiles.length; i++){
                    if(arrProfiles[i].username === username) {
                        arrProfiles.splice(i, 1);
                    }
                }
                for(var ii = 0; ii < arrProfiles.length; ii++){
                    if(arrProfiles[ii].username === "admin") {
                        arrProfiles.splice(ii, 1);
                    }
                }
                $scope.arrProfiles = arrProfiles;

            });

        };

        $scope.sortProperty = "title";
        $scope.filterQuery = "";
        $scope.filterImages = function(i){
            if($scope.filterQuery === ""){
                return true;
            }

            /*
             else if(i.username.toLowerCase().indexOf($scope.filterQuery.toLocaleLowerCase()) >= 0){
             return true;
             }
             */

            else if(i.sex === undefined){
                return false;
            }

            else if($scope.filterQuery.toLowerCase() == i.sex.toLowerCase()){
                return true;
            }

            else if($scope.filterQuery.toLowerCase() === "nofilter"){
                $scope.filterQuery = "";
            }

            return false;
        };
    };

    angular.module("app").controller("ProfilesController", ["$scope", "$rootScope", "$routeParams", "dbService", ProfilesController]);

})();