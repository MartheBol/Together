/**
 * Created by iman on 28/11/15.
 */
(function(){

    "use strict";

    var filterService = function () {

        var getNoiseWords = function () {

            var localUrl = "http://localhost:63342/filterService/src/data/noisewords.json";
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", localUrl, false);
            xmlHttp.send(null);

            if(xmlHttp.status == 200){

                var data = JSON.parse(xmlHttp.responseText);
                var noisewords = [];

                for(var i = 0, l = data.noisewords.length; i < l; i++){

                    var word = data.noisewords[i];

                    noisewords.push(word);
                }


                console.log("Noise words: " +noisewords);
                return noisewords;

            }


        };

        //public gedeelte
        return{

            getNoiseWords:getNoiseWords

        };

    };

    angular.module("app").factory("filterService", [filterService]);
    //                                  ^ deze naam bepaalt welke naam je nodig hebt in je controller als verwijzing!

})();