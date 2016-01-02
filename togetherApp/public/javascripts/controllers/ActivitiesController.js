/**
 * Created by iman on 5/12/15.
 */

(function(){

    "use strict";

    var ActivitiesController = function($scope, dbService, $http , $location, $routeParams,fileUpload) {

        $scope.getActivities = function(){
            dbService.getCollection('activities').then(function(response){
                $scope.arrActivities = response.activitielist;

            });
        };

        $scope.addActivity = function() {
            console.log("ADD ACTIVITY");
            //var image = this.fileinput;
            var activityName = this.activityName;
            var street = this.street;
            var number = this.number;
            var zipcode = this.zipcode;
            var description = this.comment;
            var dateFrom = this.dateFrom;
            var dateUntil = this.dateUntil;
            var timestamp = new Date().getTime();
            //console.log(image);

            if((street !== undefined) &&
                (activityName !==undefined)&&
                (number !== undefined) &&
                (zipcode !== undefined) &&
                (description !== undefined) &&
                (dateFrom !== undefined) &&
                (dateUntil !== undefined) &&
                (timestamp !== undefined)){

                if(dateFrom <= dateUntil){
                    $scope.error = "";
                    var url = "http://localhost:3000/api/activities/addactivity";


                    var file = $scope.myFile;
                    var uploadUrl = "/images/activities/"+file.name;
                    fileUpload.uploadFileToUrl(file, uploadUrl);
                    console.log(uploadUrl);



                    $http.post(url, {
                        activityName:activityName,
                        street : street,
                        number: number,
                        zipcode: zipcode,
                        description : description,
                        dateFrom : dateFrom,
                        dateUntil : dateUntil,
                        timestamp : timestamp,
                        image: uploadUrl
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
                $scope.error = "ERROR: All fields are required.";
            }
        };

        $scope.getDetailActivity = function(){
            dbService.getDetailsActivity('activities', $routeParams.activityName).then(function(response){
                $scope.arrDetailsActivity = response.activity;
                initmap();
                return $scope.arrDetailsActivity;


            });
        };

        function initmap() {

            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 8,
                center: {lat: 50.8194894, lng: 3.2577076}
            });
            var geocoder = new google.maps.Geocoder();

            geocodeAddress(geocoder, map);

        };
        function geocodeAddress(geocoder, resultsMap) {
            var street = $scope.arrDetailsActivity.street;
            var number = $scope.arrDetailsActivity.number;
            var zipcode = $scope.arrDetailsActivity.zipcode;

            var address = street + " " + number + ", " + zipcode; //hier address uit db instoppen

            geocoder.geocode({'address': address}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    resultsMap.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: resultsMap,
                        position: results[0].geometry.location
                    });

                    console.log(marker)
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }





    };

    angular.module("app").controller("ActivitiesController", ["$scope", "dbService", "$http","$location", "$routeParams","fileUpload", ActivitiesController]);

})();