/**
 * Created by iman on 5/12/15.
 */

(function(){

    "use strict";

    var MatchesController = function($scope, matchesService) {

        $scope.showMatches = function(){

            var nameUser = "Luna";

            var arrMatchesByUser = matchesService.getMatches(nameUser);

            $scope.aantalMatches = arrMatchesByUser.length;

            $scope.arrMatches = arrMatchesByUser;

            var text = "";
            for(var i=0; i<arrMatchesByUser.length; i++){
                text = arrMatchesByUser[i].interests.toString().replace(" ,", " ");
                arrMatchesByUser[i].interests = text;
            }

        };
    };

    angular.module("app").controller("MatchesController", ["$scope", "matchesService", MatchesController]);

})();