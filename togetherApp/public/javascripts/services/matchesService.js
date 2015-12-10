/**
 * Created by iman on 5/12/15.
 */
(function(){

    "use strict";

    var matchesService = function () {

        var getMatches = function (nameUser) {

            var variabelURL = "together";
            var localUrl = "http://localhost:3000/data/matches.json";
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", localUrl, false);
            xmlHttp.send(null);

            if(xmlHttp.status == 200) {

                var data = JSON.parse(xmlHttp.responseText);
                var arr = [];
                var arrMatches = [];
                var arrMatchUsers = [];
                var arrMatchInterests = [];

                for(var i=0; i < data.length; i++){

                    var obj = {
                        "user": data[i].user,
                        "matches":data[i].matches
                    };

                    arr.push(obj);

                }

                for(var ii = 0; ii<arr.length; ii++){

                    var index = arr[ii].user.indexOf(nameUser);
                    if(index === 0){
                        arrMatches.push(arr[ii].matches);
                    }
                    //console.log("Index: "+index);
                }

                //console.log(arr);
                //console.log(arrMatches[0]);


                var arrMatchesByUser = arrMatches[0];
                //console.log("Aantal matches: " + arrMatchesByUser.length);

                return arrMatchesByUser;

                /*
                for(var iii = 0; iii<arrMatches[0].length; iii++){

                    var matchUser = arrMatches[0][iii].user;
                    var matchInterests = arrMatches[0][iii].interests;

                    arrMatchUsers.push(matchUser);
                    arrMatchInterests.push(matchInterests);

                    //console.log(matchUser);
                    //console.log(matchInterests);
                }

                console.log(arrMatchUsers);
                console.log(arrMatchInterests);
                */

            }



        };

        //public gedeelte
        return{

            getMatches:getMatches,

        };

    };

    angular.module("app").factory("matchesService", [matchesService]);
    //                                  ^ deze naam bepaalt welke naam je nodig hebt in je controller als verwijzing!

})();