/**
 * Created by iman on 28/11/15.
 */
(function () {
    "use strict";

    //NIEUWE VERSIE
    //$scope = een service om te communiceren met de view
    //filterService = een service om data op te halen

    var FilterController = function($scope, filterService){

        $scope.searchKeywords = function () {

            function isInArray(value, array) {
                return array.indexOf(value);
            }

            var string = $scope.searchText;
            //console.log(string);

            if(string == null || string == ""){

                alert("Gelieve een zoekopdracht in te voeren.");

            }

            else {

                //TO-DO: Hoe moet je puntjes, komma's etc. verwijderen uit de zin (in 1 keer) ???

                //TO-DO: Hoe moet je enters verwijderen uit je tekst?

                string = string.replaceAll('.','');
                string = string.replaceAll(',','');
                string = string.replaceAll('?','');
                string = string.replaceAll('!','');
                string = string.replaceAll('"','');
                string = string.replaceAll("'",'');

                var words = string.split(" ");

                var noiseWords = filterService.getNoiseWords();
                var keyWords = [];

                for (var i = 0; i < words.length; i++) {

                    if (isInArray(words[i].toLowerCase(), noiseWords) == -1) {

                        keyWords.push(words[i]);
                        console.log(keyWords);

                        $scope.correctWords = keyWords;

                        //Dit dient om dubbele woorden uit de array te halen
                        //1 probleem: de zin wordt dus helemaal door elkaar geschud en dan klopt niet alles meer na elkaar
                        //TO-DO: hoe moeten we dit gaan oplossen

                        /*
                        results.push(words[i]);
                        var sorted_arr = results.sort();
                        var keywords = [];
                        for (var j = 0; j < sorted_arr.length - 1; j++) {

                            if (sorted_arr[j + 1] != sorted_arr[j]) {

                                keywords.push(sorted_arr[j]);
                                $scope.correctWords = keywords;

                            }
                        }

                        */

                    }
                }
            }

        };
    };

    String.prototype.replaceAll = function( token, newToken, ignoreCase ) {
        var _token;
        var str = this + "";
        var i = -1;

        if ( typeof token === "string" ) {

            if ( ignoreCase ) {

                _token = token.toLowerCase();

                while( (
                    i = str.toLowerCase().indexOf(
                        token, i >= 0 ? i + newToken.length : 0
                    ) ) !== -1
                    ) {
                    str = str.substring( 0, i ) +
                        newToken +
                        str.substring( i + token.length );
                }

            } else {
                return this.split( token ).join( newToken );
            }

        }
        return str;
    };

    angular.module("app").controller("FilterController", ["$scope", "filterService", FilterController]);

})();