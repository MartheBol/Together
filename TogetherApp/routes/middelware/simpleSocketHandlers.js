/*
 * sockets met server dependancy 
 * 
 * socket returnt ontvangen cliënt message (echo)
 */

var socketHandlers = function (httpServer) {
    var io = require("socket.io").listen(httpServer);
    console.log("listening on", httpServer.address());
    
    io.sockets.on('connection', function (socket) {
        console.log("sockets connected on", httpServer.address());
        
        socket.on('message', function (data) {
            socket.emit('serverMessage', 'The client said: ' + data);
           // socket.emit('serverMessage', { hello: 'world' }); //sturen van object
        });
    });
};
module.exports.getHandlers = socketHandlers;