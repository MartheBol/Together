(function () {
    "use strict";

    var indexController = function ($scope) {
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
        }

    };
    angular.module("app")
        .controller("indexController", ["$scope", indexController])
        .controller("editableCheckboxController", ["$scope", editableCheckboxController]);


})();