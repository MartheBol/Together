/*
 * 
 * 
 * Module : Static server
 * 
 */

var staticServer = (function () {
    "use strict";
    //variabelen en externe of node modules   
    var http = require("http"),
        fs = require("fs"),
        url = require("url");
    
    //private functies
    /*-----  helper file        --------*/  
    /*var getFile = function (localPath, mimeType, res) {
        fs.readFile(localPath, null , function (err, contents) {
            if (!err) {
                res.writeHead(200, {
                    'Content-Type': mimeType ,
                    'Cache-Control': 'no-cache, no -store, must -revalidate',
                    'Pragma': 'no - cache',
                    'Expires': 0
                });
                res.write(contents);
            } else {
                if (err == "ENOENT") {
                    res.writeHead(404);
                    res.write("<html><head></head><body>File <b>" + localPath + "</b> niet gevonden.</body></html>");
                } else {
                    res.writeHead(500);
                    res.write("<html><head></head><body>Server fout.</body><html>");
                }
            }
            res.end();
        });
    };*/
    
    var httpListen = function (router, handlers, httpPort , socketHandlers) {
        var httpServer = http.createServer(function (req, res) {
         
            //de router haalt ( via app.js) de juiste requesthandler op.
            router.getRoute(handlers, req , res, function (err, contents , mimeType) {
                
                if (err) {
                    if (err === "ENOENT") {
                        res.writeHead(404);
                        res.write("<html><head></head><body>File <b>" + uri.pathname + "</b> niet gevonden.</body></html>");
                    } else {
                        res.writeHead(500);
                        res.write("<html><head></head><body>Server fout: " + err + "</body><html>");
                    }

                } else {
                    res.writeHead(200, {
                        'Content-Type': mimeType ,
                        'Cache -Control': 'no-cache, no -store, must -revalidate',
                        'Pragma': 'no - cache',
                        'Expires': 0
                    });
                    res.write(contents);
                }
                res.end();
            });       
        });
        httpServer.listen(httpPort);


        // socketServer ophalen, die luistert listens to httpServer 
        //var io = require('socket.io').listen(httpServer); //naar module verplaatst
        socketHandlers.getHandlers(httpServer);
    };
    
    //publieke functies -> aanvullen met router en handlers + SOCKETHANDLERS
    var init = function (router, handlers, httpPort, socketHandlers) {
        console.log("listening to port " , httpPort);
        httpListen(router, handlers, httpPort , socketHandlers);
    };
    
    return {
        init: init
    };

})();

module.exports = staticServer;