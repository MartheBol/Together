/**
 * Created by iman on 15/12/15.
 */

(function(){

    "use strict";

    var dbService = function ($http) {

        var getCollection = function (collection) {


            var url = "http://localhost:3000/api/" + collection;
            return $http.get(url).then(function(response){

                console.log(response);
                return response.data;

            });

        };

        //public gedeelte
        return{

            getCollection:getCollection

        };

    };

    angular.module("app").factory("dbService", ["$http", dbService]);
    //                                  ^ deze naam bepaalt welke naam je nodig hebt in je controller als verwijzing!

})();