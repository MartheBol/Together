/**
 * Created by iman on 17/11/15.
 */

(function(){

    "use strict";

    var FlickrController = function($scope, $http){


        $scope.searchText = "australian shephard";
        $scope.images;
        $scope.searchImages = function () {
            $scope.images = null;
            var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ca53bc81589d3ad195743451a4d28869&tags=" + $scope.searchText + "&format=json&nojsoncallback=1";
            $http.get(url).then(onImagesDownloaded, onImagesDownloadError);
        };
        $scope.sortProperty = "title";
        $scope.filterQuery = "";

        $scope.checkAndStyleTitle = function (img) {

            if(!img.title || img.title === ""){
                return "flickrNoTitle";
            }

        };

        $scope.filterImages = function (img) {
            if($scope.filterQuery === ""){
                return true;
            }

            if(img.title.toLowerCase().indexOf($scope.filterQuery.toLowerCase()) >= 0){
                return true;
            }

            return false;
        };

        var onImagesDownloaded = function (response) {
            $scope.images = [];

            angular.forEach(response.data.photos.photo, function (photo) {
                var newFI = new FlickrImage(
                    photo.id,
                    photo.owner,
                    photo.secret,
                    photo.server,
                    photo.farm,
                    photo.title
                );

                $scope.images.push(newFI);

            });
        };

        var onImagesDownloadError = function (err) {

        };
    };

    angular.module("app").controller("FlickrController", ["$scope", "$http", FlickrController]);

})();