/**
 * Created by Marthe on 24/11/15.
 */

    "use strict";

var filterService = function () {

    var str = document.getElementById("text").value;
    var words = str.split(" ");
    var badWords = ["ik", "ben", "die", "iemand", "op", "zoek", "is", "naar", "een", "om", "naar", "te", "test", "leuke", "het", "wil", "leuk", "persoon", "in"];
    var keyWords = [];

    for (var i = 0; i < words.length; i++) {
        console.log(words[i]);
        if (badWords.indexOf(words[i].toLowerCase()) == -1) {

            //keywords opvullen
            keyWords.push(words[i]);
            console.log(keyWords);

            //Om visueel te zien!
            var node = document.createElement("LI");
            var textnode = document.createTextNode(words[i]);
            node.appendChild(textnode);
            document.getElementById("correctWords").appendChild(node);


        }

    }

    return {

    };
};

    angular.module("app").factory("filterService", filterService);





