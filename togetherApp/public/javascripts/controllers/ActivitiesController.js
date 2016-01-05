/**
 * Created by iman on 5/12/15.
 */

(function() {

    "use strict";
    var ActivitiesController = function ($scope, dbService, $http, $location, $routeParams, $route) {
        $scope.nameButton="Interested";
        $scope.getActivities = function () {
            dbService.getCollection('activities').then(function (response) {

                var arrTemp = response.activitielist;
                var arrActs = [];

                for (var i = 0, l = arrTemp.length; i < l; i++) {
                    if (new Date(arrTemp[i].untilDate).getTime() >= new Date().getTime()) {
                        arrActs.push(arrTemp[i]);
                    }
                }

                $scope.arrActivities = arrActs;

            });


        };

        String.prototype.replaceAll = function( token, newToken, ignoreCase ) {
            var _token;
            var str = this + "";
            var i = -1;

            if ( typeof token === "string" ) {

                if ( ignoreCase ) {

                    _token = token.toLowerCase();

                    while( (
                        i = str.toLowerCase().indexOf(
                            token, i >= 0 ? i + newToken.length : 0
                        ) ) !== -1
                        ) {
                        str = str.substring( 0, i ) +
                            newToken +
                            str.substring( i + token.length );
                    }

                } else {
                    return this.split( token ).join( newToken );
                }

            }
            return str;
        };

        function isInArray(value, array) {
            return array.indexOf(value);
        }

        function getKeywordsFromDescription(description, callback) {

            description = description.replaceAll('.', '');
            description = description.replaceAll(',', '');
            description = description.replaceAll('?', '');
            description = description.replaceAll('!', '');
            description = description.replaceAll('"', '');
            description = description.replaceAll("'", '');

            var words = description.split(" ");
            var keyWords = "";

            dbService.getNoiseWords().then(function(response) {

                var noiseWords = response.noisewords;

                for (var i = 0; i < words.length; i++) {

                    if (isInArray(words[i].toLowerCase(), noiseWords) == -1) {
                        keyWords += words[i];
                        keyWords += " ";
                    }
                }

                //return keyWords;
                if(!keyWords.isEmpty){
                    callback(null, keyWords);
                }

                else{
                    callback("No keywords found.", null);
                }

            });
        }

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

                    getKeywordsFromDescription(description, function (error, data) {
                        if(!error){
                            description = data;
                            var url = "http://localhost:3000/api/activities/addactivity";

                            /*var file = $scope.myFile; 
                            var uploadUrl = "/images/activities/" + file.name;
                            fileUpload.uploadFileToUrl(file, uploadUrl); 
                            console.log(uploadUrl);*/

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
                                console.log('activity is opgeslaan');
                             $scope.error = data.error;
                             $scope.getActivities();
                             resetForm();
                             //$location.path(data.redirect);
                             });

                        }
                        else{
                            console.log(error);
                        }
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

        $scope.getDetailActivity = function(){
            dbService.getDetailsActivity('activities', $routeParams.activityName).then(function(response){
                $scope.arrDetailsActivity = response.activity;
                initmap();
                return $scope.arrDetailsActivity;


            });
        };

        $scope.interested = function(activityName,interestedUser, createrUser){
            console.log("IK BEN GEÏNTERESSEERD!");
            console.log(activityName);
            console.log(interestedUser);
            console.log(createrUser);
            var url = "";
            if($scope.nameButton !== "Not interested") {

                url = "http://localhost:3000/api/activities/interested";
                $http.post(url, {
                    activityName: activityName,
                    interestedUser: interestedUser,
                    createrUser: createrUser
                }).success(function (data) {
                    console.log(data);
                    console.log(interestedUser + " is geïnteresseerd in " + activityName + " door " + createrUser);
                    //$scope.nameButton = "Not interested";
                    $scope.error = data.error;
                });
            }/*else{
                url = "http://localhost:3000/api/activities/deleteinterested";
                $http.post(url, {
                    activityName: activityName,
                    interestedUser: interestedUser,
                    createrUser: createrUser
                }).success(function (data) {
                    console.log(data);
                    console.log(interestedUser + " is niet meer geïnteresseerd in " + activityName + " door " + createrUser);
                    $scope.nameButton = "Interested";
                    $scope.error = data.error;
                });
            }*/
        };

        function recentFirst(a,b) {
            if (a.timestamp > b.timestamp)
                return -1;
            if (a.timestamp < b.timestamp)
                return 1;
            return 0;
        }

        $scope.getMostRecentActivities = function(){
            dbService.getCollection('activities').then(function(response){

                var numberOfActivities = 3;
                var arrTemp = response.activitielist;
                var arrAllActivities = [];

                for (var i = 0, l = arrTemp.length; i < l; i++) {
                    if (new Date(arrTemp[i].untilDate).getTime() > new Date().getTime()) {
                        arrAllActivities.push(arrTemp[i]);
                    }
                }

                arrAllActivities.sort(recentFirst);

                var arrMostRecentActivities = [];

                for(var ii=0; ii<numberOfActivities; ii++){
                    arrMostRecentActivities.push(arrAllActivities[ii]);
                }

                //console.log("[arrAllActivities]: ");
                //console.log(arrAllActivities);
                //console.log("[arrMostRecentActivities]: ");
                //console.log(arrMostRecentActivities);

                $scope.arrMostRecentActivities = arrMostRecentActivities;

            });
        };

        function initmap() {

            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: {lat: 50.8194894, lng: 3.2577076}
            });
            var geocoder = new google.maps.Geocoder();

            geocodeAddress(geocoder, map);


        }

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

                    console.log(marker);

                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }

        function resetForm(){
            var frm = document.getElementsByName('ActivityForm')[0];
            console.log('je komt in de resetform');
            frm.reset();
        }
    };

    angular.module("app").controller("ActivitiesController", ["$scope", "dbService", "$http","$location", "$routeParams","fileUpload", ActivitiesController]);


})();