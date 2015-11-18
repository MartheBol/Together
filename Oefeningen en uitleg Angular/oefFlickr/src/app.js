/**
 * Created by iman on 17/11/15.
 */
(function () {

    "use strict";

    //we maken een applicatie aan en steken dit in app zelf
    var app = angular.module("app", []);

    //laten weten dat er een directive bestaat
    app.directive("flickrimage", function () {
        //object teruggeven
        return {
            restrict:"E",
            templateUrl: "directives/flickrimage.html"
        };
    })


})();