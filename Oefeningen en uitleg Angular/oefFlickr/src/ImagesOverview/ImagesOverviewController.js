/**
 * Created by iman on 17/11/15.
 */

(function(){

    "use strict";

    var FlickrController = function($scope, $http){

        //view is nog niet gemaakt, maar er moeten wel dingen aangemaakt worden die dan zullen weergegeven worden in de view

        //scope variabelen
        //nmct = is een bestaande defaultwaarde
        $scope.searchText = "australian shephard";
        $scope.images;
        $scope.searchImages = function () {
            $scope.images = null;
            //url = private
            //private variabele
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

            //geeft true terug als je de img wil zien, en vice versa
            if($scope.filterQuery === ""){
                return true; //ik wil gwn alle imgs laten zien
            }

            //beginswith:
            //if(i.title.toLowerCase().indexOf($scope.filterQuery.toLowerCase()) === 0)

            //>= 0 ; getypte woord is een deel van de titel
            if(img.title.toLowerCase().indexOf($scope.filterQuery.toLowerCase()) >= 0){
                return true;
            }

            return false;
        };



        //$http heeft 4 methodes, get post put delete: heeft dus een promise object (ofwel lukt het ofwel niet)

        //-> 2 callbacks nodig
        //wordt niet meer bij de $scope toegevoegd, moet enkel hier worden uitgevoerd, rechtstreeks in de functie
        // dit is dus asynchroon
        var onImagesDownloaded = function (response) {
            $scope.images = [];
            //forEach(array, voor elke photo functie uitvoeren, nl nieuwe flickrimg aanmaken
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

        //deze functie behoort bij de $scope
        /*
        var searchImages = function () {
            $http.get(url).then(onImagesDownloaded, onImagesDownloadError);
        }
        */
    };

    //service is een object die iets voor je doet, maar zich richt op slechts 1 taak (bv "$scope", "$http" )
    angular.module("app").controller("FlickrController", ["$scope", "$http", FlickrController]);

})();