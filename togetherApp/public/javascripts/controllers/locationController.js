/**
 * Created by Marthe on 30/12/15.
 */


(function(){
    "use strict";



var locationController = function($scope) {

    console.log('TESTEST');

    $scope.initmap = function() {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 8,
            center: {lat: 50.8194894, lng: 3.2577076}
        });
        var geocoder = new google.maps.Geocoder();

        geocodeAddress(geocoder, map);

    };

    function geocodeAddress(geocoder, resultsMap) {
        var address = "Graaf Karel de Goedelaan 5, Kortrijk"; //hier address uit db instoppen

        geocoder.geocode({'address': address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                resultsMap.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location
                });

                console.log(marker);

            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
};

    angular.module("app").controller("locationController", ["$scope", locationController]);
})();