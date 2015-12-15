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

    /*app.controller('AddCheckboxCtrl', ['$scope', function AddCheckboxCtrl($scope) {
        // interests
        //$scope.interests = ['Music', 'Cultural', 'Photography', 'Family ( & kids )'];
        // selected interests

        $scope.interests =[]
        $scope.selection =[]

        // toggle selection for a given fruit by name
        $scope.addCheckbox = function addCheckbox(interest){
            var elem= document.getElementById("checkboxAdd")
            var txtAddNewCheckbox = angular.element(elem);


            $scope.interests.push(interest);
            for (var i = 0; i < $scope.interests.length; i++) {
                var newI = $scope.interests[i]
                $scope.selection.push(newI);

            }




            //txtAddNewCheckbox.isDisplayed().toBeTrue()

        }


    }]);*/

    app.controller('AddCheckboxCtrl',['$scope', function AddCheckboxCtrl($scope){
        $scope.selection =[]

        $scope.addCheckbox = function(interest) {
            var newItem = document.getElementById("newItem");
            $scope.newInterest = $scope.interest.name

        }
        $scope.makeCheckbox = function(interest){

            $scope.newInterest = $scope.interest.name
            $scope.selection.push($scope.interest.name);
            console.log($scope.newInterest)
        }




    }]);

    app.directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });

})();