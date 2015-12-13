/**
 * Created by iman on 5/12/15.
 */
(function(){

    "use strict";

    var activitiesService = function () {

        var getActivities = function () {

            var localUrl = "http://localhost:3000/data/activities.json";
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", localUrl, false);
            xmlHttp.send(null);

            if(xmlHttp.status == 200) {

                var data = JSON.parse(xmlHttp.responseText);

                //console.log(data);

                var arrActivities = [];

                for(var i=0; i < data.length; i++){

                    var activity = {
                        "img": data[i].img,
                        "name": data[i].name,
                        "place": data[i].place,
                        "keywords": data[i].keywords,
                        "participants": data[i].participants,
                        "myEvent": data[i].myEvent
                    };

                    arrActivities.push(activity);
                }

                //console.log(arrActivities);

                return arrActivities;

                /*
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

*/
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

            getActivities:getActivities

        };

    };

    angular.module("app").factory("activitiesService", [activitiesService]);
    //                                  ^ deze naam bepaalt welke naam je nodig hebt in je controller als verwijzing!

})();