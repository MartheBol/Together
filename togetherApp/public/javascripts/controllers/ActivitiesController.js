/**
 * Created by iman on 5/12/15.
 */

(function() {

    "use strict";
    var ActivitiesController = function ($scope, dbService, $http, $location, $routeParams, $route) {
        $scope.interestedAct=true;
        $scope.nameButton = "Interested";

        $scope.getActivities = function () {
            dbService.getCollection('activities').then(function (response) {

                var arrTemp = response.activitielist;
                var arrActs = [];

                var today = new Date().toISOString().substring(0, 10),
                    todaySplit = today.split("-"),
                    sumToday =  todaySplit[0] +  todaySplit[1] +  todaySplit[2];

                for (var i = 0, l = arrTemp.length; i < l; i++) {
                    var activtyDateSplit = arrTemp[i].untilDate.substring(0,10).split("-"),
                        sumActivity =  activtyDateSplit[0] + activtyDateSplit[1] + activtyDateSplit[2];
                    if ( sumActivity >= sumToday) {
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

        function timeConsistOf2Numbers(number, callback){
                var output = number + '';
                if (output.length < 2) {
                    output = '0' + output;
                    number = output.toString();

                }
                else{
                    number = number.toString();
                }


            if(!number.isEmpty){
                callback(null, number);
            }

            else{
                callback("No number.", null);
            }


        }




        $scope.addActivity = function() {
            var activityName = this.activityName;
            var street = this.street;
            var number = this.number;
            var zipcode = this.zipcode;
            var description = this.comment;
            var dateFrom = this.dateFrom;
            var dateUntil = this.dateUntil;
            var timestamp = new Date().getTime();
            var startTimeHour  = this.startTimeHour;
            var startTimeMin = this.startTimeMin;
            var endTimeHour = this.endTimeHour;
            var endTimeMin = this.endTimeMin;



            if((street !== undefined) &&
                (number !== undefined) &&
                (zipcode !== undefined) &&
                (description !== undefined) &&
                (dateFrom !== undefined) &&
                (dateUntil !== undefined) &&
                (timestamp !== undefined)){

                if(dateFrom <= dateUntil) {
                    $scope.error = "";

                    if (startTimeMin < 60 && startTimeHour < 25) {

                        timeConsistOf2Numbers(startTimeHour, function(error, startTimeHourString){
                            startTimeHour = startTimeHourString;
                            if(error){
                                console.log(error);
                            }
                        });
                        timeConsistOf2Numbers(startTimeMin, function(error, startTimeMinString){
                            startTimeMin = startTimeMinString;
                            if(error){
                                console.log(error);

                            }
                        });

                        console.log(startTimeHour);
                        console.log(startTimeMin);

                        if (startTimeMin.length === 2  && startTimeHour.length === 2) {
                            console.log("je komt hier terecht");

                            if(endTimeMin < 60 && endTimeHour < 24){
                                timeConsistOf2Numbers(endTimeHour, function(error, endTimeHourString){
                                    endTimeHour = endTimeHourString;
                                    if(error){
                                        console.log(error);
                                    }
                                });
                                timeConsistOf2Numbers(endTimeMin, function(error, endTimeMinString){
                                    endTimeMin = endTimeMinString;
                                    if(error){
                                        console.log(error);

                                    }
                                });

                                console.log(endTimeHour);
                                console.log(endTimeMin);

                            if (endTimeMin.toString().length === 2 && endTimeHour.toString().length === 2) {

                                console.log(startTimeHour + ":" + startTimeMin);

                                getKeywordsFromDescription(description, function (error, data) {
                                 description = data;
                                 if(!error){
                                 console.log(startTimeHour + ":" + startTimeMin);

                                 var url = "http://localhost:3000/api/activities/addactivity";
                                 $http.post(url, {
                                 activityName:activityName,
                                 street : street,
                                 number: number,
                                 zipcode: zipcode,
                                 description : description,
                                 dateFrom : (dateFrom.toISOString()).substring(0,10) + " " + startTimeHour + ":" +  startTimeMin,
                                 dateUntil : (dateUntil.toISOString()).substring(0,10) + " " + endTimeHour + ":" +  endTimeMin,
                                 timestamp : timestamp

                                 }).success(function (data) {
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

                            else {
                                $scope.error = "Enddate input is not correct";
                            }
                            }

                            else{
                                $scope.error = "Endtime input is not correct";
                            }

                        }

                        else {
                            $scope.error = 'foutje!!!! '
                        }
                    }

                    else {
                        $scope.error = "Starttime input is not correct";
                    }
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
            var url = "";
            var interestedAct = $scope.interestedAct;
            if(interestedAct !== false) {

                url = "http://localhost:3000/api/activities/interested";
                $http.post(url, {
                    activityName: activityName,
                    interestedUser: interestedUser,
                    createrUser: createrUser
                }).success(function (data) {
                    console.log(data);
                    console.log(interestedUser + " is geïnteresseerd in " + activityName + " door " + createrUser);
                    $scope.interestedAct = false;
                    $scope.nameButton = "Not interested";
                    $scope.error = data.error;
                });
            }else{
                console.log(interestedAct);
                url = "http://localhost:3000/api/activities/deleteinterested";
                $http.post(url, {
                    activityName: activityName,
                    interestedUser: interestedUser,
                    createrUser: createrUser
                }).success(function (data) {
                    console.log(data);
                    console.log(interestedUser + " is niet meer geïnteresseerd in " + activityName + " door " + createrUser);
                    $scope.interestedAct = true;
                    $scope.nameButton = "Interested";

                    $scope.error = data.error;
                });
            }
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