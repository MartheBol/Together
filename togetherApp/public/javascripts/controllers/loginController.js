/**
 * Created by Marthe on 15/12/15.
 */
(function(){
    "use strict";
    var selectedInterest = [];

    var loginController = function ($scope, $http, $location) {

        $scope.login = function() {
            $http
                .post('/login', {
                    username: this.username,
                    password: this.password
                })
                .success(function(data) {
                    console.log(data);
                    $scope.error = data.error;
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
        .controller("loginController", ["$scope", "$http", "$location", loginController])
        .controller("signupController", ["$scope", signupController])
        .controller("editableCheckboxController", ["$scope", editableCheckboxController]);;
})();