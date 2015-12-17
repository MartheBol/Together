(function () {
    "use strict";

    var app = angular.module("app", []);
    app.directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });

    app.directive('editableCheckbox', function () {
        return {
            restrict: 'E',
            templateUrl: 'editablecheckbox.html'
        }
    });

})();