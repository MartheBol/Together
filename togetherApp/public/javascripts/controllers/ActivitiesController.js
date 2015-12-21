/**
 * Created by iman on 5/12/15.
 */

(function(){

    "use strict";

    var ActivitiesController = function($scope, dbService) {

        $scope.showActivities = function(){

            $scope.arrActivities = dbService.getCollection('users');

        };


        $scope.addActivity = function() {
            console.log("ADD ACTIVITY");

            var street = this.street;
            var number = this.number;
            var zipcode = this.zipcode;
            var comment = this.comment;
            var dateFrom = this.dateFrom;
            var dateUntil = this.dateUntil;
            var timestamp = new Date().getTime();

            if((street !== undefined) &&
                (number !== undefined) &&
                (zipcode !== undefined) &&
                (comment !== undefined) &&
                (dateFrom !== undefined) &&
                (dateUntil !== undefined) &&
                (timestamp !== undefined)){

                if(dateFrom <= dateUntil){
                    $scope.error = "";

                    $http.post('/addactivity', {
                        address : street + " " + number + " " + zipcode,
                        comment : comment,
                        dateFrom : dateFrom,
                        dateUntil : dateUntil,
                        timestamp : timestamp
                    }).success(function (data) {
                        $scope.error = data.error;
                        $location.path(data.redirect);
                    });

                }
                else if(dateFrom > dateUntil){
                    $scope.error = "ERROR: Date until can't be earlier than date from.";
                }

            }
            else{
                $scope.error = "ERROR: All fields are required.";
            }
        };
    };

    angular.module("app").controller("ActivitiesController", ["$scope", "dbService", ActivitiesController]);

})();