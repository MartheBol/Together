/**
 * Created by iman on 5/12/15.
 */

(function(){

    "use strict";

    var ActivitiesController = function($scope, activitiesService) {

        $scope.showActivities = function(){

            var arrActivities = activitiesService.getActivities();

            $scope.arrActivities = arrActivities;

        };
    };

    angular.module("app").controller("ActivitiesController", ["$scope", "activitiesService", ActivitiesController]);

})();