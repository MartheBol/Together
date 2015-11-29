/**
 * Created by Nikita on 28/11/2015.
 */

(function () {
    "use strict";

    var app = angular.module("app", ["ngRoute"]);


    app.controller('SimpleArrayCtrl', ['$scope', function SimpleArrayCtrl($scope) {
        // interests
        $scope.interests = ['Music', 'Cultural', 'Photography', 'Family ( & kids )'];
        // selected interests
        //$scope.selection = ['Cultural', 'Photography'];

        // toggle selection for a given fruit by name
        $scope.toggleSelection = function toggleSelection(interest) {
            var idx = $scope.selection.indexOf(interest);

            // is currently selected
            if (idx > -1) {
                $scope.selection.splice(idx, 1);
            }

            // is newly selected
            else {
                $scope.selection.push(interest);
            }
        };
    }]);

    app.controller('AddCheckboxCtrl', ['$scope', function AddCheckboxCtrl($scope) {
        // interests
        //$scope.interests = ['Music', 'Cultural', 'Photography', 'Family ( & kids )'];
        // selected interests


        // toggle selection for a given fruit by name
        $scope.addCheckbox = function addCheckbox(interest){
            var elem= document.getElementById("checkboxAdd")
            var txtAddNewCheckbox = angular.element(elem);

            var NewInterest = interest;
            $scope.interests = [NewInterest];
            $scope.selection = [NewInterest];
            txtAddNewCheckbox.isDisplayed().toBeFalsy();

        }


    }]);

})();