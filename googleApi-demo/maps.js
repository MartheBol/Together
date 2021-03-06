/**
 * Created by Marthe on 29/12/15.
 */
// The following example creates a marker in Stockholm, Sweden using a DROP
// animation. Clicking on the marker will toggle the animation between a BOUNCE
// animation and no animation.

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: 50.8194894, lng: 3.2577076}
    });
    var geocoder = new google.maps.Geocoder();

    geocodeAddress(geocoder, map);

}

function geocodeAddress(geocoder, resultsMap) {
    var address = "Graaf Karel de Goedelaan 5, Kortrijk"; //hier address uit db instoppen

    geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
};
