/**
 * Created by Marthe on 15/12/15.
 */
(function(){
    "use strict";
    var selectedInterest = [];

    var loginController = function ($scope, $rootScope, $http, $location) {

        $scope.login = function() {
            $http
                .post('/login', {
                    username: this.username,
                    password: this.password
                })
                .success(function(data) {
                    console.log(data);
                    $rootScope.user = data.user;
                    $scope.error = data.error;
                    if($rootScope.user!== undefined){
                        localStorage.setItem("username", $rootScope.user.username);
                    }
                    $location.path(data.redirect);
                });
        };

        $scope.interests = ['Jazz', 'Hiphop', 'New wave', 'Traveling','Party'];
        $scope.lst = [];
        $scope.change = function(){
            $scope.lst.push('2');
            console.log($scope.lst);
        };
        $scope.stateChanged = function (qId) {
            //if(!$scope.interests[qId]){ //If it is checked
            if(selectedInterest.indexOf(qId) !== -1) {
                //console.log('artNr already exists! DELETE');
                var index = selectedInterest.indexOf(qId);
                if (index > -1) {
                    selectedInterest.splice(index, 1);
                }
            }else{
                selectedInterest.push(qId);
                console.log(selectedInterest);
            }
        };
        $scope.geolocation = "";
        $scope.getLocation = function(){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {maximumAge:600000});
            }
            else {
                $scope.error = "Geolocation is not supported by this browser.";
            }
            function successCallback(position) {
                // By using the 'maximumAge' option above, the position
                // object is guaranteed to be at most 10 minutes old.
                $scope.geolocation =  {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                console.log($scope.geolocation);
            }

            function errorCallback(error) {
                // Update a div element with error.message.
                $scope.geolocation = null;
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        $scope.error = "User denied the request for Geolocation.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        $scope.error = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        $scope.error = "The request to get user location timed out.";
                        break;
                    case error.UNKNOWN_ERROR:
                        $scope.error = "An unknown error occurred.";
                        break;
                }

            }
        };

        $scope.register = function() {
            console.log("REGISTER");




            $http.post('/register', {
                firstname: this.firstname,
                lastname : this.lastname,
                //email : this.email,*/
                username : this.username,
                password : this.password,
                zipcode: this.zipcode,
                birthdate : this.birthdate,
                sex : this.sex,
                biography : this.biography,
                geolocation:$scope.geolocation,
                interests:selectedInterest

            }).success(function (data) {
                $scope.error = data.error;
                $location.path(data.redirect);
            });

        };
    };

    var signupController = function ($scope) {
        $scope.categories = [''];
        $scope.newCategory = "";
        $scope.saveCategory = function () {

        };

    };

    var editableCheckboxController = function ($scope) {
        $scope.category = "";
        $scope.showLabel = false;
        $scope.showTextbox = true;
        $scope.saveCategory = function () {
            if ($scope.category) {
                $scope.showLabel = true;
                $scope.showTextbox = false;
            }
            else {
                $scope.showLabel = false;
                $scope.showTextbox = true;
            }
        };
        $scope.edit = function () {
            $scope.showLabel = false;
            $scope.showTextbox = true;
        };
        $scope.isChecked = function(qId){
            console.log(qId);
            if(qId!==  " ") {
                if (selectedInterest.indexOf(qId) !== -1) {
                    var index = selectedInterest.indexOf(qId);
                    if (index > -1) {
                        selectedInterest.splice(index, 1);
                        console.log(selectedInterest);
                    }
                } else {
                    selectedInterest.push(qId);
                    console.log(selectedInterest);
                }
            }
        };
        $scope.stateChanged = function (qId) {

        };

    };

    angular.module("app")
        .controller("loginController", ["$scope", "$rootScope", "$http", "$location", loginController])
        .controller("signupController", ["$scope", signupController])
        .controller("editableCheckboxController", ["$scope", editableCheckboxController]);
})();