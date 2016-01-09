/**
 * Created by iman on 5/12/15.
 */

(function(){

    "use strict";

    var MatchesController = function($scope, dbService) {

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

        $scope.sortProperty = "title";
        $scope.filterQuery = "";
        $scope.filterMatches = function(i){
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

        //http://www.falsepositives.com/index.php/2009/12/01/javascript-function-to-get-the-intersect-of-2-arrays/
        $scope.intersect = function(arr1, arr2)
        {
            var r = [], o = {}, l = arr2.length, i, v;
            for (i = 0; i < l; i++) {
                o[arr2[i]] = true;
            }
            l = arr1.length;
            for (i = 0; i < l; i++) {
                v = arr1[i];
                if (v in o) {
                    r.push(v);
                }
            }

            return r;
        };

        $scope.showMatches = function(){

            /*
             var username = "";
             if($rootScope.user.username !== undefined){
             username = $rootScope.user.username;
             }
             */

            var username;

            username = localStorage.getItem("username");

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


                dbService.getItem(username).then(function(response){

                    var user = response;
                    var arrMatches = [];


                    for(var i=arrProfiles.length; i--;){

                        var sameInterests = [];
                        sameInterests = $scope.intersect(user.interests, arrProfiles[i].interests);

                        if(sameInterests.length !== 0){
                            if(arrProfiles[i].deleted === false){
                                arrMatches.push(arrProfiles[i]);
                            }

                        }

                    }

                    $scope.arrMatches = arrMatches;

                });
            });
        };

    };

    angular.module("app").controller("MatchesController", ["$scope", "dbService", MatchesController]);

})();