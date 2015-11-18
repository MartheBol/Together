/**
 * Created by iman on 17/11/15.
 */

//suite maken per eigenschap
describe("Images Overview Controller", function () {

    /*
    * MVC pattern:
    *
    * 1. Angular app simuleren met een foreach
    *
    * */

    //neem altijd dezelfde naam voor de app, bv 'app'
    beforeEach(module('app'));

    //als je een angularcontroller gaan maken, maak dit duidelijk door er een herkenbaar teken voor te zetten
    //  hier dan bv een $
    var $controller;

    //gewone functie die gebruik maakt van dependancy injection: via de constructor iets gaan 'injecteren' zodanig dat
    //  de code gebruikt kan worden
    //zolang je het niet nodig hebt, wordt het niet geladen
    //inject komt van de angular-mocks.js
    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    //specifieke testen
    //in de controller een link naar de view
    //en de images
    describe('Images properties', function () {
       it("should contain an images property", function(){
           //leeg object aanmaken
           var $scope = {};
           //var onze eigen variabele = wat angular heeft 'aangemaakt'
           var controller = $controller('ImagesOverviewController', {$scope: $scope});
           //we gaan naar de scope en we roepen de methode searchImages() op
           $scope.searchImages();
           //wat verwacht je in de scope
           expect($scope.images).toBeDefined();
           expect($scope.images.length).toBeGreaterThan(0);
       });
    });

});