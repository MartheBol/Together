/**
 * Created by iman on 5/12/15.
 */

(function () {

    "use strict";
    var dateTimeNow = new Date().toISOString().substring(0, 10) + " " + new Date().toISOString().substring(11, 16);

    var ActivitiesController = function ($scope, dbService, $http, $location, $routeParams, $route) {
        $scope.interestedAct = true;
        $scope.nameButton = "Interested";

        $scope.getActivities = function () {
            dbService.getCollection('activities').then(function (response) {

                var arrTemp = response.activitielist;
                var arrActs = [];


                for (var i = 0, l = arrTemp.length; i < l; i++) {
                    if (new Date(arrTemp[i].untilDate).getTime() >= new Date(dateTimeNow).getTime()) {
                        arrActs.push(arrTemp[i]);
                        if(arrTemp[i].deleted === false){
                            $scope.deleted = false;
                        }

                        else{
                            $scope.deleted = true;
                        }
                    }
                }

                $scope.arrActivities = arrActs;

            });


        };

        String.prototype.replaceAll = function (token, newToken, ignoreCase) {
            var _token;
            var str = this + "";
            var i = -1;

            if (typeof token === "string") {

                if (ignoreCase) {

                    _token = token.toLowerCase();

                    while ((
                        i = str.toLowerCase().indexOf(
                            token, i >= 0 ? i + newToken.length : 0
                        ) ) !== -1
                        ) {
                        str = str.substring(0, i) +
                            newToken +
                            str.substring(i + token.length);
                    }

                } else {
                    return this.split(token).join(newToken);
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

            dbService.getNoiseWords().then(function (response) {

                var noiseWords = response.noisewords;

                for (var i = 0; i < words.length; i++) {

                    if (isInArray(words[i].toLowerCase(), noiseWords) == -1) {
                        keyWords += words[i];
                        keyWords += " ";
                    }
                }

                //return keyWords;
                if (!keyWords.isEmpty) {
                    callback(null, keyWords);
                }

                else {
                    callback("No keywords found.", null);
                }

            });
        }

        function stringConsistOf2Numbers(number, callback) {
            var output = number + '';
            if (output.length < 2) {
                output = '0' + output;
                number = output.toString();

            }
            else {
                number = number.toString();
            }


            if (!number.isEmpty) {
                callback(null, number);
            }

            else {
                callback("No number.", null);
            }


        }

        function fullDate(number, number2, callback) {
            stringConsistOf2Numbers(number, function (error, numberToString) {
                number = numberToString;
                if (error) {
                    console.log(error);

                }
            });
            stringConsistOf2Numbers(number2, function (error, numberToString) {
                number2 = numberToString;
                if (error) {
                    console.log(error);

                }
            });

            if (!number.isEmpty && !number2.isEmpty) {
                callback(null, number, number2);
            }

            else {
                callback("No number.", null);
            }


        }


        $scope.addActivity = function () {
            var activityName = this.activityName;
            var street = this.street;
            var number = this.number;
            var zipcode = this.zipcode;
            var description = this.comment;
            var dateFrom = this.dateFrom;
            var dateUntil = this.dateUntil;
            var timestamp = new Date().getTime();
            var startTimeHour = this.startTimeHour;
            var startTimeMin = this.startTimeMin;
            var endTimeHour = this.endTimeHour;
            var endTimeMin = this.endTimeMin;
            var dateFromDay = this.dateFromDay;
            var dateFromMonth = this.dateFromMonth;
            var dateFromYear = this.dateFromYear.toString();
            var dateUntilDay = this.dateUntilDay;
            var dateUntilMonth = this.dateUntilMonth;
            var dateUntilYear = this.dateUntilYear.toString();

            fullDate(dateFromDay, dateFromMonth, function (error, dateFromdayString, dateFromMonthString) {
                dateFromDay = dateFromdayString;
                dateFromMonth = dateFromMonthString;
                if (error) {
                    console.log(error);
                }
            });
            fullDate(dateUntilDay, dateUntilMonth, function (error, dateUntilDayString, dateUntilMonthString) {
                dateUntilDay = dateUntilDayString;
                dateUntilMonth = dateUntilMonthString;
                if (error) {
                    console.log(error);
                }
            });


            if ((street !== undefined) &&
                (number !== undefined) &&
                (zipcode !== undefined) &&
                (description !== undefined) &&
                (timestamp !== undefined)) {

                $scope.error = "";

                if (startTimeMin < 60 && startTimeHour < 25) {

                    stringConsistOf2Numbers(startTimeHour, function (error, startTimeHourString) {
                        startTimeHour = startTimeHourString;
                        if (error) {
                            console.log(error);
                        }
                    });
                    stringConsistOf2Numbers(startTimeMin, function (error, startTimeMinString) {
                        startTimeMin = startTimeMinString;
                        if (error) {
                            console.log(error);

                        }
                    });

                    console.log(startTimeHour);
                    console.log(startTimeMin);

                    if (startTimeMin.length === 2 && startTimeHour.length === 2) {
                        console.log("je komt hier terecht");

                        if (endTimeMin < 60 && endTimeHour < 24) {
                            stringConsistOf2Numbers(endTimeHour, function (error, endTimeHourString) {
                                endTimeHour = endTimeHourString;
                                if (error) {
                                    console.log(error);
                                }
                            });
                            stringConsistOf2Numbers(endTimeMin, function (error, endTimeMinString) {
                                endTimeMin = endTimeMinString;
                                if (error) {
                                    console.log(error);

                                }
                            });

                            console.log(endTimeHour);
                            console.log(endTimeMin);

                            if (endTimeMin.toString().length === 2 && endTimeHour.toString().length === 2) {

                                console.log(startTimeHour + ":" + startTimeMin);

                                getKeywordsFromDescription(description, function (error, data) {
                                    description = data;
                                    if (!error) {
                                        console.log(startTimeHour + ":" + startTimeMin);

                                        var url = "http://localhost:3000/api/activities/addactivity";
                                        $http.post(url, {
                                            activityName: activityName,
                                            street: street,
                                            number: number,
                                            zipcode: zipcode,
                                            description: description,
                                            dateFrom: dateFromYear + "-" + dateFromMonth + "-" + dateFromDay + " " + startTimeHour + ":" + startTimeMin,
                                            dateUntil: dateUntilYear + "-" + dateFromMonth + "-" + dateUntilDay + " " + endTimeHour + ":" + endTimeMin,
                                            timestamp: timestamp

                                        }).success(function (data) {
                                            $scope.error = data.error;
                                            $scope.getActivities();
                                            resetForm();

                                            //$location.path(data.redirect);
                                        });

                                    }
                                    else {
                                        console.log(error);
                                    }
                                });
                            }

                            else {
                                $scope.error = "Enddate input is not correct";
                            }
                        }

                        else {
                            $scope.error = "Endtime input is not correct";
                        }

                    }

                    else {
                        $scope.error = 'De startime length is not correct!!!! ';
                    }
                }
                else {
                    $scope.error = "Starttime input is not correct";
                }


            }
            else {
                $scope.error = "ERROR: All fields are required.8888";
            }
        };

        $scope.getDetailActivity = function (currentUser) {
            dbService.getDetailsActivity('activities', $routeParams.activityName).then(function (response) {
                $scope.arrDetailsActivity = response.activity;
                initmap();

                console.log($scope.arrDetailsActivity.matches);
                for (var i = 0; i < $scope.arrDetailsActivity.matches.length; i++) {
                    if ($scope.arrDetailsActivity.matches[i] === currentUser) {
                        $scope.nameButton = "Not interested";
                        $scope.interestedAct = false;
                    }
                }
                return $scope.arrDetailsActivity;


            });
        };

        $scope.interested = function (activityName, interestedUser, createrUser) {
            var url = "";
            var interestedAct = $scope.interestedAct;
            if (interestedAct !== false) {

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
            } else {
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

        function recentFirst(a, b) {
            if (a.timestamp > b.timestamp)
                return -1;
            if (a.timestamp < b.timestamp)
                return 1;
            return 0;
        }

        function popularFirst(arr) {
            var max = arr[0];
            var maxIndex = 0;

            for (var i = 1; i < arr.length; i++) {
                if (arr[i].matches.length > max.matches.length) {
                    maxIndex = i;
                    max = arr[i];
                }
            }

            return maxIndex;
        }

        $scope.showActivitiesOnHomePage = function(){
            $scope.getMostRecentActivities();
            $scope.getMostPopularActivities();
        };

        $scope.getMostRecentActivities = function () {

            dbService.getCollection('activities').then(function (response) {
                var numberOfActivities = 3;
                var arrTemp = response.activitielist;
                var arrAllActivities = [];


                for (var i = 0, l = arrTemp.length; i < l; i++) {
                    if (new Date(arrTemp[i].untilDate).getTime() >= new Date(dateTimeNow).getTime()) {
                        console.log(new Date(arrTemp[i].untilDate));
                        arrAllActivities.push(arrTemp[i]);
                    }
                }

                arrAllActivities.sort(recentFirst);

                var arrMostRecentActivities = [];

                for (var ii = 0; ii < numberOfActivities; ii++) {
                    arrMostRecentActivities.push(arrAllActivities[ii]);
                }

                var matches = [];

                for (var iii = 0; iii < arrMostRecentActivities.length; iii++) {

                    var dummyActivity = new Activity("No name", 8500, "Together", 2, "no description", "2016-01-01 00:01", "2017-12-31 23:59", new Date(), "no username", matches);
                    if (arrMostRecentActivities[iii] === undefined) {
                        arrMostRecentActivities.splice(iii, 1, dummyActivity);
                    }
                }
                $scope.arrMostRecentActivities = arrMostRecentActivities;

            });
        };

        $scope.getMostPopularActivities = function(){

            dbService.getCollection('activities').then(function(response){

                var numberOfActivities = 3;
                var arrTemp = response.activitielist;
                var arrAllActivities = [];

                for (var i = 0, l = arrTemp.length; i < l; i++) {
                    if(new Date(arrTemp[i].untilDate).getTime() >= new Date(dateTimeNow).getTime()) {
                        //console.log(new Date(arrTemp[i].untilDate));
                        arrAllActivities.push(arrTemp[i]);
                    }
                }

                var arrMostPopularActivities = [];

                for(var j = 0; j < numberOfActivities; j++){

                    var indexMostPop = popularFirst(arrAllActivities);
                    arrMostPopularActivities.push(arrAllActivities[indexMostPop]);
                    arrAllActivities.splice(indexMostPop, 1);
                }

                var matches = [];

                for (var iii = 0; iii < arrMostPopularActivities.length; iii++) {

                    var dummyActivity = new Activity("No name", 8500, "Together", 2, "no description", "2016-01-01 00:01", "2017-12-31 23:59", new Date(), "no username", matches);
                    if (arrMostPopularActivities[iii] === undefined) {
                        arrMostPopularActivities.splice(iii, 1, dummyActivity);
                    }
                }

                $scope.arrMostPopularActivities = arrMostPopularActivities;

            });
        };
        $scope.deleteActivity = function(activityname){
            dbService.deleteActivity('activities', activityname).then(function(response){
                $scope.infodeletedActivity = response;
                console.log(response);
                $scope.getActivities();
            });
        };


        function initmap(){
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 8,
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
                    var image = "../../images/marker.png";
                    var marker = new google.maps.Marker({
                        map: resultsMap,
                        position: results[0].geometry.location,
                        icon: image
                    });

                    console.log(marker);

                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }

        function resetForm() {
            var frm = document.getElementsByName('ActivityForm')[0];
            console.log('je komt in de resetform');
            frm.reset();
        }
    };

    angular.module("app").controller("ActivitiesController", ["$scope", "dbService", "$http", "$location", "$routeParams", "fileUpload", ActivitiesController]);


})();