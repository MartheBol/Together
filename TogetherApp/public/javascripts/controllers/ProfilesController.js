/**
 * Created by iman on 20/12/15.
 */
(function(){

    "use strict";

    var ProfilesController = function($scope, dbService) {

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

            dbService.getCollection('users').then(function(response){

                console.log(response);
                $scope.arrProfiles = response.userlist;

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

            else if($scope.filterQuery.toLowerCase() == i.username.toLowerCase()){
                return true;
            }

            else if($scope.filterQuery.toLowerCase() === "nofilter"){
                $scope.filterQuery = "";
            }

            return false;
        };
    };

    angular.module("app").controller("ProfilesController", ["$scope", "dbService", ProfilesController]);

})();