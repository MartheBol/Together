/**
 * Created by iman on 5/12/15.
 */

(function(){

    "use strict";

    var ActivitiesController = function($scope, dbService, $http , $location) {

        $scope.showActivities = function(){

            $scope.arrActivities = dbService.getCollection('users');

        };


        $scope.addActivity = function() {
            console.log("ADD ACTIVITY");
            var activityName = this.activityName;
            var street = this.street;
            var number = this.number;
            var zipcode = this.zipcode;
            var description = this.comment;
            var dateFrom = this.dateFrom;
            var dateUntil = this.dateUntil;
            var timestamp = new Date().getTime();
            console.log(street);

            if((street !== undefined) &&
                (number !== undefined) &&
                (zipcode !== undefined) &&
                (description !== undefined) &&
                (dateFrom !== undefined) &&
                (dateUntil !== undefined) &&
                (timestamp !== undefined)){

                if(dateFrom <= dateUntil){
                    $scope.error = "";
                    var url = "http://localhost:3000/api/activities/addactivity";

                    $http.post(url, {
                        activityName:activityName,
                        street : street,
                        number: number,
                        zipcode: zipcode,
                        description : description,
                        dateFrom : dateFrom,
                        dateUntil : dateUntil,
                        timestamp : timestamp
                    }).success(function (data) {
                        console.log(data);
                        $scope.error = data.error;
                        //$location.path(data.redirect);
                    });



                }
                else if(dateFrom > dateUntil){
                    $scope.error = "ERROR: Date until can't be earlier than date from.";
                }

            }
            else{
                $scope.error = "ERROR: All fields are required.8888";
            }
        };
    };

    angular.module("app").controller("ActivitiesController", ["$scope", "dbService", "$http","$location", ActivitiesController]);

})();