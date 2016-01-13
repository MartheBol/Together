/**
 * Created by Marthe on 15/12/15.
 */
(function(){
    "use strict";
    var selectedInterest = [];

    var loginController = function ($scope, $rootScope, $http, $location, chatService) {

        $scope.login = function() {
            $http
                .post('/login', {
                    username: this.username,
                    password: this.password
                })
                .success(function(data) {

                    $rootScope.user = data.user;
                    $scope.error = data.error;
                    chatService.emit("newUser",$rootScope.user.username);

                    if($rootScope.user!== undefined){
                        localStorage.setItem("username", $rootScope.user.username);
                    }
                    $location.path(data.redirect);
                });
        };

        $scope.interests = ['Music', 'Traveling'];
        $scope.lst = [];
        $scope.change = function(){
            $scope.lst.push('2');

        };
        $scope.stateChanged = function (qId) {
            if(selectedInterest.indexOf(qId) !== -1) {

                var index = selectedInterest.indexOf(qId);
                if (index > -1) {
                    selectedInterest.splice(index, 1);
                }
            }else{
                selectedInterest.push(qId);

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

        //http://stackoverflow.com/questions/5812220/how-to-validate-a-date
        function isValidDate(d, m, y) {
            // Assume not leap year by default (note zero index for Jan)
            var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

            // If evenly divisible by 4 and not evenly divisible by 100,
            // or is evenly divisible by 400, then a leap year
            if( (y%100 && !y%4) || (!y%400)){
                daysInMonth[1] = 29;
            }

            /*
            if ( ((!(y % 4)) && y % 100) || (!(y % 400))) {
                daysInMonth[1] = 29;
            }
            */
            return d <= daysInMonth[--m];
        }

        function isRequiredField(element) {
            if (element) {
                if (element.value === '' || element === undefined) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }

        function isValidEmail(email) {
            var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return pattern.test(email);
        }

        function isValidZipcode(zipcode) {
            var pattern = /^[1-9]{1}[0-9]{3}$/;
            return pattern.test(zipcode);
        }

        $scope.register = function() {

            if(isRequiredField(this.firstname) &&
                isRequiredField(this.lastname) &&
                isRequiredField(this.password) &&
                isRequiredField(this.sex) &&
                isRequiredField(this.biography)){

                $scope.error = "";
                if(isValidDate(this.birthdateDay, this.birthdateMonth, this.birthdateYear)){

                    var birthdate = this.birthdateYear + "-" + this.birthdateMonth + "-" + this.birthdateDay;

                    $scope.error = "";
                    if(isValidZipcode(this.zipcode)){

                        $scope.error = "";
                        if(isValidEmail(this.username)){

                            $scope.error = "";
                            $http.post('/register', {
                                firstname: this.firstname,
                                lastname : this.lastname,
                                //email : this.email,
                                username : this.username,
                                password : this.password,
                                zipcode: this.zipcode,
                                //birthdate : this.birthdate,
                                birthdate: birthdate,
                                sex : this.sex,
                                biography : this.biography,
                                geolocation:$scope.geolocation,
                                interests:selectedInterest

                            }).success(function (data) {
                                $scope.error = data.error;
                                $location.path(data.redirect);
                            });

                        }
                        else {

                            $scope.error = "Please enter a valid email as username.";

                        }
                    }
                    else{
                        $scope.error = "Please enter a valid Belgian postcode.";
                    }
                }
                else{

                    $scope.error = "Please enter a valid date as birthdate.";
                }
            }
            else{
                $scope.error = "All fields are required when making a new account.";
            }
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
            if(qId!==  " ") {
                if (selectedInterest.indexOf(qId) !== -1) {
                    var index = selectedInterest.indexOf(qId);
                    if (index > -1) {
                        selectedInterest.splice(index, 1);

                    }
                } else {
                    selectedInterest.push(qId);

                }
            }
        };
        $scope.stateChanged = function (qId) {

        };

    };

    angular.module("app")
        .controller("loginController", ["$scope", "$rootScope", "$http", "$location","chatService", loginController])
        .controller("signupController", ["$scope", signupController])
        .controller("editableCheckboxController", ["$scope", editableCheckboxController]);
})();