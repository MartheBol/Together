/**
 * Created by Nikita on 7/01/2016.
 */


(function () {

    "use strict";

    var chatService = function ($rootScope) {
        var socket = io.connect(window.location.host);

        var on = function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                })
            });
        };

        var emit = function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                })
            });
        };


        return {
            on: on,
            emit: emit,
            socket: socket
        };
    };

    angular.module("app").factory("chatService", ["$rootScope", chatService]);

})();