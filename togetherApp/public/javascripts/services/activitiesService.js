/**
 * Created by iman on 5/12/15.
 */
/*(function(){

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

                for (var i = 0; i < data.length; i++) {

                    var d = data[i];

                    var newActivity = new Activity();
                    newActivity.img = d.img;
                    newActivity.name = d.name;
                    newActivity.place = d.place;
                    newActivity.participants = d.participants;
                    newActivity.myEvent = d.myEvent;

                    var text = "";

                    for(var ii=0; ii< d.keywords.length; ii++){
                        if(ii == d.keywords.length-1){
                            text += d.keywords[ii];
                        }
                        else{
                            text += d.keywords[ii];
                            text += ", ";
                        }
                    }

                    newActivity.keywords = text;
                    arrActivities.push(newActivity);
                }

                return arrActivities;

            }

        };

        //public gedeelte
        return{

            getActivities:getActivities

        };

    };

    angular.module("app").factory("activitiesService", [activitiesService]);
    //                                  ^ deze naam bepaalt welke naam je nodig hebt in je controller als verwijzing!

})();*/