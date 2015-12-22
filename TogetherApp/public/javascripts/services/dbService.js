/**
 * Created by iman on 15/12/15.
 */

(function(){

    "use strict";

    var dbService = function ($http) {

        var getCollection = function (collection) {


            var url = "http://localhost:3000/api/" + collection;
            return $http.get(url).then(function(response){

                //console.log(response);
                return response.data;

            });

        };

        var getByID = function (collection, id) {


            var url = "http://localhost:3000/api/" + collection + "/" + id;
            return $http.get(url).then(function(response){

                //console.log(response);
                return response.data;

            });

        };

        var getDetailsUser = function (collection, username) {


            var url = "http://localhost:3000/api/" + collection + "/userdetails/" + username;
            return $http.get(url).then(function(response){

                //console.log(response);
                return response.data;

            });

        };

        var getItem = function(item){

            var url = "http://localhost:3000/api/" + item;
            return $http.get('/user').then(function(response){

                return response.data;

            });

        };

        //public gedeelte
        return{

            getCollection:getCollection,
            getByID:getByID,
            getItem:getItem,
            getDetailsUser: getDetailsUser

        };

    };

    angular.module("app").factory("dbService", ["$http", dbService]);
    //                                  ^ deze naam bepaalt welke naam je nodig hebt in je controller als verwijzing!

})();