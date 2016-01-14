/**
 * Created by iman on 5/12/15.
 */

(function () {

    "use strict";
    var dateTimeNow = new Date().toISOString().substring(0, 10) + " " + new Date().toISOString().substring(11, 16);

    var ActivitiesController = function ($scope, dbService, $http, $location, $routeParams, $route) {
        $scope.interestedAct = true;
        $scope.nameButton = "Interested";

        var clicksOnBtn = 1;

        $scope.filter = {showFilter:true};

        $scope.showTableActivities = function(){
            $scope.filter = {showFilter:true};
            clicksOnBtn++;

            if(clicksOnBtn > 1){
                $scope.filter = {showFilter:false};
                clicksOnBtn = 0;
            }
        };

        $scope.hideTableActivities = function(){
            clicksOnBtn = 0;
            $scope.filter = {showFilter:false};
        };

        $scope.getActivities = function () {
            dbService.getCollection('activities').then(function (response) {

                var arrTemp = response.activitielist;
                var arrActs = [];


                for (var i = arrTemp.length;i--;){
                    if (new Date(arrTemp[i].untilDate).getTime() >= new Date(dateTimeNow).getTime()) {
                        if(arrTemp[i].deleted === false){
                            $scope.deleted = false;
                            arrActs.push(arrTemp[i]);

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

                for (var i = words.length; i--;) {

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

        function isRequiredField(element) {
            if (element) {
                if(element.value === '' || element === undefined) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }

        //http://stackoverflow.com/questions/5812220/how-to-validate-a-date
        function isValidDate(d, m, y) {
            // Assume not leap year by default (note zero index for Jan)
            var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

            // If evenly divisible by 4 and not evenly divisible by 100,
            // or is evenly divisible by 400, then a leap year
            if ( (!(y % 4) && y % 100) || !(y % 400)) {
                daysInMonth[1] = 29;
            }
            return d <= daysInMonth[--m];
        }

        $scope.addActivity = function () {
            var timestamp = new Date().getTime();


            /*
            fullDate(this.dateFromDay, this.dateFromMonth, function (error, dateFromdayString, dateFromMonthString) {
                this.dateFromDay = dateFromdayString;
                this.dateFromMonth = dateFromMonthString;
                if (error) {
                    console.log(error);
                }
            });
            fullDate(this.dateUntilDay, this.dateUntilMonth, function (error, dateUntilDayString, dateUntilMonthString) {
                this.dateUntilDay = dateUntilDayString;
                this.dateUntilMonth = dateUntilMonthString;
                if (error) {
                    console.log(error);
                }
            });
            */

            if (isRequiredField(this.activityName) &&
                isRequiredField(this.street) &&
                isRequiredField(this.number) &&
                isRequiredField(this.zipcode) &&
                isRequiredField(this.comment)){

                $scope.error = "";

                var activityName = this.activityName;
                var street = this.street;
                var number = this.number;
                var zipcode = this.zipcode;
                var description = this.comment;
                var startTimeHour = this.startTimeHour;
                var startTimeMin = this.startTimeMin;
                var endTimeHour = this.endTimeHour;
                var endTimeMin = this.endTimeMin;
                var dateFromDay = "";
                var dateFromMonth = "";
                var dateFromYear = "";
                var dateUntilDay = "";
                var dateUntilMonth = "";
                var dateUntilYear = "";

                if(isValidDate(this.dateFromDay, this.dateFromMonth, this.dateFromYear) &&
                    isValidDate(this.dateUntilDay, this.dateUntilMonth, this.dateUntilYear )){

                    $scope.error = "";

                    dateFromDay = this.dateFromDay;
                    dateFromMonth = this.dateFromMonth;
                    dateFromYear = this.dateFromYear.toString();
                    dateUntilDay = this.dateUntilDay;
                    dateUntilMonth = this.dateUntilMonth;
                    dateUntilYear = this.dateUntilYear.toString();

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


                        if (startTimeMin.length === 2 && startTimeHour.length === 2) {

                            if (endTimeMin < 60 && endTimeHour < 25) {
                                stringConsistOf2Numbers(endTimeHour, function (error, endTimeHourString) {
                                    endTimeHour = endTimeHourString;
                                    if (error) {
                                        $scope.error = error;
                                    }
                                });
                                stringConsistOf2Numbers(endTimeMin, function (error, endTimeMinString) {
                                    endTimeMin = endTimeMinString;
                                    if (error) {
                                        $scope.error = error;

                                    }
                                });


                                if (endTimeMin.toString().length === 2 && endTimeHour.toString().length === 2) {

                                    if(new Date(dateFromYear + "-" + dateFromMonth + "-" + dateFromDay + " " + startTimeHour + ":" + startTimeMin).getTime() <= new Date(dateUntilYear + "-" + dateUntilMonth + "-" + dateUntilDay + " " + endTimeHour + ":" + endTimeMin).getTime()){

                                        if(new Date(dateUntilYear + "-" + dateUntilMonth + "-" + dateUntilDay + " " + endTimeHour + ":" + endTimeMin).getTime() > new Date().getTime()){

                                            getKeywordsFromDescription(description, function (error, data) {
                                                description = data;

                                                if (!error) {
                                                    var url = "/api/activities/addactivity";
                                                    $http.post(url, {
                                                        activityName: activityName,
                                                        street: street,
                                                        number: number,
                                                        zipcode: zipcode,
                                                        description: description,
                                                        dateFrom: dateFromYear + "-" + dateFromMonth + "-" + dateFromDay + " " + startTimeHour + ":" + startTimeMin,
                                                        dateUntil: dateUntilYear + "-" + dateUntilMonth + "-" + dateUntilDay + " " + endTimeHour + ":" + endTimeMin,
                                                        timestamp: timestamp

                                                    }).success(function (data) {
                                                        $scope.error = data.error;
                                                        $scope.getActivities();
                                                        resetForm();

                                                        //$location.path(data.redirect);
                                                    });

                                                }

                                                else {
                                                    $scope.error = error;
                                                }
                                            });
                                        }

                                        else{
                                            $scope.error ="Enddate can't be before today";
                                        }
                                    }
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
                            $scope.error = 'De startime length is not correct';
                        }
                    }
                    else {
                        $scope.error = "Starttime input is not correct";
                    }
                }
                else{
                    $scope.error = "Please enter valid dates";
                }

            }
            else {
                $scope.error = "All fields are required when adding a new activity.";
            }
        };


        $scope.getDetailActivity = function (currentUser) {
            dbService.getDetailsActivity('activities', $routeParams.activityName).then(function (response) {
                $scope.arrDetailsActivity = response.activity;
                initmap();


                for (var i= $scope.arrDetailsActivity.matches.length; i--;) {
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

                url = "/api/activities/interested";
                $http.post(url, {
                    activityName: activityName,
                    interestedUser: interestedUser,
                    createrUser: createrUser
                }).success(function (data) {

                    $scope.interestedAct = false;
                    $scope.nameButton = "Not interested";
                    $scope.error = data.error;
                });
            } else {

                url = "/api/activities/deleteinterested";
                $http.post(url, {
                    activityName: activityName,
                    interestedUser: interestedUser,
                    createrUser: createrUser
                }).success(function (data) {
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


                for (var i = 0; i < arrTemp.length;i++) {
                    if (new Date(arrTemp[i].untilDate).getTime() >= new Date(dateTimeNow).getTime()) {

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

                for (var i = arrTemp.length; i--;) {
                    if(new Date(arrTemp[i].untilDate).getTime() >= new Date(dateTimeNow).getTime()) {
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

                for (var iii =  arrMostPopularActivities.length; iii--;) {

                    var dummyActivity = new Activity("No name", 8500, "Together", 2, "no description", "2016-01-01 00:01", "2017-12-31 23:59", new Date(), "no username", matches);
                    if (arrMostPopularActivities[iii] === undefined) {
                        arrMostPopularActivities.splice(iii, 1, dummyActivity);
                    }
                }

                $scope.arrMostPopularActivities = arrMostPopularActivities;

            });
        };

        $scope.deleteActivity = function(activityId){
            dbService.deleteActivity('activities', activityId).then(function(response){
                $scope.infodeletedActivity = response;
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



                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }

        function resetForm() {
            var frm = document.getElementsByName('ActivityForm')[0];
            frm.reset();
        }
    };

    angular.module("app").controller("ActivitiesController", ["$scope", "dbService", "$http", "$location", "$routeParams", "fileUpload", ActivitiesController]);


})();