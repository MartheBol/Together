/**
 * Created by Nikita on 7/01/2016.
 */
(function () {

    "use strict";

    var ChatController = function($scope, $rootScope, $routeParams, dbService, $http) {

        console.log($rootScope.currentUser.username);
        console.log($rootScope.contactedUser.username);
    };
    angular.module("app").controller("ChatController", ["$scope", "$rootScope", "$routeParams", "dbService","$http", ChatController]);

})();